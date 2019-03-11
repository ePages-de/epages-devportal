---
layout: post
title: How to easily manage SSH keys
date: 2019-03-12
header_image: public/ssh-key-management.jpg
header_position: bottom
header_overlay: true
category: tech-stories
tags: ["idoit", "ssh", "development", "tools"]
authors: ["Carsten"]
about_authors: ["cseeger"]
---

In this two-part blog post series we will talk about SSH keys and how to manage a bunch of them. 
You might have used the `ssh-keygen` or similar tools, and created one yourself. 
So you might also know that an SSH key consists of two parts: sth. like `id_rsa` or equal `id_<sth>` files, and a file ending with `.pub`. 
The `.pub` file content can be used to achieve passwordless authentication for SSH by adding the content to a file called `authorized_keys` within the server's `.ssh` directory.
And that's exactly the file we're talking about in this post.

## SSH key management can be annoying

Have you ever thought about how people manage these `authorized_keys` files?
Let's say you have to manage a few hundred servers that different people use, and everyone wants their SSH key deployed to at least one of these servers.
You regulary have to copy and paste some SSH public keys into some `authorized_keys` files on different servers.
Or you have predefined group-specific `authorized_keys` files in a versioning system that will be deployed using an orchestration tool.
Even then you have to change these files everytime people change.
Sometimes this can be annoying.

## Why not automate it?

Why don't we create a tool that generates these files using specific predefinable filters to be able to integrate this into almost any workflow, automation, or integration we want?
Let's think about what features such a tool should have.

Since most of the `authorized_keys` files are deployed by an orchestration tool or maybe an automation pipeline, it should be integrable.

- So we need an API (because APIs are great and easy to integrate in almost everything)
- We should be able to filter some parameters (I think of groups, maybe some label or tag feature, adding people etc.)
- It should have a frontend so that SSH keys can be easily managed
- What about syncing with something that recognizes changes of human resources in the company? Active directory is the magic word here.

But first things first.
Where can we store all that information?

## SSH key and i-doit CMDB

We are a heavy user of [idoit](https://www.i-doit.com/){:target="_blank"} as our central Configuration Management Database (CMDB).
i-doit allows us to sync data from our active directory.
Also we synced all our groups and staff data with it.
Staff and group data is always up to date as we consider HR in and out processes.
If people leave they are removed from active directory groups, and the key file generation will exclude them.
At the same time new people who were added to the groups are included.
This makes the whole group management stuff a lot easier, because we don't have to take care any longer!
If we now put SSH keys on every person, we can filter them by persons and groups, and maybe some additional fields.

## Categorize it!

How do we do this?
It's pretty simple.
We can just add a custom category to the i-doit persons (specific object in the i-doit CMDB).
You can do this in the i-doit configuration (just right click on your name and then on configure if you are an administrator).
The custom categories can be found in the CMDB configuration.
Our new custom category looks something like this:

```
Category:     ssh-keys
Objects:      Persons
Multi-Value:  true
Constant:     C__CATG__CUSTOM_FIELDS_SSHKEYS
```

and fields:
```
ssh-key:  textfield
date:     textfield
label:    textfield
primary:  yes-no-field
```

The primary field will be set by default for the first key you add.
If you add more, you can choose the primary SSH key.
This will be the key that is used if no additional filters are applied.
We also have a label here so we can label different SSH keys for filtering.
The date is used for the creation date of the key (or if that's too long ago, at least the date the key was added to the system).
Maybe we will use this later to remind people to generate a new key after some ... years 😉.

Now we have everything in place to implement our new born baby.
In the follow-up posts we will focus on the implemntation of our API, and discuss some ideas about the frontend part.
Stay tuned.
