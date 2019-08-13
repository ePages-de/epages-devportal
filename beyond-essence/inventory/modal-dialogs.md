---
layout: beyond-essence
header_image: private/main.jpg
title: Modal dialogs
background_image: index.jpg
---

Modal dialogs display new content to the user without taking them to a different view.
Users need to interact with the modal dialog before continuing with further tasks.

## Use cases

In the Beyond cockpit we provide two types of modal dialogs.

* Confirmation dialogs are used to validate a user's decision.

{% image_custom image="/assets/img/pages/essence/modal-dialogs-confirmation.png" width="50" %}

* Input dialogs include input fields, checkboxes, or other UI elements the user can interact with.

{% image_custom image="/assets/img/pages/essence/modal-dialogs-inputs.png" width="50" %}

## Structure

Modal dialogs consist of a container, a close icon, and two buttons.
Optionally, they can also contain a title, and further UI elements like checkboxes, or input fields.
The close icon is always displayed in the upper right corner of the container.

The two buttons are located at the lower right corner of the container.
In confirmation dialogs, these buttons are a danger button, and a default button.
In input dialogs, a primary button is used instead of a danger button.

Exceptions:

* There are cases where the two buttons are separated from each other, e.g. when another UI element such as a link should be located next to the primary button.
The default or warning button is then moved to the lower left corner of the container.

* In some modal dialogs no button, or only the primary button is displayed.

## Position

Modal dialogs are opened prominently as an overlay in the center of a browser window.

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

If available, use a brief but descriptive title for modal dialogs.
Users should clearly understand what happens when interacting with this element.

### Confirmation dialogs

Titles of this type are:

* Descriptive but concise
* Neutral and without ambiguity

```
Delete product?
```

### Input dialogs

The copywriting of the element that triggers the modal dialog is taken over for the modal dialog title.
Meaning if the user selected the button _Process returns_, the related modal dialog title will also be _Process returns_.
This way the connection between the two elements is clear and traceable.

```
Process returns
Process order cancelation
Page settings
```

Exceptions: 

* If the element that triggers the modal dialog is an icon, the modal dialog title is the same as the hover text of the icon.
* If the element can trigger two different modal dialogs, the title of the modal dialog is not taken over from the element.
It rather concisely describes the purpose of the respective modal dialog.
The `Available apps` icon in the topbar e.g. triggers a modal dialog with the title `Explore the world of apps` if no apps were installed yet.
If there were already apps installed, it triggers a modal dialog with the title `My apps` .

## Design

Coming soon.