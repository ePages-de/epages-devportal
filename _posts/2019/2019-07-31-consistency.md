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

At [ePages](https://epages.com/us/){:target="_blank"} we offer our customers a cloud-based online shop software in about 16 distinct languages.
That's why always having all existing UI texts in mind and coming up with consistent copywriting and translations can be a real hassle.
But consistency is crucial for a great usability of our products and it makes life easier for our merchants.
Fortunately, there are some tools and guidelines that support us with that, and that we'd like to share with you.

## Key guidelines

Consistency already starts in the development phase.
This might be suprising for some of you as it's uncommon that developers work on UI texts.
But it's not about the UI texts, it's more about the translation keys for the UI texts.
You can imagine translation keys as placeholders for UI texts which are part of the code.
In the UI, they are replaced by the related UI text in the required locale.
This way you can support several locales without the need to adapt the code for each of them.

Many software localization tools display keys quite prominently.
That's why they can be used for context information in case screenshots, or an In-Context Editor are not available.
So, it's important to use a key structure where the missing context is included.
Let's clarify that with an example: `categoryListView.createButton.label` and `categoryList.create` are both keys that could be be used for the same UI text.
But the first one gives way more context information, such as the view it's located on and the fact that the key is used as a button label.

On top of that, consistent keys facilitate the search for certain elements later on.
If all buttons are e.g. structured as in our example, you could later on search for keys that contain `Button.label` and easily get an overview of all already existing UI texts for button labels.
See?
Consistent translation keys definitely support consistent UI texts.

But as many different developers work on a software and create such translation keys, they will have their own style to create and name them.
That's why you should invest time to [come up with a style guide for translation keys](https://developer.epages.com/blog/language-and-localization/why-you-should-invest-time-on-translation-keys/){:target="_blank"}.
It leads to a company-wide consistent usage, and thus enables users to understand and categorize the keys more easily.
Furthermore, developers have a given template and don’t need to spend extra time thinking about the correct term or structure.

## Translation Memories

Most of the time there is no one and only solution for translating a sentence into another language.
There are several solutions.
But a consistent translation for the same term or phrase will improve usability.

As already stated in the introduction, it is kind of impossible to have all existing translations in mind.
Especially if you work on larger or several different projects.
That's exactly where translation memories jump in.
They remind you of existing translations even if the source text is not exactly the same.
By taking the suggestions from the translation memory into account, you can thus easily translate recurring terms and phrases consistently.

## Glossaries

I think we all agree that translation memories are a great way to support consistency in translations.
But what about consistency in copywriting?
If there is no text that the translation memory can compare, how should it be able to make suggestions?

So, copywriters have a green field and can come up with whatever they want?
That's not true either.
Of course, they also need to take care of using the common terms and phrases.
But it's a bit harder to find them.
Glossaries can help here.
They cannot only be used to explain certain terms and concepts to externals like translation agencies.
By [maintaining a glossary](https://developer.epages.com/blog/language-and-localization/five-compelling-reasons-why-you-should-care-about-terminology/){:target="_blank"} you also facilitate the life of your copywriters.
If they are e.g. wondering if they should say *user name* or *username*, or *ecommerce* or *e-commerce*, they can check the spelling in the glossary.
This way the most important terms of your product will be spelled consistently throughout your software.

## UI text guidelines

Glossaries can support copywriters with the right spelling of a term.
But what about whole sentences?
Or the general grammar, and tone of voice?
You'll need a guideline for these topics.
The content of the guideline is totally up to you and your product.
You could start by establishing a structure for recurring text types, and decide how to apply grammar rules to these types.
This way you can e.g. make sure that all checkbox labels start with a verb.

After [setting up the guideline](https://developer.epages.com/blog/language-and-localization/how-to-create-awesome-ui-texts/){:target="_blank"}, it will simplify your UI text related tasks every single time, and your texts will automatically be more consistent and coherent.
In the best case, you even set up a guideline for each of your supported locales to give further guidance for your translators. 

## What are you doing that for?

Let me be honest with you.
Setting up and maintaining all these tools and guidelines is time consuming.
But it's totally worth it.
You'll save the time again when creating UI texts, and communicating with your translators, or your developers.
On top of that you'll save your users time as they can navigate way better and faster through a consistent UI.
And isn't that enough compensation?


------ End of article

## Short summary at the beginning

We'll share some tips and tricks with you on how to achieve consistency in your software localization.
Starting from tools and guidelines for developers, to copywriters, up to translators.

## Author

I propose to stick with Harm, but slightly update his description and title (no "PhraseApp Content Team" but "CTO at ePages"): 

Harm Behrens is CTO at ePages, and shares the “bike2work” passion of many ePagees.
He's an ecommerce-addict, internet enthusiast, and Ruby/Docker evangelist.
Having a strong focus on developing a new software platform at ePages using React JS, Java, Spring Boot, Kubernetes, Docker, and more, he's keen on having all of our ecommerce applications localized.