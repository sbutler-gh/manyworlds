<script>
import { goto } from "$app/navigation";

    // import '../app.css';
    // import supabase from "$lib/db";


    import DisplayWants from "$lib/components/DisplayWants.svelte";
import { wants_table_store } from "$lib/stores";


    async function submitForm(e) {
        console.log(e.target);

        var formData = new FormData(e.target)
       
        const response = await fetch(`/graph/insert_want`, {
            method: 'post',
            body: formData
            })
      
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        $wants_table_store.push(data.data[0]);
        $wants_table_store.push(data.data[1]);
        $wants_table_store = $wants_table_store;
        goto(`/graph/${data.data[1].name}`);
        // data.data[0].user_id = {
        //   username: $user_store.user_metadata.username
        // }
        // $page_comments_store.unshift(data.data[0]);
        // $page_comments_store = $page_comments_store;
        // content = "";
      }
      else {
        let data = await response.json();
        console.log(data);
        console.log(error);
      }

    }
</script>
<form on:submit|preventDefault={submitForm}>
<h3 style="margin-bottom:30px">What are you trying to do?</h3>
<textarea name="trying-to"></textarea>
<br>
<label>In order to?</label>
<textarea name="in-order-to"></textarea>
<br>
<button>Submit</button>
</form>
<DisplayWants></DisplayWants>
<style>
    * {
        display: block;
        /* text-align: center; */
        margin: auto;
        margin-top: 15px;
    }
    form {
        margin-top: 30px;
        text-align: center;
        /* max-width: 650px;
        margin: auto; */
    }
    textarea {
        width: 250px;
        margin-top: 15px;
        height:50px;
    }
</style>
