---
layout: post
title: Spring in Barcelona - Spring I/O 2018
date: 2018-05-29
header_image: public/spring-io-18-header.jpg
header_position: center
category: events
tags: ["spring", "conference", "java"]
authors: ["Mathias"]
---

The Spring community gathered again in Barcelona for the largest Spring conference in Europe. 
This year [Sergi Almar](https://twitter.com/sergialmar){:target="_blank"} and his team choose a new venue, the _Palau de Congressos de Barcelona_, which offered room for 1000 attendees. 
The conference was sold out and so the amount of participants could be doubled compared to the year before. 

<blockquote class="twitter-tweet" data-lang="de"><p lang="en" dir="ltr">Huge venue is huge! And packed, too! 😳 Kudos, <a href="https://twitter.com/sergialmar?ref_src=twsrc%5Etfw">@sergialmar</a> for setting up yet another (doubled) record attendance <a href="https://twitter.com/spring_io?ref_src=twsrc%5Etfw">@spring_io</a>! 👍🍃 <a href="https://twitter.com/hashtag/springio18?src=hash&amp;ref_src=twsrc%5Etfw">#springio18</a> <a href="https://t.co/pWSHe9MQKB">pic.twitter.com/pWSHe9MQKB</a></p>&mdash; Oliver Gierke 🥁&amp;👨‍💻 (@olivergierke) <a href="https://twitter.com/olivergierke/status/999551979067191297?ref_src=twsrc%5Etfw">24. Mai 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

The Spring team kicked of the conference. 
Juergen Hoeller gave on overview of what is coming in Spring especially regarding Java's new release cycle. 
He also gave some interesting recommendations on how to deal with the new release cycle:

- consider staying on the JVM classpath (as opposed to using modules)
- consider staying on Java 8 bytecode level
- build against JDK 8, run against JDK 11 (to leverage runtime benefits)

Aftwards Madhura Bhave and Brian Clozel gave a really entertaining overview on what is new in Spring Boot 2.0.

<blockquote class="twitter-tweet" data-lang="de"><p lang="en" dir="ltr">The Spring team kicks off <a href="https://twitter.com/hashtag/SpringIO18?src=hash&amp;ref_src=twsrc%5Etfw">#SpringIO18</a> <a href="https://t.co/Uvi4gmAxi3">pic.twitter.com/Uvi4gmAxi3</a></p>&mdash; Spencer Gibb (@spencerbgibb) <a href="https://twitter.com/spencerbgibb/status/999561447641317376?ref_src=twsrc%5Etfw">24. Mai 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Implementing DDD with the Spring Ecosystem

One of the talks I enjoyed most was _Implementing DDD with the Spring Ecosystem_ by [Michael Plöd](https://twitter.com/bitboss){:target="_blank"}. 
The talk contained some interesting thoughts e.g. on how to keep aggregates spring-free while still leveraging the power of Spring Data repositories. 
I will have to dig through the [example application](https://github.com/mploed/ddd-with-spring){:target="_blank"} accompanying the talk for additional ideas that can be applied to our projects.

<blockquote class="twitter-tweet" data-lang="de"><p lang="en" dir="ltr">I just uploaded the slides to my <a href="https://twitter.com/hashtag/SpringIO18?src=hash&amp;ref_src=twsrc%5Etfw">#SpringIO18</a> / <a href="https://twitter.com/spring_io?ref_src=twsrc%5Etfw">@spring_io</a> talk about „Implementing DDD with the Spring ecosystem“<a href="https://t.co/B5X69H370k">https://t.co/B5X69H370k</a></p>&mdash; Michael Plöd (@bitboss) <a href="https://twitter.com/bitboss/status/999642213578616832?ref_src=twsrc%5Etfw">24. Mai 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## REST beyond the obvious – API design for ever evolving systems

Another talk with interesting insights was _REST beyond the obvious – API design for ever evolving systems_ by [Oliver Gierke](https://twitter.com/olivergierke){:target="_blank"}. 
Oliver showed that often too much business logic is replicated into the API client.

<blockquote class="twitter-tweet" data-lang="de"><p lang="en" dir="ltr">Could not agree any more with <a href="https://twitter.com/olivergierke?ref_src=twsrc%5Etfw">@olivergierke</a> <a href="https://twitter.com/hashtag/SpringIO18?src=hash&amp;ref_src=twsrc%5Etfw">#SpringIO18</a> <a href="https://t.co/TPaF5ZgjZO">pic.twitter.com/TPaF5ZgjZO</a></p>&mdash; Michael Plöd (@bitboss) <a href="https://twitter.com/bitboss/status/999641603189985280?ref_src=twsrc%5Etfw">24. Mai 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

He also gave hints on how to avoid this leakage and why API versioning is usually not the answer.

<blockquote class="twitter-tweet" data-lang="de"><p lang="en" dir="ltr">Here are the slides for my &quot;<a href="https://twitter.com/hashtag/REST?src=hash&amp;ref_src=twsrc%5Etfw">#REST</a> beyond the obvious – <a href="https://twitter.com/hashtag/API?src=hash&amp;ref_src=twsrc%5Etfw">#API</a> design for ever evolving systems&quot; talk from <a href="https://twitter.com/hashtag/SpringIO18?src=hash&amp;ref_src=twsrc%5Etfw">#SpringIO18</a>… 🍃 <a href="https://t.co/NWfwm4oa6Q">https://t.co/NWfwm4oa6Q</a></p>&mdash; Oliver Gierke 🥁&amp;👨‍💻 (@olivergierke) <a href="https://twitter.com/olivergierke/status/999670956644884481?ref_src=twsrc%5Etfw">24. Mai 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Documenting RESTful APIs with Spring REST Docs and RAML

I was really happy that I also got the chance to speak at this year's Spring I/O. I talked about _Documenting RESTful APIs with Spring REST Docs and RAML_. 
This talk was about the development and evolution of our [public REST API documentation](https://developer.epages.com){:target="_blank"} and introduced Spring REST Docs with a sample project and some live coding. 
It also showed how and why you can use our open source project [restdocs-raml](https://github.com/ePages-de/restdocs-raml){:target="_blank"} to get a RAML API description out of your tests.

<blockquote class="twitter-tweet" data-lang="de"><p lang="en" dir="ltr"><a href="https://twitter.com/zaddo?ref_src=twsrc%5Etfw">@zaddo</a> on Spring Rest Docs. I really like that test-driven approach. And, even more, no additional annotations required like others do. <a href="https://twitter.com/hashtag/springio?src=hash&amp;ref_src=twsrc%5Etfw">#springio</a> <a href="https://t.co/qXUwO9GQbW">pic.twitter.com/qXUwO9GQbW</a></p>&mdash; Timo E aus E (@timo_e_aus_e) <a href="https://twitter.com/timo_e_aus_e/status/999913001690906626?ref_src=twsrc%5Etfw">25. Mai 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

It was a great experience to talk at such a big conference and in front of such a great community. 

<blockquote class="twitter-tweet" data-lang="de"><p lang="en" dir="ltr">Here are the slides on my session on &quot;Documenting RESTful APIs with Spring REST Docs and RAML&quot; <a href="https://twitter.com/spring_io?ref_src=twsrc%5Etfw">@spring_io</a> <a href="https://twitter.com/hashtag/SpringIO18?src=hash&amp;ref_src=twsrc%5Etfw">#SpringIO18</a> <a href="https://twitter.com/hashtag/raml?src=hash&amp;ref_src=twsrc%5Etfw">#raml</a> <br><br>Thanks again for coming 🙏.<a href="https://t.co/qi23hCGF6i">https://t.co/qi23hCGF6i</a></p>&mdash; Mathias Dpunkt (@zaddo) <a href="https://twitter.com/zaddo/status/999992616447029248?ref_src=twsrc%5Etfw">25. Mai 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 💚 Spring I/O 2018

It was a great conference again with some really interesting talks, great people, and really good food. 
Thanks to all the organizers - you did an awesome job. 
And by the way - Barcelona is really not the worst city for a few conference days.

<blockquote class="twitter-tweet" data-lang="de"><p lang="en" dir="ltr">A great <a href="https://twitter.com/hashtag/springio18?src=hash&amp;ref_src=twsrc%5Etfw">#springio18</a> is over - great work by  <a href="https://twitter.com/sergialmar?ref_src=twsrc%5Etfw">@sergialmar</a> and his team 💯🚀 thanks for having me.</p>&mdash; Mathias Dpunkt (@zaddo) <a href="https://twitter.com/zaddo/status/1000071583778639872?ref_src=twsrc%5Etfw">25. Mai 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### About the author

{% image_custom image="/assets/img/pages/blog/images/author-mathias-duesterhoeft.jpg" width="10" align="left" circle %}

<br>
<br>
Mathias Düsterhöft is a passionate software engineer with a focus on Java and Kotlin, and a lot of experience in the Spring ecosystem.
He is loves open source and is the maintainer of [restdocs-raml](https://github.com/ePages-de/restdocs-raml){:target="_blank"}.
