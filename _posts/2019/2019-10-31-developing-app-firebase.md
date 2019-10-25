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
Let's have a closer look at this protocol and which requirements can be concluded from the [related documentation](http://docs.beyondshop.cloud/#_app_development){:target="_blank"}:

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

* Authentication as a service with [Firebase Authentication](https://firebase.google.com/products/auth/){:target="_blank"},
* a data storage that offers an easy integration of Firebase Authentication with [Cloud Firestore](https://firebase.google.com/products/firestore/){:target="_blank"},
* a serverless function execution to savely communicate with an API, [Cloud Functions](https://firebase.google.com/products/functions/){:target="_blank"}, and
* an ssl-enabled static file hosting for a login form with [Firebase Hosting](https://firebase.google.com/products/hosting/){:target="_blank"}.

Additionally, it provides many integrations for different platforms and programming languages, e.g. Java and Node.js on the server, Java, Kotlin and Dart (Flutter) on Android, Switch and Objective-C on iOS, and Javascript in the browser.
It can also take care of the login screen with the FirebaseUI project available for Web, iOS and Android.

Now that you know about the available features, let's talk about the pricing.
In order to communicate with an API to get access and refresh tokens, we need Cloud Functions with the so called *Outbound Networking open to the internet*.
Firebase has three [pricing plans](https://firebase.google.com/pricing){:target="_blank"}.
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
To activate it, we go to the Firebase Console, Develop > [Authentication](https://console.firebase.google.com/u/0/project/beyondapp/authentication/users){:target="_blank"}.

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
Add this snippet to the end of our `registerBeyond` method.

```javascript
const api_url = url.searchParams.get('api_url');
const db = firebase.firestore();
await db.collection('users').doc(firebase.auth().currentUser.uid).set({
  access_token: answer.access_token,
  refresh_token: answer.refresh_token,
  api_url: api_url
});
```

The snippet saves the API access data in a document in which the ID is the UID of the currently logged in user.
Thus, we can easily get the user's shop data via the user's UID.
This fact also makes it pretty easy to restrict access to the user data later on.

As a last step, we need to redirect the user, e.g. back to the page they came from.
For this, we can use the query parameter `return_url`.
Thats's why we now add the following lines to the end of the `registerBeyond` method:

```javascript
const return_url = url.searchParams.get('return_url');
document.location.replace(return_url);
```

## Step 5 - Cleanup

Let's quickly summarize what we just achieved: We now have a complete app installation process with its own user authentication, all based on Firebase resources.
When we first initialized Firebase with hosting enabled, the `public/index.html` already came with a couple of Firebase features.
But we do not need all of them.
So let's clean up the head section of the document:

```diff
- <script defer src="/__/firebase/7.2.0/firebase-messaging.js"></script>
- <script defer src="/__/firebase/7.2.0/firebase-storage.js"></script>
```

We also don't need the message container that welcomes us to the Firebase project.
Showing this would rather be confusing for the users.
That's why we remove the whole `<div id="message">` block and the `<p id="load>` block that displays the Firebase status.
We can also remove the `style` tags, except the one we added for Firebase UI.

In the prepared `script` tag, we can remove the `try catch` block that checks the Firebase status, and the comment that explains how to use the Firebase methods.

After removing all lines that are not needed, we now have an HTML file of roughly 100 lines of code.
This code offers everything we need for user authorization and database storage of tokens we can access for later usage by our application.

## Step 6 - Security & Cloud Functions

We can now install an app, save the required information in a database and redirect the user back to a specific page.
So, in theory we are done.
But we currently have a pretty serious security issue.
Our `client_id` and `client_secret` are displayed in the `public/index.html` and will be sent to the browser.
To solve this issue, we have to move the secret to a safer place.
If you have data that you do not want to deliver to the browser, you have to keep them on the server and perform all the actions tied to the secret data on the server.
This means, we have to move everything related to the authorization we introduced in step 3 to a server, in this case the Firebase Cloud Functions.

Lets start with initializing these Cloud Functions.
In our repository, we again run `firebase init`, but this time we select `functions`.
For this example, we now select JavaScript, but Typescript would have also been a valid option.
As a result, all default npm dependencies get installed.
Now, we have a new `functions` directory in our repository.
At this point, we could dive deeper into the theory of Firebase functions, but we'll skip that part for now.

Instead, we use the Firebase [HTTPS callables](https://firebase.google.com/docs/functions/callable){:target="_blank"} and trigger them with the Javascript Firebase SDK.
If you are interested in the methods we use for that, check our [Javascript Tutorial](http://docs.beyondshop.cloud/#_tutorial_javascript){:target="_blank"}.
For example, we are using [request-promise-native](https://github.com/request/request-promise-native){:target="_blank"} for an easy promise based request API that works similar to the browser fetch API.
To do so, we go into the `functions` directory and run the installation via `npm install --save request request-promise-native`.

First, we set the functions node version to version 8.
The default version is still version 6 which doesn't offer async/await and object descructuring.
For upgrading, we go into `functions/package.json` and add the `engine` property:

```javascript
{
  ...,
  "engine": {
    "node": "8"
  }
}
```

Now, all functions will be deployed as Node 8 functions.

Our function will also use the `getBeyondAuthToken` method introduced in the tutorial to fetch the API tokens.
That's why we can now move the `client_secret`  to the server.
Afterwards, we use the function to save all other tokens on the server, so the browser won't see the `refresh_token` either.

```javascript
const functions = require('firebase-functions');
const request = require('request-promise-native');
const admin = require('firebase-admin');

const client_id = '0BE38CFF-F3B6-4D68-8F16-1CE270C028BC';
const client_secret = 'DkRUi6uo6KzglHmwOhFkVYNhcumCTOlP';

admin.initializeApp();

// getAuthToken
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

To further secure the `client_secret`, we can add it to an environment variable.
By doing so, the secret won't appear in our version control system.

```
$ firebase functions:config:set beyond.client_id="0BE38CFF-F3B6-4D68-8F16-1CE270C028BC" beyond.client_secret="DkRUi6uo6KzglHmwOhFkVYNhcumCTOlP"
```

```javascript
const { client_id, client_secret } = functions.config().beyond
```

## Step 7 - Use the Firebase Cloud Function from the client

Now that we have a Firebase Function for the authentication, we can also use it for the client side JavaScript.
For doing so, we need the Firebase Functions SDK.

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

Aaaand done.
Great!
Let's have a look at our final result: We have an `index.html` file on Firebase Hosting with 66 lines of code and a Firebase Cloud Function with 46 lines of code.
With these 112 lines of code we managed to offer an installation process with its own user authentication, enable the installation of our app, save required information in a database, and redirect the user back to a specific page.
And all this is done in a safe and secure way.
If you feel like you'd like to get some further information or clarify some open questions, reach out to us on [Twitter](https://twitter.com/epagesdevs){:target="_blank"}.
We're happy to here from you and your experiences!