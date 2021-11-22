import supabase from '$lib/db';

export async function onRequestPost(request) {

    let { user, error } = await supabase.auth.signUp({
      email: request.body.get("email"),
      password: request.body.get("password")
    })
    
    if (error) {
      return {
        status: error.status,
        body: error
      }
    }

    else {
      console.log(user);
    //   user_store.set(user);
    //   localStorage.setItem('user', JSON.stringify(user));
    }
  
    return {
      status: 200,
      body: {
        user
      }
    }
	}