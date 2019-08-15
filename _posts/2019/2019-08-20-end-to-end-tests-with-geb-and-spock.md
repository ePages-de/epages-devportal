---
title: End-to-end tests with Geb and Spock
layout: post
date: '2019-08-20'
header_image: public/.jpg
header_position: bottom
header_overlay: true
category: tech-stories
tags: ["tech", "methods-and-tools", "coding"]
authors: ["Thomas", "Torben"]
about_authors: ["thirsch", "tulber"]
---

This blog post is going to be a summary of our recent endeavours to establish a solid end-to-end testing culture at ePages,
specifically in the context of third-party service providers, e.g. payments and shippings.

I will write about the motivation to start a test project, the goals that we set out to achieve, and some common problems
and their solutions.


## Motivation & Goals

Since several years Selenium has been used at ePages. A framework was developed, with all the good intentions of categorising,
structuring and maintaining the tests. But in the context of our third-party integrations this has been notoriously difficult.

So after some discussions, deliberations, and a few Git branches later, we decided to start a new test project for this purpose,
to be able to work on this independently, without any dependencies to other teams or existing code.

We specifically did not want to create a new framework, to replace the old one.
We wanted a way to simply and effectively develop end-to-end tests, and to be able to stabilise them.
Last but not least we wanted to make use of Selenium Grid to parallelise execution of the tests, in order to improve the feedback
cycle.

