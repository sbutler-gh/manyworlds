<script>
import { wants_table_store } from "$lib/stores";
import { onMount } from "svelte";
</script>
{#each $wants_table_store as want}
<a href="/graph/{want?.name}">{want?.name}</a>
{/each}
<style>
    * {
        display: block;
    }
</style>