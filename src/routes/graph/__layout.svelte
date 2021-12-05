<script>
    
</script>
<script context="module">

import  { wants_table_store, want_store } from "$lib/stores"  
import { browser } from '$app/env';

export async function load({ fetch, page }) {

            if (browser) {

            const response = await fetch(`/graph/fetch_wants`, {
            method: 'post'
            })

            // console.log(page);

            if (response.ok) {
            let wants = await response.json();
            // console.log('logging wants');
            wants_table_store.set(wants.data);
            }

            else {
            console.log(error);
            }
            }
        
            return {
                props: {
                    // initialized: "a"
                }
            };    
    }
</script>
<slot want="hello"></slot>