---
layout: post
title: Why we decided against a tool for interactive documentation
date: 2019-07-16
header_image: public/red-stoplight.jpg
header_position: bottom
header_overlay: true
category: api-experience
tags: ["api", "reference", "documentation", "tool"]
authors: ["Birgit"]
about_authors: ["bbader"]
---

Actually a post with the title "How we successfully launched Stoplight" or "ePages launches their interactive API documentation" was supposed to appear here.
Then we would have reached the goal that our Technical Communicators have been pushing for our product Beyond since 2017.
But unfortunately, things didn't turn out as planned.
That is not a reason to not continue reading at this point.
Now it's just getting interesting, because I'll tell you what led us to the decision not to put further effort into a tool for interactive documentation for the time being.

## Why again did we want to go interactive?

As mentioned in "[On our way to interactive documentation with Stoplight](/blog/api-experience/on-our-way-to-interactive-documentation-with-stoplight/)" we wanted to switch from a static HTML document to [Stoplight](https://stoplight.io/) as a documentation solution to provide interactivity and a better usability for users of our API.
We know that developers not only want to read documentation, they also want to see how an API works.
Although there are a number of rest clients out there to test an API, we wanted to bring that interactivity directly into our documentation.
This way they can learn about the API and try it out in one place instead of having to switch between tools.
In short, we wanted to make life easier for developers 😉.

## Goodbye Asciidoctor - Hello OpenAPI

To generate our static [HTML documentation](http://docs.beyondshop.cloud/){:target="_blank"} we use [Spring REST Docs](https://spring.io/projects/spring-restdocs){:target="_blank"}, a test-driven approach to produce documentation for RESTful services.
For Stoplight to be our new tool, our backend team had to make some considerable effort as Stoplight is based on [OpenAPI](https://swagger.io/docs/specification/about/){:target="_blank"}.
For example, they built an [API specification support to Spring REST Docs](https://github.com/ePages-de/restdocs-api-spec){:target="_blank"} that, amongst others, supports OpenAPI.
And what's more, our developers had to make all the required adjustments at all the different microservices.
Adjustments for tests.
They build a deployment pipeline.
And supported our Technical Communicators with the fine tuning.


## Practice makes perfect

