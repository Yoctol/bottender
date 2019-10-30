---
id: channel-messenger-setup
title: Setup Messenger
---

## Create a New Messenger Bottender App

Create Bottender App is the best way to start building a new application in Bottender.

To create a project, run:

```sh
npx create-bottender-app my-app
```

Make sure that you checked the `messenger` option:

![](https://user-images.githubusercontent.com/3382565/67851223-f2b7f200-fb44-11e9-960a-4f58d68ab37d.png)

## Enabling Messenger Channel in Existing Apps

First, you need to have a `bottender.config.js` file that sets `channels.messenger.enabled` as `true`:

```js
module.exports = {
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

By default, webhook listens on path - `/webhooks/messenger`, but you can set it to whatever you want using `path` field.

Then, you need to fill in following fields in `.env` for loading those values correctly into `bottender.config.js`:

```
MESSENGER_PAGE_ID=
MESSENGER_ACCESS_TOKEN=
MESSENGER_APP_ID=
MESSENGER_APP_SECRET=
MESSENGER_VERIFY_TOKEN=
```

After that, you can start your server with Messenger webhook listening using following commands:

```
// in production mode
npm start

// or in development mode
npm run dev
```

## Setting Webhook to Messenger

```
npx bottender messenger webhook set
```
