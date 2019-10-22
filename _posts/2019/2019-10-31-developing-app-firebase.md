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
For this, we need to authenticate and authorize individual merchants.
We need a authentication system.

For our example and because we want to bootstrap our app really fast we will use Googles Firebase platform. It provides us all the services we need for our requirements.

* Authentication as a service with [Firebase Authentication](https://firebase.google.com/products/auth/).
* A data storage that has easy integration of Firebase Authentication with [Cloud Firestore](https://firebase.google.com/products/firestore/).
* A serverless function execution to savely communicate with beyond, [Cloud Functions](https://firebase.google.com/products/functions/).
* And a ssl-enabled static file hosting for a login form with [Firebase Hosting](https://firebase.google.com/products/hosting/).

Also it provides a lot of integrations for many programming languages and platforms. E.g. Java and Node.js on the server (and more), Java, Kotlin and Dart (Flutter) on Android, Switch and Objective-C on iOS, and Javascript in the browser.
It also can take care of the login screen with the FirebaseUI project available for Web, iOS and Android.

Because we have to communicate with the Beyond API to get access and refresh tokens we need Cloud Functions with the so called Outbound Network open to the internet. Firebase has 3 pricing plans, one free plan that only allows outbound network to google services. So we have to go for a paid plan. The blaze plan is a good starting point for this as it includes a lot of database access, network trafic, hosting space and functions usage for free before you have to pay anything. You normally do not meet these limits in development or even early live stage.

## Step 0 - prepare firebase project
We call our demo firebase project `beyondapp`, so all occurences of this name must be replaced with your project name.
Go to https://console.firebase.google.com and create a new project.

## Step 1 - SSL encrypted callback url
https://console.firebase.google.com/project/beyondapp/hosting/main
Develop => Hosting
Complete the initialisation of hosting project including the Firebase SDK
```
$ npm install -g firebase-tools
$ firebase login
$ firebase init
```
We know already that we need a couple of firebase features but we can add them later. For now we only want the hosting feature.
As default firebase project we can select our `beyondapp` project we already created. Otherwise you could also choose to create a new project right from the terminal now.
Since we want to keep it simple for fast results we will keep the public directory at the default `public`.
And we also only have one page to install an app, so we can configure it as a single-page app.
The `firebase-tools` will now generate an `index.html` in the `public/` directory that we can upload to firebase hosting with `firebase deploy --only hosting`.

Now we have an ssl encrypted hosted page at https://beyondapp.web.app and https://beyondapp.firebaseapp.com
This is the domain of our apps callback URL.

## Step 2 - Create your custom app
To create a new custom app in the beyond cockpit go to Apps => Custom apps and add a new custom app.
Name: firebase demo app
Callback URL: beyondapp.web.app
App scopes: The scopes you choose here define what API resources your App will be allowed to access later on.
You can always change the scope while developing the app. But after submission this is not possible anymore!

## Step 3 - Implement authorization process
We now have a hosted page with ssl encryption and a custom app with our required scopes and a valid callback URL. The cockpit now provides us withh a new button called "Test authorisation". With this button we can simulate an app installation from the beyond app store.
Clicking the button we are redirected to `https://beyondapp.web.app/?access_token_url=https://skinny.beyondshop.cloud/api/oauth/token&api_url=https://skinny.beyondshop.cloud/api&code=zlBVtC&return_url=https://skinny.beyondshop.cloud/cockpit/apps/custom-apps/edit/8876fedc-fba2-454b-b5af-cc083dbc6128&signature=jQRJD%2B1ghhV5CLiRRVkilboivX8%3D`.

This GET request contains a lot of important query parameters that are already described in detail here: http://docs.beyondshop.cloud/#_app_development
In addition to the information from the query parameters we will also need the `client_id` and `client_secret` from the custom app page in the beyond cockpit.
For our fist authorisation process we need the following data:

| client_id | unique client id to identify the app against the beyond api |
| client_secret | Must be kept secret under all circumstances! |
| access_token_url | shop specific URL for getting new `access_token`s |
| code | authorisation code for this shop for this client (app) |

How all of this works with javascript is already described in detail in the documentation here: http://docs.beyondshop.cloud/#_tutorial_javascript
What we are doing now is implementing this on our Firebase Hosting page!

==== Warning! ============================================================================
==== In the following example we include the `client_secret` in our html payload. ========
==== This is not save and I strongly advice you not to do this in production! ============
==== The `client_secret` can always be reset in the cockpit until the app is submitted. ==
==== We will come to the save approach later. Now we want fast results. ==================

```javascript
const client_id = '0BE38CFF-F3B6-4D68-8F16-1CE270C028BC'
const client_secret = 'DkRUi6uo6KzglHmwOhFkVYNhcumCTOlP'

const url = new URL(document.location)
const access_token_url = url.searchParams.get('access_token_url')
const code = url.searchParams.get('code')

// Top level await is not allowed in browsers, so we have to wrap the request inside a async function.
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
Add this block to the `public/index.html` file and publish it to firebase again.

We now have a couple of new properties in the `answer` variable. The properties are described here: http://docs.beyondshop.cloud/#_test_authorization
Important for us are the following:
| access_token | This is used to authenticate any request against the beyond API. |
| refresh_token | This is used to get a new set of `access_token` and `refresh_token` when the `access_token` expired |

**Just now we successfully authorized our firebase app with beyond!**

## Recap
Let's recap what we need to use the Beyond API:
| access_token | Bearer token for authentication against the API |
| refresh_token | used to get a new access_token when the old one expired |
| api_url | Shop specific base url for all API requests |

===== Info ========================================================================================
===== Strictly speaking we do not need the `refresh_token` for using the Beyond API. ==============
===== But the `access_token` is only valid for a couple of hours ==================================
===== and we do not want our app to become useless after it expired. ==============================
=====  So let's put `refresh_token` in the list of required properties to properly use the API. ===

We have to remember this bare minimum of parameters for our API requests. And because we want more than one shop to install our app we have to save them on a **per app base**.
We have a couple of theoretically unique identifiers to save data per shop.
| api_url | unique because it contains the shops domain and one app can only be installed once per shop |
| access_token_url | same as the api just with more path |
| tenantId | This is a unique identifier of the beyond tenant, in most cases the shop. It is part of the `answer` variable from step 3, we get it from the token autorization request. |
For this blog post we will go with the `tenantId`.

## Step 4 - Firebase auth
We now can get tokens from beyond shops and we have unique identifiers to save the tokens from multiple shops. But we have to know who is allowed to access which shop!
We need a user authentication for each merchant nad for this purpose we will use Firebase Auth.
Firebase Auth is an authentication service with support for many different login methods. The most common login method is probably email and password, but login with e.g. google and facebook is also possible.
To activate it go to the Firebase Console, Develop => Authentication
https://console.firebase.google.com/u/0/project/beyondapp/authentication/users

Here activate the first authentication method "E-Mail address/password".
And done. We now have an authentication service. Let's put it into use in our `public/index.html`.
Add this to the `head` section to get firebaseui
```html
<script src="https://cdn.firebase.com/libs/firebaseui/4.2.0/firebaseui.js"></script>
<link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/4.2.0/firebaseui.css" />
```
And an empty container to the `body` where the login form will show up
```html
<div id="firebaseui-auth-container" />
```
And now configure and use the FirebaseUI with firebaes auth.
```javascript
  // FirebaseUI config.
  const uiConfig = {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // This eliminates an extra step for email users. The default is to use AccountChooser, but that would make it more complex right now.
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    callbacks: {
      // We have to specify either a `successCallbackUrl` or this callback method for the SPA case.
      signInSuccessWithAuthResult: function() {
        return false;
      }
    }
  };

  // Initialize the FirebaseUI Widget using Firebase.
  const ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);
```
After publishing these changes we can see a login mask where a new user can also register. We can now login users!

==== Hint ===================================================================
==== After logging in you can always logout from the browser console with ===
==== `firebase.auth().signOut() =============================================

But we also see the login mask when a user logged in. SO let's fix that and only display the login form when a user is not logged in yet.
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

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

firebase.auth().onAuthstateChanged(async function(user) {
  if (!user) {
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
  }
})
```
Now the signIn form is only shown to users not already logged in. And we have a convinient place where we get access to the user data.
And with this we have access to the unique id of the user `user.uid`.
As a last part of this step we only want to do the beyond authorization after the user has been logged into firebase auth.

For this we will first replace the anonymous iife (immediately invoked function expression) with a real named function.
```diff
- (async function(){
+ function registerBeyond(){
[...]
- })()
+ }
```
And now call this method when we have a user object available.
```javascript
firebase.auth().onAuthstateChanged(async function(user) {
  if (user) {
    registerBeyond();
  }
})
```

## Step 5 - Database
With the user login we now can distinguish between different merchants and give API access only to the registered user. Time to save the tokens from Step 3 and only give the merchant access to it.
First create a database in the firebase console.
Develop => Database
Create a Cloud Firestore database. Choose the test mode for fast results. We will secure the data later.
Before we can start saving data we need a collection for our users. In the Cloud Firestore UI create a collection and name it 'users'. And because we have to provide the first document use the document id `test`. The document does not need any properties yet.
We now will use this new collection `users` to save our tokens after the user logged in.
First we have to add the firestore API to the `public/index.html`
```html
  <script defer src="/__/firebase/7.2.0/firebase-firestore.js"></script>
```
Then we can use it from our existing script after we `fetch`ed the access data from beyond.
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

## Step 6 - Cleanup
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

## Step 7 - Security & Cloud Functions
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

## Step 8 - Use the firebase cloud function from the client
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
