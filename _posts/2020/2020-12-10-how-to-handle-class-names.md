---
layout: post
title: How to handle class names
date: 2020-12-01
header_image: private/class-names.jpg
header_position: center
header_overlay: true
category: coding
tags: ["coding", "challenge", "devops", "css"]
authors: ["Anne"]
about_authors: ["azimmermann"]
---

A clean and arranged CSS structure is hard to maintain in growing projects. Therefore it is important to think right from the beginning how to structure your classes to not lose control. But if you start to search for methods and techniques to organize your CSS, you will soon realize that there are many ways to reach your goal!

## The universe of the most popular CSS methodologies

* [Object-Oriented CSS (OOCSS)](https://de.slideshare.net/stubbornella/object-oriented-css){:target="_blank"} _by Nicole Sullivan, introduced 2009_ 
* [Block, Element, Modifier (BEM)](https://en.bem.info/){:target="_blank"} _by the developer team at Yandex 2005, open source since 2010_
* [Atomic CSS](https://acss.io/){:target="_blank"} _by Thierry Koblenz, introduced 2013_
* [Multilayer CSS (MCSS)](https://operatino.github.io/MCSS/en/){:target="_blank"} _by Robert Haritonov, introduced 2014_
* [SUIT CSS](http://suitcss.github.io/){:target="_blank"} _by Nicolas Gallagher, introduced 2014_
* [Attribute Modules for CSS (AMCSS)](https://amcss.github.io/){:target="_blank"} _by Glen Maddern & Ben Schwarz, introduced 2014_
* [Scalable and Modular Architecture for CSS (SMACSS)](http://smacss.com/){:target="_blank"} _by Jonathan Snook, introduced 2015_
* [Flat hierarchy of selectors (FUN / Enduring CSS)](https://benfrain.com/enduring-css-writing-style-sheets-rapidly-changing-long-lived-projects/#l7){:target="_blank"} _by Ben Frain, introduced 2015_
* [Systematic CSS](https://www.yumpu.com/en/document/read/47573458/systematic-css){:target="_blank"} _by Kieran Potts, introduced 2015_
* [Reasonable System for CSS Stylesheet Structure (RSCSS)](https://rscss.io/){:target="_blank"}** _by Denis Vieira, introduced 2017_
* [CUBE CSS](https://piccalil.li/blog/cube-css/){:target="_blank"} _by Andy Bell, introduced 2020_

**Techniques that are usually rather mixed with certain CSS methods:**
* [Utility classes](https://catalin.red/css-utility-classes-naming-conventions/){:target="_blank"}
* [CSS Modules](https://github.com/css-modules/css-modules){:target="_blank"}


## BEM vs. SUIT CSS

Since I have been dealing with these methodologies for quite a while now, I would like to jump right to the point where I introduce you to the two most interesting ones from my point of view. You've probably already heard of **BEM**, after all, it's the most known and something like the superstar among the CSS methodologies. **BEM** was started to create by a developer team at Yandex in 2005 and became open source in 2010. Companies that are using **BEM** are e.g: Google, BBC, and BuzzFeed. **SUIT CSS** is another method with many similarities and was developed by Nicolas Gallagher in 2014. Companies that are using it are e.g: Twitter, BBC Three, and LevelEleven. 

Both methods include component-based thinking to achieve reusable, clean code for faster development and code sharing in a scalable team. And both provide a clean structure of having semantically meaningful class names to express how a component is structured and if there are presentation modifications. Although the spelling is different, there is a best practice rule that runs like a red thread: Instead of deep nesting, try to build new components. Means also to focus on writing CSS classes in form of flat nesting.


### Block, Element, Modifier (BEM)

In order to the [BEM naming convention](https://en.bem.info/methodology/naming-convention/#two-dashes-style){:target="_blank"}, block and element are connected with two underscores e.g. `.author-card__image`. A modifier is added with two dashes e.g. `.author-card--full-size`. Modifiers can be added to blocks and elements e.g. `author-card__image--placeholder`. Separate words are written with a hyphen and in lowercase Latin letters.

**Block:**      `.block {}` <br>
**Element:**    `.block__element {}` <br>
**Modifier:**   `.block__element--modifier {}` `.block--modifier {}` <br>

```
.component-name {}
.component-name--modifier-name {}
.component-name__descendant-name {}
```

{% image_custom image="/assets/img/pages/blog/images/class-names-example.png" width="90" %}

#### BEM code example
```
// HTML structure
<div class="author-card author-card--full-size">
  <img class="author-card__image author-card__image--placeholder" src="img/image.jpg">
  <p class="author-card__description">
    <strong class="author-card__name">Author name</strong> 
    lorem ipsum dolor...
  </p>
</div>

// LESS nesting
.author-card {
  &__image {
    &--placeholder {}
  }
  &__description {}
  &__name {}
  &--full-size {}
}
```


### SUIT CSS

Suit CSS focuses on supporting especially the UI component-based web application development e.g. React, Ember, and Angular.
Regarding the [SUIT CSS naming convention](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md){:target="_blank"} we use double hyphens to indicate a component modifier e.g. `.AuthorCard--example`, and a single hyphen to indicate a component descendant e.g. `.AuthorCard-image`. Components, modifiers, and descendants names are written in camelcase, and component names start with a capital. 

But now we get to the interesting part: Nicolas Gallagher added a different type of class called "helper" or "utility" class. You can add this class on any element within a component to provide low-level structural or positional traits, beginning with the prefix of `u-` e.g. `.u-fullSize`. Another addition is to have states classes which are reflecting changes to a component state, they always begin with `is-` e.g. `.is-empty`.

```
.u-utilityName {}

.ComponentName {}
.ComponentName--modifierName {}
.ComponentName-descendentName {}

.ComponentName.is-stateOfComponent
```

#### SUIT CSS code example
```
// HTML structure
<div class="AuthorCard u-fullSize">
  <img class="AuthorCard-image is-empty" src="img/image.jpg">
  <p class="AuthorCard-description">
    <strong class="AuthorCard-author">Author name</strong> 
    lorem ipsum dolor...
  </p>
</div>

// LESS nesting
.u-fullSize {}
.AuthorCard {
  &-image {
    &.is-empty {}
  }
  &-description {}
  &-name {}
}
```


## Summery

As you can see, the declaration of the classes is so well defined that it takes the work off your shoulders to think about class names in detail. But there are a lot of other advantages, why you should consider using **BEM** or **SUIT CSS** for your projects. 

**Pros:**
* Clear and predefined naming conventions makes understanding as well as debugging much easier
* Flat CSS structure makes specificity easier
* Using unique and context-related class names avoids CSS conflicts
* Composing and reusing blocks reduces the amount of maintainable CSS code
* Scalability apply to projects of all sizes
* **BEM:** More popular naming convention for classes leads to more public Q&A
* **SUIT CSS:** Camelcase makes longer class names more readable
* **SUIT CSS:** Utility and state classes provides the possibility of reusable classes

**Cons:**
* Classes can bloat up the file size with the long CSS class names
* **BEM:** Class names can be looong and "ugly"
* **BEM:** No reusable classes, means the need for new class creations for the same styling
* **SUIT CSS:** Not as long and "ugly" class names, but unfamiliar at the first glace, because of the capital letter in the beginning

So what is the better CSS method now you may ask? Sorry, but that's your decision. It depends hardly on what style of class names writing you prefer and if you see utility and state classes as a great addition or as an ugly being. I, for my part, call **SUIT CSS** the powerful little brother of **BEM** since he copies the benefits of the **BEM** concept and puts a cherry on top.
