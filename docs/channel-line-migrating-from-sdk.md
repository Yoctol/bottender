---
id: channel-line-migrating-from-sdk
title: Migrating from LINE SDK for nodejs
---

https://github.com/line/line-bot-sdk-nodejs/

Simplest example:

```js
const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: 'YOUR_CHANNEL_ACCESS_TOKEN',
  channelSecret: 'YOUR_CHANNEL_SECRET',
};

const app = express();
app.post('/webhooks/line', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then(result =>
    res.json(result)
  );
});

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text,
  });
}

app.listen(3000);
```

## Using Create Bottender App

```sh
npx create-bottender-app my-app
```

channel-line-setup.md

edit `src/index.js` file:

```js
module.exports = function App(context) {
  await context.sendText(context.event.text);
}
```

## Migrating From Scratch

```sh
// Using npm
npm install bottender@next
npm uninstall @line/bot-sdk

// Using yarn
yarn add bottender@next
yarn remove @line/bot-sdk
```

create `bottender.config.js` file:

```js
module.exports = {
  enabled: true,
  path: '/webhooks/line',
  accessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};
```

create `index.js` file:

`index.js`

```js
module.exports = function App(context) {
  await context.sendText(context.event.text);
}
```

create `.env` file:

```
LINE_ACCESS_TOKEN=
LINE_CHANNEL_SECRET=
```

execute `.env` commmand:

```sh
npx bottender start
```
