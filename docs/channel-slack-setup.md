---
id: channel-slack-setup
title: Slack Setup
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/7aISWF9_jO4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Requirements

Before going further, we assume that you already have:

- a Slack Account
- a [Slack Workspace](https://slack.com/create#email)

### Slack App and Bot User

Create a [Slack App](https://api.slack.com/apps?new_app=1) if you haven't.

 <p><img width="800" src="https://user-images.githubusercontent.com/662387/71443858-64c54580-2748-11ea-9d64-7fb321a176b0.png"></p>
 <p><img width="800" src="https://user-images.githubusercontent.com/662387/71443859-655ddc00-2748-11ea-942d-22d4378b8a28.png"></p>

Create a bot user within your Slack App.

<p><img width="800" src="https://user-images.githubusercontent.com/662387/71443860-655ddc00-2748-11ea-98ce-d54f96b2ea9f.png"></p>

<p><img width="800" src="https://user-images.githubusercontent.com/662387/71443861-655ddc00-2748-11ea-805d-31326486c049.png"></p>

Remember to install the Slack App in your workspace.

<p><img width="800" src="https://user-images.githubusercontent.com/662387/71443862-65f67280-2748-11ea-83a8-ca04340d6217.png"></p>
<p><img width="800" src="https://user-images.githubusercontent.com/662387/71443863-65f67280-2748-11ea-8de7-2be1f0419729.png"></p>

> **Note:** If you are not familiar with how Slack bots work, you can find detailed instructions from DialogFlow's [Slack Integration Document](https://cloud.google.com/dialogflow/docs/integrations/slack)

## Enabling Slack Channels

To enable Slack channels, you can start either from new or existing Bottender apps.

### New Bottender Apps

**Create Bottender App** is the best way to start building a new app in Bottender.

To create a project, run:

```sh
npx create-bottender-app my-app
```

Make sure to select the `slack` option:

![](https://user-images.githubusercontent.com/3382565/67851225-f2b7f200-fb44-11e9-8c86-eee0cbd7cb0d.png)

After you go through the steps, `bottender.config.js` and `.env` are generated automatically for further channel settings.

### Existing Bottender Apps

First, you must have a `bottender.config.js` file includes the following settings:

```js
module.exports = {
  channels: {
    slack: {
      enabled: true,
      path: '/webhooks/slack',
      accessToken: process.env.SLACK_ACCESS_TOKEN,
      signingSecret: process.env.SLACK_SIGNING_SECRET,
      // verificationToken: process.env.SLACK_VERIFICATION_TOKEN, // deprecated, use signingSecret
    },
  },
};
```

Make sure to set the `channels.slack.enabled` field to `true`.

By default, the Bottender server listens to the Slack requests on the `/webhooks/slack` path. However, you can overwrite the path by assigning the preferred webhook path in the `channels.slack.path` field.

We highly recommend setting your sensitive config using `process.env`, so you could avoid any credentials get exposed.

## Environment Configuration

Bottender utilizes the [dotenv](https://www.npmjs.com/package/dotenv) package to load your environment variables when developing your app.

To make a Slack bot work, you must prepare the following environment variables, which you may put into your `.env` file later:

- Slack Access Token
- Slack Signing Secret (or Slack Verification Token)

### Slack Access Token

You can find Slack access token in [Slack Developer Console](https://api.slack.com/apps) → \${YourApp} → Install App → Bot User OAuth Access Token

<p><img width="800" src="https://user-images.githubusercontent.com/662387/71455592-a7cafb80-27d0-11ea-8ac7-3633c2b4d429.png"></p>

After you get your **Slack Access Token**, paste the value into the `SLACK_ACCESS_TOKEN` field in your `.env` file:

```
// .env

SLACK_ACCESS_TOKEN=<YOUR SLACK ACCESS TOKEN>
```

### Slack Signing Secret

You can find Slack signing secret in [Slack Developer Console](https://api.slack.com/apps) → \${YourApp} → Basic Information → Signing Secret.

<p><img width="800" src="https://user-images.githubusercontent.com/4010549/74005498-07155180-49b4-11ea-9f15-f2e0e869f677.png"></p>

After you get your **Slack Signing Secret**, paste the value into the `SLACK_SIGNING_SECRET` field in your `.env` file:

```
// .env

SLACK_SIGNING_SECRET=<YOUR SLACK SIGNING SECRET>
```

### Slack Verification Token (Deprecated)

We recommend using signing secret instead of verification token, but we also support verification token.

You can find  Slack verification token in [Slack Developer Console](https://api.slack.com/apps) → \${YourApp} → Basic Information → Verification Token.

<p><img width="800" src="https://user-images.githubusercontent.com/662387/71443865-668f0900-2748-11ea-9637-158575626c53.png"></p>

After you get your **Slack Verification Token**, paste the value into the `SLACK_VERIFICATION_TOKEN` field in your `.env` file:

```
// .env

# SLACK_VERIFICATION_TOKEN=<YOUR SLACK VERIFICATION TOKEN> # deprecated, use `SLACK_SIGNING_SECRET` instead
```

## Webhook

After finishing the above settings, you can start your server with Slack webhook event listening using the following commands:

```sh
# in production mode
npm start

# or in development mode
npm run dev
```

When you run bottender in development mode, Bottender automatically run up a ngrok client, and then you can get the information of webhook URL from the console like this:

```
App has started
slack webhook URL: https://42bbf602.ngrok.io/webhooks/slack
server is running on 5000 port...
```

Then, you have to copy your Slack webhook URL to [Slack Developer Console](https://api.slack.com/apps) → \${YourApp} → Event Subscriptions, where you can pick which bot events to subscribe.

<p><img width="800" src="https://user-images.githubusercontent.com/662387/71443867-668f0900-2748-11ea-9d4c-be7574f770e2.png"></p>

<p><img width="800" src="https://user-images.githubusercontent.com/662387/71443868-668f0900-2748-11ea-883e-bdd38111c485.png"></p>

<p><img width="800" src="https://user-images.githubusercontent.com/662387/71443869-67279f80-2748-11ea-82cb-16c0ac8668de.png"></p>

For more information about Slack Events, please refer to Slack's official doc, [API Event Types](https://api.slack.com/events)

> **Note:** If your bot doesn't respond after webhook settings, please take a closer look at bot events you subscribed to. Slack doesn't pick any bot events subscription by default. The first bot event you may subscribe to is `message.im`, which is the event whenever a user posts a direct message to your bot.
