---
layout: beyond-essence
header_image: private/main.jpg
title: Dropdowns
background_image: index.jpg
---

Dropdowns belong to the interaction controls.
They present a list of fixed options the user can choose from.

## Use cases

Dropdowns are used to already preselect the most common, or the recommended option for the user by still giving them the chance two select another option.

## Structure

Dropdowns consist of a container, a label, a drawer, and arrows.
The label is located near the top of the container, whereas the arrows are located at the very right of the container.
The drawer is only visible once the dropdown is selected.

Dropdowns can vary in width.

Exception: The pagination dropdown does not contain a label.

{% image_custom image="/assets/img/pages/essence/dropdowns-pagination.png" width="50" %}

## Position

Dropdowns are positioned on a card and can be arranged with further dropdowns or other UI elements such as checkboxes, links, or input fields.

Exception: The pagination dropdown is not located on a card but below one.

## Behavior

In the initial state, the container of a dropdown displays the default option.
After the container or the arrows are clicked or touched, the drawer is opened below the label but it overlays the container.
The user can now choose between the different dropdown options.
The currently selected option is marked with a hook on the left.
Once the user selected an option, the drawer is closed and the selected option is displayed in the container.
It is not possible to select more than one option at the same time.
The drawer can be closed at any time by clicking or touching outside the drawer.

{% image_custom image="/assets/img/pages/essence/dropdown-default-selection.gif"  width="50" %}

## Copy writing

Each dropdown comes with a clear and precise label, that describes what the user needs to select in the dropdown.

```
Tax class
```

The options in the drawer are short and sweet as the context is already provided in the label.

```
Standard
Reduced
Tax-exempt
```

## Design

Coming soon.