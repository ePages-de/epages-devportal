---
layout: page
header_image: private/main.jpg
title: Toast messages
background_image: index.jpg
---
{% image_custom image="/assets/img/pages/essence/example_toasts.png" width="30" align="right" %}
Toast messages provide brief feedback about an action through a message at the upper right corner of the screen.

## Usage
In the Beyond cockpit toast messages are used for four use cases:

* **Success**, e.g. "Product created"
* **Information**, e.g. "Incoming order"
* **Warning**, e.g.  
* **Error**, e.g. "No network connection"


## Structure
Toast messages always contain an icon, indicating the message type, and a short sentence stating the feedback for the users.
A toast message may contain a single action, e.g. "Open".


## Behavior
{% image_custom image="/assets/img/pages/essence/notification_success.gif" width="50" %}

* Toast messages swipe in from the right to the left.
* Multiple toast messages are displayed below each other.

Depending on the type of message, the notification disappear automatically or need to be closed by the merchant.

* Success messages automatically disappear after XX seconds.
* Information messages do not disappear automatically, but need to be closed by the merchant.
* Error messages are shown until the error has been resolved.


## Wording guidelines
### Body text
Use dots for whole sentences incl. at least subject, predicate, object

### Call-to-action links
Be as precise as possible (Do not always use the verb save, but rather create/update)

## Design guidelines
