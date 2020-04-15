---
id: migrating-v1
title: Migrating from v0.x to v1
---

To make bot developers have happier development experience, we made the following changes:

- Improving the structure of the configuration file
- Using camel case consistently
- Introducing two new patterns: [Routing](the-basics-routing.md) and [Chain of Responsibility](the-basics-chain.md)

You can follow the steps below to migrate your Bottender application from v0.x to v1.

> **Note:** The following code samples are based on the Messenger bots, but you can still apply a similar strategy to your bots on any other platforms.

## Configuring Session Driver and Channel Settings in `bottender.config.js`

### v0.x

In Bottender v0.x, the `bottender.config.js` file only includes part of the channel settings:

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

So, you must construct a session store and a bot instance yourself in the `index.js` file:

```js
// index.js
const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/express');

const config = require('./bottender.config').messenger;

const maxSize = 500; // The maximum size of the cache, default is 500.

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

### v1

In Bottender v1, the better `bottender.config.js` file includes the session store settings and the channel settings. The config file supports multiple chat channels out of the box. For each channel, you can enable and disable the channel by modifying the `enable` field:

```js
// bottender.config.js
module.exports = {
  session: {
    driver: 'memory',
    stores: {
      memory: {
        maxSize: 500, // The maximum size of the cache, default is 500.
      },
    },
  },

  channels: {
    messenger: {
      enabled: true, // Modify this boolean value to enable or disable
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

Also, you can put your environment variables into the `.env` file:

```
# .env
MESSENGER_PAGE_ID=
MESSENGER_ACCESS_TOKEN=
MESSENGER_APP_ID=
MESSENGER_APP_SECRET=
MESSENGER_VERIFY_TOKEN=
```

And your `index.js` file can focus on the core logic of the bot:

```js
// index.js
module.exports = async function App(context) {
  await context.sendText('Hello World');
};
```

## Unify Cases to Camel Case

The JavaScript communities embrace camel case keys on objects, while Messenger, Slack, Telegram, and Viber usually use snake case string as object keys. The mixed-use of camel case and snake case is error-prone.

In Bottender v1, you can use the camel case consistently. Bottender handles the case transform automatically for you.

### v0.x

In Bottender v0.x, object keys represent in the snake case in Messenger:

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

### v1

In Bottender v1, object keys represent in the camel case in Messenger:

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

### Migrate to v1 by `bottender-codemod`

[`bottender-codemod`](https://github.com/bottenderjs/bottender-codemod) is a command-line tool to help you modify your snake case code into the camel case for Bottender v1. This tool helps you migrate the majority of your code.

> **Note:** Please make sure to commit your unmodified code before running [`bottender-codemod`](https://github.com/bottenderjs/bottender-codemod).

```js
npx bottender-codemod camelcase <your_file_path>
```

If you want to try it without files changed, you may dry run and print the result out with the `--dry` and `--print` options:

```js
npx bottender-codemod camelcase <your_file_path> --dry --print
```

## Replace Middleware and Handlers with Router and Chain

Using the `middleware` function and the `Handler` classes together are very difficult. So, we are deprecating those APIs in favor of the new APIs: [Routing](the-basics-routing.md) and [Chain](the-basics-chain.md). If you prefer the `middleware` function and the `Handler` classes, you can still use them by installing the `@bottender/handlers` package:

```js
npm install @bottender/handlers

// or using yarn:
yarn add @bottender/handlers
```

Then, apply the following changes to your import statements:

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

## Change Log

For more information, see [v1 changelog](https://github.com/Yoctol/bottender/releases/tag/v1.0.0).
