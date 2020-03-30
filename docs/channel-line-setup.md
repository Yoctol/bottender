---
id: channel-line-setup
title: LINE Setup
---

## Enabling LINE Channels

To enable LINE channels, you can start either from new or existing Bottender apps.

### New Bottender Apps

**Create Bottender App** is the best way to start building a new app in Bottender.

To create a new app, run:

```sh
npx create-bottender-app my-app
```

Make sure to select the `line` option:

![](https://user-images.githubusercontent.com/3382565/67851224-f2b7f200-fb44-11e9-9ccb-afd7eee74b00.png)

After you go through the steps, `bottender.config.js` and `.env` are generated automatically for further channel settings.

### Existing Bottender Apps

First, you must have a `bottender.config.js` file includes the following settings:

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

Make sure to set the `channels.line.enabled` field to `true`.

By default, the Bottender server listens to the LINE requests on the `/webhooks/line` path. However, you can overwrite the path by assigning the preferred webhook path in the `channels.line.path` field.

We highly recommend setting your sensitive config using `process.env`, so you could avoid any credentials get exposed.

## Environment Configuration

Bottender utilizes the [dotenv](https://www.npmjs.com/package/dotenv) package to load your environment variables when developing your app.

To make a LINE bot work, you must prepare the following environment variables, which you may put into your `.env` file later:

- LINE Access Token
- LINE Channel Secret

### LINE Access Token and Channel Secret

You can find your **LINE Access Token** and **LINE Channel Secret** from LINE official account settings.

After you get your **LINE Access Token** and **LINE Channel Secret**, paste the values into the `LINE_ACCESS_TOKEN` field and `LINE_CHANNEL_SECRET` field accordingly in your `.env` file:

```
// .env

LINE_ACCESS_TOKEN=<Your LINE Access Token>
LINE_CHANNEL_SECRET=<Your LINE Channel Token>
```

> **Note:**
>
> - You can access your LINE official account from your [provider list](https://developers.line.biz/console/).
> - To get your LINE access token and LINE channel secret, you may refer to LINE's official article, [Building a Bot](https://developers.line.biz/en/docs/messaging-api/building-bot/).

## Webhook

After finishing the above settings, you can start your server with LINE webhook event listening using the following commands:

```sh
# in production mode
npm start

# or in development mode
npm run dev
```

When you run bottender in development mode, Bottender automatically run up a ngrok client, and then you can get the information of webhook URL from the console like this:

```
App has started
line webhook URL: https://42bbf602.ngrok.io/webhooks/line
server is running on 5000 port...
```

Then, you have to manually copy your webhook URL to LINE official account's settings page. Finally, you are ready to interact with your bot on LINE.

For further instructions on webhook settings, please check LINE's official article, [Building a Bot](https://developers.line.biz/en/docs/messaging-api/building-bot/).
