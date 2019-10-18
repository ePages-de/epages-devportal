---
layout: post
title: We created a Beyond API Ruby Client
date: 2019-10-12
header_image: public/we-created-a-beyond-api-ruby-client.jpg
header_overlay: true
category: coding
tags: ["ruby", "gem", "api"]
authors: ["Unai"]
about_authors: ["uabrisketa"]
---

Some time ago we published the first pre-release version of our new _open source_ project: [Beyond API Ruby Client](https://github.com/ePages-de/beyond_api-ruby_client). In this article I am going tell you about our motivation behind this project as wel as what it is about.

## Motivation

Our Team (formally known as Team 42) is responsible of all the internal tools we use at ePages, like the Developer Portal. We use Ruby and Ruby based Frameworks as Rails or Jekyll for the development of our projects. This, in combination with great gems maintained by the community, gives us the possibility of developing fast and create reliable tools.

From some time now we also started developing apps for our new ePages Beyond product. As we wanted to make future app development faster in order to be more productive we decided to develop this new tool.

## The tool

The **Beyond API Ruby Client** is the tool in charge of connecting apps and Beyond shops making use of the Beyond API. If you want to develop apps for Beyond using Ruby on Rails this gem will give you access to all resources you need.

You will be able to easily obtain your first Oauth Token, refresh it or access any of the multiple endpoints that the Beyond API offers, and all of this using the Ruby syntax we know you love. Here you can find some examples:

#### Obtaining a token from an authentication code:

```ruby
session = BeyondApi::Session.new(api_url: "https://your-shop-name.beyondshop.cloud/api")
session.token.create("your-auth-code")
```

#### Refresh your token:

```ruby
session = BeyondApi::Session.new(api_url: "https://your-shop-name.beyondshop.cloud/api",
                                 refresh_token: "your-refresh-token")
session.token.refresh

# Or just session.token.refresh if your session object is already defined
```

#### List all shop products:

```ruby
session.products.all(page: 1, size: 50)
```

If you want more information about how to start using our gem or see all the available endpoints, check our [getting started](https://github.com/ePages-de/beyond_api-ruby_client/blob/master/GETTING_STARTED.md) page on GitHub.

## Want to contribute?

The **Beyond API Ruby Client** project is _open source_ and as an open source project we would like to invite you to contribute to it. You can check our [contributing page](https://github.com/ePages-de/beyond_api-ruby_client/blob/master/CONTRIBUTING.md) on GitHub to know how you can help on the development of the project.
