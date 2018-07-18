---
layout: post
title: High availability with MySQL Galera Cluster
date: 2018-01-18
header_image: public/galera-cluster-high-availability.jpg
header_position: top
category: tech-stories
tags: ["galera", "mysql", "database"]
authors: ["Timo H."]
about_authors: ["thaapakoski"]
---

Your online shop is perfect, it has a nice theme, and excellent products.
Thousands of customers visit your shop, but only see this:

{% image_custom image="/assets/img/pages/blog/images/blog-galera-databaseerror.png" width="40" %}

"Seriously?!", you think, and call the customer support.
They calmly explain to you, that, unfortunately, all your data is lost, and the shop needs to be created anew.
The nightmare gets worse as a customer calls you, and asks for a refund of an undelivered product.
Fortunately, you wake up, wipe the sweat from your forehead in relief remembering, that you bought an [ePages](https://epages.com/){:target="_blank"} shop, where such horrific scenarios can't happen.

Let's start from the basics, where the data is saved, and how we can make it more reliable, to always have the data available when we need it.

## Single database

All data, such as product info, orders, and customer data, are saved orderly in a MySQL database, which itself is located on a server.

{% image_custom image="/assets/img/pages/blog/images/blog-galera-singledb.png" width="20" %}

As we can see from the picture, in case of database-software failure, or a server-hardware failure, all that data would be unavailable, or even completely lost.

To avoid such unease situation, backups are created daily, and with incremental backups, all database changes will be constantly saved to binary logs.
So all the data is safe, but in case of failure, reloading that data on a new database to replace the broken one, would take hours at best.

## Data replication

To minimize such a worse case downtime, incremental backup can be loaded in realtime to another database server.
This is called replication.

{% image_custom image="/assets/img/pages/blog/images/blog-galera-replication.png" width="35" %}

Now, in case of an emergency on side A, the application can be switched to side B in a matter of minutes.

{% image_custom image="/assets/img/pages/blog/images/blog-galera-replicationice.png" width="35" %}

This guarantees a good availability, but it requires manual work for the switch, which will also be a one-way road only.
Once the application has been switched, a lengthy reinitialization process is required, for making the switch possible to the opposite direction.
During that time, the system will be as vulnerable as in the "single database" scenario.

## Galera Cluster

For maximizing the availability, several cluster technologies have been invented.
Unfortunately, the application needs to be rewritten completely anew for most of them.
Lucky for us, somewhere far north some nice fellows from Codership thought that this cannot be, and thus, [Galera Cluster](http://galeracluster.com/){:target="_blank"} was born.

Galera Cluster is basically a replication plugin for MySQL.
It is compatible with MySQL InnoDB Database engine, so applications designed for MySQL run well on it.
It allows all data written in one node to be immediately written on all other nodes in the cluster.
This is called multi-master replication.

{% image_custom image="/assets/img/pages/blog/images/blog-galera-galeracluster.png" width="50" %}

For running Galera Cluster, three or more MySQL nodes with Galera-plugin are recommended.
A load balancer will be set between Galera and application to distribute database requests to Galera nodes.

In case of failure on any of the nodes in the cluster, the remaining nodes will keep the cluster running normally, and the application as well as the end customers will live happily ever after.

## Related posts

* [How to install your own Galera Cluster](/blog/tech-stories/how-to-install-your-own-galera-cluster/)
* [How to migrate data to a Galera Cluster](/blog/tech-stories/how-to-migrate-data-into-a-galera-cluster/)
