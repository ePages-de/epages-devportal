---
layout: post
title: The UX concept phase and its tools
date: 2018-08-07
header_image: public/ux-tools2.jpg
header_overlay: true
category: ux-and-design
tags: ["ux", "usability", "ecommerce"]
authors: ["Anja"]
about_authors: ["aortmann"]
---

Today we will continue with our small series about which UX tools we like to use in which UX phase. We already talked about the first phase ["User research and groundwork"](https://developer.epages.com/blog/ux-and-design/useful-ux-tools-for-research-and-groundwork/){:target="_blank"}. In this article we will have a closer look into the second phase: the concept phase. In this phase it's all about processing the gained information and make a shiny concept. Let's start clean and very basic with a good old pen and a sheet of paper:

## Pen & paper

For two use cases I only trust in pen & paper:

1. Sort your ideas, scribble the user flow and do a first sketch. Pen and paper have the big advantage that you can't get lost in details. You automatically focus on the user flow and the general structure of the UI. It's more about getting the basics right and really get down to the problem than placing all the UI elements perfectly.
2. The second use case always takes me back in my kindergarten time and also requires further equipment like scissors and sometimes glue. You probably already know what I am talking about: a paper prototype. A simple sketch of an interface drawn or printed on paper. Most of the time you also provide different UI states, e.g. button states or actual screens. By this you can simulate e.g. workflows or do usability tests. For example, we once did a paper prototype to test our planned online help. Using paper interfaces instead of digital interfaces helped the testers to focus on the overall structure and the UI texts. They were not distracted by a not finished design or bugs.

Of course there is no need to draw the screens by hand, but instead you can use a tool to create wireframes.

## Balsamiq
{% image_lightbox image="/assets/img/pages/blog/images/blog-wireframe.png" align="top" %}

I would like to start with a short definition of the term "wireframe", as people define the scope of wireframes differently or mix it with mockups. In our daily UX work we produce wireframes that show the main elements of a UI. A wireframe provides information on the main UI elements (which ones are used) and the structure of information (where are the elements placed). All in all it's a visual description of the basic UI and how everything interrelates.

The market provides a lot of tools to create wireframes, but my favorite one is [Balsamiq](https://balsamiq.com/){:target="_blank"}. With Balsamiq it's easy to create the first skeleton of your UI. You simply drag elements, like buttons and dropdowns, in your working area. The workflow is as simple as this and everyone can quickly start. There is no need to read manuals or to do a big testing phase to understand how Balsamiq works. For us this is a big advantage as also our product managers can, if needed, visualize their ideas.

In general I like Balsamiq as it helps you to focus on creating wireframes and to not to go into design details. With the simple elements and the sketchy style you can perfectly illustrate where which elements are placed.

## InVision
In our UX team we use [InVision](https://www.invisionapp.com/){:target="_blank"} if we want to make our wireframes a little interactive and link different screens to show user flows or do usabiltiy tests. In InVision we import our wireframes, define click areas and then link different screens. To a certain degree this is also possible  in Balsamiq, but we prefer InVision for it. It's easier and has more options. Additionally InVision can be used to link mockups or screen designs to create a basic prototype. Have a look into [this great post](https://developer.epages.com/blog/methods-and-tools/workflow-tuning-with-prototyping-tools/){:target="_blank"} from Anne, to learn more about the advantages and disadvantages of InVision and to get some info on further prototyping tools.  

## Atlassian confluence
The last tool in this phase is [Atlassian confluence](https://www.atlassian.com/software/confluence){:target="_blank"}. We use this wiki in the whole company as knowledge base and to communicate information. We also have a connection to Jira to link to our tasks (see the [first article](https://developer.epages.com/blog/ux-and-design/useful-ux-tools-for-research-and-groundwork/){:target="_blank"} of this series). In confluence the concepts are published. We have a integration to Balsamiq so that we can directly create the wireframes online in the final concept.

The wireframes are just one part of the concept. Along with an explanation of the purpose and the background of the planned feature, we provide information on the single elements and the interactions.Of course we could also just provide our wireframes or prototypes, but for us it's very valuable to give more information. Not everything can be perfectly displayed in a wireframe. Especially explanations why we've chosen a certain approach are important for the product owners and the development team. The concept is the basis for the implementation tasks and (hopefully) provides all the needed information. If not or if requirements change or the team has ideas to improve the UI during implementation, we of course stay in constant contact with our product owners and the development team.

But the implementation phase is not the topic of this article anymore. Stay tuned for the implementation and testing phase and their tools!

## Related posts
* [Useful UX tools for research and groundwork](https://developer.epages.com/blog/ux-and-design/useful-ux-tools-for-research-and-groundwork/){:target="_blank"}
* [Workflow tuning with prototyping tools](https://developer.epages.com/blog/methods-and-tools/workflow-tuning-with-prototyping-tools/){:target="_blank"}
