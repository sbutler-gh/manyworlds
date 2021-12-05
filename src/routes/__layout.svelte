<script>

    // import { user_store, user_pages_store } from "$lib/stores";
    import UserDisplay from "$lib/components/UserDisplay.svelte"
    import { onMount } from "svelte";
    import { get } from "./fetchcurrentslugs";
    
    import CreatePageButton from "$lib/components/CreatePageButton.svelte";
    
    // export let initialized;
    
    // onMount(async () => {
    //     loadUserFromBrowserStorage()
    //     .then(async() => {
    
    //         if ($user_store?.id) {
    
    //             const response = await fetch(`/loaduserpages`, {
    //             method: 'post',
    //             body: $user_store?.id
    //             })
    
    //         if (response.ok) {
    //         let data = await response.json();
    //         console.log(data);
    //         $user_pages_store = data.data;
    //         }
    
    //         else {
    //         console.log(error);
    //         }
    //         }
    
    //         return initialized = true;
    //     });
    // })
    
    async function loadUserFromBrowserStorage() {
        if (localStorage.getItem('user')) {
            $user_store = JSON.parse(localStorage.getItem('user'));
            // console.log(localStorage.getItem('user'));
        }
    }
    
    </script>
    <script context="module">
    
    import  {user_store, user_pages_store } from "$lib/stores"
    
    import { browser } from '$app/env';
    
    export async function load({ page, fetch, session, stuff }) {
    
        if (browser) {
    
        let user;
    
        if (localStorage.getItem('user')) {
            user_store.set(JSON.parse(localStorage.getItem('user')));
            // console.log(localStorage.getItem('user'));
            user = JSON.parse(localStorage.getItem('user'))
        }
    
        // should return user data, including pages, recent wants, activity, etc?
        // or just return user id, and then can fetch pages, wants, activity as it loads
        if (user?.id) {
    
                const response = await fetch(`/loaduserpages`, {
                method: 'post',
                body: user?.id
                })
    
                if (response.ok) {
                let data = await response.json();
                console.log(data);
                user_pages_store.set(data.data);
                }
    
                else {
                console.log(error);
                }
                }
        }
        return {
                props: {
                    // initialized: "a"
                }
            };
        }
    </script>
    <UserDisplay></UserDisplay>
    <slot></slot>