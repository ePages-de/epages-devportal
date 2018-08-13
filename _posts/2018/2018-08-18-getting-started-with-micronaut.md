---
layout: post
title: Getting started with Micronaut
date: 2018-08-18
header_image: public/micronaut-header.jpeg
header_position: bottom
header_overlay: true
category: tech-stories
tags: ["micronaut", "java", "kotlin"]
authors: ["Xavi"]
about_authors: ["xalvarez"]
---

[Spring Boot](https://spring.io/projects/spring-boot){:target="_blank"} is our *weapon of choice* when developing microservices. It comes with lots of useful features out of the box and it allows us to achieve positive results swiftly. However, when it first came out, microservices weren't a thing yet, and that entails certain drawbacks. That's why we used our last [brown bag session](https://www.investopedia.com/terms/b/brown-bag-meeting.asp){:target="_blank"} to address these drawbacks, and fiddled with [Micronaut](http://micronaut.io/){:target="_blank"}. But let's start from the beginning.

## Spring Boot

There are always advantages and disadvantages derived from using one framework or the other, or just not using any at all, and Spring Boot is no exception to this rule. For us, two of those *pain points* are:

- Slow test execution
- Slow application startup
- Memory consumption

### Slow test execution

Our microservices contain a number of tests, and most of them include at least a couple hundred integration tests. Despite the fact that each test is executed in the order of milliseconds, running all our tests takes a couple minutes, and executing a test class individually takes an average of 30 seconds.

The reason behind this is that before executing our integration tests, Spring Boot needs to carry out some additional work such as [loading Spring's ApplicationContext and WebApplicationContext](https://docs.spring.io/spring/docs/current/spring-framework-reference/testing.html#testing-ctx-management){:target="_blank"}.

Now think about a developer who is working on a new feature and running tests over and over again. Can you picture their desperation while waiting for the test execution to finish?

### Slow application start-up

Similarly, starting a microservice is relatively slow, and one of the reasons is that there are lots of things happening at runtime. For example, the bytecode of each and every [Spring bean](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#beans-introduction){:target="_blank"} is read, and that of course adds up to the start-up time.

In a microservices environment, where individual applications need to be deployed quite often, specially when following some kind of [*continuous deployment*](https://www.atlassian.com/continuous-delivery/ci-vs-ci-vs-cd){:target="_blank"} approach, this may become inconvenient.

### Memory consumption

Although Spring Boot memory performance can be improved for example by playing with different JVM parameters, in general Spring Boot applications have a relatively high memory footprint.

In our environment, a microservice requires a couple hundred megabytes of memory, and just like time is money, so is memory. In other words, the more microservices you have, the more memory you need, and that doesn't come for free.

To address these disadvantages we used our last [*brown bag* session](https://www.investopedia.com/terms/b/brown-bag-meeting.asp){:target="_blank"} to fiddle with [Micronaut](http://micronaut.io/){:target="_blank"}.

## Micronaut

[Micronaut](http://micronaut.io/){:target="_blank"} is an Open Source JVM framework comparable to Spring Boot designed specifically to solve microservice problems. It's being developed by the inventors of [Grails](https://grails.org/){:target="_blank"}, so if you come from a Spring Boot, Grails or similar background the learning curve should be pretty smooth.

This is how Micronaut tackles the disadvantages above:

- **Test execution.** A lot of the heavy work that Spring Boot does at runtime is done at compile time on Micronaut. As a consequence, test suite setup is minimal and way faster.
- **Application start-up.** For the same reason as above, starting an application only takes a couple seconds, and that doesn't change dramatically when increasing the number of classes.
- **Memory consumption.** While with Spring Boot we talk about a couple hundred megabytes per microservice, Micronaut is happy with tens of megabytes.

Unfortunately there aren't many benchmarks out there yet, but I can recommend the following Micronaut presentation, where some interesting numbers are explained:

{% youtube_video video_id="56j_f3OCg6E" %}

And now let's jump right into it and write our first REST client with Micronaut.

### Example: GitHub REST client

In this example I'll write a simple REST client with [Kotlin](https://kotlinlang.org/){:target="_blank"} that consumes some the [GitHub GraphQL API](https://developer.github.com/v4/){:target="_blank"} and exposes a REST endpoint.

**Prerequisites:**

- A [GitHub](https://github.com/){:target="_blank"} GitHub account.
- A [GitHub personal API token](https://blog.github.com/2013-05-16-personal-api-tokens/){:target="_blank"}.
- [Micronaut already installed](http://micronaut.io/download.html){:target="_blank"}.

After installing Micronaut we're ready to create a skeleton project by running:

```
mn create-app demo -l kotlin
```

#### GitHub client

Let's start by writing a client that is able to interact with GitHub's API:

{% highlight kotlin %}
@Client("https://api.github.com/")
interface GithubClient {

    @Post("/graphql")
    fun queryGitHubApi(
            query: String,
            @Header(value = "Authorization") auth: String,
            @Header(value = "User-Agent") userAgent: String
    ): String
}
{% endhighlight %}

The class above defines an `@Client` annotated interface that points to a specific API (https://api.github.com/) and contains a `@Post` annotated method which takes three parameters: the GraphQL query we want to execute, an Authorization header that should be fed with our GitHub API token, and a mandatory User-Agent header.

#### Configuration file

Communication with GitHub's API must be authenticated, which means that we need to use a token. In order to use this token we could benefit from configuration files. First, we need to add a new section to our *application.yml*:

{% highlight yaml %}
github:
    token: d3397be89674134d5045d0ae57018b54092dac92
{% endhighlight %}

Afterwards, we should create a configuration class that let's us read the token:

{% highlight kotlin %}
const val GITHUB_PROPERTIES_PREFIX = "github"

@ConfigurationProperties(GITHUB_PROPERTIES_PREFIX)
class GitHubConfiguration {
    lateinit var token: String
}
{% endhighlight %}

This way *GitHubConfiguration* gets the token injected from *application.yml*.

#### REST controller

The last step of this *HelloWorld* example is to create a REST controller that calls our GitHub client.

For this example I'll create a controller that contains a method which returns a list of open source licenses known to GitHub:

{% highlight kotlin %}
@Controller("/github")
class GithubController(
        val githubClient: GithubClient,
        val gitHubConfiguration: GitHubConfiguration
) {

    @Get("/licenses")
    fun retrieveOpenSourceLicenses(): String {
        val query: String = """
            {
              licenses {
                name
              }
            }
        """

        return githubClient.queryGitHubApi(
                query,
                "bearer ${gitHubConfiguration.token}",
                "potato"
        )
    }

}
{% endhighlight %}

Here we're exposing a `/github/licenses` endpoint that will call the GitHub client using the token from the configuration file.

#### Execution

Now we have everything we need to try out our new REST client. First, we need to start the application, which **on my laptop takes 1843 milliseconds**:

```
[main] INFO  io.micronaut.runtime.Micronaut - Startup completed in 1843ms. Server Running: http://localhost:8080
```

As you can see, the server is running on port 8080 so we can now call the previously created endpoint and see if we achieve the desired result. I'll use [HTTPie](https://httpie.org/){:target="_blank"} for that:

```
http GET :8080/github/licenses
```

We can also shorten the response by collecting only license names by means of [jq](https://stedolan.github.io/jq/){:target="_blank"}:

```
http GET :8080/github/licenses | jq .data.licenses[].name
```

And this is the result:

```
"GNU General Public License v3.0"
"The Unlicense"
"GNU Lesser General Public License v2.1"
"GNU Affero General Public License v3.0"
"MIT License"
"GNU General Public License v2.0"
"BSD 2-Clause \"Simplified\" License"
"Apache License 2.0"
"GNU Lesser General Public License v3.0"
"Eclipse Public License 2.0"
"Mozilla Public License 2.0"
"BSD 3-Clause \"New\" or \"Revised\" License"
```

## Conclusion

Carrying out too much work at runtime is a downside that has certain implications that need to be taken into account. The concepts software developers work with nowadays are different from the ones that were considered when some of the most popular frameworks kicked off.

However, I would like to stress the fact that Micronaut is just starting. It was announced a couple months ago and it may not feel production ready yet. Other frameworks such as Spring Boot have an impressibe set of features and community support that can't be overlooked. Nevertheless, Micronaut is an interesting piece of technology that is definitely worth keeping track of.

## Resources

Here's a collection of resources that may be interesting if you want to play around with Micronaut:
- [Official Micronaut site](http://micronaut.io){:target="_blank"}
- [Micronaut guides](http://guides.micronaut.io/index.html){:target="_blank"}