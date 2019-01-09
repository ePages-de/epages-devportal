---
layout: post
title: How to get new backend developers up to speed
date: 2019-01-10
header_image: public/rocket.jpg
header_overlay: true
header_position: top
category: on-the-job
tags: ["company culture", "onboarding", "development", "Java"]
authors: ["Jan S."]
about_authors: ["jschnegotzki"]
---

Starting off at a new company always takes some getting used to: new colleagues, new processes, new just about everything.
Everyone who has had the experience of coming to a new workplace and feeling somewhat lost knows how important it is to get some decent guidance during the first days and weeks.
At ePages, we don't want anyone to feel like they don't know what's going on around them.

## Welcome to the company

That's why we value a thorough onboarding process that takes into account the technical, procedural, and social aspects alike.
You'll hear welcome talks by people from the whole company: Scrum Masters, the CTO, colleagues from Design or the Service Center team.
You'll also be assigned a buddy, meaning someone who's been in the company a bit longer, and can answer the questions you might otherwise be too shy to ask.

Since there are so many of them, you will probably be lucky enough to take part in one of our company events, be it a [hackathon](https://www.youtube.com/watch?v=j-bj3nC7qss){:target="_blank"} or our [ePages YOU](/blog/events/epages-you-our-annual-gathering-of-epagees/), quite soon after you start.
You can read about it all in more detail in our [5 steps to make you feel comfortable in your new job](/blog/on-the-job/5-steps-to-make-you-feel-comfortable-in-your-new-job/) and [How ePages gives new developers a great start](/blog/on-the-job/how-epages-gives-new-developers-a-great-start/) posts.

This time, we focus on how our backend developers are onboarded to achieve fast productivity.

## Setting up the tech

Of course, everyone who is involved in the development of a software product needs the right tools to keep up.
In terms of hardware, all employees in the Research & Development department can choose between computers with MacOS, Linux, or Windows as operating systems, depending on their preferences. 
To make sure that all team members operate with the same tools at their disposal, the necessary setup work is done first. 
The setup for MacOS happens mostly with Ansible, for Linux, there are custom installer scripts.
Different team members help out here, because some manual work is still required.

This setup ranges from installing basic software and useful command line tools to configuring IDEs and infrastructure.
We use a couple of technologies across the development teams:

* **git** for version control
* **MySQL** for database management
* **Docker** for container management
* **Kubernetes** for deployment
* **Jenkins** for our CDP

When it comes to infrastructure-independent software, everyone is free to choose their favorites.
If you want a different browser, a different text editor, or prefer some different IDE than those your colleagues use, just go for it, no explicit permission is required.

And of course, every bit of software, script, or knowledge that boosts your productivity can and should be applied.
Whether you share your secret knowledge with your colleagues is up to you, but spreading the word about some trick you've picked up somewhere is highly appreciated, and even institutionalized at ePages:

{% twitter https://twitter.com/epagesdevs/status/1071011696007921664 %}

## Getting to know the tech better

This introductory section is complemented by a series of presentations.
To get everyone on the same level, this is kicked off by a talk about what RESTful architecture actually means, and how this shapes the way we construct our software.

* A concrete example for this is provided by an overview of the ePages microservice architecture, which gives a first glimpse of how everything works together.
The vertical and the horizontal partitioning of the system will be presented visually and discussed thoroughly.
You'll see what resources communicate with each other under the hood and what gets exposed to external providers.
The architecture also has a bearing on the organisation of our teams, so this one has technical as well as organisational implications.

* Another essential topic is how we use [**Helm**](/blog/tech-stories/kubernetes-deployments-with-helm/) in our CDP.
To constantly roll out the newest changes to our customers, we use Kubernetes for deployment.
Helm sits on top of this architecture for package management, so proper treatment of how we use it will be important.

Presentations come from all members of the backend teams, so you'll get a richly facetted view on the architecture, the libraries, and the frameworks in place.
Next up are all the administrative tasks to get you on the road, creating all the accounts, and giving you all the permissions you need.

## Down to the nitty-gritty

Providing lots of information to each new colleague is important to us.
However, we also believe that getting to work is the best way to grow.
But no worries, our approach to getting someone new to start contributing to the product is by doing lots of pair programming.
This means that an experienced developer overlooks the progess being made and provides suggestions.

This way, you will go through a series of little exercises conceived to give a gentle introduction to how the ePages infrastructure works.
This section is started off by REST calls against a set of endpoints to get a feel for how to interact with our API.
Again, the choice of tools is all yours, whether you prefer curl, httpie, Postman, or alike.

Once the API is understood at the highest abstraction level, it's time for a dive into the code introducting both the [**Lombok**](https://projectlombok.org){:target="_blank"} library and the [**Spring Framework**](https://spring.io){:target="_blank"}.
Lombok is a library that provides automatic code generation to relieve you from tedious typing, such as defining getters and setters for every property of a class.
Spring provides the basis much of our functionalities are built on.

You will build a new service and test it to immediately see your work in action.
To provide some realistic and relatable examples with manageable complexity, we have some exercise scenarios prepared.
Among those are a todo app and a small microservice structure centered around ordering pizza.

The understanding thus gained provides a strong foundation and just needs to be scaled to more complex systems.
Once you've gone throught enough of the exercises to be comfortable with the whole system, you can already get to real projects.
This can happen as early as your second week, if you want to.

## Getting one with the team(s)

Because of our approach to onboarding, the setup and learning stage smoothly fades into the fully productive stage.
But the learning never stops, because working in an agile framework means being able to adapt quickly to new challenges.
This also means that trying new things and occasionally challenging things that just don't work anymore is part of what we do.

At ePages, cross-team communication is a vital part of iteratively improving our product, spotting errors and, delivering better results.
So really close contact between the backend teams that develop Beyond, the frontend team, Technical Writers and Product Management is fostered.
We believe that this is a great driver of improvement both on the company and the personal level.

If this short insight has aroused your interest, why don't you have a look at our open positions at [https://developer.epages.com/devjobs/](/devjobs/).