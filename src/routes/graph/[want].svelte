<script>
import DisplayWants from "$lib/components/DisplayWants.svelte";
import { get } from "../fetchcurrentslugs";
import { wants_table_store } from "$lib/stores";
import { onMount } from "svelte";
import { page } from "$app/stores";
import { goto } from "$app/navigation";


export let want_param;
let want;

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
    want = $wants_table_store.find(element => element.name == want_param);
    console.log(want);
    // want_store.set(want);
})

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
<h3>What are you trying to do?</h3>
<p>{want?.name}</p>
<h3>In order to ...?</h3>
<!-- <p>{want?.in_order_to_parent}</p>
<p>{$wants_table_store.find(element => element.id == 'ce55c461-7023-4e49-a4b2-031cfc7568b0')?.name}</p> -->
<p>{$wants_table_store.find(element => element.id == want?.in_order_to_parent)?.name}</p>
</div>
<DisplayWants></DisplayWants>
<style>
    .main {
        margin: auto;
        text-align: center;
    }
</style>