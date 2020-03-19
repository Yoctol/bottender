---
id: migrating-v1
title: Migrating from v0.x to v1.x
---

To make bot developers have a happier development experience, we made some changes in terms of a better-structured config file, unifying cases to camel case, and introduction of two design patterns: `Router` and `Chain`.

You can follow the below guide to migrate your Bottender's code from v0.x to v1.x.

> **Note:** The following sample code is based on a Messenger bot, but you could still apply the similar strategy to bots on any other platforms.

## Configure Session Driver and Channel Settings in `bottender.config.js`

### v0.x

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

And you need to construct a session store and bot yourself in `index.js`:

```js
// index.js
const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/express');

const config = require('./bottender.config').messenger;

const maxSize = 500; // The maximum size of the cache, default will be 500.

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

### v1.x

In v1.x, we move the session store settings and channel settings into `bottender.config.js`.

Also, the channel section of the config file is ready to support multiple chat channels. For each channel, you can see an extra `enable` parameter. It is handy when you want to deploy the bot on specific chat channels first.

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

And you can put your environment variables in `.env` file:

```
# .env
MESSENGER_PAGE_ID=
MESSENGER_ACCESS_TOKEN=
MESSENGER_APP_ID=
MESSENGER_APP_SECRET=
MESSENGER_VERIFY_TOKEN=
```

After changes above, your `index.js` file only focus on bot logic:

```js
// index.js
module.exports = async function App(context) {
  await context.sendText('Hello World');
};
```

## Unify Cases to Camel Case

The mixed-use of camel case and snake case is error-prone, which results in an unpredictable development progress. For example, the JavaScript community embraces camel case keys on objects, while Messenger, Slack, Telegram, and Viber usually using snake case string as object keys.

In Bottender v1.x, you can use the camel case consistently. Let Bottender handle the case transform automatically for you.

### v0.x

In v0.x, keys represent in the snake case:

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

### v1.x

In v1.x, keys represent in the camel case:

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

### Migrate to v1.x by `bottender-codemod`

[`bottender-codemod`](https://github.com/bottenderjs/bottender-codemod) is a command-line tool to help you change snake case in Bottender v0.x to camel case for Bottender v1.x. It helps you migrate the majority of your code to the camel case.

Please remember to commit your current code before running [`bottender-codemod`](https://github.com/bottenderjs/bottender-codemod).

```js
npx bottender-codemod camelcase <your_file_path>
```

If you want to try it without file changed, you can dry run and print it with the following command.

```js
npx bottender-codemod camelcase <your_file_path> --dry --print
```

## Replace Middleware and Handlers with Router and Chain

In the world of functional declarative, `middleware` and `Handlers` are not suitable due to the difficulty of composing together. So, we are deprecating those APIs in favor of new introduced [`Router`](./the-basics-routing.md) and [`Chain`](the-basics-chain.md) APIs. If you still prefer `middleware` and `Handlers`, you can still use them by installing `@bottender/handlers` package:

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

## Change Log

You can find [v1 changelog here](https://github.com/Yoctol/bottender/releases/tag/v1.0.0).
