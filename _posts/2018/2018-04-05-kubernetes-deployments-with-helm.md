---
layout: post
title: Kubernetes Deployments with Helm - Basic features
date: 2018-04-05
header_image: public/helm-header.jpg
header_position: center
header_overlay: true
category: tech-stories
tags: ["kubernetes", "helm", "cloud"]
authors: ["Dirk"]
---

[Kubernetes](https://kubernetes.io){:target="_blank"} is a great tool for orchestrating all your containers in a
microservices-based application.
But managing all the YAML files (generically called *manifests* in the following) for deployments, configmaps, secrets,
services etc. can quickly turn into a nightmare.

This is the point at which *[Helm](https://helm.sh){:target="_blank"}*, which calls itself "the package manager for
Kubernetes", comes to your rescue.
In this first part of a multi-part blog post series, you'll be introduced to the basic features & benefits of Helm.

## What does Helm do?

Being a package manager, Helm provides a packaging format called *chart*.
Charts bundle together the different manifest files that are required to deploy an application, e.g.

* `config-map.yaml`
* `deployment.yaml`
* `service.yaml`

Instead of just bundling those manifest files in a package, Helm enables you to create *templates* within the chart, which are
combined with *default values* from a file called `values.yaml`, and, optionally, additional values provided at
installation time of the chart.

Like every good package manager, Helm also provides the functionality to *install*, *upgrade* and *delete* charts.
By installing a chart into your Kubernetes cluster, you create a *release*.
This is different from other package managers you might be familiar with, e.g. `apt` or `dnf`, but looking at the use case, it totally fits.
When installing a `.deb` locally, you definitely want this package to exist only once on your machine.
Installating an application like MySQL into your Kubernetes cluster, it's not uncommon that you want to install multiple
instances in parallel, each with a different configuration.
Here, multiple releases created from the same chart, but with different values applied to the templates, solve the
problem easily.

## Use Cases

Speaking of use cases, there are two main usages of Helm charts.

The first is to utilize *community charts*, i.e. charts made publicly available for standard applications like
[MySQL](https://github.com/kubernetes/charts/tree/master/stable/mysql){:target="_blank"},
[Prometheus](https://github.com/kubernetes/charts/tree/master/stable/prometheus){:target="_blank"} or
[Jenkins](https://github.com/kubernetes/charts/tree/master/stable/jenkins){:target="_blank"}.
These charts enable a quick start to using these application within your cluster, often with sophisticated configuration options
like clustering etc.

The second use case (and the one we at ePages mostly focus on) is to manage your own applications.
For example we manage all of our microservice deployments with Helm charts.
In this use case, you create your own charts for your own, mostly internal applications, but still benefit from the
templating, value-override and installation features.

## How it works

Helm consists of two parts, a command line client working locally on your machine (or on your CI/CD), surprisingly
called `helm`, and a server-side component called `tiller`, which lives within your Kubernetes cluster.

### Installation

To get started, simply download the latest Helm release from
[GitHub](https://github.com/kubernetes/helm/releases){:target="_blank"}.
Unpack the archive and add the `helm` binary to your `PATH`, and you're ready to go.

For the installation of `tiller`, you need a running Kubernetes cluster and a `KUBE_CONFIG` pointing to the cluster you
want it to be installed into (the latter is usually correctly set up when you can use `kubectl` on the cluster).

Once the prerequisites are fulfilled, just run

```
helm init
```

This way, `helm` will tell the Kubernetes API server to create a deployment for `tiller`, by default in the
`kube-system` namespace (but this is configurable).
Once the `tiller` pods are up & running, installing Helm is done and you can start creating releases in your cluster.

### Installing a Chart (aka creating a Release)

Now that you're all set, lets deploy your first application into your cluster using Helm:

```
helm install --name my-release --version 0.8.4 stable/grafana
```

With this command, you create a release named `my-release` using version `0.8.4` of the chart `grafana` from the chart
repository with the alias `stable`.
If you leave out the `--name` parameter, Helm will give your release a random name, which is nice for playing around,
but definitely not something you want to use in production.
When leaving out the `version` parameter, Helm will automatically pick the latest available version (it was only
included in this example to support the *upgrade* in the next section).
The chart repository `stable` has automatically been added to your local configuration when you ran "`helm init`".

Congratulations, you just installed [Grafana](https://grafana.com/){:target="_blank"} into your cluster with a single
command! You can check the result with

```
helm list
kubectl get pods
```

### Upgrading a Release

We just installed version `0.8.4` of the `grafana` chart, but as of the time of writing, the latest release is `0.8.5`, let's
upgrade to this version:

```
helm upgrade --version 0.8.5 my-release stable/grafana
```

Easy, isn't it?

### Deleting a Release

If you finally want to get rid of a release, you can simply delete it:

```
helm delete my-release
```

This will delete the resources created by the release, but not the metadata about the release itself, which has the
consequence that you cannot create a new release with the same name, as release names (obviously) need to be unique.
If you want to get rid of all traces of your old release, just add the `--purge` parameter, and Helm will wipe out all
traces of its existence.

## Understanding Charts

Now that you've played around a bit with Helm and created your first release, it's again time for some theory.
Let's have a closer look at what a chart actually is.

Technically, a chart is just a gzipped tar file containing a few mandatory, some optional standard files plus, also
optional, additional custom files.

The best way to start is looking at a simple example, which you can easily create yourself using the following command:

```
helm create my-example-chart
```

This will create a folder structure like this:

```
my-example-chart/
  Chart.yaml
  charts/
  templates/
    NOTES.txt
    _helpers.tpl
    deployment.yaml
     ingress.yaml
    service.yaml
  values.yaml
```

### Chart.yaml

The `Chart.yaml` file is one of two mandatory files in a chart.
It contains the metadata that describe the chart.
Let's have a look at the `Chart.yaml` of our `my-example-chart`:

```yaml
apiVersion: v1
description: A Helm chart for Kubernetes
name: my-example-chart
version: 0.1.0
```

The `apiVersion` is currently always fixed to `v1`.
The `description` and `name` properties are pretty self-explaining, as well as the `version`.
Versions of Helm charts mandatorily need to follow the [SemVer 2](https://semver.org/){:target="_blank"} specification, i.e.
they must consist of a `MAJOR`, `MINOR` and `PATCH` version part, delimited by dots.
An additional pre-release version, e.g. `rc1` could also be appended with a dash (`-`).
Although SemVer versions can also include even more information (e.g. build info), those are not considered when
determining version ordering.

In addition to the above mentioned ones, which are mandatory, the `Chart.yaml` could contain an arbitrary number of
additional properties, some pre-defined, and whatever custom properties you need to describe your chart. Have a look at
the [docs](https://docs.helm.sh/developing_charts/#charts){:target="_blank"} for a detailed list of standard properties.

### The charts folder

Charts can depend on other charts, i.e. include their templates and inherit from them.
When you use these dependencies, the charts your current chart depends upon, will be placed in the `charts` folder,
either automatically, when using Helm's dependency management, or manually by the chart developer.

We'll leave this topic out for the moment, and have a slightly closer look at it below when discussing the
`requirements.yaml`.

### The templates folder

The `templates` folder is where most of the "magic" of Helm happens.
As expected, it mainly contains the actual templates for the manifests your application needs when being installed.

As templates are going to be the core of the second part of this short blog post series, I'm not going into any details
here.

In addition to the template files for the manifests, there can be two other types of files in this folder: *helpers* and
the `NOTES.txt`.

All files with a name beginning with an underscore (`_`) are considered helpers.
They will not be rendered as part of the release, but contain template definitions which are used in various places.
This makes them a kind of "template library".
Let's have a look at one of the helpers generated by default as an example:

```go
{% raw %}
{{- define "my-example-chart.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{% endraw %}
```

You can use the template function defined here in any manifest template you create, which highly reduces duplication.
Please don't care too much about the syntax for now, as we will have a much closer look at it in the next part.

The already mentioned `NOTES.txt` file is used for documentation purposes.
It can contain template expressions and will be rendered to the command line after you installed the chart into your
cluster.
Its purpose is to help the users of your chart to find their way through the installed artifacts, and tell them how to
use them.

### values.yaml

The `values.yaml` in your chart is the second mandatory file.
It contains the default values to be used in your templates, so they can (at least mostly) be rendered without the
need to override values.

The content of the `values.yaml` is an arbitrary YAML structure, which you can define however you want, although there
are some advices on how to structure them for ease of use that you will see in the next blog post.

```yaml
# Default values for my-example-chart.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
image:
  repository: nginx
  tag: stable
  pullPolicy: IfNotPresent
service:
  name: nginx
  type: ClusterIP
  externalPort: 80
  internalPort: 80
```

### requirements.yaml

When your chart gets more complicated, or the application you want to deploy consists of multiple components, then
it's time for a `requirements.yaml`.
This file contains a list of other charts on which your chart depends.
Let's have a look at how dependencies are described in the file:

```yaml
dependencies:
- name: apache
  version: 1.2.3
  repository: http://example.com/charts
- name: mysql
  version: 3.2.1
  repository: @stable
```

In this case, our application consists of at least two parts: an Apache web server, which will be deployed using the
defined chart in version `1.2.3`, and a MySQL database, using the corresponding chart in version `3.2.1`.
They are downloaded from different chart repositories, the first one defined by the actual URL, the second one by an
alias `stable`, which you can define using the `helm repo` commands (see `helm repo --help` for details).

### Other optional files

On top of the files and folders discussed so far, a chart can also contain additional files.
Two of them can be considered "optional standard files" for documentation, and these are:

File name   | Description
------------|------------
`LICENSE`   | A plain text file containing the license for the chart
`README.md` | A human-readable README file

Furthermore, you can also add any other file you need, e.g. files containing static data to be used within your
templates, although this is (at least in my experience) not a very common requirement.

## Outlook

So far, we've had a look at the basic features of Helm and got a high-level overview on how it works.
You also learned about the structure of charts and how to create them.
The next part of this series will show you how to write templates, how overriding values works, and provide some
(hopefully) useful tips & tricks.

Stay tuned...

## Related posts

* [Kubernetes Deployments with Helm - Templates & Values](/blog/tech-stories/kubernetes-deployments-with-helm-templates)
* [Kubernetes Deployments with Helm - Secrets](/blog/tech-stories/kubernetes-deployments-with-helm-secrets/)
