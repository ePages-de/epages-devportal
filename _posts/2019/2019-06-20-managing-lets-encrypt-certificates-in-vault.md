---
layout: post
title: Managing Let's Encrypt certificates in Vault
date: 2019-06-20
header_image: public/vault.jpg
header_position: bottom
header_overlay: true
category: tech-stories
tags: ["automation", "docker", "infrastructure"]
authors: ["Ioannis"]
about_authors: ["ikoutras"]
---

[Let's Encrypt](https://letsencrypt.org/){:target="_blank"} has facilitated the
securing of websites by providing certificates free of charge. Here at ePages,
we use them for testing our products, as well as for protecting some internal
infrastructure. **Even though they are free, there is an extra cost: they need
renewal (currently every 90 days at most)**. If interested in how to reduce
this cost 😉, keep reading.

Certificates get issued after Let's Encrypt validates that users control the
domain names in those certificates using the ACME API and "challenges". The
most popular ones are the HTTP-01 and the DNS-01. The first requires users to
get a particular file and serve it via HTTP or HTTPS, so that the Let's Encrypt
servers are able to retrieve it. The latter uses DNS records respectively, so
that Let's Encrypt can validate the domain ownership via queries. There are
already many clients which ease both of those processes with EFF's
[Certbot](https://certbot.eff.org/){:target="_blank"} being the most prominent
one.

Certbot supports certificate creation and renewal using both challenge types.
*For dealing with multiple domain names from one server, HTTP-01 challenges
seem to be cumbersome*: Certbot must serve some traffic on ports 80 and 443 for
the Let's Encrypt servers to validate the domains. DNS-01 challenges are better
on this perspective, but still this is not to be considered cloud-ready for two
reasons:

1. The certificate state is stored locally on the server; and
2. The renewal process depends on a running cronjob of the same server.

To tackle with the first point, we still use Certbot, but store every necessary
information (certificates, tokens etc.) in Vault. HashiCorp's
[Vault](https://www.vaultproject.io/){:target="_blank"} secures, stores, and
tightly controls access to tokens, passwords, certificates, API keys, and other
secrets in modern computing.[^vault]

To avoid depending on a single server, we containerize the complete process.
Since the state is stored in Vault, we are able to run the certificate creation
and renewal process anywhere as long as there is Vault access.

A testing setup can be created by using the files provided in [this
Gist](https://gist.github.com/ikoutras-epages/b4780862a93315aac1a971754ca50eab){:target="_blank"}.
In the following sections we describe how they are supposed to work and how one
issues and renews certificates.

## Get Vault ready

Before running anything we need a Vault instance and a proper token to access
it. For the sake of this post, let's run Vault locally, inside a Docker
container:

```bash
$ docker network create certbot-vault-net
$ docker run --cap-add=IPC_LOCK -d --name=dev-vault \
  --network certbot-vault-net \
  vault
```

The first command creates a Docker network, so that the Certbot container can
access the Vault. The second creates a Vault container based on the [official
Vault image](https://hub.docker.com/_/vault/){:target="_blank"} (version 1.1.3 was the latest
version we tested). Be careful, this Vault instance is running on "dev mode",
which means that every data will be lost on container stop.

Let's grab the root token to use it for Certbot:

```bash
export VAULT_TOKEN=$(docker logs dev-vault 2>&1 | grep 'Root Token' | cut -d ' ' -f3)
```

*Note: On a production environment it is advised to follow the principle of
least privilege, i.e., use multiple tokens with different policies, depending
on the process. When initializing Certbot data and/or creating new
certificates, we need write permissions on everything, while when performing
certificate renewal, we need read access on most Vault paths and only update
permission on the certificates path.*

## Create a Docker image for Certbot and Vault

Let's embed the Vault client on an official Certbot Docker image. As
aforementioned, we are going to use DNS-01 challenges to avoid exposing any
network ports and re-directing HTTP(S) traffic to this container. More
specifically, we are going to use the DNSimple plug-in as seen in the
[Dockerfile](https://gist.github.com/ikoutras-epages/b4780862a93315aac1a971754ca50eab#file-dockerfile){:target="_blank"}.

The RUN argument is similar to the [official's Vault Docker
image](https://github.com/hashicorp/docker-vault/blob/2b7561b55940c35e412c914083e7dd40d21e9193/0.X/Dockerfile#L12-L46){:target="_blank"}
with the removal of the `ca-certificates` package which is available from the
base image and the addition of the `curl` and `jq` packages that we are going
to need later on.

Let's build this and tag it as `certbot-vault` by running the following on the
same directory of our `Dockerfile`:

```bash
docker build -t certbot-vault .
```

## Handle Let's Encrypt account and the first certificates

From now on we can work inside the container:

```bash
$ docker run --rm -it --name certbot-vault \
  -e "VAULT_ADDR=http://dev-vault:8200" \
  -e "VAULT_TOKEN=${VAULT_TOKEN}" \
  --network certbot-vault-net \
  certbot-vault sh
```

Let's create a Let's Encrypt account:

```bash
$ certbot register --non-interactive --agree-tos -m webmaster@example.com
```

where `webmaster@example.com` is the mail address we are using to receive
e-mail notifications on certificate expirations.

The previous step created some 'state' in `/etc/letsencrypt` inside the
container. Let's store it in Vault:

```bash
export ACCOUNT_PARENT_PATH=/etc/letsencrypt/accounts/acme-v02.api.letsencrypt.org/directory
export ACCOUNT_ID=$(ls $ACCOUNT_PARENT_PATH)
vault kv put secret/lets-encrypt/account/extra_details "account_id=$ACCOUNT_ID"
for i in meta private_key regr; do
  vault kv put "secret/lets-encrypt/account/$i" "@$ACCOUNT_PARENT_PATH/$ACCOUNT_ID/$i.json"
done
```

Before creating our first certificate, let's store a DNSimple token both inside
the container and in Vault for future iterations:

```
export DNSIMPLE_TOKEN=MYTOKEN
echo "dns_dnsimple_token = $DNSIMPLE_TOKEN" > /etc/letsencrypt/dnsimple.ini
chmod 600 /etc/letsencrypt/dnsimple.ini # certbot checks for unsafe permissions
vault kv put secret/dnsimple "token=$DNSIMPLE_TOKEN"
```

And finally let's create our first certificate:

```
# certbot certonly \
  --dns-dnsimple \
  --dns-dnsimple-credentials /etc/letsencrypt/dnsimple.ini \
  -d "example.com"
```

In the example above we have created a certificate for `example.com`. We could
create wildcard certificates, e.g. `*.example.com`, or for multiple domains by
using the `-d` argument multiple times.

In any case, do not forget to add the certificate in Vault:

```
# domain=example.com
# vault kv put \
  "secret/lets-encrypt/certificates/${domain}" \
  "cert=@/etc/letsencrypt/live/${domain}/cert.pem" \
  "chain=@/etc/letsencrypt/live/${domain}/chain.pem" \
  "privkey=@/etc/letsencrypt/live/${domain}/privkey.pem"
```

*Note: For wildcard certificates drop the `.*` prefix; for multiple-domain
certificates use only the first domain.*

## Renew certificates

Once we exit the container's shell, every data is going to be lost. Hopefully
our Dockerfile includes already some scripts to fix this!

### Re-initialize at startup

For the initialization process we shall create a shell script called
[initialize.sh](https://gist.github.com/ikoutras-epages/b4780862a93315aac1a971754ca50eab#file-initialize-sh){:target="_blank"}.

The script reads the necessary information from the Vault and re-creates the
necessary Certbot file structure for certificate issuing and renewal.

### Updating renewed certificates in Vault

Certificates may get renewed inside the container, but still do not get updated
in Vault. To do so, we need to place a Certbot deploy hook, [00-update-vault.sh](https://gist.github.com/ikoutras-epages/b4780862a93315aac1a971754ca50eab#file-00-update-vault-sh){:target="_blank"},
in `/etc/letsencrypt/renewal-hooks/deploy/`.

## Wrapping it up

For certificate renewal, we just need to run anywhere the following command:

```bash
$ docker run --rm --name certbot-vault \
  -e "VAULT_ADDR=http://dev-vault:8200" \
  -e "VAULT_TOKEN=${VAULT_TOKEN}" \
  --network certbot-vault-net \
  certbot-vault renew
```

Pretty convenient, right?

P.S.: Do not forget to clean up when done!

```bash
$ docker stop dev-vault && docker rm dev-vault
$ docker network rm certbot-vault-net
```

## Footnotes

[^vault]: ["Learn about secrets management and data protection with HashiCorp Vault"](https://learn.hashicorp.com/vault/){:target="_blank"}
