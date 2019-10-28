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
## Talks about code
Over 1500 developers gathered last week in Hamburg to talk about code. The code.talks developers conference took place on the Dammtor Cinemmaxx same great location as last year. 

## Highlights
# The Early Days of Id Software: Programming Principles - John Romer
[John Romero](https://en.wikipedia.org/wiki/John_Romero) is an award-winning game development icon whose work spans over 130 games, 108 of which have been published commercially. Romero is the "father of first person shooters" having led the design and contributed to the programming and audio design of the iconic and genre-defining games DOOM, Quake, Heretic and Hexen.
He presented a brief history of id Software, how he started, how he build the team and the programing principles they adopted over time in order to be able to ship so many games. The presentation was filled up with short stories, very informative and also entertaining. The programing principles still apply today:Keep your code absolutely simple, encapsulate functionality to ensure design consistency, don't program for future games, test your code, don't waste others' time, maintain shippable code.  


# The Changing Face of ETL: Event-Driven Architectures for Data Engineers - Robin Moffat @ Confluent
This was another interesting presentation about Event Streaming with Apache Kafka. 
Robin Moffat explained how to use Apache Kafka not just as a message queue but also as a central part of the architecture. He explained that the events are both a notification an state transfer. Using event stream we can log the behavior. Using Kafka as central source of truth instead of a relational database will allow future refactorings with a clear architecture.
[Talk Slides](https://talks.rmoff.net/A4pLsH/the-changing-face-of-etl-event-driven-architectures-for-data-engineers)
[E-Books](http://cnfl.io/book-bundle)

# A programming language to manipulate cells
Another interesting presentation was "A programming language to manipulate cells" by Nina Buffi from OSPIN.
She presented the bioreactor they build in Berlin, a big box with tubes and sensors and motors. They build also a web application to control the reactor. The reactor is using microcontrollers to command different sensors and motors. There was a live demo where she changed the spinnig speed and started the reactor. By automating this reactions the scientists can be sure that the process is always the same and remove the human error from the process. Everything is automated from feeding the cells to different timings in the process. And you can watch it live on internet, no need to go to the lab on weekends.

# Ausnahmezustand: Wirksames Exception Handling in einer verteilten Architektur - Michael Zöller
Michael Zöller from EOS TECHNOLOGY SOLUTIONS GMBH talked about exception handling in Java Spring Microservices. After a short recap of checked vs. unchecked exceptions in Java he presented Stability Patterns: The 'Timeout' pattern, 'Bulkheads' pattern, 'Retry' pattern, 'Circuit Breaker' pattern and the 'Outbox' pattern. For static code analysis he recomended Sonarqube.


