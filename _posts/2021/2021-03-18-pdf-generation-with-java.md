---
layout: post
title: PDF generation with Java
date: 2021-03-18
header_image: public/TBD.jpg
header_position: center
header_overlay: true
category: methods-and-tools
tags: ["java", "pdf"]
authors: ["Jan M."]
about_authors: ["jmewes"]
---

Once upon a time, we were using [LibreOffice](https://www.libreoffice.org/) and [Py3o](https://py3otemplate.readthedocs.io/en/latest/templating.html) for our PDF generation.
This worked out quite well since you can edit the templates with a [WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG) editor.
In this way, (in theory) the Product Owners don't even need developers anymore to get their ideas done.
However, when we started to support more and more languages in [our shop system](https://signup.beyondshop.cloud/), we realized that we need a different solution that has better support for internationalization.
This blog post is a description of our new solution and the story of how we got there.

### Research

We started our research by listing all tools and libraries with which it is possible to programmatically generate PDF files.
Out of those, we identified the options which seemed most promising for us:

- [Apache FOP](https://xmlgraphics.apache.org/fop/) : A Java library which renders PDFs based on XML templates.
- [HTML PDF API](https://htmlpdfapi.com/) : A SaaS service which renders PDFs based on HTML templates.
- [OpenHtmlToPdf](https://github.com/danfickle/openhtmltopdf) : A Java library which renders PDFs based on HTML templates.
- [Pandoc and LaTeX](https://awesomeopensource.com/project/Wandmalfarbe/pandoc-latex-template) : A command-line tool which renders PDFs, for example from Markdown templates.
- [pdfmake](http://pdfmake.org/) : A NodeJS library which renders PDFs based on a custom JavaScript API.
- [wkhtmltopdf](https://wkhtmltopdf.org/) : A command-line tool which renders PDFs based on HTML templates.

For each of these tools, we figured out how they work and what their respective pros and cons are.

In the next phase, we built prototypes for the options that seemed most promising to us: OpenHtmlToPdf, pdfmake, and Apache FOP.
Finally, OpenHtmlToPdf turned out to be the preferred choice by 80% of the developers involved in the decision.

In the following, I will describe how OpenHtmlToPdf can be used.

### Dependencies

We are using [Gradle](https://gradle.org/) as the build system for our Java projects.
Here are the dependency declarations in the `build.gradle` file which are necessary to use OpenHtmlToPdf:

```groovy
implementation "com.openhtmltopdf:openhtmltopdf-core:1.0.6"
implementation "com.openhtmltopdf:openhtmltopdf-pdfbox:1.0.6"
implementation "com.openhtmltopdf:openhtmltopdf-slf4j:1.0.6"
```

The dependency declarations for other build systems like Maven can be found at [mvnrepository.com](https://mvnrepository.com/artifact/com.openhtmltopdf).

### Hello, World!

The biggest advantage of OpenHtmlToPdf is that it is very simple to use.
To define the content and layout of the PDF files, plain HTML and CSS can be used.

Here is an example template for a PDF which contains an underlined headline and some text:

```html
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Hello, World!</title>
  <style>
    h1 {
      text-decoration: underline;
    }
  </style>
</head>

<body>
  <h1>Hello, World!</h1>
  <p>Lorem ipsum dolor sit amet.</p>
</body>

</html>
```

On the Java side, the PDF can be rendered with the help of the [`PdfRendererBuilder`](https://javadoc.io/static/com.openhtmltopdf/openhtmltopdf-pdfbox/1.0.0/com/openhtmltopdf/pdfboxout/PdfRendererBuilder.html) from the OpenHtmlToPdf API.
After instantiating it, we need to register the HTML content with the method `withHtmlContent`.
Further, we need to register a stream where to put the PDF data with the `toStream` method.
Then we can create the PDF by calling the `run` method.
Afterwards, we can get the bytes of the PDF by calling `toByteArray`.
This byte array we can then finally write into a file or upload to some storage.

```java
var renderedPdfBytes = new ByteArrayOutputStream();
var builder = new PdfRendererBuilder();
builder.withHtmlContent(html, "/");
builder.toStream(renderedPdfBytes);
builder.run();
renderedPdfBytes.close();
var renderedPdf = renderedPdfBytes.toByteArray();

try (var fos = new FileOutputStream("example.pdf")) {
    fos.write(renderedPdf);
}
```

### Layout

> (OpenHtmlToPdf is) not a web browser. Specifically, it does not run javascript or implement many modern standards such as flex and grid layout.

Even though the [README file](https://github.com/danfickle/openhtmltopdf) of OpenHtmlToPdf states that they are "not a web browser", they are pretty close to it.
They support a very wide range of CSS features.
So much so that it rather feels like an exception when something is missing.

For the metadata sections on the header of the first page of the documents, we are for example using absolute positioning like this:

```css
#foo {
  position: absolute;
  top: 90px;
  right: 0;
}
```

For the main document content we are then using relative positioning.
With this, the main content starts below the header of the first page whereas it is positioned right at the top of the page on all subsequent pages.

```css
#bar {
  position: relative;
  top: 300px;
  left: 50px;
}
```

At multiple places in our documents, for example in the footer columns, the missing grid layout is emulated with tables.

### Challenges

Our biggest doubt in regards to the feature set of OpenHtmlToPdf was whether it supports a repeating header row for tables that span over multiple pages.
It turned out that this is supported and requires nothing more but a little bit of CSS:

```css
#baz table {
  -fs-table-paginate: paginate;
}
```

Another important and non-trivial part for achieving the required layout was to have page numbering.
This can also be done with plain CSS by using the [Generated Content for Paged Media Module](https://www.w3.org/TR/css-gcpm-3/#funcdef-element):

```html
<head>
  <style>
    @page {
      margin-bottom: 150px;

      @bottom-center {
        content: element(footer);
      }
    }

    #footer {
      position: running(footer);
      width: 100%;
    }

    #footer #currentPageNumber:before {
      content: counter(page)
    }
  </style>
</head>

<body>
  <div id="footer">
    <span id="currentPageNumber"></span>
  </div>

</div>
</body>
```

### Templating

For the internationalization, we are using property files which are managed by our Tech Writers with the help of [Phrase](https://phrase.com/).
After loading the property files in the required locale, we are rendering the translations into HTML with the help of [Pebble Templates](https://pebbletemplates.io/).

The following snippet shows an example of the usage of Pebble.
First, we need to build a [`PebbleEngine`](https://javadoc.io/doc/io.pebbletemplates/pebble/latest/com/mitchellbosecke/pebble/PebbleEngine.html) instance with the configuration needed for the HTML rendering.
Then we can load the Pebble template, in this case, the resource file `src/main/resources/example.peb`.
Finally, we can provide the values for the template and request the rendered string.

```java
var pebbleEngineBuilder = new PebbleEngine.Builder()
        .newLineTrimming(false)
        .addEscapingStrategy("html", new HtmlEscapingStrategy());
var pebbleEngine = pebbleEngineBuilder.build();
var pebbleTemplate = pebbleEngine.getTemplate("example.peb");

var values = new HashMap<String, Object>();
values.put("message", "Hello, World!");
var stringWriter = new StringWriter();
pebbleTemplate.evaluate(stringWriter, values);

var html = stringWriter.toString();
```

The details of the [`HtmlEscapingStrategy`](https://javadoc.io/doc/io.pebbletemplates/pebble/latest/com/mitchellbosecke/pebble/extension/escaper/EscapingStrategy.html), the example template, and the [build dependency](https://mvnrepository.com/artifact/io.pebbletemplates/pebble) are left out of this blog post for the sake of brevity.

### Conclusion

We were able to replicate the layout of the original PDFs so much that you would need a magnifier to spot a difference.

Now, our designers and developers can edit the PDF templates with their common tools.
When we are doing changes, they can be reliably validated across different operating systems.
Further, the HTML-based approach allows us to automatically compare the rendered templates against expected snapshots.

All in all, we are now happy OpenHtmlToPdf users.
