import { createClient } from '@supabase/supabase-js'

const supabase = createClient( import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY, { fetch: (...args) => fetch(...args)  })

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(request) {

    console.log(request.body);

    const { data, error } = await supabase
    .from('pages')
    .update([
      { "markdown": request.body.get('markdown'), html: request.body.get('html')}
    ])
    .eq("id", request.body.get('id'))
    
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
        console.log(data);
      return {
          status: 200,
          body: {
            data
          }
        }
      }
	}