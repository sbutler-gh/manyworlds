// import supabase from '$lib/db';

import { createClient } from '@supabase/supabase-js'

const supabase = createClient( import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY, { fetch: (...args) => fetch(...args)  })

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(request) {

  const { data, error } = await supabase
  .from('pages')
  .insert([
  // { name: request.body.get('in-order-to'), id: uuid},
  { user_id: request.body.get('user_id'), slug: request.body.get('slug'), title: request.body.get('title'), markdown: request.body.get('description'), html: request.body.get('description_html')},
  ])
    
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