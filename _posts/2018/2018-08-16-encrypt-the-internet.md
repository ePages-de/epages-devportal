---
layout: post
title: Encrypt the InTeRnEt!
date: 2018-08-16
header_image: public/encrypt-the-internet.jpg
header_position: bottom
header_overlay: true
category: tech-stories
tags: ["letsencrypt","encryption","TLS","SSL","automation"]
authors: ["Carsten S."]
about_authors: ["cseeger"]
---

This post is all about a very nice thing that revolutionized encryption on the internet. 
In 2015, the famous organisation [Let's Encrypt](https://letsencrypt.org/){:target="_blank"} made the decision to throw out [TLS](https://de.wikipedia.org/wiki/Transport_Layer_Security){:target="_blank"} certificates for free to everyone who needed them.
In September 2015, the [first certificate](https://letsencrypt.org/2015/09/14/our-first-cert.html){:target="_blank"} was issued, and in May 2018, Let's Encrypt took the next step, and started supporting [wildcard certificates](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579){:target="_blank"}.

Let's talk about getting certificates from Let's Encrypt.

## Why this is important for us

Back in January last year we had the dream to support Let's Encrypt as a standard certificate for our customers on our WhiteLabel platform. 
We created our first system to issue certificates for shop domains using Let's Encrypt's [certbot script](https://certbot.eff.org/){:target="_blank"}, [http-01 challenge](http://letsencrypt.readthedocs.io/en/latest/challenges.html){:target="_blank"}, and some templating magic to create configurations for our loadbalancer.

### Technical summary

First off a word about [HTTP-01](https://ietf-wg-acme.github.io/acme/draft-ietf-acme-acme.html#rfc.section.8.3){:target="_blank"} challenge defined in the [ACME](https://ietf-wg-acme.github.io/acme/draft-ietf-acme-acme.html){:target="_blank"} protocol. 
In general, these challenges are designed to check if the requesting instance is valid for creating a certificate for the requested domain.
The HTTP-01 challenge assumes that the webroot of the webserver a domain points to is under your control. 
You have to put a challenge into your webroot folder `<path/to/webroot>/.well-known/acme-challenges/...` to prove you are trustworthy to get a certificate for your domain.
Let's Encrypt checks this challenge using the domain, the standard path `.well-known/acme-challenges/`, as well as the generated challenge to validate your request.

But there were some steps to go to automate the whole issuing process for a shared platform running in a big cluster with lots of loadbalancing in the background. 
Our scenario is a bit different from the standard case.
But sometimes pictures say more than words:

{% image_custom image="/assets/img/pages/blog/images/blog-letsencrypt-http-01-simple.svg"" width="50" caption="http-01-simple" lightbox %}

First we needed a list of domains we wanted to issue. 
This list comes from our ePages software, and includes all domains with their certification status.

Our [Network LoadBalancer (NLB)](https://www.nginx.com/){:target="_blank"} (the orange thing) is configured to proxy requests going to `/.well-known`, and then to a system where our certbot puts the challenges in place (the blue service system). 
Now we were able to issue certificates for any shopdomain on the platform, because every such domain points now to our loadbalancer IP address (if not ... nobody can buy something from the ePages online shops 😮).
Now you may ask why not just do the whole Let's Encrypt stuff on the loadbalancer. 
Yes, you can do that.
But our loadbalancers are rented from a service provider, so we don't have this option.

Next, we have to create nginx configuration files from a template using the new certificate, since the loadbalancer using Nginx terminates the SSL/TLS. 
The templates often look similar to this:

{% highlight bash %}
server {
        server_name $domain_www $domain;
        client_max_body_size 0;
        listen $ip:443;
        ssl on;
        ssl_certificate     /path/to/letsencrypt/fullchain.pem;
        ssl_certificate_key /path/to/letsencrypt/privkey.pem;
        include <headers, defaults, params etc.>;
        location / {
                proxy_pass ...;
                proxy_set_header ...;
                proxy_hide_header ...;
        }
}
{% endhighlight %}

With these templates you can do basically all the magic you want to do for your software stack, such as proxy stuff, setting additional headers or including special configurations. 
We have several templates designed for our use cases depending on what a shop our customers have.

The certificate and configurations get [rsynced](https://en.wikipedia.org/wiki/Rsync){:target="_blank"} to the NLB. 
Before the configurations go into production, everything gets tested and integrated after having checked successfully that nothing is broken. 
Here is a simplified picture that shows what happens:

{% image_custom image="/assets/img/pages/blog/images/blog-letsencrypt-http-01.svg"" width="50" caption="http-01" lightbox %}

Now we are able to automatically create all certificates for our customers' online shops. 
This was a huge step forward, because our new [ePages Now](https://www.epages.com/ecommerce-website-builder/now/){:target="_blank"} product was also designed by using protected internet communication, and therefore requires a valid certificate by default.

## Into the wild...card

In May 2018, Let's Encrypt started supporting wildcard domains using [DNS-01](https://ietf-wg-acme.github.io/acme/draft-ietf-acme-acme.html#rfc.section.8.4){:target="_blank"} challenge and we thought ... NICE! 
As an internet company, we need many wildcard certificates, especially for all newly created shops. 
These shops perhaps don't have an own domain at the beginning. 
They get a standard domain that looks like `shopalias.some.domain`, where `some.domain` is one of our domains. 
In the past we bought all these `*.some.domain` certificates. 
But now we can automate the issuing process for wildcards. 
There is also no longer the need to get your hands dirty by changing old expired certificates. 
Here is how it works!

### Technical summary

Using DNS-01 challenge of the ACME protocol requires you to create, update, (and delete) [TXT records](https://en.wikipedia.org/wiki/TXT_record){:target="_blank"} for your [domain zone](https://en.wikipedia.org/wiki/Domain_Name_System){:target="_blank"}. 
For example, if you want a wildcard certificate for `*.example.com`, you have to create a specific subdomain with a TXT record. 
This subdomain for our example would be `_acme-challenge.example.com`, and the TXT record would contain a validation string created within the issuing process. 
(Btw, it doesn't matter if there are "some" more TXT records.
Let's Encrypt loops over all of them to check ... at least until bad things happen). 
You can also issue normal certificates this way.

Here we faced our first challenge: 

We have many such domain zones we control for our wildcard domains, but there's no neat way to automate the TXT creation process. 
This happens if your domain control is just a webinterface, and no API is implemented.
(Creating creapy curl -X POST requests to fake a user using the webinterface to create TXT records was not really an option ..., but anyway we did that as a first try 😁).

If your setup is simpler by using some kind of domain provider having a standard API implementation for Let's Encrypt, you don't have to do such workaround, and should be able to create the TXT record directly.

To overcome our TXT creation problem there is a common practice called [CNAMES](https://en.wikipedia.org/wiki/CNAME_record){:target="_blank"} that is supported by the ACME protocol. 
Let's assume we want a wildcard certificate for `*.ourfancy.domain`. 
We create the `_acme-challenge.ourfancy.domain`, and CNAME it to `_acme-challeenge-cname.some.other.domain` where we have better options to manage TXT records. 
In our case the `some.other.domain` zone is managed by a DNS server that we have under our control.

We CNAME the `_acme-challenge` domains to domains managed by our DNS server, and create TXT records using [nsupdate](https://en.wikipedia.org/wiki/Nsupdate){:target="_blank"} magic (*we are using [BIND](https://wikipedia.org/wiki/BIND){:target="_blank"} here for the DNS part*). 
All you have to do is to set up one initial CNAME, and the rest is done by **bash magic**.

This is how to these TXT records using nsupdate:

{% highlight bash %}
#!/bin/bash

DNS_SERVER="dns.some.other.domain"
DYNZONE="some.other.domain"
HOST="_acme-challenge-cname"

if [ -z "$CERTBOT_VALIDATION" ]
then
echo "EMPTY VALIDATION"
exit -1
fi

/usr/bin/nsupdate -k /path/to/some/key.private << EOM
server ${DNS_SERVER}
zone ${DYNZONE}
update add ${HOST}.${DYNZONE} 300 TXT "${CERTBOT_VALIDATION}"
send
EOM
# give DNS some time to update
sleep 60
{% endhighlight %}

This script is used by certbot itself using the `--manual-auth-hook` option, which sets the `$CERTBOT_VALIDATION` variable. 
Also it makes sense to clean up the records after using them. 
This can be done using the `--manual-cleanup-hook` option. 
We use the following script:

{% highlight bash %}
#!/bin/bash

DNS_SERVER="dns.some.other.domain"
DYNZONE="some.other.domain"
HOST="_acme-challenge-cname"

/usr/bin/nsupdate -k /path/to/some/key.private << EOM
server ${DNS_SERVER}
zone ${DYNZONE}
update delete ${HOST}.${DYNZONE}
update add ${HOST}.${DYNZONE} 300 TXT ".empty"
send
{% endhighlight %}

Setting an `.empty` TXT record here prevents some caching problems.

To use nsupdate on a BIND DNS server, you need to add a key and an update-policy. 
This may look like this:

{% highlight bash %}
zone "some.other.domain" {
        type master;
        file "/etc/bind/db.some.other.domain";
        ...
        update-policy { grant my.nsupdate.key zonesub TXT; };
}

...

key "my.nsupdate.key" {
        algorithm hmac-sha512
        secret "<some weird characters come up here>"
}
{% endhighlight %}

_**Important notice:** 
For this setup you only have to setup the CNAME from `_acme-challenge.ourfancy.domain` to `_acme-challenge-cname.some.other.domain` once. 
The renew will go the same way as the issue as long as the CNAME exists. 
You may have also noticed that the `my.nsupdate.key` is only allowed to update TXT records, and nothing more, to prevent breaking other record types._

The following picture describes the complete process a bit more abstract:

{% image_custom image="/assets/img/pages/blog/images/blog-letsencrypt-dns-01.svg"" width="50" caption="http-01-simple" lightbox %}

Now, for the not so tech-savvy readers who really made it all the way through this post ... all you have to know is:

**You're safe now, everything is encrypted ! 😁**

That's it for now, folks. 
I hope you enjoyed our special ride through the Let's Encrypt world, and you have an incentive to make the internet more secure by encrypting your own services.

Stay tuned!