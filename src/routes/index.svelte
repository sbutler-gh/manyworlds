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
<h1>Realizing Desired Future States Together</h1>
<!-- <p>Today, there are lots of ways people try to make change in the world.</p>
<p>There are also many barriers to realizing new visions.</p>
<p>We need funding.  Validation.  Responses to our unsolicited emails.  Introductions.  Partnerships.  <em>An App! ... Press coverage! ... Fiscal sponsorship! ... Investment! ... Virality! ... Users!</em></p>
<p>... In reality, all we need is <strong>us.</strong></p> -->
<!-- <p>My name is Sam.  I've spent a lot of time researching and thinking about how we can create more desirable future states together.</p> -->
<!-- <p>These pieces of wisdom are the inspiration for what you're reading and what this is.</p> -->
<!-- <p>... Instead of starting your company with an app, or your movie with a screenplay, or your project with a fiscally sponsored non-profit — you start it with a message, that communicates what you're trying to do, and invites others to get involved.</p>
<p>Instead of facing months of work, stress, email, all on your shoulders — you can share what you're working on with a community.  If nobody's interested, you can learn from those reactions.  If somebody is already doing what you have in mind, you can learn from that too.  And if your vision resonates, than you can work with others to bring it to life — instead of holding it all on your shoulders.</p>
<p>And instead of taking on all the risk — time risk, capital risk, mental health risk, physical health risk, burnout risk — to create something by yourself, you can create with the support of an aligned community from the very start, which increases the chances of the project's success from the very start.</p>
<p>You'll be able to see more possibilities from more perspectives in the context of a working community.  And there's another important paradigm shift this could support:</p> -->
<p>We face enormous risks and challenges when starting new initiatives.  So when these initiatives are successful, we rent-seek on them.  Instead of putting our time and capacity towards important new problems and endeavors, we focus on maintaing the bit of security we've carved out — because the risks of working on something new are so great, from the very beginning.</p>
<p>This may give us security in the short-term.  Over the course of our lives, it means we have a world of people working on maintaining the status quo — instead of working on all of the most important challenges around us.</p>
  <p>Which world would you rather live in?  A world of people maintain the status quo for personal security — or a world where people <em>have</em>  the security, to work on important challenges and make the world better?</p>
<p><strong>What if we could make that world possible?</strong></p>
<p>What if we could lower the individual energy — the time, the risk, the challenges, the barriers — that go into working on an important problem, so people <em>can</em> work on those problems without sacrificing their security?  And along the way, transcend the paradigm of risk + rent-seeking + status quos, to a paradigm of value creation and important endeavors, because we have the support we need before we even step out the door?</p>
  <p>That's what this project is seeking to empower.   When we think about the futures we'll live in, a world of people <em>rent-seeking on solutions</em> pales in comparison to a world of people <em>working on important challenges and having the support to enjoy it all the while</em>.</p>
<p>So what is the support you need when starting on a new project?  Do you need funding?  Do you need a team?  Software developers, marketing, some kind of attention and support from your favorite thought leader?</p>
<p>If you're thinking in these generalities, it may be the case that you don't actually <em>know</em> what you need when starting something new.  And if you critically analyze your situation, understanding what you're trying to do and why, you'll see a number of actionable possibilities to make an impact and move things forward.</p>
<p>And if you invite others to explore your initiative with you, you'll see even more possibilities.</p>
<!-- <details><summary>On seeing more possibilities together</summary>
  <p>One of the key findings in this journey was a paper called <a href="https://www.tandfonline.com/doi/abs/10.1080/02604020500509546">Collaborative Authoring of Group Outcomes</a>.  Here's a primer and some personal takeaways:</p>
  <p>1. When we're thinking about something, the wider our perspective, the more possibilities we can see.  By exploring with others, we get a broader, <em>collective</em> view of the possibility landscape.</p>
  <p>2. When we start making decisions, our possibilities narrow.  We should be mindful of this, to not pre-emptively limit them.  We should also feel comfortable stepping back out from decisions, to see from a wider view and explore other possibilities.</p>
  <p>3. If we want the greatest possibilities available to us, we should inquire openly — willing to let go of our preconcieved notions, listen to others, and explore the possibilities that may arise in our collective field of view.</p>
  <p>4. My hypothesis: the more possibilities we can explore, the more preferrable future states we'll create.</p>
  <p>There are lots of examples that support this.  For example, David Graeber's reflections of <a href="https://www.youtube.com/watch?v=5eR_95slEFw">local political systems</a>.  Another is an anecdote, from the creator of a new paradigm for data infrastructure.</p>
  <p>Instead of building the tech, they communicated this new paradigm with a blog post.  The rationale: "either no one will care, which means it may not be a good idea anyway — or people will love it, and it will be a lot easier to build with others."</p>
<hr>
</details> -->
<p></p>
<hr>
<p>That's the inspiration for an experimental <a href="https://make-real.pages.dev">tool in the workshop</a>, to help us figure out what we're trying to do, why, and ways we can go about doing it.</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SKe-WjWx3NU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

  <p>Sort of like a crowdsourced Stack Overflow, for anything from startups, to software projects, to stories and art, to making choices in everyday life.  For example, one of the first use cases was helping my partner think through why she wanted a car — and get down to the very specific "in order to", of "have a convenient way to go on weekend trips."  That was her job-to-be-done — not driving to work, not going to the grocery store, not taking kids to soccer practice.  Just the weekend car trips.  And once you have that clarity, it can help you consider a topic in new ways.</p>
