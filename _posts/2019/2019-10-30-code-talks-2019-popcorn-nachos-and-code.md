---
layout: post
title: code.talks 2019 - popcorn, nachos, and code
date: 2019-10-30
header_image: private/codetalks2019.png
header_position: bottom
header_overlay: true
category: events
tags: ["coding", "development", "tools", "conference"]
authors: ["Manel", "Narcis"]
about_authors: ["mmerino","nsimu"]
---

Last week, the [code.talks](https://www.codetalks.de/home){:target="_blank"} conference took place in the Dammtor Cinemaxx - the same great location as in the last two years.
Taking the conference name to heart, over 1500 developers gathered together in Hamburg to talk about code.

{% image_custom image="/assets/img/pages/blog/images/code-talks-2019-1.jpg" width="50" lightbox %}

The two days were packed with different and interesting topics.
Taking all of them into account would go beyond the scope of this recap.
That's why we'll focus on our highlights.

## The Early Days of Id Software: Programming Principles - [John Romero](http://romero.com/bios){:target="_blank"}

John is an award-winning game development icon whose work spans over 130 games, 108 of which have been published commercially.
Romero is the "father of first person shooters" having led the design and contributing to the programming and audio design of the iconic and genre-defining games DOOM, Quake, Heretic and Hexen.
He presented a brief history of [id Software](https://www.idsoftware.com/en-gb){:target="_blank"}, how he started, how he built the team, and the programming principles they adopted over time in order to be able to ship so many games.
The presentation was filled up with short stories, very informative and also entertaining.
The programming principles still apply today: 

- Keep your code absolutely simple.
- Encapsulate functionality to ensure design consistency.
- Don't program for future games.
- Test your code.
- Don't waste others' time.
- Maintain shippable code.

## Will AI kill the developer's job ? - [Tobias Zander](https://www.codetalks.de/program#speaker-711?event=5){:target="_blank"} @ [savedroid](https://www.savedroid.com/){:target="_blank"}

Probably every developer has been thinking about this topic already and has a formed opinion.
And of course it's interesting to know what an expert in this field has to say about it.

Tobias gave us some figures - e.g. that 29% of developers think their efforts will be replaced by AI - and also a couple of reasons why he's convinced that AI will impact developers:

- It's expensive to write code but cheap to run it.
- The Industry cares more about fast code development than about good code.

So, in Tobias' opinion, the question is not if, but which job will AI "optimize" first.
In general, it is significantly easier to collect data (or more generally, identify a desirable behavior) than to explicitly write the program.
So jobs in that area might be a good candidate for AI.

But don't worry !!, human programmers will still have to manually curate, maintain, clean, and label datasets.

## The Changing Face of ETL: Event-Driven Architectures for Data Engineers - [Robin Moffat](https://www.codetalks.de/speakers#speaker-660?event=5){:target="_blank"} @ [Confluent](https://www.confluent.io/){:target="_blank"}

This was another interesting presentation about Event Streaming with Apache Kafka.
Robin explained how to use Apache Kafka not just as a message queue but also as a central part of the architecture.
He explained that an event is both - a notification and a state transfer.
Using event stream, we can log the behavior.
Using Kafka as a central source of truth instead of a relational database will allow future refactorings with a clear architecture.
If you're interested in this topic, have a look at the [presentation slides](https://talks.rmoff.net/A4pLsH/the-changing-face-of-etl-event-driven-architectures-for-data-engineers){:target="_blank"} and his [e-books](http://cnfl.io/book-bundle){:target="_blank"}.

## Boost your development with proper API design - [Markus Held](https://www.codetalks.de/program#speaker-715?event=5){:target="_blank"}  @ [InnoGames GmbH](https://www.innogames.com/){:target="_blank"}

The idea or inspiration behind this presentation is the fact that during development we spend way more time reading code than writing (10 to 1 according to "Uncle Bob").
That's why it should be clear that well designed modules pays off in the long run.

Markus exposed four key concepts to achieve this goal:
1. **Domain Design**:
We need to know the boundaries of the application we want to build.
If you are wondering how to find your domain, think about data and their relationships.
2. **Value Objects and Entities**:
Value objects are described by their attributes and should be immutable.
E.g. an apple is described by its color, size, and type.
3. **Model Integrity**:
Every model should exclusively hold, transform, or modify information it holds.
Different presentations of the same information should be derived by a transformation method.
You should also consider using factories because they allow you to restrict visibility and can use injected dependencies.
In order to facilitate search, use one package per domain.
4. **API Design**:
You should stick to a few guidelines here: Expose a thin but descriptive API, provide class documentation, and write descriptive signatures.
Furthermore you should describe the contract of your methods.
As you can't describe everything in the signature, short descriptions of boundaries and side effects support understanding.
Last point: Make your deepest layer the prettiest.
The deeper the module, the more effort is required to understand and change it.

## A programming language to manipulate cells - [Nina Buffi](https://www.codetalks.de/speakers#speaker-767?event=5){:target="_blank"} @ [OSPIN](http://ospin.de/){:target="_blank"}

Nina presented the bioreactor they've built in Berlin, a big box with tubes, sensors, and motors.
They've also built a web application to control the reactor.
The reactor is using microcontrollers to command different sensors and motors.
There was a live demo in which Nina changed the spinnig speed and started the reactor.

By automating the reactions, the scientists can be sure that the process is always the same and get rid of the human error aspect.
That's why everything is automated - from feeding the cells to different timings in the process.
And what's best: you can monitor it live via the internet, no need to go to the lab on weekends.

## Digital responsibility ethics in a digital world - [Steffen Hartmann](https://www.codetalks.de/program#speaker-709?event=5){:target="_blank"} @ [MayFlower](https://mayflower.de/){:target="_blank"}

Steffen started the presentation with a video named [f*ck the poor ?](https://www.youtube.com/watch?v=eBuC_0-d-9Y){:target="_blank"}.
It was really interesting to see people's reaction.
He also went through other ethical dilemmas, like the [trolley dilemma](https://en.wikipedia.org/wiki/Trolley_problem){:target="_blank"}.

Then Steffen moved the topic to the "biased nature of humans" and exposed some possible dilemmas of developers:
- *Would you develop a pattern recognition app that may identify homosexuals ?... What if your company sells the app in a country where homosexuality is still illegal?.*
- *Would you develop a face recognition app to be sold in Hong-Kong?*

{% image_custom image="/assets/img/pages/blog/images/code-talks-2019-2.jpg" width="50" lightbox %}

Another interesting topic was how developers biasing may affect program accessibility features (or the lack of them because of "edge case" considerations).

To sum it up, Steffen provided some advice for developers:
- Know yourself and be conscious about your biases, morals, and blind spots.
- Make it an emotional topic for you. This way you'll care about it.
- Get the people on the table, ask them about their opinion on some, maybe unpleasant, features of your app.

A great takeaway of this talk: *"Moral and ethics aren't functional problems."*

## Summary

The different presentations were grouped in several tracks (e.g Architecture, AI, Big Data, Buzzing Techs).
But there was no need to follow one track for the whole day.
We personally decided to attend the ones that looked most appealing to us, independently of technologies or topics.
This way we got a great overview of what is going on!
Besides the variety of great talks, we'd also like to mention that, as you might have guessed, this event was not only about presentations and coding.
On Thursday evening, participants could enjoy a big party, plenty of food, drinks, and live music.
Our bottom line of this conference: A great mixture and definitely worth attending!