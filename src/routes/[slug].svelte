<script>
import { onMount } from "svelte";
import supabase from "$lib/db.js";
import { page } from "$app/stores";


    export let slug;

    let html_content;

    onMount(async () => {

        console.log(slug);

        const { data, error } = await supabase
        .from('pages')
        .select("*")
        .eq('slug', slug);

        if (data) {
            html_content = data[0].html;
        }
        else {
            console.log(error);
        }

    });

    async function addEmail(e) {

        let formData = new FormData(e.target);

        console.log(formData.get('email'));

        const { data, error } = await supabase
        .from('signups')
        .insert([
            { email: formData.get('email')}
        ])

        if (data) {
        console.log(data);
        // e.target.id == 1 ? (email_success_1 = true) : (email_success_2 = true)
        return data;
        }
        else {
        console.log(error);
        }
}
</script>
<script context="module">
    	export async function load({ page, fetch, session, stuff }) {
		const page_slug = `${page.params.slug}`;

			return {
				props: {
					slug: page_slug
				}
			};
		// const res = await fetch(url);

		// if (res.ok) {
		// 	return {
		// 		props: {
		// 			article: await res.json()
		// 		}
		// 	};
		// }

		// return {
		// 	status: res.status,
		// 	error: new Error(`Could not load ${url}`)
		// };
	}
</script>
{#if html_content}
{@html html_content}
{/if}