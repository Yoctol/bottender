---
id: version-1.0.5-channel-messenger-setup
title: Messenger Setup
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

After finishing the `Create Bottender App` process, `bottender.config.js,` a config file is generated automatically for further channel settings.

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

By default, webhook listens on path - `/webhooks/messenger`.
You can set your webhook path in the `path` field.

## Complete Messenger Channel Settings

When you run a Bottender app, Bottender loads environment variables in the config file, `bottender.config.js`. Then, `bottender.config.js` loads sensitive or environment-dependent variables in `.env`.

To make a Messenger Bot works, you have to fill in the below environment variables in `.env`.

```
# .env

MESSENGER_PAGE_ID=
MESSENGER_ACCESS_TOKEN=
MESSENGER_APP_ID=
MESSENGER_APP_SECRET=
MESSENGER_VERIFY_TOKEN=
```

Before going further, we assumed that you have already prepared:

- A Facebook Developer account
- A Facebook App for your Messenger Bot
- A Facebook Page for your Messenger Bot
- A Bottender Project

> **Note:** If you are not familiar with Facebook App, you can refer to Facebook's official doc, [Setting Up Your Facebook App](https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup/).

Then you can open your App page and ready to prepare relevant environment variables. You can find detailed instructions in the following sections.

### Prepare `MESSENGER_APP_ID` and `MESSENGER_APP_SECRET`

Traverse to [Your Facebook Apps](https://developers.facebook.com/apps) → \${Your App Page} → Settings → Basic.

You can see your App ID and App Secret. Facebook will ask your Facebook password again before display your App Secret. Fill these two values to `MESSENGER_APP_ID` and `MESSENGER_APP_SECRET` in `.env`.

![](https://user-images.githubusercontent.com/662387/71390359-fe9ecc80-263a-11ea-9a3a-e7188992e471.png)

### Prepare `MESSENGER_PAGE_ID` and `MESSENGER_ACCESS_TOKEN`

First, please make sure that you have added `Messenger` as a product of your Facebook App.

![](https://user-images.githubusercontent.com/662387/71392717-19297380-2644-11ea-9bea-4362d0cc72c3.png)

Traverse to [Your Facebook Apps](https://developers.facebook.com/apps) → \${Your App Page} → Messenger → Settings → Access Tokens. Add your Facebook Page to your Facebook App.

![](https://user-images.githubusercontent.com/662387/71392720-19c20a00-2644-11ea-9961-97b39fef24c2.png)

Once you have added your Facebook Page for your App, you can find the `Facebook ID`. Click the `Generate Token` button to generate `Messenger Access Token.`

![](https://user-images.githubusercontent.com/662387/71392721-19c20a00-2644-11ea-8b61-ea3f97296b5e.png)

Facebook has a strict security policy. You can only have one chance to save your `Access Token.` Remember to have your access token copied before closing the `Token Generated` pop up. If you forgot or lost your `Access Token,` the only thing you can do is to revoke a new one.

![](https://user-images.githubusercontent.com/662387/71392723-1a5aa080-2644-11ea-874d-0d21b1e0da17.png)

### Prepare `MESSENGER_VERIFY_TOKEN`

You can define your `Verify Token` in the filed of `MESSENGER_VERIFY_TOKEN` in `.env`. It is a token for Facebook to confirm the origin of the response is from your bot server.

![](https://user-images.githubusercontent.com/662387/71392880-cb613b00-2644-11ea-928f-7941a6d955d0.png)

### Prepare `Webhook`, and `Subscriptions`

Before going further, please make sure you have filled in the following fields: `MESSENGER_PAGE_ID,` `MESSENGER_ACCESS_TOKEN,` `MESSENGER_APP_ID,` `MESSENGER_APP_SECRET,` `MESSENGER_VERIFY_TOKEN.`

#### In Development

You can run your Bottender project by the following commands.

```sh
npm run dev
```

Then you can run the following commands to set webhook and enable bot related Messenger subscriptions.

```sh
npx bottender messenger webhook set
```

Finally, you are ready to test your bot on Messenger.

#### In Production

Run your Bottender project on your hosting by the following commands.

```sh
npm start
```

If you deployed your bot on `https://example.com/`, your Messenger Bot webhook is `https://example.com/webhooks/messenger` with the default settings.

#### Set up Webhook and Enable Subscriptions by Command

You can set your webhook by the command below.

```sh
npx bottender telegram webhook set -w https://example.com/webhooks/messenger
```

#### Set up Webhook and Enable Subscriptions on Facebook App Page

However, there are many more options and information on Facebook App page. You can also set up your webhook on Facebook App Page.

Traverse to [Your Facebook Apps](https://developers.facebook.com/apps) → \${Your App Page} → Messenger → Settings → Webhook. Click button `Add Callback URL.`

![](https://user-images.githubusercontent.com/662387/71392724-1a5aa080-2644-11ea-9293-37f9570e5ac7.png)

Fill your webhook URL in the `Callback URL` and copy your `MESSENGER_VERIFY_TOKEN` from `.env` and paste to `Verify Token.`

![](https://user-images.githubusercontent.com/662387/71392725-1a5aa080-2644-11ea-8e80-10ea96d19379.png)

Please make sure that you have enabled `Subscriptions` you need by clicking `Edit` Button. We usually recommend developers to enable the following subscriptions: `messages, messaging_postbacks, messaging_optins, messaging_referrals, messaging_handovers, messaging_policy_enforcement.`

![](https://user-images.githubusercontent.com/662387/71398058-3c5f1d80-265a-11ea-98ff-1bc8035ead60.png)

Last but not least, let's echo again about Messenger's strict security policy. Before you release your bot to the public, you have to submit your App to Facebook to get relevant permissions, e.g., `pages_message.` See Facebook's official document, [Submitting Your Messenger App](https://developers.facebook.com/docs/messenger-platform/app-review/), for more information.
