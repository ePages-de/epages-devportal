---
layout: post
title: Recap of Devoxx Ukraine 2019
date: 2019-11-12
header_image: private/devoxx-ukr.jpg
header_position: top
header_overlay: true
category: events
tags: ["conference", "java", "rest", "spring", "reactive"]
authors: ["Aleksei"]
about_authors: ["asasin"]
---

In this blog post, I'd like to share the experiences I made at this year's [Devoxx Ukraine](https://devoxx.com.ua/){:target="_blank"}.
My journey to this conference started from Hamburg, Germany.
It was not a direct flight, and it took me almost the whole day to get to Ukraine.
Fortunately, I was in Ukraine before, and it was not difficult to find my accommodation in Kiev by using the online booking resources.
I had a nice hotel with a great view of the city.

The conference itself was two days on Friday and Saturday, and the location was Event space M82 in Kiev.
The hall was quite big and had seven audience rooms, and many other places where visitors had the possibility to take a break between the presentations.

In total, I had the chance to visit 18 presentations.
Each of them was unique, and it is difficult to say which one was the most useful.
Going to each presentation, I tried to learn at least three new topics.
In the following I would like to highlight a few of them.
(This is my subjective opinion.)

### Revisiting Effective Java in 2019, [Edson Yanaga](https://twitter.com/yanaga?lang=en){:target="_blank"}

It was the first presentation of the conference and it immediately set a high level for all other presentations in my point view.
Visiting this presentation I had the chance to review simple programming tasks using:

* Lambdas
* Streams
* Optionals
* Default methods in the interface
* try-with-resources

All of them might look simple, but using them efficiently is always better.

### Reactive Spring, [Josh Long](https://twitter.com/starbuxman){:target="_blank"}

I think this was the most exciting presentation.
The speaker drew a lot of attention with his presentation style and a sense of humor.
With his talk Josh showed what a developer needs to understand before starting using Reactive Spring:

* Processor<T,R>
* Subscriber<T>
* Publisher<R>
* Subscription
* onNext(T t)
* onSubscribe(Subscription s)
* onComplete()
      
If a developer understands the above-listed bullet points, then they already made great progress and can easily use the rest Reactive Spring functionalities.
Another part of the presentation was about “R2DBC – Reactive Relational Database Connectivity” driver.
Together with this driver, Reactive Spring gets a great opportunity to make a powerful web application using a non-blocking database connection.
Listening to this talk I understood how great is to use a new version of Java and how it increases programming code efficiency.
For those who do not know where to start learning Reactive Spring the presentation of Josh Long is a great start.

### Design principles for the effective developer, [Sebastian Daschner](https://twitter.com/DaschnerS){:target="_blank"}

{% image_custom image="/assets/img/pages/blog/images/devoxx-ukr.jpg" width="20" lightbox align="right" %}

It was a great talk about managing projects and how to manage applications using a productive architecture design approach.
Sebastian showed an example of how important it is to use proper abstractions to aggregate classes by domain and apply Domain-Driven Design (DDD).
I have seen many applications that after some time became too large and maintaining them costs more and more resources.
Even finding programming code among all other classes might cost a lot of effort and does not make the work more productive.
Only after starting using Domain-Driven Design I knew how easy I can navigate in the application to find a required functionality.
I think using Domain-Driven Design is a matter of practice.

### What else?

I would also like to emphasize these presentations:

1.	Pain and gain of introducing Kafka in Microservices architecture at eBay by [Grygoriy Gonchar](https://twitter.com/ggonchar){:target="_blank"} and Christiane Lemke.
It was a great chance to get to know the experience of an ecommerce company on how to apply a microservices architecture to the existing product.
2.	Java. Migrating to 11 in real app by [Piotr Przybył](https://twitter.com/piotrprz?lang=en){:target="_blank"}.
In this presentation the speaker explained and showed what comes with the new Java version, mentioned the importance of automated testing for the upcoming Java version updates as well as pointed out to not forget to read the documentation.

## Summary

In general, I was satisfied with Devoxx Ukraine in 2019.
All declared presentations were carried on time.
After this summit, and my list of materials, it was definitely replenished with interesting topics for reading in my free time.
I'm better at Java and know what technologies I should pay attention to to make my working code more productive.