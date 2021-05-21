---
layout: post
title: 3 Simple-to-use APIs for newbies
date: 2021-05-05
header_image: public/apis-for-newbies.jpg
header_position: center
header_overlay: true
category: coding
tags: ["api", "challenge", "coding"]
authors: ["Anne"]
about_authors: ["azimmermann"]
---

At the end of 2020, I went to my boss, Harm Behrens, and asked for support on my plan to become a front-end developer. 
At that point, I've been working at ePages for over 3.5 years as a frontend designer and already 8 years in total as a designer. 
He gave me his GO with the words “Don't expect your journey to be too easy!“ and I started my master plan in December with a big smile, a bag full of energy, and that crystal clear target in front of me.

What can I say... He was right - I really expected it to be easier! 😄

## Data matters

Since building a react application from scratch is something completely different than going into a component to change small and mostly visual details, one of my first mini-projects was a very simple draft of a to-do checklist app. 
At some point in my implementation, I faced a buggy behavior of my app and reached out for the help of a colleague. 
He checked my implementation and said: 
“In general it looks ok… You can click. You can add. But where is your data?“ 
This was one of my first glass-breaking moments. I wasn't even aware that I would need some sort of data strucuture for my small try-out application.
As a designer, I was used to think "in" UI elements and now I learn to think "in" data.

After facing this huge lack of knowledge, I planned to practice with already given data. 
At ePages we are following the API first approach, therefore I searched for simple and free useable APIs to get into this topic.

You may have noticed that there is a large pool of free usable APIs out there, but not every API is perfect to start with if you are new to the field. 
So let me introduce you to my 3 favorite APIs, short and simple enough for beginners.

## The Official Joke API

I would call the [Official Joke API](https://official-joke-api.appspot.com/){:target="_blank"} one of the easiest APIs ever because you don’t need an access token to get the data. 
This API provides you four different endpoints to get a JSON object of [1 random joke](https://official-joke-api.appspot.com/jokes/random){:target="_blank"} or an array of objects of [10 random jokes](https://official-joke-api.appspot.com/jokes/ten){:target="_blank"}. 
The only thing left to do is to fetch the data and return the result.

**This is one way how you can do that:**

<iframe src="https://codesandbox.io/embed/fetch-data-from-api-b6vr3?fontsize=14&module=%2Fsrc%2FJokeList.tsx&theme=dark"
    style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
    title="Fetch data from API"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## The One API (to rule them all)

[The One API](https://the-one-api.dev/){:target="_blank"} is a massive database around the world of Lord of the Rings - I mean, how cool is that? 😱 
You get data about the books by J. R. R. Tolkien and about the official movies by Peter Jackson as well as data about many characters and quotes. 
The One API is very well explained and [documented](https://the-one-api.dev/documentation){:target="_blank"} which makes it easier as a newbie to kick-start. 
You also have the possibility to add pagination, sorting, and filtering options to your API requests. 
To get access to that awesome database, you need to register and then you get a bearer token. 
Only the `/book` endpoint is available without authentication. 
Furthermore, you have a limit to 100 requests every 10 minutes.

**This is how you could fetch the data with your bearer token:**

```js
const TOKEN = "thisIsYourSecretToken"

const fetchData = async () => {
  const response = await fetch(
    `https://the-one-api.dev/v2/character`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    }
  )
  const result = await response.json();
  return result;
}
```

## The Edamam API

[Edamam APIs](https://developer.edamam.com/){:target="_blank"} include Recipe Database, Nutrition Analysis, and Food Database APIs. 
You need to register on the website to get access to all these informations and the calls are limited to 10 calls per minute. 
I tried out the [Recipe Search API](https://developer.edamam.com/edamam-recipe-api){:target="_blank"}, which provides you massive data and a nice [documentation](https://developer.edamam.com/edamam-docs-recipe-api){:target="_blank"}. 
You can play around with search and filters and the best thing is that you even get images. 
By the way, I learned to know this API with a [Youtube Tutorial from Dev Ed](https://www.youtube.com/watch?v=U9T6YkEDkMo&ab_channel=DevEd) which I can highly recommend as well.

**This is how you could fetch data about `cake` from the Recipe Search API:**

```js
const APP_ID = 'yourAppId'
const APP_KEY = 'yourAppKey'

const fetchData = async () => {
  const response = await fetch(
    `https://api.edamam.com/search?q=cake&app_id=${APP_ID}&app_key=${APP_KEY}`
  )
  const result = await response.json();
  return result;
}
```

## Famous last words

Guess what? 
I've changed to a backend team in February due to the company's plan to build another feature team out of it. 
I have a strong feeling I will never forget about data anymore. 😄