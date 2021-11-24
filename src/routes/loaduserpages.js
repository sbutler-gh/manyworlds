// import supabase from '$lib/db';

import { createClient } from '@supabase/supabase-js'

const supabase = createClient( import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY, { fetch: (...args) => fetch(...args)  })

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(request) {

    // let request_parsed = JSON.parse(request);

    console.log(request);
    // let formData = await request.body.formData();
    // console.log(request_parsed);

    const { data, error } = await supabase
    .from('users_pages')
    .select("page_id")
    .match({user_id: request.body});
    
    if (error) {
      return {
        status: 500,
        body: {
          data,
          error
        }
      }
    }

    else {

      return {
          status: 200,
          body: {
            data
          }
        }
      }
	}