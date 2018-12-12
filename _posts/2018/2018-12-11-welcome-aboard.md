---
layout: post
title: Welcome aboard!
date: 2018-12-11
header_image: public/boardgame.jpg
header_overlay: true
category: on-the-job
tags: ["company culture"]
authors: ["Jan S."]
about_authors: ["jschnegotzki"]
---

Starting off at a new company can be quite overwhelming: New colleagues, new processes, new just about everything.
Everyone who has had the experience of coming to a new workplace and feeling somewhat lost knows how important it is to get some decent guidance during the first days and weeks.
At ePages, we don't want anyone to feel like they don't know what's going on around them.
That's why we value a thorough onboarding process that takes into account the technical, procedural and social aspects alike.
The welcome talks, our buddy program and all the events to get everyone on board were already introduced in our [5 steps to make you feel comfortable in your new job](https://developer.epages.com/blog/on-the-job/5-steps-to-make-you-feel-comfortable-in-your-new-job/) and [How ePages gives new developers a great start](https://developer.epages.com/blog/on-the-job/how-epages-gives-new-developers-a-great-start/) posts.
This time, we focus on how our backend developers are onboarded to ensure a good feeling and immediate productivity.

#### Setting up the tech

Of course, everyone who is involved in the development of a software product needs the right tools to keep up.
In terms of hardware, all employees in our department can choose between MacOS and Linux as operating systems, depending on their preferences. 
To make sure that all team members operate with the same tools at their disposal, the necessary set-up work, partly scripted, partly manual, is done together with different team members.
This set-up ranges from basic software to useful command line tools to IDEs and infrastructure:

* **Google Chrome** as the Internet Browser
* **Atom** as the Text Editor
* **jq** as the Command Line JSON Parser
* **Kubernetes** for Application Deployment
* **MySQL** for Database Management
* **Docker** for Container Management
* **intellij** as an IDE that supports both Java and Kotlin
* etc.

While the usage of tools such as **git** for version control and **MySQL** for database management is a set decision, when it comes to infrastructure-independent software, everyone is free to choose their favorites.
If you want a differenet browser, a different text editor or prefer some different IDE, just go for it, no explicit permission is required.
And of course, every bit of software, script or knowledge that boosts your productivity can and should be applied.
Whether you share your secret knowledge with your colleagues is up to you, but spreading the word about some trick you've picked up somewhere is highly appreciated and even [institutionalized](Linkt to Best of Bash post if it comes out before this one) at ePages.
This introductory section is complemented by a series of presentations about the general architecture, available documentation and more [?].
Next up are all the administrative tasks to get you on the road:
Assigning you to all groups on GitHub and DockerHub, creating a **Jenkins** account for access to the CDP and inviting you to all relevant groups on our messaging software Mattermost. 

#### Down to the nitty-gritty

Providing lots of information to each new colleague is important to us, however, we also believe that getting to work is the best way to grow.
But no worries, our approach to getting someone new to start contributing to the product is by doing lots of pair programming.
This means that an experienced developer overlooks the progess being made and provides suggestions.
Whether you are "taken by the hand" or work more independently from the start, depends on your experience and wishes.
This way, you will go through a series of little scenarios conceived to give a gentle introduction to how the ePages infrastructure works.
This section is started off by REST calls against a set of endpoints to get a feel for how to interact with our API.
Again, the choice of tools is all yours, whether you prefer curl, httpie, Postman or any other means of sending HTTP requests, everything is possible.
Once the API is understood at the highest abstractiong level, it's time for a dive into the code introducting both the **Lombok** library and the **Spring Framework**.
You will build a new service and test it.
[...]


#### Getting one with the team(s)

Because of our approach to onboarding, the set-up and learning stage smoothly fades into the fully productive stage.
But the learning never stops, because working in an agile framework means being able to adapt quickly to new challenges.
This also means that trying new things and occasionally challenging things that just don't work anymore is part of what we do.
At ePages, cross-team communication is a vital part of iteratively improving our product, spotting errors and delivering better results.
So really close contact between the backend teams that develop Beyond, the frontend team, tech writing and product management is fostered.
We believe that this is a great driver of improvement both on the company and the personal level.