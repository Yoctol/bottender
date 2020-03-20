---
id: channel-slack-setup
title: Setup Slack
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/7aISWF9_jO4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Enable Slack Channel

### Create a New Slack Bottender App

`Create Bottender App` is the best way to start building a new application in Bottender.

To create a project, run:

```sh
npx create-bottender-app my-app
```

Make sure that you checked the `slack` option:

![](https://user-images.githubusercontent.com/3382565/67851225-f2b7f200-fb44-11e9-8c86-eee0cbd7cb0d.png)

After finishing the `Create Bottender App` process, `bottender.config.js`, a config file, will be generated automatically for further channel settings.

### Enable Slack Channel for Existing Apps

First, you need to have a `bottender.config.js` file that sets `channels.slack.enabled` as `true`:

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

The default webhook path is `/webhooks/slack`, but you can set your webhook path by `path` field.

## Complete Slack Channel Settings

To make a Slack bot work, you have to set up the following values:

- Slack Access Token
- Slack Signing Secret (or Verification Token)
- Webhook

### Requirements

Before going further, we assumed that you already have:

- a Slack Account
- a [Slack Workspace](https://slack.com/create#email)

#### Slack App & Bot User

Create a [Slack App](https://api.slack.com/apps?new_app=1) if you haven't.

 <p><img width="800" src="https://user-images.githubusercontent.com/662387/71443858-64c54580-2748-11ea-9d64-7fb321a176b0.png"></p>
 <p><img width="800" src="https://user-images.githubusercontent.com/662387/71443859-655ddc00-2748-11ea-942d-22d4378b8a28.png"></p>

Create a bot user within your Slack App.

<p><img width="800" src="https://user-images.githubusercontent.com/662387/71443860-655ddc00-2748-11ea-98ce-d54f96b2ea9f.png"></p>

<p><img width="800" src="https://user-images.githubusercontent.com/662387/71443861-655ddc00-2748-11ea-805d-31326486c049.png"></p>

Remember to install the Slack App in your workspace.

<p><img width="800" src="https://user-images.githubusercontent.com/662387/71443862-65f67280-2748-11ea-83a8-ca04340d6217.png"></p>
<p><img width="800" src="https://user-images.githubusercontent.com/662387/71443863-65f67280-2748-11ea-8de7-2be1f0419729.png"></p>

> **Note:**
>
> - If you are not familiar with how Slack bots work, you can find detailed instructions from DialogFlow's [Slack Integration Document](https://cloud.google.com/dialogflow/docs/integrations/slack)

### Access Token & Signing Secret (or Verification Token)

`bottender.config.js` looks up `.env` for Slack access token and Slack verification token.

```
// .env

SLACK_ACCESS_TOKEN=
SLACK_SIGNING_SECRET=
# SLACK_VERIFICATION_TOKEN= # deprecated, use SLACK_SIGNING_SECRET
```

Follow the below steps to find your access token and signing secret (or verification token).

- Slack access token could is in [Slack Developer Console](https://api.slack.com/apps) → \${YourApp} → Install App → Bot User OAuth Access Token

<p><img width="800" src="https://user-images.githubusercontent.com/662387/71455592-a7cafb80-27d0-11ea-8ac7-3633c2b4d429.png"></p>

- Slack signing secret could be found in [Slack Developer Console](https://api.slack.com/apps) → \${YourApp} → Basic Information → Signing Secret.

<p><img width="800" src="https://user-images.githubusercontent.com/4010549/74005498-07155180-49b4-11ea-9f15-f2e0e869f677.png"></p>

We recommend use signing secret instead of verification token, but we also support verification token:

- Slack verification token could be find in [Slack Developer Console](https://api.slack.com/apps) → \${YourApp} → Basic Information → Verification Token.

<p><img width="800" src="https://user-images.githubusercontent.com/662387/71443865-668f0900-2748-11ea-9637-158575626c53.png"></p>

### Webhook

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
slack webhook url: https://42bbf602.ngrok.io/webhooks/slack
server is running on 5000 port...
```

Then, you have to copy your Slack webhook URL to [Slack Developer Console](https://api.slack.com/apps) → \${YourApp} → Event Subscriptions, where you can pick which bot events to subscribe.

<p><img width="800" src="https://user-images.githubusercontent.com/662387/71443867-668f0900-2748-11ea-9d4c-be7574f770e2.png"></p>

<p><img width="800" src="https://user-images.githubusercontent.com/662387/71443868-668f0900-2748-11ea-883e-bdd38111c485.png"></p>

<p><img width="800" src="https://user-images.githubusercontent.com/662387/71443869-67279f80-2748-11ea-82cb-16c0ac8668de.png"></p>

> **Note:**
>
> - If your bot doesn't respond after webhook settings, please take a closer look at bot events you subscribed to. Slack doesn't pick any bot events subscription by default. The first bot event you may subscribe to is `message.im`, which is the event whenever a user posts a direct message to your bot.
> - For more info about Slack Events, please refer to Slack's official doc, [API Event Types](https://api.slack.com/events)
