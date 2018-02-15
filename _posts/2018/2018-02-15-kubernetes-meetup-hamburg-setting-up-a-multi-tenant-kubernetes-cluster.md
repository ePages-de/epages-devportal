---
layout: post
title: Hamburg Kubernetes/Cloud Native Meetup - Building a Multi-Tenant Kubernetes Container Cloud
date: 2018-02-15
header_image: private/k8s-meetup-2018-02.jpg
header_position: center
header_overlay: true
category: events
tags: ["kubernetes", "meetup"]
authors: ["Oliver", "Dirk"]
---

This week ePages hosted the Hamburg Kubernetes/Cloud Native Meetup.
With 46 participants actually showing up, the room was full but not yet packed
with Kubernauts being eager to learn and discuss.

## Smooth sailing with Kubernetes?

That is certainly possible, except if you want to setup a multi-tenant Kubernetes cluster on your own hardware, like [Christian](https://twitter.com/chrishuen){:target="_blank"} [Hüning](https://github.com/christianhuening){:target="_blank"} and the Hamburg University of Applied Sciences (HAW Hamburg) did.

In a very entertaining talk, Christian shared experiences they learned the hard way.

## Why would you want to do that?

Getting project-specific computing resources at universities is usually causing headaches, and lots of paperwork.
Even if you eventually get what you needed, well then, it was certainly too late.

The HAW Hamburg wanted to provide their students, professors, and researchers an accessible cloud computing infrastructure, where they could learn essential skills for today's software industry, and experiment with various technology and demanding algorithms.

## The setup

The Kubernetes cluster was designed to support approx. 1000 concurrent users.
The hard facts are:

* 6 storage nodes, 8 compute nodes, 1 GPU node
* Overall resources: 6 10-core Xeon processors, 4 Tesla V100 GPUs, ~1 TB RAM, 4 TB SSD storage, 33 TB HDD storage and one big Cisco switch 🙂

To solve the AAA-Problem (Authentication, Authorization and Admission) they relied on GitLab as being the single source of truth, mapping GitLab resources to Kubernetes Namespaces, and RoleBindings.

Using a simple utility script, students or HAW employees are obtaining `kubectl` credentials using their LDAP accounts.

## ["We are in the large cluster business"](https://github.com/coreos/etcd/blob/master/Documentation/op-guide/hardware.md){:target="_blank"}

Christian and the HAW Hamburg did not solve the Admission problem, yet.
So currently all resources are free-for-all.
In the future, they intend to introduce a leasing mechanism, and let tenants self-service resources.

They highlighted additional challenges like losing access to the cluster (`kubectl` timing out), because one student made extensive use of the Kubernetes API server.
Or `etcd` running out of memory, causing a sychronization cascade that kept the whole cluster busy for nearly a day.
Also they struggled with multi-tenant logging, since all available open-source solutions are either *you-see-everything* or *you-see-nothing*.

## Eat & greet

Just in time when the presentation was finished, pizza arrived, generously sponsored by [Loodse](https://twitter.com/Loodse){:target="_blank"}.
Combined with the usual drinks and snacks provided by ePages, the networking and discussion part of the meetup brought very interesting conversations.
It even lasted more than twice as long as the talk itself, which made it a real community event.

{% image_custom image="/assets/img/pages/blog/images/blog-k8s-multitenant-1.jpg" width="50" lightbox caption="Developer_heaven" %}

## Summary

* Entertaining talk with great insights.
* The Kubernetes community in Hamburg is buzzing.
* Even for DevOps there is something like "too much pizza".
* We are hiring a [DevOps Engineer](https://www.epages.com/de/karriere/jobs/?jh=yh9sa5545lniif5q8f0oqlsmssytutc){:target="_blank"} 😉.
