---
id: version-1.0.5-advanced-guides-multi-channel
title: Multi-Messaging Channel Support
original_id: advanced-guides-multi-channel
---

## Build a Cross-Platform Bot

Through Bottender, we can build chatbots that support multiple platforms at the same time. In other words, we can develop only one action to handle messages from different platforms such as Messenger, LINE, Telegram, etc.

There are three steps to set up a simple cross-platform bot:

1. Setup each platform
2. Enable each channel for the App
3. Develop the action

## Setup Each Platform

To build a cross-platform bot, we have to setup each platform first. We can setup the platforms by following these guides:

- [Setup Messenger](https://bottender.js.org/docs/channel-messenger-setup)
- [Setup LINE](https://bottender.js.org/docs/channel-line-setup)
- [Setup Slack](https://bottender.js.org/docs/channel-slack-setup)
- [Setup Telegram](https://bottender.js.org/docs/channel-telegram-setup)
- [Setup Viber](https://bottender.js.org/docs/channel-viber-setup)

After we set up for the platforms which we want to handle, we have to put the required values to the `.env` file.

`.env`

```
MESSENGER_PAGE_ID=
MESSENGER_ACCESS_TOKEN=
MESSENGER_APP_ID=
MESSENGER_APP_SECRET=
MESSENGER_VERIFY_TOKEN=

LINE_ACCESS_TOKEN=
LINE_CHANNEL_SECRET=

TELEGRAM_ACCESS_TOKEN=

SLACK_ACCESS_TOKEN=
SLACK_VERIFICATION_TOKEN=

VIBER_ACCESS_TOKEN=
```

## Enable Each Channel for the Apps

Next, we have to enable the channel we want to handle in the `bottender.config.js` file.

For example, if we want to enable our bot to support Messenger, we have to set `channels.messenger.enabled` as `true`.

`bottender.config.js`

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
    line: {
      enabled: true,
      path: '/webhooks/line',
      accessToken: process.env.LINE_ACCESS_TOKEN,
      channelSecret: process.env.LINE_CHANNEL_SECRET,
    },
    telegram: {
      enabled: true,
      path: '/webhooks/telegram',
      accessToken: process.env.TELEGRAM_ACCESS_TOKEN,
    },
    slack: {
      enabled: true,
      path: '/webhooks/slack',
      accessToken: process.env.SLACK_ACCESS_TOKEN,
      verificationToken: process.env.SLACK_VERIFICATION_TOKEN,
    },
    viber: {
      enabled: true,
      path: '/webhooks/viber',
      accessToken: process.env.VIBER_ACCESS_TOKEN,
      sender: {
        name: 'xxxx',
      },
    },
  },
};
```

## Develop the Action

Now, we can develop an action to handle messages from different platforms. We can use [`context.platform`](https://bottender.js.org/docs/api-context#platform) in our App to tell which platform the messages are coming from.

Here, we develop a simple action that replies to the users with the platform they are using.

```js
module.exports = async function App(context) {
  await context.sendText(`Hello World. Platform: ${context.platform}`);
};
```

You can check out the repository of the above example [here](https://github.com/Yoctol/bottender/tree/master/examples/multiple-channels).

## Define Platform-Specific Actions

Different platforms support some different advanced events for better user experience. For example, Messenger supports Button Template while LINE supports Flex Message. Therefore, we might want to define some platform-specific actions to handle these advanced events.

To better organize bot actions, we can use `router` and `platform` functions from `bottender/router` to handle routing between different platforms.

In the example app, we define two additional actions to leverage the platform-specific events.

```js
import { platform, router } from 'bottender/router';

async function LineAction(context) {
  await context.sendFlex('This is a line-specific message!', {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'horizontal',
      contents: [
        {
          type: 'text',
          text: 'Hello,',
        },
        {
          type: 'text',
          text: 'World',
        },
      ],
    },
  });
}

async function MessengerAction(context) {
  await context.sendButtonTemplate('This is a messenger-specific message!', [
    {
      type: 'postback',
      title: 'Hello',
      payload: 'Hello',
    },
    {
      type: 'postback',
      title: 'World',
      payload: 'World',
    },
  ]);
}

module.exports = async function App(context) {
  return router([
    platform('line', LineAction),
    platform('messenger', MessengerAction),
  ]);
};
```
