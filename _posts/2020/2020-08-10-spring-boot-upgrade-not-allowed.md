---
layout: post
title: Spring Boot upgrade Not Allowed
date: 2020-05-07
header_image: public/adventure-perfect-program.jpg
header_position: top
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

Every once in a while, especially if we have enough capacity to do so, we upgrade our dependencies, as well.
Sometimes, the transition to the newer software version might be seamless or, at least, simple enough.
The other times, however...

## Method not allowed
It was time for one of such upgrades and after successfully upgrading a couple dozen of other microservices to Spring Boot 2.1 (with only a few hiccups), there were no signs of trouble.
There were only a few microservices left, and the next on the list was the service, which is responsible with storing and accessing the user uploaded images on our platform.

Every single microservice before that was upgraded with just a minor change to `application.yml`:
```yaml
spring:
  main:
    allow-bean-definition-overriding: true
```
You add that change, modify the microservice to use the needed version of Spring Boot and voilà!

After the same procedure with this service it successfully started.
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
By looking deeper into the code, I found out that what the microservice actually does is connect to another server and store or fetch the images from it.
A proxy, if you will.
And that other server behind the proxy needed [forwarded headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Forwarded){:target="_blank"} to function properly.
Our proxy is built on top of [Zuul](https://github.com/Netflix/zuul){:target="_blank"}, which was sending the needed headers correctly.
Emphasis on *was*.

## Why does it have to be beans?
The problem is simple.
We need forwarded headers.
We also need Spring Boot version upgrade.
What do we do?

It's the Bean time!
```java
@Bean
public Filter forwardedHeaderFilter() {
    return new ForwardedHeaderFilter();
}
```

With this bean in configuration class I run the tests again, and they all successfully pass.
The proxy plays well with the server behind the proxy, but how do other microservices play with the proxy itself?

We have debug environments for such cases, so that you can quickly check if the changes are working as expected, and also run functional API tests while you are at it.
I go straight into tests and run all of them, fully expecting them to be green after they finish.
The tests start one by one and each successfully completes.
Business, as usual.
This goes on for some time until one test suddenly fails.
Then another.
And another.
And a dozen more.
All of them are related to uploading and managing the images on the storage.

And now the vicious loop begins.
Searching for similar issues, trying out the solutions from all the different posts on Github and Stackoverflow, failing to run them successfully, searching for new solutions, etc.
Nothing helped.
My team tried to lend me a hand and after every discussion I would go and make a change in the microservice, only to find out that the changes did not solve the problem.

After a certain point I did not believe that we can upgrade our proxy microservice in the first place and felt like giving up on the task altogether (which means putting it back to the backlog).
This was when Donald told me he can take this problem over.

---

Integration tests, Distributed Tracing and Logging are the terms that we developers tend to ignore or not worry that much since they don't appear in the scene on sunny days.
But working on a microservice architecture where quite often you have to debug requests passing through several services, the lack of traceability or a centralized logging system can be quite a hassle.
Luckily our logs are analyzed and stored to `Google Stackdriver` which offers you plenty of functionalities to search through the logs.

Let's go back to the problem and to what I did to find it and come up with the solution in the end.

After discussing with Andrey what had he tried and I decide to go Sherlock and follow the failing requests around in order to see what was changed on its way.

{% image_custom image="/assets/img/pages/blog/images/sherlock.png" width="80" lightbox %}

As it's know every request in a Spring based environment goes through a chain of filters which can validate, enhance or even block the requests.
Same like passing the security checks at the airport!

Thus, I went through each filter and everything was look fine until I reached the recently added `ForwardedHeaderFilter`.
Finally, a clue appeared.
The request path was changed to a different path which was a bit unfortunate for us since it existed only for `POST` requests therefor a `405` was received.
After reading the documentation I understood that it's used to wrap the initial request and change it based on the `X-Forwarded` headers, a behavior which we didn't want to have.
Then **WHY?** Why an unnecessary filter was added on the first place? Answer is simple.
Inherited from the shared libraries.
