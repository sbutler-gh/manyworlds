<script>
import DisplayWants from "$lib/components/DisplayWants.svelte";
import { get } from "../fetchcurrentslugs";
import { wants_table_store } from "$lib/stores";
import { onMount } from "svelte";
import { page } from "$app/stores";
import { goto } from "$app/navigation";


export let want_param;
let want;
let in_order_to;
let edit_description;

let original_path;

$: if (original_path && $page.path != original_path) reload_page();

        async function reload_page() {
                console.log('loading page');
                const hash = window.location.hash;
                console.log("reload_page", original_path, $page.path + hash);
                await goto('/', {replaceState: true});
                goto($page.path + hash, {replaceState: true});
        }

// console.log($wants_table_store);

onMount(async () => {
    original_path = $page.path;
    // want = $want_store;
    want = $wants_table_store.find(element => element.title == want_param);
    console.log(want);
    // want_store.set(want);
})

async function updateWant(e) {
    document.getElementById('updateButton').disabled = true;
    var formData = new FormData(e.target);
    formData.append('id', want.id);
    const response = await fetch('update_want', {
        method: 'post',
        body: formData
    })
    
    if (response) {
        let data = await response.json();
        console.log(data);
        want.description = formData.get('description');
        edit_description = false;
        document.getElementById('updateButton').disabled = false;
    }
    else {
        console.log(error);
    }
}

// onMount

</script>

<script context="module">

    export async function load({ page, fetch, session, stuff }) {

            return {
                props: {
                    want_param: page.params.want
                }
            };  
}
</script>
<div class="main">
<!-- <h3>What do you want to realize?</h3> -->
<h3>{want?.title}</h3>
{#if edit_description}
<em><a href="" on:click={() => {edit_description ? edit_description = false : edit_description = true}}>Cancel</a></em>
<form on:submit|preventDefault={updateWant}>
    <textarea name="description" style="height: 100px;" bind:value={want.description}></textarea>
    <br>
    <button id="updateButton">Update Page</button>
</form>
{:else if want?.description && !edit_description}
<div style="position: relative;">
<p style="">{want?.description}</p>
<svg on:click={() => {edit_description ? edit_description = false : edit_description = true}} style="position: absolute; top: 1%; right: 1%;" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
    <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
    <line x1="16" y1="5" x2="19" y2="8" />
  </svg>
</div>
{:else}
<em><a href="" on:click={() => {edit_description ? edit_description = false : edit_description = true}}>Add Description</a></em>
{/if}
</div>
<!-- <DisplayWants></DisplayWants> -->
<style>
    .main {
        max-width: 400px;
        margin: auto;
    }
    form {
        margin-top: 15px;
        text-align: center;
        /* max-width: 300px; */
        /* margin: auto; */
        text-align: left;
        /* padding: 10px; */
        /* background: #fafafa */
    }
    form label, form summary {
        margin-bottom:10px; 
        font-weight: 500;
        font-size: 18px;

    }
    form button {
        margin-left: auto;
        display: block;
    }
    label, textarea {
        display: block;
    }
    textarea {
        display: block;
        width: 100%;
        /* margin-top: 15px; */
        height:30px;
        padding: 5px;
    }
</style>