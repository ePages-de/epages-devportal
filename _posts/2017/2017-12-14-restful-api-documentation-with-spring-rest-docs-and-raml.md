---
layout: post
title: RESTful API documentation with Spring REST Docs and RAML
date: 2017-12-14
header_image: public/restdocs-raml.jpg
header_overlay: true
header_position: top
category: api-experience
tags: ["api", "documentation", "raml"]
authors: ["Mathias"]
---

[Spring REST Docs](https://projects.spring.io/spring-restdocs/){:target="_blank"} is a great tool to produce documentation for your RESTful services that is accurate and readable.
It offers support for [AsciiDoc](http://asciidoctor.org/){:target="_blank"} and [Markdown](https://daringfireball.net/projects/markdown/){:target="_blank"}. This is great for generating simple HTML-based documentation.

We have been using Spring REST Docs from the start in our new ecommerce backend. 
The feature we love most is that the documentation of resources is part of our tests.
Thus we can be sure that the documentation is always up-to date. 
New fields added to a resource are never left undocumented.
Changed and removed fields will not leave the documentation stale.
This is awesome.

Also it is really easy to generate a simple HTML-based documentation using Spring REST Docs. 
This gives us good documentation for a start without spending a lot of effort on it.

You can look at our current [public API documentation](http://docs.beyondshop.cloud){:target="_blank"} to see how far we got with plain Spring REST Docs.

## API first

Our new Beyond ecommerce backend follows an API-first approach. 
The API is our product.
We would like to attract third-party developers to work with our API.
This means that a good API is really important for us and so is an appealing documentation.


Our tech-writers would really love to see an interactive API documentation that allows users of our API to already play with it while going through the documentation.
It should be a good source of information and also a nice appetizer to start using our product.

## Technical API documentation format

AsciiDoc is the preferred format that Spring REST Docs uses to generate and write documentation. 
It is a markup language, and thus, it is hard to get any further than statically generated HTML, because it is hard to parse.

It would be much nicer if we could get a technical exchange format out of Spring REST Docs. 
Something that is more flexible and more suitable for the goal of an interactive API documentation.

[RAML (RESTful API Modeling Language)](https://raml.org/){:target="_blank"} seemed more suitable for our needs.
RAML is a YAML based language for the definition of RESTful APIs. 
RAML is designed to improve the specification of the API by providing a format that both, the API provider and API consumers, can use as a mutual contract.

RAML also comes with a [rich ecosystem](https://raml.org/projects){:target="_blank"} with a lot of tools for different use cases. 
You can:
  - generate an HTML representation of your API - [raml2html](https://www.npmjs.com/package/raml2html){:target="_blank"}
  - interact with your API using an API console - [api-console](https://github.com/mulesoft/api-console){:target="_blank"}
  - import RAML into REST clients such as [Postman](https://www.getpostman.com){:target="_blank"}, or [Paw](https://paw.cloud){:target="_blank"} to start playing around with an API

Generally it seems to be used to specify an API, but we think it is also a good choice for our needs. 
Once we have a RAML file describing our API, this offers a lot more possibilities than AsciiDoc or Markdown.
So we decided to try to use RAML as an output format for Spring REST Docs. 

## Introducing restdocs-raml

We came up with an open-source project that supports just this - [restdocs-raml](https://github.com/ePages-de/restdocs-raml){:target="_blank"}.

The project provides a new snippet type that generates a RAML fragment for the current resource. 
The [RamlResourceSnippet](https://github.com/ePages-de/restdocs-raml/blob/master/restdocs-raml/src/main/java/com/epages/restdocs/raml/RamlResourceSnippet.java){:target="_blank"} can be used to document:
 - path parameters
 - request parameters
 - request fields
 - response fields
 - links
 - JWT scopes
 
So the `ramlResource` snippet documents all aspects of the resource rather than generating different snippets for each concern. 
We tried to come up with an API that uses a lot of the factory methods from Spring REST Docs, and tries to align as much as possible with the existing API. Also the validation functionality of Spring REST Docs still applies.
That way, it easy to migrate existing code. 

```java
mockMvc
  .perform(get("/notes/{id}", noteId))
  .andExpect(status().isOk())
  .andDo(document("notes-get", 
    ramlResource(RamlResourceSnippetParameters.builder()
      .description("Get a note by id")
      .pathParameters(parameterWithName("id").description("The note id"))
      .responseFields(
        fieldWithPath("title").description("The title of the note"),
        fieldWithPath("body").description("The body of the note"),
        fieldWithPath("_links").description("Links to other resources"))
      .links(
        linkWithRel("self").description("This self reference"),
        linkWithRel("note-tags").description("The link to the tags associated with this note"))
    .build()))
);
```

Note how we use an URL template using `RestDocumentationRequestBuilders.get("/notes/{id}", noteId)`.
The URL template builder method in [RestDocumentationRequestBuilders](https://docs.spring.io/spring-restdocs/docs/current/api/org/springframework/restdocs/mockmvc/RestDocumentationRequestBuilders.html#get-java.lang.String-java.lang.Object...-){:target="_blank"} captures the template and makes it available for documentation.  

The `ramlResource` snippet generates a `raml-resource.raml` in the operation's output directory:

```yaml
/notes/{id}:
  uriParameters:
    id:
      description: The note id
      type: string
  get:
    description: Get a note by id
    responses:
      200:
        body:
          application/hal+json:
            schema: !include notes-get-schema-response.json
            example: !include notes-get-response.json
```

The referenced file `notes-get-response.json` contains the example request. 
`notes-get-schema-response.json` contains a json schema generated from the response field section of the snippet input.

Now we have a RAML fragment for each of our resources. 
But usually a RAML file describes a complete API.
So next we need to aggregate these fragments into a complete RAML file for the service. 
For this purpose, we provide the [`restdocs-raml-gradle-plugin`](https://github.com/ePages-de/restdocs-raml/tree/master/restdocs-raml-gradle-plugin){:target="_blank"}. 
It adds a task `ramldoc` that scans the `generated-snippets` directory for `raml-resource.raml` files, and aggregates them into a RAML file containing all the documented resources.

This is how such a top level `api.raml` file could look like:

```yaml
#%RAML 1.0
title: Notes API
baseUri: http://localhost:8080/
/tags: !include tags.raml
/notes: !include notes.raml
```

The referenced `notes.raml` contains all the resources under `/notes`:
```yaml
  post:
    description: Create a note
    body:
      application/hal+json:
        type: !include notes-create-schema-request.json
        example: !include notes-create-request.json
  get:
    description: notes-list
    responses:
      200:
        body:
          application/hal+json:
            example: !include notes-list-response.json
  /{id}:
    uriParameters:
      id:
        description: The note id
        type: string
    get:
      description: Get a note by id
      responses:
        200:
          body:
            application/hal+json:
              type: !include notes-get-schema-response.json
              example: !include notes-get-response.json
    patch:
      description: Partially update a note
      body:
        application/hal+json:
          type: !include notes-patch-schema-request.json
          example: !include notes-patch-request.json
```

The json schema files contain the field documentation - `notes-create-schema-request.json`:
```json
{
  "type" : "object",
  "properties" : {
    "body" : {
      "description" : "The body of the note",
      "type" : "string"
    },
    "title" : {
      "description" : "The title of the note",
      "type" : "string"
    },
    "tags" : {
      "description" : "An array of tag resource URIs",
      "type" : "array"
    }
  }
}
```          

## Play around

To get started a look at the [README](https://github.com/ePages-de/restdocs-raml/blob/master/README.md){:target="_blank"} is helpful to understand how [restdocs-raml](https://github.com/ePages-de/restdocs-raml){:target="_blank"} works. 
The repository contains a sample project [restdocs-raml-sample](https://github.com/ePages-de/restdocs-raml/tree/master/restdocs-raml-sample){:target="_blank"}. 
The main test that documents the resources in `restdocs-raml-sample` is located in [ApiDocumentation.java](https://github.com/ePages-de/restdocs-raml/blob/master/restdocs-raml-sample/src/test/java/com/example/notes/ApiDocumentation.java){:target="_blank"}.
Let's checkout the sample project, and play around with it to see what `restdocs-raml` can do for us. 

```
git clone git@github.com:ePages-de/restdocs-raml.git
cd restdocs-raml/restdocs-raml-sample
```

First we run our tests and let the `restdocs-raml-gradle-plugin` do it's work. 
The task `ramldoc` depends on the `check` task, so the tests are executed automatically.

```bash
./gradlew ramldoc
```

The RAML artifact we are looking for is now located in `build/ramldoc/`. 
The top level RAML file is named `api.raml`.

Now we can explore the possibilities that the RAML description of our API can do for us.

### Generate an HTML representation

The sample project contains a gradle setup for `raml2html` using docker. 
So you do not have to install [raml2html](https://www.npmjs.com/package/raml2html){:target="_blank"} manually.

```bash
./gradlew raml2html
open build/ramldoc/api.raml.html
```

Here we go, `build/ramldoc/api.raml.html` now contains an HTML representation of our API.

{% image_custom image="/assets/img/pages/blog/images/restdocs-raml-raml2html.png" width="50" caption="raml2html output" lightbox %}

### Generating an API console

The `raml2html` output is pretty neat already. But let's see if we can achieve something more interactive. 
Let's look at [api-console](https://github.com/mulesoft/api-console){:target="_blank"}. 
This is a simple tool that can be used to generate an interactive interface from a raml file.

We use the [api-console-cli](https://www.npmjs.com/package/api-console-cli){:target="_blank"} to generate an api-console.

```bash
npm install -g api-console-cli
cd build/ramldoc
api-console dev api.raml
```

💡 In case you see the error `Required json property not found` see this [issue](https://github.com/mulesoft-labs/api-console-cli/issues/18){:target="_blank"} for a workaround

Now you can explore and interact with the API.

{% image_custom image="/assets/img/pages/blog/images/restdocs-raml-api-console.gif"  width="50" caption="api-console" lightbox  %}

## Next steps

We are convinced that `restdocs-raml` can help us to keep the benefits of Spring REST Docs by leveraging the additional value that RAML provides. 
That's why we will refactor our tests that document resources to output RAML with the help of `restdocs-raml`, and improve the project as we proceed.

There are a few improvements that we already have in mind.

At the moment we use Json Schema to define types in RAML. 
This is mainly due to RAML 0.8 compatibility. 
RAML 1.0 now allows a yaml-based type definition that is more readable, and also better supported by tools such as `api-console`, and `raml2html`. 
So adding this feature would make sense. 

Documenting a resource multiple times is not supported at the moment. 
In the aggregation phase the resource path is unique. 
RAML can document different kinds of responses for each resource. It would be nice to support this in the aggregation.

Also we will have a look at documenting cross-cutting concerns like paging, and links.

So stay tuned for more to come.

We are always eager to hear your feedback about `restdocs-raml` - so drop us a line to let us know what you think.

