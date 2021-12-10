<script>
import { onMount } from "svelte";
import supabase from "$lib/db.js";
import { page } from "$app/stores";
import CreatePageButton from "$lib/components/CreatePageButton.svelte"
import EditPageButton from "$lib/components/EditPageButton.svelte"
// import { user_pages_store } from "$lib/stores";
import SignUpForm from "$lib/components/SignUpForm.svelte";
import DOMPurify from 'dompurify';
import SignUpsTable from "$lib/components/SignUpsTable.svelte";
import { goto } from "$app/navigation";
import CommentForm from "$lib/components/CommentForm.svelte"
import CommentsDisplay from "$lib/components/CommentsDisplay.svelte";


    export let slug;

    export let this_page;

    export let page_has_user;

    let page_signups;
    
    let edit_sign_up_form = false;

    let test;

    let display_sign_up_form;

    let edit = false;

    let html_content;

    let parent_id;

    let original_path;

    $:  if (original_path && $page.path != original_path) reload_page();

        async function reload_page() {
                console.log('loading page');
                let hash = window.location.hash;
                console.log("reload_page", original_path, $page.path + hash);
                await goto('/', {replaceState: true});
                goto($page.path + hash, {replaceState: true});
        }

        // onMount(async () => {
        //         original_path = $page.path;
        //         // ...
        // }

    onMount(async() => {

        console.log(this_page);

        original_path = $page.path;

        console.log(slug);
    });

    function toggleEditPage() {
        edit ? edit = false : edit = true;
        html_content = DOMPurify.sanitize(html_content);
    }

    async function upsertPage() {

        var formData = new FormData();
        // formData.append('html_content', DOMPurify.sanitize(html_content));
        // formData.append('html_content', DOMPurify.sanitize(html_content));
        // formData.append('slug', slug);
        formData.append('id', this_page.id);
        formData.append('markdown', this_page.markdown);
        
        let html = this_page.markdown.replace(/^### (.*$)/gim, '<h3>$1</h3>') // h3 tag
		.replace(/^## (.*$)/gim, '<h2>$1</h2>') // h2 tag
		.replace(/^# (.*$)/gim, '<h1>$1</h1>') // h1 tag
		.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>') // bold text
		.replace(/\*(.*)\*/gim, '<i>$1</i>') // italic text
        .replace(/\r\n|\r|\n/gim, '<br>') // line breaks
        .replace(/\[([^\[]+)\](\(([^)]*))/gim, '<a href="$3">$1</a>');

        formData.append('html', html);

        let response = await fetch(`/upsertpage`, {
            method: 'post',
            body: formData
            })

        if (response.ok) {
            let data = await response.json();
            console.log(data);
            this_page = data.data[0];
            // html_content = data.data[0].html;
            edit = false;
        }
        else {
            console.log(error);
        }
    }

    async function addUserToPage() {

        let formData = new FormData();
        formData.append('user_id', $user_store.id);
        formData.append('page_id', this_page.id)

        let response = await fetch(`/addusertopage`, {
            method: 'post',
            body: formData
            })

        if (response.ok) {
            let data = await response.json();
            console.log(data);
            $user_pages_store.push({'page_id': this_page.id});
            page_has_user = true;
        }
        else {
            console.log(error);
        }
    }

    async function createUser(e) {

        var formData = new FormData(e.target);

        let response = await fetch(`/signup`, {
      method: 'post',
      body: formData
    })

        if (response.ok) {
        let data = await response.json();
        // console.log(user);
        // console.log('user created');
        $user_store = data.user;
        // $user_store = $user_store;
        // let user = $user_store;
        console.log(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        return addUserToPage();
        }

        else {
        console.log(error);
        signup_error = error;
        }
    }

    function toggleEditSignUpForm () {
        edit_sign_up_form ? edit_sign_up_form = false : edit_sign_up_form = true;
    }
</script>
<script context="module">
    import { get } from 'svelte/store'
import { browser } from '$app/env';
import { user_store, page_comments_store, user_pages_store } from "$lib/stores"

    	export async function load({ page, fetch, session, stuff }) {

        let page_slug = `${page.params.slug}`;
        let fetched_page;
        let page_has_user;

        if (browser) {
        let user = JSON.parse(localStorage.getItem('user'))
        console.log(user);

        // var formData = {
        //     slug: page_slug,
        //     user_id: user?.id
        // };
        var formData = new FormData();
        formData.append('slug', page_slug);
        formData.append('user_id', user_store?.id);
        // console.log(formData);
        // console.log()

        let response = await fetch(`./fetch_users_pages_from_slug`, {
            method: 'post',
            body: formData
            })

        if (response.ok) {
        let data = await response.json();
        console.log(data);
        // html_content = data.page.html;
        fetched_page = data.page;
        page_comments_store.set(data.page.comments.reverse());
        let user_pages_array = [];
        user_pages_array = get(user_pages_store);
        page_has_user = user_pages_array.some(page => page.page_id == fetched_page.id);
        console.log(page_has_user);
        }

        else {
        console.log(error);
        }
    }

			return {
				props: {
                    this_page: fetched_page,
                    slug: page_slug,
                    page_has_user: page_has_user
				}
			};
		// const res = await fetch(url);

		// if (res.ok) {
		// 	return {
		// 		props: {
		// 			article: await res.json()
		// 		}
		// 	};
		// }

		// return {
		// 	status: res.status,
		// 	error: new Error(`Could not load ${url}`)
		// };
	}
</script>
<!-- <div style="margin: auto;
text-align: center;
display: block;
margin-top: 20px;">
<a href="/about" style="display: inline-block; margin-right: 30px;">About</a>
<CreatePageButton></CreatePageButton>
</div> -->
<h3>{this_page?.title}</h3>

<a style="display: block; margin-left: auto; width: fit-content; margin-bottom:10px;" href="https://meet.jit.si/{this_page?.slug}"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-external-link" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5" />
    <line x1="10" y1="14" x2="20" y2="4" />
    <polyline points="15 4 20 4 20 9" />
  </svg>Video/Voice Room</a>
<div style="position: relative;">
    
    {#if !edit}
    <div class="html_content">{@html this_page?.html}</div>
    {#if this_page?.user_id == $user_store?.id}
    <svg on:click={() => {edit ? edit = false : edit = true}} style="position: absolute; top: 0; right: 0; cursor: pointer;" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
        <line x1="16" y1="5" x2="19" y2="8" />
      </svg>
    {/if}
    {:else}
    <em><a href="" on:click={() => {edit ? edit = false : edit = true}}>Cancel</a></em>
    <form on:submit|preventDefault={upsertPage}>
        <textarea name="description_markdown" style="height: 150px; width: 95%" bind:value={this_page.markdown}></textarea>
        <br>
        <button id="updateButton">Update Page</button>
    </form>
    {/if}


    
</div>

<div id="signUpCommentsSection">
{#if $user_store?.id && page_has_user == false}
<button style="cursor: pointer; margin: auto; display: block; margin-top: 20px;" on:click|preventDefault={addUserToPage}>Sign Up for Updates</button>
{:else if $user_store?.id && page_has_user == true}
<button disabled style="margin: auto; display: block; margin-top: 20px; color: green" on:click|preventDefault={addUserToPage}>You're receiving updates for this project!</button>
<p style="text-align: center; color: green;"></p>
{:else if !$user_store?.id}
<form class="guest-form" style="margin: auto; display: block;" on:submit|preventDefault={createUser}>
    <h3>Sign Up for Updates</h3>
    <label>Account Email</label><br>
    <input name="email" placeholder="hey@email.com" type="email"><br><br>

    <label>Password</label><br>
    <input name="password" placeholder="Enter a strong password" type="text">
    <div>
    <button style="cursor: pointer; margin: auto; display: block; margin-top: 20px;">Sign Up</button>
    <p>or <button style="cursor: pointer; margin: auto; display: block; display: inline;">Log In</button></p>
    </div>
</form>
{/if}
<!-- {#if this_page?.user_id == $user_store?.id}
<button type="button" style="margin: auto; display: block;" on:click|preventDefault={toggleEditSignUpForm}>Edit Sign-Up Form Fields</button>
{#if edit_sign_up_form}
<form class="guest-form" style="margin: auto; display: block;" on:submit|preventDefault={createUser}>

    <h3>Sign Up Form Fields</h3>
    <label>Form Field 1</label><br>
    <input name="email" placeholder="hey@email.com" type="email"><br><br>

    <label>Form Field 2</label><br>
    <input name="password" placeholder="Enter a strong password" type="text"><br><br>

    <label>Form Field 3</label><br>
    <input name="email" placeholder="hey@email.com" type="email"><br><br>

    <label>Form Field 4</label><br>
    <input name="email" placeholder="hey@email.com" type="email"><br><br>

    <label>Form Field 5</label><br>
    <input name="email" placeholder="hey@email.com" type="email"><br><br>
    <button style="cursor: pointer; margin: auto; display: block; margin-top: 20px;">Save Changes</button>
</form>
{/if}

{/if} -->
{#if Array.isArray(this_page?.users)}
<SignUpsTable users={this_page.users}></SignUpsTable>
{/if}
<h3 style="text-align: center;">Add a Comment</h3>
{#if $user_store?.id && page_has_user == true}
<CommentForm user_id={$user_store?.id} page_id={this_page?.id} parent_id={parent_id}></CommentForm>
{:else if page_has_user == false}
<p style="text-align: center;">Sign up to this page to add comments.</p>
{/if}
{#if $page_comments_store}
<CommentsDisplay></CommentsDisplay>
{:else}
<p>No comments yet</p>
{/if}
</div>
<style>

    @media only screen and (max-width: 800px) {
        .guest-form {
            width: 100% !important;
            padding: 1rem;
        }
    }

    @media only screen and (min-width: 801px) {

        #signUpCommentsSection {
            margin: auto;
            display: block;
            width: 500px;
        }
    }

    .guest-form {
        width: 40%;
        background: #fafafa;
        padding: 1rem;
        border-radius: 10px;
        text-align: center;
        font-style: "sans-serif";
        margin: auto;
    }

    .guest-form input {
        height: 20px;
        width: 150px;
    }
</style>