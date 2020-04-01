---
id: channel-viber-setup
title: Viber Setup
---

## Enabling Viber Channels

To enable Viber channels, you can start either from new or existing Bottender apps.

### New Bottender Apps

**Create Bottender App** is the best way to start building a new app in Bottender.

To create a project, run:

```sh
npx create-bottender-app my-app
```

Make sure to select the `viber` option:

![](https://user-images.githubusercontent.com/3382565/67851228-f3508880-fb44-11e9-90aa-c5bcc2d96aa2.png)

After you go through the steps, `bottender.config.js` and `.env` are generated automatically for further channel settings.

### Existing Bottender Apps

First, you must have a `bottender.config.js` file includes the following settings:

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

Make sure to set the `channels.viber.enabled` field to `true`.

By default, the Bottender server listens to the Viber requests on the `/webhooks/viber` path. However, you can overwrite the path by assigning the preferred webhook path in the `channels.viber.path` field.

We highly recommend setting your sensitive config using `process.env`, so you could avoid any credentials get exposed.

You can find more information about `sender` field on Viber's official document, [General Send Message Parameters](https://developers.viber.com/docs/api/rest-bot-api/#general-send-message-parameters).

## Environment Configuration

Bottender utilizes the [dotenv](https://www.npmjs.com/package/dotenv) package to load your environment variables when developing your app.

To make a Viber bot work, you must prepare the following environment variable, which you may put into your `.env` file later:

- Viber Access Token

### Viber Access Token

After you find your **Viber Authentication Token** on **Viber Admin Panel**, paste the value into the `VIBER_ACCESS_TOKEN` field in your `.env` file:

```
# .env

VIBER_ACCESS_TOKEN=<Your Viber Authentication Token>
```

For more information, see Viber's official document, [Authentication Token](https://developers.viber.com/docs/api/rest-bot-api/#authentication-token).

## Webhook

After finishing above settings, you can start your server with Viber webhook event listening using the following commands:

```sh
# in production mode
npm start

# or in development mode
npm run dev
```

When you run bottender in development mode, Bottender automatically run up a ngrok client, and then you can get the information of webhook URL from the console like this:

```
App has started
viber webhook URL: https://42bbf602.ngrok.io/webhooks/viber
server is running on 5000 port...
```

Then, you can finish your Viber webhook setting with the following command.

```sh
npx bottender viber webhook set
```

Now you are ready to interact with your bot on Viber.
