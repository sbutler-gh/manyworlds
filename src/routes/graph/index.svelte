<script>
    import { goto } from "$app/navigation";
    import DOMPurify from 'dompurify';
    
        let title = "";
        let preview = false;
        let description = "";
        $: description_preview = description.replace(/^### (.*$)/gim, '<h3>$1</h3>') // h3 tag
		.replace(/^## (.*$)/gim, '<h2>$1</h2>') // h2 tag
		.replace(/^# (.*$)/gim, '<h1>$1</h1>') // h1 tag
		.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>') // bold text
		.replace(/\*(.*)\*/gim, '<i>$1</i>') // italic text
        .replace(/\r\n|\r|\n/gim, '<br>'); 

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
        
//         function parseText() {
// 	const toHTML = description
// 		.replace(/^### (.*$)/gim, '<h3>$1</h3>') // h3 tag
// 		.replace(/^## (.*$)/gim, '<h2>$1</h2>') // h2 tag
// 		.replace(/^# (.*$)/gim, '<h1>$1</h1>') // h1 tag
// 		.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>') // bold text
// 		.replace(/\*(.*)\*/gim, '<i>$1</i>'); // italic text
    
//      toHTML.trim();

// 	description = toHTML;
// }
    </script>
    <div style="max-width: 600px; margin: auto;">
    <h3 style="text-align: center">Working on something?  Make it happen, together.</h3>
    <br>
    <form on:submit|preventDefault={submitWant}>
        <!-- <h4 style="">Create Page</h4> -->
    
        <label>Give a title for your initiative</label>
        <input style="line-height: 1.2rem; font-size: 1.2rem; padding: 10px;" bind:value={title} name="title" placeholder="A tool to help people make progress together">
        <br>
    
        <!-- <label>ID Tag</label>
        <em>Other pages can refer to this one using the tag: <strong>{slug}</strong></em>
        <input name="slug" placeholder="e.g. addressing-climate-change" bind:value={slug} onkeypress="return event.charCode != 32"> -->
    
    
        <!-- <label>Name (e.g. <strong>manyworlds.pages.dev/{slug})</strong></label>
        <input name="title" placeholder="e.g. project-name" bind:value={slug} onkeypress="return event.charCode != 32"> -->
        <!-- <br>
        <br> -->
        <br>
        <div style="display: flex">
        <label>Describe your vision</label>
        <button type="button" on:click={() => {preview ? (preview = false, document.getElementById('description_editor').style.display = "block") : (preview = true, document.getElementById('description_editor').style.display = "inline-flex") }}>
            {#if preview}Hide{:else}Show{/if} Live Preview</button>
        </div>
        <div id="description_editor" style="width: 100%;">
            <textarea style="height: 200px" name="description" placeholder="" bind:value={description}></textarea>
            {#if preview}
            <div style="width: 100%">
            {@html description_preview}
            </div>
            {/if}
        </div>
        <details><summary>Formatting help</summary>
            <p>**bold** –> <strong>bold</strong></p>
            <p>_italics_ / *italics* —> <em>italics</em></p>
            <p>[A link](url) —> <a href="url" disabled>A link</a></p>
            <span style="display: inline;"># Header 1 –> <h1 style="display: inline;">Header 1</h1></span>
            <span style="display: inline-block;">## Header 2 –> <h2 style="display: inline-block;">Header 2</h2></span><br>
            <span style="display: inline-block;">### Header 3 –> <h3 style="display: inline;">Header 3</h3></span><br><br>
            <span style="display: inline-block;">#### Header 4 –> <h4 style="display: inline;">Header 4</h4></span>
            </details>
    <br>
        <button type="submit">Submit</button>
    
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
    