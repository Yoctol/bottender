---
id: channel-slack-setup
title: Setup Slack
---

## Create a New Slack Bottender App

Create Bottender App is the best way to start building a new application in Bottender.

To create a project, run:

```sh
npx create-bottender-app my-app
```

Make sure that you checked the `slack` option:

![](https://user-images.githubusercontent.com/3382565/67851225-f2b7f200-fb44-11e9-8c86-eee0cbd7cb0d.png)

## Enabling Slack Channel in Existing Apps

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

By default, webhook listens on path - `/webhooks/slack`, but you can set it to whatever you want using `path` field.

Then, you need to fill in following fields in `.env` for loading those values correctly into `bottender.config.js`:

```
SLACK_ACCESS_TOKEN=
SLACK_VERIFICATION_TOKEN=
```

> Note:

After that, you can start your server with Slack webhook listening using following commands:

```
// in production mode
npm start

// or in development mode
npm run dev
```

## Setting Webhook to Slack

// ...
