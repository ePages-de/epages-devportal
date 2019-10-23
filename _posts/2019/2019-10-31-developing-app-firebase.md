---
layout: post
title: Bootstrap an application with authentication via Firebase
date: 2019-10-31
header_image: private/rubyrussia-2019.jpg
header_position: bottom
header_overlay: true
category: coding
tags: ["firebase", "development", "app"]
authors: ["Kathia"]
about_authors: ["ksalazar"]
---

A software supporting an API first approach, offers app developers a feature rich API to massively enhance the feature set or the user's experience.
In many cases, such as in our Beyond API, the OAuth2 protocol is used to ensure authenticated API routes.
Let's have a closer look at this protocol and which requirements can be concluded from the [related documentation](http://docs.beyondshop.cloud/#_app_development):

1. We need an SSL encrypted domain for the application callback URL.
2. We need to store at least `api_url`, `access_token`, and `refresh_token` for **each** merchant.
3. We have to communicate with the API we are developing for.
4. We need to have `client_id` and `client_secret` available for installation and token refresh, but keep them secret.
5. We should not let all of the above happen inside a static browser script but in a server that can keep the secret away from the outside.

This list, especially number 2, leads us to another requirement: We need to authenticate individual merchants!
We have to keep the `access_token` and `refresh_token` for each and every merchant secure and only give the merchant access to his own set of tokens.
For this, we need to authenticate and authorize individual merchants: We need a authentication system.

As we'd like to bootstrap our app really fast, we will use the Googles Firebase platform for this.
It provides us with everything we need to tackle the above listed requirements:

