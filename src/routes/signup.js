import supabase from '$lib/db';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(request) {

    // let request_parsed = JSON.parse(request);

    console.log(request);
    // let formData = await request.body.formData();
    // console.log(request_parsed);

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
    }
  
    return {
      status: 200,
      body: {
        user
      }
    }
	}