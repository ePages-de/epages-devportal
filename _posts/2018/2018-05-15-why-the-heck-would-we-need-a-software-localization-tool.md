---
layout: post
title: Why the heck would we need a software localization tool?
date: 2018-05-15
header_image: public/why-loc-tool.jpg
category: language-and-localization
tags: ["localization", "translation"]
authors: ["Birgit"]
about_authors: ["bbader"]
---

If you're thinking about putting your existing software localization process under the microscope, our new blog post series might come in handy for you.
It covers our journey towards implementing a software localization tool:

* Why would we need such a tool?
* How did we introduce it?
* Which challenges do we face with the tool?

Let's jump right into the first part: why would we need a localization tool?

## The initial situation

We've had a functioning software localization process in place.
The process had been established over more than a decade.
It was improved and shaped over the years.
There was a translation agency that did their job as best they could.
All fine?
Hang on - this is where the story begins.

## The discovery tour

They say that it is good to look at stuff with fresh eyes.
And as a technical translator, I had a natural curiosity about the company's existing localization and translation process.
When I started to support our development teams with UI texts, I somehow slipped into it.
That's why I asked for the details.
I was wondering about the translation quality, where all the source texts come from, and how they were maintained.
As we didn't have a dedicated translation manager - who took care of costs, and 100% matches, or terminology?<br>
So I talked to process owners, developers, controlling, and any potential stakeholders.
I managed to get a UX colleague on board.
Together we dived deeper into how UI texts and XML files were created, dictionaries were used, learnt about automation scripts, and how language packages were composed.
Wow!
That took us quite a while.

## The findings

(I'll spare you the nitty-gritty details.)

The translation process was perfectly automated, and the workflows were well-established.
But from a translator's perspective I found that the one or other issue could be optimized.

* The teams were handling XML translation files.
* Translations were handled via email.
* The language for the the source files was German.
* The translations were processed from German to English, then English to 13 further languages.
* The whole translation process took about 3 weeks.
* There were translation dependencies between all teams.
* The translators did not receive context or reference material for their jobs.

## The fine line

Processing the findings made our heads spin.
We wanted to optimize some things.
And you can imagine that there is a fine line between supporting and interfering...

We draw charts from our learnings, recorded and observed processes, and kept in close contact with all parties.
I felt the urgent need to also bring our process owners and the translation agency in closer contact to foster understanding for each others requirements and workflows.
We met in person, and discussed many topics that needed clarification - with a solution-oriented outcome.

## The action list

Our "little" project really came up to speed, and with quite some supporters.
We tried to tackle some issues internally, such as collecting reference material and context for every translation job from all the teams.
And then send it via email to the translation agency.
We invited the translation agency again, and explained our software in detail as well as recurring translation relevant issues.<br>
Most of all, we needed to find a solution for the German source files.
With an international team, it was not possible to come up with proper German texts.
So we came up with the idea to maintain German and English as source files with the help of internal native speakers.
This way we could make English the source file for the translation agency.

## The refurbishment phase

Great approaches.
But after a while it turned out that all this did not lead to the desired success.
It was simply too much preparation, and overhead work to keep track of all the steps.
And for an agile software company like ePages, we still needed faster and more efficient translation rounds.
We needed another solution.

Our CTO suggested to take a closer look at software localization tools, and to check their pros and cons with regards to our requirements.
There were plenty of tools on the market.
And sure thing, they cost some money, and need to be managed by someone.
Which again is a significant cost item.
But it was clear that we wanted this to work.

We knew that besides our main job it was not possible to do a comprehensive research on localization tools.
But it turned out to be a great task for a master thesis.
We hired a master's student from the field of linguistics and translation.<br>
What she did for us, she will explain you herself in the next post.
Stay tuned.
