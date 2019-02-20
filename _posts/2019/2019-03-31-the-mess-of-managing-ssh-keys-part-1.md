---
layout: post
title: The mess of managing ssh keys - part 1
date: 2019-03-31
header_image: public/tbd.jpg
header_position: bottom
header_overlay: true
category: tech-stories
tags: ["idoit", "ssh", "development", "tools"]
authors: ["Carsten"]
about_authors: ["cseeger"]
---

## SSH key management ... wait what ?. 

Remember that stuff you did with `ssh-keygen`.
These `id_rsa` and `id_rsa.pub` files, where the content of the `.pub` file can be used in `authorized_keys` files to achieve passwordless authentication via ssh.

(you are sometimes asked for a password to encrypt your ssh-key but if you have a proper `ssh-agent` this shouldn't happen to often)

Right you remember it, i can see it flickering in the dark places of your brain :D.

Did you ever thought about how people manage these `authorized_keys` files ?

Lets say you have a few hundred servers to manage with different people on it and everyone wants there ssh-key deployed to at least one of the servers. 
All the time you have to copy paste some ssh public key into some `authorized_keys` file on some server.
Or you have predefined group specific `authorized_keys` files in some versioning system that will be deployed using some orcestration tool.
You have to change these files everytime if people change. 
This happens very often here at ePages since most of the systems are department specific.

**Sometimes this can be annoying.**

What a nice world would it be if there where some central ssh-key storage and easy ways to generate `authorized_keys` files. 

Yeah thats at least what i thought. 

So lets build one.

## BrAiNsToRmInG

Lets think about this, what features should such a tool have ?

Since most of the `authorized_keys` files are deployed by some orcestration tool or maybe some automation pipeline, it should be integratable.

- so we need an API (because APIs are great and easy to integrate in almost everything)
- it should be filterable by some parameters ( i think of groups, maybe some label or tag feature, adding people etc.)
- maybe a frontend so people can manage there ssh-keys 
- what about syncinc with something that recognizes changes in human ressource of the company ? Active Directory is the magic word here

But first things first. 
Where can we store all that information.

## ssh-key and i-doit cmdb

As you may know we are a heavy user of [idoit](https://www.i-doit.com/) as our central CMDB storing many of our data. 
Idoit gives us the possibility to sync data from our active directory. 
And we synced all our groups and persons with it.
Person and group data are always up to date since HR in and out processes are considered.
If people leave they are removed from AD groups and the key file generation will exclude them, also for new people who were added to the groups they are included.
This makes the whole group management stuff a lot easier because we dont have to take care anymore !
If we now put ssh-keys on every person, we could filter them through persons and groups and maybe some additional fields here.

So how we do this ?

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
The date is used for the creation date of the key (or if thats to long ago at least the date the key was added to the system). 
Maybe we will use this later to remind people to generate a new key after some ... years ;P.

We now have everything in place to implement our new born baby in part 2.
