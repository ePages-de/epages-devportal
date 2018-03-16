---
layout: page
header_image: private/main.jpg
title: Toast messages
background_image: index.jpg
---
{% image_custom image="/assets/img/pages/essence/example_toasts.png" width="30" align="right" %}
Toast messages provide brief feedback about an action through a message. The aim is to quickly inform the merchant about important actions that he or the system performed.

## Usage & types
In the Beyond cockpit we provide four types of toast messages:

* **Success**, e.g. "Product created"
* **Information**, e.g. "Incoming order"
* **Error**, e.g. "No network connection"

{% image_custom image="/assets/img/pages/essence/toast_structure.png" width="30" align="right" %}
## Structure
Toast messages always contain an icon, indicating the message type, and a short sentence stating the feedback for the users.
A toast message may contain a single action, e.g. "Open".

## Placement
Toast messages appear at the upper right corner of the screen.
{% image_custom image="/assets/img/pages/essence/notification_success.gif" width="50" %}

## Behavior
* Toast messages swipe in from the right to the left.
* Multiple toast messages are displayed below each other.

Depending on the type of message, the notification disappear automatically or need to be closed by the merchant.

* Success messages automatically disappear after XX seconds.
* Information messages do not disappear automatically, but need to be closed by the merchant.
* Error messages are shown until the error has been resolved.


## Copy rules
* The whole content is as short as possible.
* The body text neutrally describes the action.
* The call-to-action links describe the next action.  
* Be as precise as possible (Do not always use the verb save, but rather create/update)

## Design
