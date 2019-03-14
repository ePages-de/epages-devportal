---
layout: post
title: Why experimenting on team structures is a good idea
date: 2019-02-26
header_image: public/feature-team.jpg
header_position: center
header_overlay: true
category: on-the-job
tags: ["team structure", "feature team", "process"]
authors: ["Tobias S."]
about_authors: ["tschlueter"]
---

Our current development team setup is composed of several component teams.
We have one bigger frontend team and three backend teams.
Component teams are a very good fit to our microservice architecture, and serve our [API-first](/blog/tech-stories/why-we-go-beyond-insights-from-our-cto/) approach quite well.
Each team can work independently, and build deep knowledge in certain domains.
Less context switch leads to more focus.
Having the experts in technology and of a certain domain in one team allows great technical decisions, high quality code reviews, as well es flexible, and robust solutions.

## Why changing a team structure?

Component teams work great for features that touch a small number of business domains.
The more services a feature touches, the more overhead in terms of team and task administration you have.
Knowing our next big feature requires heavy work on the frontend and product backend part we decided to join forces to form a new team.
We expected a great portion of focus, and to deliver fast results to our end customer without impact on our high standards for code quality and automated testing.

## What we did

We composed a temporary team of four backend developers, two frontend developers, two frontend designers, and one UX manager.
In a kickoff-meeting, Product Management and UX presented us the requirements, enriched by some first UI drafts.
Over all specialties we discussed challenges, risks, and a possible path to deliver the new feature.
As the outcome of the meeting we grouped stories into four milestones.
It felt really good to know that we can focus on the basic parts first, knowing what will come, but required no detailed solution for everything yet.
This gave us a big drive forward, and led to a simpler solution than I initially anticipated.

{% image_custom image="/assets/img/pages/blog/images/feature-team.jpg" width="50" lightbox %}

Having a clear common goal, it was time to move some tables, chairs, and monitors.
Within one day we transformed the room into a cozy, collaborative work environment.
I was impressed how many people volunteered to squeeze into one room following their intrinsic motivation.
Everyone was motivated and wanted to get this feature going.

Using a flying start, everyone finished their previous tasks, and soon was able to "report" some activities on our new feature.
It took us only two weeks to ramp up the team, and complete a part of the first milestone, which we showed in a company wide review.
The usage of a feature toggle allowed us to merge all changes into our master branches, avoiding complex merging strategies and long living branches.
For each change we have a streamlined process: once all tests passed on our build server, the internal code review is completed, the Continuous Deployment Pipeline put those changes into production.
This is a great feedback loop we achieved.
Every shop having this feature enabled can use it.
As it's only the first step it ain't ready for our end customers yet, but hey we can use it, show it, gather and incorporate feedback early on.
Product Management can decide when to switch on the toggle for real customers.
We could even do an early bird launch inviting some of our real customers to try out this feature before official launch. 

## The future of feature teams

Based on the experience we made so far with feature teams, I am really happy with the result.
Motivated team members, fast progress and high quality code.
What else you could wish for?
Well, nothing is perfect, that's why we use retrospectives at ePages to reflect about the past, and think on what we can improve in the future.
We did this in our feature team as well.
Feedback was really positive but there were also some important concerns to mention. 

We noticed that we were efficient because everyone was working in their expert zone.
We also noticed that once there was no next important topic for those experts, they had to pick stories not related to the feature team as knowledge was missing to work on other relevant parts.
A frontend developer cannot work on backend topics and vice versa.
Another topic was the lack of companions to discuss design or implementation challenges as well as doing code reviews.
If you only have two frontend developers in the team, what should you do if one is on vacation or on sick leave?
This indicates to me that in the long run a feature team can only perform well with t-shaped team members. 

We will see what the future has to offer.
I see advantages and disadvantages for both extremes.
Maybe there is a way inbetween. 
We will find our way by reflecting and adopting after each retrospective.

Stay tuned.
