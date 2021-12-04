<script>
    export let want;
</script>

<script context="module">
    export async function load({ page, fetch, session, stuff }) {

        return {
            props: {
                want: page.params.want
            }
        };
}
</script>
<p>{want}</p>