---
layout: post
title: How to structure CSS classes
date: 2020-12-10
header_image: public/class-structure.jpg
header_position: center
header_overlay: true
category: coding
tags: ["coding", "challenge", "devops", "css"]
authors: ["Anne"]
about_authors: ["azimmermann"]
---

A clean and arranged CSS structure is hard to maintain in growing projects.
Therefore it is important to think about how you would like to structure your classes right from the start so that you don't lose control.
But if you start searching for methodologies and techniques to organize your CSS, you will soon realize that there are many ways to reach your goal!

## The most popular CSS methodologies

* [Object-Oriented CSS (OOCSS)](https://de.slideshare.net/stubbornella/object-oriented-css){:target="_blank"} _by Nicole Sullivan, introduced 2009_ 
* [Block, Element, Modifier (BEM)](https://en.bem.info/){:target="_blank"} _by the developer team at Yandex 2005, open source since 2010_
* [Atomic CSS](https://acss.io/){:target="_blank"} _by Thierry Koblenz, introduced 2013_
* [Multilayer CSS (MCSS)](https://operatino.github.io/MCSS/en/){:target="_blank"} _by Robert Haritonov, introduced 2014_
* [SUIT CSS](http://suitcss.github.io/){:target="_blank"} _by Nicolas Gallagher, introduced 2014_
* [Attribute Modules for CSS (AMCSS)](https://amcss.github.io/){:target="_blank"} _by Glen Maddern & Ben Schwarz, introduced 2014_
* [Scalable and Modular Architecture for CSS (SMACSS)](http://smacss.com/){:target="_blank"} _by Jonathan Snook, introduced 2015_

The universe of other CSS methodologies is even bigger and grows from time to time, although the list of the most popular ones seems not to change.
Since I've been dealing with these methodologies for quite a while now, I'd like to jump right to the point where I introduce you to the two most interesting approaches from my point of view.

## BEM vs. SUIT CSS - Two methodologies in comparison

You've probably already heard of **BEM**, after all, it's the most known one and maybe even a kind of superstar among the CSS methodologies.
The creation of BEM was started by a developer team at Yandex in 2005 and it became open source in 2010.
Companies that are using BEM are e.g. Google, BBC, and BuzzFeed. 
**SUIT CSS** is another methodology with many similarities and was developed by [Nicolas Gallagher](https://mobile.twitter.com/necolas){:target="_blank"} in 2014.
Companies that are using it are e.g. Twitter, BBC Three, and LevelEleven.

Both methodologies include component-based thinking to achieve reusable, clean code for faster development and code sharing in a scalable team.
And both provide a clean structure of semantically meaningful class names to express how a component is structured and if there are presentation modifications.
Although the spelling is different, there is a best practice that runs like a red thread through both: Instead of deep nesting, try to build new components.
This also includes to focus on writing CSS classes in form of flat nesting.

### Block, Element, Modifier (BEM)

According to the [BEM naming convention](https://en.bem.info/methodology/naming-convention/#two-dashes-style){:target="_blank"}, blocks and elements are connected with two underscores, e.g. `.author-card__image`.
A modifier is added with two dashes, e.g. `.author-card--full-size`.
Modifiers can be added to blocks and elements, e.g. `author-card__image--placeholder`.
Single words are combined with a hyphen and in lowercase Latin letters.

**Block:**      `.block {}` <br>
**Element:**    `.block__element {}` <br>
**Modifier:**   `.block__element--modifier {}` `.block--modifier {}` <br>

```
.component-name {}
.component-name--modifier-name {}
.component-name__descendant-name {}
```

#### BEM code example

Let's have a look at an example.
We'd like to come up with a little box containing information about an author:

{% image_custom image="/assets/img/pages/blog/images/class-names-example.png" width="90" %}

This is how it could look like with BEM:

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

**Suit CSS** especially focuses on supporting the UI component-based web application development, e.g. [React](https://reactjs.org/){:target="_blank"}, [Ember](https://emberjs.com/){:target="_blank"}, and [Angular](https://angular.io/){:target="_blank"}.
Regarding the [SUIT CSS naming convention](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md){:target="_blank"}, we at ePages use double hyphens to indicate a component modifier, e.g. `.AuthorCard--example`, and a single hyphen to indicate a component descendant, e.g. `.AuthorCard-image`.
Component, modifier, and descendant names are written in camelCase, and component names start with a capital.

But now we get to the interesting part: Nicolas Gallagher added a different type of class called "helper" or "utility" class.
You can add this class to any element within a component to provide low-level structural or positional traits, beginning with the prefix `u-`, e.g. `.u-fullSize`.
Another addition is to have state classes which are reflecting changes to a component state.
These always begin with `is-`, e.g. `.is-empty`.

```
.u-utilityName {}

.ComponentName {}
.ComponentName--modifierName {}
.ComponentName-descendentName {}

.ComponentName.is-stateOfComponent
```

#### SUIT CSS code example

Do you remember the little author box we used as an example for BEM?
This is how it would look like with SUIT CSS:

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


## Summary

As you can see, the declaration of the classes is so well-defined that it takes the work off your shoulders to think about class names in detail.
But there are a lot of other advantages why you should consider using **BEM** or **SUIT CSS** for your projects.

**Pros:**
* Clear and predefined naming conventions are more comprehensible and make debugging much easier
* The flat CSS structure makes specificity easier
* Using unique and context-related class names avoids CSS conflicts
* Composing and reusing blocks reduces the amount of maintainable CSS code
* Scalability applies to projects of all sizes
* **BEM:** More popular naming convention, many developers gained first experience with it
* **SUIT CSS:** camelCase makes longer class names more readable
* **SUIT CSS:** Utility and state classes provide the possibility of reusable classes

**Cons:**
* Classes can bloat the file size with long CSS class names
* **BEM:** Class names can be looong and "ugly"
* **BEM:** No reusable classes, which means that there is a need for new class creations for the same styling
* **SUIT CSS:** Not as long and "ugly" class names, but unfamiliar at the first glance because of the capital letter in the beginning

Now you might ask: What is the better CSS methodology? 
Sorry, but that's your decision.
It heavily depends on what writing style for class names you prefer and if you see utility and state classes as a great gimmick or as an ugly addition.
I, for my part, call **SUIT CSS** the powerful little brother of **BEM** since he copies the benefits of the BEM concept and puts a cherry on top.