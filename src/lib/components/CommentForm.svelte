<script>
    export let user_id;
    export let page_id;
    export let parent_id;

    import { page_comments_store, user_store } from "$lib/stores";

    let content;

    async function postComment(e) {

        document.getElementById('submitCommentButton').disabled = true;

        var formData = new FormData(e.target);
        formData.append('page_id', page_id);
        formData.append('user_id', user_id);

        parent_id ? formData.append('parent_id', parent_id) : null;

        const response = await fetch(`/insertcomment`, {
            method: 'post',
            body: formData
            })
      
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        data.data[0].users = {
          username: $user_store.user_metadata.username
        }
        $page_comments_store.unshift(data.data[0]);
        $page_comments_store = $page_comments_store;
        content = "";
      }
      else {
        let data = await response.json();
        console.log(data);
        console.log(error);
      }

      document.getElementById('submitCommentButton').disabled = false;
    }
</script>
<form on:submit|preventDefault={postComment}>
    <textarea style="display: block" name="content" bind:value={content}></textarea>
    <button id="submitCommentButton">Submit</button>
</form>
<style>
  form, textarea {
    margin: auto;
    display: block;
    width: 80%;
  }
  textarea {
    width: 100%;
    height: 50px;
  }
  button {
    margin-top: 1em;
    margin-left: auto;
    display: block;
    /* margin-right: 10%; */
  }
</style>