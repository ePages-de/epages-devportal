---
title: CSS can do that? Color manipulation for the fearless
layout: post
date: '2019-01-25'
header_image: public/challenge-cube.jpg
header_position: center
header_overlay: true
category: coding
tags:
- css
authors:
- Paolo
about_authors:
- ppriotto
---

The CSS-in-JS debate, which is currently dominating my Twitter filter bubble, has reached a point where people can't even agree on [whether CSS is a programming language](https://twitter.com/laras126/status/1067058092083478528).
In this post, I don't want to fuel this discussion - after all, at ePages we've tried out all of "traditional" CSS, CSS modules, and CSS-in-JS for our various projects.

Instead, I want to share how you can pair your old school calculus skills with modern CSS techniques to derive colors from a user defined palette.

## Let the users choose their colors
Being able to customize the look of your online appearance by selecting an adequate coloring has become something end users are expecting nowadays.
In fact most, if not all, major content management and shop systems (including ePages) offer such a functionality. 
In case you don't run an own website, you might have seen it in your Twitter profile settings.

Traditionally, technical solutions to this task involved applying a bunch of inline style attributes to some HTML elements, or compiling (and possibly caching) "white label" CSS files while replacing some variables. However, caching and serving unique content or assets per user introduces a whole layer of complexity.

Now, this complexity has been successfully dealt with for many years, but what if we could remove the need for it?

### CSS custom properties allthethings!
One of the most exciting, yet most overlooked, developments in the web frontend domain has been the adaption of CSS custom properties, often referred to as "CSS variables" by all major browsers.

Let me give a brief example of what custom properties can do in a very elegant way:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --background-color: darkslategray;
    --foreground-color: mintcream;
  }
}
```
The key here is that you can offer two distinct color schemes from a single style sheet by using custom properties  for the relevant colors everywhere (the automatic selection using the media query is a relatively new addition to the spec which I just wanted to show off).

The same result can be achieved with preprocessor (Less/Sass/Stylus) variables, or PostCSS transforms, but requires additional steps, like compiling two CSS files and switching them at runtime.

But there's another very nice feature of custom properties that preprocessors simply cannot offer: you can set and update their values from JavaScript, enabling the same interdependence between JS and CSS many people love about CSS-in-JS, but keeping the visual declarations in the stylesheet. But enough of this topic 🙃.

If you haven't figured out already, here's where I'm heading: we can declare our user defined colors with CSS custom properties, and set the actual values at runtime, e.g. in a `<style>` tag, or as inline styles:
```html
<html style="--userColor-primary:blue"><a href="https://developer.epages.com/blog">Read my blog</a></html>
```
Then, our stylesheets can  apply those colors in any place they like:
```css
a { color: var(--userColor-primary) }
```

## Deriving colors from a base palette
The above approach has one drawback: if you're as seriously into design as my designer colleagues (or just spoiled by your beloved preprocessor), you want to derive colors from a base palette, just like a real painter.
On top of that, since we're talking about user defined colors, you'll want to make sure that if one of those is used for a background, text written on it remains readable in all cases.

The [CSS4 color() function](https://www.w3.org/TR/css-color-4/#modifying-colors) aims to solve exactly that! It offers a nice syntax for modifying the hue, saturation, and lightness of any color, deriving contrast colors, or blending two colors, just to name a few.
It's basically like the `lighten()`, `darken()` etc. functions you might know from preprocessors, but natively in the browser, and, most importantly, applicable to colors defined in custom properties.

Let me give you an example:
```css
a:visited { color: color(var(--userColor-primary) saturation(- 30)) }
body { background: color(var(--userColor-primary) contrast(60%)) }
```

Unfortunately, no browser has implemented this proposal yet 😢. So are we left with adding some custom color modification functions to our CSS-in-JS solution?  (Ok, I'm stopping it 🤡)

## Custom properties + calc() = 🚀
MS Edge blew my mind!
The HSL color model.
```css
:root {
  --foreground-desaturated: hsl(
    var(--foreground-h),
    calc(var(--foreground-s) / 2%),
    calc(var(--foreground-l) * 1%)
  );
}
```
Convert to percentage in the last step.

### Calculating color contrast
There must be a way!

And here's the result:
<iframe height="350px" style="width: 100%;" scrolling="no" title="CSS4 color contrast adjuster with just custom properties and calc()" src="//codepen.io/depoulo/embed/WLGeQz/?height=265&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/depoulo/pen/WLGeQz/'>CSS4 color contrast adjuster with just custom properties and calc()</a> by Paolo Priotto
  (<a href='https://codepen.io/depoulo'>@depoulo</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### Blending two colors
And here's the result:
<iframe style="width: 100%;height:450px" scrolling="no" title="CSS4 color blend adjuster with just custom properties and calc()" src="//codepen.io/depoulo/embed/oJPyad/?height=265&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/depoulo/pen/oJPyad/'>CSS4 color blend adjuster with just custom properties and calc()</a> by Paolo Priotto
  (<a href='https://codepen.io/depoulo'>@depoulo</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Could you pass me the syntactic sugar, please?
Preprocessors to the rescue. I'll just leave this bunch of LESS mixins here:
<iframe style="width: 100%;height:450px" scrolling="no" title="CSS4 color blend adjuster with just custom properties and calc()" src="//codepen.io/depoulo/embed/vbYbVp/?height=265&theme-id=light&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/depoulo/pen/vbYbVp/'>Derive colors from user input at runtime with pre-compiled LESS mixins.</a> by Paolo Priotto
  (<a href='https://codepen.io/depoulo'>@depoulo</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## What have we learned today?
You can do pretty complex programming using "just" CSS.
Look beyond your own nose.