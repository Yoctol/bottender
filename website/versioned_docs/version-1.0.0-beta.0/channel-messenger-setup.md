---
id: version-1.0.0-beta.0-channel-messenger-setup
title: Setup Messenger
original_id: channel-messenger-setup
---

## Enable Messenger Channel

### Create a New Messenger Bottender App

`Create Bottender App` is the best way to start building a new application in Bottender.

To create a project, run:

```sh
npx create-bottender-app my-app
```

Make sure that you checked the `messenger` option:

![](https://user-images.githubusercontent.com/3382565/67851223-f2b7f200-fb44-11e9-960a-4f58d68ab37d.png)

After finishing `Create Bottender App` process, `bottender.config.js`, a config file, will be generated automatically for furthur channel settings.

### Enable Messenger Channel for Existing Apps

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

By default, webhook listens on path - `/webhooks/messenger`. You can set your own webhook path in the `path` field.

## Complete Messenger Channel Settings

To make a Messenger bot work, you have to setup the following values:

- Messenger Page Id
- Messenger Access Token
- Messenger App Id
- Messenger App Secret
- Messenger Verify Token
- Webhook

### Messenger Page Id, Messenger Access Token, Messenger App Id, Messenger App Secret, and Messenger Verify Token

These fields could be found on your Facebook App page, which you can accessed from your [Facebook App Dashboard](https://developers.facebook.com/apps). Then, you need to fill in corresponding fields in `.env` for loading those values correctly into `bottender.config.js`:

```
MESSENGER_PAGE_ID=
MESSENGER_ACCESS_TOKEN=
MESSENGER_APP_ID=
MESSENGER_APP_SECRET=
MESSENGER_VERIFY_TOKEN=
```

> **Note:**
>
> - If you are not familiar with how messenger bots work, you may refer to Facebook's official document, [Setting Up Your Facebook App](https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup/).

### Webhook

After finishing above settings, you can start your server with Messenger webhook event listening using following commands:

```sh
# in production mode
npm start

# or in development mode
npm run dev
```

Then, you can finish your Messenger webhook setting with the following command.

```sh
npx bottender messenger webhook set
```

Now you are ready to interact with your bot on Messenger :)

> **Note:**
>
> - Before you release your bot to the public, you have to submit your App to Facebook to get relevant permissions, e.g. `pages_message`. See Facebook's official document, [Submitting Your Messenger App](https://developers.facebook.com/docs/messenger-platform/app-review/), for more information.
