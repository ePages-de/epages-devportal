---
layout: page
header_image: private/main.jpg
title: Switch buttons
background_image: index.jpg
---

A Switch button represents a physical switch that allows merchants to turn features on or off, just like when using a light switch.
The general use of a switch button is to represent an action.
Toggling the switch button provides immediate results.

#### Feature disabled 

{% image_custom image="/assets/img/pages/essence/switch-button-off.png" width="100" %}

#### Feature enabled 

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

Switch buttons may be positioned on a card togehter with further UI elements that relate to a specific feature. 

## Behavior

* Toast messages fly into the screen from the right side.
* Multiple toast messages are displayed one below the other.

Depending on the type of message, notifications disappear automatically or have to be actively closed by the merchant.

* Success messages automatically disappear after XX seconds.
* Information messages automatically disappear after XX seconds.
* Error messages are displayed until the error has been resolved.

## Choosing between switch button and checkbox

## Design

Coming soon.