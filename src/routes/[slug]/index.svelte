<script>
import { onMount } from "svelte";
import supabase from "$lib/db.js";
import { page } from "$app/stores";
import CreatePageButton from "$lib/components/CreatePageButton.svelte"
import EditPageButton from "$lib/components/EditPageButton.svelte"
import { user_store, user_pages_store, page_comments_store } from "$lib/stores";
import SignUpForm from "$lib/components/SignUpForm.svelte";
import DOMPurify from 'dompurify';
import SignUpsTable from "$lib/components/SignUpsTable.svelte";
import { goto } from "$app/navigation";
import CommentForm from "$lib/components/CommentForm.svelte"
import CommentsDisplay from "$lib/components/CommentsDisplay.svelte";



    export let slug;

    let this_page;

    let page_has_user;

    let page_signups;
    
    let edit_sign_up_form;

    edit_sign_up_form = false;

    let test;

    let display_sign_up_form;

    let edit = false;

    let html_content;

    let parent_id;

    let original_path;

$:      if (original_path && $page.path != original_path) reload_page();

        async function reload_page() {
                console.log('loading page');
                const hash = window.location.hash;
                console.log("reload_page", original_path, $page.path + hash);
                await goto('/', {replaceState: true});
                goto($page.path + hash, {replaceState: true});
        }

        // onMount(async () => {
        //         original_path = $page.path;
        //         // ...
        // }

    onMount(async() => {

        original_path = $page.path;

        console.log(slug);

        fetchUsersAndPages()
        .then(async() => {
            checkIfPageHasUser()
        })
        // .then(async() => {
        //     fetchPageComments();
        // })
    });

    function toggleEditPage() {
        edit ? edit = false : edit = true;
        html_content = DOMPurify.sanitize(html_content);
    }

    async function fetchUsersAndPages() {

        var formData = new FormData();
        formData.append('slug', slug);
        formData.append('user_id', $user_store?.id);

        const response = await fetch(`/fetch_users_pages_from_slug`, {
            method: 'post',
            body: formData
            })

        if (response.ok) {
        let data = await response.json();
        console.log(data);
        html_content = data.page.html;
        this_page = data.page;
        $page_comments_store = data.page.comments.reverse();
        }

        else {
        console.log(error);
        }
    }

    function checkIfPageHasUser() {
        console.log($user_pages_store);
        if ($user_pages_store.some(page => page.page_id == this_page.id)) {
            page_has_user = true;
        }
        else {
            page_has_user = false;
        }
    }

    async function upsertPage() {

        var formData = new FormData();
        formData.append('html_content', DOMPurify.sanitize(html_content));
        formData.append('slug', slug);

        const response = await fetch(`/upsertpage`, {
            method: 'post',
            body: formData
            })

        if (response.ok) {
            let data = await response.json();
            console.log(data);
            this_page = data.data[0];
            html_content = data.data[0].html;
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

        const response = await fetch(`/addusertopage`, {
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

        const response = await fetch(`/signup`, {
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

    async function fetchPageComments() {

        var formData = new FormData();
        formData.append('page_id', this_page?.id);

        const response = await fetch(`/fetchpagecomments`, {
            method: 'post',
            body: formData
            })

        if (response.ok) {
        let data = await response.json();
        console.log(data.data.reverse());
        // $page_comments_store = data.data.reverse();
        // console.log(data);
        // html_content = data.page.html;
        // this_page = data.page;
        }

        else {
        console.log(error);
        }
    }
</script>
<script context="module">
    	export async function load({ page, fetch, session, stuff }) {
		const page_slug = `${page.params.slug}`;

			return {
				props: {
					slug: page_slug
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
{#if this_page?.user_id == $user_store?.id}
<button style="cursor: pointer; margin: auto; display: block; margin-top: 20px;" on:click|preventDefault={toggleEditPage}>Edit Page</button>
{/if}
{#if edit}
<div style="display: flex">
    <textarea required name="html" bind:value={html_content} style="width: 50%; height: 400px;"></textarea><br>

    <div style="margin-left: 10px; border: solid 1px lightgrey; border-radius: 10px; padding: 5px;">
    {@html html_content}
    <button type="button" style="cursor: pointer; margin: auto; display: block; margin-top: 20px;">Sign Up for Updates</button>
  </div>
  </div>
  <button style="cursor: pointer; margin: auto; display: block; margin-top: 20px;" on:click|preventDefault={upsertPage}>Save Changes</button>
{/if}
{#if html_content}
{@html html_content}
{/if}
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