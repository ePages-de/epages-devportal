---
layout: beyond-essence
header_image: private/main.jpg
title: Dropdowns
background_image: index.jpg
---

Dropdowns belong to the interaction controls.
They present a list of fixed options the user can choose from.

## Use cases

In the Beyond cockpit we provide three types of dropdowns:

* Dropdowns with default selection. Are used to already preselect the most common or the recommended option for the user.

* Dropdowns with filtered suggestions. Are used to present a large number of options to the user. By filtering the suggestions it's easier and faster for the user to make their decision, or find the required entry.

## Structure

Dropdowns are similar to input fields as they consist of a container, and a label.
The label is located near the top of the container.
Additionally, each dropdown has a drawer that is displayed once the dropdown is selected.
Dropdowns can vary in width.

Dropdowns with default selection include arrows on the very right of the container.

{% image_custom image="/assets/img/pages/essence/dropdowns-arrows-new.png" width="50" %}

## Position

Dropdowns are positioned on a card and can be arranged with further dropdowns or other UI elements such as checkboxes or input fields.

## Behavior

The two types of dropdowns behave differently.

### Dropdowns with default selection

In the initial state, the container displays the default selection.
After the container or the arrows are clicked or touched, the drawer is opened above the container and the label.
The user can now choose between the different dropdown options.
The currently selected option is marked with a hook on the left.
Once the user selected an option, the drawer is closed and the selected option is displayed in the container.
It is not possible to selected more than one option at the same time.
The drawer can be closed at any time by clicking or touching outside the drawer.

{% image_custom image="/assets/img/pages/essence/dropdown-default-selection.gif"  width="50" %}

### Dropdowns with filtered suggestions

In the initial state, the dropdown field is empty.
If the user touches or clicks the container, the dropdown field remains empty and no drawer appears.
Only after the user started typing in the container, a drawer appears below the container.
The drawer displays all options that match the entry of the user as a scrollable list.
It is automatically updated if the entry is changed or extended.
If no options match the entry, the drawer disappears.

Once the user selected an option, the drawer disappears, and the option is added to the container.
When typing again, the user can select more options.
The drawer can be closed at any time by clicking or touching outside the drawer.

The options that were added to the container can be removed by selecting the cross next to the option.
A removed option will appear again in the drawer list.

{% image_custom image="/assets/img/pages/essence/dropdown-suggestions.gif"  width="50" %}

## Copy writing

Each dropdown comes with a clear and precise label, that describes what the user needs to select in the dropdown.

```
Reference unit
Tax class
Select countries
```

The options in the drawer are short and sweet as the context is already provided in the label.

```
1 l 
Standard
United Kingdom (GB)
```

## Design

Coming soon.