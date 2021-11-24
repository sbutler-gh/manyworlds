<script>

import { user_store, user_pages_store } from "$lib/stores";
import UserDisplay from "$lib/components/UserDisplay.svelte"
import { onMount } from "svelte";

let initialized = false;

onMount(async () => {
    loadUserFromBrowserStorage()
    .then(async() => {

        if ($user_store?.id) {

            const response = await fetch(`/loaduserpages`, {
            method: 'post',
            body: $user_store?.id
            })

        if (response.ok) {
        let data = await response.json();
        console.log(data);
        $user_pages_store = data.data;
        }

        else {
        console.log(error);
        }
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