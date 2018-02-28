---
layout: post
title: Hamburgs's first WebAPI meetup 2018 - a recap from a meetup newbie
date: 2018-03-01
header_image: public/web-api-meetup.jpeg
header_position: center
header_overlay: true
category: events
tags: ["meetup", "API", "RAML", "Spring"]
authors: ["Christina"]
---

On Tuesday, we had the pleasure to host the first [WebAPI meetup](https://www.meetup.com/de-DE/webapi-hamburg) in 2018.
Having recently made some good progress with our API, we took this chance and presented our way to to create an API using Spring REST Docs and RAML.
As this was my first meetup ever, I was already pretty excited how everything will be.
Let me share my impressions with you (to be honest: it's from a Technical Writing perspective but I will provide you with as much technical content and links as possible 😉).

Birgit (our Technical Writer) and Mathias (our backend developer) started their talk with our Spring Rest Docs approach and demonstrated the advantages of the tool and the challenges towards our [current documentation status](http://docs.beyondshop.cloud/).
The way towards this status has been showcased with a small dialogue between Mathias and Birgit, demonstrating the wishes of Technical Writers and the ideas our developer came up with.
I quickly sum up the most important aspects of this dialogue:

## Can we compile a complete documentation?

Only a complete documentation is a good documentation.
That's why the first requirement has been, that we automatically compile the whole documentation.
This issue was solved by a repository that composes all public documentation from the relevant microservices.

## Can I be automatically informed about changes?

As already stated above, we want our API documentation to be always up-to-date.
Without a busy Technical Writer that always tries to keep up with the changes.
That's why the developers came up with a notification system via email to achieve this automatic information system.

## Can we separate descriptions from the code?

Descriptions are part of the editorial content in the documentation.
But how to create awesome descriptions without touching the code and thus avoiding problems because Technical Writing unwittingly breaks something?
Our solution: externalize the related texts from the tests by using centralized YAML files.

## Can we create realistic example responses?

As our Technical Writer didn't want to include some Luke Skywalkers next to Obi-Wan Kenobis as customers in the example responses, we needed to come up with a way to create consistent and realistic test data.
That's why our developers came up with a test data catalog that is maintained by our Tech Writing team.

## Can we make our documentation more interactive?

Having this kind of a static documentation is great, but we would like to come up with an interactive documentation in the nearer future.
For this approach, RAML seems to be a great choice from developer perspective.
The reasons for RAML and the possibilities it offers has been part two the presentation.
If you are more interested in this part, just check the [presentation slides](https://mduesterhoeft.github.io/spring-restdocs-raml-talk) and get some more ideas of what is planned or check our blog post about [RESTful API documentation with Spring REST Docs and RAML](https://developer.epages.com/blog/api-experience/restful-api-documentation-with-spring-rest-docs-and-raml/).

So next to all these interesting information, both, from technical and from technical writing perspective, what else came up to my mind?
In my opinion, this meetup has been a great chance to present our approach, get some feedback and have a chat about it over some delicious snacks and drinks.
I've noticed, that the attendees have been quite interested and that getting some feedback always helps to improve and realize different mindsets.
That's why I've become a meetup fan 🙂!
