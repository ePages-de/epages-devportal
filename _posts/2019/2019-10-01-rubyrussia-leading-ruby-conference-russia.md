---
layout: post
title: RubyRussia - the leading Ruby conference in Russia
date: 2019-10-01
header_image: private/rubyrussia-2019.jpg
header_position: bottom
header_overlay: true
category: events
tags: ["conference", "development", "ruby"]
authors: ["Kathia"]
about_authors: ["ksalazar"]
---

Last weekend I had the opportunity to attend [RubyRussia](https://rubyrussia.club/en){:target="_blank"} 2019.
In this post I will give a brief description of some of the great talks as well as some interesting the things the speakers mentioned.

## About the conference

RubyRussia is the main conference in Russia focused on the Ruby programming language.
This year it celebrated its 10th anniversary with [around 800 attendees](https://twitter.com/grigoryvp/status/1177843629454442496){:target="_blank"}.
The event took place in Moscow.
The organizers gathered speakers from all different backgrounds and countries (Russia, of course, Germany, Spain, Bulgaria, Czech Republic, Serbia, United States, United Kingdom) to spread their knowledge and share their experience with the Ruby community.

## The future of Ruby3

The conference started with a warm welcome from the organizers, followed by the speech of [Yukihiro Matsumoto](https://github.com/matz){:target="_blank"}, creator of Ruby.
He talked about the improvements that will come with Ruby3, in regards of static analysis, performance, and concurrency.
It will be released in December 2020.

{% twitter https://twitter.com/palkan_tula/status/1177846424819703808 %}

## Zeitwerk: A new code loader

The next talk was done by [Xavier Noria](https://github.com/fxn){:target="_blank"} about [Zeitwerk](https://github.com/fxn/zeitwerk/){:target="_blank"}, a more efficient code loader for Ruby that was developed by him, and which will be introduced with Rails 6.
He talked about the limitations of the old classic engine of loading things, technical aspects of the implementation of Zeitwerk, and how to use it in non-rails projects.
With Zeitwerk you no longer need to worry about require statements.
As an example, he showed how Zeitwerk was used by [nanoc](https://nanoc.ws/){:target="_blank"} (a static-site generator), and they were able to [delete many require calls](https://github.com/nanoc/nanoc/pull/1403/files){:target="_blank"} thanks to this.
A nice thing about Zeitwerk is that it's an independent gem (separate from Rails), so you can use it as a dependency in any project.

{% image_custom image="/assets/img/pages/blog/images/rubyrussia-2.jpg" width="40" lightbox %}

## Speeding up Initial Rendering of Rails Pages with render_async

In this talk, [Nikola Đuza](https://github.com/nikolalsvk){:target="_blank"} exposed [render_async](https://github.com/renderedtext/render_async){:target="_blank"}, which is a gem that uses Rails and Javascript to load partials asynchronously, and was meant to solve problems related to slow page loading time.
He presented some code examples on how to use this gem.

{% twitter https://twitter.com/maryiam/status/1177887111980224513 %}

Among other talks (where also slides and more info are available) were "Ruby network workflow: REST, JSON, GraphQL or gRPC?" by [Grigory Petrov](https://github.com/grigoryvp){:target="_blank"}, ["JIT compiler improvements in Ruby 2.7"](https://speakerdeck.com/k0kubun/rubyrussia-2019){:target="_blank"} by [Takashi Kokubun](https://github.com/k0kubun){:target="_blank"}, "Break, a debugger in plain Ruby" by [Genadi Samokovarov](https://github.com/gsamokovarov){:target="_blank"}, ["Going functional with algebraic effects"](https://speakerdeck.com/flashgordon/going-functional-with-algebraic-effects){:target="_blank"} by Nikita Shilnikov, ["Testing Microservices the Right Way"](https://speakerdeck.com/sh3pik/testing-microservices-the-right-way){:target="_blank"} by Tatiana Shepeleva, [Solving architectural problems with OOP in pictures](https://speakerdeck.com/inem/solving-architectural-problems-with-oop-in-pictures){:target="_blank"} by [Ivan Nemytchenko](https://github.com/inem){:target="_blank"}.
You can check the rest of the talks on the [conference website](https://rubyrussia.club/en/programm){:target="_blank"}.

## If — The Vodka of Ruby

[Nick Sutterer](https://github.com/apotonick){:target="_blank"}, creator of [trailblazer](http://trailblazer.to/){:target="_blank"}, wrapped up the conference with this talk, where he covered some techniques on how to prevent ending up with messy code due to excessive usage of "if" statements.
He didn't mean we should never use "if's" but pointed out that its over-usage often makes software harder to understand and maintain.

{% image_custom image="/assets/img/pages/blog/images/rubyrussia-3.jpg" width="40" lightbox %}

## My impression

This experience made very clear to me that Ruby is not dead or close to being, but continues to progress while still being a fun language, backed by a large community that makes it stronger every day.
Being my first time in Moscow, I enjoyed not only the conference but also the city and its beautiful architecture.
Well organized event and great location.

{% image_custom image="/assets/img/pages/blog/images/rubyrussia-1.jpg" width="40" lightbox %}
