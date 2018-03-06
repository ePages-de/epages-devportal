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

Do you have heard of a meaningful paint?
Maybe?
No?
Me neither.
Is it an image with worthwhile content you have created your first time with a graphic tool?
Something that you can see on big house walls like the street art paints in Brussels so that everybody needs to look at it and think about the meaningful content?
Or maybe your first sketch or an animated essential SVG?
Naaa, not really!

A first meaningful paint is related to a user-perceived loading experience.
It is the moment when the user feels that every important content on the screen is loaded.
The definition of the page's primary content depends on what shall be shown on the screen.

An example: A customer wants to check a new treat for his cute dog.
He is visiting the product page.
In this case, a primary content element is the product image which is required to be visible.
The headline and the product description as well as the buy button are also such elements.

## So, why does this matters?

As I have learned from my visit of the [Smashing Conference](https://smashingconf.com/london-2018/) in London, performance should not be a side project.
It should be part of your daily work and should be reflected on your roadmap.
Imagine how potential customers are sitting in the tube - with bad internet connection - and your homepage is not visible because your web font is not loading.
Bad user experience, isn’t it?
That's why you should regularly measure the performance of your website with helpful tools like [webpagetest](https://www.webpagetest.org/) and under real conditions.
Doing this, you should ask yourself: Who is the average user and which device is he using?
A shiny iPhone generation or a 7-year old Android phone with terrible CPU and hardly any memory?

And heyho - I’m the one with the 7-year old Android phone, trying to read blog posts in the tube - thats no fun guys.
I’m a designer for frontend pages and backend software.
I like to create colorful illustrations and therefore always browse on websites for content that might slow down the website loading.
So I have first-hand experiences with bad performances.
Therefore, I listened carefully to every single of the 18 talks to get the most output of it and create better performance experiences for our users.

For me it was an information explosion and I was often asking me: How shall I make this happen?
Alone?
Never!
With a team?
Yes!
Together with the PO and CTO on board?
Of course, yes!
As a college of mine always says: long story short.
I have summarized some techniques and helpful tools to measure and to improve your performance.

## Image optimization
Depending if you have to work on a client’ website or dynamic websites, some of the techniques could be helpful.

* Use MozJPEG as library in graphics programs and image processing tools or OPTIPNG to improve filtering and removes redundancy (or both tools, wrapped together in img-loader)
* Blur up partials or whole image to reduce image size
* Also helpful: greyscale images with filter, mix-blend-mode or duo tone coloring
* Or use the contrast swap effect by reducing the contrast of an image and apply them with again with CSS
* Send different image sizes based on the client device (<picture> + srcset or srcset + sizes, media queries + different image sizes)
* Keep in mind video (without audio) plus blend mode could be smaller than gifs

Image example with filters and css blend modes -> visit una.im/CSSgram (Image of the page)

## Performance monitoring with DevTools
I use DevTools mainly to inspect elements and to manipulate css styles.
Sometimes I also check errors in the Console tab together with our JavaScript developers and partially the Network Panel to check the image size and what’s loaded.
But there is more hidden in Chrome DevTools — have a look:

* Compare screenshots side by side especially the first meaningful paint by only tick a checkmark at the Network panel
* Awesome tool in the Source panel: Local overrides of HTML, CSS, JS persist after reloading the page
* To quantify damage of third-party-scripts go to the Performance Panel
* Work with the Command Menu (Link) to enable or disable quickly functionalities in DevTool Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows, Linux)
* A nice indicator for third party products in performance and network panel are the product badges (Run the Show third party badges command in the Command Menu)
* For pretty printing of minified css click on the Format icon {} in the Source panel workspace

„DevTools can help you quantify the performance webpage“ Umar Hansa

## Web font improvements
Your are wondering why your web font is not loading or your italic style is not visible?
The way how web browsers are loading a web font differs, some of them using FOIT, some using FOUC.

* FOIT: Flash of invisible text
* FOUT: Flash of unstyled text
* FOUC: Flash of unstyled content
* Presentation of 5 font rendering strategies
* Only 2 formats are necessary woff/woff2
* Two techniques to improve performances: preload / font loading api
* Variable fonts combine multiple font files into one
* font-display: doesn’t change the loading time but changes how they render while the font is loading
* Use svg instead of icons font to reduce loading time and to avoid FOIT

„Web fonts are progressive enhancement“ Zach Leatherman


And — How fast is your website? ;) Try it out and find your first meaningful paint.
