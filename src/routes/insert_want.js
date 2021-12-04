// import supabase from '$lib/db';

import { createClient } from '@supabase/supabase-js'
import crypto from "crypto";

const supabase = createClient( import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY, { fetch: (...args) => fetch(...args)  })

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(request) {

    console.log(request.body);

    let uuid = crypto.randomUUID();
    console.log(uuid);

    const { data, error } = await supabase
    .from('wants')
    .insert([
    { name: request.body.get('in-order-to'), id: uuid},
    { name: request.body.get('trying-to'), id: crypto.randomUUID(), in_order_to_parent: uuid},
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