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

At the beginning of this year I joined ePages as a software engineer with focus on Ruby on Rails, although I worked with Angular before.
When I first got the opportunity to work as a Ruby developer at ePages, the decision was not easy for me to make.
But at the end I took the chance.
I like new challenges and to learn new things, and it felt like a great opportunity.
In this post I'd like to share some insights with you on how I got started with Rails.

## Learning Rails

In order to learn Rails I started with the famous [Rails tutorial of Michael Hartl](https://www.railstutorial.org/){:target="_blank"}.
During 3 weeks I was reading and trying it at the same time that I was doing the exercises.
It's amazing how fast things can be done in Rails!
When I was done with the tutorial, I started to do pair programming with my teammate right away.
He gave me insights on the different projects and cleared away my doubts about Ruby.
Shortly after that, I started with my own tasks, and applied what I learned in the tutorial.

## Discovering similarities and differences

While I was doing the tutorial, I recognized similarities between Rails and other languages I have worked with or that I've seen before, such as Symfony.
This way, I was able to associate concepts of Rails with these other languages.
But every language is different, and JavaScript and Ruby are no exception.
I still wonder how I would do things in JavaScript and then I search for an equivalent in Ruby.

Here are some syntax differences I figured out for Ruby:

- It's not necessary to type parenthesis in order to send parameters in a function.
- The different usage of `foreach` in Ruby

```ruby
(0..5).each do |i|
   puts "Value of local variable is #{i}"
end
```

and in Javascript

```js
[0, 1, 2, 3, 4, 5].foreach((i) => {
  console.log(`Value of local variable is ${i}`)
})
```

- You don't have to declare variables.
- Unlike in Javascript and other languages, you don't have to type `return` to give back data, as the result of the last line of code is always returned:

```ruby
def sum(num1, num2)
  num1 + num2
end

result = sum 5, 6
```

As a comparison, here's what to do in Javascript:

```js
function sum(num1, num2) {
  return num1 + num2;
}

let result = sum(5, 6);
```

## It's magic

When a friend of mine told me about Rails, he mentioned the word *magic*.
Today I finally understand why.
Here are some reasons:

- ActiveRecord: I remember that in my last job it was difficult to make Symfony work with Oracle. When I saw ActiveRecord, the first thing I did was searching for information about Rails. It looks like there's no problem to integrate Rails and Oracle.
- Conventions: Rails is one of those frameworks that follows the rule "Convention Over Configuration" which can result in writing empty methods like the following:

```ruby
class UsersController < ApplicationController
  def index
  end
end
```
In these cases, Rails automatically tries to render a file named index.* inside of a folder called users/.

I'm sure there's more.
But this is only a first reflection of someone who left his comfort zone.
For me, there's still room for improvement and further learnings, both in JavaScript and Ruby, but that's another story.