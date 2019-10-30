---
id: channel-viber-setup
title: Setup Viber
---

## Create a New Viber Bottender App

Create Bottender App is the best way to start building a new application in Bottender.

To create a project, run:

```sh
npx create-bottender-app my-app
```

Make sure that you checked the `viber` option:

![](https://user-images.githubusercontent.com/3382565/67851228-f3508880-fb44-11e9-90aa-c5bcc2d96aa2.png)

## Enabling Viber Channel in Existing Apps

First, you need to have a `bottender.config.js` file that sets `channels.viber.enabled` as `true`:

```js
module.exports = {
  channels: {
    viber: {
      enabled: true,
      path: '/webhooks/viber',
      accessToken: process.env.VIBER_ACCESS_TOKEN,
      sender: {
        name: 'Sender Name',
      },
    },
  },
};
```

By default, webhook listens on path - `/webhooks/viber`, but you can set it to whatever you want using `path` field.

Then, you need to fill in following fields in `.env` for loading those values correctly into `bottender.config.js`:

```
VIBER_ACCESS_TOKEN=
```

After that, you can start your server with Viber webhook listening using following commands:

```
// in production mode
npm start

// or in development mode
npm run dev
```

## Setting Webhook to Viber

```
npx bottender viber webhook set
```
