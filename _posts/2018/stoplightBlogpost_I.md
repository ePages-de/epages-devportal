---
layout: post
title: Going interactive with Stoplight
date: 2018-09-18
header_image: private/rnd-day-2018-header.jpeg
header_overlay: true
category: api-experience
tags: ["beyond", "api", "ref", "reference", "documentation", "tool"]
authors: ["Jan S."]
about_authors: ["jschnegotzki"]
---

As the next generation of our product is about to take off to give our customers a whole new experience of what it means to use ePages, we decided to try and do the same for the developers talking to our API.
This means that we will switch from a static HTML-file to Stoplight, a tool that automates large parts of the API reference generation and provides interactivity in a structured and easily maintainable interface.
In this series of five or more articles, we will document our migration to the new system, outlining our approach and hinting at caveats.
This means covering the technical aspects as well as writing topics and concerns of how well teams will be able to work together to make it happen.

### Where we stand

Two of our development teams have spent the past months coming up with an entirely new backend that will provide a vast array of endpoints (145 are currently publicly available, and counting!) and enable smooth integration into other services.
Our additional effort to set up an extensive Appstore to help merchants broaden their range of possibilities will put the API (and therefore naturally its documentation) into the center of attention some time next year and we are eager to fulfil modern standards.
This means not only restructuring what we currently have to provide an easily accessible documentation, but also direct access to API calls from the document.
We currently organise the whole collaboration and revision process over a GitHub Repository and one of the challenges we were expecting was to keep up our current processes, maybe even streamlining them upon changing to the new tool.

### What we've seen

To gain an insight into what was actually to be understood by "modern standards", some research was conducted looking at a number of documentations by other API providers.
It was amazing to see how heterogenous the approach to creating docs can be and along the way, some potential challenges popped up that we formerly hadn't realised actually were challenges.
If the variety of insight gained from this had to be brought down to three major learnings, it would probably be the following:
1. Even if at first glance it may seem to be purely aesthetic and more or less unrelated with the content, it actually struck us as essential to maintain a clear and consistent visual style.
This entails, besides the obvious corporate colours, different areas like the formatting of the text, clear and self-explanatory demarkation of variables, an approachable sidebar and such.
A documentation that's too colourful, has formatting issues across different resolutions or comes at you as a messy blob of text is just simply off-putting even if you're only interested in the text content.
2. Secondly, rather than presenting your API textbook-style, it seems more or less the norm now to provide examples of requests from different programming languages instead of just the more generic command line calls.
Ideally, this is supplemented by interactive features like direct calls straight from the document.
3. Thirdly, we realised that probably the biggest challenge that would be facing us is to appeal to rookie developers and experienced pros alike.
Presenting the documentation without overwhelming newbies while still not boring professionals will take a good deal of consideration.


### What we want

These and the other lessons we learned from our research are basically things that have to be applied and thoroughly thought out by our teams, so no magical solution will just pop up to solve our problems.
However, we now knew what features a tool that was going to help us definitely had to provide.
Essentially, we wanted a tool that would reduce the maintenance work our current doc is causing while enabling an efficient usage of parts of our infrastructure and of our workflows.
It has to strike the right balance between the purely technical, highly structured part of a pure reference and the textual work that would turn the document into a great piece of documentation.
It also has to provide interactivity and, ideally, code generation.


### How Stoplight can help us

Luckily, Stoplight seems to provide all we were looking for and implementing its usage well would be a giant leap forward for all our documentation-related tasks.
Stoplight Next is Stoplight's newest product and still being extended constantly.
However, all the features we currently need are already there so we can already start publishing our docs on their site and watch it grow alongside our work with the tool.
The big thing with Stoplight is its JSON renderer that automatically turns an OpenAPI specification into an API Reference, allowing for grouping by tags, embedding an HTTP request maker complete with token acquisition etc.
It also provides an editor rich in features, a CSS-customizable interface, versioning, GitHub integration and more.
A set of API endpoints enables integration into an automated workflow (more on that in the upcoming post).

### What is up next?

We are currently happy with our decision to finally get ourselves a tool that does a part of the work and Stoplight looks promising.
Still, the plans have to be put into practise to prove our current enthusiasm is justified.
This is why over the next five or six months, we will give little insights into every step of the journey towards a full-fledged API documentation.
