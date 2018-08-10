---
layout: page
header_image: private/main.jpg
title: Switch buttons
background_image: index.jpg
---
{% image_custom image="/assets/img/pages/essence/switch-button-on-off.png" width="25" align="right" %}
A switch button works like a physical switch, that can be used e.g. to turn the light on and off.
In the cockpit we display switch buttons to enable merchants to turn a feature on or off, and to enhance cards with additional features.

The UI element "checkbox" is used quite similarly.
Check the section "Choosing between switch button and checkbox", and have a look at the inventory entry [Checkbox](/beyond-essence/inventory/checkbox/) to find the right element for your use case.

## Use cases

In the cockpit, switch buttons have two main use cases:

### Activate a feature

Some features need to be enabled by merchants before they can be used.
In this context, a feature is defined as a functionality that has an impact on the whole workflow as additional processes are activated in the background.

**Example: Activate stock level tracking**

* When activating the stock level tracking for a product, a new process is initiated.
The stock is stored and then updated automatically or manually by the merchant.
* The feature provides a new process, and therefore has a major impact on the merchant's workflow.
* The feature might also be used on further pages in the cockpit.

### Enhance cards with extensions

The cockpit will be customizable.
In order to allow merchants to adapt the cockpit to their needs, they can turn features on or off.
This will be possible, for example, on single cards.

**Example: Add the feature "product properties"**

* If the feature is enabled, the merchant can add a list of product properties to use them e.g. in search filters.
* If the feature is disabled, the merchant doesn't see this option, but can only use the description. For merchants with few and simple products this is sufficient, and the UI is less cluttered.

The option is directly available.
There is no need to confirm the action.

{% image_custom image="/assets/img/pages/essence/switch-button_card_feature.png" width="50" align="center" %}

💡 _Note: This use case is not yet implemented in the cockpit._

### Other

Another example is the activation of additional variants for a product.
If this feature is activated, the whole structure and workflow for this specific product will change.

## Structure

A switch button looks like a classical on/off switch.
The two different states give a clear visual feedback so that the merchant is always aware if the switch is turned on or off.

* A checkmark on a green background, toggled to the right, represents an active feature.
* A cross on a beige background, toggled to the left, represents a deactivated feature.

On the right side of the switch button, a label clearly explains the action that can be taken.

Depending on the complexity of the feature, additional content is shown below the activated switch button.

{% image_custom image="/assets/img/pages/essence/switch-button-with-content.png" width="100" align="center" %}

For further information on the exact visualisation of addtional content, consult the design section.

## Position

Switch buttons may be positioned on a card together with further UI elements that relate to a specific topic.

## Behavior

By toggling the switch button it changes its state:

{% image_custom image="/assets/img/pages/essence/switch-button.gif" width="100" %}

## Choosing between switch button and checkbox

Switch buttons and checkboxes seem to be quite similar as they are both used to activate some sort of "settings".

To decide when a switch button is used, here are some clues:

* Use a switch button to allow merchants to enable features that have a significant effect on their workflow.
* Use a switch button to enhance a card with additional content.
* Don't use a switch button to activate small and distinct options, like an additional price field.
* Don't use a switch button, when the merchant needs to select multiple items in a list that need to be saved afterwards.

## Copy writing

Coming soon.

## Design

Coming soon.
