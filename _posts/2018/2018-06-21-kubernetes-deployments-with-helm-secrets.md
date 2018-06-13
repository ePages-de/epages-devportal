---
layout: post
title: Kubernetes Deployments with Helm - Secrets
date: 2018-06-21
header_image: public/helm-header-2.jpg
header_position: center
header_overlay: true
category: tech-stories
tags: ["kubernetes", "helm", "cloud"]
authors: ["Alex"]
---

In the first two parts of this mini-series, my colleague Dirk gave an introduction to Helm where he explained how to [create charts](/blog/tech-stories/kubernetes-deployments-with-helm), and how to work with [templates and values](/blog/tech-stories/kubernetes-deployments-with-helm-templates).

In this final part we will look into how we can work with secrets. I will show you a way to work with encrypted values so that secrets can be checked into version control alongside the chart without any concern.

For this purpose we will use the plugin [helm-secrets](https://github.com/futuresimple/helm-secrets){:target="_blank"} because there is no secret management included in helm itself. I will show you what it can do and how to use it in your daily work.

## Motivation

Why do we need such a thing as helm-secrets? Sometimes there are values we want to provide to helm charts that should not be visible to the public. So just checking them into version control unencrypted is not a good idea. But we still want multiple persons to have access to them, for example all members of a team. You could also store these values as environment variables on your deployment cluster but that is not optimal for multiple people to collaborate, and could potentially lead to data loss due to outage.

That's where helm-secrets comes in as it allows you to encrypt your values so they can be checked into version control and it offers a way to work with these encrypted values transparently. Also the way the values are encoded lets you see which secrets were changed at what time in your version control system.

## Helm secret - What does it offer?

What this plugin offers is to encrypt values files with a secret key of your choosing. It is also be possible to edit the encrypted files without extra effort. And there is a wrapper so that using this encrypted values file in helm is done transparently. All in all this means you just have the initial effort of creating a key, and encrypting your values file. Afterwards working with the encrypted files is transparent.
The Plugin supports yaml structure encryption per value, that means it only encrypts the values. That way you can still see the structure of the file and what keys are in there even if you don't have the secret key. This is helpful for version control and diffs.

There is also a good documentation on the [github page](https://github.com/futuresimple/helm-secrets){:target="_blank"} of the plugin. So if you want more information please feel free to read it.

## How to install

Installing helm secrets is pretty straight forward if you have helm installed already.

```bash
helm plugin install https://github.com/futuresimple/helm-secrets
```

This will install everything that is needed, including sops and the helm-wrapper.
For some operating systems it might be necessary to install sops manually. Please see the helm-secrets [readme](https://github.com/futuresimple/helm-secrets){:target="_blank"} for further information.

## How to work with secret files

First you need to decide how you want to encrypt your secrets. Helm-secrets currently supports PGP, AWS KMS and GCP KMS.
I will show you how to do it with PGP keys, but apart from the creation it shouldn't be much of a difference with the other methods.

As an requirement to work with PGP keys, you need to have gpg installed. If you use PGP you first need to generate a key, this can be done with following command (Please follow the instructions of the tool):

```bash
gpg --key-gen
```

Alternatively if you already have a key, you can import it like this:

```bash
gpg --import your_key
```

You can then use

```bash
gpg --fingerprint
```

to find out the fingerprint of your key. With this fingerprint you can create a .sops.yaml file which you will need to encrypt your secrets. This file is only needed to initially encrypt and doesn't need to be checked in.
It will look something like this:

```yaml
creation_rules:
        - pgp: '<your-key-fingerprint>'
```

Now that we have a key and also told helm-secrets to use it via the .sops.yaml file we can start to encrypt.

Let's assume we have this file (secrets.yaml):

```yaml
some:
  secret: SUPER_SECRET
```

We can now encrypt it using

```bash
helm secrets enc secrets.yaml
```

and afterwards it should look something like this:

```yaml
some:
    secret: ENC[AES256_GCM,data:x7yJgHvpGlzs7Es7,iv:K+781g2RaWP4Qmw5vYywopx6TVbG60icU8amIXCr+ao=,tag:HqG+hnbeOsefSlBWElxT6Q==,type:str]
sops:
    kms: []
    gcp_kms: []
    lastmodified: '2018-05-30T11:14:31Z'
    mac: ...
    pgp: ...
    unencrypted_suffix: _unencrypted
    version: 3.0.0
```

As you can see, the structure remains intact, only the values got encrypted. Also there is a sops block now with all the information regarding the encryption which will be used for editing and decrypting this file, rendering the .sops.yaml unnecessary from this point on.

Now that we did the "hard" part, working with the secrets is quite simple.

You can simply use

```bash
helm secrets edit secrets.yaml
```

to edit the secrets. This will decrypt the file, open your <s>favorite editor</s> vim (Being able to use a different editor seems to be a feature that will come in the future), and after you close the file encrypt it again automatically. For you it will look like editing a normal file.

And now for the most important part: Applying the secrets file when installing a helm chart.
For this you need the helm-wrapper that is automatically installed when you install the plugin. When using the helm-wrapper you can treat the secrets files just like usual values files. The decoding will be automatically done by the wrapper.

```bash
helm-wrapper template some-chart --values secrets.yaml
```

## Additional features

There are some other useful things you can do with helm-secrets which are not mandatory for day to day use but nice to have. You can for example view a decrypted secrets file by using

```bash
helm secrets view secrets.yaml
```

or write the decrypted secrets to a file by using

```bash
helm secrets dec secrets.yaml
```

Last but not least to manually clean up those decrypted secret files use

```bash
helm secrets clean <your_chart_directory>
```

Another neat feature is that you can leave parts of the secrets file unencrypted by using the suffix '_unencrypted' on the key where you want the value to be unencrypted. Please be aware that unencrypted content is still added to the checksum, and cannot be modified outside of helm-secrets without breaking the file integrity check.

## Conclusion

In the final part of this mini-series we had a quick overview of the helm plugin helm-secrets and learned how to use it. Together with the other two parts you should have a good overview over helm and should already be able to use it while keeping your secrets safe.

## Related posts

* [Kubernetes Deployments with Helm - Basic features](/blog/tech-stories/kubernetes-deployments-with-helm/)
* [Kubernetes Deployments with Helm - Templates & Values](/blog/tech-stories/kubernetes-deployments-with-helm-templates)
