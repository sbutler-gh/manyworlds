<script>
    import { page_comments_store } from "$lib/stores";
</script>

{#each $page_comments_store as comment}
<div style="box-shadow: 0 0 20px rgb(0 0 0 / 15%); border-radius: 5px; margin: auto; margin-top: 24px; width: 80%; padding: 4px; text-align: left;">
<p class="author">{comment.user_id.username}</p>
<p class="datetime">{Date(comment.created_at).substring(0,33)}</p>
<p class="body">{comment.content}</p>
</div>
{/each}
<style>
    * {
        font-family: Arial, Helvetica, sans-serif;
    }
    .author {
        font-size: 14px;
        font-weight: 600;
    }
    .datetime {
        font-size: 12px;
        color: lightgrey;
    }
    .body {
        font-size: 16px;
    }
</style>

<!-- <div class="w-11/12 m-auto"> -->
    <!-- {#each artifacts as artifact}
    {#if artifact.type == "Event"}
    <EventDynamic cursor="cursor-pointer" hover="hover:shadow" height="h-48" border="border-2" overflow="overflow-hidden" event={artifact}></EventDynamic>
    {:else if artifact.type == "Discussion"}
    <div class="border-2 rounded-md mt-4 m-auto w-10/12 mb-2 p-2 text-left">
        <p class="whitespace-pre">{@html artifact.details}</p>
    </div>
    {/if}
    {/each}
</div> -->