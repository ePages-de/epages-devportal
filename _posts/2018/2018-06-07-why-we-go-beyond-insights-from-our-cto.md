---
layout: post
title: Why we go Beyond - insights from our CTO
date: 2018-06-07
header_image: public/cto-post.jpeg
header_position: center
category: tech-stories
tags: ["javascript", "java", "kubernetes", "architecture", "api"]
authors: ["Harm"]
---

We've been working on a new backend architecture for quite a while now, which is in a certain way exhausting for all, as we have to maintain and develop two products with very little synergy.

So, why do we go this extra mile here at ePages?

## Environment changes fast

The IT world changed drastically in the last years as the amount of new open source frameworks and the speed of adoption seem to increase logarithmic.
Software vendors focus more and more on their core functionalities.
That allows them to specialize and become best-in-class in their specific segment.

### Approaches to bridge the gap

But when you cut functionality down to the core - you need to get the "topping" or "base" from somewhere else.
The downside of this evolution is that you need to integrate in various directions.
The easiest and nowadays common way to do so, is via APIs - more or less standardized interfaces, which allow systems to talk to each other and thus enrich your core systems with additional features.

### The past was different

As many other companies, ePages started the millennium with a monolith approach that we enhanced and enriched over time.
During this development time, we sometimes went straight, and sometimes went detours.
Later on, these detours never got cleaned up.
So, in the end you may offer some awkward functions like a holiday-appartment reservation tool - although being an ecommerce system.
That way our actual stack became overloaded and lead to many dependencies.
It is more and more work-intensive to maintain, and we are spending a lot of time on keeping stuff running instead of creating additional business value.
Although feature-rich, it still delivers a good performance and is heavily used and liked by our merchants.
But it's architecture is definitely outdated.

### New architecture needed

Thus, our goal was to build a new developer-friendly platform, that is easy to change and to maintain.
We wanted to focus on our core functionality - ecommerce - and get the above-mentioned toppings from other specialists.
That's why we've decided to go with an API-first approach, which allows us to be flexible - whatever may be needed in the future.

## Set it on a solid ground

This flexibility is on the one hand based on an architecture that decouples frontend and backend, and on the other hand on an organization of functions around capabilities, which enforces a modular structure.

Furthermore, we make use of the latest tech stack by changing towards the Java and JavaScript ecosystem and providing operational abstraction with Docker and Kubernetes.
Working with open source frameworks rounds everything off, as it allows us to “stand on the shoulders of giants”.
With the help of open source projects, 1 billion lines of open source code can be leveraged by 100 thousand lines of own code 🙂.

### Based on microservices

Technically, we chose microservices, which give us the advantage of working with single deployable units/docker images.
Every microservice owns its respective data and is exclusively responsible for its services and entities.
The communication between these microservices is either assured by a REST-API or asynchronous messaging.
This setup allows us the freedom of choice concerning microarchitecture and language. So every team can work in it's preferred environment.

As a result, we've built an SaaS ecommerce platform based on microservices and divided into typical ecommerce domains like products, orders, and customers.
The team organization is aligned to that structure in the meaning of one team owns n-services (1:n).
This decentral approach reduces dependencies between the single services and complexity in one microservice.
Furthermore, it offers a high flexibility and allows us to easily replace or add services.

### Additional target groups

Our API-first approach not only gives us back the "freedom to develop" and have fun doing so, but also allows us to open up different target groups by connecting to other systems.
Nearly everyone, who enriches us or vice versa, can connect via our API, as you can see below:

{% image_custom image="/assets/img/pages/blog/images/blog-infographic.png" width="100" lightbox %}

Our API represents the best possible starting point for you and/or your clients, to get an ecommerce functionality without big effort.

Resellers can sell fully fledged online shops with different themes and common functionalities that are hosted in our cloud.
With our shop provisioning and management tool, they can handle and organize their shops.

On the other hand, partners, agencies, and freelancers are able to concentrate on their clients.
They can sell customized services to them, while getting core ecommerce functionalities from the cloud and our central "Ecommerce-Backend-as-a-Service".

The extent of the customization is up to them.
Either they build upon our cockpit, come up with their own custom one, or create an app.
Additionally, they are free to build their own buy button, CMS integration, standalone storefront, or whatever is demanded by their clients.

Think about it - as a transparent resource, focused around the capabilities of ecommerce.
They don't need to take care of maintenance, updates, security, scalability, etc.
By using our ecommerce platform Beyond, they can purely focus on adding value for their clients.

To get started, we offer a simple [guide](https://developer.epages.com) for developers.
If you need a number of shops to start with, just contact us.
Depending on your plans, we can agree on different API-packages with 1, 5, 50, etc. shops.

So have fun, build great apps, integrations or storefronts ... and do not forget to [tell us](https://www.twitter.com/epagesdevs).

### About the author

{% image_custom image="/assets/img/pages/blog/images/author-harm-behrens.jpg" width="10" align="left" circle %}

<br>
Harm Behrens is CTO at ePages, and shares the “bike2work” passion of many ePagees. He’s an e-commerce-addict, internet enthusiast and Ruby/Docker evangelist. Find his tweets [@netzfisch](https://twitter.com/netzfisch).
