---
layout: post
title: Why your first meaningful paint matters
date: 2018-03-08
header_image: public/meaningful-paint-matters.jpeg
header_position: center
category: methods-and-tools
tags: ["conference", "design", "performance"]
authors: ["Katja"]
---

Have you ever heard of a meaningful paint?
No?
Me neither ¯\\\_(ツ)\_/¯.
It's neither an image with worthwhile content you have created for the first time with a graphic tool.
Nor is it something that you can see on big house walls like the street art paints in Brussels so that everybody needs to look at it and think about the meaningful content.
So, is it your first sketch, or an animated essential SVG?
Naaa, not really!

Let me enlighten you.
A first meaningful paint is related to the user-perceived loading experience and the whole page performance.
It is the moment, the user notices that every important content (the so-called primary content) on the screen is loaded.
So the definition of the page's primary content depends on what's to be shown on the screen first.

{% image_custom image="/assets/img/pages/blog/images/blog-meaningful-paint.jpg" width="50" caption="A_meaningful_paint" lightbox%}

Let me give you an example:
A customer wants to buy a new treat for his dog.
They visit the product page of a fitting online shop.
In this case, the primary content elements are the product image, the headline, the price, as well as the buy button.

## Performance is king

As I have learned from my visit at the [Smashing Conference](https://smashingconf.com/london-2018/){:target="_blank"} in London, performance should not be a side project.
It should be part of your daily work and reflected on your roadmap.
Why?
Just imagine how potential customers are sitting in the tube - with bad internet connection - and your homepage is not visible because your web font is not loading.
Bad user experience, isn’t it?
That's why you should regularly measure the performance of your website under real conditions with helpful tools such as [webpagetest](https://www.webpagetest.org/){:target="_blank"}.
Doing this, you should ask yourself: Who is the average user and which device are they using?
Is it a shiny iPhone generation or rather a 7-year-old Android phone with terrible CPU and hardly any memory?

And heyho - I’m the one with the 7-year-old Android phone, trying to read blog posts in the tube - that's no fun guys.
I’m a designer for frontend pages and backend software.
I like to create colorful illustrations, and therefore always browse on websites for content that has good chances to slow down the website loading.
So I have first-hand experiences with bad performances.
Therefore, I listened carefully to every single of the 18 talks at the Smashing Conference to get the most output of it, and create better performance experiences for our users.
But as a colleague of mine always says: Long story short.
That's why I have summarized the most interesting techniques and helpful tools to measure and improve performance.

## [Image optimization techniques](https://vimeo.com/254736788){:target="_blank"}

Depending on the website your are working with, some of these techniques can be helpful to optimize your images:

* Use [MozJPEG](https://github.com/mozilla/mozjpeg){:target="_blank"} or [OPTIPNG](http://optipng.sourceforge.net/){:target="_blank"} to improve filtering and remove redundancy. Tip: Both tools are wrapped together in img-loader.
* Blur up partials or whole images to reduce image size.
* Also helpful: Greyscale images with filter, mix-blend-mode or duo tone coloring.
* Use the contrast swap effect by reducing the contrast of an image and apply them again with CSS.
* Send different image sizes based on the client's device (<picture> + srcset or srcset + sizes, media queries + different image sizes).
* Keep in mind: Videos (without audio) plus blend mode can be smaller than gifs.

If you want to have a closer look at image examples with filters and CSS blend modes, have a look at this [CSSgram page](https://una.im/CSSgram){:target="_blank"}.

## [Performance monitoring with DevTools](https://vimeo.com/254733177){:target="_blank"}

_„DevTools can help you quantify the performance webpage“ - [Umar Hansa](https://twitter.com/umaar?lang=en){:target="_blank"}_

Until now, I used DevTools mainly to inspect elements and to manipulate CSS styles.
Sometimes, I also checked errors in the _Console_ tab (together with my JavaScript developer colleagues) and partially used the _Network_ panel to check the image size and what’s actually loaded.
But there is more for Chrome DevTools — have a look:

* Compare screenshots side by side. Especially the first meaningful paint can be compared this way by only ticking a checkbox at the _Network_ panel.
* Awesome tool in the _Source_ panel: Local overrides of HTML, CSS, JS persist after reloading the page.
* Use  the _Performance_ panel to quantify the damage of third-party scripts.
* Work with the _Command Menu_ to quickly enable or disable functionalities in the DevTool (for Mac: Cmd+Shift+P, for Windows and Linux: Ctrl+Shift+P).
* Use product badges as a nice indicator for third party products in the _Performance_ and _Network_ panel. Just run the ``Show third party badge`` command in the _Command Menu_.
* Click on the Format icon {} in the _Source_ panel workspace for pretty printing of minified CSS.

## [Web font improvements](https://vimeo.com/254727749){:target="_blank"}

_„Web fonts are progressive enhancement“ - [Zach Leatherman](https://twitter.com/zachleat){:target="_blank"}_

You are wondering why your web font is not loading or your italic style is not visible?
The answer is easy: The way how web browsers load web fonts differs.
Some of them use FOIT (Flash of invisible text), and others use FOUT (Flash of unstyled text).
This leads to different loading behaviors.
But don't worry, there are also some techniques to improve these behaviors:

* Use SVGs instead of icon fonts to reduce loading time and to avoid FOIT.
* Improve your performance by using ``rel="preload"`` in the link tag to fetch your font in a faster way.
* Use a CSS font loading API to get a better overview of already loaded fonts.
* Combine multiple font files into one when using _variable fonts_.
* Use the font-display property. It doesn’t change the loading time, but changes how the pages are rendered while the font is loading.
* Fake a web font by using font-synthesis. Instead of using different web fonts for bold or italic, you can use a roman font type with font-weight bold or font-style italic.

If you want to dive deeper than my key points, check the related links or have a look at the [conference videos](https://smashingconf.com/london-2018/){:target="_blank"}.

## Don't panic

For me the conference was an information explosion and I often asked myself: How shall I make this happen?
You don't need to do this alone!
It's definitely a team challenge, and there are many potential ways to tackle this topic.
But nevertheless, I can't wait to check which technique is the best for us.
The aim is clear: Optimize the performance of our software, and create an even better user experience for our users.
And for sure, I will start with the definition of our first meaningful paint 😉.
