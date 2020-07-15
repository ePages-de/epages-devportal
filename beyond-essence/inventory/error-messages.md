---
layout: beyond-essence
header_image: private/main.jpg
title: Error messages
background_image: index.jpg
---
## General guidelines

Error messages inform the merchant that something went wrong and what to do about it. The wording should be simple and straightforward and use terms that the merchant can easily understand. Try to avoid technical terms and negative wording, e.g. "invalid", "error", "wrong", "failed", "system", "validation", etc. 

Keep in mind that each error message interrupts the merchant's workflow and might lead to the merchant getting frustrated and giving up on their current action, especially when the message is unfriendly and/or unclear. So when writing the text for an error message, focus on the issue at hand and give the merchant helpful guidance on what to do next.

**Be specific**: Whenever possible, use a specific error message for each use case to be as helpful for the merchant as possible. Avoid generic messages like "Something went wrong" (What went wrong? Why? What can the merchant do to make it right?) or "The entered value is invalid" (What is invalid? What are the requirements for a valid entry?). 
If a message really needs to be generic, because it needs to be used for different use cases, write it at least as friendly and helpful as possible.

**Be concise**: Error messages appear in boxes with restricted space. Also, when the merchant receives an error message, they are in the middle of performing an action that is being interrupted by the error. They want to resume their work as quickly as possible and don't want to read lengthy explanations, apologies or instructions.
Brevity should not keep the message from sounding friendly and helpful. Be concise, but don't sound like a robot.

**Be friendly & positive**: Instead of telling the merchant what they can *not* do, be positive and tell them what they can do.
Even when the message needs to be short, don't make it sound threatening or commanding and don't make the merchant feel bad about having made a mistake.

**Do**: You can add up to %{count} products.
**Don't**: You can't add more than %{count} products.

**Do**: Incorrect password. Maybe you mistyped?
**Don't**: Password invalid. Enter correct password.

**Use humour only where appropriate**: Just as the merchant does not want to read through lengthy instructions when encountering an error, they do not want to be made fun of or see the same joke over and over in error messages that may appear more than once.
Humour should be very well dosed and never take the situation lightly. When in doubt, don't use humour. Also: Clarity and usability first. Don't use language that might be witty but prevent any of our merchants from understanding the message.

MAYBE: *"I have a feeling I've seen this email before... would you like to log in instead of signing up?"*

NEVER: *"Oh no. All of your products have been deleted. Well, that's not the end of the world, is it?"*

## Types & Use cases

In the Beyond cockpit we currently use two types of error messages:

* [Toast messages](/beyond-essence/inventory/toast-messages/): For errors that affect the entire workflow. This message is displayed until the error is resolved. Most of the error messages in toast messages are currently unspecific internal error messages.

Example: *Something went wrong. Try again later. If this error persists, contact Support and provide the following identifier:*

* Validation messages: Appear on input fields that cannot be validated or the need to be filled before saving. They always refer to a specific input field or input field array. 

Example (for a field where the merchant enters their custom domain): *"Enter a valid domain without "https" and "www". For example, enter example.com instead of https://www.example.com."*

## Structure

An error message should ideally contain the following three elements. If that's not possible, it should at least contain a combination of no. 1 and 2.

1. Describe the issue: 
Explain in concise and clear language that there is a problem and briefly describe the problem.
2. Provide a solution: 
Let the merchant know what they can do to solve the issue and resume their work. If it's not possible to solve the issue, try to provide alternative actions, e.g. add a link to the help center or ask them to contact support.
3. If there is a logical next step, let the merchant know what it is.

Examples:
*Your session has expired. Please log in again.*
*The sale price must be lower than the original price and the MSRP.*
*Too many active campaigns. Please delete a campaign before adding a new one.*