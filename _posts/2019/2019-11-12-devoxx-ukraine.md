---
layout: post
title: Devoxx Ukraine
date: 2019-11-12
header_image: private/devoxx-ukr.png
header_position: top
category: events
tags: ["conference", "java", "rest", "spring", "reactive"]
authors: ["Aleksei"]
about_authors: ["asasin"]
---

In this blog post, I'd like to share my experiences I made at this year's [Devoxx Ukraine](https://devoxx.com.ua/){:target="_blank"}.
My journey to this conference started from Hamburg, Germany.
It was not a direct flight, and it took me almost the whole day to get to Ukraine.
Fortunately, I was in Ukraine before, and it was not difficult to find my accommodation in Kiev by using the online booking resources.
I had a nice hotel with a great view of the city.

The conference itself was two days on Friday and Saturday, and the location was in big Event space M82, Kiev, Mezhyhirska street 82.
The Hall was quite big and had seven audience rooms, and many other places where visitors had the possibility to take a break between the presentations.

In total, I had the chance to visit 18 presentations.
Each of them was unique, and it is difficult to say which one was the most useful.
Going to each presentation, I tried to learn at least three new topics.
In the following I would like to highlight only a few of them to give my impression of them.
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
The speaker drew a lot of attention to his presentation with his presentation style and a sense of humor.
The presentation showed what the developer needs to understand before starting using Reactive Spring:

* Processor<T,R>
* Subscriber<T>
* Publisher<R>
* Subscription
* onNext(T t)
* onSubscribe(Subscription s)
* onComplete()
      
If the developer understands the above-listed bullet points, then he already made great progress and can easily use the rest Reactive Spring functionalities.
Another part of the presentation was about “R2DBC – Reactive Relational Database Connectivity” driver.
Together with this driver, the Reactive Spring gets a great opportunity to make a powerful web application using a non-blocking database connection.
Listening to this presentation I understood how great is to use a new version of Java and how it increases programming code efficiency.
For those who do not know where to start learning the Reactive Spring the presentation from Josh Long is a great start.

### Design principles for the effective developer, [Sebastian Daschner](https://twitter.com/DaschnerS){:target="_blank"}

{% image_custom image="/assets/img/pages/blog/images/devoxx-ukr.png" width="20" lightbox align="right" %}

It was a great presentation about managing projects and how to manage applications using a productive architecture design approach.
The presentation showhed an example how important it is to use proper abstractions to aggregate classes by domain and apply Domain-Driven Design (DDD).
I have seen many applications that after some time became too large and maintaining them costs more and more resources.
Even finding programming code among all other classes might cost a lot of effort what does not make the work more productive.
Only after starting using Domain-Driven Design I knew how easy I can navigate in the application to find a required functionality.
I think using of Domain-Driven Design is a matter of practice.

### What else?

I would also like to emphasize these presentations:

1.	Pain and gain of introducing Kafka in Microservices architecture at eBay by Grygoriy Gonchar and Christiane Lemke.
It was a great chance to get to know the experience of an ecommerce company how to apply a microservices architecture to the existing product.
2.	Java. Migrating to 11 in real app by Piotr Przybył.
In this presentation the speaker explained and showed what comes with the new Java version, mentioned the importance of automated testing for the upcoming Java version updates as well as pointed out to not forget to read the documentation.

## Summary

In general, I was satisfied with Devoxx Ukraine in 2019.
All declared presentations were carried on time.
After this summit, and my list of materials, it was definitely replenished with interesting topics for reading in my free time.
I'm better at Java and know what technologies I should pay attention to to make my working code more productive.