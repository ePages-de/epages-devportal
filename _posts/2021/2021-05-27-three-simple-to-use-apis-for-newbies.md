---
layout: post
title: 3 simple-to-use APIs for newbies
date: 2021-05-27
header_image: public/apis-for-newbies.jpg
header_position: center
header_overlay: true
category: coding
tags: ["api", "challenge", "coding"]
authors: ["Anne"]
about_authors: ["azimmermann"]
---

At the end of 2020, I went to my boss, Harm Behrens, and asked for support on my plan to become a frontend developer.
At that point, I've already been working for over 3.5 years as a frontend designer at ePages and for 8 years in total as a designer.
Harm gave me his GO with the words “Don't expect your journey to be too easy!“.
So I started my master plan in December with a big smile, a bag full of energy, and that crystal clear target in front of me.

What can I say... He was right - I really expected it to be easier! 😄

## Data matters

Since building a react application from scratch is something completely different than going into a component to change small and mostly visual details, one of my first mini projects was a very simple draft of a to-do checklist app.
At some point in my implementation, I faced a buggy behavior of my app and reached out to a colleague.
He checked my implementation and said:
“In general it looks ok… You can click. You can add. But where is your data?“.
This was one of my first glass-breaking moments.
I wasn't even aware that I would need some sort of data structure for my small try-out application.
As a designer, I was used to think "in" UI elements.
Now, I had to reprogram my brain and learn to think "in" data.

After the discovery of my huge lack of knowledge, I decided to practice with already given data.
At ePages, we are following the [API-first approach](/blog/tech-stories/why-we-go-beyond-insights-from-our-cto/).
Therefore, I started to search for simple and free-to-use APIs to get into this topic.

You may have noticed that there is a large pool of free-to-use APIs out there, but not every API is perfect to start with if you are new to the field.
So let me introduce you to my 3 favorite APIs, short and simple enough for beginners.

## 1. The Official Joke API

I would call the [Official Joke API](https://official-joke-api.appspot.com/){:target="_blank"} one of the easiest APIs ever because you don’t need an access token to get the data.
This API provides four different endpoints to get a JSON object of [1 random joke](https://official-joke-api.appspot.com/jokes/random){:target="_blank"} or an array of objects of [10 random jokes](https://official-joke-api.appspot.com/jokes/ten){:target="_blank"}.
The only thing left to do is to fetch the data and return the result.

**This is one way to do that:**

<iframe src="https://codesandbox.io/embed/fetch-data-from-api-b6vr3?fontsize=14&module=%2Fsrc%2FJokeList.tsx&theme=dark"
    style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
    title="Fetch data from API"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## 2. The One API (to rule them all)

[The One API](https://the-one-api.dev/){:target="_blank"} is a massive database around the world of _The Lord of the Rings_ - I mean, how cool is that? 😱 
You get data about the books by J. R. R. Tolkien, the official movies by Peter Jackson, all characters, and quotes.
The One API is very well explained and [documented](https://the-one-api.dev/documentation){:target="_blank"} which makes it easier as a newbie to kick-start.
You also have the possibility to add pagination, sorting, and filtering options to your API requests.
To get access to that awesome database, you'll need a bearer token that you receive after registration.
Only the `/book` endpoint is available without authentication.
Furthermore, you have a limit of 100 requests every 10 minutes.

**This is how you could fetch the data with your bearer token:**

```js
const TOKEN = "thisIsYourSecretToken"

const fetchData = async () => (
  await fetch(
    `https://the-one-api.dev/v2/character`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    }
  ).then(response => response.json())
)
```

## 3. The Edamam API

The [Edamam API](https://developer.edamam.com/){:target="_blank"} consists of recipe database, nutrition analysis, and food database APIs. 
To get access to the included information, you'll need to register on the website.
However, the calls are limited to 10 calls per minute.
I tried out the [Recipe Search API](https://developer.edamam.com/edamam-recipe-api){:target="_blank"}, which provides a massive dataset and a good [documentation](https://developer.edamam.com/edamam-docs-recipe-api){:target="_blank"}.
You can play around with the search and filter functionality and the best thing is that you even get images.
By the way, I got to know this API in a [Youtube tutorial from Dev Ed](https://www.youtube.com/watch?v=U9T6YkEDkMo&ab_channel=DevEd){:target="_blank"} which I can highly recommend as well.

**This is how you could fetch data for `cake` from the Recipe Search API:**

```js
const APP_ID = 'yourAppId'
const APP_KEY = 'yourAppKey'

const fetchData = async () => (
  await fetch(
    `https://api.edamam.com/search?q=cake&app_id=${APP_ID}&app_key=${APP_KEY}`
  ).then(response => response.json())
)
```

## Famous last words

Guess what?
I've changed to a backend team in February due to the company's plan to make it [another cross-functional team](/blog/on-the-job/the-x-factor-or-how-i-learned-to-stop-worrying-and-love-the-backend/).
I have a strong feeling that I'll never be able to not think in "data" again. 😄