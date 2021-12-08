<script>
import { goto } from "$app/navigation";

    // import '../app.css';
    // import supabase from "$lib/db";

    let title = "";
    // let slug = "";
    $: slug = title.toLowerCase().replace(/[^a-z\d]+/g, "-");
    // $: slug = title.replace(/\s+/g, '-').toLowerCase().replace(/[\W_]+/g, "-");
    // $: slug = slug.replace(/[\W_]+/g, "-");

    import DisplayWants from "$lib/components/DisplayWants.svelte";
import { wants_table_store } from "$lib/stores";

    async function submitWant(e) {
        console.log(e.target);

        var formData = new FormData(e.target)

        const response = await fetch(`/graph/insert_want_new`, {
            method: 'post',
            body: formData
            })

        if (response.ok) {
        let data = await response.json();
        console.log(data);
        $wants_table_store.push(data.data[0]);
        $wants_table_store = $wants_table_store;
        goto(`/graph/${data.data[0].title}`);
        }
        else {
        let data = await response.json();
        console.log(data);
        console.log(error);
        }
    }

    // function updateSlug() {
    //     let new_slug = title.replace(/[\W_]+/g, "-");
    //     new_slug = new_slug.replace(/\s+/g, '-').toLowerCase();
    //     slug = new_slug;
    // }
</script>
<div style="max-width: 600px; margin: auto;">
<h3 style="text-align: center">Want something?  Make it real — together.</h3>
<form on:submit|preventDefault={submitWant}>
    <h4 style="">Create Page</h4>

    <label>Title</label>
    <textarea bind:value={title} name="title" placeholder="e.g. Addressing Climate Change"></textarea>
    <br>

    <label>ID Tag</label>
    <em>Other pages can refer to this one using the tag: <strong>{slug}</strong></em>
    <input name="slug" placeholder="e.g. addressing-climate-change" bind:value={slug} onkeypress="return event.charCode != 32">


    <!-- <label>Name (e.g. <strong>manyworlds.pages.dev/{slug})</strong></label>
    <input name="title" placeholder="e.g. project-name" bind:value={slug} onkeypress="return event.charCode != 32"> -->
    <br>
    <br>
    <label>Body Content</label>
    <textarea name="description" placeholder=""></textarea>
    <!-- <details><summary>More Details (Optional)</summary>
    <span style="margin-bottom: 5px; display: block;">Add additional information here.</span>
    <textarea name="description" style="height: 100px;"></textarea>
</details> -->
<br>
    <button>Submit</button>

</form>
</div>
<!-- <DisplayWants></DisplayWants> -->
<style>
    * {
        /* display: block; */
        /* text-align: center; */
        /* margin: auto; */
        /* margin-top: 15px; */
    }
    form {
        margin-top: 30px;
        text-align: center;
        max-width: 400px;
        margin: auto;
        text-align: left;
        /* padding: 10px; */
        /* background: #fafafa */
    }
    /* form label, form summary {
        margin-bottom:10px; 
        font-weight: 500;
        font-size: 18px;

    } */
    form button {
        margin-left: auto;
        display: block;
    }
    label, textarea {
        display: block;
        margin-bottom: 3px;
    }
    input {
        width: 100%;
    }
    textarea {
        display: block;
        width: 100%;
        /* margin-top: 15px; */
        height:30px;
        padding: 5px;
    }
</style>
