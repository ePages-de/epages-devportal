---
layout: beyond-essence
header_image: private/main.jpg
title: Dropdowns
background_image: index.jpg
---

Dropdowns are .
They present a list of options the user can choose from. 

## Use cases

* Dropdowns with default selection

These dropdowns are used to already preselect the most common or the recommended option for the user.

* Dropdown with fixed suggestions

These dropdowns are used to present several option to the user that are all relevant for him.

* Dropdown with filtered suggestions

These dropdowns are used to present a large number of options to the user. By filtering the suggestions it's easier and faster for the user to make their decision or find the required entry.


## Structure

Dropdowns are similar to input fields as they consist of a container, a label, and a drawer.
The label is located near the top of the container.
The drawer is displayed once the dropdown field is selected.
The dropdown fields can vary in width.

In addition to an input field, dropdown fields with default selections include arrows on the very right of the field.

{% image_custom image="/assets/img/pages/essence/dropdowns-arrows.png" width="50" %}



## Position

Dropdown fields are positioned on a card and can be arranged with further dropdown fields or other UI elements such as checkboxes or input fields.

## Behavior

As long as dropdown fields are not selected they behave like input fields.
Once the user clicks or touches the container, the drawer opens.
Depeding on the dropdown type, the drawer appears below or above the dropdown field.
When clicking or touching outside the drawer, it will be closed again.

Besides this shared behavior, the different dropdown fields ....

### Dropdowns with default selection

In the initial state, the container displays the default selection.
After the container or the arrows are clicked or touched, the drawer is opened above the container and the label.
The user can now choose between the different dropdown options.
The currently selected option is marked with a hook on the left.
Once the user selected an option, the drawer is closed and the selected option is displayed in the container.
It is not possible to selected more than one option at the same time.

{% image_custom image="/assets/img/pages/essence/dropdown-default-selection.gif"  width="50" %}

### Dropdowns with fixed suggestions

In the initial state, the container is empty.
After the container is clicked or touched, the drawer is opened below the container.
The drawer lists all available options as a scrollable list.
When selecting one of the options, it is removed from the list, and added to the container.
The users can select as many options as they like.
If all options are selected, the drawer disappears.

The options that were added to the container can be removed by selecting the cross next to the option.
A removed option will appear again in the drawer list.

{% image_custom image="/assets/img/pages/essence/dropdown-fixed-suggestions.gif"  width="50" %}

### Dropdowns with filtered suggestions

In the initial state, the dropdown field is empty.
If the user touched or clicked the container, the dropdown field remains empty and no drawer appears.
Only after the user started typing in the container, a drawer appears below the container.

{% image_custom image="/assets/img/pages/essence/dropdown-suggestions.gif"  width="50" %}

## Copy writing


## Design

Coming soon.


## Difference to radio buttons?

https://blog.prototypr.io/7-rules-of-using-radio-buttons-vs-drop-down-menus-fddf50d312d1