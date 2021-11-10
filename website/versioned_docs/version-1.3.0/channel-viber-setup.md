---
id: channel-viber-setup
title: Viber Setup
original_id: channel-viber-setup
---

## Enable Viber Channel

### Create a New Viber Bottender App

`Create Bottender App` is the best way to start building a new application in Bottender.

To create a project, run:

```sh
npx create-bottender-app my-app
```

Make sure that you checked the `viber` option:

![](https://user-images.githubusercontent.com/3382565/67851228-f3508880-fb44-11e9-90aa-c5bcc2d96aa2.png)

After finishing `Create Bottender App` process, `bottender.config.js`, a config file, will be generated automatically for further channel settings.

### Enable Viber Channel for Existing Apps

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

The default webhook path is `/webhooks/viber`, but you can set your own webhook path in the `path` field. You can find more information about `sender` field on Viber's official document, [General Send Message Parameters](https://developers.viber.com/docs/api/rest-bot-api/#general-send-message-parameters).

## Complete Viber Channel Settings

To make Viber bots work, you have to set up the following values:

- Viber Access Token
- Webhook

### Viber Access Token

`bottender.config.js` looks up `.env` for access token, which could be found in Viber Admin Panel (see Viber's official document, [Authentication Token](https://developers.viber.com/docs/api/rest-bot-api/#authentication-token) for more information). Then, paste your Viber bot token to the following field in `.env`.

```
VIBER_ACCESS_TOKEN=
```

### Webhook

After finishing above settings, you can start your server with Viber webhook event listening using following commands:

```sh
# in production mode
npm start

# or in development mode
npm run dev
```

When you run bottender in development mode, Bottender automatically run up a Ngrok client, and then you can get the information of webhook URL from the console like this:

```
App has started
viber webhook url: https://42bbf602.ngrok.io/webhooks/viber
server is running on 5000 port...
```

Then, you can finish your Viber webhook setting with the following command.

```sh
npx bottender viber webhook set
```

Now you are ready to interact with your bot on Viber :)
