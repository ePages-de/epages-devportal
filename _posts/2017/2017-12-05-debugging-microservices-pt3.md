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
For that we need to know its unique trace id, that could be part of a REST API response header and noted down for later log analysis in case of an error.
Another approach is to first come up with a trace id and already provide it along with the initial REST API request to be carried throughout the whole request processing.
You can think of it as painting your request with a signal color, that is easy to spot between all the other dull requests.

## Howling at the moon

With the help of the scripting language [Lua](https://www.lua.org/about.html){:target="_blank"} (Portuguese for "moon") we can enhance our [nginx](https://nginx.org/en/){:target="_blank"} that acts as a central [API gateway](http://microservices.io/patterns/apigateway.html){:target="_blank"}.
We use [OpenResty](https://openresty.org/en/){:target="_blank"} as an alternative to vanilla nginx, as it comes along with a preconfigured Lua environment with many useful libraries.
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

location / {
  proxy_pass http://10.0.0.1:8080;

  # set upstream headers
  proxy_set_header X-B3-TraceId      $trace_id;
  proxy_set_header X-B3-SpanId       $span_id;
  proxy_set_header X-Forwarded-Host  $host;
  proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;

  # add response header
  add_header X-B3-TraceId $trace_id always;
}
{% endhighlight %}

The `set_by_lua_block {}` directive allows us to directly inline Lua scripting code.
Due to Lua's [limited pattern matching support](http://lua-users.org/wiki/PatternsTutorial){:target="_blank"}, we can't use curly brackets as repetition quantifiers from [PCRE](https://www.pcre.org/current/doc/html/pcre2pattern.html#SEC17){:target="_blank"}.
Instead the local function `hex32()` serves as a workaround to create a pattern to exactly match 32 hexadecimal characters like `^[0-9a-f]{32}$` - that is the 128-bit format our trace ids must follow.

This solution looks for presence of a request header named `X-B3-TraceId` (note: HTTP headers are case-insensitive) by evaluating the `ngx.var.http_x_b3_traceid` [nginx variable](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_http_){:target="_blank"}.
If such a header is found and it matches our desired trace id format, we will use it for all proxied upstream requests and also add its value as `X-B3-TraceId` response header.
Otherwise we let nginx create a fresh trace id randomly via its `ngx.var.request_id` [nginx variable](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_request_id){:target="_blank"}.
We also derive a 64-bit **span** id from the first 16 characters of the trace id, as required by the [B3 specification](https://github.com/openzipkin/b3-propagation#spanid-1){:target="_blank"}.
`X-B3-SpanId` as well as a number of typical `X-Forwarded-*` headers are also sent to our upstream microservices.

Now we can mark our HTTP request with a custom trace id, and it will be propagated upstream into our system of distributed microservices before being echoed back to us as a HTTP response header:

{% highlight bash %}
$ curl --include --header 'X-B3-TraceId: dead0000beef0000cafe0000babe0000' https://api-gateway/
HTTP/1.1 200 OK
Date: Wed, 29 Nov 2017 16:12:59 GMT
Content-Type: application/json
Content-Length: 123
Connection: keep-alive
Server: openresty
X-B3-TraceId: dead0000beef0000cafe0000babe0000

{
   ...
}
{% endhighlight %}

Searching for `dead0000beef0000cafe0000babe0000` in our log analysis systems will yield only those log events, that have been generated while processing our marked request.

## IDE Debugging
**TODO**

## Related post

* [Where's the bug in my microservices haystack](/blog/tech-stories/where-is-the-bug-in-my-microservices-haystack/)
* [Tracing the suspect - a microservices murder mystery](/blog/tech-stories/tracing-the-suspect-a-microservices-murder-mystery/)
