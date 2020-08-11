---
layout: post
title: Why our Spring Boot upgrade was Not Allowed
date: 2020-08-11
header_image: public/spring-boot-upgrade-not-allowed.jpg
header_position: bottom
header_overlay: true
category: tech-stories
tags: ["java", "programming", "spring", "spring boot"]
authors: ["Andrey", "Donaldo"]
about_authors: ["akhasanov", "dlika"]
---

Imagine you want to solve a good old "mate in three" chess puzzle.

You want to actually get to the solution of this puzzle instead of fetching the chess board from the shelf.
You want to spend more time considering all the different move possibilities instead of recreating the scenario on the board.
You want the puzzle with no distractions, so you end up using some kind of application that does all the things for you.

Well...
Same with programming.
Except we use *another* application to make writing *our* application easier.
To be honest, we use many of such applications to achieve our goal, but one of such examples is [Spring Boot](https://spring.io/projects/spring-boot){:target="_blank"}, which "makes it easy to create production-grade applications that you can *just run*".
This does bring some side effects, however.

## Bump!

Google Chrome is built on top of open-source Chromium, which still gets new releases and patches.
In order to have all the recent security patches and bug fixes, the development team of Google Chrome is forced to upgrade their version of Chromium every once in a while.

Our Beyond framework is built on top of Spring Boot, which still gets new releases and patches.
There might be some kind of pattern here.

Every once in a while, especially if we have enough capacity to do so, we upgrade our dependencies as well.
Sometimes, the transition to the newer software version might be seamless or, at least, simple enough.
The other times, however...

## Method not allowed

It was time for one of such upgrades and after successfully upgrading a couple dozen of other microservices to Spring Boot 2.1 (with only a few hiccups), there were no signs of trouble.
There were only a few microservices left, and the next on the list was the service, which is responsible for storing and accessing the user uploaded images on our platform.

Every single microservice before that was upgraded with just a minor change to `application.yml`:
```yaml
spring:
  main:
    allow-bean-definition-overriding: true
```
You add that change, modify the microservice to use the needed version of Spring Boot and voilà!

After the same procedure with this service, it successfully started.
But it was not the same anymore.

Every single test in that microservice failed.
And it failed with a very strange reason:
```json
{
  "status": 405,
  "error": "Method Not Allowed",
  "message": "Request method 'GET' not supported",
  "path": "/api/images"
}
```
It's like there was never an endpoint to get images in an *image storage* microservice.
By looking deeper into the code, I found out that what the microservice actually does is connecting to another server and storing or fetching the images from it.
A proxy, if you will.
And that other server behind the proxy needed [forwarded headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Forwarded){:target="_blank"} to function properly.
Our proxy is built on top of [Zuul](https://github.com/Netflix/zuul){:target="_blank"}, which was sending the needed headers correctly.
Emphasis on *was*.

## Why does it have to be beans?

The problem is simple.
We need forwarded headers.
We also need the Spring Boot version upgrade.
What do we do?

It's Bean time!
```java
@Bean
public Filter forwardedHeaderFilter() {
    return new ForwardedHeaderFilter();
}
```

With this bean in configuration class, I ran the tests again, and they all successfully passed.
The proxy played well with the server behind the proxy, but how do other microservices play with the proxy itself?

We have debug environments for such cases, so that you can quickly check if the changes are working as expected, and also run functional API tests while you are at it.
I went straight into the tests and ran all of them, fully expecting them to be green after they finish.
The tests started one by one and each successfully completed.
Business as usual.
This went on for some time until one test suddenly failed.
Then another.
And another.
And a dozen more.
All of them are related to uploading and managing the images on the storage.

And now the vicious loop began.
Searching for similar issues, trying out the solutions from all the different posts on Github and Stackoverflow, failing to run them successfully, searching for new solutions, etc.
Nothing helped.
My team tried to lend me a hand and after every discussion I would go and make a change in the microservice, only to find out that the changes did not solve the problem.

After a certain point, I did not believe that we can upgrade our proxy microservice in the first place and felt like giving up on the task altogether (which means putting it back to the backlog).
This was when Donald told me he can take this problem over.

## The fix

"Integration tests", "Distributed tracing", and "Logging" are terms that developers tend to ignore or not to worry that much about since they are not relevant on "sunny" days.
But when working on a microservice architecture, you quite often have to debug requests passed through several services.
In these cases, the lack of traceability or a centralized logging system can be quite a hassle.
Luckily, our logs are analyzed and stored in `Google Stackdriver` which offers plenty of search functionalities.

Let's get back to the problem and to what I did to come up with a solution.

After discussing with Andrey what he had tried, I decided to play Sherlock and followed the failing requests in order to see what was changed on their way.

{% image_custom image="/assets/img/pages/blog/images/sherlock.jpg" width="50" lightbox %}

As you might know, every request in a Spring-based environment goes through a chain of filters which can validate, enhance, or even block the requests.
It's similar to passing the security checks at the airport!

Thus, I went through each and every filter and everything looked fine until I reached the recently added `ForwardedHeaderFilter`.
Finally, a clue appeared.
In this filter, the request path was changed to a different path.
This was a bit unfortunate for us, since the filter was only available for `POST` requests.
For that reason, we received the above mentioned error with the status code `405` for the `GET` request.
After reading the [documentation](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/filter/ForwardedHeaderFilter.html){:target="_blank"}, I figured out that the filter is used to wrap the initial request and changes it based on the `X-Forwarded` headers.
That's a behavior we didn't want to have.
Completely removing the filter from the code finally solved our long-lasting problem.

In case you are wondering **WHY** we added this unnecessary filter in the first place, let me tell you that the answer is simple.
It was inherited from the libraries that are shared between all of our microservices.
Thus, it's definitely worth having a look if this filter is the reason for issues you have when suddenly receiving a `405` error code after upgrading Spring Boot.