* Authentication as a service with [Firebase Authentication](https://firebase.google.com/products/auth/),
* a data storage that offers an easy integration of Firebase Authentication with [Cloud Firestore](https://firebase.google.com/products/firestore/),
* a serverless function execution to savely communicate with an API, [Cloud Functions](https://firebase.google.com/products/functions/), and
* an ssl-enabled static file hosting for a login form with [Firebase Hosting](https://firebase.google.com/products/hosting/).

Additionally, it provides many integrations for different platforms and programming languages, e.g. Java and Node.js on the server, Java, Kotlin and Dart (Flutter) on Android, Switch and Objective-C on iOS, and Javascript in the browser.
It can also take care of the login screen with the FirebaseUI project available for Web, iOS and Android.

Now that you know about the available features, let's talk about the pricing.
In order to communicate with an API to get access and refresh tokens, we need Cloud Functions with the so called *Outbound Networking open to the internet*.
Firebase has three [pricing plans](https://firebase.google.com/pricing).
The free plan only allows outbound networking to Google services.
So we have to go with a paid plan.
The *Blaze* plan is a good starting point as it includes a high limit for database access, network trafic, hosting space, and functions usage for free before.
You are only charged once you exceed that limit and in most cases you won't do so in development or even early live stage.

## Step 0 - prepare firebase project
We first need to create a new firebase project here: https://console.firebase.google.com.
Our demo project is called `beyondapp`, so you'd need to replace all occurences of this name must with your project name later on.

## Step 1 - SSL encrypted Application Callback URL
https://console.firebase.google.com/project/beyondapp/hosting/main
Develop => Hosting
Complete the initialization of the hosting project including the Firebase SDK.
```
$ npm install -g firebase-tools
$ firebase login
$ firebase init
```
We already know that we need a couple of firebase features but we can add them later on.
For now, we only go with the hosting feature.
We can select our `beyondapp` project we created in step 0 as the default firebase project or create a new project direclty from the terminal.
Since we want to keep it simple for fast results, we will keep the public directory at the default `public`.
As our demo app only has one page to install the app, we can configure it as a single-page app.
The `firebase-tools` will now generate an `index.html` in the `public/` directory that we can upload to firebase hosting with `firebase deploy --only hosting`.

As a result we receive an SSL encrypted hosted page at https://beyondapp.web.app and https://beyondapp.firebaseapp.com
We'll use this domain as our Application Callback URL.

## Step 2 - Implement authorization process
We now have a hosted page with SSL encryption and a valid Application Callback URL.
Next, we need a `client_id`, `client_secret`, `authorization_code`, and an `access_token_url`.
For our example app, we created a custom app in the Beyond Cockpit and tested the authorization to receive those.
But this workflow heavily depends on the software you are developing for.

That's how we implement the authorization process on our Firebase Hosting page:

**Note:** In the following code snippet we include the `client_secret` in our HTML payload.
This practice is not secure and we strongly advice you to avoid this in production!
We'll explain a more secure possibility later on.

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
Add this block to the `public/index.html` file and publish it to Firebase.

We now have a couple of new properties in the `answer` variable.
Important for us are the following:

- `access_token`: This token is used to authenticate any request against the API, in our case the Beyond API.
- `refresh_token`: This token is used to get a new set of `access_token` and `refresh_token` once the `access_token` expired.

In case you didn't notice yet: Just now we successfully authorized our Firebase app.
The first big steps are done!

## Recap

We came across quite a few properties.
Let's quickly recap the most important ones to communicate with the API:

- `access_token`: The Bearer token required for authentication against the API.
- `refresh_token`: Used to get a new access_token once the old one expired.
- `api_url`: Shop specific URL for all API requests.

Strictly speaking we do not need the `refresh_token` for communicating with the API.
But the `access_token` is only valid for a specific time frame.
So let's keep the `refresh_token` on the list of required properties to properly use the API at all time.

Furthermore, we need to remember the required parameters for API requests.
As our app will be installed in more than one shop, we need to save the parameters on a **per shop base**.
We'll ensure this by using the `tenantId`, a unique identifier of the Beyond tenant, in most cases the shop.
This parameter is part of the `answer` variable in step 3.

## Step 3 - Firebase auth

We can now receive tokens from shops and have unique identifiers to save these tokens independently.
But we also need a user authentication for each merchant to restrict the shop access.
For this purpose, we'll use Firebase Auth.
Firebase Auth is an authentication service with support for many different login methods.
The most common login method is probably email and password, but login with e.g. Google and Facebook is also possible.
To activate it, we go to the Firebase Console, Develop > [Authentication](https://console.firebase.google.com/u/0/project/beyondapp/authentication/users).

Here, we activate the first authentication method "E-Mail address/password".
And done.
We now have an authentication service!
Let's put it into practice in our `public/index.html`.
To do so, we add the following snippet to the `head` section:

```html
<script src="https://cdn.firebase.com/libs/firebaseui/4.2.0/firebaseui.js"></script>
<link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/4.2.0/firebaseui.css" />
```

Next, we add an empty container to the `body` where the login form will show up:

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
After publishing these changes, we can see a UI where a new user can either register or log in.
That means the next big step is done: Users can log in!

Note: After logging in, you can always log out via `firebase.auth().signOut().

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
On top of that, we have a convenient way to get access to the user data.
Thus, we have access to the unique ID of the user `user.uid`.
As a last part of this step, we only want to do the authorization after the user has logged in to Firebase Auth.

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

## Step 4 - Database

With the login UI we can now distinguish between different merchants and give API access only to the registered user.
Now it's time to save the tokens from step 3 and only give the merchant access to it.
To do so, we first need to create a database in the Firebase console (Develop > Database).
Then we create a Cloud Firestore database.
For fast results, we choose the test mode for now.
We'll secure the data in a later step.
Before we can start storing data, we need a collection for our users.
That's why we create a collection called `users` in the Cloud Firestore UI .
For the first document we need to provide, we use the document id `test`.
The document does not need any properties yet.

We'll now use the newly created collection `users` to save our tokens after the user logged in.
First, we have to add the firestore API to the `public/index.html`

```html
  <script defer src="/__/firebase/7.2.0/firebase-firestore.js"></script>
```

Next, we can use it from our existing script after we `fetch` the access data from beyond.
Add this to the end of our `registerBeyond` method.

```javascript
const api_url = url.searchParams.get('api_url');
const db = firebase.firestore();
await db.collection('users').doc(firebase.auth().currentUser.uid).set({
  access_token: answer.access_token,
  refresh_token: answer.refresh_token,
  api_url: api_url
});
```

This saves the api access data under a document where the id is the uid of the current logged in user. This way we can easily get the users shop data by the users uid. This also makes it pretty easy to restrict access to the user data later.

As a last step we can redirect the user back to the cockpit. For this we can use the query parameter `return_url`.
At the end of the `registerBeyond` method ew add this line

```javascript
const return_url = url.searchParams.get('return_url');
document.location.replace(return_url);
```

## Step 5 - Cleanup
We now have a complete app installation process with an own user authentication all based on firebase resources.
When we first initialized firebase with hosting enabled the `public/index.html` was prepared with a couple of firebase features.
But we do not need all of them. So let's clean up a bit the head section of the document first.
```diff
- <script defer src="/__/firebase/7.2.0/firebase-messaging.js"></script>
- <script defer src="/__/firebase/7.2.0/firebase-storage.js"></script>
```

We also do not need the message container that welcomes us to the firebase project. This would be rather confusing for the merchants.
Remove the whole `<div id="message">` block and also the `<p id="load>` block that displays the firebase status. We can also remove the `style` tags except the one we added for firebaseui.

In the prepared `script` tag we can remove the `try catch` block that checks the firebase status and the comment that explains how to use the firebase methods.

With all the unneeded boilerplate removed we have now an html file that is around 100 lines of code and does everything we need to do the authorization step of a beyond app and save the tokens to a database where we can access them for later usage by our application.

## Step 6 - Security & Cloud Functions
We now can install an app, save the required informations in a database and redirect the user back to the cockpit.
So in theory we are done. But we have a pretty serious security issue right now.
Our `client_id` and `client_secret` are in the `public/index.html` and will be send out to the browser.
To solve this issue we have to put the secret into a safer place. If you have data that you do not want to deliver to the browser you have to keep them on the server and do all the actions tied to the secret data there.
This means for our beyondapp that we have to put the authorization from step 3 on a server, in this case the Firebase Cloud Functions.
So lets start with initializing the cloud functions.
In our repository we again do a `firebase init`, this time we will select `functions`. Choose either Javascript or Typescript, in this example we will go with JavaScript.
It will install all default npm dependencies at the end, now we have a new `functions` directory in our repository.

I will not go into details about how firebase functions work. We will use the [HTTPS callables](https://firebase.google.com/docs/functions/callable) from firebase and trigger them with the javascript firebase sdk.
I will reuse a lot of the methods we already explained in the [Javascript Tutorial](http://docs.beyondshop.cloud/#_tutorial_javascript) of the beyond documentation. There we are using [request-promise-native](https://github.com/request/request-promise-native) for an easy promise based request api that works similar to the browser fetch api.
Go into the `functions` directory and run the installation `npm install --save request request-promise-native`.

First we will set the functions node version to 8. The default version is still version 6 without async/await and object descructuring.
Go into `functions/package.json` and add the `engine` property. Now all functions will be deployed as Node 8 functions.

```javascript
{
  ...,
  "engine": {
    "node": "8"
  }
}
```

Our function will fetch the beyond API tokens with the `getBeyondAuthToken` method from the tutorial so we can move the `client_secret` from the client code onto the server. The we will let the function also save the tokens to the database so the browser won't see the `refresh_token` either.
```javascript
const functions = require('firebase-functions');
const request = require('request-promise-native');
const admin = require('firebase-admin');

const client_id = '0BE38CFF-F3B6-4D68-8F16-1CE270C028BC';
const client_secret = 'DkRUi6uo6KzglHmwOhFkVYNhcumCTOlP';

admin.initializeApp();

// getBeyondAuthToken
// generateSignature

exports.installBeyondApp = functions.https.onCall(async (data, context) => {
    const {access_token_url, code, api_url, signature} = data;
    const uid = context.auth.uid;

    const response = await getBeyondAuthToken(access_token_url, code, signature, client_id, client_secret);

    await admin.firestore().collection('users').doc(uid).set({
        api_url,
        access_token: response.access_token,
        refresh_token: response.refresh_token,
    })

    return {status: 'success'};
})
```
To further secure our secret we can put it into an environment variable, so the secret will also not appear in your version control system.
```
$ firebase functions:config:set beyond.client_id="0BE38CFF-F3B6-4D68-8F16-1CE270C028BC" beyond.client_secret="DkRUi6uo6KzglHmwOhFkVYNhcumCTOlP"
```
```javascript
const { client_id, client_secret } = functions.config().beyond
```

## Step 7 - Use the firebase cloud function from the client
Now that we have a firebase function for the beyond authentication we can use it from the client side javascript. First we need the firebase functions SDK.
```html
<script defer src="/__/firebase/7.2.0/firebase-functions.js"></script>
```
Then we can replace the `registerBeyond` method with the following much simpler code and remove the firestore sdk code.
```javascript
async function registerBeyond() {
  try {
    const installBeyondApp = firebase.functions().httpsCallable('installBeyondApp');
    const result = await installBeyondApp({ access_token_url, code, api_url });

    document.location.replace(return_url);
  } catch (error) {
    console.error(error);
  }
}
```
```diff
- <script defer src="/__/firebase/7.2.0/firebase-firestore.js"></script>
```

As an end result we have a `index.html` file on firebase hosting with 66 lines of code and a firebase cloud function with 46 lines of code.
