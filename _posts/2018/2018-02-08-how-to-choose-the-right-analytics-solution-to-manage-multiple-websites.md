---
layout: post
title: How to choose the right analytics solution to manage multiple websites
date: 2018-02-08
header_image: public/analytics.jpeg
header_position: center
category: methods-and-tools
tags: ["analytics", "statistics", "dashboard"]
authors: ["Xavi"]
---
There are many, many, many (did I say "many"?) analytics tools out there and, as it usually is the case in software development, there isn't any _one-size-fits-all_ solution. For that reason, in order to choose one of them to integrate it with our online shops we first had to carry out some research.

## The idea

Our idea was very simple: we wanted to give our merchants the chance to gather and visualize data from their shops. In other words, visitors' related information had to be tracked and then represented using some sort of dashboards.

## Our requirements

First of all, our merchants should not have to create any account to have a look at the data that has been gathered. Instead, we should be able to show some beautiful dashboards to them straightaway.

Additionally, each merchant must only be able to see their own data. That is, when someone visits a certain site, the related information is stored in some sort of database, and we must be able to separate that data from that of other shops.

{% image_custom image="/assets/img/pages/blog/images/blog-analytics-shop-visitor.png" width="50" %}

Finally, we want to have an aggregated view over all ePages shops, which means there has to be some sort of _master_ account that can retrieve all data.

With these requirements in mind, we decided to find out what analytics tools were available in the market, and try three of them. The chosen ones were [Google Analytics](https://analytics.google.com/analytics/web/){:target="_blank"}, [Mixpanel](https://mixpanel.com/){:target="_blank"}, and [Matomo](https://matomo.org/){:target="_blank"} (formerly known as [Piwik](https://matomo.org/blog/2018/01/piwik-is-now-matomo/){:target="_blank"}).

## Google Analytics

There is no doubt that Google Analytics is a consolidated solution with an impressive amount of features. Google provides a number of APIs that would allow us to gather and send data to and from a Google Analytics instance.

One of the most interesting APIs they provide is the [Embed API](https://developers.google.com/analytics/devguides/reporting/embed/){:target="_blank"}, which can be used to draw dashboards using the data that has already been collected. It doesn't provide too many different kinds of charts, but it's a start, and it can later on be extended using [custom Javascript snippets](https://ga-dev-tools.appspot.com/embed-api/custom-components/){:target="_blank"}.

{% image_custom image="/assets/img/pages/blog/images/blog-analytics-tablet.jpeg" width="50" %}

So, what is the downside? First of all, merchants would need to create a Google Analytics account, and for that they would also need to have a Google account. This is a manual process which doesn't meet our requirements. And second of all, there is no convenient way to aggregate data over multiple independent shops.

**Pros**
* Feature-rich tool.
* Up-to-date APIs.
* Widely used.

**Cons**
* Merchants' manual effort required.
* No aggregated view.

## Mixpanel

Mixpanel is a particularly interesting tool, because it is highly customizable. With very little effort you can track your own custom events and visualize them. For example, the following snippet would submit a "Page viewed" event on a specific page:

{% highlight javascript %}
mixpanel.track("Page viewed", {
    pageName: "category-cupcakes"
});
{% endhighlight %}

However, this is not that convenient when you want to track a lot of different events because it requires significant developer effort, and you may want developers to spend their time working on what is really important for your business.

Nevertheless, this effort would pay off in the end, because Mixpanel provides us with truly beautiful easy-to-use visualizations which make basic data analysis effortless.

{% image_custom image="/assets/img/pages/blog/images/blog-analytics-coffee.jpg" width="50" %}

**Pros**
* Beautiful visualizations.
* Easy to use.
* Highly customizable.

**Cons**
* Significant developer effort required.

## Matomo

Matomo comes with a feature that our two other _candidates_ lack:  out-of-the-box multi-website support. In particular, we can create an account which can _see_ and manage multiple websites, one for each of our merchants, while separating data in a way that one merchant would never be able to access another merchant's data.

{% image_custom image="/assets/img/pages/blog/images/blog-analytics-back.jpeg" width="50" %}

For us, that was the selling point, because that exactly meets our requirements.

Unfortunately, Matomo's API is not exactly state-of-the-art, so integrating it with a modern software system might entail certain technical challenges.

**Pros**
* Multi-website concept.
* Open-source.

**Cons**
* Not fully up-to-date API.

## Conclusion

No matter what project you are working on, picking up the solution, which has the biggest name behind, is not necessarily the best choice. It is always a good idea to clearly identify your requirements, and keep them in mind when carrying out research. In our case, Matomo was the right analytics tool, but it might also be the wrong choice in a completely different scenario.