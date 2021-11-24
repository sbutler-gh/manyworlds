<script>

import { goto } from "$app/navigation";
import { page } from "$app/stores";
import supabase from "$lib/db.js";
import { now } from "svelte/internal";
import CreatePageButton from "$lib/components/CreatePageButton.svelte"

let email_success_1 = false;
let email_success_2 = false;

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
  e.target.id == 1 ? (email_success_1 = true) : (email_success_2 = true)
  return data;
}
else {
  console.log(error);
}
}

</script>
<div class="main">
<CreatePageButton></CreatePageButton>
<h1>Realizing Desired Futures Together</h1>
<p>There are lots of ways we try to make change in the world.</p>
<p>There are also many barriers.</p>
<p>We need funding.  Validation.  Responses to our unsolicited emails.  Introductions.  Partnerships.  <em>An App! ... Press coverage! ... Fiscal sponsorship! ... Investment! ... Virality! ... Users!</em></p>
<p>... In reality, all we need is <strong>us.</strong></p>
<p>My name is Sam.  I've spent a lot of time researching and thinking about how we can create more desirable future states together.</p>
<p>One of the key findings in that journey was a paper called <a href="https://www.tandfonline.com/doi/abs/10.1080/02604020500509546">Collaborative Authoring of Group Outcomes</a>.</p>
<p>I'd recommend reading it patiently. Here's a primer and some personal takeaways:</p>
<p>1. When we're thinking about a topic or an idea, the wider our perspective, the more possibilities we're able to see.  And we can expand our field of view by thinking with others — giving us a broader, <em>collective</em> view of the possibility landscape.</p>
<p>2. When we start making decisions about <em>what something should be</em> or <em>what we should do</em>, our possibilities narrow.  We should be mindful of this, to not limit possibilities prematurely.  We should feel comfortable stepping back, to see a wider view and explore other possibilities.  <em>(Letting go of the hammer, we see beyond nails.)</em></p>
<p>3. If we want the greatest possibilities available to us, we should explore topics with others to gain a broader collective perspective, and inquire openly — willing to let go of our preconcieved notions, listen to others, and explore the possibilities that may arise in our collective field of view.</p>
<p>4. My hypothesis: the more possibilities we can evaluate together, the more preferrable future states we'll create.</p>
<p>There are lots of examples that support this.  For example, David Graeber's reflections on <a href="https://www.youtube.com/watch?v=5eR_95slEFw">local political systems</a>.  Another is an anecdote I can no longer find, from a person building an ambitious data infrastructure protocol.</p>
<p>Instead of going ahead and <em>building</em> that innovative Internet plumbing, they announced the idea with a blog post.  The idea was this: "either no one will care, which means it may not be worth building anyway — or people will love it, and it will be a lot easier to create from there."</p>
<p>These pieces of wisdom are the inspiration for what you're reading and what this is.</p>
<p>In short, instead of starting your company with an app, or your movie with a screenplay, or your impact with a fiscally sponsored non-profit — start it with a page, that communicates what you're trying to do, and invites others to get involved.</p>
<p>Instead of facing months of work, stress, email, all on your shoulders — you can share what you're working on with a community.  If nobody is interested, you can learn.  If somebody already did it, you can learn.  And if your vision resonates, then you have <strong>a community you can work with</strong> — instead of holding it all on your shoulders.</p>
<p>And instead of only seeing possibilities from your limited perspective, you can see many more possibilities as a community.  Because chances are, whatever obstacle you're facing — it's probably not an obstacle at all, and all you need is a different set of eyes or a person with different experiences to help you realize that and move onwards.</p>
<p>That's the vision.</p>
<p><a href="new_page">Create a page</a> with your idea/vision, so others can discover it and join your effort, in a single click.  You can see everybody who signs up, and start collaborating as it makes sense (e.g. inviting them to a Slack/Discord community).  In doing so, you expand the perspectives and possibility space for your vision, and start realizing desired future together.</p>
<p>You can edit the content as you like, and you own the code.  All you need to do is put your vision up — and invite others to join you in making it a reality.</p>
  <!-- <p>So if you have something in mind, spin up your own page to tell people about it.</p> -->
<!-- <p>You'll get to edit all the page content yourself, include custom HTML/CSS/JS, own the code — and it comes pre-built with a email form like the one above, so people can sign-up to get updates about your project, and you can do things with those emails like invite them to a Slack/Discord community for further steps.</p> -->
</div>
<style>
    .main{max-width:650px;margin:40px auto;padding:0 10px;font:18px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";}h1,h2,h3{line-height:1.2}@media (prefers-color-scheme: light){.main{color: #444}} @media (prefers-color-scheme: dark){body{color:#ccc !important;background:black}a:link{color:#5bf}a:visited{color:#ccf}}
</style>