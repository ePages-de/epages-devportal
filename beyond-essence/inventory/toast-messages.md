---
layout: beyond-essence
header_image: private/main.jpg
title: Toast messages
background_image: index.jpg
---
{% image_custom image="/assets/img/pages/essence/example_toasts.png" width="30" align="right" %}
Toast messages briefly provide feedback about an action through a short message.
Merchants are quickly informed about important actions that they or the system performed.

## Use cases

In the Beyond cockpit we provide three types of toast messages:

* Success. Appears if an action or operation was successfully completed.
* Information. Appears if an event occurred.
* Error. Appears in case of errors.

{% image_custom image="/assets/img/pages/essence/toast_structure.png" width="30" align="right" %}

## Structure

Toast messages are characterized by the following elements:

* an icon indicating the message type
* a short sentence stating the feedback for the merchant
* optional: the next action.

## Position

Toast messages appear at the upper right corner of the screen.
{% image_custom image="/assets/img/pages/essence/notification_success.gif"  width="50" %}

## Behavior

* Toast messages fly into the screen from the right side.
* Multiple toast messages are displayed one below the other.

Depending on the type of message, notifications disappear automatically or have to be actively closed by the merchant.

* Success messages automatically disappear after XX seconds.
* Information messages automatically disappear after XX seconds.
* Error messages are displayed until the error has been resolved.

## Copy writing

Reduced and efficient.

* Concise. Keep the content short and sweet.
* Precise. Put your message in a nutshell.
* Neutral. Get the message across in a factual, but not emotional style.

```
Product created | Create next
Incoming order | View
No network connection
```

Exception: In case merchants have been through more complex configuration steps, reward them with a positive tone.

```
Congrats! Successfully connected with Google Shopping.
```

## Design

A toast message is constructed as follows: At the beginning it comes with a white e.g. checkmark icon on a green background, directly followed by a gray text on white background. In additation there is also a gray "close icon" right aligned. 
In general all three ingredients are vertically centered.

{% image_custom image="/assets/img/pages/essence/toast_message.png" width="30" %}