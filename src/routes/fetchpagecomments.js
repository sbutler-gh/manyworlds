import { createClient } from '@supabase/supabase-js'

const supabase = createClient( import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY, { fetch: (...args) => fetch(...args)  })

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(request) {

    const { data, error } = await supabase
    .from('comments')
    .select(`*, users(username)`)
    .eq('page_id', request.body.get('page_id'))
    
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

        // var comment = {
        //     id: "",
        //     slug: "",
        //     html: "",
        //     user_id: "",
        //     created_at: "",
        //     users: [] 
        // }

        // if (request.body.get('user_id') == data[0].user_id) {
        //     page = data[0];
        // }
        // else {
        //     page.html = data[0].html;
        //     page.id = data[0].id;
        //     page.user_id = data[0].user_id;
        //     page.slug = data[0].slug;
        //     page.created_at = data[0].created_at;
        //     page.users = data[0].users.length;
        // }

        // console.log(page);

        console.log(data);

        // console.log(data);

        // console.log(data[0].user_id);
        // console.log(data[0].users)
      return {
          status: 200,
          body: {
            data
          }
        }
      }
	}