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

78 percent of the colleagues who took my survey answered the question "Do you do code reviews in your team?" with 
"Always! Code reviews are mandatory in my team.", with another 11 percent stating "Most of the time".

This brings us to my first rule of code reviews: 
[No exceptions](https://adriennetacke.github.io/conducting-humane-code-reviews/#/57), 
e.g. just because you're the most senior developer in the team doesn't mean your code needs no peer review, 
or just because it's a time critical bug doesn't mean you may push to master without anyone having anyone approve 
your changes.

On average, the survey participants spend almost as much time reviewing as they do writing code. This makes sense given the fact that code reviews are mandatory in many cases. One interesting observation is that I couldn't make out a difference between novices (39% of the participants) and experts (61%) here, leading me to the conclusion that our code review culture is less about "the experienced controlling the newbies" and more about knowledge transfer. I consider this a good thing.

Adrienne Tacke, whose talk "Conducting humane code reviews" I'm linking above, also points out another golden rule:
> [Let the robots take over! (they're better at it anyway)](https://adriennetacke.github.io/conducting-humane-code-reviews/#/24)

From my own experience, this is a big deal. For one, you feel less offended by a computer complaining about your indentation
style or your overly complex boolean expressions than you would be when told so by a human.
But maybe even more importantly, you don't have to re-discuss these things over and over again, and the code review can
focus more on the strategic aspects of the problem being solved.
In fact, my internal survey reveals a wide range of tools being used by my fellow colleagues, including, but not limited to,
xxx (to the one person who answered "None": I'd be interested in your reasons).

When asked about the greatest benefits of code reviews, most answers my colleagues gave fall into one of three categories: Catching bugs, ensuring consistency and legibility, and knowledge transfer.
One interesting takeaway is that a surprisingly high percentage (94%) sometimes read their own pull request changes 
on GitHub - apparently a perspective change helps finding issues in your own code.

When asked about the greatest pain points, most complaints were about too big change sets, that is pull requests.
So if you don't want to disappoint your coworkers, try to keep the changes introduced at once as small as possible.
The earlier this is considered in the agile product development cycle, the easier it is for a developer to adhere to this rule.

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

Everybody loves unit tests, right? Well, two thirds of the colleagues who completed my internal survey do write them.
That might not seem much at first, but consider that part of our developers program mostly in HTML and CSS ([yes, that's programming, too!](../css-can-do-that-color-manipulation-for-the-fearless/)), with only a sprinkle of JavaScript added.

Consequently, pretty much all participants disagree with the statement "Unit testing is overrated".
This is remarkable given that most of the code written at ePages is product code rather than library code.

Quite a few of my colleagues at least sometimes find a bug in their code while writing the unit test for it.
This catching of errors, or bugs, at an early stage is something ePagees seem to like about unit testing - it was cited multiple times when asked "What do you like about unit testing / TDD?".  

TDD (test driven development) - writing the test before writing the code that makes it pass - is one variant of unit testing.
Similar to pair programming, it requires a lot of discipline, and seems a bit odd at first, especially to newcomers or less technical people. Still, 28 percent of the survey participants do TDD more often than not (17%), almost always (6%), or all the time (6%). Another 28 percent still practice it from time to time (11%), or quite seldom (17% - all percentages rounded). These are presumably the ones that also agreed with the statement: "I like TDD in theory, but I don't apply it that often in practice."

Here's some of the things my fellows dislike about writing tests:

> When it becomes a quite daunting task because of mocking difficulties (with Perl)

Given that [a former colleague even created a Perl mocking library](../mockify-a-mocking-framework-for-perl/), does this tell something about the language? 😉 

> Sometimes you are just not in the mood to write unit tests.

We're only humans after all 😇

And here's some more quotes on what ePagees like about testing:

> TDD: I think it's quite enjoyable.

> I can refactor without fear of breaking existing functionality. Often I first write missing unit tests before refactoring or adjusting the existing code.

## Refactoring 

This brings us to our last topic - refactoring, that is, changing the structure, but not the behavior, of the program code.
Unlike a blog post, software code is never done. Instead, it is read and modified over time by a large amount of people, some of which might never meet in person, like ex-ePagees and new developers, or you and your future self. 

The goal of refactoring is to reduce the effort required while reading or modifying code. As such, its return on investment takes effect only the next time someone has to read or modify the same piece of code. This creates controversy about the need for refactoring. The survey results underline this: While 5 participants partly (3) or fully (2) agree with the statement: "I enjoy refactoring for the sake of refactoring.", 7 partly (6) or fully (1) disagree with it.

The go-to refactoring approach at my company, used by 94 percent, seems to be on the go, following the _boy scout rule_:

> [Leave your code better than you found it.](https://deviq.com/boy-scout-rule/)

Only a minority refactor before adding or changing functionality of a legacy module, have separate pull requests or JIRA tickets for refactoring, or do refactoring spikes.
However, 69 percent try to split refactoring and modifying behaviour into separate commits.

# Wrapping up

xx
