---
layout: post
title: "Logging sensitive data"
date: 2020-01-28
header_image: public/logging.jpg
header_overlay: true
header_position: center
category: tech-stories
tags: ["logging", "gdpr", "sensitive data", "cloud", "development"]
authors: ["Waldemar"]
about_authors: ["wschneider"]
---

In this article I want to create awareness of all the logging possibilities we have in a software architecture nowadays.
In May 2018 Twitter [announced](https://blog.twitter.com/official/en_us/topics/company/2018/keeping-your-account-secure.html){:target="_blank"} they have discovered a bug, with which un-intentionally user passwords have been logged onto their logging system.
Roughly one year later Facebook asked all users to change their password. They [announced](https://www.wired.com/story/facebook-passwords-plaintext-change-yours/){:target="_blank"} that they found out that all passwords was being stored in a readable format on an internal data storage.

Both incidents did not expose any data to attackers, they were simply stored on a logging system.
Even though there was no security breach, this can be a threat to the customer data.
People who have access to the log system, would have in theory also access to the sensitive customer data. 

## What is sensitive data?

Besides passwords which were exposed in the previous mentioned examples, what else could be sensitive data?
Sensitive data can be anything, with which a human being can be identified (also called PII, Personally Identifiable Information).
For example this can be: email address, first name, last name, birthdate, SSN (social security number), IP address, ethnicity, or gender.

## Why is it a bad idea to log sensitive data?

Coming to an uncomfortable topic: [GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation){:target="_blank"}.
The EU introduced it as a law in April 2016.
It became legally binding in May 2018.
Many people remember the time before with lots of (spamming) emails regarding GDPR from shop and newsletter subscriptions or when doctors were to afraid to give any information via phone.

GDPR offers people many possiblities what companies are doing with their data.
Obviously, this comes with lots of duties for the companies.
Also for companies who are working outside of the European Union area. 

Now the customer has the possibility to do the following:

- request persisted data about him
- purpose of the persisted data 
- delete request of the personal data if not needed anymore

Looking at the last point, this becomes **very difficult** if the data is spread accross many logging systems (leaving out persistence systems as databases for applications).
Another topic is "data leaks", like Twitter & Facebook have suffered, have to be reported to the relevant supervisory authority within 72 hours. 

## Pitfalls

1. Developer tend to use the objects within a logger call such as: `logger.info("customer registered: $customer", customer)`. This is quiet convinient, but also a bit inconsiderate in terms of logging. This method call usually  results in a `toString` call depending on the programming language. 
2. Logging services kibana / logstash (https://www.elastic.co/gdpr)

## Options

- Create awareness of PII in a code review.
  Instead of writing code like:
  
  `logger.info("Customer $email purchased successfully via $paymentName", customerEmail, paymentType)` 
  
  you should write:
  
  `logger.info("Customer $customerId purchased successfully via $paymentId", customerId, paymentId)` 

- Sanitization is very easy to adapt, when you have turned on structured logging in your logging framework. You achieve the sanitization (e.g. for names or streets) via log filtering for specific keywords (such as surname, street or birthdate and so on) 

{% image_custom image="/assets/img/pages/blog/images/blog-log-data-redacted.jpg" width="20" lightbox caption="Source:_https://en.wikipedia.org/wiki/Sanitization_(classified_information)" %}

- If you have logging services, you can use the build in scrubbing functionalites (e.g. [Splunk](https://docs.splunk.com/Documentation/Splunk/8.0.1/SearchReference/Scrub) or [Sentry](https://docs.sentry.io/data-management/sensitive-data/#server-side-scrubbing)).
- If you use Elastic Search (e.g. with Kibana), you can use this [feature](https://www.elastic.co/blog/gdpr-personal-data-pseudonymization-part-1) which anonymizes PII. 

{% image_custom image="/assets/img/pages/blog/images/blog-log-data-elastic-search-pseudonimization.png" width="50" lightbox caption="Source:_https://www.elastic.co/de/blog/gdpr-personal-data-pseudonymization-part-1" %}




