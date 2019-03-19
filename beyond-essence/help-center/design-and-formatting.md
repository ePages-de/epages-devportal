---
layout: beyond-essence
header_image: private/main.jpg
title: Design & formatting
background_image: index.jpg
---

The design and the formatting in our Help center differs in some points from the design and style of our software.

## Keep the formatting structured and simple

Even though there are plenty of formatting options for the help articles, we'd like to keep the overall appearance structured and simple.
Meaning that we use the _Standard_ font size for general text sections.
For headers, we use the predefined header sizes starting with _Header 2_ (as _Header 1_ is too big).

Furthermore, we differentiate between two kinds of elements:

- Elements that the user has to select, e.g. buttons, checkboxes, menu items, or radio buttons. These elements are written in bold. 

- Elements that are mentioned to navigate the user, e.g. cards, views, and input fields. These elements are written in italics.

## Use a consistent layout for screenshots and images 

Images can say more than a thousand words.
This is also true for screenshots and images in our articles.
With visuals, our explanations and instructions are easier to understand.
For an even better understanding, the images and screenshots should have the same layout and highlighting in each article.
This way, the user is used to the design and can concentrate on the content.

We add a light grey overlay to the articles and cut out the area that is currently relevant:

{% image_custom image="/assets/img/pages/essence/image-highlighting.png" width="50" %}

If we'd like to reference to certain elements in an image, we use a fixed set of numbers that we add to the images:

{% image_custom image="/assets/img/pages/essence/numbered-image.png" width="50" %}

## Make use of boxes to highlight content

We use graphically highlighted boxes for information that is an info, a note, or a caution notice.
For each of these boxes we've set a dedicated color and headline.

### Info boxes

Use Info boxes to give further reading hints by linking to related articles. This way, we do not duplicate content by still providing the users with everything they need to know.

{% image_custom image="/assets/img/pages/essence/info-box1.png" width="50" %}

{% image_custom image="/assets/img/pages/essence/info-box2.png" width="50" %}

### Note boxes

Note boxes contain relevant information that is useful for the current context but that is not necessary to perform an action. It can e.g. be used to explain the impact of the action, point out a specific behavior of an element, explain the relation to other features, or simply give deeper information.

{% image_custom image="/assets/img/pages/essence/note-box1.png" width="50" %}

{% image_custom image="/assets/img/pages/essence/note-box2.png" width="50" %}

{% image_custom image="/assets/img/pages/essence/note-box3.png" width="50" %}


### Caution boxes

Only use caution boxes for seleted cases where you really need to make the user aware that an action might have a negative impact.

{% image_custom image="/assets/img/pages/essence/caution-box1.png" width="50" %}

{% image_custom image="/assets/img/pages/essence/caution-box2.png" width="50" %}

### Formatting 

The text is formatted as _Paragraph_.
Only the headline (_Info_, _Note_, or _Caution_) is written in bold.
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

