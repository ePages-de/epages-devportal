---
title: The X factor or how I learned to stop worrying and love the backend
layout: post
date: 2021-03-19
header_image: public/micronaut-header.jpeg
header_position: center
header_overlay: true
category: on-the-job
tags: ["agile", "company", "team"]
authors: ["Paolo"]
about_authors: ["ppriotto"]
---

It was autumn 2020.
I had been at ePages for almost six years, and always in the same frontend team.
You could say I was ready for some change.
So when our scrum masters started asking around who could imagine joining a new, cross functional team, I was immediately up for it.
Four months ago, the new team started to work.
Time to recapulate the journey since then.

## Done actually

Haven't we done this before?
Yes and no.
There have always been cross functional teams responsible for certain areas of the ePages products.
As far as I can tell, they're successful and satisfied with their team structure.
However, the biggest portion of the new product line has been developed following an "API first" approach, with a big core frontend team doing almost all the UI work.
This led to cross-team dependencies on tasks, unavoidable handovers, and an "us vs. them" attitude.
We'll take a deeper look at these issues in the following paragraphs.

## The incrementable Hulk

With one frontend-only and multiple backend-only teams, our product owners had a hard time juggling the different priorities in order to minimize the time between API design and UI implementation.
This was especially visible in the context of [incremental and iterative software development](../../methods-and-tools/the-secret-of-incremental-and-iterative-software-development/) : if the UX designer needed to adapt the concept during the UI implementation, it could happen that the API needed to be adapted, too.
In the worst case, the UI team had to wait for the API change, while the team responsible for the API, which had moved on to the next feature, was forced into a context switch, pausing whatever they were currently working on.

## Lost in documentation

Experience shows that it's impractical, if not impossible, to come up with a specification detailed enough to leave no questions open during implementation.
This is especially true for user interfaces.
In an agile setup with a high level of trust towards developers to _do the right thing_, like we have it here at ePages, this doesn't seem problematic at first.
But if you put backend and frontend in different teams, you have not _one_ point of handover from specification into engineer's brains, but _three_ : from product owner to backend developers, from product owner to frontend developers, _and_ from backend developers to frontend developers.
This holds true despite the fact that we usually involve frontend developers in the API design process.

## Planet of the APIs

Let's have a closer look at the handover from backend to frontend.
From a technical perspective, everything is clear : the backend provides a well-documented API, the frontend consumes it, done.
In practice however, at least with traditional (as in "no GraphQL") REST APIs, the backend needs to now upfront what exact data the frontend needs, which is very hard to tell by just looking at screen designs.
The frontend, on the other hand, only knows the data model exposed through the API and is unaware of certain technical restrictions or performance bottlenecks.
This leads to situations where the API is not used as intended, superfluous requests are being made, and both sides are unsatisfied with the implementation.

The underlying cause for the above issues is the separation of teams.
Each team has its own scheduled meetings, sits in its own room, and has its own inside jokes (hopefully not just lame movie puns.
Changing an inappropriate API design or usage involves walking over to the other room, and finding someone who then has to switch context, understand the problem, and maybe even create a ticket for it.
Since programmers are lazy, they'll start taking shortcuts to avoid this overhead, at the cost of inefficient and obscure API usage.
It's easy to complain about "them" not doing "the right thing" for "us", or "them" using "our" API wrong, when "they" are in another team.

## xXx functional – Triple X

When I joined the new cross functional team, it was a real cultural shock.
I had to learn so many new terms, processes, and tools, that had previously been none of my business, or hidden behind JSON APIs.
The complexity and various dependencies in the cloud based microservice setup used by our backend was overwhelming.
My goal was to understand, be able to review, and contribute to the parts of the backend which my team decided to focus on.
From the other end, my two backend colleagues, who wanted to review my frontend code and start contributing to the frontend projects, were overwhelmed by the complex code structure and the many coding and formatting conventions enforced there.
On top of that, we were used to different processes: Scrum vs. Kanban, dedicated vs. integrated QA, or the [localization workflow](../../language-and-localization/how-to-cope-with-a-localization-tool-in-action/), which was new to the backend developers.

But because we were all in one team, and all in the same situation, there was always someone available and happy to educate the others about any of those topics.
Even though Corona has made me spend no more than one (!) day in the office ever since I've joined the team, the inhibition threshold to have a short video call about any open question has always been very low.
Contributing code in a different programming language to "the other end" (in my case Java to the backend) gave me worthful insights, broadened my own horizon, and helped me gain another perspective on the overall software architecture.
Likewise, my colleagues have made similar experiences contributing to the frontend code.

## V for velocity

All of the above made the start with the new cross functional team feel like a success story.
Of course, starting something new comes with an initial enthusiasm.
But some advantages really stand out.
For one, everybody has the same priorities.
This avoids a lot of friction.
And because we focus on a small part of the product from backend to frontend, we are able to help each other out.
For instance, I could quickly fix an integration test for my colleague on his day off.
Being able to complete a feature from end to end without external dependencies feels very empowering.
Here are some quotes from our internal team chat:

> "I love how we think and act on the whole feature with the same mindset"

> "Nice how those two tickets I needed for the customer detail page went from creation (monday) to resolution (monday and today respectively, with the one resolved today also started today) 👏️"

## Three men and a backlog

A big part of what makes the work in my new team efficient is its size.
With only three developers plus product owner and scrum master, it's easy to keep meetings short, know what everybody is working on, and have an overview of the complete backlog.
We can achieve all of this with very little process overhead.
Because we focus on a small part of the software, we are able to become real experts there.

That said, we're not living on an island.
As we're contributing to shared code bases, we still need to communicate a lot with the other teams, if not more than ever.
We have set up a couple of new cross-team alignment appointments to account for this.
We also try to have everybody on the same page with knowledge transfer days and joint feature kickoff meetings.
Still, streamlining the communication with the rest of the company is possibly the hardest part about forming a new team.

## xXx 2 – The next level

The other teams here at ePages have watched our little experiment with great interest.
I believe that our journey towards cross functional teams has only begun.
Along the way, we'll encounter some stepping stones for sure.
For instance, we still haven't fully figured out a good distribution of responsibilities for the various microservices, and I'm curious to see where Conway's law ("organizations design systems which mirror their own communication structure") will lead our software architecture.
Will we move from frontend monoliths to microfrontends?
Follow this blog and be the first to find out!


