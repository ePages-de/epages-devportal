---
title: How to keep up your code quality
layout: post
date: '2019-12-05'
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
> [Internal quality makes it easier to enhance software.](https://martinfowler.com/articles/is-quality-worth-cost.html#InternalQualityMakesItEasierToEnhanceSoftware){:target="_blank"}

From his experience, the effort put into code quality starts paying for itself within a few weeks of 
ongoing feature development.

This is definitely something I can confirm from my day job here at ePages, where we've just recently reached 
a historically low open bug count, enabling us to focus on developing new features.
How did we achieve that (other than thanks to our awesome QA engineers of course)? 

## Code reviews

78 percent of the colleagues who took my survey answered the question "Do you do code reviews in your team?" with 
"Always! Code reviews are mandatory in my team", with another 11 percent stating "Most of the time".

This brings us to my first rule of code reviews: 
[No exceptions](https://adriennetacke.github.io/conducting-humane-code-reviews/#/57){:target="_blank"}, 
e.g. just because you're the most senior developer in the team doesn't mean your code needs no peer review, 
or just because it's a time critical bug doesn't mean you may push to master without anyone having anyone approve 
your changes.

On average, the survey participants spend almost as much time reviewing as they do writing code. This makes sense given the fact that code reviews are mandatory for the majority. One interesting observation is that I couldn't make out a difference between novices (39% of the participants) and experts (61%) here, leading me to the conclusion that our code review culture is less about "the experienced controlling the newbies" and more about knowledge transfer. I consider this a good thing.

Asking for the greatest pain points of code reviews, most complaints I got were about too big change sets.
So if you don't want to disappoint your coworkers, try to keep the changes you're introducing at once as small as possible.
The earlier this is considered in the agile product development cycle, the easier it is for a developer to adhere to this rule.

When I asked about the greatest benefits, most answers my colleagues gave fell into one of three categories: Catching bugs, ensuring consistency and legibility, and knowledge transfer:

> Not letting renegade-coders have their way with our codebase.

> To learn from it how things are working and how to structure your code.

> Transfer knowledge, identify defects, improve the design, maintain consistency.

## Tooling

Adrienne Tacke, whose talk "Conducting humane code reviews" I'm linking above, also points out another golden rule:
> [Let the robots take over! (they're better at it anyway)](https://adriennetacke.github.io/conducting-humane-code-reviews/#/24){:target="_blank"}

From my own experience, this is a big deal. For one, you feel less offended by a computer complaining about your indentation
style or your overly complex boolean expressions than you would be when told so by a human.
But maybe even more importantly, you don't have to re-discuss these things over and over again, and the code review can
focus more on the strategic aspects of the problem being solved.

In fact, my internal survey reveals a wide range of tools being used by my fellow colleagues, including, but not limited to,
[ESLint](https://eslint.org/){:target="_blank"}, [stylelint](https://stylelint.io/){:target="_blank"}, [commitlint](https://commitlint.js.org/){:target="_blank"}, [ktlint](https://ktlint.github.io/){:target="_blank"}, [Perl::Critic](https://en.wikipedia.org/wiki/Perl::Critic){:target="_blank"}, [Prettier](https://prettier.io/){:target="_blank"}, [sonarqube](https://www.sonarqube.org/){:target="_blank"}, and [import-sort](https://github.com/renke/import-sort){:target="_blank"}. Most of the time this is automated into a continuous integration pipeline that runs on every pull request. Many teams also enforce certain unit test coverage thresholds using [Codecov](https://codecov.io/){:target="_blank"} or [Code Climate](https://codeclimate.com/){:target="_blank"}.

This doesn't mean we blindly trust the robots - in fact, one interesting takeaway from my survey is that a surprisingly high percentage (94%) sometimes read their own pull request changes 
on GitHub - apparently a perspective change helps finding issues in your own code.

Perspective change is also an inherent part of the next tool I want to discuss:

## Pair programming

In her pitch "To Pair or not to Pair", Birgitta Böckeler points out that the very first programmers
worked in pairs, quoting ENIAC programmer [Jean Bartik](https://en.wikipedia.org/wiki/Jean_Bartik){:target="_blank"}:
> [Betty Snyder and I, from the beginning, were a pair. And I believe that the best programs and designs are done by pairs, because you can criticise each other, and find each other's errors, and use the best ideas.](https://speakerdeck.com/birgitta410/to-pair-or-not-to-pair?slide=3){:target="_blank"}

This matches with the answers given in my survey:
> To learn from more experienced team members.

> It helps to write code which is understandable for everybody, not just the author.

> I like the interaction and discuss about approaches on how to solve things.

Overall, what my colleagues like about pair programming falls into the categories knowledge transfer, resulting quality, and human interaction.

But again, let's not conceal the fact that many colleagues also expressed problems they're facing. Unsurprisingly, working so closely with someone brings up issues:

> Sometimes it's difficult to follow the other's thoughts.

> When discussions don't end up with an agreement.

> Sometimes it would be faster to do it by myself.

As you can deduce from these quotes, pair programming is emotionally challenging. Pair programming advocates might argue that most of said issues can be mitigated by just practicing it more often. So let's have a look at how often ePages developers practice pair programming. But before doing so, let me distinguish a little:

In the original idea of _extreme programming_, 

> [Pair programming means that all code is produced by two people programming on one task on one workstation.](https://en.wikipedia.org/wiki/Extreme_programming_practices#Pair_programming){:target="_blank"}

This also involves frequent role switching. Among the survey participants, 12% haven't (yet) had the opportunity to practice this style, 56 percent rarely, if ever, switch roles during pair programming, and only 31 percent do so after completing a certain logical unit. 50 percent state that they never (33%) or almost never (17%) do pair programming "by the book", and also the other half does it quite seldom (39%) or only from time to time (11%). 

Instead, many colleagues practice what I call "pragmatic pair programming": When someone gets stuck, they call for help, and the two start working together on the problem for a while. 61 percent of my colleagues do this more often than not (11%) or from time to time (50%). The remaining 39 percent split up into quite seldom (17%) or almost never (22%).

Now, depending on where you stand, you can see some room for improvement, or say we're happy with how we're doing.

## Unit testing

Everybody loves unit tests, right? Well, two thirds (67%) of the colleagues who completed my internal survey do write them.
That might not seem much at first, but consider that part of our developers program mostly in HTML and CSS ([yes, that's programming, too!](../css-can-do-that-color-manipulation-for-the-fearless/)), with only a sprinkle of JavaScript added.

Consequently, pretty much all participants disagree with the statement "Unit testing is overrated".
I find this remarkable given that most of the code written at ePages is product code rather than library code.

Quite a few of my colleagues at least sometimes find a bug in their code while writing the unit test for it.
This catching of errors, or bugs, at an early stage is something ePagees seem to like about unit testing - it was cited multiple times when asked "What do you like about unit testing / TDD?".  

TDD (test driven development) - writing the test before writing the code that makes it pass - is one variant of unit testing.
Similar to pair programming, it requires a lot of discipline, and seems a bit odd at first, especially to newcomers or less technical people. Still, 28 percent of the survey participants do TDD more often than not (17%), almost always (6%), or even all the time (6%). Another 28 percent still practice it from time to time (11%), or quite seldom (17% - by the way all percentages in this post are rounded). These are presumably the ones that also agreed with the statement: "I like TDD in theory, but I don't apply it that often in practice."

Here's some of the things my colleagues dislike about writing tests:

> When it becomes a quite daunting task because of mocking difficulties (with Perl)

Given that [a former colleague even created a Perl mocking library](../mockify-a-mocking-framework-for-perl/), does this tell something about the language? 😉 

> Sometimes you are just not in the mood to write unit tests.

We're only humans after all 😇

And here's some quotes on what ePagees like about testing:

> TDD: I think it's quite enjoyable.

> I can refactor without fear of breaking existing functionality. Often I first write missing unit tests before refactoring or adjusting the existing code.

## Refactoring 

This brings us to our last topic - refactoring, that is, changing the structure, but not the behavior, of the program code.
Unlike a blog post, software code is never done. Instead, it is read and modified over time by a large amount of people, some of which might never meet in person, like ex-ePagees and new developers, or you and your future self. 

The goal of refactoring is to reduce the effort required while reading or modifying code. As such, its return on investment takes effect only the next time someone has to read or modify that same piece of code. This creates controversy about the need for refactoring. The survey results underline this: While 5 participants partly (3) or fully (2) agree with the statement: "I enjoy refactoring for the sake of refactoring.", 7 partly (6) or fully (1) disagree with it.

The go-to refactoring approach at my company, used by 94 percent, seems to be "on the go", following the _boy scout rule_:

> [Leave your code better than you found it.](https://deviq.com/boy-scout-rule/){:target="_blank"}

Only a minority refactor before adding or changing the functionality of a legacy module, have separate pull requests or JIRA tickets for refactoring, or do refactoring spikes.
However, 69 percent try to split refactoring and modifying behaviour into separate commits - the colleagues reviewing their code will thank them! 

## So, how to keep up your code quality?

Wrapping it up: Establish a sane code review culture with focus on knowledge transfer. Split work into small, thus reviewable buckets. Use tooling to enforce consistency and a pre-agreed code style. Embrace pair programming - remember that when done from start to finish, it removes the need for further code review! Find bugs early in the development process with TDD or good unit tests. Don't fear refactoring - your tests has got you covered. Refactor on the go, but still split refactoring from changing behavior. 

And to my fellow colleagues: Keep up the good work 👍
