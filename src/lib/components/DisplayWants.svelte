<script>
import { wants_table_store } from "$lib/stores";
import { onMount } from "svelte";
</script>
{#each $wants_table_store as want}
<a href="/graph/{want?.title}">{want?.title}</a>
{/each}
<style>
    * {
        display: block;
        width: fit-content;
    }
</style>