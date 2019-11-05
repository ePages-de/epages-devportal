---
layout: post
title: Faster app development with the Beyond API Ruby Client
date: 2019-10-24
header_image: public/we-created-a-beyond-api-ruby-client.jpg
header_overlay: true
category: api-experience
tags: ["ruby", "gem", "api"]
authors: ["Unai"]
about_authors: ["uabrisketa"]
---

Just recently we published the first pre-release version of our new _open source_ project: the [Beyond API Ruby Client](https://github.com/ePages-de/beyond_api-ruby_client){:target="_blank"}.
In this post I am going tell you about our motivation behind this project as well as what it is about.

## Motivation

Our team is responsible for developing and maintaining all the internal tools we use at ePages, such as the [Developer Portal](/).
We use Ruby and Ruby-based frameworks such as [Rails](https://rubyonrails.org/){:target="_blank"} or [Jekyll](https://jekyllrb.com/){:target="_blank"} for the development of our projects.
This, in combination with great gems maintained by the community, gives us the possibility to develop quickly and create reliable tools.

For a while now we also started developing apps for our product [ePages Beyond](https://signup.beyondshop.cloud/){:target="_blank"}.
As we wanted to make future app development faster in order to be more productive we decided to develop a gem.

## The gem

The **Beyond API Ruby Client** is the tool in charge of connecting apps and Beyond shops making use of the [Beyond API](http://docs.beyondshop.cloud/){:target="_blank"}.
If you'd like to develop apps for Beyond using Ruby on Rails this gem will give you access to all resources you need.

You will be able to easily obtain your first access token, refresh it, or access any of the multiple endpoints that the Beyond API offers, and all of this using the Ruby syntax we know you love.
Here you can find some examples:

### Obtaining a token from authentication code

```ruby
session = BeyondApi::Session.new(api_url: "https://your-shop-name.beyondshop.cloud/api")
session.token.create("your-auth-code")
```

### Refresh your token

```ruby
session = BeyondApi::Session.new(api_url: "https://your-shop-name.beyondshop.cloud/api",
                                 refresh_token: "your-refresh-token")
session.token.refresh

# Or just session.token.refresh if your session object is already defined
```

### List all shop products

```ruby
session.products.all(page: 1, size: 50)
```

If you'd like to receive more information about how to start using the gem or see all the available endpoints, check our [getting started](https://github.com/ePages-de/beyond_api-ruby_client/blob/master/GETTING_STARTED.md){:target="_blank"} page on GitHub.

## Would you like to contribute?

The **Beyond API Ruby Client** project is _open source_, so you are very welcome to contribute.
You can check our [contributing page](https://github.com/ePages-de/beyond_api-ruby_client/blob/master/CONTRIBUTING.md){:target="_blank"} on GitHub to find out how to enhance the project.
