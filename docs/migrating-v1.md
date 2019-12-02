---
id: migrating-v1
title: Migrating from v0.x to v1.x
---

## Configuring Session Driver and Channel Settings in `bottender.config.js`

In v0.x, only part of channel settings are put into `bottender.config.js` file:

```js
// bottender.config.js
module.exports = {
  messenger: {
    accessToken: '__FILL_YOUR_TOKEN_HERE__',
    appSecret: '__FILL_YOUR_SECRET_HERE__',
    verifyToken: '__FILL_YOUR_VERIFYTOKEN_HERE__',
  },
};
```

And you need to construct session store and bot yourself:

```js
// index.js
const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/express');

const config = require('./bottender.config').messenger;

const maxSize = 500; // The maxSizeimum size of the cache, default will be 500.

const bot = new MessengerBot({
  accessToken: config.accessToken,
  appSecret: config.appSecret,
  verifyToken: config.verifyToken,
  sessionStore: new MemorySessionStore(maxSize),
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
```

In v1.x, session and channel settings should be put into `bottender.config.js` file:

```js
// bottender.config.js
module.exports = {
  session: {
    driver: 'memory',
    stores: {
      memory: {
        maxSize: 500, // The maximum size of the cache, default will be 500.
      },
    },
  },

  channels: {
    messenger: {
      enabled: true,
      path: '/webhooks/messenger',
      pageId: process.env.MESSENGER_PAGE_ID,
      accessToken: process.env.MESSENGER_ACCESS_TOKEN,
      appId: process.env.MESSENGER_APP_ID,
      appSecret: process.env.MESSENGER_APP_SECRET,
      verifyToken: process.env.MESSENGER_VERIFY_TOKEN,
    },
  },
};
```

> **Note**: Notice that `channels` config changes a lot in v1.

And you can put your environment variables in `.env` file:

```
# .env
MESSENGER_PAGE_ID=
MESSENGER_ACCESS_TOKEN=
MESSENGER_APP_ID=
MESSENGER_APP_SECRET=
MESSENGER_VERIFY_TOKEN=
```

After those changes, only bot logic leaves in your `index.js` file:

```js
// index.js
module.exports = async function App(context) {
  await context.sendText('Hello World');
};
```

## Case Changes

JavaScript community embrace using camel case keys on objects, but Messenger、Slack、Telegram and Viber usually using snake case string as object keys. In Bottender v0.x, camel case and snake case keys may mix together or even appear on the same object. It's very unpredictable and error-prone. In v1, you can use camel case consistently, and Bottender will handle the case transform automatically for you.

In v0.x (snake case keys):

```js
context.sendGenericTemplate([
  {
    title: "Welcome to Peter's Hats",
    image_url: 'https://petersfancybrownhats.com/company_image.png',
    subtitle: "We've got the right hat for everyone.",
    default_action: {
      type: 'web_url',
      url: 'https://peterssendreceiveapp.ngrok.io/view?item=103',
      messenger_extensions: true,
      webview_height_ratio: 'tall',
      fallback_url: 'https://peterssendreceiveapp.ngrok.io/',
    },
    buttons: [
      {
        type: 'postback',
        title: 'Start Chatting',
        payload: 'DEVELOPER_DEFINED_PAYLOAD',
      },
    ],
  },
]);
```

In v1.x (camel case keys):

```js
context.sendGenericTemplate([
  {
    title: "Welcome to Peter's Hats",
    imageUrl: 'https://petersfancybrownhats.com/company_image.png',
    subtitle: "We've got the right hat for everyone.",
    defaultAction: {
      type: 'web_url',
      url: 'https://peterssendreceiveapp.ngrok.io/view?item=103',
      messengerExtensions: true,
      webviewHeightRatio: 'tall',
      fallbackUrl: 'https://peterssendreceiveapp.ngrok.io/',
    },
    buttons: [
      {
        type: 'postback',
        title: 'Start Chatting',
        payload: 'DEVELOPER_DEFINED_PAYLOAD',
      },
    ],
  },
]);
```

You may use [bottender-codemod](https://github.com/bottenderjs/bottender-codemod) to help you migrating part of cases:

```js
npx bottender-codemod camelcase <your_file_path>
```

To try it without writing to the file, dry run and print changes:

```js
npx bottender-codemod camelcase <your_file_path> --dry --print
```

## Using Middleware and Handlers from Separate Package

`middleware` and `Handlers` can't compose together easily and are not suitable in functional declarative world, so we are deprecating those APIs in favor of new introduced [`router`](./the-basics-routing.md) and [`chain`](the-basics-chain.md) APIs. However, you can still use them by installing `@bottender/handlers` package:

```js
npm install @bottender/handlers

// or using yarn:
yarn add @bottender/handlers
```

And make those changes to your imports:

```diff
const {
  middleware,
  Handler,
  MessengerHandler,
  LineHandler,
  SlackHandler,
  TelegramHandler,
  ViberHandler,
- } = require('bottender');
+ } = require('@bottender/handlers');
```

<!-- ## Change Log

You can find [v1 changelog here](TODO...........). -->
