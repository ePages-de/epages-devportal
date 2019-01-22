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
Instead, I want to focus on how you can pair your old school calculus skills with modern CSS techniques to derive colors from a user defined palette.

## Let the users choose their colors
Theming is great!
Compiling CSS per user sucks.

### CSS custom properties allthethings!
```css
@media (prefers-color-scheme: dark) {
  :root {
    --background-color: darkslategray;
    --foreground-color: mintcream;
  }
}
```
You can also set them from JS.
Ana, Heydon, ...

## Deriving colors from a base palette
The CSS4 color() function is great!
Lightness, contrast, blend.
LESS / SASS / PostCSS.
CSS-in-JS.
Compiling CSS per user still sucks.

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