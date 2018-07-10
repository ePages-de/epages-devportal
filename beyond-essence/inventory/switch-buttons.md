---
layout: page
header_image: private/main.jpg
title: Switch buttons
background_image: index.jpg
---

A Switch button represents a physical switch that allows merchants to turn features on or off, just like when using a light switch.
The general use of a switch button is to represent an action.
Toggling the switch button provides immediate results.

#### Disabled switch button

{% image_custom image="/assets/img/pages/essence/switch-button-off.png" width="100" %}

#### Enabled switch button

{% image_custom image="/assets/img/pages/essence/switch-button-on.png" width="100" %}

## Use cases

In the Beyond cockpit we use switch buttons for binary settings when changes become effective immediately after the merchant has made them.

Implement switch buttons to give merchants two mutually exclusive options:

* off: the feature is disabled/inactive
* on: the feature is enabled/active

Thus, a switch button makes particularly clear if a feature is active or not.

## Structure

A switch button looks like an on/off switch.
It is characterized by an additional icon that clearly shows if the option is enabled or disabled.
This can be either a green checkmark, if a feature is active, or a beige cross, if a feature is inactive.
What's more, a switch button comes with a UI label on the right side, that clearly explains the action that can be taken.

An inactive switch button is displayed without any content.
Whereas an active switch button comes with additional content that is displayed prominently in a beige-highlighted area right below the switch button.

## Position

Switch buttons may be positioned on a card together with further UI elements that relate to a specific feature. 

## Behavior

By toggling the switch button it changes its state:

{% image_custom image="/assets/img/pages/essence/switch-button.gif" width="100" %}

## Choosing between switch button and checkbox

For some actions, either a switch button or a checkbox might work.
To decide which component would work better, here are some clues:

* Use a switch button for binary settings when actions become effective immediately after the user made them.
* Use a switch button if the feature has a significant effect on the users work and further work steps.
* Use checkboxes when the user can select multiple items that are related to a single setting or feature.
* Use checkboxes for optional or additional items.
* Use a checkbox when the user has to perform extra steps for changes to be effective.

## Design

Coming soon.