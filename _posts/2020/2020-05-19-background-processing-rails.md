---
layout: post
title: Background processing in Rails applications
date: 2020-05-19
header_image: public/background-tasks-rails.jpg
header_position: bottom
header_overlay: true
category: tech-stories
tags: ["background tasks", "activejob", "sidekiq", "rails", "ruby"]
authors: ["Kathia"]
about_authors: ["ksalazar"]
---

Implementing background tasks comes in handy when you have to deal with long running processes or tasks that need to be recoverable in case of failure. A couple of use cases from our past projects would be: performing batch executions, large file imports, mail sending, interaction with external APIs and services, and much more. This blog post is about background processing in Ruby on Rails and some factors that led us to decide to use Sidekiq.

### Which tools to use?

Rails provides several ways to process background jobs. What tools you choose should essentially depend on your requirements. There two main questions that my team had in this regard:

#### How to define the jobs?

Rails has a built-in framework to work with background jobs, which is [ActiveJob](https://guides.rubyonrails.org/active_job_basics.html){:target="_blank"}. Cool, so we could just use ActiveJob (maybe). It basically provides a standard interface that allows you to add a job to a queue and call a perform method. Since Rails queuing system stores the jobs in RAM, we need to use a 3rd-party queuing backend that takes care of making this data persistent in case the app crashes. Now this leads us to the next question:

#### Which queue system to use?

Active Job provides built-in adapters for many queuing backends. [Sidekiq](https://sidekiq.org/){:target="_blank"} is one of them and it perfectly matched our projects requirements:

- straightforward setup
- stable and reliable
- efficient in terms of [performance](https://github.com/mperham/sidekiq#performance){:target="_blank"}.
- powerful features (special retry mechanism, monitoring, batching, and [many others](https://github.com/mperham/sidekiq/wiki){:target="_blank"})

Sidekiq provides a module [Sidekiq::Worker](https://www.rubydoc.info/github/mperham/sidekiq/Sidekiq/Worker){:target="_blank"} that allows to create jobs for processing later. This lead us back to the first question and rethink whether we should use Sidekiq::Worker or ActiveJob, since they basically have identical functions but have different method names, as seen in the table below:

||ActiveJob|Sidekiq::Worker|
|-|-|-|
| Create a job | rails g job jobname| rails g sidekiq:worker jobname
| Create a job to be executed asynchronously | perform_later(args) | perform_async(args)
| Create a job to be executed in the future | set(wait: t).perform_later(args) | perform_in(t, args)
|  | set(wait_until: t).perform_later(args) | perform_at(t, args)
| Handle failed jobs after retry attempts fail | retry_on | sidekiq_retries_exhausted

ActiveJob is a nice abstraction for queues. As mentioned before, it can be configured to work with several queue adapters. Since it has to work with just the "common denominator" to all these queuing backends, it's not a surprise that [it doesn't have an abstraction for every Sidekiq feature](https://github.com/mperham/sidekiq/wiki/Active-Job#commercial-features){:target="_blank"}, e.g., the standard retry feature, bulk queuing, and other functionalities from the paid versions [Sidekiq Pro](https://sidekiq.org/products/pro.html){:target="_blank"} and [Sidekiq Enterprise](https://sidekiq.org/products/enterprise.html){:target="_blank"}. As per Sidekiq Documentation, there might be a [performance advantage](https://github.com/mperham/sidekiq/wiki/Active-Job#performance){:target="_blank"} when using `Sidekiq::Worker` instead of `ActiveJob`.

### The decision

Having those things in mind, we decided to use `Sidekiq::Worker` to create the jobs and `Sidekiq` as the queuing backend. Amongst many nice features, we found it very useful the following:

- the [retry mechanism](https://github.com/mperham/sidekiq/wiki/Error-Handling#configuration){:target="_blank"} that allows to add custom logic when an exception is raised inside a worker
- the ability to programmatically [retrieve real-time information](https://github.com/mperham/sidekiq/wiki/API){:target="_blank"} about jobs and queues
- the [web UI to monitor jobs](https://github.com/mperham/sidekiq/wiki/Monitoring){:target="_blank"} which can be enabled by just adding few lines of code

For a complete list of the queue systems that ActiveJob supports, check out their [API Documentation](https://api.rubyonrails.org/v6.0.3/classes/ActiveJob/QueueAdapters.html){:target="_blank"} or [this link](https://github.com/mperham/sidekiq/wiki){:target="_blank"} for a complete list of Sidekiq features and instructions about how to use it in your Rails applications.