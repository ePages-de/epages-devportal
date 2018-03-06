---
layout: post
title: Why your first meaningful paint matters
date: 2018-03-07
header_image: public/
header_position: center
category: events
tags: ["conference", "design", "performance"]
authors: ["Katja"]
---

Have you ever heard of a meaningful paint?
Maybe?
No?
Me neither.
Is it an image with worthwhile content you have created your first time with a graphic tool?
Something that you can see on big house walls like the street art paints in Brussels so that everybody needs to look at it and think about the meaningful content?
Or maybe your first sketch, or an animated essential SVG?
Naaa, not really!

A first meaningful paint is related to the user-perceived loading experience and the whole page performance.
It is the moment when the user feels that every important content (the so-called primary content) on the screen is loaded.
So the definition of the page's primary content depends on what shall be shown on the screen first.
Let me give you an example:
A customer wants to buy a new treat for his dog.
He is visiting the product page of a fitting online shop.
In this case, the primary content elements are the product image, the headline, the product description, as well as the buy button.

## So, why does this matter?

As I have learned from my visit of the [Smashing Conference](https://smashingconf.com/london-2018/) in London, performance should not be a side project.
It should be part of your daily work and should be reflected on your roadmap.
Why?
Just imagine how potential customers are sitting in the tube - with bad internet connection - and your homepage is not visible because your web font is not loading.
Bad user experience, isn’t it?
That's why you should regularly measure the performance of your website with helpful tools like [webpagetest](https://www.webpagetest.org/) and under real conditions.
Doing this, you should ask yourself: Who is the average user and which device is he using?
A shiny iPhone generation or a 7-year old Android phone with terrible CPU and hardly any memory?

And heyho - I’m the one with the 7-year old Android phone, trying to read blog posts in the tube - thats no fun guys.
I’m a designer for frontend pages and backend software.
I like to create colorful illustrations and therefore always browse on websites for content that has good chances to slow down the website loading.
So I have first-hand experiences with bad performances.
Therefore, I listened carefully to every single of the 18 talks of the conference to get the most output of it and create better performance experiences for our users.
But as a college of mine always says: Long story short.
That's why I have summarized the most interesting techniques and helpful tools to measure and improve performance.

## Image optimization techniques

Depending on the website your are working with, some of these techniques can be helpful to optimize your images:

* Use MozJPEG (as a library in graphics programs), and image processing tools, or OPTIPNG to improve filtering and remove redundancy. Tip: Both tools are wrapped together in img-loader.
* Blur up partials or whole images to reduce image size.
* Also helpful: Greyscale images with filter, mix-blend-mode or duo tone coloring.
* Use the contrast swap effect by reducing the contrast of an image and apply them again with CSS.
* Send different image sizes based on the client's device (<picture> + srcset or srcset + sizes, media queries + different image sizes).
* Keep in mind: Videos (without audio) plus blend mode can be smaller than gifs.

If you want to have a closer look at image examples with filters and css blend modes have a look at this [CSSgram page](una.im/CSSgram).

## Performance monitoring with DevTools

_„DevTools can help you quantify the performance webpage“ - Umar Hansa_

Until now, I used DevTools mainly to inspect elements and to manipulate css styles.
Sometimes, I also checked errors in the Console tab (together with my JavaScript developer colleagues) and partially used the Network Panel to check the image size and what’s actually loaded.
But there is more for Chrome DevTools — have a look:

* Compare screenshots side by side. Especially the first meaningful paint can be compared this way by only ticking a checkmark at the Network panel.
* Awesome tool in the Source panel: Local overrides of HTML, CSS, JS persist after reloading the page.
* Use  the Performance Panel to quantify the damage of third-party scripts.
* Work with the Command Menu to quickly enable or disable functionalities in the DevTool (for Mac:Cmd+Shift+P, for Windows and Linux: Ctrl+Shift+P).
* Use product badges as a nice indicator for third party products in performance and network panel. Just run the "Show third party badges" command in the Command Menu.
* Click on the Format icon {} in the Source panel workspace for pretty printing of minified CSS.

## Web font improvements

_„Web fonts are progressive enhancement“ - Zach Leatherman_

You are wondering why your web font is not loading or your italic style is not visible?
The answer is easy: The way how web browsers load web fonts differs.
Some of them use FOIT (Flash of invisible text), some use FOUC (Flash of unstyled content), and others use FOUT (Flash of unstyled text).
This leads to different loading behaviors.
But don't worry, there are also some techniques to improve these behaviors.

* Use SVG instead of fonts with icons to reduce loading time and to avoid FOIT
* Improve your performance by preloading or a font loading api
* Combine multiple font files into one when using variable fonts
* Use the font-display property. It doesn’t change the loading time but changes how the pages are rendered while the font is loading.

If you want to dive deeper than my key points, check the related links or have a look at the [conference videos](https://smashingconf.com/london-2018/).

## Don't panic

For me the conference was an information explosion and I often asked myself: How shall I make this happen?
You don't need to do this on your own!
It's definitely a team challenge and there are many potential ways to tackle this topic.

I can't wait to check which technique is best for us.
But the aim is clear: Optimize the performance of our software and create an even better user experience for our users.
And of course, I will start with the definition of our first meaningful paint 😉.
