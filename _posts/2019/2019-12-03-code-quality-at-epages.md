---
title: How to keep up your code quality
layout: post
date: '2019-11-03'
header_image: public/coffee.jpg
header_position: center
header_overlay: true
category: coding
tags: ["refactoring", "pair programming", "TDD", "code review"]
authors: ["Paolo"]
about_authors: ["ppriotto"]
---

Every programmer has his own definition, base line, and ways to maintain what they'll call "code quality".
But when working on a shared code base, with multiple teams and from multiple locations, processes and tools are crucial
for developing a common understanding of that abstract term, and constantly ensuring it.

Let's look at some textbook best practices, and compare them to the results of an internal survey I conducted among all
ePages developers.

## Why code quality?

In his brilliant non-technical (as in "your manager can read that") article "Is High Quality Software Worth the Cost?",
renowned software architect Martin Fowler nails this down to:
> [Internal quality makes it easier to enhance software.](https://martinfowler.com/articles/is-quality-worth-cost.html#InternalQualityMakesItEasierToEnhanceSoftware)

From his experience, the effort put into code quality starts paying for itself within a few weeks of 
ongoing feature development.

This is definitely something I can confirm from my day job here at ePages, where we've just recently reached 
a historically low open bug count, enabling us to focus on developing new features.
How did we achieve that (other than thanks to our awesome QA engineers of course)? 

## Code reviews

xx percent of the colleagues who took my survey answered the question "Do you do code reviews in your team?" with 
"Always! Code reviews are mandatory in my team.", with another xx percent stating "Most of the time".

This brings us to my first rule of code reviews: 
[No exceptions](https://adriennetacke.github.io/conducting-humane-code-reviews/#/57), 
e.g. just because you're the most senior developer in the team doesn't mean your code needs no peer review, 
or just because it's a time critical bug doesn't mean you may push to master without anyone having anyone approve 
your changes.

Adrienne Tacke, whose talk "Conducting humane code reviews" I'm linking above, also points out another golden rule:
> [Let the robots take over! (they're better at it anyway)](https://adriennetacke.github.io/conducting-humane-code-reviews/#/24)

From my own experience, this is a big deal. For one, you feel less offended by a computer complaining about your indentation
style or your overly complex boolean expressions than you would be when told so by a human.
But maybe even more importantly, you don't have to re-discuss these things over and over again, and the code review can
focus more on the strategic aspects of the problem being solved.
In fact, my internal survey reveals a wide range of tools being used by my fellow colleagues, including, but not limited to,
xxx (to the one person who answered "None": I'd be interested in your reasons).

When asked about the greatest benefits code reviews give them, xxx

But let's not conceal the major pain points expressed in the survey: xxx Can you relate?

One interesting takeaway is that a surprisingly high percentage (xx%) sometimes read their own pull request changes 
on GitHub - apparently a perspective change helps finding issues in your own code.

## Pair programming

In her pitch "To Pair or not to Pair", Birgitta Böckeler points out that the very first programmers
worked in pairs, quoting ENIAC programmer [Jean Bartik](https://en.wikipedia.org/wiki/Jean_Bartik):
> [Betty Snyder and I, from the beginning, were a pair. And I believe that the best programs and designs are done by pairs, because you can criticise each other, and find each other's errors, and use the best ideas.](https://speakerdeck.com/birgitta410/to-pair-or-not-to-pair?slide=3)

This matches with the answers given in my survey:
> To learn from more experienced team members.1

> It helps to write code which is understandable for everybody, not just the author.

> I like the interaction and discuss about approaches on how to solve things.

Overall, what my colleagues like about pair programming falls into the categories knowledge transfer, resulting quality, and human interaction.

But again, let's not conceal the fact that many colleagues also expressed problems they're facing. As one might expect, working so closely with someone brings up a whole category of issues. xxx

Pair programming advocates will argue that all of said issues can be mitigated by just practicing it more often. Let's have a look at how often ePages developers practice pair programming: xxx 

Now, depending on where you stand, you can see some room for improvement, or say we're happy with how we're doing.

## Unit testing

## Refactoring 
