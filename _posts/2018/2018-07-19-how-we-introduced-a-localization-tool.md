---
layout: post
title: How we introduced a localization tool
date: 2018-07-19
header_image: public/localization-tool.jpeg
header_overlay: true
category: language-and-localization
tags: ["localization", "localization tool"]
authors: ["Christina"]
---

In the [first part](/blog/language-and-localization/why-the-heck-would-we-need-a-software-localization-tool/) of this series, you got an introduction to our initial localization process.
And you dived deeper into the challenges we met to improve it.
This part will cover the journey towards a localization tool.

## Discovery tours for the win

The findings from the evaluation of the localization process have been a great starting point.
It was obvious, that we need to introduce a localization tool.
But which one?
There are plenty of them on the market.
Each of them declares to be the best and most useful one.
And not to forget the different pricing and features.
There was only one way to tackle this: A second discovery tour.
So I talked to Product owners, UI writers, UX experts, developers, and colleagues from HR, Marketing and Sales.
To sum it up: To everyone who gets somehow in touch with translations.
I tried to figure out their needs and wishes concerning a localization tool.

## The rating list

The discovery tour ended up in a prioritized list of feature wishes:

1.*In-Context editor*   
Translators cannot provide high-quality translations without context.
But the manual effort to provide screenshots for every key is very high.
With an In-Context editor, you can directly translate the keys in the UI.

2.*Git Synchronization*   
Our developers should be able to focus on their main task: Developing.
The effort to get the keys translated should by as low as possible for them.

3.*Translation Memory*   
Our internal UI writers get supported when creating new UI texts.
They can easily check how they worded similar phrases before, and if they can simply reuse the old wording.
And of course, nobody would like to pay a translation agency for translating the exact same sentence twice...😉.

4.*Glossary*   
We already had a terminology databank in place.
The entries of this database should also be used in the localization tool.

Besides this feature list, we also had an eye on the overall feature set, the pricing, available users, and key limitations.
What can I say?
It wasn't an easy decision.
There are plenty of tools out there and we could have worked with most of them.
But some test accounts and discussions later, we decided to go with [PhraseApp](https://phraseapp.com/){:target="_blank"}.

## So far so good

We've decided which tool we want to go with.
Great!
But that's only where the party starts.
You do not simply start using it.
First you need to build a new localization process around this tool.

### Single point of trust

If you plan to work with a localization tool as successful as possible, you need to keep an eye on it.
Not only on the tool itself but also on keeping it up to date and make use of the features.
So first of all, it's reasonable to fill the Glossary and add existing translations to enable the Translation Memory.
Then the In-Context Editor and the Git Synchronization need to be implemented.
This also needs some developer effort.
But who should take care of all this and handle future translations?
It's not possible to tackle this next to another full time job.
That's why we've introduced a dedicated Localization Manager.

### Speeding everything up

Do you remember?
Our whole translation process took about 3 weeks.
That's far away from an agile translation.
So we had a deeper look at our interal processes.

We covered topics like:
* At which point do we provide the translations for the developers?
* How regulary do we create wordings?
* For how many keys do we create an order for the translation agency?

Long story short:
* First developers need to create the keys. Afterwards, the keys will be automatically uploaded to PhraseApp (keyword: Git Synchronization). Translations are only delivered at this point. Only in this way, we can make use of all the features PhraseApp offers.
* Twice a week.
* If necessary, after each wording session.

This way (and through some further minor changes) we reduced everything from 3 weeks down to a maximum of 1 week. Great!

### Unexpected stumbling blocks

We thought that our translation agency would jump for joy when we tell them about the new localiztion tool.
Finally, we would be able to provide really great context for all our translation keys with the In-Context Editor.
We don't need to handle our communication via email and XML files.
They could simply get their own PhraseApp account and start off translating.
But we forgot that translators are used to the typical translator tools and not to dedicated software localization tools.
They would need to spend some time to get used to this new tool.
And unfortunatelly, not every translation agency is willing to do so.
So maybe it will be necessary to change your translation agency if you decide to improve your localization process.
But to embold you: We've found one.
And it's just great to work in the same tool and so close together.

### What else to think of?

Within the first test translations we soon noticed, that translation keys got more important for us.
They are a perfect source of information in case you need some more context.
That's why we [adapted them to our needs](/blog/language-and-localization/why-you-should-invest-time-on-translation-keys/).
Furthermore, we noticed that a localization tools cannot solve all our problems.
And that it even caused some new ones.
But that's another topic I will tackle in my next blog post.
Stay tuned how we solved them 😉.

## Related post

* [Why the heck would we need a software localization tool?](https://developer.epages.com/blog/language-and-localization/why-the-heck-would-we-need-a-software-localization-tool/)

### About the author

{% image_custom image="/assets/img/pages/blog/images/author-cgebken.png" width="10" align="left" circle %}

<br>
<br>
Christina Gebken is a Technical Communicator and Localization Manager.
