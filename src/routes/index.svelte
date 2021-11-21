<script>

import { page } from "$app/stores";
import supabase from "$lib/db.js";

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
<h1>Realizing Desired Future States Together</h1>
<p>Today, there are lots of ways people try to make change in the world.</p>
<p>There are also many barriers to realizing new visions.</p>
<p>We need funding.  Validation.  Responses to our unsolicited emails.  Introductions.  Partnerships.  <em>An App! ... Press coverage! ... Fiscal sponsorship! ... Investment! ... Virality! ... Users!</em></p>
<p>... In reality, all we need is <strong>us.</strong></p>
<p>My name is Sam.  I've spent a lot of time researching and thinking about how we can create more desirable future states together.</p>
<p>One of the key findings in that journey was a paper called <a href="https://www.tandfonline.com/doi/abs/10.1080/02604020500509546">Collaborative Authoring of Group Outcomes"</a>.</p>
<p>I'd recommend reading it, as patiently as it takes to understand the material.  Here's a primer and some personal takeaways:</p>
<p>1. When we're thinking about a topic or an idea, the wider our perspective, the more possibilities we're able to see.  And we can expand our field of view by thinking with others — giving us a broader, <em>collective</em> view of the possibility landscape.</p>
<p>2. When we start making decisions about <em>what something should be</em> or <em>what we should do</em>, our possibilities get more narrow.  We should be mindful of this, to not pre-emptively limit our possibilities.  We should feel comfortable stepping back out, to see a wider view and explore other possibilities.  (If you step away from the hammer, you'll see beyond the nails.)</p>
<p>3. If we want the greatest possibilities available to us, we should explore topics with others to gain a broader collective perspective, and inquire openly — willing to let go of our preconcieved notions, listen to others, and explore the possibilities that may arise in our collective field of view.</p>
<p>4. My hypothesis: the more possibilities we have the opportunity to evaluate, the more preferrable future states we'll create.</p>
<p>There are lots of examples that support this.  For example, David Graeber's reflections of <a href="https://www.youtube.com/watch?v=5eR_95slEFw">local political systems</a>.  Another is an anecdote I can no longer find, from a person building an ambitions data infrastructure protocol.</p>
<p>Instead of going ahead and <em>building</em> that innovative Internet plumbing, they announced the idea with a blog post.  The idea was this: "either no one will care, which means it's not a good idea anyway — or people will love the idea, and it will be a lot easier to create from there."</p>
<p>These pieces of wisdom are the inspiration for what you're reading and what this is.</p>
<p>In short, instead of starting your company with an app, or your movie with a screenplay, or your impact with a fiscally sponsored non-profit — start it with a page, that communicates what you're trying to do, and invites others to get involved.</p>
<p>Instead of facing months of work, stress, email, all on your shoulders — you can share what you're working on with a community.  You can immediately share your vision and hear others' reactions.  If nobody likes it, you can learn.  If somebody already did it, you can learn.  And if your vision resonates, than you can work with others to bring it to life — instead of holding it all on your shoulders.</p>
<p>And instead of only seeing possibilities from your limited perspective, you can see many more possibilities as a community.  Because chances are, whatever obstacle you're facing — it's probably not an obstacle at all, and all you need is a different set of eyes or a person with different experiences to help you realize that and move onwards.</p>
<p>So with all of that in mind, this page is actually demonstrating <strong>two things.</strong></p>
<p>One, as a <strong>single node</strong> of a bigger picture, is <a href="https://makereal.pages.dev">a tool to help us</a> figure out <strong>what we're trying to do</strong> — <strong>in order to do what</strong> — and <strong>what can help us do it.</strong></p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SKe-WjWx3NU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<p>For example, maybe you're writing an email to Douglas Rushkoff, because you think that will help you get funding to work on your project, which really would just go to app development so you can start sharing what you have in mind.</p>
<p>If you think that through, you don't actually need any input from Douglas Rushkoff — nor do you need funding, or software development.  What you're really trying to do is share the vision you have in mind with people.  And there are a lot of ways to do that. (More to come in two paragraphs).</p>
<p>The vision of <a href="https://makereal.pages.dev">this tool</a> is sort of like a crowdsourced Stack Overflow, for helping people and ourselves figure out what we're trying to do.  It doesn't only need to be used for world-changing projects.  For example, one of the first use cases was helping my partner think through why she wanted a car — and get down to the very specific "in order to", of "have a convenient way to go on weekend trips."  That was her job-to-be-done — not driving to work, not going to the grocery store, not taking kids to soccer practice.  Just the weekend car trips.  And once you have that clarity, it can help you consider a topic in new ways.</p>
<p>Interested?  Want to explore the possibilities and help bring that to life?</p>
<p>Enter your email, and you'll be part of the things to come.</p>
<form id="1" on:submit|preventDefault={addEmail}>
<input name="email" type="email">
<button>Submit</button>{#if email_success_1}<p style="color: green;">Success!</p>{/if}
</form>
<p>The second thing this page is demonstrating, is a <strong>single node of a bigger picture</strong> — a picture where any project/vision, can start with a page as simple as this, so initiatiors can share those ideas and visions with others, expand the possibility space, and create desired future states together.</p>
<p>So if you have something in mind, spin up your own page to tell people about it.</p>
<p>You'll get to edit all the page content yourself, include custom HTML/CSS/JS, own the code — and it comes pre-built with a email form like the one above, so people can sign-up to get updates about your project, and you can do things with those emails like invite them to a Slack/Discord community for further steps.</p>
<p><em>(NOTE: When making your own page, the pre-built email form functionality is still in development)</em></p>
<p>Interested in <em>that</em> big picture project?  Want to explore the possibilities and help bring it to life as well?</p>
<p>Enter your email, like you did above.</p>
<form id="2" on:submit|preventDefault={addEmail}>
<input name="email" type="email">
<button>Submit</button>{#if email_success_2}<p style="color: green;">Success!</p>{/if}
</form>
<p>This is how it would work on any given page (at least, to start).</p>
<p>Want to bring your project to life?  Share your vision, invite others to take part, include a form so they can leave their contact emails.  And whoever's interested, start building it together.</p>
</div>
<style>
    .main{max-width:650px;margin:40px auto;padding:0 10px;font:18px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";color:#444}h1,h2,h3{line-height:1.2}@media (prefers-color-scheme: dark){body{color:#ccc;background:black}a:link{color:#5bf}a:visited{color:#ccf}}
</style>