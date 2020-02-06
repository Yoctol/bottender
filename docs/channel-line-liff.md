---
id: channel-line-flex
title: LINE Front-end Framework (LIFF)
---

## LINE Front-end Framework (LIFF), the Webview Solution in LINE App

LIFF provide three different size of embedded webviews in LINE App.

![different size of liff](https://user-images.githubusercontent.com/563929/73712876-6a01b100-4746-11ea-8f85-22b8026882d5.png)

LIFF provide more possibility to create the best user experience. One of the common scenarios is submit a form in LINE Bot.

### Features in LIFF

- [Get user profile](https://developers.line.biz/en/reference/liff/#get-profile)
- [Send messages to LINE](https://developers.line.biz/en/reference/liff/#send-messages)
- [Open link in external browser](https://developers.line.biz/en/reference/liff/#open-window)
- [Scan QR Code](https://developers.line.biz/en/reference/liff/#scan-code)
- [Connect to bluetooth devices](https://developers.line.biz/en/reference/liff/#bluetooth-request-device)
- Others features in [LIFF playground](https://playground-for-liff.linecorp.com/)

### Workflow

- Create a LINE Login channel in [LINE Developers console](https://developers.line.biz/console/)
- Add a LIFF app in the LINE Login channel
- Develop the LIFF page

## LIFF V2

LIFF v2 introduces new features for developers to scan QR Code and allow user to opne LIFF page in PC version of LINE app.

For quick catch up, this is a minimal implementation for [Bottender example with LIFF v2](https://github.com/Yoctol/bottender/tree/master/examples/line-liff-v2).

The following sections are step by step toturials about how to send messages with LIFF in a bottender project created by command [create bottender app]().

### Run Ngrok

[Ngrok](https://ngrok.com/) is a service that provide a public URLs for your local http server.

Type following command to run ngrok after install it.

```bash
ngrok http 5000
```

Keep this alive, you will need a public domain for the [step: Add LIFF in the LINE Login Channel](channel-line-liff#add-liff-in-the-line-login-channel).

### Create LINE Login Channel

Open [LINE Developers console](https://developers.line.biz/console/) to create a LINE Login channel.

For more detail about create a LINE Login channel: https://developers.line.biz/en/docs/liff/getting-started/#creating-a-provider-and-channel

### Add LIFF in the LINE Login Channel

- Click the "LIFF" tab in the LINE Login Channel you just created.
- Click Add button
- fill Endpoint URL like this format: https://{your ngrok domain}.ngrok.io/liff
- fill other values

For more detail about registering a liff app:
https://developers.line.biz/en/docs/liff/registering-liff-apps/#registering-liff-app

### Start from Create Bottender App

Using [create-bottender-app](getting-started#create-a-new-bottender-app) to create a new bottender project with LINE platform.

### Environment Variables Setting

1. Create a file `.env` in the root directory of project.
2. Fill the environment variables with the following format:

```
LINE_ACCESS_TOKEN={your LINE access token from LINE Messaging API channel}
LINE_CHANNEL_SECRET={your LINE channel secret from LINE Messaging API channel}
LINE_LIFF_ID={your LIFF id from LINE Login channel}
```

You can find your LIFF ID in the LIFF URL, the format of LIFF URL is `line://app/{your LIFF ID}`.

For more details about LIFF ID: https://developers.line.biz/en/docs/liff/registering-liff-apps/#registering-liff-app (in the step 4)

### Develop Custom HTTP Server

1. Create a file `server.js` in the root directory of project.
2. Copy the following code into server.js

```javascript
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

3. Modify the package.json like this.

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

For more detail about custom server: [custom server - the concept](advanced-guides-custom-server#the-concept)

### Add Route for LIFF Page

Add the following code snippet into server.js to handle request from LIFF.

```
  server.get('/send-id', (req, res) => {
    res.json({ id: process.env.LINE_LIFF_ID });
  });

  server.get('/liff', (req, res) => {
    const filename = path.join(`${__dirname}/liff.html`);
    res.sendFile(filename);
  });
```

### Implement the LIFF Page

1. Create a file `liff.html` in the root directory of project.
2. Copy the following code into `liff.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BOTTENDER LINE LIFF V2 DEMO</title>
  </head>

  <body>
    <script src="https://static.line-scdn.net/liff/edge/2.1/sdk.js"></script>
    <script>
      function initializeLiff(myLiffId) {
        liff
          .init({
            liffId: myLiffId,
          })
          .then(() => {
            alert('LIFF init success!');
          })
          .catch(err => {
            alert(`error: ${JSON.stringify(err)}`);
          });
      }

      document.addEventListener('DOMContentLoaded', function() {
        fetch(`/send-id`)
          .then(function(reqResponse) {
            return reqResponse.json();
          })
          .then(function(jsonResponse) {
            let myLiffId = jsonResponse.id;
            initializeLiff(myLiffId);
          })
          .catch(function(error) {
            alert(`error: ${JSON.stringify(error)}`);
          });
      });
    </script>
  </body>
</html>
```

### Send Messages from LIFF

replace the body in `liff.html` with the following code:

```html
<body>
  <button id="button">send test message</button>
  <script src="https://static.line-scdn.net/liff/edge/2.1/sdk.js"></script>
  <script>
    function initializeLiff(myLiffId) {
      liff
        .init({
          liffId: myLiffId,
        })
        .then(() => {
          setButtonHandler();
        })
        .catch(err => {
          alert(`error: ${JSON.stringify(err)}`);
        });
    }

    function setButtonHandler() {
      let button = document.getElementById('button');
      button.addEventListener('click', function() {
        alert('clicked: sendMessages');
        liff
          .sendMessages([
            {
              type: 'text',
              text: 'Hello, LIFF!',
            },
          ])
          .then(function() {
            alert('message sent');
            liff.closeWindow();
          })
          .catch(function(error) {
            window.alert('Error sending message: ' + error);
          });
      });
    }

    document.addEventListener('DOMContentLoaded', function() {
      fetch(`/send-id`)
        .then(function(reqResponse) {
          return reqResponse.json();
        })
        .then(function(jsonResponse) {
          let myLiffId = jsonResponse.id;
          initializeLiff(myLiffId);
        })
        .catch(function(error) {
          alert(`error: ${JSON.stringify(error)}`);
        });
    });
  </script>
</body>
```

### Send LIFF LINK to User

replace the code in `index.js` with the following code:

```js
module.exports = async function App(context) {
  const liffUrl = `https://liff.line.me/${process.env.LINE_LIFF_ID}`;
  await context.sendText(liffUrl);
};
```

### start server in local

Type the following command to start server.

```bash
yarn dev
```

Done, now you have a LINE Bot with a simple function of LIFF.

## LIFF V1 (not recommend)

For existing project using LIFF v1, we recommend you migrate to LIFF v2, but we also provide a minimal implementation for [Bottender example with LIFF v1](https://github.com/Yoctol/bottender/tree/master/examples/line-liff-v1).
