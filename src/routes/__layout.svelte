<script>

import { user_store, user_pages_store } from "$lib/stores";
import UserDisplay from "$lib/components/UserDisplay.svelte"
import { onMount } from "svelte";
import supabase from "$lib/db.js";

let initialized = false;

onMount(async () => {
    loadUserFromBrowserStorage()
    .then(async() => {
        if ($user_store?.id) {

                const { data, error } = await supabase
                .from('users_pages')
                .select("page_id")
                .match({user_id: $user_store?.id});

                if (data) {
                    console.log(data);
                    $user_pages_store = data;
                }
                else {
                    console.log(error);
                }
                // else if (error) {
                //     console.log(error);
                // }
        }

        return initialized = true;
    });
})

async function loadUserFromBrowserStorage() {
    if (localStorage.getItem('user')) {
        $user_store = JSON.parse(localStorage.getItem('user'));
        console.log(localStorage.getItem('user'));
    }
}

</script>
<UserDisplay></UserDisplay>
{#if initialized}
<slot></slot>
{/if}