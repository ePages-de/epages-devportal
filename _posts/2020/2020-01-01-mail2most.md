---
layout: post
title: How to get emails to speak "Mattermost"
date: 2020-01-21
header_image: public/mail2most.png
header_position: bottom
category: tech-stories
tags: ["email", "mattermost", "chattools", "chatbots", "development", "tools"]
authors: ["Carsten"]
about_authors: ["cseeger"]
---

Welcome back to a new blogpost for today about a smart little tool called Mail2Most.
This tool connects email servers with a chat system called Mattermost.

## Mattermost

[Mattermost](https://mattermost.com/){:target="_blank"} is a chat tool which can be self hosted.
Also it allows us to protect our internal communication by encryption. 
Due to that and other possibilities we decided to use it some years ago .


## Mail2Most

{% image_custom image="https://user-images.githubusercontent.com/13348918/60437141-ff1b5500-9c0d-11e9-913f-ae7c4a034b10.png" width="50" lightbox %}

You may also know the problem of having a bunch of email accounts that you maybe use for logging things, support questions or other stuff that you do not see directly. 
You know that emails are a mess sometimes.
So why not filter these emails and send them directly to certain channels or users of your chat system, because that's what people usually use today ... Chats :D.
That is exactly what [Mail2Most](https://github.com/cseeger-epages/mail2most){:target="_blank"} does.
Before I created Mail2Most we used a similar system called [mattermail](https://github.com/rodcorsi/mattermail){:target="_blank"}. It did the job quite well but it was archived for over a year ago. Also it didn't support some of the things we need.
So I did what I always do when there isn't a tool that does the job I wanted it to do: I wrote it from scratch.
That brings us back to our Mail2Most.

## How to use it

Using Mail2Most isn't that hard.
You can just download the [latest release](https://github.com/cseeger-epages/mail2most/releases){:target="_blank"} and check the [example configuration](https://github.com/cseeger-epages/mail2most/blob/master/conf/mail2most.conf){:target="_blank"}.
You can start with Mail2Most by configuring a default profile which provides reusable defaults for your actual profiles.
Of course such a profile needs a configuration for your mailserver and your Mattermost since it needs to read emails and send parts of them to your Mattermost server.
Also you can define filters for your emails that allows you to:

- filter for specific **folders**
- only send emails when they are flaged as **unseen**
- filter by **From** and **To** fields
- filter by **subject**
- or just send emails that are not older than a specific **time range**

For your Mattermost server you can define:

- **channels** to send messages to
- **users** to send messages to
- if you only want to send the **subject** of the email or including the **body** too
- **strip HTML tags** for some more security if you want to
- messages start with the senders address (default setting) which can be disabled also

For authentication it supports normal username/password as well as oauth using a personal access token.

On the email side you just need to provide the credentials. By default the Imap connection is TLS encrypted which can (but should never) be disabled.
Also you can set the email server to read-only which prevents Mail2Most from setting email flags.

## profiles we need more profiles

When you configured the defaults you can reuse these defaults (or overwrite them) in your actual profiles.
If you just want to use the defaults as they are just create an empty profile.

Multiple profiles are possible as well. So you can create different filters for same or different email servers or combine any configuration possibilities as you want.

## Can I use it? Is it free?

The whole project is open-source and licensed under [MIT](https://github.com/cseeger-epages/mail2most/blob/master/LICENSE){:target="_blank"}. You can even reuse the code if you want to.
Of course it's free as well :P.
Mail2Most can be run as it is or by using docker, docker-compose or systemd. In the future I will provide a helm configuration also to run it in kubernetes.
If you find bugs, have questions or want more features simply open an [issue](https://github.com/cseeger-epages/mail2most/issues){:target="_blank"} or drop me a [pull request](https://github.com/cseeger-epages/mail2most/pulls){:target="_blank"}.

Feel free to check out the [github repo](https://github.com/cseeger-epages/mail2most){:target="_blank"}.

Thank you! As always it was a pleasure to have you here at our epages developer blog. See you soon.
