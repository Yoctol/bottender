---
title: Telegram Guide
date: "2017-10-12"
---

# Telegram Guide

## Introduction

Telegram is an instant messaging system, multi-platform, focused on the security and privacy of the users. Furthermore, being a flexible platform, Telegram allows developers to create bots. Telegram launches lots of [bot APIs](https://core.telegram.org/bots/api) for third-party developers to build Telegram bots to serve their own needs in no time.  
This guide will focus on major concept of building a Telegram bot by Bottender. For more detail about Telegram bot, please check [Official Telegram Bot Introduction](https://core.telegram.org/bots).

## Requirements

To begin to build a Telegram Bot, there are two requirements you need to satisfy.
- Token
- Webhook URL

### Get token

You have to generate a token by talking to [BotFather](https://telegram.me/botfather). It is an official bot which will help you create new bots or change settings for existing ones.  
Check [Official Telegram Bot Introduction](https://core.telegram.org/bots#6-botfather) for more details about it.

### Webhook URL

Your bot receives updates via an outgoing webhook which is a specific `URL`. When there has any updates for the bot, Telegram will send an HTTPS request to the webhook `URL`.

## Build your first Telegram bot

After setting up the webhook `URL` and getting the authorization token, you should fill them in [telegram-hello-world](https://github.com/Yoctol/toolbot-core-experiment/tree/master/examples/telegram-hello-world/index.js). The following is part of sample code.

```js
const url = '__FILL_URL_HERE__';

const bot = new TelegramBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
});
```

Run your server and talk to the Telegram bot. It works!

### Full example

Here is the complete code for [telegram-hello-world](https://github.com/Yoctol/toolbot-core-experiment/tree/master/examples/telegram-hello-world/index.js)

```js
const { TelegramBot } = require('toolbot-core-experiment');
const { createServer } = require('toolbot-core-experiment/express');

const url = '__FILL_URL_HERE__';

const bot = new TelegramBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

const server = createServer(bot);

server.listen(5000, () => {
  bot.connector.client.setWebhook(url);
  console.log('server is running on 5000 port...');
});
```

## Events

Bottender supplies several types of event. You are able to access them via `context.event`.  
For more information, check [Telegram Event Reference](./APIReference-TelegramEvent.md) and [General Event Reference](./APIReference-GeneralEvent.md).

### Telegram-specific context event

- isTextMessage
- isPhotoMessage
- isAudioMessage
- isVoiceMessage
- isVideoMessage
- callbackQuery
- ...

more on [Telegram Event Reference](./APIReference-TelegramEvent.md).

Example:
```js
bot.onEvent(async context => {
  if (context.event.isPhotoMessage) {
    await context.sendMessage('I know this is a photo.');
  } else if (
    context.event.callbackQuery === 'A_DEVELOPER_DEFINED_CALLBACK_QUERY'
  ) {
    await context.sendMessage('I know this is a callback query.');
  } else {
    await context.sendMessage('I do not understand.');
  }
});
```

## Send APIs

After your bot receives the request from Telegram, you can use context send APIs to interact with users.

### Telegram-specific context send API

- sendMessage
- sendPhoto
- sendVideo
- sendContact
- ...

more on [Telegram Context Reference](./APIReference-MessengerContext.md).

Example:
```js
bot.onEvent(async context => {
  await context.sendMessage('Hello World!');
  await context.sendPhoto('http://example.com/pic.png');
  await context.sendContact({
    phone_number: '886123456789',
    first_name: 'first name',
  });
});

```

## References

- [Messaging-apis-telegram](https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-telegram)
- [Official Telegram Page](https://telegram.org)
- [Official Telegram Bot Introduction](https://core.telegram.org/bots)
- [Official Telegram Bot API](https://core.telegram.org/bots/api)
