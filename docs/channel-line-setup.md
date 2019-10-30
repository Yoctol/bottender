---
id: channel-line-setup
title: Setup LINE
---

## Create a New LINE Bottender App

Create Bottender App is the best way to start building a new application in Bottender.

To create a project, run:

```sh
npx create-bottender-app my-app
```

Make sure that you checked the `line` option:

![](https://user-images.githubusercontent.com/3382565/67851224-f2b7f200-fb44-11e9-9ccb-afd7eee74b00.png)

## Enabling LINE Channel in Existing Apps

First, you need to have a `bottender.config.js` file that sets `channels.line.enabled` as `true`:

```js
module.exports = {
  channels: {
    line: {
      enabled: true,
      path: '/webhooks/line',
      accessToken: process.env.LINE_ACCESS_TOKEN,
      channelSecret: process.env.LINE_CHANNEL_SECRET,
    },
  },
};
```

By default, webhook listens on path - `/webhooks/line`, but you can set it to whatever you want using `path` field.

Then, you need to fill in following fields in `.env` for loading those values correctly into `bottender.config.js`:

```
LINE_ACCESS_TOKEN=
LINE_CHANNEL_SECRET=
```

After that, you can start your server with LINE webhook listening using following commands:

```
// in production mode
npm start

// or in development mode
npm run dev
```

## Setting Webhook to LINE

// ...
