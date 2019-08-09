---
layout: beyond-essence
header_image: private/main.jpg
title: Modal dialogs
background_image: index.jpg
---

Modal dialogs display new content to the user without taking them to a different view.
Users need to interact with the modal dialog before continuing further tasks.

## Use cases

In the Beyond cockpit we provide two types of modal dialogs:

* Confirmation dialogs. Are used to validate a user's decision.

{% image_custom image="/assets/img/pages/essence/modal-dialogs-confirmation.png" width="50" %}

* Input dialogs. Include input fields, checkboxes, or other UI elements the user can interact with.

{% image_custom image="/assets/img/pages/essence/modal-dialogs-inputs.png" width="50" %}

## Structure

Modal dialogs consist of a container, a close icon, and two buttons.
One of these buttons is always a _Cancel_ button.
The second button depends on the specific use case.

Both buttons are located at the lower right corner of the container whereas the close icon is displayed in the upper right corner.

Optionally, modal dialogs can also contain a title, and further UI elements like checkboxes, or input fields.

## Position

Modal dialogs are opened prominently as an overlay in the middle of a browser window.

## Behavior

Modal dialogs only open if the user interacted with an element of the software, e.g. after selecting a button.
When triggered, the dialog is opened as an overlay in the current view and tab.
The view itself is still visible in the background but it is darkened.
By darkening the background, the user's attention is focused on the modal dialog.
Furthermore, it signals that the user currently cannot interact with elements in the background.

If the modal dialog contains other UI elements the user can interact with, they behave as on regular views.

Modal dialogs remain open until the user saved, confirmed, or took further required actions.
The user can actively close the modal dialog by:
* selecting the close icon,
* selecting the _Cancel_ button,
* selecting the ESC key on the keypad,
* or clicking, or touching outside the modal dialog.

## Copy writing

Users should clearly understand what happens when they interact with the modal dialog.
That's why, if available, titles should briefly but clearly summarize the purpose of the dialog.

* Descriptive but concise
* Neutral and without ambiguity

```
Delete product?
Process returns
Page settings
```

## Design

Coming soon.