<script>
import { onMount } from "svelte";
import supabase from "$lib/db.js";
import { page } from "$app/stores";
import CreatePageButton from "$lib/components/CreatePageButton.svelte"
import EditPageButton from "$lib/components/EditPageButton.svelte"
import { user_store, user_pages_store } from "$lib/stores";
import SignUpForm from "$lib/components/SignUpForm.svelte";



    export let slug;
    let this_page;

    let page_has_user;

    let display_sign_up_form;

    let edit = false;

    let html_content;

    onMount(async () => {

        console.log(slug);

        fetchPageContent()
        .then(() => {
            checkIfPageHasUser();
        })

    });

    function toggleEditPage() {
        edit ? edit = false : edit = true;
    }

    async function fetchPageContent() {

        const response = await fetch(`/fetchpagefromslug`, {
            method: 'post',
            body: slug
            })

        if (response.ok) {
        let data = await response.json();
        console.log(data);
        html_content = data.data[0].html;
        this_page = data.data[0];
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

    // async function checkIfPageHasUser() {
    //     const { data, error } = await supabase
    //     .from('users_pages')
    //     .select("*")
    //     .match({user_id: $user_store?.id, page_id: this_page.id});

    //     if (data?.length > 0) {
    //         page_has_user = true;
    //     }
    //     else {
    //         page_has_user = false;
    //     }
    //     // else if (error) {
    //     //     console.log(error);
    //     // }
    // }

    async function updatePage() {

        const { data, error } = await supabase
        .from('pages')
        .update([
          { "html": html_content}
        ])
        .eq("slug", slug)

        if (data) {
            console.log(data);
            this_page = data[0];
            html_content = data[0].html;
            edit = false;
        }
        else {
            console.log(error);
        }
    }

    async function addUserToPage() {
        const { data, error } = await supabase
        .from('users_pages')
        .insert([
            { user_id: $user_store.id, page_id: this_page.id}
        ])

        if (data) {
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

//     async function addEmail(e) {

//         let formData = new FormData(e.target);

//         console.log(formData.get('email'));

//         const { data, error } = await supabase
//         .from('signups')
//         .insert([
//             { email: formData.get('email')}
//         ])

//         if (data) {
//         console.log(data);
//         // e.target.id == 1 ? (email_success_1 = true) : (email_success_2 = true)
//         return data;
//         }
//         else {
//         console.log(error);
//         }
// }
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
<CreatePageButton></CreatePageButton>
{#if this_page?.user_id == $user_store?.id}
<button style="cursor: pointer; margin: auto; display: block; margin-top: 20px;" on:click|preventDefault={toggleEditPage}>Edit Page</button>
{/if}
{#if edit}
<div style="display: flex">
    <textarea required name="html" bind:value={html_content} style="width: 50%; height: 400px;"></textarea><br>

    <div style="margin-left: 10px; border: solid 1px lightgrey; border-radius: 10px; padding: 5px;">
    {@html html_content}
  </div>
  </div>
  <button style="cursor: pointer; margin: auto; display: block; margin-top: 20px;" on:click|preventDefault={updatePage}>Save Changes</button>
{/if}
{#if html_content}
{@html html_content}
{/if}
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
    <button style="cursor: pointer; margin: auto; display: block; margin-top: 20px;">Sign Up</button>
</form>
{/if}

<style>
    @media only screen and (max-width: 800px) {
        .guest-form {
            width: 100% !important;
            padding: 1rem;
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