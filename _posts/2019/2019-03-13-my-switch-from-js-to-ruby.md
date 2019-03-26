---
layout: post
title: How I became fond of Ruby on Rails (as a JavaScript developer)
date: 2019-03-13
header_image: public/my-switch-from-js-to-ruby.jpg
header_position: center
category: tech-stories
tags: ["javascript", "ruby", "development"]
authors: ["German"]
about_authors: ["gsanemeterio"]
---

I am currently part of ePages as software engineer with ruby as language, although before I worked with Angular.

## Learning Rails
When the opportunity of work in ePages came to me it cost me to take a decision but at the end I take the risk, as I like new challenges and to learn new things and I saw it was a great opportunity.

### Discovering similarities and differences
Now in ePages I started with the famous [Rails tutorial of Michael Hartl](https://www.railstutorial.org/){:target="_blank"}.
During 3 weeks I was reading and trying it at the same time that I was doing the exercises.
It's amazing how fast things can be done in rails!
One finished the tutorial, I started to do pair programming with my teammate.
He explained me the projects and cleared my dubs about ruby and, shortly after, I started with my own tasks, and apply that I learned in the tutorial.

While I was doing the tutorial I was seeing the similar things between rails and another languages with I work before or that I've seen such as Symfony.
Due to my experience with other languages I could associate concepts of rails with other languages that I know.
While I was doing the tutorial I was surprise with the easier that rails let to manage the database, thanks to ActiveRecord

As each language there're differences and js and ruby couldn't been the exception, still today I'm thinking in how I do in javascript and then I search ruby's equivalent.

Some of syntax differences with I found are:

- In ruby is not necessary type parenthesis to send parameters in a function.
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

- In ruby you don't have to declare variables.
- Difference at other languages you don't have to type `return` to give back data, as always give back the result of the last line of code.

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

When some friend told me about rails he mentioned one word `magick` today I finally understand why.

- ActiveModel: I remember in my last work there a problem to make work Synfony with Oracle so when I saw ActiveRecord the first thing that I did was search in google information about rails and it looks there's not any problem to integrate rails and Oracle.
- Trust: Rails with only type the name of some functions knows how to work.

```ruby
def index
end
```

This is a little reflection from someone who has left of his comfort zone, I still have a lot to learn both JavaScript and Ruby, but that is another history.