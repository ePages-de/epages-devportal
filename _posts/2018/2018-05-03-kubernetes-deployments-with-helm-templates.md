---
layout: post
title: Kubernetes Deployments with Helm - Templates & Values
date: 2018-05-03
header_image: public/helm-header-2.jpg
header_position: center
header_overlay: true
category: tech-stories
tags: ["kubernetes", "helm", "cloud"]
authors: ["Dirk"]
about_authors: ["djablonski"]
---

In the [first post](/blog/tech-stories/kubernetes-deployments-with-helm) of this small series I wrote about the basic features of Helm, and how it works.
Now it's time to dive deeper into creating your own charts, with a focus on how to write templates.
In addition, we'll look at how overriding values works, which is essential knowledge when working with chart dependencies.

## Writing templates

First of all a disclaimer: This blog post will only scratch the surface of the large topic of writing templates for Helm.
A far more extensive introduction to this can be found in the official [Helm docs](https://docs.helm.sh/chart_template_guide){:target="_blank"}.

Templates in Helm are based on [Go template language](https://godoc.org/text/template){:target="_blank"}.
The basic templating functionality available there is significantly extended using the
[Sprig template library](https://godoc.org/github.com/Masterminds/sprig){:target="_blank"}, and very few Helm-specific enhancements.

In this post, I'm not going into the syntax of templates, as you can far better read it up in the linked docs.
Let's concentrate on the concepts beyond template syntax.
This starts with the way to access values, which is done via _built-in objects_.

### Built-in objects

Built-in objects are a way to access several types of values, some of which are directly configured by you, while others are generated dynamically by Helm or taken from other parts of the chart.

The three main built-in objects you'll most likely use are: `Chart`, `Release` and `Values`.

As the name suggests, the chart built-in provides access to chart metadata, e.g. chart name and version. The same applies to the `Release` built-in, which does the same for a release you create when installing the chart.

The by far most important built-in is the `Values` object. It gives you access to all the values configured in the `values.yaml` of your chart, it's sub-charts, and any values files or values provided directly on the command line.

### Control structures

Without going into details, you should know that Go templates provide the typical control structures you'll find in nearly all templating languages: `if / else`, and `range` (loop).
Here's a simple example:

```go
{%- raw %}
{{- if .Values.deployment.volumes }}
volumes:
{{- range .Values.deployment.volumes }}
- name: {{ .name }}
  secret:
    secretName: {{ .secretName }}
{{- end }}
{{- end }}
{% endraw %}
```

Additionally, there is also the `with` block, which is about narrowing the scope of the context for better readability and more expressive template blocks.

```go
{%- raw %}
{{- with .Values.deployment }}
strategy:
  rollungUpdate:
    maxUnavailable: {{ .maxUnavailable }}
    maxSurge: {{ .maxSurge }}
revisionHistoryLimit: {{ .revisionHistoryLimit }}
minReadySeconds: {{ .minReadySeconds }}
{{- end }}
{% endraw %}
```

### Functions

The Go template language provides some basic functions, and the Sprig library add lots more.
Here are some examples of functions available to you when writing templates:

- `default`: allows to provide default values in case of absence of a value
- `quote`: quotes the value, e.g. for environment variables
- `b64enc`: base64-encrypt the value, e.g. required in secrets
- `trim`: trim leading & training whitespaces

### Pipelines

While functions are valuable themselves, the full power of using them shows up with the possibility to create pipelines from them.
Just like you might be used to from command line tools, you "pipe" the output from one function into another, enabling sophisticated transformations.
Here's an example again:

```go
{%- raw %}
database.readonly: {{ .Values.database.readOnly | default false | quote | base64enc }}
{% endraw %}
```

### Checking the results

Once you have your templates done, and often already during the process of writing them, you'll probably want to try out if your templates work as intended.
To do this, Helm offers two different commands which let you check the results: `helm lint` and `helm template`.

`helm lint` checks your charts for possible issues, emitting errors for issues which will make installing the chart fail, and warnings for less critical issues, e.g. when conventions & best practices are violated.

`helm template` is actually rendering your template locally (without requiring `tiller`), and therefore provides the resulting manifests as output, so you could check directly if the outcome of the rendering matches your expectations.

## Tips & tricks

On top of some nice tricks you can find in the official Helm docs, there is one thing a colleague of mine came up with which deals with overriding values when using sub-charts.

Consider you have a sub-chart you build your chart upon, and customize and enhance it.
This sub-chart defined a value list like this:

```yaml
ports:
- name: http
  externalPort: 80
  internalPort: 8080
- name: management
  externalPort: 81
  internalPort: 8081
```

This is the "standard way" you'll find in several examples.
In the template, e.g. a `service.yaml`, it would be used like this:

```go
{%- raw %}
{{- range .Values.ports }}
- port: {{ .externalPort }}
  targetPort: {{ .internalPort }}
  type: TCP
  name: {{ .name }}
{{- end }}
{% endraw %}
```

Now think about how you're going to add a third port in your own chart.
If you try to add an additional value to the list in your local `values.yaml`- like this:

```yaml
ports:
- name: admin
  externalPort: 5000
  internalPort: 5000
```

then you'll experience that the result is most likely not what you expected.
The resulting service will only contain one port, the one you declared in you chart, but none from the sub-chart.
This is due to the fact that lists are neither overridden completely, nor merged (which would cause other difficulties).

So how are we going to solve this?
Usually the first thing that comes to your mind will be to include the values from the sub-chart into your list.
But you'll discard this immediately, as this is bad case of duplication, and calls for trouble that something changes in the sub-chart.

My colleague came up with the following solutions, which - at least for us - works quite well:

Instead of defining the values as a list, define them as a hash like this:

```yaml
ports:
  http:
    externalPort: 80
    internalPort: 8080
  management:
    externalPort: 81
    internalPort: 8081
```

Your template will get a little more complex, as you'll need to get access to the key and the value of the hash:

```go
{%- raw %}
{{- range $key, $value .Values.ports }}
- port: {{ $value.externalPort }}
  targetPort: {{ $value.internalPort }}
  type: TCP
  name: {{ $key }}
{{- end }}
{% endraw %}
```

If you now add your fancy admin port setting in the same way within your chart, like this:

```yaml
ports:
  admin:
    externalPort: 5000
    internalPort: 5000
```

then your result will contain the expected three ports `http`, `management` and `admin`.

## Outlook

In this part, we had a quick look at the basics of writing templates for your charts, and learned about how to override list-like values the easy way.
The final part of this mini-series, which will be written by my colleague Alex, will cover another interesting topic:
How to keep your secrets a secret, i.e. managing values for secrets with encryption.
It's a very interesting topic, so tune in again...

## Related posts

* [Kubernetes Deployments with Helm - Basic features](/blog/tech-stories/kubernetes-deployments-with-helm/)
* [Kubernetes Deployments with Helm - Secrets](/blog/tech-stories/kubernetes-deployments-with-helm-secrets)

