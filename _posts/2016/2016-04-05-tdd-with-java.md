---
layout: post
title: "Test-driven development with Java"
date: 2016-04-05
header_image: java.jpg
category: tech-stories
authors: ["Jan M."]
---

Test-driven development is a programming technique in which the validation of the correctness of the source code is implemented before the actual source code itself.
This blog post is a summary of the lessons learned from a "Test-driven development with Java" training by [lp-it](http://www.lp-it.de/schulungen/java-test-driven-development-schulung.php3){:target="_blank"}.
In order to increase the readability, it also includes some additional research.

## Introduction

> Experience is a hard teacher because she gives the test first, the lesson afterward. (*Chinese proverb*)

In Test-driven development (TDD), the first step of a programmer is to write a failing unit test, a script which makes the absence of a system feature explicit.
In the second step the minimum amount of source code is implemented which is needed to fulfil this requirement.
The third step is to refactor the implementation.
This cycle is intended to be repeated in short iterations of a few minutes.

TDD became popular [in around 2002](http://c2.com/cgi/wiki?TenYearsOfTestDrivenDevelopment){:target="_blank"} along with the rise of [Extreme Programming](http://www.extremeprogramming.org/map/project.html){:target="_blank"} and other agile software processes.
Today it is successfully applied in [big software projects](http://programmers.stackexchange.com/questions/74580/looking-for-case-studies-of-how-tdd-improved-quality-and-or-speed-of-development){:target="_blank"} and sold as a best practice by many consulting companies, e.g. [it-agile](https://www.it-agile.de/schulungen/agile-entwicklungspraktiken/tdd-camp/){:target="_blank"}, [ThoughtWorks](https://www.thoughtworks.com/de/insights/blog/building-vibrant-software-testing-community-africa){:target="_blank"} and [LeSS](https://less.works/less/technical-excellence/test-driven-development.html){:target="_blank"}.

### Motivation

The application of TDD promises a number of advantages.
It helps to:

* get a clear understanding of the requirements
* decompose complex problems
* deliver high quality code even under time pressure
* have regular success experiences.

### Challenges

TDD is [not uncontroversial](http://martinfowler.com/articles/is-tdd-dead/){:target="_blank"} for the following reasons:

* It is counter-intuitive like the [Monty Hall Problem](https://github.com/jmewes/MontyHallProblem){:target="_blank"}.
* It takes about [two to three years](http://developeronfire.com/episode-114-robert-martin-master-craftsman){:target="_blank"} practice to do it well.

Actually, there are passionate [advocates](http://blog.cleancoder.com/uncle-bob/2016/03/19/GivingUpOnTDD.html){:target="_blank"} and [opponents](http://beust.com/weblog/2014/05/11/the-pitfalls-of-test-driven-development/){:target="_blank"} for this practice in the software community.

## Software Design

The most important lesson for me in the TDD training was, that the testability of the source code can be improved by the application of the following design principles:

| Principle     | Description  |
|---------------|---------------|
| Loose coupling     | The dependencies between modules should be minimised. |
| High cohesion     | Modules should be grouped by the data they are working with. |

Find more information about this subject using the keywords "[SOLID design principles](https://www.google.com/search?q%3Dsolid%2Bdesign%2Bprinciples){:target="_blank"}".

### Design Pattern

Loose coupling can be achieved by the application of the design pattern [Abstract Factory](http://www.tutorialspoint.com/design_pattern/abstract_factory_pattern.htm){:target="_blank"}, [Bridge](http://www.tutorialspoint.com/design_pattern/bridge_pattern.htm){:target="_blank"}, [Chain of Responsibility](http://www.tutorialspoint.com/design_pattern/chain_of_responsibility_pattern.htm){:target="_blank"}, [Command](http://www.tutorialspoint.com/design_pattern/command_pattern.htm){:target="_blank"}, [Facade](http://www.tutorialspoint.com/design_pattern/facade_pattern.htm){:target="_blank"}, [Mediator](http://www.tutorialspoint.com/design_pattern/mediator_pattern.htm){:target="_blank"} and [Observer](http://www.tutorialspoint.com/design_pattern/observer_pattern.htm){:target="_blank"}.

### Refactoring

High cohesion can be reached by the application of the refactoring pattern [Extract Class](http://refactoring.com/catalog/extractClass.html){:target="_blank"}, [Extract Module](http://refactoring.com/catalog/extractModule.html){:target="_blank"}, [Extract Subclass](http://refactoring.com/catalog/extractSubclass.html){:target="_blank"}, [Extract Superclass](http://refactoring.com/catalog/extractSuperclass.html){:target="_blank"}, [Pull Up Method](http://refactoring.com/catalog/pullUpMethod.html){:target="_blank"}, [Push Down Method](http://refactoring.com/catalog/pushDownMethod.html){:target="_blank"}, [Pull Up Field](http://refactoring.com/catalog/pullUpField.html){:target="_blank"}, [Push Down Field](http://refactoring.com/catalog/pushDownField.html){:target="_blank"}, [Move Field](http://refactoring.com/catalog/moveField.html){:target="_blank"} and [Move Method](http://refactoring.com/catalog/moveMethod.html){:target="_blank"}.

## Practical tips

The advantage of training courses over books and videos is, that they can include personalised, practical advice:

* Start working on a ticket by writing unit tests, always.
* Example is better than precept.
* The [Boy Scout Rule](http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule){:target="_blank"} can help to get started.
* At least 70% of the source code should be covered by unit tests, 80% is very good and more than 95% is perfect.
* TDD should be applied in a pragmatic way and not necessarily by the book.

## Java tools

As TDD is all about writing unit tests, here is an overview of the most commonly used Java tools for testing:

| Framework     | Description  |
|---------------|---------------|
| [JUnit](http://junit.org){:target="_blank"}      | The de-facto standard framework for unit tests. |
| [TestNG](http://testng.org){:target="_blank"}      | An alternative for JUnit. |
| [Mockito](http://mockito.org/){:target="_blank"}   | A library for the creation of mock and stub objects. |
| [EasyMock](http://easymock.org/){:target="_blank"}   | An alternative for Mockito. |
| [PowerMock](https://github.com/jayway/powermock){:target="_blank"}   | Extends Mockito and Easymock to be able to test untestable code. |
| [WireMock](http://wiremock.org/){:target="_blank"}   |Can be used for stubbing and mocking web services. |

## Conclusion

It is a common saying that no complex software system is free from defects.
The reason is, that even the best developers [sometimes](http://programmers.stackexchange.com/questions/185660/is-the-average-number-of-bugs-per-loc-the-same-for-different-programming-languag){:target="_blank"} rely on false assumptions.
As long as we cannot prove the correctness of our code mathematically, it needs to be tested thoroughly before it can be delivered to the customer.
As the release cycles tend to be shorter and shorter, these tests need to be automated.
The [Test Pyramid](http://martinfowler.com/bliki/TestPyramid.html){:target="_blank"} model implies that unit tests should be the foundation of the test automation.
Whether these tests are written before or after the source code seems to be a matter of taste.
Writing the tests first can lead to a number of advantages and from my perspective is thus worth learning.
