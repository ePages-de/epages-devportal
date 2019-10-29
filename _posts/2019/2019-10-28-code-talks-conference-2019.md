---
layout: post
title: code.talks 2019 - popcorn, nachos and code
date: 2019-11-01
header_image:
header_position: bottom
header_overlay: true
category: tech-stories
tags: ["code", "talks", "development", "tools"]
authors: ["Manel", "Narcis"]
about_authors: ["mmerino","nsimu"]
---
# Talks about code
Over 1500 developers gathered last week in Hamburg to talk about code. The [code.talks](https://www.codetalks.de/home){:target="_blank"} developers conference took place on the Dammtor Cinemmaxx same great location as last two years.

# Highlights

## The Early Days of Id Software: Programming Principles - John Romero
(by Narcis)
[John Romero](https://en.wikipedia.org/wiki/John_Romero){:target="_blank"} is an award-winning game development icon whose work spans over 130 games, 108 of which have been published commercially. Romero is the "father of first person shooters" having led the design and contributed to the programming and audio design of the iconic and genre-defining games DOOM, Quake, Heretic and Hexen.
He presented a brief history of id Software, how he started, how he build the team and the programming principles they adopted over time in order to be able to ship so many games. The presentation was filled up with short stories, very informative and also entertaining. The programming principles still apply today:Keep your code absolutely simple, encapsulate functionality to ensure design consistency, don't program for future games, test your code, don't waste others' time, maintain shippable code.


## Will AI kill the developer's job ? - [Tobias Zander](https://www.codetalks.de/program#speaker-711?event=5){:target="_blank"} @ [savedroid](https://www.savedroid.com/){:target="_blank"}
(by Manel)
I think any developer has been thinking on this topic and has a formed opinion. At least I have one and wanted to know what a such matter expert has to say about it.

Tobias gaves us some figures, like that 29% of developers think their efforts will be replaced by AI, and also a couple of reasons why he's convinced that AI will impact developers:
- it's expensive to write code but cheap to run it.
- industry cares more about fast code development than about good code.

So in Tobias' opinion, the question is not if, but which job will it "optimize" first; and in this regard, programs aimed to solve problems that have the property that it is significantly easier to collect the data (or more generally, identify a desirable behavior) than to explicitly write the program, are good candidates for AI.

But don't worry !!, human programmers still will have to  manually curate, maintain, massage, clean and label datasets.


## The Changing Face of ETL: Event-Driven Architectures for Data Engineers - Robin Moffat @ Confluent
(by Narcis)
This was another interesting presentation about Event Streaming with Apache Kafka.
Robin Moffat explained how to use Apache Kafka not just as a message queue but also as a central part of the architecture. He explained that the events are both a notification an state transfer. Using event stream we can log the behavior. Using Kafka as central source of truth instead of a relational database will allow future refactorings with a clear architecture.
[Talk Slides](https://talks.rmoff.net/A4pLsH/the-changing-face-of-etl-event-driven-architectures-for-data-engineers){:target="_blank"}
[E-Books](http://cnfl.io/book-bundle){:target="_blank"}


## Boost your development with proper API design - [Markus Held](https://www.codetalks.de/program#speaker-715?event=5){:target="_blank"}  @ [InnoGames GmbH](https://www.innogames.com/){:target="_blank"}
(by Manel)
The idea, or inspiration, behind this presentation is the fact that, when debeloping, we spend way more time reading code than writing (10 to 1 according to "Uncle Bob"), so then it becomes clear that well designed modules pays off long term.

Markus exposed four key concenpts to achieve the target:
#####1. Domain Design
We must know the boundaries of the application we want to build.
How to find your domain ? -> think about data and their relationships.
#####2. Value Objects and Entities
Value objects are described by its attributes (an apple is described by its color, size and type)
they shoud be immutable.
#####3. Model Integrity
Every model should exclusively hold, transform or modify information it holds.
Different presentation of the same information should derive by a transformamtion method.
Casses are responsible to ensure validity of its data -> changes are only allowed through internal methods.
Consider using factories because enables to restrict visibility and can use injected dependencies.
In order to find things, use one package per domain.
#####4. API Design
Expose a thin but descriptive API.
Lowest visibility as necessary.
Provide class documentation.
Write descriptive signatures
Describe the contract of your methods -> short description of boundaries and side effects, because you can't describe everything in the signature.
Make your deepest layer the prettiest -> the deeper the module, the more effort requires to understand and change.


## A programming language to manipulate cells
(by Narcis)
Another interesting presentation was "A programming language to manipulate cells" by Nina Buffi from OSPIN.
She presented the bioreactor they build in Berlin, a big box with tubes and sensors and motors. They build also a web application to control the reactor. The reactor is using microcontrollers to command different sensors and motors. There was a live demo where she changed the spinnig speed and started the reactor. By automating this reactions the scientists can be sure that the process is always the same and remove the human error from the process. Everything is automated from feeding the cells to different timings in the process. And you can watch it live on internet, no need to go to the lab on weekends.


## Digital responsibility ethics in a digital world - [Steffen Hartmann](https://www.codetalks.de/program#speaker-709?event=5){:target="_blank"} @ [MayFlower](https://mayflower.de/){:target="_blank"}
(by Manel)
Steffen started the presentation with a video named [f*ck the poor ?](https://www.youtube.com/watch?v=eBuC_0-d-9Y){:target="_blank"}  (It was interesting to see people's reactions)
He also went through other ethical dilemmas, like the [trolley dilemma](https://en.wikipedia.org/wiki/Trolley_problem){:target="_blank"}.

Then Steffen moved the topic to the "biased nature of humans" and exposed some possible dilemmas to developers:
*Would you make a pattern recognition app that may identify homosexuals ?... what if your company sells the app in a country where homosexuality is still illegal ?.*
*Would you make a face recognition app to be sold in Hong-Kong ?*

Another interesting topic presented by Steffen was how developers biasing may affect program accessibility features (or the lack of them because of "edge case" considerations).

As matter of conclusion, Steffen provided some advices to developers:
Know yourself and be conscious about your biases, morals and blind spots.
*Make it emotional for you. then you will care about those topics.*
*Get the people on the table, ask them about their opition on some, maybe disgusting, features of your app.*

I liked specially this sentence:
*"Moral and ethics are not functional problems"*


## Ausnahmezustand: Wirksames Exception Handling in einer verteilten Architektur - Michael Zöller
(by Narcis)
Michael Zöller from EOS  talked about exception handling in Java Spring Microservices. After a short recap of checked vs. unchecked exceptions in Java he presented Stability Patterns: The 'Timeout' pattern, 'Bulkheads' pattern, 'Retry' pattern, 'Circuit Breaker' pattern and the 'Outbox' pattern. For static code analysis he recomended Sonarqube.


## Making less of the Web with Feature-Policy - [Andrew Betts](https://www.codetalks.de/program#speaker-704?event=5){:target="_blank"} @ [Fastly](https://www.fastly.com/){:target="_blank"}
(by Manel)
Feature-Policy is a very interesting new feature designed to disable or limit features of the platform. It's being put in the hands of web developers through HTTP header attributes.

Through the presentation, Andrew showed some examples about how, by adding a single HTTP header, we could get rid of security violations, annoying behaviours, etc. It's also possible to report policies not met.

# Summary
Event presentations are grouped in tracks (Architecture, AI, Big Data, Buzzing Techs...), but Narics and I decided to go for the most appealing to us, independently of technologies or topics.
Also mention that, as you may guess, this event was not only about conferences and coding. On Thursday evening, participants could enjoy from a big party, plenty of food, drinks and live music.
