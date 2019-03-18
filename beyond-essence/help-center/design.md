---
layout: beyond-essence
header_image: private/main.jpg
title: Design & formatting
background_image: index.jpg
---

The design and the formatting in the Help center differs in some points from the design and style of the software.

## Keep the formatting structured and simple

Even though there are plenty of formatting options for the help articles, we'd like to keep the overall appearance structured and simple.
Meaning that we use the _Standard_ font size for general text sections.
For headers, we use the predefined header sizes starting with _Header 2_ as _Header 1_ is too big.

Additionally, we differentiate between two groups of elements:

- Elements that the user has to select, e.g. buttons, checkboxes, menu items, or radio buttons. These elements are written in bold. 

- Elements that are mentioned to support the navigation of the user or that are used as labels, e.g. cards, views, and input field. These elements are written in italics.

## Use a consistent layout for screenshots and images 

Images can say more than a thousand words.
This is also true for screenshots and images in our articles.
With the visuals, our explanations and instructions are easier to understand.
For an even better understanding, the images and screenshots should have the same layout and highlighting in each article.
This way, the user is used to the design and can concentrate on the content.

We add a light grey overlay to the articles and cut out the area that is currently relevant:

{% image_custom image="/assets/img/pages/essence/ImageHighlighting.png" width="50" %}

If we need to number certain elements in an image, we use a fixed set of numbers:

{% image_custom image="/assets/img/pages/essence/NumberedImage.png" width="50" %}

## Make use of boxes to highlight content

We use graphically highlighted boxes for certain information.

### Info boxes

Use _Info_ boxes to give further reading hints. Most of the time these kind of boxes contain links to other articles that have a closer look at a certain topic. This way, we do not duplicate content by still providing the user with everything the needs to know.

{% image_custom image="/assets/img/pages/essence/InfoBox1.png" width="50" %}

{% image_custom image="/assets/img/pages/essence/InfoBox2.png" width="50" %}

### Note boxes

_Note_ boxes contain relevant information that is useful for the current context but that is not necessary to perform an action. It can e.g. be used to explain the impact of the action, point out a specific behavior of an element, explain the relation to other features, or simply give deeper information on a feature.

{% image_custom image="/assets/img/pages/essence/NoteBox1.png" width="50" %}

{% image_custom image="/assets/img/pages/essence/NoteBox2.png" width="50" %}

{% image_custom image="/assets/img/pages/essence/NoteBox3.png" width="50" %}


### Caution boxes

Use _Caution_ boxes only for seleted cases where you really need to make the user aware that an action might have negative consequences.

{% image_custom image="/assets/img/pages/essence/CautionBox1.png" width="50" %}

{% image_custom image="/assets/img/pages/essence/CautionBox2.png" width="50" %}

### Formatting 

The text is formatted as Paragraph.
Only the headline (Info, Note, Attention) is written in bold.
There is no punctuation mark behind the headline.

### Implementation

This is how to implement the boxes in the source code in **English**:

Note: `<div class="note"><strong>Note</strong><br />[...]</div>`   
Info: `<div class="info"><strong>Info</strong><br />[...]</div>`   
Caution: `<div class="caution"><strong>Caution</strong><br />[...]</div>`   

And this is how to implement the boxes in the source code in **German**:

Note: `<div class="note"><strong>Hinweis</strong><br />[...]</div>`   
Info: `<div class="info"><strong>Info</strong><br />[...]</div>`   
Caution: `<div class="caution"><strong>Achtung</strong><br />[...]</div>`   

The [...] is a placeholder for the respective text you'd like to add to the box.

