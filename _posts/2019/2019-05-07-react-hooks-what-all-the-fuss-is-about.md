---
layout: post
title: React Hooks - What all the fuss is about
date: 2019-05-07
header_image: public/react-hooks.jpg
header_position: center
category: tech-stories
tags: ["javascript", "reactjs"]
authors: ["Jonathan"]
about_authors: ["jwieben"]
---

React's new _Hooks_ have been all the rage these last few months. You might have heard about them without really understanding what they are and why so many people are so excited about them. Maybe you have asked yourself why a simple API proposal would get [thousands of comments and reactions on its RFC](https://github.com/reactjs/rfcs/pull/68){:target="_blank"}. This post intends to help you understand some of the hype.

## What are Hooks?

Hooks are an addition to React, that was released in February 2019. To explain what they do, I'll have to give some background on the React API.

React lets developers split their UI into components. A component can do a variety of things: render UI, keep a state, or fetch data. **There are two ways of writing a component: as a function or as a class.** For the sake of simplicity, I will refer to those different types of components as function-components and class-components for the rest of this blog post.

**Function-components** are pretty simple. They are just a JavaScript function that given a certain input (called "props" in React), return the UI that should be rendered on the screen.

**Class-components**, on the other hand, are a bit more complex. They also take props and render UI, but on top of that keep a state and have different so-called lifecycle methods. So if, for instance, you wanted to update your state once some of your props changed, you would use a class-component to do that.

And that's where Hooks come in. **Hooks allow you to do all the things you previously needed classes for, inside a function-component.** 🎉

## What makes them so great?

Now you might be asking yourself: what's the big deal? You can write your components in a different way. What's so crazy about that?

In some ways you'd be right, there's nothing fundamentally new here. But **React Hooks solve a variety of problems**. I want to hit on a few of them here.

### Improved reusability

Before Hooks, React didn't provide a way to "attach" reusable behavior to a component. Instead, patterns emerged that would allow sharing stateful behavior between components. These, however, were burdensome and made the code harder to follow.

With Hooks, stateful logic can be extracted into independent pieces of code that are easily shared between components and projects.

### Reduced complexity

When a class-component increases in complexity, it tends to grow into an unmaintainable mess. That's because class-components make your organize your logic in lifecycle methods. As a result, you end up with lifecycle methods that contain a mix of unrelated logic. If you now wanted to take out a specific behavior of your component and move it to a different one, you would have to go look at all the different lifecycle methods and extract only the parts you need and put them somewhere else. This is hard and makes refactoring painful.

The new Hooks API, on the other hand, allows you to separate your component into smaller pieces (hooks), which are responsible for a specific behavior or logic. This not only makes the component easier to understand, but it also lets you easier eject some behavior from a component and put it somewhere else. Whereas before you would have had to look at different lifecycle methods, you can now just take out your hook and put it somewhere else.

### Classes can be confusing

Classes are one of the harder things for React beginners to understand and master. They tend to be quite verbose and come with some quirks one has to be aware of. And even experienced React developers struggle when to use a class and when to use a function.

With Hooks, all these problems fade away. You can do anything you want with a function-component now, and Hooks will most likely even encourage you to use better patterns for your components.

**No confusion about how to use classes, and no struggle when to use them.** 🎉

## What does this mean for me?

Even if you're not a React developer, and this new React API won't affect you directly, it will affect your colleagues that **do** work with it. And it will affect them positively, as they will be more effective at building cool and stable UIs.

It probably also means that React is not going away anytime soon, as the React team keeps innovating, while at the same time they provide a great developer experience.
