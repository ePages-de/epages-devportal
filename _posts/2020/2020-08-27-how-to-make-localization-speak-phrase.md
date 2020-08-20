---
layout: post
title: How to make your localization speak Phrase
date: 2020-08-27
header_image: public/automating-translations.jpg
header_overlay: true
category: language-and-localization
tags: ["localization", "phrase"]
authors: ["Gregor"]
about_authors: ["gzweig"]
---

Managing translations and different locales in your software project can be a demanding task for anyone involved. This process usually requires sending translations to an agency, waiting for their response and fitting translated content back into correct place in your codebase.

We at ePages recently updated this process of recurring communication with our translation service. This post will cover how we integrated a new translation service for the shop administration of our main product [ePages Now](https://epages.com/de/onlineshop-erstellen/){:target="_blank"} and how we came up with a general approach, which makes it possible to **automate localization in almost every project**.

## A view behind the curtains

Our product ePages Now involves the **Cartridges** project, which mainly powers the shop administration for Now shops. This administration is available in **17 different language dialects** and allows merchants to set their shop design and manage their products and customers. In a single development iteration developers usually added or updated translations, which were provided by our UX team in american english, british english and german. Filling out the remaining 14 locales recently required alot of communication between developers and translators.

To make things easier for developers and translators we were looking for new automated approaches to handle localization. This led to the integration of the localization platform [Phrase](https://phrase.com/){:target="_blank"}. Phrase plays a considerable role in the ePages infastructure, as it is already used for our storefront and with great success and satisfaction. By integrating Phrase we would spare translators the task of working directly with our translation files and provide them with feature-rich editor in the web browser.

To use Phrase in an automated fashion, translations have to be provided in a [compliant file format](https://phrase.com/docs/guides/formats/){:target="_blank"} for their service. Since the Cartridges project uses it's own XML format, we have to extract our translations and convert them into a fitting format, send them to Phrase, wait for translation, download the translation content and update our original XML files. To keep translations as simple and as clear as possible we decided to go with a **JSON** format. With that our new process can be illustrated as following:

{% image_custom image="/assets/img/pages/blog/images/cartridges-phrase-workflow.jpg" width="50" %}

The main challange is to recreate the original XML file without losing any information or damaging the XML file format. Each JSON file must have the ability to fully reconstruct translations in their corresponding XML file.

## Challange accepted!

##### Solving the conversion between XML and JSON

We came up with a general solution, which works for any project, which has translations mapped to translation keywords. Those translation keywords can also be present in multiple translation files spread across the project. However different translation files can contain the same translation keywords (for example the translation keyword `Name` can be used in different files).

JSON keywords have to be truly unique to unambigiously identify them in Phrase. Therefore we mapped the relative path of our translation file into our JSON keyword. For example: the files `Dictionary.de.xml`, `Dictionary.en.xml` and `Dictionary.en-US.xml` are located in `Shop/Templates/` relative inside our project. Those files contain the translation keyword `AdditionalHtmlHead`, which includes a translation in the respective locale. The example is illustrated below.

{% image_custom image="/assets/img/pages/blog/images/phrase-json-keyword.jpg" width="70" %}

Notice how dots are used in the JSON keyword to represent path seperators and how dots in file names are escaped with hashtags. If a translation keyword has to be restored, we know that the last part of the JSON keyword (splitted by dots) is the translation keyword, the second last part is the file name and everything else refers to the relative location of the file in the project.

This approach is so general, that it can be applied to any software project with a custom translation file format.

##### Communicating with Phrase

For each new pull request to our Cartridges repository, which contains new or updated translations, the conversion process to JSON may be triggered by a developer. The resulting JSON files will be transmitted to Phrase using a combination of Phrase's API and CLI. To respect to correct order of pull requests a label is set in Phrase, which also shows which translation got changed in which pull request. After successful translation the translator triggers the download process, which merges new translations into the original XML files.

## What can be learned

Switching up the translation process was non negletable amount of work. Overall it we achieved the following improvements:

* less inconsistencies in translations
* less communication effort between translators and developers
* less room for errors when working with translations
* more transparent translation process
* more robust translation tests in pipeline
* faster translation process

As of now we have 13.350 different JSON keywords for each different locale and a total of 1.753.465 managed words in Phrase's translation database.