[Geb](https://gebish.org/), [Spock](http://spockframework.org/) and [Gradle](https://gradle.org/) are a very good fit to approach
this problem. There are some considerations to cut back on using the Groovy language, but this was not really a concern for us,
because Groovy is a very easy to learn languages, and it is mostly backwards compatible to Java.


## Stability testing

End-to-end tests generally have a bad reputation, because it is difficult to make them reliable enough to be useful. This was not
different in our case.
But we realised that if we wanted to improve the situation with our own tests, we would need to run them many times, regularly.
And we would need to debug and understand every problem that has more than negligible chance of occurring.
For this purpose we used a task rule in Gradle to create the desired amount of test tasks, i.e. repeated executions, with an
optional test class filter in case we want to restrict execution to certain tests. After making a change to remedy a synchronisation
problem, we would typically run the affected test between 20 and 100 times.

The harder part is of course debugging the individual errors, especially if they are difficult to reproduce. Most of the
failures in this area are synchronisation problems between the browser and the test, caused by the high complexity of our matured frontend.
In many cases the only way to synchronise the UI with the test, is to wait for some unambiguous condition, that is the result
of some interaction. This can be tedious at times, but it is also the general case, for example when dealing with a single page
application, where Selenium is unable to detect when a "new page" has loaded.

Another way to approach the problem of random synchronisation issues is to simply retry them in case of failure.
We use the `@Retry` annotation for this, which is included in Spock. Unfortunately, at the time of writing of this blog, there is
still an issue with Geb, in that it does not produce screenshots properly in some cases, if `@Retry` is being used. But this is
actually not a big problem, because nowadays we use video recording to understand failures, rather than screenshots.

Be aware of the difference between repeating a test and retrying a test. When running stability tests, we do not want to retry any
tests, because we do want to see the errors in this phase, so that we have a chance to fix them.


## Concurrent test execution

We had to take some precautions in order to be able to run tests concurrently.
The word "concurrent" has two different meanings here. On one hand it refers to starting the program in a way that makes it invoke
several tests in parallel. This can be achieved using the [`maxParallelForks`](https://docs.gradle.org/current/dsl/org.gradle.api.tasks.testing.Test.html#org.gradle.api.tasks.testing.Test:maxParallelForks) property of a Gradle test task.
This way of parallelising tests written in JVM / Gradle does not require any specific support by the test framework.

The other meaning of "concurrent" refers to having two instances of the same test running *somewhere*.
For example, a test is running in some CI pipeline, while a developer is starting the same test on his own computer.
Why would this be a problem?
Consider the case that during the test, some credentials are being used to log in to some third-party website or service. This could
have the effect of invalidating any simultaneous session that might be going on, or otherwise interfering with the test result.

Often times our third-party integrations would allow us to create any number of test accounts, but there could be exceptions.
In one case we were not allowed to do that, as we were testing against the live system of that integration, because no "sandbox" existed.

So we had to come up with a mechanism, that would allow us to prevent concurrent execution of this test, and instead wait for the
ongoing run to finish. Conveniently, Java already provides [an interface for this purpose](https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/locks/Lock.html), which has exactly the desirable property that requesting a lock includes waiting for its availability, while
disabling the current thread. Nice!  
The interface is readily usable implemented by the [Redisson](https://github.com/redisson/redisson) library, which uses [Redis](https://redislabs.com/why-redis/) as its backend.


## Diagnosing actual problems

Of course, at some point, we want our end-to-end tests to be able to bring real problems with our software to our attention.
Once random stability failures were mostly understood, this is working well for us.

The tests helped us to notice several issues related to third-party integrations and the checkout and order processes.

In one case, we even found a critical issue, before it was reported to us via support tickets from our partners. You might be
wondering, if the tests found the issue, why was it not fixed before it would get reported by live customers?
That is a valid question, and the difficulty here was to prove that the error that we found in our test environment would actually
occur in production also. But there was no apparent way for us to do that, and so the investigation of this *possible* issue was
not prioritised. This problem got exacerbated by the fact that it would allow for a high dark figure, i.e. high number
of unreported cases. This means that there was a low chance for it to be reported by a shopper who encountered it.

Also, this problem was not even related to activities of our own (payments) team, but rather the general checkout process which
is part of the core software. We were only the ones to notice it early, because we were running automated checkout tests many
times per day, and paying close attention to every single result.

The next step was to deploy production grade monitoring to the test environment. Tools like the [Elastic Stack](https://www.elastic.co/what-is/elk-stack)
are typically used in the production environment of any serious web enterprise. By also making them available in the development
environment, the task of diagnosing problems that happen only rarely becomes significantly easier, because the log output
of the whole system can be viewed at a glance, and is stored for later analysis.

It is an ongoing effort to make these tests produce the value they are supposed to produce. But what value are we even talking about?
The value of end-to-end tests is not restricted to finding specific bugs in the software, and I would argue that "finding bugs" is
not even their main purpose.
I would consider them "learning accelerators", that help with understanding the system as a whole, and drive it into the direction
of robustness and reliability. A lot of things have to have gone right for reasonably complicated end-to-end tests to be able to pass.
In that sense they are also driving the development behind certain non-functional features, as well as build- and deployment infrastructure.


## Zalenium

The most recent addition to our development environment is [Zalenium by Zalando](https://opensource.zalando.com/zalenium/). Before we
switched to Zalenium we had been maintaining our own Grid installation, which was also based on [docker-selenium](https://github.com/SeleniumHQ/docker-selenium).

Using Zalenium all of our UI tests produce a video recording, which is very helpful when analysing failures. The videos are much more
useful than screenshots. Seeing the test in motion makes it that much easier to understand the problem. While both videos and screenshots
prevent inspection of the markup, this is rarely needed when trying to understand a failure. The stack trace from the test in
combination with the video is usually enough to understand the problem.

Another motivation to use Zalenium is to make it easier to provide up-to-date browsers and operating systems for the tests, and possibly
safe some effort across teams.


## Summary

After ongoing difficulties and responsibility arguments over refactoring and improving our existing Java-based Selenium framework
we decided to start from scratch, using a lightweight technology stack, i.e. only a few libraries and a framework-less approach to writing
end-to-end tests.

It took some time to learn the most important concepts of Spock and Geb, and we did spend some time implementing code that arguably existed
in some way or another in the old framework.

But this was compensated for by the fact that, we needed only a fraction of the code to implement that functionality. As a result,
the code is comparably much easier to understand and navigate. There is no framework, which means the complexity of managing the project
is also greatly reduced.

But most importantly the tests are running again regularly, and mostly free from random errors.
