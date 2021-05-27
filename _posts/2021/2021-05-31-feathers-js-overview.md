---
layout: post
title: FeathersJS - A brief introduction
date: 2021-05-31
header_image: public/feathers-cover.png
header_position: center
header_overlay: true
category: methods-and-tools
tags: ["api", "express.js", "javascript", "fullstack"]
authors: ["Peter Boxall"]
about_authors: ["pboxall"]
---

## What is FeathersJS?

FeathersJS is a web-framework for creating realtime applications as well as REST APIs in JavaScript or Typescript.
It can help with easing the creation of realtime applications such as WhatsApp or Telegram, abstract away database logic of using different databases.

## Introduction to full stack Javascript

Back in the day before the great package explosion that is the Javascript environment, JavaScript as a language belonged mostly as scripts run directly on web pages or used to create client applications loaded in the browser (Single Page Apps - like Google Maps). 
The backend would be implemented in a much more reputable and sophisticated  language such as Java/C#(DotNet).

Things have changed over the years and now one is able to use JavaScript across the full stack of their applications. 
This means that you would need familiarity with one language and be able to develop on all parts of the application for a Model View Controller (MVC) web application.

## The problem that Feathers is trying to solve (Realtime data streaming) 

Typically a modern backend API uses REST in order to communicate data to and from clients in a stateless manner however, a lot of web applications are starting to require realtime data.
This would be in applications such as whatsApp and other messaging apps. 
Realtime means that rather than a stateless request being made between a client and a server, a constant stream of data is created between server and client over websockets and allows for a constantly updating state of information.

To further explain, a REST application could poll a service to see if there are any new messages and when there is, it will then update the client information. 
A realtime data solution will react to the changes made to the data and pass that information all the way down through to the client without the client having to poll for the information.

This allows a much more effective way of getting the most up to date information at all times. 
This also means that there is a need for tools that allow us to stream the data in real time rather than poll the data constantly. 
Enter, FeathersJS!  (*Medieval trumpet noises*)

## How does Feathers solve this?

Whilst there are many tools around that solve the issue of realtime data, FeathersJS is one that I have had the pleasure of working with recently that provides other benefits as well:
1. It abstracts away the transport of the data allowing you to swap between REST and websocket(realtime) communication without having to change any of the underlying code (only config).

1. Built in support for paging , searching, sorting and filtering.

1. It comes with multiple database adapaters for SQL and NoSQL databases that allow changing database technologies (per service in the app) with a single line of code.

1. FeathersJS is a lightweight wrapper around Express.JS, leaning on the large community and online resources available to the developer.

1. It uses code generation to do away with boilerplate code that takes away from the developers time put towards implementing valuable business logic. 

## Feathers structure

The structure of a feathers API can broken down into these parts: 

### Services

Services are responsible for all of the CRUD logic for a resource and acts as the controllers for the API. 
Here the developer can hook onto life-cycle events to add more business logic.

### Hooks

Hooks are small portions of business logic that can be added to service life-cycle events.
They process information and then pass the result  back to the application.

### Events

Events can be used as an alternative to binding hooks to services directly.
You can use events to execute logic on the life-cycle of a service from other places in the application like so:

{% image_custom image="/assets/img/pages/blog/images/feathers-events-snippet.png" width="80" lightbox %}

My explanations of these structures are incredibly brief and if you are left wanting, please refer to the detailed FeathersJS documentation referenced at the bottom of the post.


## Example Application

Now I will show a quick example of how to setup a FeathersJS API and make calls to it. 

For this example we will create an application that creates and reads Todo items (A totally original and unique idea!).


### Step 1: Install the FeathersJS CLI

The first step is to install the CLI, from which we can create the application, using this command:
***npm install -g @feathersjs/cli***

{% image_custom image="/assets/img/pages/blog/images/feathers-step1.png" width="80" lightbox %}

### Step 2: Create the application

Next we will create our API application and select the options that would like to set the project up with:
***feathers generate app***

{% image_custom image="/assets/img/pages/blog/images/feathers-step2.png" width="80" lightbox %}

You can see here that I selected the Socket.io option for the real-time communication as well as rest

### Step 3: Create the Service
Next we would like to create our service that will be responsible for all of the CRUD operations on the resource.
For this example app we will create the CRUD service for the Todo objects:
***feathers generate service***

{% image_custom image="/assets/img/pages/blog/images/feathers-step3.png" width="80" lightbox %}

Here I selected Sequelize for the databse adapter, which is a SQl Object Relational Mapper for Javascript

### Step 4: Start the application
***npm start***

{% image_custom image="/assets/img/pages/blog/images/feathers-step4.png" width="80" lightbox %}

### Step 5: Test the service

Lastly we will use Postman to make calls to our API to make sure that things are operational.

Here I show a POST of a basic todo object to the API:

{% image_custom image="/assets/img/pages/blog/images/feathers-step5a.png" width="80" lightbox %}
 

Now after a couple of POSTs lets retrieve our list of TODOs

{% image_custom image="/assets/img/pages/blog/images/feathers-step5b.png" width="80" lightbox %}

You can see in the response that it has built in support for paging

## Conclusion
There are many tools out there than can offer tools to assist with creating APIs as well as handling real time data. 
FeathersJS can help reduce boilerplate as well as allow one to be more dynamic in terms of application transport and database choices for each API, lending itself quite well to Microservice architecture. 

[W-JAX 2015: Microservices](/blog/events/wjax2015-microservices/)


## Reading material and references

 [Feathers Docs](https://docs.feathersjs.com/){:target="_blank"}

 [Feathers FAQ](https://docs.feathersjs.com/help/faq.html){:target="_blank"}

 [Websockets VS REST](https://www.educba.com/websocket-vs-rest/){:target="_blank"}

