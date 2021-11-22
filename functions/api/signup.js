   
import supabase from '$lib/db';
import { dev } from '$app/env';
import { user_store } from '$lib/stores';



export async function post(request) {

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