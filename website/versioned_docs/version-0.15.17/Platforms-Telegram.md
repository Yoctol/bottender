---
id: version-0.15.17-telegram
title: Telegram
original_id: telegram
---

Telegram is a multi-platform instant messaging system. It treasures the security and privacy of the users. Furthermore, as a flexible platform, Telegram allows developers to create bots. Telegram launches lots of [bot APIs](https://core.telegram.org/bots/api) for third-party developers to build Telegram bots to serve their own needs in no time.  
This guide will focus on the major concept of building a Telegram bot by Bottender. For more detail about Telegram bot, please check [Official Telegram Bot Introduction](https://core.telegram.org/bots).

## Requirements

To start building a Telegram Bot, there are two requirements you need to satisfy.

- Token
- Webhook URL

### Get Token

You have to generate a token by talking to [BotFather](https://telegram.me/botfather). It is an official bot which will help you create new bots or change settings for existing ones.  
Check [Official Telegram Bot Introduction](https://core.telegram.org/bots#6-botfather) for more details about it.

### Webhook URL

Your bot receives updates via an outgoing webhook which is a specific `URL`. When there are any updates for the bot, Telegram will send an HTTPS request to the webhook `URL`.

## Build Your First Telegram Bot

After setting up the webhook `URL` and getting the authorization token, you should fill them in [telegram-hello-world](https://github.com/Yoctol/bottender/tree/v0.15.x/examples/telegram-hello-world/index.js). The following is part of sample code.

```js
const url = '__FILL_URL_HERE__';

const bot = new TelegramBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
});
```

Run your server and talk to the Telegram bot. It works!

### Full Example

Here is the complete example for [telegram-hello-world](https://github.com/Yoctol/bottender/tree/v0.15.x/examples/telegram-hello-world/index.js).

```js
const { TelegramBot } = require('bottender');
const { createServer } = require('bottender/express');

const bot = new TelegramBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
```

After running up the bot server, you can use [bottender CLI](commands) command to setup webhook.

```
$ bottender telegram webhook set -w <YOUR_WEBHOOK_URL>
```

## Events

Bottender supplies several types of event. You are able to access them via `context.event`.  
For more information, check [Event Reference](api-event).

### Telegram-Specific Context Event

- isText
- isPhoto
- isAudio
- isVoice
- isVideo
- callbackQuery
- ...

more on [TelegramEvent Reference](api-telegramevent).

Example:

```js
bot.onEvent(async context => {
  if (context.event.isPhoto) {
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

### Telegram-Specific Context Send API

- sendMessage
- sendPhoto
- sendVideo
- sendContact
- ...

more on [TelegramContext Reference](api-telegramcontext).

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
