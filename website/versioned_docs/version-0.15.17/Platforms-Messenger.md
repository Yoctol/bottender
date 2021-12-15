---
id: messenger
title: Messenger
original_id: messenger
---

This guide will give you some basic concepts of developing a Messenger bot. For more detail, see [official docs](https://developers.facebook.com/docs/messenger-platform).

## Requirements

To develop a Messenger bot, you need the following requirements:

- A Page Access Token
- An App Secret

In order to get Page Access Token and App secret, you need:

- [A Facebook Page](https://www.facebook.com/pages/create/)
- [A Facebook App](https://developers.facebook.com/)

After you get a Facebook Page and a Facebook App, you can get the `Page Access Token`. Check the [official docs](https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup).
Also, remember to copy the `App Secret` on app dashboard. Click `Show` button on the dashboard and type your password to get the App Secret.

Before leaving this section, make sure you have the following requirements:

- A Page Access Token
- An App Secret

We will use them to develop our messenger bot later.

## Build Your First Messenger Bot

The following is a partial sample code, see the full example [here](https://github.com/Yoctol/bottender/tree/v0.15.x/examples/messenger-hello-world).

```js
const { MessengerBot } = require('bottender');

const bot = new MessengerBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  appSecret: '__FILL_YOUR_SECRET_HERE__',
});
```

After you fill the `accessToken` and `appSecret`, run your server and try it out by talking to your Facebook Page! It works!

### Full Example

Here is the complete example for [messenger-hello-world](https://github.com/Yoctol/bottender/tree/v0.15.x/examples/messenger-hello-world).

```js
const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/express');

const bot = new MessengerBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  appSecret: '__FILL_YOUR_SECRET_HERE__',
});

bot.onEvent(async (context) => {
  await context.sendText('Hello World');
});

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
```

### Options

If you want to use your own verify token, you can pass options object into `createServer()` with `verifyToken` key.

For example:

```js
const server = createServer(bot, {
  verifyToken: '__FILL_YOUR_VERIFY_TOKEN_HERE__',
});
```

more on [Guides Server](server#options).

## Events

Bottender supports several types of events. You are able to access them via `context.event`.
For more information, check [Event Reference](api-event).

### Messenger Event Properties

- isText
- isImage
- isQuickReply
- isPostback
- isEcho
- quickReply
- postback
- payload
- ...

more on [MessengerEvent Reference](api-messengerevent).

For example:

```js
bot.onEvent(async (context) => {
  if (context.event.isQuickReply) {
    await context.sendText('I know this is a quick reply.');
  } else if (context.event.payload === 'A_DEVELOPER_DEFINED_PAYLOAD') {
    await context.sendText('Got you!');
  } else {
    await context.sendText('I do not understand.');
  }
});
```

## Send APIs

After receiving the request from Messenger, you can send API by using context send API.

### `messaging_type`

Messenger introduced a `messaging_type` field in Messenger Platform 2.2 and it will be required starting from May 7, 2018.

When using Bottender, we automatically set `messaging_type` to `RESPONSE` when using send APIs in context so you don't need to worry about it. You can still pass other `messaging_types` in the `options` argument.

### Messenger-Specific Context Send API

- sendText
- sendImage
- sendGenericTemplate
- ...

more on [MessengerContext Reference](api-messengercontext).

For example:

```js
bot.onEvent(async (context) => {
  await context.sendText('Hello World!');
  await context.sendImage('http://example.com/pic.png');
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
  ]);
});
```

## References

- [Messaging-api-messenger](https://github.com/bottenderjs/messaging-apis/tree/master/packages/messaging-api-messenger): Our open source Messenger API client project.
- [Messenger Platform](https://developers.facebook.com/docs/messenger-platform): The Messenger Platform docs.
