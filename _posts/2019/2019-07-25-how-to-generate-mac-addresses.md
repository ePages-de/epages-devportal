---
title: How to generate MAC addresses
layout: post
date: '2019-07-25'
header_image: public/mac-address.jpg
header_position: bottom
header_overlay: true
category: tech-stories
tags: ["tech", "ieee 802", "mac address"]
authors: ["Carsten"]
about_authors: ["cseeger"]
---

In this post I will cover the topic of MAC address generation and dive into the IEEE 802 standard.
Sometimes you may need a random MAC address for a purpose such as overwriting the existing one or in virtualization scenarios.
You could probably just copy and paste an existing MAC address that is not used in your environment, because statistically spoken there is very low chance of generating conflicts here.
(*The chance of a conflict is around 1/(2^48) x (count of MAC addresses in your environment) by assuming you just pick a MAC address at random.*)

But anyway, sometimes you want to do things right, and understand how MAC addresses are generated in general, and how to create local MAC addresses.

## The basics

A MAC address or Media Access Control address is a unique hardware identifier address, often referenced as physical or hardware address. 
A classic (IPv4 referring) MAC address has 48 bits or 6 bytes, and is expressed in hexadecimal digits separated by colons between each of the 6 octets.

If you divide these 6 octets by two, the first 3 are the so-called Organizationally Unique Identifiers (OUI), and the last 3 refer to a manufacturer-specific number.
Important here are the first two bits of the first byte.
Let's call them b0 and b1. 

The b0 bit states if this MAC address is a unicast (0) or a [multicast](https://en.wikipedia.org/wiki/Multicast_address#Ethernet){:target="_blank"} (1) address.
The b1 bit states if a MAC address is globally unique (0) or locally administered (1).

## Some math

As we now know that the first 3 bytes are reserved, let's call them the MAC prefix here.
We assume that these 3 bytes are fixed for now.
Using only the last 3 bytes we can generate up to 16^6 or 2^24 addresses which is exactly the size of a "/8 sized network.
You may think now "Hey that's exactly the size of the biggest usable local network".

There are three private IPv4 address ranges specified in [RFC1918](https://tools.ietf.org/html/rfc1918){:target="_blank"}:

- 10.0.0.0 - 10.255.255.255  (10/8 prefix)
- 172.16.0.0 - 172.31.255.255  (172.16/12 prefix)
- 192.168.0.0 - 192.168.255.255 (192.168/16 prefix)

## Local and global MAC addresses

Generating only one MAC prefix allows us to generate enough addresses for the biggest assignable private network. 
Cool thing, and we know that if we want to use it locally we only have to set the second bit in the first byte of this mac address to 1.

You also have the option to [register](https://standards.ieee.org/products-services/regauth/index.html){:target="_blank"} a MAC prefix (with b1=0) for your own purposes.
The registration is made by IEEE and costs around 1000$ - 3000$.
IEEE also publishes a list of already existing [OUIs](http://standards-oui.ieee.org/oui.txt){:target="_blank"}.

## Mac address prefix generation

To simply generate a MAC address prefix, we can have the following options for the first byte:

```
bbbbbb10 , bbbbbb01, bbbbbb00, bbbbbb11
```
where b ∊ {0,1} can be set at random.

The first one (10) is a locally administered unicast address, and it's the most common use case if you need a local MAC address.
The second one (01) is a globally unique multicast address, and very rare, since multicast addresses are not used very often.
Our third one (00) is a very typical representative of its species: the global unique unicast address.
This one is the most common OUI used by almost any hardware producing company (or even software-related when it comes to virtualization). 
Almost everyone who needs a OUI uses this pattern.
Last but not least (11) is the locally administered multicast, and also a rare one.

MAC addresses are commonly written in hex and not in binary representation, so let's take a look how our candidates look in hex.
First thing, we can ignore the last 4 bits since they do not affect the b0 and b1 bit in hex. 
Also b2 and b3 can be 0 or 1 since they do not matter, but affect the hex representation.

We can have the following combination:

```
 b3    b2    b1 b0    partly decimal    decimal combination   hex representation
[0|1] [0|1]  0  0     - b3,b2 + 0         - 0,4,8,12            - 0,4,8,C
[0|1] [0|1]  0  1     - b3,b2 + 1         - 1,5,9,13            - 1,5,9,D
[0|1] [0|1]  1  0     - b3,b2 + 2         - 2,6,10,14           - 2,6,A,E
[0|1] [0|1]  1  1     - b3,b2 + 3         - 3,7,11,15           - 3,7,B,F
```
Our first byte can have the following hex representations:

```
[0..F][0|4|8|C] - global unique unicast
[0..F][1|5|9|D] - global unique multicast
[0..F][2|6|A|E] - locally administered unicast
[0..F][3|7|B|F] - locally administered multicast
```

We now have 2 bytes left, and since they do not have special bits they can be randomly chosen.
Let's take a look at the following example MAC prefix `EA:A2:B7`.
`EA` represents our first byte in hex so `A2` and `B7` can be ignored since they are just random.
The `E` also is just random so the only interesting part is the `A`. 
When we take a look at our pattern above, we see that `A` is part of the locally administered unicast addresses. 
`EA:A2:B7` is a valid local unicast MAC address prefix.

The last 3 bytes, let's call them the suffix, can also be generated randomly or simply iteratively.
An example could be `D4:FC:AE`, and using our example prefix, it would give us the following MAC address `EA:A2:B7:D4:FC:AE`. 
I've put all this into a [golang](https://golang.org/){:target="_blank"} libary called [mac-gen-go](https://github.com/cseeger-epages/mac-gen-go){:target="_blank"}. 

For the sake of math 😀:
we have 24 bits representing our prefix, and two of them are reserved.
So we have a range of 2^22 permutations (4.194.304) available for generating a MAC prefix.

## Some final words

We only covered the 48-bit representation which is commonly used in IPv4 and is called EUI-48 or MAC-48.
There is also a EUI-64 (Extended Unique Identifier) representation that extends the MAC address space to fit IPv6.

Happy MAC address generation!
