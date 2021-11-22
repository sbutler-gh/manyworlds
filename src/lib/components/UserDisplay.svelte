<script>
    import { user_store } from "$lib/stores";
</script>
{#if $user_store?.email}
<p>{$user_store.email}</p>
{/if}