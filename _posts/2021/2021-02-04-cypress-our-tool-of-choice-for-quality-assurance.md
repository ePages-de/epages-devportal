---
layout: post
title: Cypress - our tool of choice for Quality Assurance
date: 2021-02-04
header_image: public/quality-assurance.jpg
header_position: bottom
header_overlay: true
category: methods-and-tools
tags: ["cypress", "qa", "tools"]
authors: ["Shohidur"]
about_authors: ["sshaju"]
---
One part of the job as a Quality Assurance Engineer is to ensure the quality of the software.
Last year, ePages decided to introduce a new Quality Assurance (QA) tool to test the frontend.
After one of our QA Engineers did some research on QA tools, we decided to go with Cypress.
Of course, there are also other tools, such as the [Selenium Framework](https://www.selenium.dev/){:target="_blank"}, but Cypress offers more advantages for testing and it has many features that help us for our use cases.
I will go into this in more detail in the next sections.

## Cypress - our tool of choice

[Cypress](https://www.cypress.io/){:target="_blank"} is a frontend testing tool that can be used to test everything that runs in browsers.
It allows to easily write test automation scripts in JavaScript which makes the tool developer-friendly.
Furthermore, it makes testing easier because one does not need to install multiple tools to run end-to-end tests.
Everything is already combined in that one tool.

At ePages, we are using Cypress for all types of tests, such as:

- End-to-end tests
- Integration tests
- Unit tests

## Advantages and features of Cypress

Let me introduce you to some advantages and features Cypress offers:

- **Time travel**: Screenshots of every command are available in the test runner. It's easy to track how the commands were executed.

- **Automatic waiting**: Cypress waits for assertions and commands to be finished before moving on. A developer does not need to add a waiting time for completion of a query.

- **Real time reloads**: When changes are made (and saved) on the code base, Cypress automatically reloads and restarts running tests.

- **Auto scroll**: The automatic scrolling operation ensures that an element is in view before performing an action (e.g. clicking on a button).

- **Debuggability**: The debugging is fast and easy. All errors and stack traces can be read in the browser developer tools which helps to find out why tests are failing.

- **Videos**: Videos of the whole test suite can be viewed when running them from the Command Line Interface (CLI).

- **Cross browser testing**: Web applications can be tested in different browsers in order to test browser-specific issues.

- **Test speed**: Cypress runs the tests as fast as the browser renders the content.

Sounds great, doesn't it?
But there's even more.
Let me explain some additional features a bit better that are specifically useful for our daily work.

### Retry-ability

One of the core features of Cypress is that failed tests can be retried multiple times.
By default, this feature is disabled but you can easily enable it in the configuration.
If a test passes, Cypress will move forward to carry out the remaining tests.
But if a test fails, Cypress will retry the test again until it reaches the set limit of retries.

Retry-ability can thus reduce the risk of flaky tests failing entire test runs and helps us to get reliable and consistent results.

### TypeScript integration

It is possible to use [TypeScript](https://docs.cypress.io/guides/tooling/typescript-support.html#Install-TypeScript){:target="_blank"} for writing Cypress tests.
And that's amazing!
There is only one requirement: TypeScript 3.4 (or higher) must be installed in the project.

### Plugins

The possibility of [plugins](https://docs.cypress.io/plugins/index.html){:target="_blank"} in Cypress provides additional benefits for QA Engineers.
For example, they can be used to change resolved configuration programmatically, expand functionality, as well as to add new features and commands.
If you would like to know how to write a plugin, check out the Cypress [API documentation](https://docs.cypress.io/api/plugins/writing-a-plugin.html#Plugins-API){:target="_blank"}.

## Installing Cypress

Now that you know about WHY we chose Cypress, let's have a look at HOW we are using it.
The [installation](https://docs.cypress.io/img/snippets/installing-cli.b927778a.mp4){:target="_blank"} of Cypress is easy and fast.
You only need the following commands:

```
    $ cd /your/project/path
    $ npm init
    $ npm install Cypress --save-dev
```

Cypress can then be opened from the project root with this command:

`$ ./node_modules/.bin/Cypress open`

### The test runner

After running the above command, the Cypress test runner will open.

{% image_custom image="/assets/img/pages/blog/images/cypress-open-project.jpg" width="40" lightbox %}

The files that end with `.spec.js` are the single test suits.
The dropdown menu in the top right corner shows the available browsers on your device.
As written above, any browser can be selected to carry out cross-browser tests.

## Summary

In this blog post, I have shown various advantages and features of Cypress, and gave a quick introduction on how you can install the tool easily.
To sum it up, Cypress is a great choice for us in terms of frontend testing because it is fast, reliable, and full of advantageous features.