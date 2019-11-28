---
layout: post
title:  How to bootstrap an application with authentication using Firebase
date: 2019-11-07
header_image: public/app-development-tutorial.png
header_position: top
header_overlay: true
category: coding
tags: ["firebase", "development", "app", "cloud functions"]
authors: ["Florian O."]
about_authors: ["foellerich"]
---

A software supporting an API first approach gives app developers the chance to easily enhance the feature set or the user’s experience.
Thanks to feature-rich APIs, developers have quite a lot of freedom when doing so.
But in many cases there is at least one requirement: the usage of the OAuth2 protocol to ensure authenticated API routes.
Let's have a closer look at this protocol and which requirements can be concluded from the [related documentation](http://docs.beyondshop.cloud/#_app_development){:target="_blank"}:

1. We need an SSL encrypted domain for the Application Callback URL.
2. We need to store at least `api_url`, `access_token`, and `refresh_token` for **each** user.
3. We have to communicate with the API we are developing for.
4. We need to have `client_id` and `client_secret` available for installation and token refresh, but keep them secret.
5. We should not let all of the above happen inside a static browser script but in a server that can keep the secret away from the outside.

This list, especially number 2, leads us to another requirement: We need to authenticate individual users!
We have to keep the `access_token` and `refresh_token` for each and every user secure and only give the user access to his own set of tokens.
For this, we need to authenticate and authorize individual users: We need an authentication system.

If all that should be achieved while still bootstraping an app really fast, the Google Firebase platform is the perfect solution.
It provides us with everything we need to tackle the above listed requirements:

