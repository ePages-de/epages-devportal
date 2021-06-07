---
layout: post
title: FeathersJS - A brief introduction
date: 2021-06-10
header_image: public/feathers-cover.png
header_position: center
header_overlay: true
category: methods-and-tools
tags: ["api", "express.js", "javascript", "fullstack"]
authors: ["Peter"]
about_authors: ["pboxall"]
---

FeathersJS is a web framework for creating real-time applications as well as REST APIs in JavaScript or Typescript.
It abstracts away the needed database logic for using different databases and eases the creation of real-time applications such as WhatsApp or Telegram.

## A short history of full stack JavaScript

Back in the day before the big environment around it was build, JavaScript was a language mainly used for scripts that run directly on web pages or for the creation of client applications loaded in the browser (single-page apps - like Google Maps).
For the backend a much more reputable and sophisticated language would be used like Java/C#(DotNet).

But things have changed over the years.
Now, JavaScript can be used across the full stack for different applications.
This means, for example, a Model View Controller ([MVC](https://www.freecodecamp.org/news/the-model-view-controller-pattern-mvc-architecture-and-frameworks-explained/){:target="_blank"}) web application would require familiarity with one language and be able to develop on all parts of the application.

## Real-time data streaming aka the problem that FeathersJS tries to solve

A modern backend API typically uses REST to send data to and from clients in a stateless manner.
However, a lot of web applications now require real-time data.
This applies for applications in various fields of technology, for example the telecommunication applications like WhatsApp and other messaging apps that I've mentioned earlier. 
Real-time means that a constant stream of data is created between server and client over websockets, which allows a constantly updating state of information, instead of a stateless request being made between a client and a server.

A REST application would need a poll, a service to first check if there is any new information and, when there is, update the client's information accordingly. 
A real-time data solution, however, would directly react to any changes and pass that information all the way to the client.
The client wouldn't need to poll for the information.
A much more effective way of always getting the most up-to-date information is enabled.
This also means, that there is a need for tools that allow us to stream the data in real-time instead of constant data polling.

Entry of FeathersJS! (*Medieval trumpet noises*)

## The functionality of FeathersJS

There are many tools providing a solution for the issue of real-time data streaming.
However, FeathersJS is the one I've recently had the pleasure working with and I've also discovered some more benefits:

1. It abstracts away the transport of the data and allows to snap between REST and websocket (real-time) communication without having to change any of the underlying code (only config).

1. Built-in support for paging, searching, sorting, and filtering.

1. It comes with multiple database adapters for SQL and NoSQL databases allowing the change of database technologies (per service in the app) with a single line of code.

1. FeathersJS is a lightweight wrapper around Express.JS, leaning on the large community and online resources available for developers.

1. It uses code generation to mitigate boilerplate code that uses up the developers' time which instead could be put towards implementing valuable business logic. 

## Talking about structure

Please note that the following explanations are incredibly brief.
If you want more information, please also refer to the detailed FeathersJS documentation that I've linked at the end of this post.

The structure of a FeathersJS API can be roughly broken down into these parts: 

### Services

Services are responsible for the entire CRUD logic of a resource and act as the controllers for the API. 
Developers can hook onto life cycle events to add more business logic.

### Hooks

Hooks are small portions of business logic that can be added to service life cycle events.
They process information and then pass the result back to the application.

### Events

Events can be used as an alternative to directly binding hooks to services.
You can use them to execute logic on the life cycle of a service from other places in the application like this:

{% image_custom image="/assets/img/pages/blog/images/feathers-events-snippet.png" width="80" lightbox %}

## Giving an example

Now, I will present a quick example of setting up a FeathersJS API and make calls to it. 
For this we will create an application that creates and reads TODO items (by far the most original and unique idea!).

### Step 1: Install the FeathersJS CLI

The first step is to install the CLI, from which we can create the application, using this command:<br>
***npm install -g @feathersjs/cli***

{% image_custom image="/assets/img/pages/blog/images/feathers-step1.png" width="80" lightbox %}

### Step 2: Create the application

Next, we will create our API application and select the options that we would like to set the project up with:<br>
***feathers generate app***

{% image_custom image="/assets/img/pages/blog/images/feathers-step2.png" width="80" lightbox %}

Here you can see that I selected the [Socket.io](https://socket.io/){:target="_blank"} option for the real-time communication as well as REST.

### Step 3: Create the service

Next, we would like to create our service that will be responsible for all of the CRUD operations on the resource.
For this example app, we will create the CRUD service for the TODO objects:<br>
***feathers generate service***

{% image_custom image="/assets/img/pages/blog/images/feathers-step3.png" width="80" lightbox %}

Here I selected [Sequelize](https://sequelize.org/){:target="_blank"} for the database adapter, which is a SQL Object Relational Mapper (ORM) for JavaScript.

### Step 4: Start the application

Start the appliciation with this command:<br>
***npm start***

{% image_custom image="/assets/img/pages/blog/images/feathers-step4.png" width="80" lightbox %}

### Step 5: Test the service

Lastly, I will use [Postman](https://www.postman.com/){:target="_blank"} to make calls to the API and check that things are operational.

This is an example of a POST of a basic TODO object to the API:

{% image_custom image="/assets/img/pages/blog/images/feathers-step5a.png" width="80" lightbox %}
 
After a couple of POSTs, let's retrieve our list of TODOs:

{% image_custom image="/assets/img/pages/blog/images/feathers-step5b.png" width="80" lightbox %}

In the response you can see that it has built-in support for paging.

## Conclusion

There are many tools out there offering you assistance with creating APIs as well as handling real-time data. 
FeathersJS is one option that can help you reduce boilerplate code.
It also allows for more dynamic choices in terms of application transport and databases for each API, lending itself quite well to [microservice architecture](/blog//events/wjax2015-microservices/). 

## Reading material and references

 * [Feathers Docs](https://docs.feathersjs.com/){:target="_blank"}

 * [Feathers FAQ](https://docs.feathersjs.com/help/faq.html){:target="_blank"}

 * [Websockets VS REST](https://www.educba.com/websocket-vs-rest/){:target="_blank"}