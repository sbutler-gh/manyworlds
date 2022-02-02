<script>

import { goto } from "$app/navigation";
import { page } from "$app/stores";
import { now, onMount } from "svelte/internal";
import CreatePageButton from "$lib/components/CreatePageButton.svelte"

let pages;

onMount(async() => {
  console.log('test');

  fetchAllPages();
})

async function fetchAllPages() {
  const response = await fetch('/fetchallpages', {
    method: 'post'
  })

  if (response.ok) {
    console.log('response');
  let data = await response.json();
  pages = data.pages;
  console.log(data);
  }
  else {
    console.log('error')
  }
}

</script>

<div class="main">
  {#if pages}
  <h3>Pages to Explore</h3>
  {#each pages as page}
  {#if !page.hidden}
  <a sveltekit:prefetch style="display: block; width: fit-content;" href="/{page.slug}">{page.slug}</a>
  {/if}
  {/each}
  {/if}
</div>
<style>
    .main{max-width:650px;margin:40px auto;padding:0 10px;font:18px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";}h1,h2,h3{line-height:1.2}@media (prefers-color-scheme: light){.main{color: #444}} @media (prefers-color-scheme: dark){body{color:#ccc !important;background:black}a:link{color:#5bf}a:visited{color:#ccf}}
</style>