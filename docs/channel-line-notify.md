---
id: channel-line-notify
title: LINE Notify
---

## What is LINE Notify

LINE Notify is a LINE service that lets you push messages to the subscribed users for free. Once the user subscribed to your service on LINE Notify, you could send messages to the user through LINE Notify without extra cost.

The user will add LINE Notify as a friend automatically when the first time they authorize to connect to the service.

For more details about LINE Notify, please checkout [LINE Notify's website](https://notify-bot.line.me).

## How to Use LINE Notify in Bottender

If you want to have a clean project with the LINE Notify, you could start from [this example](https://github.com/Yoctol/bottender/tree/master/examples/line-notify) to develop your project. There are four steps you can follow to create your project:

1. Download the code from [this example](https://github.com/Yoctol/bottender/tree/master/examples/line-notify).
2. Run `yarn` or `npm install` command to install all dependencies.
3. Fill the `.env` file with the correct value.
4. Run `yarn dev` or `npm run dev` to start the dev server.

If you want to have the folder structure we recommended, you could start with create-bottender-app command and migrate it by following the migration instructions below.

### Creating a LINE Notify Service

To create a new Notify Service, open this [link](https://notify-bot.line.me/my/services/new) and submit the form after you finish it.

![](https://user-images.githubusercontent.com/3382565/74317707-da4baa80-4db6-11ea-93b0-68b5e6f2c8a9.png)

The value of callback URL should look like: `https://{your domain}.ngrok.io/notify/redirect`

> **Note:** [Ngrok](https://ngrok.com/) is a well-known service that provides public HTTPs URLs for your local server using the tunnel. It's handy when you develop your bot locally. You may want to use it when developing.

### Environment Variables Setting

If you are familiar with any official Bottender example, you may already know about how to use `.env` file to manage your environment variables in your local project.

In this case, you need to add `LINE_NOTIFY_CLIENT_ID`, `LINE_NOTIFY_CLIENT_SECRET` and `ROOT_PATH` env to `.env` file, so your file will have at least those three LINE related environment variables:

```
LINE_ACCESS_TOKEN={your LINE access token from LINE Messaging API channel}
LINE_CHANNEL_SECRET={your LINE channel secret from LINE Messaging API channel}

LINE_NOTIFY_CLIENT_ID={your LINE Notify client id}
LINE_NOTIFY_CLIENT_SECRET={your LINE Notify client secret}
ROOT_PATH={the ngrok public link}
```

### Implementing the LINE Notify SDK

LINE Notify uses OAuth2 as the authorization mechanism. The operation process is as follows：

1. Guide users to the LINE Notify authorization page
2. Receive response code from redirect
3. Exchange access token with code
4. Send notification by access token

Three APIs provided by LINE Notify are used:

1. `GET https://notify-bot.line.me/oauth/authorize`
2. `POST https://notify-bot.line.me/oauth/token`
3. `POST https://notify-api.line.me/api/notify`

official API document：https://notify-bot.line.me/doc/en/

1. Run `yarn add axios` or `npm install axios` command to install dependencies we need.
2. Create a `lineNotify.js` file in the root directory of the project and copy the following code into it.

```js
const querystring = require('querystring');
const axios = require('axios');

function getAuthLink(clientId, redirectUrl, state) {
  const data = {
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUrl,
    scope: 'notify',
    state,
  };

  return `https://notify-bot.line.me/oauth/authorize?${querystring.encode(
    data
  )}`;
}

async function getToken(code, redirectUri, clientId, clientSecret) {
  const url = 'https://notify-bot.line.me/oauth/token';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const formData = {
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
  };
  return await axios.post(url, querystring.encode(formData), { headers });
}

async function sendNotify(token, message) {
  const url = 'https://notify-api.line.me/api/notify';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${token}`,
  };
  const formData = {
    message,
  };
  return await axios.post(url, querystring.encode(formData), { headers });
}

module.exports = {
  getAuthLink,
  getToken,
  sendNotify,
};
```

### Guiding User to the LINE Notify Authorization Page

To serve LIFF webpages, we need to add additional routes to the server. Fortunately, [custom server](advanced-guides-custom-server#the-concept) come to the rescue!

You could use express, koa, restify, or whatever you like, but we are going to use express in this guide. Before going down, make sure that you set up correctly according to [this guide](advanced-guides-custom-server#express).

Modify `src/index.js` to send the authorization link to user

```js
const lineNotify = require('../lineNotify');
const clientId = process.env.LINE_NOTIFY_CLIENT_ID;
const redirectUri = `${process.env.ROOT_PATH}/notify/redirect`;

module.exports = async function App(context) {
  const url = lineNotify.getAuthLink(clientId, redirectUri, 'test');
  await context.sendText(url);
};
```

### Receiving Response Code from Redirect and Send Notification by Access Token

Add the following code snippet into `server.js` to handle requests from LINE Notify redirect.

```js
// ...
const lineNotify = require('../lineNotify')
// ...

const clientId = process.env.LINE_NOTIFY_CLIENT_ID;
const clientSecret = process.env.LINE_NOTIFY_CLIENT_SECRET;
const redirectUri = `${process.env.ROOT_PATH}/notify/redirect`;

app.prepare().then(() => {

  //...

  server.get('/notify/redirect', async function(req, res){
    const code = req.query.code
    const response = await lineNotify.getToken(code, redirectUri, clientId, clientSecret)
    const token = response.data.access_token
    await lineNotify.sendNotify(token, "Hello bottender!")
    res.send('Subscribe successfully. Please close this page.');
  });

  // route for webhook request
  ...
```

To be noticed that the access token is reuseable, we don't store it here, because it helps us simplify this demo.

You can found all your subscriptions [here](https://notify-bot.line.me/my/).

## Limitation

1. The message format only allows text, image, and basic sticker, so you can't send, for example, a message with some buttons.
2. Can't have more than 1000 characters in a single text message.
3. the rate limit is 1000 messages per hour.
