---
layout: post
title: Unit testing in React
date: 2020-02-10
header_image: public/scrum-intro-session.jpg
header_overlay: true
category: methods-and-tools
tags: ["scrum", "agile", "remote"]
authors: ["Daniel"]
about_authors: ["dhara"]
---

## Introduction

Automated Testing is one of the most important aspects of software development. You can test your code in different ways and levels, the most relevant
of which are unit-testing and integration testing.
On the one hand, in unit testing, you test each one of your functions and components individually. On the other, in integration testing, you test
how all those work along with each other to deliver all the fancy features you offer your users.
As Adrià Fontcuberta pointed out at his amazing talk at dotJS in Paris (check out or blog post about the conference:, and his video: https://www.dotconferences.com/2019/12/adria-fontcuberta-the-pragmatic-front-end-tester)
In this blog post, I'll show you how to get started in unit testing a simple component in React.

## Getting started

One of our most recent features at our storefront was a "Load more" button in the product pages. We could draft here a simplified version of this
feature, and carry on to writing tests for it! This will help us to understand how tests work and how to ensure our tests are providing us
safety for our code.



Only sitting in one of our conference rooms for an hour and listening to what Scrum is about would be way too boring.
So, what our Scrum Master prepared was a little [game](https://play14.org/games/lean-workflow-design){:target="_blank"} in the beginning.
We as a team had the following task: We got a double deck of cards (each deck of cards contains 52 cards) which we had to sort by card colour (red and black), an card type (hearts, diamonds, spades, and clubs).
On top of that we were asked to order the card value from low (ace) to high (king).
Our colleague in Jena got half a deck of cards to keep it fair.
Before we started to sort the cards, we had to discuss in the team how much time we think we will need for the task.
Then, we had two minutes to discuss how to solve the task:

- Who is doing what?
- How do we proceed?
- With which strategy do we solve the task in the best possible way?

After we clarified our strategy, we started to sort the cards and our Scrum Master measured the time.
In the first round, we didn't solve the task in the estimated time, nor did we sort all cards in the correct order.
We played three rounds in total.
After each round we talked about the mistakes we made, how we can avoid them, and how we can improve our strategy.
From round to round we not only improved our strategy but also needed less time to solve the task in a high quality. 
Our estimated time was an average of 2.30 minutes.
In our last round we needed 1.35 minutes to sort the cards which was our best time.

This little game showed us in a practical way how the Scrum process works.
In simple terms: You get a task, you estimate how much time you're going to need to get the task done, and you're working on the task during the estimated time. 
Then, you try to figure out what went well and which mistakes you made.
Afterwards, you think about how to improve the task process and how to solve it in a better way.

{% image_custom image="/assets/img/pages/blog/images/blog-scrum-intro-session-1.jpg" width="50" lightbox %}

## What is Scrum? - A short summary

The Scrum game covered in a fun way many Scrum events (e.g. Planning, Sprint, Review, Retrospective) which are necessary to create transparency for all people who are involved, and to enable inspection and adaption in order to achieve a satisfying result.
After we finished the game, our Scrum Master explained in detail what Scrum is about at ePages.
In this theoretical part, the participants were also actively integrated.
For example, we discussed how we would define the role of a Scrum Master, what the role of a Product Owner is, or which methods are used in our own team.
Here's a short summary of the most important points that were mentioned in the Scrum session:

### Scrum

Scrum is a framework for project and product management which is especially used for complex use cases, such as software development.

### Scrum roles

- The **Scrum Master** is a kind of a coach who supports the team. They moderate the team, support the team in coming up with their own decisions, and remove impediments. Furthermore, the Scrum Master checks the work process and if Scrum is practiced according to the Scrum Guide.
- The **Product Owner** creates a vision and strategy for products and develops the direction of the product with the team. So, they determine what the team is going to do next and how they are going to do it. They try to understand the customer requirements and thus maximize the value of the product. Furthermore, the Product Owner coordinates the tasks, creates tickets, and prioritizes them.
- The **Developer Team** is ideally a cross-functional and self-organized team which includes all functions needed to build working increments of the product.

### Scrum artefacts

- In the **Product Backlog** all tasks are listed which have to be done. The more important a task is, the more detailed the task should be described. This way the team exactly knows what the scope of the task is. After each Sprint the tasks in the Backlog will be updated, evaluated, and sorted by importance. The more important a task is, the higher it ranks on the list.
- The **Sprint Backlog** is a board that lists the tasks from the Product Backlog as soon as the team should start working on them. Thus, the board shows the plan for the next sprint. The board is divided into several columns. Our Tech Writing team e.g. has the following ones: To do, On hold, In progress, Review, and Done.

### Scrum events 

- The **Daily Scrum** is a 15-minutes meeting which takes place every day. Each team member usually explains in their team what they did since the last meeting, what the plan for the following day is, and if there's anything which is blocking them. This event is to coordinate the work for the following working day.
- A **Sprint** at ePages is a two-week time period during which the selected tickets with the tasks from the Backlog have to be done by the team.
- A **Review** takes place after each Sprint. The teams are presenting new features and functionalities they implemented during their sprint to the company.
- A **Retrospective** usually takes place right after a Review. The team discusses with their assigned Scrum Master what went well and what didn't go well during their Sprint. On top of that they have a look at what could be improved.

## My impression

It was a really fun introduction to Scrum.
Especially integrating the participants actively into the session was very exciting.
The Scrum session definitely helped me to get a better understanding of the workflows in an agile company and how Scrum is used at ePages.
Furthermore, a nice side effect is that I got to know my new colleagues a little better - and even got to know one colleague I haven't met yet. 😊