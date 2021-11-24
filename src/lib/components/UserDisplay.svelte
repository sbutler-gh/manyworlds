<script>
    import { user_store } from "$lib/stores";

    let login_form = false;

    function toggleLogIn() {
        login_form ? login_form = false : login_form = true;
    }

    async function logIn(e) {

    var formData = new FormData(e.target);

        const response = await fetch(`/signin`, {
        method: 'post',
        body: formData
        })

        if (response.ok) {
        let data = await response.json();
        $user_store = data.user;
        console.log(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        // return addUserToPage();
        }

        else {
        console.log(error);
        // signup_error = error;
        }
    }

    async function logOut() {

    const response = await fetch(`/logout`, {
    method: 'post'
    })

    if (response.ok) {
    let data = await response.json();
    console.log(data);
    $user_store = [];
    localStorage.removeItem('user');
    }

    else {
    console.log(error);
    // console.log(data);
    // $user_store = [];
    // localStorage.removeItem('user');
    }
}


</script>
<div class="login">
{#if $user_store?.email}
<p>{$user_store.email}</p>
<button type="button" style="margin-left: auto; display: block; margin-right: 10%;" on:click|preventDefault={logOut}>Log Out</button>
{:else}
<button type="button" style="margin-left: auto; display: block; margin-right: 10%;" on:click|preventDefault={toggleLogIn}>
   {#if login_form == true}Back{:else}Log In{/if}
</button>
{#if login_form == true}
<form on:submit|preventDefault={logIn}>
    <label>Email</label><br>
    <input name="email" placeholder="hey@email.com" type="email"><br><br>

    <label>Password</label><br>
    <input name="password" placeholder="Your password" type="text">
    <br><br>

    <button>Log In</button>
    </form>
{/if}
{/if}
</div>
<style>
    .login {
        margin-left: auto; 
        display: block; 
        margin-right: 5%;
        width: 150px;
    }
</style>