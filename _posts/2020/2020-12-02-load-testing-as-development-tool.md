---
layout: post
title: Load testing for measuring impact
date: 2020-11-26
header_image: public/load-testing-as-development-tool.jpg
header_position: bottom
header_overlay: true
category: tech-stories
tags: ["api", "programming", "load test", "artillery", "vegeta"]
authors: ["Roberto"]
about_authors: ["rwelzel"]
---

We as developers are making changes to our software all the time.
As **RESTful API** developers, it is common for us to change the internal behaviour of endpoints on a weekly basis.
But many times we do changes without having enough knowledge about how these changes will affect the performance of a given endpoint.

Sometimes we might not even have the appropriate information available to make an accurate assessment of the impact of the changes that are made to our *REST* endpoints.
Information like how often a specific endpoint is called, or how long it takes to respond on average, are vital to making a correct assessment of the impact of our changes on the software.
Based on data like this we can decide whether our approach is adequate or not.

Another important factor used in this assessment is having a **load testing tool** to actually be able to measure the impact of code changes.

## Welcome to Load Testing

When you load test your changes in a controlled and stable environment (same resources, same latency, etc.), you can get very useful insights that can help you decide on the approach that will not affect performance in a way that can cause problems later on in production.

To achieve this you do a simple comparison of before/after: the results of a load test scenario run against the current implementation must be compared with the results of the same load test scenario against the new implementation.
Needless to say, the hardware and environment of both tests need to be exactly the same, so that the results will have a minimal amount of consistency.
I could even advise that you run the same tests a few times and compare against the average values.

## Your tool belt

{% image_custom image="/assets/img/pages/blog/images/tool-belt.jpg" width="50" %}

Workers of every trade need tools, right? With developers, it is no different.
There are a few very nice tools that are easy to use and enable you to measure the impact of changes in an endpoint’s performance.
We will take a look at a couple of these that can integrate your developer belt of tools.
There are many (many) others out there, but the goal here is to get acquainted with just a couple, to get you started.
As with every tool, each has a specific use, so take into consideration your specific needs when choosing the tool.

### Vegeta

The first is called Vegeta (yes, the infamous nemesis of our beloved protector of Earth, Goku).
The repository can be found here: [Vegeta Github Repo](https://github.com/tsenart/vegeta){:target="_blank"}.
And here is a cool picture of Vegeta (of course this post go not go without this):

{% image_custom image="/assets/img/pages/blog/images/vegeta.png" width="15" %}

**Vegeta** is a command line tool that is simple to use and does a good job.
In order to use it, you can either download the binaries (section "releases" on Github) or, if you are using Mac, you can also download it via brew:

```bash
$ brew update && brew install vegeta
```

The most basic command you can use is:

```bash
$ echo "GET http://httpbin.org/get" | vegeta attack -duration=10s -rate=10 | vegeta report
```

What this command does is that it will "attack" the host indicated by the echo command and afterwards generate a report.
In the above command we used echo as input for Vegeta, but this input can also be provided via file (`cat file.txt | vegeta attack (...)`) and even different formats.

A few options were used with the `attack` command: `-duration=10s` means the testing period is of 10 seconds and `-rate=10` means 10 requests per second (RPS) will be sent (the default is 50).
10 RPS for 10 seconds make up a total of 100 requests sent.
Vegeta will then take the output of this `attack` and generate a report for us that looks like this:

```
Requests      [total, rate, throughput]         100, 10.10, 10.01
Duration      [total, attack, wait]             9.994s, 9.897s, 97.171ms
Latencies     [min, mean, 50, 90, 95, 99, max]  96.287ms, 107.376ms, 97.992ms, 99.905ms, 182.958ms, 337.449ms, 366.613ms
Bytes In      [total, mean]                     29690, 296.90
Bytes Out     [total, mean]                     0, 0.00
Success       [ratio]                           100.00%
Status Codes  [code:count]                      200:100
Error Set:
```
In this report we can see some very detailed information about the batch of requests that were made by Vegeta.
This command line tool also allows you to:
* Use custom headers (think authorization tokens)
* Send requests to different targets
* Set timeouts
* Output your report in JSON format

It can even plot the results in a graph (check the `plot` command)! Check out the GitHub repo to see a list of available options, it is a very flexible tool.

### Artillery

The last tool and the most complete is called [Artillery](https://artillery.io/){:target="_blank"}.
It can be found here: [Artillery Github Repo](https://github.com/artilleryio/artillery){:target="_blank"}

It is available as a NPM (Node Package Manager) package, so you must either have it installed or run it from inside a docker container (believe me, this is possible, and can save time and space in your disk).
The *npm* command to install it is as follows: `$ npm install -g artillery`

Differently from the previous tool, Artillery requires a `yaml` file that describes the load test scenario.
It then reads this file and executes the steps described.
A couple advantages of using a file for running load tests:
* Descriptive: easy to read and understand what will be executed
* Can be version controlled

Here is an example of such a yaml file:

```yaml
config:
  target: 'http://httpbin.org'
  phases:
    - duration: 20 # How many seconds this test will run for
      arrivalRate: 20 # The number of requests per second
      name: "The real deal"
  defaults:
    headers:
      Authorization: 'Bearer <insert the token here>'
scenarios:
  - flow:
    - get:
        url: "/get"
```

This yaml file is very basic and is a rough equivalent to the command we used with Vegeta earlier.
As you can see, a `duration` and `arrivalRate` can be defined.
This way we tell Artillery the amount of load we want to put in the endpoint.
In this case, it is 20 RPS for 20 seconds, which amounts to 400 requests in total.
You can also use headers with each request, this is where a "Bearer" token would be used.

To make Artillery run this file, simply use the command `$ artillery run my-scenario.yaml`.
Artillery will then run the scenario and show partial results every 10 seconds.
The output looks like this:

```
Report @ 15:43:29(+0000) 2020-11-20
Elapsed time: 20 seconds
  Scenarios launched:  0
  Scenarios completed: 5
  Requests completed:  5
  RPS sent: NaN
  Request latency:
    min: 195.5
    max: 219.2
    median: 202.7
    p95: 219.2
    p99: 219.2
  Codes:
    200: 5

All virtual users finished
Summary report @ 15:43:29(+0000) 2020-11-20
  Scenarios launched:  400
  Scenarios completed: 400
  Requests completed:  400
  RPS sent: 19.68
  Request latency:
    min: 192.7
    max: 586.1
    median: 201.7
    p95: 420.3
    p99: 474.4
  Scenario counts:
    0: 400 (100%)
  Codes:
    200: 400
```

Artillery can also:
* Read values from files and use them in the payloads
* Use values from the response of previous requests (e.g. to chain requests)
* Define scenarios where RPS increase with time
* Reporting

For more information you can look in the [documentation](https://artillery.io/docs/guides/overview/welcome.html){:target="_blank"} - it is very easy to understand and also very useful, especially the "guides" section.

## Conclusion

There are many other tools out there: Locust, Hey, Gatling... some even have test scenarios written in code (Scala, Python...).
It really boils down to choosing the best tool for your scenario.
If you just want to test your changes, any CLI tool should work.
If you want to have your tests run in a pipeline, then it is best to have it as files in version control.
I hope this blog post gives you a rough overview of how load testing is done and also how you can benefit from it when developing your RESTful APIs.