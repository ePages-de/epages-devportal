---
layout: post
title: High availability with MySQL Galera Cluster
date: 2017-12-04
header_image: blog-galera-high-availability-with-mysql-galera-cluster.jpeg
category: tech-stories
authors: ["Timo Magnus Haapakoski"]
---

# High availability with MySQL Galera Cluster

Your webshop is perfect, nice theme with excellent products. Thousands of customers visit your shop and see..:

{% image_lightbox image="/assets/img/pages/blog/images/blog-galera-databaseerror.png" width="50" %}

This cant be, you think, and call the customer support. They explain to you calmly, that unfortunately all your data has been lost and shop needs to be created anew.
The nightmare gets worse as a customer calls you and asks for refund for an undelivered product.
Fortunately you wake up, wipe your forehead in relief remembering, that you bought an ePages shop where such horrific scenarios cant happen.

Lets start from the basics, where our data is saved, and how can we make it more reliable, to be available always as we need it.

## Single database

All data like product info, orders and customer data, are saved orderly in a MySQL database, which itself is located on a server.

{% image_lightbox image="/assets/img/pages/blog/images/blog-galera-singledb.png" %}

As we can see from the picture, in case of database-software failure, or a server-hardware failure, all that data would be unavailable or even completely lost.

To avoid such unease situation, backups are created daily, and with incremential backups all database changes will be constantly saved to binary logs.
So all the data is safe, but in case of failure, reloading that data on a new database to replace the broken one, would take hours at best.

## Data-Replication

To minimize such worst case downtime, incremential backup can be loaded in realtime to another database server. This is called replication.

{% image_lightbox image="/assets/img/pages/blog/images/blog-galera-replication.png" %}

Now, in case of emergency on side A, application can be switched to side B in matter of minutes.

{% image_lightbox image="/assets/img/pages/blog/images/blog-galera-replicationICE.png" %}

This guarantees a good availability, but it requires manual work for the switch, which will also be a one way road only.
Once switch has been made, a lengthy reinitialization process is required, for making the switch possible to the opposite direction.
During that time, system will be as vulnerable as in scenario "Single database".

## Galera Cluster

For maximizing the availability, several cluster technologies have been invented.
Unfortunately the application needs to be rewritten completely anew for most of them.
Lucky for us, somewhere far north some nice fellows from Codership thought that this cannot be, and thus Galera Cluster was born.

Galera cluster is basically a replication plugin for MySQL. It is compatible with MySQL InnoDB Database engine, so applications designed for MySQL run well on it.
It allows all data written in one node to be immediatly written on all other nodes in the cluster. This is called multi-master replication.

{% image_lightbox image="/assets/img/pages/blog/images/blog-galera-galeracluster.png" %}

For running Galera cluster, three or more MySQL nodes with Galera-plugin are recommended.
A loadbalancer will be set between Galera and application to distribute database requests to Galera nodes.

In case of failure on any of the nodes in the cluster, the remaining nodes will keep the cluster running normally, and the application and the end customers will be happy for everafter.
