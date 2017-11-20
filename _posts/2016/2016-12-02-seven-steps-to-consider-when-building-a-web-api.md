---
layout: post
title: "7 steps to consider when building a Web API"
date: 2016-12-02
header_image: construction.jpg
category: api-experience
authors: ["David", "Ulf B."]
---

Today's e-commerce software is more and more connected with services offered by other companies,
e.g. payment and delivery providers, ERP systems or website builders.
The communication between these different services is happening via Web API's.
If you plan to start a new software, having an API is kind of essential.

Several steps need to be considered when developing an API.
What do we need to figure out first and which concepts do we have to think about?

## 1 Define requirements

As a software developer, you're aware of the gap between the defined requirements from stakeholders and the final production-ready software.
This divergence should be as small as possible.
When creating an API, there could be a similar gap between API developer and API user, such as your Frontend colleagues, or even developers from other companies if it is a public API.

* In the best case, let the users of your API describe the requirements themselves.
* Use [Test-driven development](http://wiki.c2.com/?TestDrivenDevelopment){:target="_blank"}: Specify the expected responses and write a test checking them.
* Have a look how competitors define similar API's and don't reinvent the wheel ([Principle of Least Astonishment](https://en.wikipedia.org/wiki/Principle_of_least_astonishment){:target="_blank"}).

## 2 Secure your API

You will need an authorization process to control the access to the API.
Depending on your business case you can also think about different scopes to
restrict the usage of certain API calls based on the account.

* If you want to build a public API, the [OAuth2](https://oauth.net/2/){:target="_blank"} authorization flow is a good choice.
* Think about using [JSON Web Token](https://jwt.io/){:target="_blank"} which have some nice advantages (the token itself can contain user information).

## 3 Implement flexible API call limits

API calls have different objectives.
These objectives will be called at different times.

* Define different API call limits for different API calls.
* Implement an option to change these limits with configuration.
You will find the ideal limit by using your API in real life.
* Return information about the limitation in the response.
Use headers for these information as in the [ePages REST API](/apps/api-call-limit.html).

## 4 Provide an SDK

A public API should be easily usable outside of the company by other developers.
It's recommended to provide an SDK (at least for the common programming languages) to simplify the usage for external developers.

* Make the SDK code public (e.g. on [GitHub](https://github.com){:target="_blank"}), so that external developers can extend the code later on.

At [ePages](/), we currently have 2 SDKs: [Ruby](/apps/ruby-gem.html) and [PHP](/apps/php-client.html).

## 5 Use automation services

There are lots of to do's in order to build and rollout releases.
These tasks always have to be done in the same order and with the same requirements.

* Use tools to automate deployment, test, and integration processes.
At [ePages](http://www.epages.com/en/){:target="_blank"} we use [Jenkins](https://jenkins.io/){:target="_blank"} and [VMware vSphere](http://www.vmware.com/de/products/vsphere.html){:target="_blank"}.
* Integrate these tools into your daily work.
There are plugins for [GitHub](https://wiki.jenkins-ci.org/display/JENKINS/GitHub+Plugin){:target="_blank"} and [Confluence](https://marketplace.atlassian.com/plugins/nl.avisi.confluence.plugins.git-plugin/server/overview){:target="_blank"}.

## 6 Provide documentation

This part is often missed out though it is quite important, especially for a public API.
An external company cannot simply go to the colleague who designed the API and ask how to use it.
Good documentation should include:

- information about the onboarding and the authorization process
- explanation of every possible API call, its possible parameters, as well as example requests and responses
- version information and release notes
- example code, if there are SDKs for the API.

## 7 Plan how to give support

The API is used by external developers.
They will, most likely, find bugs or have feature requests.

* Evaluate how to handle feedback from external developers.
Use forums, support forms, social media, or other suitable communication platforms.
