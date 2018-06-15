---
layout: post
title: From Java to Ruby and back again
date: 2018-08-01
header_image: public/erasmus.jpg
header_position: center
header_overlay: true
category: on-the-job
tags: ["java", "kotlin", "ruby", "api", "teamwork", "agile"]
authors: ["Jens"]
---

I [work as a Java developer](/blog/on-the-job/working-as-a-java-developer-at-epages/) in one of our teams focussing on our new product called _Beyond_.
In particular I support my team in delivering the microservices and REST API necessary to create and manage shops for our merchants.
We use Java ☕ (plus more and more Kotlin recently) to develop this functionality, and I really enjoy working in such an ecosystem.

## Listen to your customers

As provider of this REST API, my team is responsible for supporting our clients by making their API consumption as productive as possible.
Knowing your clients and having direct communication channels to them is invaluable, when it comes to gathering feedback and improving your product.
My team is in a very lucky position, because our main client is another team of ePages developers.
They just recently started developing a new user-friendly web application called _Krypton_ using Ruby on Rails, which will allow resellers of our _Beyond_ product to create and manage shops.

{% image_lightbox image="/assets/img/pages/blog/images/krypton-shop-view-cr.png" width="50" %}

Although we already provide a very rich [Beyond API documentation](http://docs.beyondshop.cloud/), guiding developers new to our API with tailor-made support will speed up their learning curve.
Our conclusion was to offer exclusive access to this API knowledge by embedding one of our Java developers into this Ruby team.
That was the beginning of my adventure of collaborating with another team for a full sprint, which lasts 14 days in our Scrum process.
We jokingly called this experiment my [Erasmus student exchange programme](https://esn.org/erasmus) ;-)

## Leaving my comfort zone

I feel very comfortable working in a Java environment.
On the other hand my Ruby and in particular Ruby on Rails knowledge is very limited, and the prospect of being unproductive and _that guy_ asking all those stupid questions was not very encouraging for me.
Turned out this uncertainty was totally unneeded, because my new team gave me a very warm welcome and immediately showed they value my input to their development.

## Making me productive

Not being a Ruby expert, I already had a couple of not very successful attempts at installing a modern Ruby on Rails development environment on my laptop.
With the help of my new team I could clean up this mess and get productive in a breeze:

{% highlight bash %}
$ brew install rbenv ruby-build

$ rbenv install 2.5.0
$ ruby -v
ruby 2.5.0p0 (2017-12-25 revision 61468) [x86_64-darwin17]

$ gem install bundler
$ bundle -v
Bundler version 1.16.1

$ gem install rails -v 5.1.4
$ rails -v
Rails 5.1.4
{% endhighlight %}

Also my new product owner was able to quickly introduce me to _Krypton_'s product backlog and his vision about what this web application should offer in functionality.
Now it was my turn to give back: using comand line clients like [httpie](https://httpie.org/) I showed the team how to craft the necessary REST calls against our _Beyond_ system in order to access the available backend functionality required for implementing the most important use cases.
With this knowledge the team was able to deliver the first technical spike of _Krypton_ talking to our backend far quicker than anticipated.

## An unexpected journey

While talking about future features to be implemented in _Krypton_, I came to realize that there's a lot of funtionality still missing in our REST API.
So talking to my customer was uncovering undetected dependencies between these two teams, which allowed us to plan and synchronize both backlogs to deliver the right functionality at the right time.
We also trained the communication channels between both teams.
Even after my returning to the Java team, we kept a constant feedback loop of things to improve and ensuring development dependencies were taking care of.
My internship failed to deliver only one result: transforming me into a Rails fanboy :-) That's mainly because of my recent love for Kotlin as programming language, so let's see if this mindset will change again in a couple of months!
