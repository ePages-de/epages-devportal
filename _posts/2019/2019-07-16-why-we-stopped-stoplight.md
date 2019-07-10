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
Although various REST clients are out there to test an API, we wanted to bring that interactivity directly into our documentation.
This way users can learn about our API and try it out in one place instead of having to switch between tools.
In short, we wanted to make life easier for developers 😉.

## Goodbye Asciidoctor - Hello OpenAPI

To generate our static [HTML documentation](http://docs.beyondshop.cloud/){:target="_blank"} we use [Spring REST Docs](https://spring.io/projects/spring-restdocs){:target="_blank"}, a test-driven approach to produce documentation for RESTful services.
For Stoplight to be our new tool, our backend team had to make some considerable effort as the tool consumes [OpenAPI](https://swagger.io/docs/specification/about/){:target="_blank"} specification files.

For example, they built an [open-source project](https://github.com/ePages-de/restdocs-api-spec){:target="_blank"} to generate OpenAPI 2, OpenAPI 3, and Postman Collections from tests documented with Spring REST Docs.
What's more, our developers had to make adjustments to our microservices to meet the requirements of OpenAPI, such as adapting the REST integration tests to use URI templates, and each request needed its own description (in addition to the snippet identifier that Spring REST Docs already requires).
They also supported our Technical Communicators a lot with all the fine tuning.

(To be honest, it was not really a goodbye to Asciidoctor.
We still had to support it to document the (internal) Messaging API of each microservice.
Keeping Asciidoctor did not mean so much additional effort for our developers, since it's provided by Spring REST Docs already.
But for our Technical Communicators it was, because they had to keep the .adoc files and the Stoplight texts consistent.)

## Soft launch

Automatically turning an OpenAPI specification into an API reference, making the navigation a lot easier, introducing interactivity by sending test requests during document usage, a code generator for a multitude of languages and frameworks, a search... all that made our eyes shine!
And a bunch of Frontend developers were happily using the documentation from the very beginning when we internally launched it.
That was a good opportunity to try and test the docs before we let any external developer on it. 

## Practice makes perfect

A good six months had passed with a lot of shaping still to be done here and there.
When we thought, we were ready for public launch, we invested some time and checked the API reference of the static HTML document with what we had in Stoplight.
From the time we started with the tool until then, the API reference had changed a lot.
New endpoints had been crafted, and the API had grown massively.
No wonder that we were wondering why, during our final check, lots of these endpoints were missing in Stoplight.

We asked our developers to investigate, and now this:
OpenAPI 2 doesn't support multiple schemas and/or payload examples for the same request, if it uses the same HTTP method, resource, content type, and HTTP status code.
As our API handles many use cases with a single resource, such as products and variation products, there was no quick and easy solution to solve this issue.
And releasing an incomplete documentation was no option for us.

## What now?

We figured that OpenAPI 3 caters for different schemas/examples for the same request.
But we had some question marks about investing time in it's implementation:

* OpenAPI 3 was contributed to our open-source project by externals. It works for their use cases, but does it work for ours as well?
* Do we really get a benefit when importing it in Stoplight?
* Stoplight has OpenAPI 3 in beta mode - can we assume it's running flawlessly?

But let me get this right: it's not just about Stoplight - any other “frontend” that we would use with OpenAPI 2 would result in the same problem.

So, after some mourning, we got back to our feet, and back to the roots.
We tidied up the static HTML document and will continue using it.
There's some light on the horizon that we tune usability up, and we'll also research some other options that can replace the current HTML documentation in the long run.
We have [Postman Collections](https://www.getpostman.com/api-documentation-generator){:target="_blank"} on the radar, but we don't want to promise too much yet.

With us it never gets boring 😉.
Stay tuned.