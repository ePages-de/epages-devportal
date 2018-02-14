---
layout: post
title: Hamburg Kubernetes Meetup - Building a Multi-Tenant Kubernetes Container Cloud
date: 2018-02-15
header_image: public/TODOTODOTODOTODOTODOTODOTODOTODOTODOTODO.jpg
header_position: center
category: events
tags: ["kubernetes", "meetup"]
authors: ["Oliver Z.", "Dirk"]
---

Smooth sailing with Kubernetes?
That is certainly possible, except if you want to setup a multi-tenant Kubernetes container cloud on your own hardware, like [Christian](https://twitter.com/chrishuen) [Hüning](https://github.com/christianhuening) and the Hamburg University of Applied Sciences (HAW Hamburg) did.

In a very entertaining talk Christian shared experiences they learned the hard way.

## Why would you want to do that?

Getting project-specific computing resources at universities is usually causing headaches and lots of paperwork.
Even if you eventually get what you needed, well then, it was certainly too late.

The HAW Hamburg wanted to provide their students, professors and researchers an accessible cloud computing infrastructure, where they could learn essential skills for today's software industry and experiment with various technology and demanding algorithms.

## The setup

The Kubernetes cluster was designed to support ca. 1000 concurrent users. The hard facts are:

* 6 storage nodes, 8 compute nodes, 1 GPU node
* Overall resources: 6 10-core Xeon processors, 4 Tesla V100 GPUs, ~1 TB RAM, 4 TB SSD storage, 33 TB HDD storage and one big Cisco switch :)

To solve the AAA-Problem (Authentication, Authorization and Admission) they relied on GitLab as being the signle source of truth, mapping GitLab resources to Kubernetes Namespaces and RoleBindings.

Using a simple utility script, students or HAW employees are obtaining `kubectl` credentials using their LDAP accounts.

## ["We are in the large cluster business"](https://github.com/coreos/etcd/blob/master/Documentation/op-guide/hardware.md)

Christian and the HAW Hamburg did not solve the Admission problem, yet. So currently all resources are free-for-all.
In the future they intend to introduce a leasing mechanism and let tenants self-service resources.

They highlighted additional challenges like losing access to the cluster (`kubectl` timing out), because one student made extensive use of the Kubernetes API server.
Or `etcd` running out of memory, causing a sychronization cascade that kept the whole cluster busy for nearly a day.
Also they struggled with multi-tenant logging, since all available open-source solutions are either *you-see-everything* or *you-see-nothing*.

## Summary TODO

* Entertaining talk with great insights
* We are hiring a DevOps Engineer? ;)
