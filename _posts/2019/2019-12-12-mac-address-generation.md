---
title: MAC generation
layout: post
date: '2019-12-12'
header_image: public/mac-address.jpg
header_position: bottom
header_overlay: true
category: tech-stories
tags: ["tech", "ieee 802", "mac-address"]
authors: ["Carsten"]
about_authors: ["cseeger"]
---

This time we will dive deep into the IEEE 802 standard and take a look how to MAC addresses are generated. 

Sometimes you may need a random MAC-address for some purpose like overwriting the existing one or in virtualization szenarios. You could probably just copy and paste some existing mac address that is not used in your environment because statisticaly spoken there is very low chance of generating conflicts here\*. 

But nevermind sometimes you want to make things right and understand how MAC addresses are generated in general and lern to know about how to create local MAC-addresses.

## The Basics

A Media-Access-Control-Address or MAC-address is a unique hardware identifier address often referenced as physical or hardware address. 
A classic (IPv4 refering) MAC-address has 48 bit or 6 bytes and is expressed in hexadecimal seperated by colons between each of the 6 octets.

If you cut these 6 octets by half the first 3 are the so called Organizationally Unique Identifier (OUI) and the last 3 are a manufacturer specific number.
The important thing here are the first 2 bit of the first byte.
Lets call them b0 and b1. 

The b0 bit states if this mac address is a unicast (0) or [multicast address](https://en.wikipedia.org/wiki/Multicast_address#Ethernet){:target="_blank"} (1).

The b1 bit states if a mac address is globally unique (0) or locally administered (1).

## Some Math

We now know that the first 3 byte are reserved lets call them the mac prefix here.
Lets assume these 3 byte are fixed for now.
Using only the last 3 byte we can generate up to 16^6 or 2^24 addresses which is exactly the size of a /8 sized network.
You may think now hey thats exactly the size of the biggest usable local network.

There are 3 private IPv4 address ranges specified in [RFC1918](https://tools.ietf.org/html/rfc1918){:taget="_blank"}:

- 10.0.0.0 - 10.255.255.255  (10/8 prefix)
- 172.16.0.0 - 172.31.255.255  (172.16/12 prefix)
- 192.168.0.0 - 192.168.255.255 (192.168/16 prefix)

## local and global mac addresses

So generating only one mac prefix allows us to generated enough addresses for the biggest assignable private network. 
Cool thing and we know if we want to use it localy we only have to set the second bit in the first byte of this mac address to 1.

You also have the option to [register](https://standards.ieee.org/products-services/regauth/index.html){:target="_blank"} a mac prefix (with b1=0) for your own purposes.
The registration is made by IEEE and costs about 1000$ - 3000$.

IEEE also publishes a list of already existing [OUIs](http://standards-oui.ieee.org/oui.txt){:target="_blank"}.

## mac address prefix generation

To simply generate a mac address prefix we can have the following options for the first byte:

```
bbbbbb10 , bbbbbb01, bbbbbb00, bbbbbb11
```
where b ∊ {0,1} can be set at random.

The first one (10) is a locally administered unicast address and the most common usecase if you need a local MAC-address.

The second one (01) is a global unique multicast address and a very rare thing since multicast addresses are not used very often.

Our third candidate (00) is a very typical representative of its species the global unique unicast address.
This one is the most common OUI used by almost any hardware producing company (or even software related when it comes to virtualization). 
Almost everyone who needs a OUI uses this pattern.

Last but not least (11) is the locally administered multicast and also a rare one.

MAC-addresses are commonly written in hex and not binary representation so lets take a look how our candidates look in hex.
First thing we can ignore the last 4 bit since they do not affect the b0 and b1 bit in hex. 
Also b2 and b3 can be 0 or 1 since they do not matter but affect the hex representation.

We can have the following combination:

```
 b3    b2    b1 b0    partly decimal    decimal combination   hex representation
[0|1] [0|1]  0  0     - b3,b2 + 0         - 0,4,8,12            - 0,4,8,C
[0|1] [0|1]  0  1     - b3,b2 + 1         - 1,5,9,13            - 1,5,9,D
[0|1] [0|1]  1  0     - b3,b2 + 2         - 2,6,10,14           - 2,6,A,E
[0|1] [0|1]  1  1     - b3,b2 + 3         - 3,7,11,15           - 3,7,B,F
```
Our first byte can have the following hex representations

```
[0..F][0|4|8|C] - global unique unicast
[0..F][1|5|9|D] - global unique multicast
[0..F][2|6|A|E] - locally administered unicast
[0..F][3|7|B|F] - locally administered multicast
```

We now have 2 bytes left and since they do not have special bits they can be choosen at random.
Lets take a look at the following example mac prefix `EA:A2:B7`.
`EA` represents our first byte in hex so `A2` and `B7` can be ignored since they are just random.
The `E` also is just random so the only interesting part is the `A`. 
Lets take a look at our pattern above and we see A is part of the locally administered unicast addresses. 
`EA:A2:B7` is a valid local unicast mac address prefix.

The last 3 bytes lets call them the suffix can also be generated at random or just iterating over.
An example could be `D4:FC:AE` and using our example prefix would give us the following MAC address `EA:A2:B7:D4:FC:AE`. 

I've put all this into a [golang](https://golang.org/){:target="_blank"} libary called [mac-gen-go](https://github.com/cseeger-epages/mac-gen-go){:target="_blank"}. 

For the sake of math :D:

We have 24 bit representing our prefix and 2 of them are reserved so we have a range of 2^22 permutations (4.194.304) available for generating a mac prefix.

## Some final words

We only covered the 48 bit representation which is commonly used in IPv4 and called EUI-48 or MAC-48.
There is also a representation called EUI-64 which is called the Extended Unique Identifier and extends the MAC address space to fit IPv6.

I hope you find it usefull to get a bit inside into MAC-addresses. Happy Coding !


#### footnotes
\*  the chance of a conflict is around  1/(2^48) x (count of mac addresses in your environment) by assuming you just pick a mac address at random
