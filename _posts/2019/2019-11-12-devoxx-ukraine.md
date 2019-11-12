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

In this blog post, I want to share my experience in Devoxx Ukraine 2019

My journey to this conference started from Hamburg, Germany.
It was not direct flight and I have spent almost the whole day to get to Ukraine.
Fortunately, I was in Ukraine before and it was not difficult to find accommodation in Kyiv by using online hotel booking resources.
I had a nice accommodation with a great view of the city.

The conference itself was two days on Friday and Saturday and the location was in big Event space M82, Kyiv, Mezhyhirska street 82. The Hall was quite big and had seven audience rooms and many other places where visitors had the possibility to take a break between presentations.

In total, I had a chance to visit 18 presentations.
Each of them is unique, and it is difficult to say which one is the most useful.
Going to each presentation, I tried to learn at least three new topics.

Further, I would like to highlight only a few of them to give my impression of them.
(This is my subjective opinion)

I would like to start from presentation from Edson Yanaga.

### Revisiting Effective Java in 2019,  Edson Yanaga

It was the first presentation in Devoxx Ukraine 2019 and it immediately set a high level for all other presentations in my point view.
Visiting this presentation I had a chance to review simple programming tasks using:
    • Lambdas
    • Streams
    • Optionals
    • Default method in interface
    • try-with-resources
All of them might look simple, but using them efficiently is always better.

### Reactive Spring, Josh Long

I think it was the most exciting presentation.
The speaker drew a lot of attention to his presentation with his presentation style and a sense of humor.
On the presentation was shown what the developer needs to understand before starting using Reactive Spring:
    • Processor<T,R>
    • Subscriber<T>
    • Publisher<R>
    • Subscription
    • onNext(T t)
    • onSubscribe(Subscription s)
    • onComplete()
      
If the developer understands the above-listed bullet points then it is already great progress and can easily use the rest Reactive Spring functionalities.
Another part of the presentation was about “R2DBC – Reactive Relational Database Connectivity” driver.
Together with this driver, the Reactive Spring gets a great opportunity to make a powerful Web application using a non-blocking Database connection.
Listening to this presentation I understood how great is to use a new version of Java and how it increases programming code efficiency.
For those who do not know where to start learning the Reactive Spring the presentation from Josh Long is a great start.

### Design principles for the effective developer, Sebastian Daschner

It was a great presentation about managing projects and how to  manage applications using a productive architecture design approach.
On the presentation was shown an example how important to use a proper abstractions to aggregate classes by domain and apply Domain-Driven Design (DDD).
I have seen many applications which became after some period too big and maintaining them cost more and more resources.
Even finding programming code among all other classes might cost a lot of effort what does not make the work productive.
Only after starting using Domain-Driven Design how easy I can navigate in the application to find a required functionality.
I think using of Domain-Driven Design is matter of practice.

image

I would also like to few other presentations:
1.	Pain and gain of introducing Kafka in Microservices architecture at eBay. Grygoriy Gonchar, Christiane Lemke. It was a great chance to get to know the experience of e-commerce company how to apply Microservices architecture to the existing product.
2.	Java. Migrating to 11 in real app, Piotr Przybył. In this presentation, the speaker explained and showed what changes in the new Java version, explained the importance of automated testing for coming java version updates and mentioned don't forget to read the documentation.

## Summary

In general, I was satisfied with Devoxx Ukraine in 2019. All declared presentations were carried on time. After this summit, and my list of materials, it was definitely replenished with interesting topics for reading in my free time. I met better with Java, what technologies should you pay attention to do to make my working code more productive.