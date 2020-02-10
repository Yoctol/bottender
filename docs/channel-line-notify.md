---
id: channel-line-notify
title: LINE Notify
---

## What is LINE Notify

LINE Notify is a service that provide a way to push message free to user.
As long as user subscribed you on LINE Notify, and then you can send messages to user through LINE Notify. User automatically add LINE Notify as friend when they first authorize.

official document: https://notify-bot.line.me

## LINE Notify API

LINE Notify uses OAuth2 as the authorization mechanism. The operation process is as follows：

1. Guide users to the LINE Notify authorization page
2. Receive response code from redirect
3. Exchange access token with code
4. Send notification by access token

Three APIs provided by LINE Notify are used:

1. GET https://notify-bot.line.me/oauth/authorize
2. POST https://notify-bot.line.me/oauth/token
3. POST https://notify-api.line.me/api/notify

official API document：https://notify-bot.line.me/doc/en/

## How to Use LINE Notify in Bottender

If you want to have a clean project with the LINE Notify, you could start from [this example](https://github.com/Yoctol/bottender/tree/master/examples/line-notify) to develop your project. There are four steps you can follow to create your project:

1. Download the code from [this example](https://github.com/Yoctol/bottender/tree/master/examples/line-notify).
2. Run `yarn` or `npm install` command to install all dependencies.
3. Fill the `.env` file with correct value.
4. Run `yarn dev` or `npm run dev` to start the dev server.

If you want to have the folder structure we recommended, you could start with create-bottender-app command and migrate it by following the migration instructions below.

### Run Ngrok

[Ngrok](https://ngrok.com/) is a service that provide a public URLs for your local http server.

Type following command to run ngrok after install it.

```bash
ngrok http 5000
```

Keep this alive, you will need the public domain for the [step: Create a LINE Notify service](channel-line-notify#add-liff-in-the-line-login-channel) and the [step: Environment Variables Setting](channel-line-notify#environment-variables-setting).

### Create a LINE Notify service

Click this [link](https://notify-bot.line.me/my/services/new) and submit the form.

The value of callback URL should be: `https://{your ngrok domain}.ngrok.io/notify/redirect`

### Start from Create Bottender App

Using [create-bottender-app](getting-started#create-a-new-bottender-app) to create a new bottender project with LINE platform.

### Environment Variables Setting

1. Create a file `.env` in the root directory of project.
2. Fill the environment variables with the following format:

```
LINE_ACCESS_TOKEN={your LINE access token from LINE Messaging API channel}
LINE_CHANNEL_SECRET={your LINE channel secret from LINE Messaging API channel}

LINE_NOTIFY_CLIENT_ID={your LINE Notify client id}
LINE_NOTIFY_CLIENT_SECRET={your LINE Notify client secret}
ROOT_PATH={the ngrok public link}
```

### Develop Custom HTTP Server

1. Run `yarn add express body-parser nodemon` or `npm install express body-parser nodemon` command to install dependencies we need.
2. Create a server.js file in the root directory of the project and copy the following code into it.

```js
const bodyParser = require('body-parser');
const express = require('express');
const { bottender } = require('bottender');
const path = require('path');

const app = bottender({
  dev: process.env.NODE_ENV !== 'production',
});

const port = Number(process.env.PORT) || 5000;

// the request handler of the bottender app
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(
    bodyParser.json({
      verify: (req, _, buf) => {
        req.rawBody = buf.toString();
      },
    })
  );

  // route for webhook request
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
```

3. Modify scripts in the package.json to nodemon server.js and node server.js instead:

```json
{
  ...
  "scripts": {
    "dev": "nodemon server.js",
    "start": "cross-env NODE_ENV=production node server.js",
    ...
  },
  ...
}
```

This is the document about the detail of [Bottender with custom server](advanced-guides-custom-server)

### Implement the LINE Notify SDK

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
  querystring.encode(data);
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

### Guide user to the LINE Notify authorization page

1. Run `yarn add ejs` or `npm install ejs` command to install dependencies we need.
2. modify `server.js` to create a web page to redirect user to LINE Notify authorization link

```js
...

const lineNotify = require('./lineNotify')
const ejs = require('ejs')

...

const clientId = process.env.LINE_NOTIFY_CLIENT_ID
const clientSecret = process.env.LINE_NOTIFY_CLIENT_SECRET
const redirectUri = `${process.env.ROOT_PATH}/notify/redirect`

app.prepare().then(() => {

  ...

  server.get('/notify/new', (req, res) => {
    const filename = path.join(`${__dirname}/notify.html`);
    const url = lineNotify.getAuthLink(clientId, redirectUri, "test")
    ejs.renderFile(filename, { url }, {}, function(err, str) {
      if(err){
        console.log('err:')
        console.log(err)
      }
      res.send(str);
    });
  });

  // route for webhook request
  ...
});
```

3. Create a `notify.html` file in the root directory of the project and copy the following code into it.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Loading...</title>
  </head>
  <body>
    <script>
      const url = '<%- url %>';
      window.location.href = url;
    </script>
  </body>
</html>
```

4. Modify `src/index.js` to send the authorization link to user

```js
module.exports = async function App(context) {
  const url = `${process.env.ROOT_PATH}/notify/new`;
  await context.sendText(url);
};
```

### Receive response code from redirect and Send notification by access token

Add the following code snippet into `server.js` to handle request from LINE Notify redirect.

```js
  ...
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

The access token is reuseable, we don't store it at here because it's just a demo.

You can found all your subscriptions [here](https://notify-bot.line.me/my/)

## Limitation

1. The message format only allows text, image and basic sticker, you can't send message with button.
2. Can't have more then 1000 charactor in a single text message.
3. the rate limit is 1000 message per hours.
