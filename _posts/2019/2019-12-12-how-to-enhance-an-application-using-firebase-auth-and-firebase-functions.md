---
layout: post
title: How to enhance an application using Firebase Auth and Firebase Functions
date: 2019-12-12
header_image: public/firebase-post-2.jpg
header_position: top
header_overlay: true
category: coding
tags: ["firebase", "app", "cloud functions", "app development"]
authors: ["Florian O."]
about_authors: ["foellerich"]
---

In the [last part of this series](/blog/coding/how-to-bootstrap-an-application-with-authentication-using-firebase/){:target="_blank"}, we went through all the steps required to bootstrap an application with authentication.
Our intermediate result was a login UI that can be used to distinguish users.
Furthermore, we were able to give API access only to registered users.
In this part, we'll take care of a database creation and security improvements.

## Step 1 - Database creation

Via the authentication service Firebase Auth, we receive tokens for different online shops.
Only the specific user of the shop should have access to this token.
To do so, we first need to create a database in the Firebase console (Develop > Database).
Then, we create a Cloud Firestore database.
For fast results, we choose the test mode for now and don't secure the data, but [we highly recommend to do so](https://firebase.google.com/docs/firestore/security/get-started){:target="_blank"}.
Before we can start storing data, we need a collection for our users.
That's why we create a collection called `users` in the Cloud Firestore UI.
For the first document we need to provide, we use the document id `test`.
The document does not need any properties yet.

We'll now use the newly created collection `users` to save our tokens after the user logged in.
First, we have to add the Firestore API to the `public/index.html`:

```html
  <script defer src="/__/firebase/7.2.0/firebase-firestore.js"></script>
```

Next, we can use the API from our existing script after we `fetch` the access data via the API.
Add this snippet to the end of the `registerBeyond` method we introduced in the last blog post.

```javascript
const api_url = url.searchParams.get('api_url');
const db = firebase.firestore();
await db.collection('users').doc(firebase.auth().currentUser.uid).set({
  access_token: answer.access_token,
  refresh_token: answer.refresh_token,
  api_url: api_url
});
```

The snippet stores the API access data in a document in which the ID is the UID of the currently logged in user.
Thus, we can easily get the user's shop data via the user's UID.
This fact also makes it pretty easy to restrict access to the user data later on.

As a last step, we need to redirect the user, e.g. back to the page they originally came from.
For this, we can use the query parameter `return_url`.
To do so, we add the following lines to the end of the `registerBeyond` method:

```javascript
const return_url = url.searchParams.get('return_url');
document.location.replace(return_url);
```

## Step 2 - Cleanup

Let's quickly summarize what we achieved until now: We have a complete app installation process with its own user authentication, all based on Firebase resources.
When we first initialized Firebase with hosting enabled, the `public/index.html` file already came with a couple of Firebase features.
But we do not need all of them.
So let's clean up the head section of the document:

```diff
- <script defer src="/__/firebase/7.2.0/firebase-messaging.js"></script>
- <script defer src="/__/firebase/7.2.0/firebase-storage.js"></script>
```

We also don't need the message container that welcomes us to the Firebase project.
Showing this would rather be confusing for the users.
That's why we remove the whole `<div id="message">` block and the `<p id="load>` block that displays the Firebase status.
We can also remove the `style` tags, except the one we added for the Firebase UI.

In the prepared `script` tag, we can remove the `try catch` block that checks the Firebase status, and the comment that explains how to use the Firebase methods.

After removing all lines that are not needed, we now have an HTML file of roughly 100 lines of code.
This code offers everything we need for user authorization and database storage of tokens we can access for later usage by our application.

## Step 3 - Security & Cloud Functions

We can now install an app, save the required information in a database and redirect the user back to a specific page.
So, in theory we are done.
But we currently have a pretty serious security issue.
Our `client_id` and `client_secret` are displayed in the `public/index.html` and will be sent to the browser.
To solve this issue, we have to move the secret to a safer place.
If you have data that you do not want to deliver to the browser, you have to keep them on the server and perform all actions tied to the secret data on the server.
This means for us, that we have to move everything related to the authorization we introduced in the last blog post to a server, in this case the Firebase Cloud Functions.

Lets start with initializing these Cloud Functions.
In our repository, we again run `firebase init`, but this time we select `functions`.
For this example, we now select JavaScript, but Typescript would also be a valid option.
As a result, all default npm dependencies get installed.
Now, we have a new `functions` directory in our repository.
At this point, we could dive deeper into the theory of Firebase functions, but we'll skip that part for now.

Instead, we use the Firebase [HTTPS callables](https://firebase.google.com/docs/functions/callable){:target="_blank"} and trigger them with the Javascript Firebase SDK.
If you are interested in the methods we use for that, check our [Javascript Tutorial](/beyond-docs/#js_tutorial){:target="_blank"}.
For example, we are using [request-promise-native](https://github.com/request/request-promise-native){:target="_blank"} for an easy promise-based request API that works similar to the browser fetch API.
To do so, we go into the `functions` directory and run the installation via `npm install --save request request-promise-native`.

Then, we set the functions node version to version 8.
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

Our function will also use the `getBeyondAuthToken` method introduced in the [Javascript tutorial](/beyond-docs/#js_tutorial){:target="_blank"} to fetch the API tokens.
That's why we can now move the `client_secret` to the server.
Afterwards, we use the function to also store all other tokens on the server, so that the browser won't have access to the `refresh_token` either.

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

## Step 4 - Firebase Cloud Function for client-side Javascript

Now that we have a Firebase Function for the authentication, we can also use it for the client-side JavaScript.
For doing so, we need the Firebase Functions SDK.

```html
<script defer src="/__/firebase/7.2.0/firebase-functions.js"></script>
```

Then, we can replace the `registerBeyond` method with the following much simpler code and remove the Firestore SDK code.

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
If you feel like you'd like to get some further information or clarify open questions, reach out to us on [Twitter](https://twitter.com/epagesdevs){:target="_blank"}.
We're happy to hear from you and your experiences!