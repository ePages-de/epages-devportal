---
layout: beyond-essence
header_image: private/main.jpg
title: Error messages
background_image: index.jpg
---
## General guidelines

Error messages inform the merchant that something went wrong and what they can do about it. The wording should be simple and straightforward and use terms that the merchant can easily understand. Try to avoid technical terms and words that may have a negative connotation, e.g. "invalid", "error", "wrong", "failed", "system", "validation", etc. 

Keep in mind that each error message interrupts the merchant's workflow and might lead to the merchant getting frustrated and giving up on their current action, especially when the message is unfriendly and/or unclear. So when writing the text for an error message, focus on the issue at hand and give the merchant helpful guidance on what to do next.

**Be specific**: Whenever possible, use a specific error message for each use case to be as helpful for the merchant as possible. Try to avoid generic messages like "Something went wrong" (What went wrong? Why? What can the merchant do to make it right?) or "The entered value is invalid" (Why is it invalid? What are the requirements for a valid entry?). 
If a message really needs to be generic, because it needs to be used for different use cases or because the error can't be defined any further, write it at least as friendly and helpful as possible.

**Be concise**: Error messages appear in boxes with restricted space. Also, when the merchant receives an error message, they are in the middle of performing an action that is being interrupted by the error. They want to resume their work as quickly as possible and don't want to read lengthy explanations, apologies or instructions.
Brevity should not keep the message from sounding friendly and helpful, though. Be concise, but don't sound like a robot.

**Be friendly & positive**: Instead of telling the merchant what they can *not* do, be positive and tell them what they *can* do.
Even when the message needs to be short, don't make it sound threatening or commanding and don't make the merchant feel bad about having made a mistake.

DO: You can add up to %{count} products.

DON'T: You can't add more than %{count} products.

DO: Incorrect password. Maybe you mistyped?

DON'T: You've entered an incorrect password! Enter the correct password without typos.

**Use humour only where appropriate**: Just as the merchant does not want to read through lengthy instructions when encountering an error, they do not want to be made fun of or see the same joke over and over in error messages that may appear more than once.
Humour should be very well dosed and never take the situation lightly. When in doubt, don't use humour. Also: Clarity and usability first. Don't use language or references that might be witty but prevent any of our merchants from understanding the message.

MAYBE: *"I have a feeling I've seen this email before... would you like to log in instead of signing up?"*

RATHER NOT: *Unable to save changes. But the force will be with you. Always.*

NEVER: *"Oh no. All of your products have been deleted. Well, that's not the end of the world, is it?"*

## Types & Use cases

In the Beyond cockpit we currently use two types of error messages:

* **[Toast messages]**(/beyond-essence/inventory/toast-messages/): For errors that affect the entire workflow. These messages are displayed until the error is resolved. Most of the error messages shwon in toast messages are currently unspecific internal error messages.

Example: 
{% image_custom image="/assets/img/pages/essence/example_error_toast.png" width="50" align="center" %}

* **Validation messages**: Appear on input fields that cannot be validated or the need to be filled before saving. These messages always refer to a specific input field or input field array.

Example: {% image_custom image="/assets/img/pages/essence/example_validation_message.png" width="50" align="center" %}

## Structure

An error message should ideally contain the following elements:

1. Describe the issue: 
Explain in concise and clear language that there is an issue and/or briefly describe the issue.
2. Provide a solution: 
Let the merchant know what they can do to solve the issue and resume their work. If it's not possible to solve the issue, try to provide alternative actions, e.g. add a link to the help center or ask them to contact support.

Examples:
*Your session has expired. Please log in again.*
*The sale price must be lower than the original price and the MSRP.* (This one is a sort of combination of 1 & 2)
*Too many active campaigns. Please delete a campaign before adding a new one.*
*Something went wrong. Please try again later. If this error persists, contact Support.*