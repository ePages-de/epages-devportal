---
layout: beyond-essence
header_image: private/main.jpg
title: Buttons
background_image: index.jpg
---

Buttons are interactive elements and belong to the action controls.
They allow the user to directly communicate with the user interface.

## Use cases

With buttons we allow the user to take an action upon click or touch.

We distinguish between the following types of buttons:

{% image_custom image="/assets/img/pages/essence/buttons-overview.png" width="50" lightbox %}

Buttons appear at various places throughout the UI, such as:

* Cards
* Dialogs
* Settings layers
* Top bar
* Bottom bar
* Themes
* Editor
* Empty states

## Structure

Buttons are characterized by a certain geometric shape or border.
Their color clearly stands out from the surrounding color.
The UI label appears on the button, and clearly explains what the button will do.
In exeptional cases or where the situation requires it, buttons appear with an icon instead of a UI label.

## Position

Buttons are positioned where users can easily find them or expect to see them.
The position of the buttons should be intuitive for the user and reflect a natural conversation between the user and the software.
The order and position of buttons is especially important when they come in pairs, such as *Cancel* and *Save*.
If the user has the choice between two buttons, we distinguish between `primary` and `default`.
The primary button is the one that completes the user's task, whereas the default button has less importance and is rather counterproductive for task completion.

When allocating buttons in pairs, the primary button is always located on the right side, the default button on the left side:

{% image_custom image="/assets/img/pages/essence/buttons-primary-secondary.png" width="20" lightbox %}

There are cases where those buttons are separated from each other, e.g. when the primary button comes with an informational text.

{% image_custom image="/assets/img/pages/essence/buttons-separated.png" width="40" lightbox %}

There are use cases, where buttons can come in 3, such as *delete*, *cancel*, and *publish* in the bottom bar.
The `danger` button is then placed on the left side, while `primary` and `default` button are positioned as a pair on the right side.

**Typical positions for buttons:**

*In the topbar*

{% image_custom image="/assets/img/pages/essence/buttons-topbar.png" width="50" lightbox %}

*In the bottom bar*

{% image_custom image="/assets/img/pages/essence/buttons-bottombar.png" width="50" lightbox %}

*On a modal dialog*

{% image_custom image="/assets/img/pages/essence/buttons-modal-dialog.png" width="50" lightbox %}

*On an empty state*

{% image_custom image="/assets/img/pages/essence/buttons-empty-state.png" width="30" lightbox %}

*On cards*

{% image_custom image="/assets/img/pages/essence/buttons-card.png" width="50" lightbox %}

## Behavior

Clicking or touching a button carries out a specific action, e.g. *Cancel* will cancel an action, *Add product* will add a product to the portfolio, or *Save* will store the data a user entered.
Depending on the use case or implementation, clicking a button is sometimes followed by a modal dialog, asking the user if they really want to carry out that action and giving them the chance to cancel.

## Copy writing

Label the button with what it does, and clearly describe it's action.
Users should clearly understand what happens when they click a button.

* Clear and precise.
* Use action verbs.
* Use the active imperative.

```
Save
Cancel
Delete
Add product
Add payment method
Process order cancelation
```

## Design

Coming soon.