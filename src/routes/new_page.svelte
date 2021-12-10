<script>
import { goto } from "$app/navigation";
import { onMount } from "svelte";
import { user_store, user_pages_store } from "$lib/stores";
import SignUpForm from "$lib/components/SignUpForm.svelte";
import variables from "$lib/variables";
import DOMPurify from 'dompurify';

    import { page } from "$app/stores";
    import supabase from "$lib/db.js";

    // add an html preview
    // add a slug button

    let current_slugs;

    let signup_error = false;
    
    let page_success = false;
    let html_preview = false;
    let live_preview = false;
    let your_slug = "";
    let html_content = `
<div class="main">
<h1>My Big Vision</h1>
<p>This is my vision ...</p>
<p>Interested?  Want to explore the possibilities and help bring that to life?</p>
<p>Hit the button below and you'll receive updates soon.</p>
</div>
<style>
    .main{max-width:650px;margin:40px auto;padding:0 10px;font:18px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";}h1,h2,h3{line-height:1.2}@media (prefers-color-scheme: light){.main{color: #444}} @media (prefers-color-scheme: dark){body{color:#ccc !important;background:black}a:link{color:#5bf}a:visited{color:#ccf}}
</style>`;

let slug_taken = false;

let title = "";
        let preview = false;
        let description = "";
        $: description_html = description.replace(/^### (.*$)/gim, '<h3>$1</h3>') // h3 tag
		.replace(/^## (.*$)/gim, '<h2>$1</h2>') // h2 tag
		.replace(/^# (.*$)/gim, '<h1>$1</h1>') // h1 tag
		.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>') // bold text
		.replace(/\*(.*)\*/gim, '<i>$1</i>') // italic text
        .replace(/\r\n|\r|\n/gim, '<br>'); 


    onMount(async () => {

      fetchCurrentSlugs();

    });

    async function fetchCurrentSlugs() {

    const response = await fetch(`/fetchcurrentslugs`, {
            method: 'get'
            })

    if (response.ok) {
        let data = await response.json();
        let data_array = data.data;
        current_slugs = [];
        for (var i = 0; i < data_array.length; i++) {
          current_slugs.push(data_array[i]["slug"])
        }
        // current_slugs = data;
        console.log(current_slugs);
    }
    else {
        console.log(error);
    }

    }

    async function createNewPage(e) {

    let formData = new FormData(e.target);
    // formData.append('sanitized_html', DOMPurify.sanitize(formData.get('html')));
    formData.append('description_html', description_html);
  
    let slug = title.toLowerCase()
           .replace(/[^\w ]+/g, '')
           .replace(/ +/g, '-');

    current_slugs.some(element => element == slug) ? slug = `${slug}-1` : null;

    formData.append('slug', slug);

    formData.append('user_id', $user_store.id);

        const response = await fetch(`/createnewpage`, {
            method: 'post',
            body: formData
            })
      
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        page_success = true;
        addUserToPage(data.data[0].id)
        goto(`/${data.data[0].slug}`);
      }
      else {
        console.log(error);
      }

    }
    
    async function submitForm(e) {
    
    let formData = new FormData(e.target);
    
    if (!$user_store?.email) {

      console.log('logging signup endpoint');
      console.log('logging formdata')

      const response = await fetch(`/signup`, {
      method: 'post',
      body: formData
    })

    if (response.ok) {
      let data = await response.json();
      // console.log(user);
      // console.log('user created');
      console.log(data);
      $user_store = data.user;
      // let user = $user_store;
      console.log(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      return createNewPage(e);
    }

    else {
      console.log(error);
      signup_error = error;
    }
    }

    else {
      createNewPage(e);
    }
    }

    async function addUserToPage(page_id) {

    let formData = new FormData();
    formData.append('user_id', $user_store.id);
    formData.append('page_id', page_id)

    const response = await fetch(`/addusertopage`, {
        method: 'post',
        body: formData
        })

    if (response.ok) {
        let data = await response.json();
        console.log(data);
        $user_pages_store.push({'page_id': data.data[0].page_id});
        console.log($user_pages_store);
    }
    else {
        console.log(error);
    }
}

    function validateSlug() {
      console.log(your_slug);
      current_slugs.includes(your_slug) ? (slug_taken = true) : (slug_taken = false);
    }

    function htmlPreviewToggle() {
        html_preview == true ? (html_preview = false) : (html_preview = true);
        console.log(html_preview);
    }

    function livePreviewToggle() {
        live_preview == true ? (live_preview = false) : live_preview = true;
        console.log(html_preview);
        html_content = DOMPurify.sanitize(html_content);
    }

    // function editHTML() {
    //   live_preview == true ? html_content = DOMPurify.sanitize(html_content) : null;
    // }
    
    </script>
    <div class="main">
    <form on:submit|preventDefault={submitForm}>

      <label>Give a title for your initiative</label>
      <input style="line-height: 1.2rem; font-size: 1.2rem; padding: 10px;" bind:value={title} name="title" placeholder="A tool to help people make progress together">
      <br>
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
          {@html description_html}
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

        <br>

        {#if !$user_store?.email}
        <SignUpForm></SignUpForm>
        {/if}
        
        {#if signup_error}
        <br>
        <p style="color: red; font-size: 14px;">Error creating account: {signup_error}</p>
        <br>
        {/if}
  
        <!-- <button type="button" on:click={htmlPreviewToggle}>Toggle Preview</button> -->
        {#if !slug_taken}
        <button style="display: block; margin: auto; padding: 0.5rem 2rem; font-size: 16px; margin-top: 20px;">Create Page</button>{#if page_success}<p style="color: green;">Success!</p>{/if}
        {/if}
    </form>
    </div>
<!-- <style>
    .main{max-width:1200px;margin:40px auto;padding:0 10px;font:18px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";color:#444}h1,h2,h3{line-height:1.2}@media (prefers-color-scheme: dark){body{color:#ccc;background:black}a:link{color:#5bf}a:visited{color:#ccf}}
</style> -->
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
      padding: 10px;
      font-size: 16px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
</style>
