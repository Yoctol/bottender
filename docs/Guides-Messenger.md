---
title: Messenger Guide
date: "2017/10/12"
---

# Messenger

## Introduction

This guide will give you some basic concepts about developing a Messenger bot. For more detail, check [the official docs](https://developers.facebook.com/docs/messenger-platform).

## Requirements

To develop a Messenger bot, you need the following requirements:
- A Page Access Token
- An App Secret

In order to get Page Access Token and App secret, you need:
- [A Facebook Page](https://www.facebook.com/pages/create/)
- [A Facebook App](https://developers.facebook.com/)

After you get a Facebook Page and a Facebook App, you can get the `Page Access Token`. Check the [official docs](https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup).  
Also remember to copy the `App Secret` on app dashboard. Click `Show` button on dashboard and type your password to get the App Secret.

Before leave this section, make sure you have the following requirements:
- A Page Access Token
- An App Secret

We will use it to develop our messenger bot later.

## Build your first Messenger bot

The following is a partial sample code, the full example is [here](https://github.com/Yoctol/toolbot-core-experiment/tree/master/examples/messenger-hello-world).

```js
const { MessengerBot } = require('toolbot-core-experiment');

const bot = new MessengerBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  appSecret: '__FILL_YOUR_SECRET_HERE__',
});
```

After you fill the accessToken and appSecret, run your server and try it out by talking to your Facebook Page! It works!

### Full example

Here is the complete code for [messenger-hello-world](https://github.com/Yoctol/toolbot-core-experiment/tree/master/examples/messenger-hello-world)

```js
const { MessengerBot } = require('toolbot-core-experiment');
const { createServer } = require('toolbot-core-experiment/express');

const bot = new MessengerBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  appSecret: '__FILL_YOUR_SECRET_HERE__',
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
```

## Events

Bottender supports several types of events. You are able to access them via `context.event`.
For more information, check [Messenger Event Reference](./APIReference-MessengerEvent.md) and [General Event Reference](./APIReference-GeneralEvent.md)

### Messenger event properties

- isTextMessage
- isImageMessage
- isQuickReply
- isPostback
- isEcho
- quickReply
- postback
- payload
- ...

more on [Messenger Event Reference](./APIReference-MessengerEvent.md).

For example:

```js
bot.onEvent(async context => {
  if (context.event.isQuickReply) {
    await context.sendText('I know this is a quick reply.');
  } else if (context.event.payload === 'A_DEVELOPER_DEFINED_PAYLOAD') {
    await context.sendText('Got you!');
  } else {
    await context.sentText('I do not understand.');
  }
});
```

## Send APIs

After recevie the request from Messenger, you can send API by using context send API.

### Messenger-specific context send API

- sendText
- sendImage
- sendGenericTemplate
- sendQuickReplies
- ...

more on [Messenger Context Reference](./APIReference-MessengerContext.md).

For example:

```js
bot.onEvent(async context => {
  await context.sendText('Hello World!');
  await context.sendImage('http://example.com/pic.png');
  await context.sendQuickReplies({ text: 'Pick a color:' }, [
    {
      content_type: 'text',
      title: 'Red',
      payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED',
    },
  ]);
  await context.sendGenericTemplate([
    {
      title: "Welcome to Peter's Hats",
      image_url: 'https://petersfancybrownhats.com/company_image.png',
      subtitle: "We've got the right hat for everyone.",
      default_action: {
        type: 'web_url',
        url: 'https://peterssendreceiveapp.ngrok.io/view?item=103',
        messenger_extensions: true,
        webview_height_ratio: 'tall',
        fallback_url: 'https://peterssendreceiveapp.ngrok.io/',
      },
      buttons: [
        {
          type: 'postback',
          title: 'Start Chatting',
          payload: 'DEVELOPER_DEFINED_PAYLOAD',
        },
      ],
    },
  ])
});
```

## References

- [Messaging-api-messenger](https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger): Our open source Messenger API client project.
- [Messenger Platform](https://developers.facebook.com/docs/messenger-platform): The Messenger Platform docs.
