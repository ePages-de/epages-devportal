---
layout: post
title: Why I love working as an Application Management Engineer at ePages
date: 2021-01-21
header_image: public/application-management-interview.jpg
header_position: bottom
header_overlay: true
category: on-the-job
tags: ["application management", "engineer", "job"]
authors: ["Aroso", "Christian Kö."]
about_authors: ["amahaiuddin", "ckoehler"]
---
On our dev blog, we introduced you already to different job positions, such as [Java Developer](/blog/on-the-job/working-as-a-java-developer-at-epages/){:target="_blank"}, [UI Designer](/blog/on-the-job/working-as-a-ui-designer-at-epages/){:target="_blank"}, or [Scrum Master](/blog/on-the-job/working-as-a-scrum-master-at-epages/){:target="_blank"}.
One of the departments we haven’t explained closer yet, is our Application Management.
In order, to get a deeper insight to the job of a Application Management Engineer, I talked to our colleague Christian.

## What is your job position at ePages? And can you tell us what Application Management is about?
I’m an Application Management Engineer at ePages and part of the Application Management (AM) team in Jena.
Our work is comparable with operation teams in other companies.

## What are your typical tasks and which responsibilities do you have as an Application Management Engineer?
Our biggest task is to keep our ecommerce system up-to-date and running.
We assist other teams to debug and resolve problems that occur on our live installations.
Apart from this our so-called WhiteLabel installation belongs to our responsibility.
With this cluster we provide the hosting for customers that don’t want to run the ePages software in their own datacenters.

Over the years more and more tasks found their way into the Application Management team – to mention some of them: 
- taking care of build and release processes
- managing the virtualization infrastructure
- building internal tools to support other teams

## How does your team look like? 
We are currently ten employees in the AM team.
Within the team we have different specializations.
There are two engineers focusing more on infrastructure-related tasks.
Furthermore, there are team members with a lot of experience and in-depth knowledge of our software who are currently doing more development work.
We have a special rotating role within our team: Every week another ePagee is the Sysadmin-of-the-week.
This person takes care of the incoming requests and should be the first point of contact for internal and external requests.
Apart from that, the 24/7 on call support is shared between three brave team members.

## Can you shortly describe how a typical workday look like?
The corona pandemic put most team members into home office. On regular days I start around 7.00 a.m. from home office with checking my emails, chat, and going through my currently open tasks. In the morning I use the “quite” time to get some of my tasks done without too much external interruption. I take my lunch break around 11.30 a.m. and then work till 4.00 a.m. or 5.00 a.m.

## How closely are you connected with the other development teams?
As we are managing a lot of internal tools and infrastructure, we are in contact with nearly all teams of ePages.
With some development teams we work really close together as we share responsibilities and need to coordinate changes.

## Which technologies do you use? And as our development teams are working with Scrum, do you also apply these principles to your work?
Our traditional update and maintenance tasks rely on Makefiles, Bash and Perl scripts, and a lot of Capistrano tasks to glue it all together.
We are using Jenkins to orchestrate the build of our software packages.
The younger software components are running in Kubernetes clusters – so the Docker, kubectl and Helm programs are also part of our toolbox. Monitoring is done with Icinga2, Prometheus, and Grafana.
For the logfiles we use the traditional ELK (Elasticsearch, Logstash, and Kibana) stack.

We don’t use Scrum or Kanban at the moment.
Some parts of our work are aligned to the three-week release cycle.
Every two weeks we come together in a team meeting to talk about the tasks we have worked on in the last two weeks and things that will come up in the next weeks.

## Can you tell us about one challenge in your job? And how do you deal with it?
One of the challenges is to understand complex systems and how they interact together – sometimes with very little time.
During incidents on production systems, it is challenging to keep a cool head.
Some things that I found helpful in these situations are to take a deep breath and start to analyze the problem.
Furthermore, it’s very important to communicate with the team and get more hands on the challenge.

## What do you love the most about your job and what do you like about working at ePages?
I like changing challenges and new problems to solve as well as working together with external partners to get things done.
The flat hierarchy and fast decision for the everyday challenges are great.
With a lot of trust in the employees you can decide things on your own or in your team and don’t need to wait for endless processes.
Another great thing are the colleagues: if you struggle with something or need help, you can count on them.


## Thanks for your time, Christian, and for giving us a look behind the scenes at the Application Management team!