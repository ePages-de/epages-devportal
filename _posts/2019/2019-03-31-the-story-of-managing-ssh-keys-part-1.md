---
layout: post
title: The story of managing ssh keys - part 1
date: 2019-03-31
header_image: public/ssh-key-management.jpg
header_position: bottom
header_overlay: true
category: tech-stories
tags: ["idoit", "ssh", "development", "tools"]
authors: ["Carsten"]
about_authors: ["cseeger"]
---

## SSH key management ... wait what?

This time were talking about a very specific top called ssh-keys and how to manage a bunch of them. 

You maybe used the `ssh-keygen` or similar tools and created one for yourself. 
Your ssh-key contains of two parts sth. like `id_rsa` or equal `id_<sth>` files and a file ending with `.pub`. 
The `.pub` file content can be used to achieve passwordless authentication for ssh by adding the content to a file called `authorized_keys` within the servers `.ssh` directory and this is the file its all about today. 

Did you ever thought about how people manage these `authorized_keys` files?

Let's say you have to manage a few hundred servers that different people use and everyone wants their ssh-key deployed to at least one of the servers.
You have to copy and paste some ssh public keys into some `authorized_keys` files on different servers all the time.
Or you have predefined group specific `authorized_keys` files in a versioning system that will be deployed using an orcestration tool.
Even then you have to change these files everytime if people change.

**Sometimes this can be annoying.**

Let's create a tool that generates these files using specific predefinable filters to be able to integrate this into almost any workflow, automation or integration we want.

## BrAiNsToRmInG

Let's think about what features such a tool should have.

Since most of the `authorized_keys` files are deployed by an orcestration tool or maybe an automation pipeline, it should be integrable.

- so we need an API (because APIs are great and easy to integrate in almost everything)
- it should be filterable by some parameters (I think of groups, maybe some label or tag feature, adding people etc.)
- maybe a frontend so that people can manage there ssh-keys on their own
- What about syncing with something that recognizes changes of human resources in the company? Active Directory is the magic word here.

But first things first.
Where can we store all that information?

## ssh-key and i-doit cmdb

As you may know we are a heavy user of [idoit](https://www.i-doit.com/){:target="_blank"} as our central CMDB.
Idoit gives us the possibility to sync data from our active directory. Also we synced all our groups and persons with it.
Person and group data is always up to date since HR in and out processes are considered.
If people leave they are removed from AD groups and the key file generation will exclude them, also for new people who were added to the groups they are included.
This makes the whole group management stuff a lot easier because we don't have to take care anylonger!
If we now put ssh-keys on every person we could filter them through persons and groups and maybe some additional fields here.

So how do we do this?

Quite easy. We can just add a custom category to our idoit persons.
You can do this in the i-doit configuration (upper right click on your name and on configure if you are an administrator).
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

The primary field will be set by default for the first key you add and if you add more you can choose what your primary ssh-key is.
This will be the key that is used if no additional filters are applied.
We also have a label here so we could label different ssh-keys for filtering.
The date is used for the creation date of the key (or if that's too long ago at least the date the key was added to the system).
Maybe we will use this later to remind people to generate a new key after some ... years ;P.

Now we have everything in place to implement our new born baby.
In part 2 we will dig a bit deeper in the implemntation of our API and discuss some ideas about the frontend part.
