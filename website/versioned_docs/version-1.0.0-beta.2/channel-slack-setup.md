---
id: version-1.0.0-beta.2-channel-slack-setup
title: Setup Slack
original_id: channel-slack-setup
---

## Enable Slack Channel

### Create a New Slack Bottender App

`Create Bottender App` is the best way to start building a new application in Bottender.

To create a project, run:

```sh
npx create-bottender-app my-app
```

Make sure that you checked the `slack` option:

![](https://user-images.githubusercontent.com/3382565/67851225-f2b7f200-fb44-11e9-8c86-eee0cbd7cb0d.png)

After finishing `Create Bottender App` process, `bottender.config.js`, a config file, will be generated automatically for furthur channel settings.

### Enable Slack Channel for Existing Apps

First, you need to have a `bottender.config.js` file that sets `channels.slack.enabled` as `true`:

```js
module.exports = {
  channels: {
    slack: {
      enabled: true,
      path: '/webhooks/slack',
      accessToken: process.env.SLACK_ACCESS_TOKEN,
      verificationToken: process.env.SLACK_VERIFICATION_TOKEN,
    },
  },
};
```

The default webhook path is `/webhooks/slack`, but you can set your own webhook path by `path` field.

## Complete Slack Channel Settings

To make a Slack bot work, you have to setup the following values:

- Slack Access Token
- Slack Verification Token
- Webhook

### Slack Access Token & Slack Verification Token

`bottender.config.js` looks up `.env` for Slack access token and Slack verification token.

- Slack access token could be found in [Slack Developer Console](https://api.slack.com/apps) / [YourApp] / Install App.
- Slack verification token could be found in [Slack Developer Console](https://api.slack.com/apps) / [YourApp] / Basic Information.

Then, paste the above two values to corresponding fields in `.env`.

```
SLACK_ACCESS_TOKEN=
SLACK_VERIFICATION_TOKEN=
```

> **Note:**
>
> - If you are not familiar with how Slack bots work, you can find detailed instructions from DialogFlow's [Slack Integration Document](https://cloud.google.com/dialogflow/docs/integrations/slack), which would guide you through how to create a Slack app, add a bot user, enable event subscriptions, add your bot to a team, and so on.

### Webhook

After finishing above settings, you can start your server with Slack webhook event listening using following commands:

```sh
# in production mode
npm start

# or in development mode
npm run dev
```

Then, you have to copy your Slack webhook url to [Slack Developer Console](https://api.slack.com/apps) / [YourApp] / Event Subscriptions, where you can pick which bot events to subscribe.
