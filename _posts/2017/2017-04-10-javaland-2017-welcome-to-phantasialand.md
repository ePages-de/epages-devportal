---
layout: post
title: "JavaLand 2017 - Welcome to Phantasialand"
date: 2017-04-10
header_image: private/javaland-2017.jpg
category: events
tags: ["java", "spring", "conference"]
authors: ["Benjamin, Bastian"]
---

The [JavaLand 2017](https://www.javaland.eu/en/javaland-2017/){:target="_blank"} conference took place for the 4th time in the famous [Phantasialand](http://www.phantasialand.de/en/){:target="_blank"} holiday park in Brühl, near Cologne.
The program consisted of [talks](https://programm.javaland.eu/2017/schedule.html){:target="_blank"} on the first two days and [in-depth workshops](https://www.javaland.eu/de/programm/schulungstag){:target="_blank"} at the last day.

Here are some random facts to better imagine the dimension of the largest community conference for Java in Europe:

- 1600 visitors, 14 different locations in the holiday park
- 11 parallel talk tracks, 8 session slots each day
- 8 in-depth workshops with a duration of over 8 hours each

<blockquote class="twitter-tweet" data-lang="en"><p lang="und" dir="ltr"><a href="https://twitter.com/hashtag/welcome?src=hash">#welcome</a> to <a href="https://twitter.com/hashtag/JavaLand?src=hash">#JavaLand</a> 💙 <a href="https://t.co/wX37hzFVXM">pic.twitter.com/wX37hzFVXM</a></p>&mdash; JavaLandConf (@JavaLandConf) <a href="https://twitter.com/JavaLandConf/status/846628341209878528">March 28, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## Talk: Reactive Programming

The talk "[A Reactive Take on Pokémon GO](https://programm.javaland.eu/2017/talk.html#talk?talkId=529316){:target="_blank"}" by [Riccardo Lippolis](https://www.linkedin.com/in/rlippolis){:target="_blank"} and [Bas Knopper](https://twitter.com/BWknopper){:target="_blank"} was all about [Spring Reactive](http://docs.spring.io/spring-framework/docs/5.0.0.M1/spring-framework-reference/html/web-reactive.html){:target="_blank"}. After a quick introduction, he showed us how to build a reactive program for smartphones.
He extended the observer pattern and added push-based streams, which can be used when it is unknown whether data is available.
At its core, the [Spring Reactor](https://projectreactor.io/){:target="_blank"}, a fully non-blocking foundation with efficient demand management, is used.
Another important aspect in this context plays [Flux](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.html){:target="_blank"}, which is similar to the [Java 8 Stream API](https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html){:target="_blank"}.
A new paradigm in Spring Land will be released in June and is called [Spring Web Flux](https://spring.io/blog/2017/03/15/spring-tips-the-spring-web-flux-reactive-client){:target="_blank"}.
See [this video](https://www.youtube.com/watch?v=leZdgr-O4LE){:target="_blank"} by [Josh Long](https://twitter.com/starbuxman){:target="_blank"} for more details.

## Talk: Migrating to Java 9

In [this talk](https://programm.javaland.eu/2017/talk.html#talk?talkId=529430){:target="_blank"} by [Sander Mak](https://twitter.com/sander_mak){:target="_blank"}, who is currently writing a book with [Paul Bakker](https://twitter.com/pbakker){:target="_blank"} about [Java 9 Modularity](https://twitter.com/javamodularity){:target="_blank"}, he explained essential steps to prepare for the next major Java release.
Use [jdeps](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/jdeps.html){:target="_blank"} to get information about missing platform modules.
This tool has some interesting option to inspect JDK internals. However, some of its parameters like `—add-exports` and `—permit-illegal-access` should not be used that often.
Better introduce according changes to your own source code, instead of using these flags.
If you want to migrate in order to use modules, you can put a plain on the module path (automatic modules).
The name is derived from the jar name and exports everything needed as well as reads other downstream modules.
It can access the class path.
You should create a module, which requires `commons.lang` and `module-info.jar`.
Dependencies have to be modules themselves for easier handling (transitive dependencies).
At runtime services (components) are accessible via reflection.

Here are some more best practices to consider as well:

- Don’t open a module to everyone.
- Export only certain API packages including services!
- Revisit open modules, when you are done.
- Create several modules that are logically separated, e.g. `API`, `Impl` and `Main`.

## Workshop Day

At the [workshop day](https://www.javaland.eu/de/programm/schulungstag){:target="_blank"} we visited the "[Java Web Security](https://github.com/dschadow/JavaSecurity){:target="_blank"}" session by [Dominik Shadow](https://twitter.com/dschadow){:target="_blank"} ([Website](https://blog.dominikschadow.de/){:target="_blank"}) and the [Hibernate 4](http://hibernate.org/){:target="_blank"} session by [Thorben Jansen](https://twitter.com/thjanssen123){:target="_blank"}, who just released a new [Hibernate Tips book](http://www.thoughts-on-java.org/hibernate-tips-book-release-special-launch-price/){:target="_blank"} about it and runs a very popular [web portal](http://www.thoughts-on-java.org/){:target="_blank"} about Java and Hibernate.
Both sessions were an absolute blast and highlights of the conference itself, as both trainers have many years of coding and lecturing experience.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">AWESOME workshop + FULL room  <a href="https://twitter.com/JavaLandConf">@JavaLandConf</a> <a href="https://twitter.com/hashtag/Javaland?src=hash">#Javaland</a>: <a href="https://twitter.com/thjanssen123">@thjanssen123</a> teaches <a href="https://twitter.com/Hibernate">@Hibernate</a> 4 <a href="https://twitter.com/hashtag/JPA?src=hash">#JPA</a> <a href="https://twitter.com/hashtag/ORM?src=hash">#ORM</a> <a href="https://twitter.com/hashtag/lucene?src=hash">#lucene</a> <a href="https://twitter.com/hashtag/bridges?src=hash">#bridges</a> <a href="https://t.co/RrG0LWycGb">pic.twitter.com/RrG0LWycGb</a></p>&mdash; Benjamin Nothdurft (@dataduke) <a href="https://twitter.com/dataduke/status/847394050986594307">March 30, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

# People, Fun and Food

Apart from the amazing talks and workshops, the conference is also about meeting great Java software engineers from other countries, including real [Java Champions](https://community.oracle.com/community/java/java-champions){:target="_blank"} and [JavaOne Rockstars](https://www.oracle.com/javaone/rock-star-wall-of-fame.html){:target="_blank"}, and meeting Java User Groups from Germany (see [JUG_DE](https://twitter.com/JUG_DE){:target="_blank"} and [iJUG](http://www.ijug.eu/){:target="_blank"}) as well as from all around the world.
The team from [NightHacking](http://nighthacking.com){:target="_blank"} was even live streamed from the exhibition room.
In the exhibition room, famous organizations, such as the [Eclipse Foundation](https://eclipse.org/org/foundation/){:target="_blank"} or [JetBrains](https://www.jetbrains.com/){:target="_blank"} with their core developers of the well-known [IDEA](https://www.jetbrains.com/idea/){:target="_blank"} programming environment for all JVM languages, offered their support.
It was also great to meet the founder and organizer of the biggest Java User Group on our planet, the [Virtual Java User Group](https://virtualjug.com/){:target="_blank"} by [Simon Maple](https://twitter.com/sjmaple){:target="_blank"} and [Oleg Shelajev](https://twitter.com/shelajev){:target="_blank"} from [ZeroTurnaround](https://zeroturnaround.com/){:target="_blank"} aka the really helpful [JRebel](https://zeroturnaround.com/software/jrebel){:target="_blank"} tool company.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/JAVA?src=hash">#JAVA</a> champions + <a href="https://twitter.com/hashtag/JCP?src=hash">#JCP</a> leaders <a href="https://twitter.com/JavaLandConf">@JavaLandConf</a> with <a href="https://twitter.com/shelajev">@shelajev</a> <a href="https://twitter.com/dataduke">@dataduke</a><a href="https://twitter.com/miragemiko">@miragemiko</a> <a href="https://twitter.com/sjmaple">@sjmaple</a> <a href="https://twitter.com/nighthacking">@nighthacking</a> <a href="https://twitter.com/hashtag/JavaLand?src=hash">#JavaLand</a> <a href="https://t.co/ISjvJrvYwU">pic.twitter.com/ISjvJrvYwU</a></p>&mdash; Benjamin Nothdurft (@dataduke) <a href="https://twitter.com/dataduke/status/846685232346615813">March 28, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## Summary

Everything was awesome – from start to finish.
I highly recommend you to join next year, too.
And don't forget about all the free roller coaster rides without standing in line, the great late night music concert with a terrific live band with [Amelia Eiras](https://twitter.com/ameliaeiras){:target="_blank"} and the free food at every restaurant at the marvelous and epic [Phantasialand](http://www.phantasialand.de/en/){:target="_blank"} near Cologne, Germany.
More images can be found on the [twitter](https://twitter.com/JavaLandConf/media){:target="_blank"} channel and the official [website](https://www.javaland.eu/de/javaland-2017/bildergalerie/){:target="_blank"} as well as [videos](https://www.javaland.eu/de/javaland-2017/videogalerie/){:target="_blank"}, [video streams](https://www.javaland.eu/de/javaland-2017/downloads){:target="_blank"} and another [article](https://www.javaland.eu/de/home/news/details/?tx_news_pi1%5Bnews%5D=1327&tx_news_pi1%5Bcontroller%5D=News&tx_news_pi1%5Baction%5D=detail&cHash=bb7d83b09cba83204cb0c902d1700990){:target="_blank"} about the JavaLand 2017. See you in 2018!

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/JavaLand?src=hash">#JavaLand</a> is waiting for you. See you tomorrow! <a href="https://t.co/LwAuO2O4Ir">pic.twitter.com/LwAuO2O4Ir</a></p>&mdash; JavaLandConf (@JavaLandConf) <a href="https://twitter.com/JavaLandConf/status/846271953442877440">March 27, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
