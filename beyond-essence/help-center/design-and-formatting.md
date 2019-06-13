---
layout: beyond-essence
header_image: private/main.jpg
title: Design & formatting
background_image: index.jpg
---

## Formatting

### Structured and simple

- Keep the overall appearance structured and simple.
- Use the _Standard_ font size for general text sections.
- Use the predefined header sizes starting with _Header 2_.
- Use **bold** for elements that the user has to select, e.g. buttons, checkboxes, menu items, or radio buttons.
- Use _italics_ for elements that are mentioned to navigate the user, e.g. cards, views, and input fields.

{% image_custom image="/assets/img/pages/essence/general-formatting.png" width="50" %}

## Layout 

### Visuals

- Use images and screenshots to support explanations and instructions.
- To highlight an area, add a light grey overlay to the image and cut out the area that is currently relevant.

{% image_custom image="/assets/img/pages/essence/image-highlighting.png" width="50" %}

- To refer to certain elements in an image, use numbers.

{% image_custom image="/assets/img/pages/essence/numbered-image.png" width="50" %}

### Info boxes

Use Info boxes to give further reading hints by linking to related articles.

**Configuration:**

- Format the text itself as _Paragraph_.
- Write the headline (_Info_) in bold.
- Do not add a punctuation mark behind the headline.

{% image_custom image="/assets/img/pages/essence/info-box1.png" width="50" %}

{% image_custom image="/assets/img/pages/essence/info-box2.png" width="50" %}

**Implementation:**

en-US: `<div class="info"><strong>Info</strong><br />[...]</div>`   
de-DE: `<div class="info"><strong>Info</strong><br />[...]</div>`   

In each case, [...] is a placeholder for the respective text you'd like to add to the box.

### Note boxes

Use note boxes to give relevant information that is useful for the current context but that is not necessary to perform an action. It can e.g. be used to 

- explain the impact of the action,
- point out a specific behavior of an element,
- explain the relation to other features, or
- give deeper information.

**Configuration:**

- Format the text itself as _Paragraph_.
- Write the headline (_Note_) in bold.
- Do not add a punctuation mark behind the headline.

{% image_custom image="/assets/img/pages/essence/note-box1.png" width="50" %}

{% image_custom image="/assets/img/pages/essence/note-box2.png" width="50" %}

{% image_custom image="/assets/img/pages/essence/note-box3.png" width="50" %}

**Implementation:**

en-US: `<div class="note"><strong>Note</strong><br />[...]</div>`   
de-DE: `<div class="note"><strong>Hinweis</strong><br />[...]</div>`  

In each case, [...] is a placeholder for the respective text you'd like to add to the box.

### Caution boxes

Only use caution boxes for selected cases where you need to make the user aware that an action might have a negative impact.

**Configuration:**

- Format the text itself as _Paragraph_.
- Write the headline (_Caution_) in bold.
- Do not add a punctuation mark behind the headline.

{% image_custom image="/assets/img/pages/essence/caution-box1.png" width="50" %}

{% image_custom image="/assets/img/pages/essence/caution-box2.png" width="50" %}

**Implementation:**

en-US: `<div class="caution"><strong>Caution</strong><br />[...]</div>`   
de-DE: `<div class="caution"><strong>Achtung</strong><br />[...]</div>`  

In each case, [...] is a placeholder for the respective text you'd like to add to the box.


