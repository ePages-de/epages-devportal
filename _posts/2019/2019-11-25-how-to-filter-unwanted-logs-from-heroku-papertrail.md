---
layout: post
title: How to filter unwanted logs from Heroku Papertrail
date: 2019-11-25
header_image: public/how-to-filter-unwanted-logs-from-heroku-papertrail.jpg
header_position: top
header_overlay: true
category: coding
tags: ["rails", "heroku", "papertrail", "logs"]
authors: ["Unai A."]
about_authors: ["uabrisketa"]
---

Some days ago we wanted to add [Papertrail](https://elements.heroku.com/addons/papertrail) to one of our [Heroku](https://www.heroku.com/)-hosted projects and we discovered a problem: _Heroku router was logging some critical information_. On this blog post I'm going to explain you how to filter unwanted logs from Heroku Papertrail Addon.

### The problem

When a Beyond Shop merchant is installing an app, a `GET` request is triggered to the app Callback URL with the information that the developer needs in order to identify the merchant. This information (like the `api_url`, the `code` or the `signature`) is sent as query parameters. The request looks like this:

```bash
GET /callback_url?code={code}&signature={signature}&return_url={return_url}&api_url={api_url}&access_token_url={access_token_url}
```

We didn't want to store that information on our logs so we thought: _"Ok, we are using Rails so let's add some filtering to `config/initializers/filter_parameter_logging.rb`"_, and we added the following to the file:

```ruby
Rails.application.config.filter_parameters += [
  :signature,
  :return_url,
  :api_url,
  :access_token_url,
  :code]
```

It worked! Now our local development logs were looking like this:

```bash
Started GET "/callback_url?access_token_url=[FILTERED]&api_url=[FILTERED]&code=[FILTERED]&return_url=[FILTERED]&signature=[FILTERED]"`
```

```bash
Parameters: {"access_token_url"=>"[FILTERED]", "api_url"=>"[FILTERED]", "code"=>"[FILTERED]", "return_url"=>"[FILTERED]", "signature"=>"[FILTERED]"}`
```

But the problem came when we pushed this changes to Heroku and installed the Papertrail addon. We discovered that yes, Rails logs were correctly filtered but Heroku was still logging the request with the `heroku/router` program:

```bash
heroku/router: at=info method=GET path="/callback_url?access_token_url=<real-info>&api_url=<real-info>&code=<real-info>&return_url=<real-info>&signature=<real-info>" ...
```

### The solution

In order to prevent Heroku outer filtering unwanted parameters you can do the following:

1. On Papertrail go to **Settings > Filter logs > Add Log Filter**
2. Select `Regex` filter type and fill out the filter with the following code: `heroku\/router:.*(signature|return_url|api_url|access_token_url|code)`
3. Activate the filter

{% image_custom image="/assets/img/pages/blog/images/how-to-ignore-unwanted-logs-from-heroku-papertrail-1.png" width="80" lightbox %}

And Boiala! With this configuration, logs from `heroku/router` that contain your secret parameters will be ignored and never saved.
