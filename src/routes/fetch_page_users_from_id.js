import { page } from '$app/stores';
import { createClient } from '@supabase/supabase-js'

const supabase = createClient( import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY, { fetch: (...args) => fetch(...args)  })

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(request) {

  console.log(request);

    let { data, error } = await supabase
    .from('users_pages')
    .select(`user_id(email))`)
    .eq('page_id', request.body)
    
    if (error) {

        console.log(error);
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