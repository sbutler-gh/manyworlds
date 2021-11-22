<script>
import { goto } from "$app/navigation";
import { onMount } from "svelte";
import { user_store } from "$lib/stores";
import SignUpForm from "$lib/components/SignUpForm.svelte"

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
<p>Enter your email, and you'll be part of the things to come.</p>
<!-- Email form — don't touch, unless you know what you're doing! -->
<form id="1" on:submit|preventDefault={addEmail}>
<input name="email" type="email">
<button>Submit</button>
</form>
</div>
<style>
    .main{max-width:650px;margin:40px auto;padding:0 10px;font:18px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";color:#444}h1,h2,h3{line-height:1.2}@media (prefers-color-scheme: dark){body{color:#ccc;background:black}a:link{color:#5bf}a:visited{color:#ccf}}
</style>`;

let slug_taken = false;

    onMount(async () => {

    // console.log(slug);

    const { data, error } = await supabase
    .from('pages')
    .select("slug")

    if (data) {
      current_slugs = [];
        for (var i = 0; i < data.length; i++) {
          current_slugs.push(data[i]["slug"])
        }
        // current_slugs = data;
        console.log(current_slugs);
    }
    else {
        console.log(error);
    }

    });

    // async function createAccount(e) {

    // }

    async function createNewPage(e) {

    let formData = new FormData(e.target);
    
        const { data, error } = await supabase
        .from('pages')
        .insert([
          { slug: formData.get('slug'), html: formData.get('html'), user_id: $user_store.id}
        ])
      
      if (data) {
        console.log(data);
        page_success = true;
      //   e.target.id == 1 ? (email_success_1 = true) : (email_success_2 = true)
      goto(`/${formData.get('slug')}`);
        // return data;
      }
      else {
        console.log(error);
      }

    }
    
    async function submitForm(e) {
    
    let formData = new FormData(e.target);
    
    if (formData.get('email')) {
      const { user, error } = await supabase.auth.signUp
      ({ email: formData.get('email'), password: formData.get('password') })


      if (user) {
        console.log(user);
        console.log('user created');
        $user_store = user;
        localStorage.setItem('user', JSON.stringify(user));
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

    function validateSlug() {
      console.log(your_slug);
      current_slugs.includes(your_slug) ? (slug_taken = true) : (slug_taken = false);
    }

    function htmlPreviewToggle() {
        html_preview == true ? (html_preview = false) : (html_preview = true);
        console.log(html_preview);
    }

    function livePreviewToggle() {
        live_preview == true ? (live_preview = false) : (live_preview = true);
        console.log(html_preview);
    }
    
    </script>
    <div class="main">
    <form on:submit|preventDefault={submitForm}>
        <label>Add a slug for your page.  (e.g. <strong>manyworlds.pages.dev/{your_slug}</strong>)</label><br>
        <input required name="slug" bind:value={your_slug} placeholder="my-project-name" type="text" on:input={validateSlug} onkeypress="return event.charCode != 32">
        {#if slug_taken}
        <p style="color: red; font-size: 14px;">Already taken.  Try another.</p>
        {/if}
        <br>
        <br>
        <label>Your Page HTML</label>
        {#if live_preview}
        <button type="button" on:click={livePreviewToggle}>Hide Live Preview</button>
        {:else}
        <button type="button" on:click={livePreviewToggle}>Show Live Preview</button>
        {/if}<br>

        {#if html_preview}
        {@html html_content}
        {:else}
        <div style="display: flex">
        <textarea required name="html" bind:value={html_content} style="width: 50%; height: 400px;"></textarea><br>

        {#if live_preview}
        <div style="margin-left: 10px; border: solid 1px lightgrey; border-radius: 10px; padding: 5px;">
        {@html html_content}
      </div>
        {/if}
        
        </div>
        {/if}

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
<style>
    .main{max-width:1200px;margin:40px auto;padding:0 10px;font:18px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";color:#444}h1,h2,h3{line-height:1.2}@media (prefers-color-scheme: dark){body{color:#ccc;background:black}a:link{color:#5bf}a:visited{color:#ccf}}
</style>