* Authentication as a service with [Firebase Authentication](https://firebase.google.com/products/auth/){:target="_blank"},
* a data storage that offers an easy integration of Firebase Authentication with [Cloud Firestore](https://firebase.google.com/products/firestore/){:target="_blank"},
* a serverless function execution to savely communicate with an API, [Cloud Functions](https://firebase.google.com/products/functions/){:target="_blank"}, and
* an SSL-enabled static file hosting for a login form with [Firebase Hosting](https://firebase.google.com/products/hosting/){:target="_blank"}.

Additionally, it provides many integrations for different platforms and programming languages, e.g. Java and Node.js on the server, Java, Kotlin and Dart (Flutter) on Android, Switch and Objective-C on iOS, and Javascript in the browser.
It can also take care of the login screen with the Firebase UI project available for Web, iOS and Android.

In the following, we'll go through the single steps required to bring all of this to life.

## Step 0 - Prepare firebase project
First, we need to [create a new firebase project](https://console.firebase.google.com){:target="_blank"}.
We'll call our demo project `beyondapp`, so in the following code snippets you'll need to replace all occurences of this name with your project name.
Our demo app is supposed to be available in an online shop software.

## Step 1 - SSL encrypted Application Callback URL

Next, we need to [set up the hosting](https://console.firebase.google.com/project/beyondapp/hosting/main){:target="_blank"}.
That's how we complete the initialization of the hosting project including the Firebase SDK:

```
$ npm install -g firebase-tools
$ firebase login
$ firebase init
```

We already know that we need a couple of other Firebase features, but we'll add them later on.
For now, we'll only go with the hosting feature.
We can select our `beyondapp` project we created in step 0 as the default firebase project or create a new project directly from the terminal.
As we want to keep it simple for fast results, we will keep the public directory at the default `public`.
Our demo app will only have one page to install the app, so we can configure it as a single-page app.
The `firebase-tools` will now generate an `index.html` in the `public/` directory that we can upload to firebase hosting with `firebase deploy --only hosting`.

As a result we receive an SSL encrypted hosted page at https://beyondapp.web.app and https://beyondapp.firebaseapp.com.
We'll use this domain as our Application Callback URL.

## Step 2 - Implement authorization process

We now have a hosted page with SSL encryption and a valid Application Callback URL.
Next, we need a `client_id`, `client_secret`, `authorization_code`, and an `access_token_url`.
For our example app, we created a custom app in the Beyond Cockpit and tested the authorization to receive those.
But this workflow heavily depends on the software you are developing for.

By adding the following code snippet to the `public/index.html` file and publishing it to Firebase, we implement the authorization process on our Firebase Hosting page:

**Note:** In the snippet we include the `client_secret` in our HTML payload.
This practice is not secure and we strongly advice you to avoid this in production!
We'll explain a more secure possibility in a follow-up post.

```javascript
const client_id = '0BE38CFF-F3B6-4D68-8F16-1CE270C028BC'
const client_secret = 'DkRUi6uo6KzglHmwOhFkVYNhcumCTOlP'

const url = new URL(document.location)
const access_token_url = url.searchParams.get('access_token_url')
const code = url.searchParams.get('code')

// Top level await is not allowed in browsers, so we have to wrap the request inside an async function.
(async function(){
  const headers = new Headers()
  headers.append('Authorization', 'Basic ' + btoa(client_id + ':' + client_secret))

  const body = new FormData()
  body.append('grant_type', 'authorization_code')
  body.append('code', code)

  const response = await fetch(access_token_url, { method: 'POST', headers: headers, body: body })
  const answer = await response.json()
})()
```

We now have a couple of new properties in the `answer` variable.
Important for us are `access_token` and `refresh_token`.

In case you didn't notice yet: Just now we successfully authorized our Firebase app.
The first big step is done!

## Recap

We came across quite a few properties.
Let's quickly recap the most important ones to communicate with the API:

- `access_token`: The Bearer token required for authentication against the API.
- `refresh_token`: Used to get a new `access_token` once the old one expired.
- `api_url`: The shop-specific URL for all API requests.

Strictly speaking we do not need the `refresh_token` for communicating with the API.
But the `access_token` is only valid for a specific time frame.
So let's keep the `refresh_token` on the list of required properties to properly use the API at all time.

Furthermore, we need to remember the required parameters for API requests.
As our app will be installed in more than one online shop, we need to save the parameters on a **per shop base**.
We'll ensure this by using the `tenantId`, a unique identifier of the tenant, in most cases of the online shop.
This parameter will be part of the `answer` variable in step 3.

## Step 3 - Firebase auth

We can now receive tokens from online shops and determined unique identifiers to save these tokens independently.
But we also need a user authentication for each user to restrict the shop access.
For this purpose, we'll use Firebase Auth.
Firebase Auth is an authentication service with support for many different login methods.
The most common login method is probably email and password, but login with e.g. Google and Facebook is also possible.
To activate it, we open the Firebase Console and select Develop > [Authentication](https://console.firebase.google.com/u/0/project/beyondapp/authentication/users){:target="_blank"}.
Here, we activate the first authentication method "E-Mail address/password".
And done.
We now have an authentication service!

Let's put it into practice in our `public/index.html`.
To do so, we add the following code snippet to the `head` section:

```html
<script src="https://cdn.firebase.com/libs/firebaseui/4.2.0/firebaseui.js"></script>
<link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/4.2.0/firebaseui.css" />
```

Next, we add an empty container to the `body` on the desired position for the login form:

```html
<div id="firebaseui-auth-container" />
```

Now, we configure and use the Firebase UI with Firebase Auth.

```javascript
  // Firebase UI config.
  const uiConfig = {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // This eliminates an extra step for email users. The default is to use `AccountChooser`, but that would make it more complex right now.
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    callbacks: {
      // We have to specify either a `successCallbackUrl` or this callback method for the SPA case.
      signInSuccessWithAuthResult: function() {
        return false;
      }
    }
  };

  // Initialize the Firebase UI Widget using Firebase.
  const ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);
```
After publishing these changes, new users can either register or log in via the UI.
That means the next big step is done: Users can log in!

**Note:** After logging in, we can always log out via `firebase.auth().signOut()`.

Currently, we still see the login UI after a user logged in. 
Let's fix that and only display the login UI when a user is not logged in yet.

```javascript
const uiConfig = {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  callbacks: {
    signInSuccessWithAuthResult: function() {
      return false;
    }
  }
};

// Initialize the Firebase UI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

firebase.auth().onAuthstateChanged(async function(user) {
  if (!user) {
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
  }
})
```

Now, the login UI is only shown to users that are not yet logged in.
On top of that, we found a convenient way to get access to the user data.
Thus, we have access to the unique ID of the user `user.uid`.
As a last part of this step, we only want to authorize users after they are logged in to Firebase Auth.

For this, we'll first replace the anonymous iife (immediately invoked function expression) with a real named function.

```diff
- (async function(){
+ function registerBeyond(){
[...]
- })()
+ }
```

We'll now call this method once a user object is available.

```javascript
firebase.auth().onAuthstateChanged(async function(user) {
  if (user) {
    registerBeyond();
  }
})
```

With the login UI, we can now distinguish between different users and give API access only to registered ones.
That's already a great achievement.

Next up will be a database creation to save the tokens we received in this last step and only give specific users access to it.
And of course, we still need to improve our security with the help of Cloud functions.
All of this will be tackled in a follow-up post.
Stay tuned!