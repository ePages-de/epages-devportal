---
layout: post
title: How to implement endless scrolling for Jekyll blog posts
date: 2018-04-17
header_image: public/endless-scroll-for-jekyll-posts.jpg
header_position: center
header_overlay: true
category: coding
tags: ["jekyll", "blog", "gem"]
authors: ["Unai A."]
---

As explained on the [Jekyll pagination docs](https://jekyllrb.com/docs/pagination/){:target="_blank"}, the usual way of paginating the posts on your blog is to create different pages (i.e. `/blog/page-1/`, `/blog/page-2/`, ...), and then putting the typical **Next** and **Prev** buttons on those pages to navigate between them.
This solution works perfectly fine, but it can be tedious if a visitor wants to check the very first blogpost.

How to avoid this, I will explain in this post.
You are going to learn how to implement an API with which you can create a JavaScript endless scrolling functionality for your blog index page as well as for your category pages. Let's get started.

## Prerequisites

For this tutorial I am using:

* [Jekyll](https://jekyllrb.com/){:target="_blank"} version 3.7.2
* [Jekyll Paginate V2](https://github.com/sverrirs/jekyll-paginate-v2){:target="_blank"} version 1.9.0

## Gem installation and configuration

First you need to install the **Jekyll Paginate V2** gem.
To do so, add the following to your `Gemfile`, and run `bundle install` in your command line:

```ruby
group :jekyll_plugins do
  gem 'jekyll-paginate-v2', '1.9.0'
end
```

Then you need to configure the **Jekyll Paginate V2** gem.
Add `jekyll-paginate-v2` to your `plugins` list, and then configure the pagination plugin with the following parameters:

```yaml
plugins:
  - jekyll-paginate-v2

pagination:
  enabled: true
  per_page: 6
  sort_reverse: true
  indexpage: page-1
  permalink: page-:num
  extension: json
```

Let's have a look at the plugin configuration:

* `enabled: true` enables the plugin.
* `per_page: 6` configures the amount of posts that you want to load on each call.
* `sort_reverse: true` orders the posts from the most recent to the oldest one.
* `indexpage: page-1` sets the first page of the pagination.
* `permalink: page-:num` should be the same as the `indexpage` but with the `:num` variable, where the page numbers are going to be loaded.
* `extension: json` sets the file type that is going to be generated.

## Set up the blog index page

Create a page for your blog index page (in our case it is `_pages/api/blog.html`), and include there the content below.
This will create different JSON files for each pagination pages:

```liquid
---
layout: null
permalink: /api/blog/
pagination:
  enabled: true
  collection: posts
---

{% raw %}{
  "posts": "{%- for post in paginator.posts -%}
    {%- capture posts_html -%}
      {% include components/post-card.html
                 category=post.category
                 header_image=post.header_image
                 title=post.title
                 authors=post.authors
                 date=post.date
                 url=post.url %}
    {%- endcapture -%}
    {{ posts_html | strip_newlines }}
  {%- endfor -%}",
  "next_page": {% if paginator.next_page %}"{{ paginator.next_page_path | xml_escape }}"{% else %}null{% endif %}
}{% endraw %}
```

Notice that we used an `_include` partial for rendering the `html` of the post card (`_includes/components/post-card.html`). **It is very important to not use double quotation marks** on this file, **because it will break the infinite scrolling** functionality.

Now, after running the `jekyll serve` command, you should be able to access `localhost:4000/api/blog/page-1.json` and see the JSON document that contains the `html` of the current page's posts as well as the url of the new page.

## Set up the blog category page

If you want to add this functionality to your category pages, create a new page (i.e. `_pages/api/categories/<your-category>.html`), duplicate the content from `_pages/api/blog.html` page and apply these changes to the front matter:

* Change the `permalink` attribute to `permalink: /api/blog/<your-category>/`.
* Substitute `collection: posts` with `category: <your-category>`.

```yaml
---
layout: null
permalink: /api/blog/coding/
pagination:
  enabled: true
  category: coding
---
```

## And done!

That's it.
Now you only need to code a JavaScript on your blog index page that consumes the API you created when the user scrolls down.
