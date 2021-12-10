// import supabase from '$lib/db';

import { createClient } from '@supabase/supabase-js'
import crypto from "crypto";

const supabase = createClient( import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY, { fetch: (...args) => fetch(...args)  })

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(request) {

    // console.log(request.body);

    // let uuid = crypto.randomUUID();
    // console.log(uuid);

    const { data, error } = await supabase
    .from('wants_new')
    .update({ html: request.body.get('description'), markdown: request.body.get('markdown')})
    .match({id: request.body.get('id')})

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