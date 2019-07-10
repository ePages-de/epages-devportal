---
layout: post
title: Our journey away from Stoplight
date: 2019-07-16
header_image: public/red-stoplight.jpg
header_position: center
header_overlay: true
category: api-experience
tags: ["api", "reference", "tool", "techcom"]
authors: ["Birgit"]
about_authors: ["bbader"]
---

Actually a post with the title "How we successfully launched Stoplight" or "ePages launches their interactive API documentation" was supposed to appear here.
Then we would have reached the goal that our Technical Communicators have been pushing for our product Beyond since 2017.
Unfortunately, things didn't turn out as planned.
But that is not a reason to not continue reading at this point.
Now it's just getting interesting, because I'll tell you what led us to the decision not to put further effort into a tool for interactive documentation for the time being.

## Why again did we want to go interactive?

As mentioned in "[On our way to interactive documentation with Stoplight](/blog/api-experience/on-our-way-to-interactive-documentation-with-stoplight/)" we wanted to switch from a static HTML document to [Stoplight](https://stoplight.io/){:target="_blank"} as a documentation solution to provide interactivity and a better usability for users of our API.
We know that developers not only want to read documentation, they also want to see how an API works.
Although various rest clients are out there to test an API, we wanted to bring that interactivity directly into our documentation.
This way users can learn about our API and try it out in one place instead of having to switch between tools.
In short, we wanted to make life easier for developers 😉.

## Goodbye Asciidoctor - Hello OpenAPI

To generate our static [HTML documentation](http://docs.beyondshop.cloud/){:target="_blank"} we use [Spring REST Docs](https://spring.io/projects/spring-restdocs){:target="_blank"}, a test-driven approach to produce documentation for RESTful services.
For Stoplight to be our new tool, our backend team had to make some considerable effort as the tool is based on [OpenAPI](https://swagger.io/docs/specification/about/){:target="_blank"}.
For example, they built an [API specification support to Spring REST Docs](https://github.com/ePages-de/restdocs-api-spec){:target="_blank"} that, amongst others, supports OpenAPI.

And what's more, our developers had to:

* make adjustments to our microservices to meet the requirements of OpenAPI
* build a deployment pipeline
* adjust the API tests
* support our Technical Communicators with the fine tuning.

(To be honest, it was not really a goodbye to Asciidoctor.
As it is an integral part to publish our internal developer documentation, it had to remain.)

## Soft launch

Automatically turning an OpenAPI specification into an API Reference, making the navigation a lot easier, introducing interactivity by sending test requests during document usage, a code generator for a multitude of languages and frameworks, a search... all that made our eyes shine!
And a bunch of Frontend developers were happily using the documentation from the very beginning when we internally launched it.
That was a good opportunity to try and test the docs before we let any external developer on it. 

## Practice makes perfect

A good six months had passed with a lot of shaping still to be done here and there.
When we thought, we were ready for public launch, we invested some time and checked the API reference of the static HTML document with what we had in Stoplight.
From the time we started with the tool until then, the API reference had changed a lot.
New endpoints had been crafted, and the API had grown massively.
No wonder that we were wondering why, during our final check, lots of these endpoints were missing in Stoplight.

We asked our developers to investigate and the result somewhat surprised us:
OpenAPI V2 cannot provide different schemas and/or payload examples for a single URI.
Wow, that was some news!
So much effort, and now this!
As our API handles many endpoints with a single URI such as products and variation products, there was no quick and easy solution to solve this issue.
And releasing an incomplete documentation was no option for us.

## What now?

We figured that OpenAPI V3 caters for different schemas/examples for one URI.
But implementing that requires backend resources for the rework.
All these resources are blocked for feature development for the rest of the year.
What's more, Stoplight has OpenAPI V3 in beta mode, and we can't assume it's running flawlessly.
But let me get this right: it's not just about Stoplight - any other “frontend” that we would use with OpenAPI V2 would result in the same problem.

So, after some mourning, we got back to our feet, and back to the roots.
We tidied up the static HTML document and will continue using it.
There's some light on the horizon that we tune usability up, and we'll also research some other options that can replace the current HTML documentation in the long run.
We have [Postman](https://www.getpostman.com/api-documentation-generator){:target="_blank"} on the radar, but we don't want to promise too much yet.

With us it never gets boring 😉.
Stay tuned.