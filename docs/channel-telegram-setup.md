---
id: channel-telegram-setup
title: Telegram Setup
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/h5Mg8gNp8vk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br/>

☝️By Bottender, you can begin your first Telegram Bot in 3 mins!!

## Enabling Telegram Channels

To enable Telegram channels, you can start either from new or existing Bottender apps.

### New Bottender Apps

**Create Bottender App** is the best way to start building a new app in Bottender.

To create a project, run:

```sh
npx create-bottender-app my-app
```

Make sure to select the `telegram` option:

![](https://user-images.githubusercontent.com/3382565/67851226-f2b7f200-fb44-11e9-951d-c0050db88ed3.png)

After you go through the steps, `bottender.config.js` and `.env` are generated automatically for further channel settings.

### Existing Bottender Apps

First, you must have a `bottender.config.js` file includes the following settings:

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

Make sure to set the `channels.telegram.enabled` field to `true`.

By default, the Bottender server listens to the Telegram requests on the `/webhooks/telegram` path. However, you can overwrite the path by assigning the preferred webhook path in the `channels.telegram.path` field.

We highly recommend setting your sensitive config using `process.env`, so you could avoid any credentials get exposed.

## Environment Configuration

Bottender utilizes the [dotenv](https://www.npmjs.com/package/dotenv) package to load your environment variables when developing your app.

To make a Telegram bot work, you must prepare the following environment variable, which you may put into your `.env` file later:

- Telegram Access Token

### Telegram Access Token

You can get a Telegram bot account and a bot token by sending the `/newbot` command to [@BotFather](https://t.me/BotFather) on Telegram.

<p><img width="800px" src="https://user-images.githubusercontent.com/662387/71246889-9312e180-2352-11ea-97da-9a5adc014fda.png"></p>

After you get your **Telegram Bot Token**, paste the value into the `TELEGRAM_ACCESS_TOKEN` field in your `.env` file:

```
# .env

TELEGRAM_ACCESS_TOKEN=<Your Telegram Bot Token>
```

For more information, please refer to Telegram's official doc, [BotFather](https://core.telegram.org/bots#6-botfather).

> **Note:** Keep your token secure and store it safely; it can be used by anyone to control your bot. When you have to generate a new access token, you can send `/revoke` to BotFather.

## Webhook

### Set Up Webhook for Development

Before setting the webhook, please make sure you have set your access token correctly in `.env`.

By the following command, Bottender runs a bot server by ngrok, which makes your local bot server accessible from the Internet.

```sh
# in development
npm run dev
```

When you run bottender in development mode, Bottender automatically run up a ngrok client, and then you can get the information of webhook URL from the console like this:

```
App has started
telegram webhook URL: https://42bbf602.ngrok.io/webhooks/telegram
server is running on 5000 port...
```

Then, you can open a new tab in the terminal and finish the webhook setting by the below command.

```sh
npx bottender telegram webhook set
```

Finally, press `Y` to allow Bottender set `ngrok` temporary URL as the webhook. Now you are ready to interact with your bot on Telegram.

### Set Up Webhook for Production

Before setting the webhook, please make sure you set your access token correctly as the environment variable.

Then, you can run Bottender on your hosting by the following command.

```sh
# in development
npm run dev
```

By the following command, you can finish the Telegram webhook setting. (If you deployed your bot with the default webhook setting, you webhook for Telegram bot supposed to be `https://example.com/webhooks/telegram` )

```sh
npx bottender telegram webhook set -w https://example.com/webhooks/telegram
```

Now you are ready to interact with your bot on Telegram.
