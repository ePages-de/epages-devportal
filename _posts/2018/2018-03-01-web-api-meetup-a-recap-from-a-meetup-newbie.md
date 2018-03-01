---
layout: post
title: Web API meetup - A recap from a meetup newbie
date: 2018-03-01
header_image: public/web-api-meetup.jpeg
header_position: center
header_overlay: true
category: events
tags: ["meetup", "api", "raml", "spring"]
authors: ["Christina"]
---
On Tuesday, ePages had the pleasure to host a [WebAPI meetup](https://www.meetup.com/de-DE/webapi-hamburg){:target="_blank"}.
Having recently made some good progress with our API, we took this chance, and presented our way to create an API documentation using Spring REST Docs and RAML.
As this was my first meetup ever, I was already pretty excited how everything will be.
Let me share my impressions with you (to be honest: it's from a Technical Writing perspective but I will provide you with as much technical content and links as possible 😉).

## The project

As our backend developer Mathias already explained in his previous [blog post](/blog/api-experience/restful-api-documentation-with-spring-rest-docs-and-raml/), we started using Spring REST Docs for our documentation.
As this tool is strongly connected to our tests, we can always be sure, that our documentation is up-to-date.
This way, we didn't have to worry about undocumented new fields or features.
What makes Spring REST Docs even better: You can easily create an HTML-based documentation, such as our current [Beyond API docs](http://docs.beyondshop.cloud/){:target="_blank"}.
Birgit (our Technical Writer) and Mathias started their talk with this Spring Rest Docs approach and outlined its advantages.

## The journey is the reward
The way towards this status has been showcased with a short dialog between Mathias and Birgit, demonstrating the wishes of Technical Writers and the solutions our developers came up with.
They "discussed" about how to separate editorial content from the code, and how to implement a notification system to keep the Technical Writer (and thus the documentation) always up-to-date.
That means no busy Technical Writer who always tries to keep up with the changes.
Hooray!
Last but not least they tackled an example response topic.
As our Technical Writer didn't want to include some Luke Skywalkers next to Obi-Wan Kenobis as customers in the example responses, we needed to come up with a way to create consistent and realistic test data.
But our developers already have the solution at hand: a test data catalog.

## Future plans

For the moment, it's great to have such a static documentation online, but we would like to come up with an interactive documentation in the nearer future.
For this approach, [RAML](https://raml.org/){:target="_blank"} seems to be a great choice from a developer's perspective.
The main reason for choosing RAML is, that we can keep the benefits of Spring REST docs by building [restdocs-raml](https://github.com/ePages-de/restdocs-raml){:target="_blank"}.
So, in combination with some other open source projects, RAML offers great possibilities to build an interactive documentation.
If you are more interested in this part, check the [presentation slides](https://mduesterhoeft.github.io/spring-restdocs-raml-talk){:target="_blank"} or the [sample project](https://github.com/mduesterhoeft/spring-restdocs-raml-talk){:target="_blank"} and get some more ideas of what is planned.

## My overall impression

Next to all these interesting information, what else came up to my mind when joining this meetup?
Well, the meetup was a great chance to present our approach, to get some feedback, and to chat about it with a well-deserved after-work beer.
I've noticed, that the attendees that made it through the current wave of flu and the snowy weather have been quite interested and that getting some feedback always helps to improve and realize different mindsets.
So, I've definitely become a meetup fan and look forward to my next one 🙂!
