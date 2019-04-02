---
layout: post
title: How I became fond of Ruby on Rails (as a JavaScript developer)
date: 2019-04-16
header_image: public/my-switch-from-js-to-ruby.jpg
header_position: center
category: tech-stories
tags: ["javascript", "ruby", "development"]
authors: ["German"]
about_authors: ["gsanemeterio"]
---

At the beginning of this year I joined ePages as software engineer with focus on Ruby on Rails, although before I worked with Angular.
When I first got the opportunity to work as a Ruby developer at ePages, the decision was not easy for me to make.
But at the end I took the chance.
I like new challenges and to learn new things, and I saw it was a great opportunity.
In this post I'd like to share some insights with you on how I got started with Rails.

## Learning Rails

In order to learn Rails I started with the famous [Rails tutorial of Michael Hartl](https://www.railstutorial.org/){:target="_blank"}.
During 3 weeks I was reading and trying it at the same time that I was doing the exercises.
It's amazing how fast things can be done in Rails!
When I was done with the tutorial, I started to do pair programming with my teammate right away.
He explained me the projects and cleared away my doubts about Ruby.
Shortly after that, I started with my own tasks, and applied what I learned in the tutorial.

## Discovering similarities and differences

While I was doing the tutorial I recognized the similar things between Rails and another languages with I worked with or that I've seen before, such as Symfony.
Due to my experience with other languages I was able to associate concepts of Rails with other languages that I know.
While I was doing the tutorial I was surprised how easy it was with Rails to manage a database, thanks to ActiveRecord.

Every language is different, and JavaScript and Ruby are not an exception.
I still wonder how I would do things in JavaScript and then I search for an equivalent in Ruby.

Here are some syntax differences I figured out:

- In Ruby is not necessary type parenthesis to send parameters in a function.
- Foreach

```ruby
(0..5).each do |i|
   puts "Value of local variable is #{i}"
end
```

```js
[0, 1, 2, 3, 4, 5].foreach((i) => {
  console.log(`Value of local variable is ${i}`)
})
```

- In Ruby you don't have to declare variables.
- Unlike other languages you don't have to type `return` to give back data, as always the result of the last line of code is returned.

```ruby
def sum(num1, num2)
  num1 + num2
end

result = sum 5, 6
```

```js
function sum(num1, num2) {
  return num1 + num2;
}

let result = sum(5, 6);
```

## It's magic(k)

When some friend told me about Rails, he mentioned the word `magick`.
Today I finally understand why.

- ActiveModel: I remember that in my last job there was a problem to make Synfony work with Oracle. When I saw ActiveRecord the first thing that I did was search Google for information about Rails. It looks like there's no problem to integrate Rails and Oracle.
- Trust: Rails with only type the name of some functions knows how to work.

```ruby
def index
end
```

This is a little reflection of someone who left his comfort zone.
For me there's still room for improvement, both in JavaScript and Ruby, but that's another story.