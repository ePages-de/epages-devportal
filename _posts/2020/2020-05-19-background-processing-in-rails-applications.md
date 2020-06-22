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

Implementing background tasks comes in handy when having to deal with long-running processes or tasks that need to be recoverable in case of failure.
A couple of use cases from our past projects would be performing batch executions, large file imports, mail sending, interaction with external APIs and services, and much more.
This blog post is about background processing in Ruby on Rails and why we decided to use [Sidekiq](https://sidekiq.org/){:target="_blank"} for that.

### Which tools to use?

Rails provides several ways to process background jobs.
The choice of your tools should essentially depend on your requirements.
There are two main questions that my team had in this regard:

#### How to define the jobs?

Rails has a built-in framework to work with background jobs, which is [Active Job](https://guides.rubyonrails.org/active_job_basics.html){:target="_blank"}.
Cool, so we could just use that framework.
It basically provides a standard interface that allows you to add a job to a queue and call a perform method.
Since Rails queuing system stores the jobs in RAM, we need to use a 3rd-party queuing backend that takes care of making this data persistent in case the app crashes.
Now, this leads us to the next question.

#### Which queuing system to use?

Active Job provides built-in adapters for many queuing backends. 
[Sidekiq](https://sidekiq.org/){:target="_blank"} is one of them and it perfectly matched our projects requirements:

- straightforward setup
- stable and reliable
- efficient in terms of [performance](https://github.com/mperham/sidekiq#performance){:target="_blank"}
- powerful features (special retry mechanism, monitoring, batching, and [many more](https://github.com/mperham/sidekiq/wiki){:target="_blank"})

Sidekiq provides the module [Sidekiq::Worker](https://www.rubydoc.info/github/mperham/sidekiq/Sidekiq/Worker){:target="_blank"} that allows you to create jobs for processing. 
This leads us back to the first question and makes us rethink whether we should use Sidekiq::Worker or Active Job, since they basically have identical functions but different method names, as seen in the table below:

|Function|Active Job|Sidekiq::Worker|
|-|-|-|
| Create a job | `rails g job job name`| `rails g sidekiq:worker job name`
| Create a job to be executed asynchronously | `perform_later(args)` | `perform_async(args)`
| Create a job to be executed in the future | `set(wait: t).perform_later(args)` | `perform_in(t, args)`
|  | `set(wait_until: t).perform_later(args)` | `perform_at(t, args)`
| Handle failed jobs after retry attempts fail | `retry_on` | `sidekiq_retries_exhausted`

Active Job is a nice abstraction for queues.
As mentioned above, it can be configured to work with several queue adapters.
Since it only has to work with the "common denominator" to all these queuing backends, it's no surprise that [it doesn't have an abstraction for every Sidekiq feature](https://github.com/mperham/sidekiq/wiki/Active-Job#commercial-features){:target="_blank"}, e.g., the standard retry feature, bulk queuing, and other functionalities offered by the paid versions [Sidekiq Pro](https://sidekiq.org/products/pro.html){:target="_blank"}, and [Sidekiq Enterprise](https://sidekiq.org/products/enterprise.html){:target="_blank"}.
As per Sidekiq documentation, there might be a [performance advantage](https://github.com/mperham/sidekiq/wiki/Active-Job#performance){:target="_blank"} when using Sidekiq::Worker instead of Active Job.

### The decision

Having those things in mind, we decided to use Sidekiq::Worker to create the jobs and Sidekiq as the queuing backend. 
Amongst many nice features, we found these very useful:

- the [retry mechanism](https://github.com/mperham/sidekiq/wiki/Error-Handling#configuration){:target="_blank"} that allows to add custom logic when an exception is raised inside a worker
- the ability to programmatically [retrieve real-time information](https://github.com/mperham/sidekiq/wiki/API){:target="_blank"} about jobs and queues
- the [web UI to monitor jobs](https://github.com/mperham/sidekiq/wiki/Monitoring){:target="_blank"} which can be enabled by just adding a few lines of code

For a complete list of the queue systems Active Job supports, check out their [API documentation](https://api.rubyonrails.org/v6.0.3/classes/ActiveJob/QueueAdapters.html){:target="_blank"}.
If you're more interested in Sidekiq, have a look at [this complete list of Sidekiq features and instructions on how to use it in your Rails applications](https://github.com/mperham/sidekiq/wiki){:target="_blank"}.
