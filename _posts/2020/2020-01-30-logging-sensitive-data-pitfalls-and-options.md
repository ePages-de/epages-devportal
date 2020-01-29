---
layout: post
title: "Logging sensitive data - Pitfalls and options"
date: 2020-01-30
header_image: public/logging.jpg
header_overlay: true
header_position: center
category: tech-stories
tags: ["logging", "gdpr", "sensitive data", "cloud", "development"]
authors: ["Waldemar"]
about_authors: ["wschneider"]
---

With this post, I'd like to create awareness for all the logging possibilities we have in software architecture nowadays.
In May 2018 Twitter [announced](https://blog.twitter.com/official/en_us/topics/company/2018/keeping-your-account-secure.html){:target="_blank"} that they have discovered a bug, with which un-intentionally user passwords have been logged within their logging system.
Roughly one year later, Facebook asked all users to change their password.
They [found out](https://about.fb.com/news/2019/03/keeping-passwords-secure/){:target="_blank"} that some passwords were stored in a readable format on an internal data storage.

Both incidents did not expose any data to attackers.
The data was simply stored within a logging system.
Even though there was no security breach, this can be a threat to customer data.
People who have access to the logging system, in theory, would also have access to sensitive customer data. 

## What is sensitive data?

Besides passwords which were exposed in the previous mentioned examples, what else could be sensitive data?
Sensitive data can be anything with which a human being can be identified (also called PII, Personally Identifiable Information).
For example: email address, first name, last name, birthdate, SSN (social security number), IP address, ethnicity, or gender.

## Why is it a bad idea to log sensitive data?

Coming to an uncomfortable topic: [GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation){:target="_blank"}.
This post is not meant to provide you with any kind of legal advice on that.
I'll only briefly summarize the most important steps and consequences that are relevant for this context.

The EU introduced GDPR as a law in April 2016.
It became legally binding in May 2018.
Many people might remember that time with lots of (spam) emails regarding GDPR from shop and newsletter subscriptions, or doctors that were to afraid to give any information via phone.

GDPR offers people many possibilities in terms of what companies are doing with their data.
Obviously, this comes with lots of duties for the companies.
Also for companies that are located outside of the European Union. 

Now, people have the right to do the following:

- request information about persisted data about them
- get information about the purpose of the persisted data 
- request deletion of the personal data if it is not needed anymore

Looking at the last point, this becomes **very difficult** if the data is spread accross many logging systems (leaving out persistence systems as databases for applications).

## Pitfalls

From a developer's perspective, there are two pitfalls that might come up in this context:

1. Developers tend to use the objects within a logger call such as: `logger.info("customer registered: $customer", customer)`. This is quiet convenient, but also a bit inconsiderate in terms of logging. This method call usually results in a `toString` call depending on the programming language. 
2. Developers tend to use sensitive data in an URL (`/user/<email>`).

## Options

Now that you know about the pitfalls, it's time to talk about the options you have to tackle the logging issue.
Here's what you can do:

- Create awareness of PII in code reviews. Tell your colleagues, that instead of writing code like this:
  
  `logger.info("Customer $email purchased successfully via $paymentName", customerEmail, paymentType)` 
  
  they could better write:
  
  `logger.info("Customer $customerId purchased successfully via $paymentId", customerId, paymentId)` 

- Sanitization is very easy to adapt, once you've turned on structured logging in your logging framework. You can achieve this sanitization (e.g. for names or streets) via log filtering for specific keywords (such as surname, street, birthdate, and so on).

- Filter for parameters in URLs like my colleague explained in a previous [blog post](/blog/coding/how-to-filter-unwanted-logs-from-heroku-papertrail/).

- If you have logging services, you can use the built-in scrubbing functionalities (e.g. [Splunk](https://docs.splunk.com/Documentation/Splunk/8.0.1/SearchReference/Scrub){:target="_blank"} or [Sentry](https://docs.sentry.io/data-management/sensitive-data/#server-side-scrubbing){:target="_blank"}).

- If you use Elastic Search (e.g. with Kibana), you can use [this feature](https://www.elastic.co/blog/gdpr-personal-data-pseudonymization-part-1){:target="_blank"} which creates anonymized PII. 

{% image_custom image="/assets/img/pages/blog/images/blog-log-data-elastic-search-pseudonimization.png" width="50" lightbox caption="Source:_Protecting_GDPR_Personal_Data_with_Pseudonymization_by_Wintergerst,_Paquette,_McDiarmid_https://www.elastic.co/de/blog/gdpr-personal-data-pseudonymization-part-1" %}

## Conclusion

I personally hope that companies will learn from the mistakes Facebook and Twitter made.
But it's not only about the companies.
You can already start putting some options into practice and thus following the right path to keep sensitive data out of logging data.   

If you are interested in more tips and tricks, you should definitely check out the OWASP [logging cheat sheet](https://owasp.org/www-project-cheat-sheets/cheatsheets/Logging_Cheat_Sheet.html){:target="_blank"}.