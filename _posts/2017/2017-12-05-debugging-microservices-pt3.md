---
layout: post
title: Debugging Microservices
date: 2017-12-05
header_image: debugging-microservices.jpg
header_overlay: true
category: tech-stories
tags: ["microservice", "debugging", "logging", "tracing", "nginx", "lua"]
authors: ["Jens"]
---

<style>

.twitter-tweet {
  margin: auto;
}
</style>

We covered [structured log events](/blog/tech-stories/where-is-the-bug-in-my-microservices-haystack/) and [distributed tracing](/blog/tech-stories/tracing-the-suspect-a-microservices-murder-mystery/) by the first two posts in our series about debugging microservices.
In this post we will even further enhance our request tracing and finally be able to peek into a running microservice from our IDE.

## Color me interested

With the help of [Sleuth](https://cloud.spring.io/spring-cloud-sleuth/){:target="_blank"} and [Zipkin](http://zipkin.io/){:target="_blank"} we are able to search for and correlate log events belonging to a particular **trace**.
For that we need to know its unique trace id, that could be part of a REST API response header and noted down for later analysis in case of an error.
Another approach is to first come up with a trace id and already provide it along with the initial REST API request to be carried throughout the whole request processing.
You can think of painting your request with a signal color that is easy to spot between all the other dull requests.

## Dynamic Lua scripting in nginx

With the help of [Lua](https://github.com/openresty/lua-nginx-module#readme){:target="_blank"} we can enhance the [nginx](https://nginx.org/en/){:target="_blank"} that acts as our central [API gateway](http://microservices.io/patterns/apigateway.html){:target="_blank"}.
Put the following snippet somewhere inside a `server {}` block of your nginx configuration:

{% highlight lua %}
# initialize variables
set $trace_id '';
set $span_id '';

set_by_lua_block $trace_id {
  local function hex32()
    local pattern  = ""
    for i = 1, 32, 1 do
      pattern = pattern .. "[0-9a-f]"
    end
    return "^" .. pattern .. "$"
  end

  local trace_id = ngx.var.http_x_b3_traceid or ngx.var.request_id
  if not trace_id:match(hex32()) then
    trace_id = ngx.var.request_id
  end
  ngx.var.span_id = trace_id:sub(1, 16)
  return trace_id
}

# set upstream headers
proxy_set_header X-B3-SpanId  $span_id;
proxy_set_header X-B3-TraceId $trace_id;

# set response headers
add_header       X-B3-TraceId $trace_id always;
{% endhighlight %}

The `set_by_lua_block {}` directive allows us to directly inline Lua scripting code.
Due to Lua's [limited pattern matching support](http://lua-users.org/wiki/PatternsTutorial){:target="_blank"}, we can't use curly brackets as repetition quantifiers from [PCRE](https://www.pcre.org/current/doc/html/pcre2pattern.html#SEC17){:target="_blank"}.
Instead the local function `hex32()` serves as a workaround to create a pattern to exactly match 32 hexadecimal characters like `^[0-9a-f]{32}$` - that is the 128-bit format our trace ids must follow.

This solution looks for presence of a request header named `X-B3-TraceId` (note: HTTP headers are case-insensitive) by evaluating the `ngx.var.http_x_b3_traceid` [nginx variable](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_http_){:target="_blank"}.
If such a header is found and it matches our desired trace id format, we will use it for all proxied upstream requests and also add its value as `X-B3-TraceId` response header.
Otherwise we let nginx create a fresh trace id randomly via its `ngx.var.request_id` [nginx variable](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_request_id){:target="_blank"}.
We also derive a 64-bit **span** id from the first 16 characters of the trace id, as required by the [B3 specification](https://github.com/openzipkin/b3-propagation#spanid-1){:target="_blank"}.


## IDE Debugging
**TODO**

## Related post

* [Where's the bug in my microservices haystack](/blog/tech-stories/where-is-the-bug-in-my-microservices-haystack/)
* [Tracing the suspect - a microservices murder mystery](/blog/tech-stories/tracing-the-suspect-a-microservices-murder-mystery/)
