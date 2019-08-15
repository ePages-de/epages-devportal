---
layout: beyond-essence
header_image: private/main.jpg
title: Input fields
background_image: index.jpg
---

Input fields belong to the interaction controls.
With input fields users can enter and edit text.

## Use cases

Input fields allow users to enter text into the UI.
In the Beyond cockpit we provide various types of input fields:

* Simple input fields

{% image_custom image="/assets/img/pages/essence/input-fields-simple.png" width="40" lightbox %}

* Input fields with placeholder text

{% image_custom image="/assets/img/pages/essence/input-fields-placeholder.png" width="50" lightbox %}

* Input fields that validate numbers and units

{% image_custom image="/assets/img/pages/essence/input-fields-number-unit.png" width="40" lightbox %}

* Input fields with suggestions

{% image_custom image="/assets/img/pages/essence/input-fields-suggestion.png" width="50" lightbox %}

* Input fields with preselected proposals

{% image_custom image="/assets/img/pages/essence/input-fields-preselection.gif" width="50" lightbox %}

* Text areas

{% image_custom image="/assets/img/pages/essence/input-fields-text-area.png" width="50" lightbox %}

## Structure

Input fields consist of a container and a label.
The label is located near the top of the container.
The input field can vary in width.

In some use cases a checkbox with label is placed near the top of the container instead of just a label.

## Position

Input fields are positioned on a card and can be arranged with further input fields or other UI elements such as checkboxes or links.

{% image_custom image="/assets/img/pages/essence/input-fields-position.png" width="100" lightbox %}

## Behavior

In general the user clicks or touches the container and is able to make an entry.

Depending on the type, input fields can have a different behavior:

* Simple input fields: the user can type short text, such as a name, an address or a manufacturer by using letters, numbers, and special characters.

* Input fields with placeholder text: the user can enter longer information, such as marketing texts or special infomation on invoice documents by using letters, numbers, and special characters. In order for the user to get a better idea of what they should type, the UI provides placeholder text. This placeholder text always starts with `e.g.` so that the user doesn't take the the input as set.

* Input fields that validate numbers and units: the user can only enter numbers and units. If they enter text or special characters and leave the input field, the entry will be delete from the field. If they confirm the entry, a validation message appears with an info of what they should enter.

* Input fields with suggestions: the user can type text and the software suggests entries they can choose from. These suggested entries have been made somewhen by the user. Users can type letters, numbers, and special characters.

* Input fields with preselected proposals: the user can type text and the software suggests entries they can choose from. These entries are proposals from the software. Users can type letters, numbers, and special characters.

* Text areas: the user can type long text, such as a product description, a meta description, or product characteristics by using letters, numbers, and special characters. The size of the text area can be adjusted by the user.

## Copy writing

The text for the input field label is supposed to inform the user about what the field should include.

* Clear and descriptive.
* Keep the UI label short and sweet.

```
Name
Manufacturer
Price
```

## Design

Coming soon.