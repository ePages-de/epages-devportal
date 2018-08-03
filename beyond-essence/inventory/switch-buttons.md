---
layout: page
header_image: private/main.jpg
title: Switch buttons
background_image: index.jpg
---
{% image_custom image="/assets/img/pages/essence/switch-on-off.png" width="25" align="right" %}
A switch button works like a physical switch, which can be used to e.g. turn the light ON and OFF. In the cockpit we show switch buttons, when a merchant can turn a feature on or off and when he can enhance cards with additional features.

The UI element "checkbox" is used quite similar. Check the section "Choosing between switch button and checkbox" and have look in the inventory entry for checkbox to find the right element for your use case.

## Use cases

**Turn a feature on / off**

has an big impact on further workflows: example stock level tracking

**Enhance cards with extensions**
The cockpit will be customizable. To allow merchants to adapt the cockpit to their needs, they can turn features on or off. This will for example be possible on single cards.

Example: Add the feature "product properties"

* If the feature is enabled, the merchant can add a list of product properties to e.g. use them in search filters.
* If the feature is disabled, the merchant doesn't see this option, but can only use the description. For merchants with few and simple products this is sufficient and the UI is less cluttered.





💡 _Note: this use case is not available yet._


## Structure

A switch button looks like an on/off switch.
It is characterized by an additional icon that clearly shows if the option is enabled or disabled.
This can be either a green checkmark, if a feature is active, or a beige cross, if a feature is inactive.
What's more, a switch button comes with a UI label on the right side, that clearly explains the action that can be taken.

An inactive switch button is displayed without any content.
Whereas an active switch button comes with additional content that is displayed prominently in a beige-highlighted area right below the switch button.

Implement switch buttons to give merchants two mutually exclusive options:

* off: the feature is disabled/inactive
* on: the feature is enabled/active

Thus, a switch button makes particularly clear if a feature is active or not.

that the states of the switch should be visibly clear and distinctive so that the merchant could avoid applying effort to understand if the option is active or not

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
