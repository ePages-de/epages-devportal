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
That's why coming up with consistent UI texts and translations can be a real challenge here if you're not supported by the right tooling.
But consistency is crucial for a great usability of our products and it makes life easier for our merchants.
Fortunately, we have some tools and guidelines at hand that we would like to share here.

## Meaningful translation keys

Consistency already starts in the development phase.
That's when developers craft the translation keys for the UI texts.
But it's not about the UI texts, it's more about the translation keys for the UI texts.
Translation keys have corresponding values for each of the available languages, and these values are stored as translations in individual locale files.
Imagine those keys as placeholders within the code.
This way several locales can be supported without the need to adapt the code for each of them.

Many software localization tools display keys quite prominently.
That's why they can be used for context information in case screenshots or an In-Context Editor are not available.
So, it's important to craft meaningful translation keys that includes the missing context.
Let's make that clear with an example: `categoryListView.createButton.label` and `categoryList.create` both are keys that could be used as a placeholder for the same UI text.
But the first one gives way more context information, such as the view we're dealing with and that it's a button label.

On top of that, consistent keys facilitate the search for certain elements later on - in the code as well as in the software localization tool.
If all buttons are e.g. structured as in our example, later on these keys can be searched for `Button.label` to easily get an overview of all already existing UI texts for button labels.
This is a good trick to check once again whether all UI texts of this type are consistent.
Bottom line: meaningful translation keys definitely support consistent UI texts.

But as many developers work on a software, each of them has their own style to craft translation keys.
That's why you should invest time to [come up with a style guide for translation keys](https://developer.epages.com/blog/language-and-localization/why-you-should-invest-time-on-translation-keys/){:target="_blank"}.
It leads to a company-wide consistent usage, and thus enables users to understand and categorize the keys more easily.
Furthermore, developers have a given template and don’t need to spend extra time thinking about the correct term or structure.

## Translation Memories

A sentence can be translated into another language in different ways.
The styles of the translators and the terminology used may differ.
But a consistent translation for the same term or phrase will improve usability.

It is impossible to remember all UI texts and corresponding translations we have ever produced.
Especially when working on larger or several different projects.
That's exactly where translation memories jump in.
They remind you of existing translations even if the source text is not exactly the same.
By taking the suggestions from the translation memory into account, you can thus easily translate recurring terms and phrases consistently.

## Glossaries

I think we all agree that a translation memory is a great tool to support consistency in translations.
But what about consistency in copywriting?
If there is no text that the translation memory can compare, how should it be able to make suggestions?

Are copywriters free to use whatever terminology they want?
Of course not.
They also need to take care of using the common terms and phrases.
But it's a bit harder to find them.
Glossaries do not only help to explain certain terms and concepts to external translators.
[Maintaining a glossary](https://developer.epages.com/blog/language-and-localization/five-compelling-reasons-why-you-should-care-about-terminology/){:target="_blank"} also facilitates a copywriters's life.
If they are e.g. wondering if to use *user name* or *username*, or *ecommerce* or *e-commerce*, they can check the spelling in the glossary.
This way the most important terms of the product will be spelled consistently throughout the software.

## UI text guidelines

Glossaries can support copywriters with the right spelling of a term or a sentence.
But what about the general grammar, and tone of voice?
You'll need a guideline for these topics.
The content of the guideline is totally up to the company and the product.
Establishing a structure for recurring text types, and deciding how to apply grammar rules to these types could be the first steps.
This way it could e.g. be achieved that all checkbox labels start with a verb.

After [setting up the guideline](https://developer.epages.com/blog/language-and-localization/how-to-create-awesome-ui-texts/){:target="_blank"}, it will simplify UI text related tasks every single time, and the texts will automatically be more consistent and coherent.
In the best case, a guideline is set up for each of the supported locales to give further guidance for the translators. 

## What are you doing that for?

To be honest: setting up and maintaining all these tools and guidelines is time consuming.
But it's totally worth it.
It saves time later on when creating UI texts, communicating with translators or developers.
And what's best: it saves a user's time as they can navigate better and faster through the software and have a great user experience.
This is worth it, isn't it?


------ End of article

## Short summary at the beginning

When it comes to software localization, maintaining consistency is a vital part of the process. In this article we'll share some tips and tricks on how to achieve consistency in software localization in collaboration with developers, copywriters, and translators.

## Author

I propose to stick with Harm, but slightly update his description and title (no "PhraseApp Content Team" but "CTO at ePages"): 

Harm Behrens is CTO at ePages, and shares the “bike2work” passion of many ePagees.
He's an ecommerce-addict, internet enthusiast, and Ruby/Docker evangelist.
Having a strong focus on developing a new software platform at ePages using React JS, Java, Spring Boot, Kubernetes, Docker, and more, he's keen on having all of our ecommerce applications localized.