---
id: version-1.3.1-advanced-guides-multi-channel
title: Multi-Channel Support
original_id: advanced-guides-multi-channel
---

Bottender intends to meet enterprise project needs. So, Bottender supports multiple chat channels in the very early stage. For example, you can put the environment variables of each chat channel in one config file; you can use [`Platform Specific Routes`](the-basics-routing#platform-specific-routes) to organize user events from various platforms.

Plus, Bottender aims to support the full features of each chat channel, e.g., `Block Kit` of Slack, `Rich Menu` of LINE, `Handover Protocol` of Messenger. That is why we didn't design cross-platform `Generic Chat UIs`. And you don't have to learn extra `Generic Chat UIs` and worry about if these still apply to the latest `Chat UI` of each chat channel.

The primary three steps to build a basic cross-platform bot are as follows:

1. Setup each chat channel
2. Enable each chat channel
3. Develop cross-platform bot actions

## Setup Each Chat Channel

To build a cross-platform bot, you have to set up each platform first. In short, you have to fill in environment variables in your `.env` for the chat channels supported by your bot.

```sh
// .env

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

> **Note:** If you are not familiar with setting up chat channels, you may refer to the following Bottender docs:
>
> - [Setup Messenger](https://bottender.js.org/docs/channel-messenger-setup)
> - [Setup WhatsApp](https://bottender.js.org/docs/channel-whatsapp-setup)
> - [Setup LINE](https://bottender.js.org/docs/channel-line-setup)
> - [Setup Slack](https://bottender.js.org/docs/channel-slack-setup)
> - [Setup Telegram](https://bottender.js.org/docs/channel-telegram-setup)
> - [Setup Viber](https://bottender.js.org/docs/channel-viber-setup)

## Enable Each Chat channel

Next, you have to make sure you have enable the channel you want to support in `bottender.config.js`.

For example, if you want to enable your bot to support Messenger, you have to set `channels.messenger.enabled` as `true`.

```js
// `bottender.config.js`

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
    whatsapp: {
      enabled: true,
      path: '/webhooks/whatsapp',
      accountSid: process.env.WHATSAPP_ACCOUNT_SID,
      authToken: process.env.WHATSAPP_AUTH_TOKEN,
      phoneNumber: process.env.WHATSAPP_PHONE_NUMBER,
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
      signingSecret: process.env.SLACK_SIGNING_SECRET,
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

## Develop Cross-Platform Bot Actions

Now, you can develop actions to handle messages from different platforms.

A right bot action relates to the current user status with the incoming event. In the following section, you can see various approaches to cross-platform event handling.

### Using `context.platform` to Manage Cross-Platform Events

You can use [`context.platform`](https://bottender.js.org/docs/api-context#platform) to check that each message belongs to which platform.

In the following code, you can see a simple action that replies to the users with the platform they are using.

```js
module.exports = async function App(context) {
  await context.sendText(`Hello World. Platform: ${context.platform}`);
};
```

You can check out the repository of the above example [here](https://github.com/Yoctol/bottender/tree/master/examples/multiple-channels).

### Using `router` and `platform` to Manage Cross-Platform Events

Different platforms provide different advanced events for better user experience. For example, Messenger supports Button Template, while LINE supports Flex Message. Therefore, you might want to define some platform-specific actions to handle these advanced events.

To better organize bot actions, you can use `router` and `platform` functions from `bottender/router` to handle routing among different platforms.

In the example app, you can see two additional actions to leverage the platform-specific events.

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

### Using `Platform Specific Routes` to Manage Cross-Platform Events

By Bottender 1.1+, you can use `Platform Specific Routes` as an alternative to organize events from various chat channels. To learn more about the details of those specific routes, check out their documentation:

- [Messenger Routes](channel-messenger-routing.md)
- [WhatsApp Routes](channel-whatsapp-routing.md)
- [LINE Routes](channel-line-routing.md)
- [Slack Routes](channel-slack-routing.md)
- [Telegram Routes](channel-telegram-routing.md)
- [Viber Routes](channel-viber-routing.md)