<p>Now imagine you were considering buying a car.  You could use this tool, to see the reasons that other people buy cars (e.g. getting groceries, going on weekend trips).  And you could see <em>other ways</em> that people accomplish those same ends, besides buying cars (e.g. cargo bikes, buses and trains).  So you could think more about what exactly you want a car for, and what exactly could help you accomplish those same jobs — in a variety of ways.  This is a crowdsourced tool for helping us understand Jobs to be Done — whether for a world-changing project, or for everyday life — and figuring out new and better ways we can accomplish those jobs.</p>
<p>So if you're facing an obstacle, you can consider — what are you trying to do?  Why?  And together, you and others can explore ways to accomplish it.  And in most cases, chances are, it's actionable.  In the words of my dad, <em>work the problem.</em>  It's in our hands.</p>
<p>Along those same lines, I'm exploring another pattern.  If you're trying to build an app, or create a film, or create change in your community — making that a reality probably doesn't depend on software engineering, a full screenplay, or a 501c3 non-profit.  It could just be a matter of communicating your vision, and inviting others to take part in it with you — giving you a broader perspective, more possibilities, and more chances for the vision to become the best it can be.  If the vision resonates with others, there's also a higher chance that you're building something valuable — you're validating it, and fostering community-led capacity to make it a reality from the very beginning.</p>
<p>You're participating in that pattern as you read this.  Instead of investing months of effort and risk into <a href="https://make-real.pages.dev">the tool above</a>, looking for VCs or writing long product specifications and trying to recruit developers, I'm communicating the vision — and inviting you to bring it to reality with me.  The choices are not defined or set-in-stone, there is no roadmap.  You and I can step back from the current set of choices, explore new possibilities, and evaluate different choices.  The goal?  Building desired future states together.  Whatever helps us reach the most desirable futures, is the path we should take.  So if new possibilities emerge, from new people getting eyes on this vision and bringing new perspectives to the table, we have the flexibility and capacity to consider those possibilities and make the best decisions we can.</p>
<p>Interested?  Want to help make it happen together?</p>
<p>Enter your email, and you'll recieve information about ways to collaborate.</p>
<form id="1" on:submit|preventDefault={addEmail}>
  <input name="email" type="email">
  <button>Submit</button>{#if email_success_1}<p style="color: green;">Success!</p>{/if}
  </form>
  <hr>
<p>And you're participating in this pattern in a different way too.  Does this whole way of creating things resonate with you?  Want to share what you're working on with others, and invite them to design it and make it real with you?</p>
<p><a href="/new_page">Create your own page</a>, just like this one.  You get HTML/CSS which you can fully customize with your vision — and deploy it into a live, working webpage, in a single click.  You can share that page with others, who can engage with your initiative however you recommend (including leaving their email address in a form, like the one above.)  In short, you can communicate your vision, invite others to create it with you, start exploring the possibilities and creating desirable futures together.</p>
<p>And you're participating in that process right now.  Instead of investing months of effort and risk into creating this tool, I'm choosing to communicate it — and inviting you to create this reality with me.</p>
<p>Have your own vision, project, change in mind?  <a href="/new_page">Create your page</a>, share it with others, and start making it real — together.</p>

<p>And instead of only seeing possibilities from your limited perspective, you can see many more possibilities as a community.  Because chances are, whatever obstacle you're facing — it's probably not an obstacle at all, and all you need is a different set of eyes or a person with different experiences to help you realize that and move onwards.</p>
<p>So with all of that in mind, this page is actually demonstrating <strong>two things.</strong></p>
<p>One, as a <strong>single node</strong> of a bigger picture, is <a href="https://makereal.pages.dev">a tool to help us</a> figure out <strong>what we're trying to do</strong> — <strong>in order to do what</strong> — and <strong>what can help us do it.</strong></p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SKe-WjWx3NU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<p>For example, maybe you're writing an email to Douglas Rushkoff, because you think that will help you get funding to work on your project, which really would just go to app development so you can start sharing what you have in mind.</p>
<p>If you think that through, you don't actually need any input from Douglas Rushkoff — nor do you need funding, or software development.  What you're really trying to do is share the vision you have in mind with people.  And there are a lot of ways to do that. (More to come in two paragraphs).</p>
<p>The vision of <a href="https://makereal.pages.dev">this tool</a> is sort of like a crowdsourced Stack Overflow, for helping people and ourselves figure out what we're trying to do.  It doesn't only need to be used for world-changing projects.  For example, one of the first use cases was helping my partner think through why she wanted a car — and get down to the very specific "in order to", of "have a convenient way to go on weekend trips."  That was her job-to-be-done — not driving to work, not going to the grocery store, not taking kids to soccer practice.  Just the weekend car trips.  And once you have that clarity, it can help you consider a topic in new ways.</p>
<p>Interested?  Want to explore the possibilities and help bring that to life?</p>
<p>Enter your email, and you'll be part of the things to come.</p>
<!-- <form id="1" on:submit|preventDefault={addEmail}>
<input name="email" type="email">
<button>Submit</button>{#if email_success_1}<p style="color: green;">Success!</p>{/if}
</form> -->
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