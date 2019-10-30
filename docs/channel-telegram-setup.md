---
id: channel-telegram-setup
title: Setup Telegram
---

## Create a New Telegram Bottender App

Create Bottender App is the best way to start building a new application in Bottender.

To create a project, run:

```sh
npx create-bottender-app my-app
```

Make sure that you checked the `telegram` option:

![](https://user-images.githubusercontent.com/3382565/67851226-f2b7f200-fb44-11e9-951d-c0050db88ed3.png)

## Enabling Telegram Channel in Existing Apps

First, you need to have a `bottender.config.js` file that sets `channels.telegram.enabled` as `true`:

```js
module.exports = {
  channels: {
    telegram: {
      enabled: true,
      path: '/webhooks/telegram',
      accessToken: process.env.TELEGRAM_ACCESS_TOKEN,
    },
  },
};
```

By default, webhook listens on path - `/webhooks/telegram`, but you can set it to whatever you want using `path` field.

Then, you need to fill in following fields in `.env` for loading those values correctly into `bottender.config.js`:

```
TELEGRAM_ACCESS_TOKEN=
```

After that, you can start your server with Telegram webhook listening using following commands:

```
// in production mode
npm start

// or in development mode
npm run dev
```

## Setting Webhook to Telegram

```
npx bottender telegram webhook set
```
