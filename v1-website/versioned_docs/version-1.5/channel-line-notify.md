---
id: version-1.5-channel-line-notify
title: LINE Notify
original_id: channel-line-notify
---

## What is LINE Notify

[LINE Notify](https://notify-bot.line.me) is a LINE service that lets you send notifications to the subscribed users. Once a user subscribed to your service on LINE Notify, the user will become friends with LINE Notify automatically and you can send messages to the user through LINE Notify without extra cost.

## How to Use LINE Notify in Bottender

If you want to have a clean project with LINE Notify, you could start from [this example](https://github.com/Yoctol/bottender/tree/master/examples/line-notify) to develop your project. You can follow the following four steps to create your project:

1. Download the code from [`line-notify` example](https://github.com/Yoctol/bottender/tree/master/examples/line-notify).
2. Run `yarn` or `npm install` command to install all dependencies.
3. Fill the `.env` file with the correct values.
4. Run `yarn dev` or `npm run dev` to start the dev server.

If you want to have the folder structure we recommend, you could start with [create-bottender-app](getting-started.md#create-a-new-bottender-app) command and migrate it by following the migration instructions below.

### Creating a LINE Notify Service

To create a new LINE Notify service, open this [link](https://notify-bot.line.me/my/services/new) and submit the form after you finish it.

![](https://user-images.githubusercontent.com/3382565/74317707-da4baa80-4db6-11ea-93b0-68b5e6f2c8a9.png)

The value of the callback URL should look like: `https://{your domain}.ngrok.io/notify/redirect`

Official API document：https://notify-bot.line.me/doc/en/

> **Note:** [ngrok](https://ngrok.com/) is a well-known service that provides public HTTPs URLs for your local server using the tunnel. It's handy when you develop your bot locally. You may want to use it when developing.

### Environment Variables Setting

If you are familiar with any official Bottender example, you may already know about how to use the `.env` file to manage your environment variables in your local project.

In this case, you need to add `LINE_NOTIFY_CLIENT_ID`, `LINE_NOTIFY_CLIENT_SECRET` and `ROOT_PATH` to the `.env` file, so your file has those LINE related environment variables:

```
LINE_ACCESS_TOKEN={your LINE access token from LINE Messaging API channel}
LINE_CHANNEL_SECRET={your LINE channel secret from LINE Messaging API channel}

LINE_NOTIFY_CLIENT_ID={your LINE Notify client id}
LINE_NOTIFY_CLIENT_SECRET={your LINE Notify client secret}
ROOT_PATH={the ngrok public link}
```

### Preparing the LINE Notify Instance

LINE Notify uses OAuth2 as the authorization mechanism. The minimum flow is as follows:

1. Guide users to the LINE Notify authorization page.
2. Receive the authorization code from LINE Notify redirect.
3. Exchange an access token with the authorization code.
4. Send a notification by the access token.

Bottender provides a class `LineNotify` to help you deal with LINE Notify APIs. You can create an instance of `LINENotify` for later use.

Create a `lineNotify.js` file in the root directory of the project and copy the following code into it:

```js
const { LineNotify } = require('bottender');

export default new LineNotify({
  clientId: process.env.LINE_NOTIFY_CLIENT_ID,
  clientSecret: process.env.LINE_NOTIFY_CLIENT_SECRET,
  redirectUri: `${process.env.ROOT_PATH}/notify/redirect`,
});
```

### Guiding Users to the LINE Notify Authorization Page

To serve webpages, we need to add additional routes to the server. Fortunately, [custom server](advanced-guides-custom-server.md#the-concept) come to the rescue!

You could use express, koa, restify, or whatever you like, but we are going to use express in this guide. Before going down, make sure that you set up correctly according to [this guide](advanced-guides-custom-server.md#express).

Modify `src/index.js` to send the authorization link to your users:

```js
const lineNotify = require('../lineNotify');

module.exports = async function App(context) {
  const url = lineNotify.getAuthLink('test');
  await context.sendText(url);
};
```

### Receiving Authorization Code from Redirect and Send Notification by Access Token

Add the following code snippet into `server.js` to handle redirects from LINE Notify.

```js
const lineNotify = require('../lineNotify');
// ...

app.prepare().then(() => {
  //...

  server.get('/notify/redirect', async function (req, res) {
    const code = req.query.code;
    const token = await lineNotify.getToken(code);
    await lineNotify.sendNotify(token, 'Hello bottender!');
    res.send('Subscribe successfully. Please close this page.');
  });

  // routes for webhook request
  // ...
});
```

You can find all your subscriptions on the [Connected Services](https://notify-bot.line.me/my/) page.

> **Note:** You should store access tokens for sending notifications in the future. We don't store them here, because it helps us simplify this demo.

## Limitations

1. The message format only allows text, image, and basic sticker, so you can't send, for example, a message with some buttons.
2. You can't have more than 1000 characters in a single text message.
3. The rate limit is 1000 messages per token per hour.
