// import supabase from '$lib/db';

import { createClient } from '@supabase/supabase-js'

const supabase = createClient( import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY, { fetch: fetch })

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
        status: 500,
        body: error
      }
    }

    else {

      return {
          status: 200,
          body: {
            user
          }
        }
      }
	}