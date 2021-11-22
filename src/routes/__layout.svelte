<script>

import { user_store } from "$lib/stores";
import UserDisplay from "$lib/components/UserDisplay.svelte"
import { onMount } from "svelte";

onMount(async () => {
    loadUserFromBrowserStorage();
})

async function loadUserFromBrowserStorage() {
    if (localStorage.getItem('user')) {
        $user_store = JSON.parse(localStorage.getItem('user'));
        console.log(localStorage.getItem('user'));
    }
}

</script>
<UserDisplay></UserDisplay>
<slot></slot>