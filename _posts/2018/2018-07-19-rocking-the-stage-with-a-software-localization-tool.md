---
layout: post
title: Rocking the stage with a software localization tool
date: 2018-07-19
header_image: public/localization-tool.jpeg
header_overlay: true
category: language-and-localization
tags: ["localization", "localization tool", "agile"]
authors: ["Christina"]
about_authors: ["cgebken"]
---

In the [first part](/blog/language-and-localization/why-the-heck-would-we-need-a-software-localization-tool/) of this series, we've put our existing software localization process under the microscope.
And we revealed our challenges to improve it.
This second part will cover the journey towards a localization tool.

## Three cheers for discovery tours

The findings from the evaluation of the localization process, that Birgit pointed out in the last post, have been a great starting point.
It was obvious, that we need to introduce a localization tool.
But which one?
There are plenty of them on the market.
Each of them declares to be the best and most useful one.
And not to forget the different pricing and features.
There was only one way to tackle this: A second discovery tour.
I've talked to Product owners, UI writers, UX experts, developers, as well as colleagues from HR, Marketing, and Sales.
So to actually everyone who is somehow involved in translations.
I tried to figure out their needs and wishes concerning a localization tool.

## The rating scheme

My discovery tour ended up in a prioritized list of feature wishes:

**In-Context Editor**   
Translators cannot provide high-quality translations without context.
But the manual effort to provide screenshots for every key is very high.
With an In-Context Editor, you can directly translate the keys in the UI.

**Git Synchronization**   
Our developers should be able to focus on their main task: Developing our software.
Their effort on the translation process should be as low as possible.

**Translation Memory**   
This memory supports our UI writers when creating new UI texts.
They can easily check how they worded similar phrases before, and if they can simply reuse the existing texts.
And of course, nobody would like to pay a translation agency for translating the exact same sentence twice...😉.

**Glossary**   
We already have a terminology database in place.
The entries of this database should also be used in the localization tool.

Besides this feature list, we also had an eye on the overall feature set, the pricing, available users, and key limitations.
What can I say?
It wasn't an easy decision.
We could have worked with nearly all of them.
But some test accounts and discussions later, we decided to go with [PhraseApp](https://phraseapp.com/){:target="_blank"}.

## Organizational stuff

So far so good.
We've decided which tool we want to go with.
Great!
But that's only where the party begins.
We could not simply start using it.
First we needed to build a new localization process around this tool.

When planning a successful implementation of a localization tool, we would need to keep an eye on it.
Not only on the tool itself, but also on keeping it up-to-date, and making use of its features.
For the beginning, it's reasonable to fill the Glossary and add existing translations to enable the Translation Memory.
Afterwards, the In-Context Editor and the Git Synchronization need to be implemented.
This, of course, requires some developer effort.
But who can take care of all this, and handle future translations?
It's not possible to tackle this next to another full time job.
That's why we've introduced a dedicated Localization Manager.

## Speeding everything up

Do you remember?
Our whole translation process took about 3 weeks.
That's far away from the timeframe we aimed for.
So we had a deeper look at our interal processes.
Long story short, these are the most important Q&As we tackled:

**Q**: Do we provide our developers with final UI texts before or after they develop a feature?   
**A**: First, the developers have to create the keys while they are coding, but without any final texts. Afterwards, these keys will be automatically uploaded to PhraseApp (keyword: Git Synchronization). The final UI texts will only be delivered by our UI writers at this point in time. Thus, we can make use of all the features PhraseApp offers.

**Q**: How often do we create UI texts?   
**A**: Twice a week.

**Q**: How many translation keys do we want to collect until we finally create an order for the translation agency?   
**A**: No minimum number of keys required. If necessary,  we create an order after each UI text session. 

With this (and some further minor changes), we reduced the localization and translation schedule from 3 weeks to a maximum of 1 week. Great!

## Translation agencies and localization tools...

We thought that our translation agency would jump for joy when we tell them about the new localiztion tool.
Finally, we would be able to provide really great context for all our translation keys with the In-Context Editor.
We wouldn't need to handle our communication via email and XML files anymore.
The agency could simply get their own PhraseApp account and start off translating.

But we forgot that translators are used to their typical translation tools, and not yet to dedicated software localization tools.
They would need to spend some time to get used to this new tool.
And unfortunatelly, not every translation agency is willing to do so.
So maybe it will be necessary to change your translation agency if you decide to improve your localization process.
But to embold you: We've found one.
And it's just great to work in the same tool, and so closely together.

## That ain't all

Within the first test translations, we soon noticed that translation keys got more important for us.
They are a perfect source of information in case you need even more context.
That's why we [adapted them to our needs](/blog/language-and-localization/why-you-should-invest-time-on-translation-keys/).
Furthermore, we noticed that with a localization tool, we cannot tackle all of our challenges.
And that it can even cause some new ones.
But that's another topic I will discuss in my next blog post.
Stay tuned on how we made this work 😉.

## Related post

* [Why the heck would we need a software localization tool?](/blog/language-and-localization/why-the-heck-would-we-need-a-software-localization-tool/)