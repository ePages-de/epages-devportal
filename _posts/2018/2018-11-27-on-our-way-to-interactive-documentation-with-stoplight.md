---
layout: post
title: On our way to interactive documentation with Stoplight
date: 2018-11-27
header_image: public/green-stoplights.jpg
header_position: top
header_overlay: true
category: api-experience
tags: ["api", "reference", "documentation", "tool"]
authors: ["Jan S."]
about_authors: ["jschnegotzki"]
---

As Beyond, the next generation of our product, is about to take off to give our customers a whole new experience of what it means to use [ePages](https://epages.com/en/){:target="_blank"} as the solution to sell online, we decided to try and do the same for the developers talking to our API.
This means that we will switch from a static HTML file to [Stoplight](https://stoplight.io){:target="_blank"}, a tool that automates large parts of the API reference generation, and provides interactivity in a structured and easily maintainable interface.
This is the first of a series of posts in which we will document our migration to the new system, outlining our approach, and hinting at caveats in terms of technical challenges, writing topics, and collaboration.

## Where we stand

Our development teams have put considerable effort into coming up with an entirely new backend that will provide a vast array of endpoints (122 are currently publicly available, and counting!).
This means new functionality for our users and smooth integration into other services.
To make sure that the documentation will live up to the bar we are trying to set for ourselves, we wanted to make sure it conforms to modern standards.
This means not only restructuring what we currently have to provide an easily accessible documentation, but also a set of engaging features that communicate directly with our backend.
We currently organise the whole collaboration and revision process over a GitHub repository.
One of the challenges we were facing when restructuring was to keep up our current processes, maybe even streamlining them upon changing to the new tool.

{% image_custom image="/assets/img/pages/blog/images/html-docs-status.png" width="50" lightbox %}

As the current documentation does not look like what we are envisioning, a cleaner, more approachable structure is also a goal.

## What we've seen

To gain an insight into what was actually to be understood by "modern standards", we conducted some research looking at a number of documentations by other API providers.
We had done that before to brush up our [ePages Now API documentation](/apps/), but since quite some aspects of Beyond are different and new we started this on a blank sheet to get some fresh inspiration.
It was amazing to see how heterogenous the approach to creating docs can be and searching through what is out there.
It pretty quickly boiled down to some focus points.
The following three major learnings from the variety of impressions gathered will be most essential in setting up the kind of docs we want:
1. Even if at first glance it may seem to be purely aesthetic and more or less unrelated with the content, a clear and consistent visual style will be the key to user-friendliness.
This entails, besides the obvious corporate colors, different areas like the formatting of the text, clear and self-explanatory demarkation of variables, an approachable sidebar and such.
2. Rather than presenting your API textbook-style, it seems the norm now to provide examples of requests from different programming languages instead of just the more generic command line calls.
Ideally, this is supplemented by interactive features, like a sandbox environment for developers to play around with the API.
3. We realized that probably the biggest challenge we will be facing is to appeal to rookie developers and experienced pros alike.
It will take a good deal of consideration to present the documentation without overwhelming newbies while still not boring professionals.

## What we want

These and the other lessons we learned from our research are basically things that have to be applied and thoroughly thought out, implying a large effort both building our solution and keeping it up to date (we've been there with our current software).
However, we now knew what features we wanted our docs to have, and could thus start looking around whether there was something out there to do some of the work for us.
Essentially, we wanted a tool that made it possible to create a user-friendly documentation to underpin our API-first approach.
Ideally, it will reduce the maintenance work our current doc is causing while enabling an efficient usage of parts of our infrastructure, and of our workflows.
It has to strike the right balance between the purely technical, highly structured part of a pure reference, and the textual work that is necessary to turn the document into a great piece of documentation.
It also has to provide the possibility to send REST calls and, ideally, code generation.

## How Stoplight can help us

Luckily, Stoplight seems to provide all we were looking for and implementing its usage well will be a giant leap forward for all API documentation tasks concerning the new Beyond software.
Stoplight Next is Stoplight's newest product and still being extended constantly.
However, all the features we currently need are already there. 
We can start publishing our docs on their site, and watch it grow alongside our work with the tool.
The big thing with Stoplight is its JSON renderer that automatically turns an OpenAPI specification into an API Reference, allowing for grouping by tags, embedding an HTTP request maker complete with token acquisition etc.

{% image_custom image="/assets/img/pages/blog/images/stoplight-status.png" width="50" lightbox %}

Even at the beginning of our usage of the tool, the API reference is a lot easier to navigate than before.
Stoplight also provides an editor rich in features, a CSS-customizable interface, versioning, GitHub integration, and more.
A set of API endpoints enables integration into an automated workflow (more on that in an upcoming post).

## What is up next?

We are currently happy with our decision to finally get ourselves a tool that does a part of the work, and Stoplight looks promising.
Still, the plans have to be put into practise to prove our current enthusiasm is justified.
Stay tuned to keep following us on our Stoplight journey.