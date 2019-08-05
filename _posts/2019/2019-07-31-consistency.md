---
layout: post
title: How to ensure consistency in software localization
date: 2019-07-16
header_image: public/red-stoplight.jpg
header_position: center
header_overlay: true
category: api-experience
tags: ["api", "reference", "tool", "techcom"]
authors: ["Christina"]
about_authors: ["cgebken"]
---

At [ePages](https://epages.com/us/){:target="_blank"} we offer our customers a cloud-based online shop software in 16 distinct languages.
That's why coming up with consistent UI texts and translations can be a real challenge if you're not supported by the right tooling.
But consistency is crucial for a great usability of our products and it makes life easier for our merchants.
Fortunately, we have some tools and guidelines at hand that we would like to share here.

## Meaningful translation keys

Consistency already starts in the development phase.
That's when developers craft the translation keys for the UI texts.
Translation keys have corresponding values for each of the available languages, and these values are stored as translations in individual locale files.
Imagine those keys as placeholders for the localized UI texts within the code.
This way several locales can be supported without the need to adapt the code for each of them.

Many software localization tools display keys quite prominently in their UIs.
That's why meaninful translation keys can be used for context information in case screenshots or an In-Context Editor are not available.
Let's make that clear with an example: `categoryListView.createButton.label` and `categoryList.create` are keys that can both be used as a placeholder for the same UI text.
But the first one gives way more context information, such as the view we're dealing with and that it's a button label.

On top of that, consistent keys facilitate the search for certain elements - in the code as well as in the software localization tool.
If all buttons are e.g. structured as in our example, the search results for `Button.label` will easily give an overview of all already existing UI texts for button labels.
This is a good trick to check whether all UI texts of this type are consistent.
Bottom line: meaningful translation keys definitely support consistent UI texts.

But as many developers work on a software, each of them has their own style to craft translation keys.
That's why you should invest time to [come up with a style guide for translation keys](https://developer.epages.com/blog/language-and-localization/why-you-should-invest-time-on-translation-keys/){:target="_blank"}.
It leads to a company-wide consistent usage, and thus enables users to understand and categorize the keys more easily.
Furthermore, developers have a given template, and don’t need to spend extra time thinking about the correct term or structure.

## Translation Memories

UI texts can be properly translated in different ways as the styles of the translators and the terminology used may differ.
But a consistent translation for the same term or phrase will improve usability.

However, it is impossible to remember all UI texts and corresponding translations that were ever produced.
Especially when working on larger or several different projects.
That's exactly where translation memories jump in.
They remind you of existing translations even if the source text is not exactly the same.
By taking the suggestions from the translation memory into account, recurring terms and phrases can thus be easily translated consistently.

## Glossaries

A translation memory is a great tool to ensure consistency in translations.
But what about consistency in copywriting?
Are copywriters free to use whatever terminology they want?
Of course not.
They also need to take care of using the common terms and phrases.

Glossaries are our tool of choice to support here.
They do not only help to explain certain terms and concepts to external translators.
[Maintaining a glossary](https://developer.epages.com/blog/language-and-localization/five-compelling-reasons-why-you-should-care-about-terminology/){:target="_blank"} also facilitates a copywriters's life.
If they are e.g. wondering if to use *user name* or *username*, or *ecommerce* or *e-commerce*, they can check the spelling in the glossary.
This way the most important terms of the product will be spelled consistently throughout the software.

## UI text guidelines

Consistency in UI texts is not only about the correct terms and phrases.
It's also about the general grammar, and tone of voice.
These topics can be tackled with a guideline.
The content of this guideline is totally up to the company and their product.
Establishing a structure for recurring text types, and deciding how to apply grammar rules to these types can be a first step.
Starting off with such a topic helps, let's say to align that all checkbox labels start with a verb.
That's already a good move into the right direction.

After [setting up the guideline](https://developer.epages.com/blog/language-and-localization/how-to-create-awesome-ui-texts/){:target="_blank"}, it will simplify UI text related tasks every single time, and the texts will automatically be more consistent and coherent.
In the best case, a guideline is set up for each of the supported locales to give further guidance to the translators. 

## What are you doing that for?

To be honest: setting up and maintaining all these tools and guidelines is time-consuming.
But it's totally worth it.
It saves time later on when creating UI texts, communicating with translators, or developers.
And what's best: it saves a user's time as they can navigate better and faster through the software and have a great user experience.
This is worth it, isn't it?


------ End of article

## Short summary at the beginning

When it comes to software localization, maintaining consistency is a vital part of the process. In this article we'll share some tips and tricks on how to achieve consistency in software localization in collaboration with developers, copywriters, and translators.

## Author

- Update Harm's title (no "PhraseApp Content Team" but "CTO at ePages"): 

- Christina Gebken is a Localization Manager and TechWriter at ePages. She loves working agile, and writing new software help articles.