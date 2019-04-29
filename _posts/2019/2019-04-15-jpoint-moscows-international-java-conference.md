---
layout: post
title: JPoint - Moscow's international Java conference
date: 2019-04-15
header_image: private/jpoint.jpg
header_position: bottom
header_overlay: true
category: events
tags: ["conference", "development", "Java"]
authors: ["Natalia"]
about_authors: ["nzolotova"]
---

From 5th to 6th of April a large international Java conference named [JPoint](https://jpoint.ru/en/){:target="_blank"} was held in Moscow.
More than 1000 IT specialists met to share their knowledge, resolve coding tasks, win prices, and just have fun together.
It was very exciting, well organized and offered different activities and events dedicated to Java technologies.

The main focus was on microservice architecture, event sourcing, testing, productivity, and performance of distributed systems.
43 speakers from leading companies like JetBrains, Oracle, IBM, Microsoft, AxonIQ, and many others talked about their experience in using the most popular technologies, issues they've faced so far, and solutions they came up with.
Additionally, they shared best practices on how to be more productive, secured, and make our programming world better.

To give you a better overview of the talks, let me briefly mention my favourite ones:

## "Java microservices: from Netflix OSS to Kubernetes"

In this talk Aliaksandr Nozdryn-Platnitski from [Godel Technologies](https://www.godeltech.com/){:target="_blank"} shared "their company's experience of building systems based on microservice architecture". He explained which problems they faced using Spring Boot with Netflix OSS stack (Eureka, Feign, Ribbon, Hystix, Zuul) and how they managed to resolve them by switching to Kubernetes and Helm.
Aliaksandr also covered the benefits of these technologies and explained how to build a CI/CD with zero downtime deployment.

This talk might be very helpful for more experienced developers and architects who plan to move their service-oriented architecture from Netflix to Kubernetes.

## "Moving Spring Boot microservices from Java 8 to Java 11: what can possibly go wrong?"

[Vladimir Plizga](https://twitter.com/toparvion?lang=de){:target="_blank"} from the company СFT told us which issues developers can face when moving their Spring Boot microservices from Java 8 to Java 11. He presented general pitfalls of the migration process, especially during the dependencies resolution, and gave advice on how to make it more smoothly.

Special attention was paid to breaking changes in the Lombok library introduced in the [latest version](https://projectlombok.org/changelog){:target="_blank"}. Vladimir presented a very helpful workaround which is highly useful for developers who are using this tool.

Vladimir also shared links to additional information worth reading that can help to make your app work faster. The most useful one for me: [How Fast is Spring?](https://spring.io/blog/2018/12/12/how-fast-is-spring){:target="_blank"}

## "Strategies to manage consistency in distributed systems"

In this talk [Bernd Rücker](https://berndruecker.io/){:target="_blank"} from [Camunda](https://camunda.com/enterprise/){:target="_blank"} discussed consistency problems that occur in distributed systems.
He proposed possible solutions, including the Saga pattern. Furthermore, he presented recipes and frameworks that ease consistency management, allow you to achieve ACID properties in DBMS, and improve the performance of the applications.
I highly recommend to read [his blog](https://blog.bernd-ruecker.com/){:target="_blank"} to stay updated on this topic, and have a look at his [presentation](https://assets.ctfassets.net/oxjq45e8ilak/7pEyob5KPypV7OPOP1xgVR/60a159afa24867006aecec5c8c4668b0/Bernd_Ruecker_Lost_in_transaction_Strategies_to_manage_consistency_in_distributed_systems.pdf){:target="_blank"}.

## My overall impression

I really liked the organization of the conference. The presented topics were very informative and enlightening.
The speakers showed very interesting architectural approaches and technologies I had not known before.

It felt like every attendee gained some knowledge, and got some valuable advice that can help them to improve their workflow, speed up their development process, and have more fun at work.

I'd definitely like to come back to JPoint next year!