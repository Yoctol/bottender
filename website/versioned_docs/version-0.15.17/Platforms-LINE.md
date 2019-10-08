---
id: version-0.15.17-line
title: LINE
original_id: line
---

This guide will give you some basic concepts of LINE bots. For more information, check [official docs](https://developers.line.me/en/docs/messaging-api/building-bot/).

## Requirements

- LINE@ account
- LINE Messaging API channel
  - access token
  - channel secret

You need a [LINE@](http://at.line.me/) account and a **channel** connected to that account to develop a LINE bot. You need the channel's **access token** and **channel secret** when you start.

### LINE@

You need a [LINE@](http://at.line.me/) account for your bot to connect to. You can register a **standard account** or an **approved account** [here](https://entry-at.line.me/).

After that, you can manage your LINE@ accounts at [LINE@ MANAGER](https://admin-official.line.me/) and set them up to use **Messaging API** for bots to connect to.

### LINE Developers

After setting up LINE@ accounts to use Messaging API, further setup such as **webhook**, **access token** can be found at [LINE developers](https://developers.line.me). A **LINE Login** app or a **Messaging API** app is called a **channel** here.

## Build Your First LINE Bot

Check out your channel's **access token** and **channel secret** at [LINE developers](https://developers.line.me) then fill them in [line-hello-world](https://github.com/Yoctol/bottender/blob/master/examples/line-hello-world/index.js) example:

```js
const { LineBot } = require('bottender');

const bot = new LineBot({
  channelSecret: '__FILL_YOUR_SECRET_HERE__',
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
});
```

Then run your server and try it out by talking to your LINE@ account!

## Event Types

There are many different types of events your bot may receive from LINE. In Bottender, you can access them via `context.event`. For more information, check [LineEvent Reference](APIReference-LineEvent.md) and [official docs](https://developers.line.me/en/docs/messaging-api/reference/#webhook-event-objects).

- Message event
  - Text
  - Image
  - Video
  - Audio
  - File
  - Location
  - Sticker
- Follow event
- Unfollow event
- Join event
- Leave event
- Postback event
- Beacon event

For example:

```js
bot.onEvent(async context => {
  if (context.event.isFollow) {
    await context.sendText('Hello, welcome to this bot!');
  } else if (context.event.isText && context.event.text === 'How are you?') {
    await context.sendText('I am fine.');
  } else {
    await context.sendText('I do not understand.');
  }
});
```

## Message Types

There are many different types of messages you can send from your bot. In Bottender, you can use functions like `context.sendText()`, `context.sendButtonTemplate()` to send messages. For more information, check [LineContext Reference](APIReference-LineContext.md) and [official docs](https://developers.line.me/en/docs/messaging-api/message-types/).

- Text
- Sticker
- Image
- Video
- Audio
- Location
- Imagemap
- Flex
- Template
  - Buttons
  - Confirm
  - Carousel
  - Image carousel

## LINE Specific

### Group Chats

LINE has 2 types of group chats, **groups** and **rooms**. For more information, check [official docs](https://developers.line.me/en/docs/messaging-api/group-chats/).

You can invite your bot account into a group or a room. By doing so, the events will create **group/room sessions**. Send methods like `context.sendText()` will send to the group/room rather than to the private message to the sender in these contexts. You can still get the sender's profile with `context.session.user`.

If your LINE bot is connected to a **LINE@ Approved account** or an **official account**, you can access the group/room member IDs in `context.session.group` or `context.session.room`. If not, these properties will return an empty array `[]`.

### Beacons

With **LINE Beacon**, your bot can receive beacon webhook events whenever a LINE user enters or leaves the proximity of a beacon. Using beacons, you can customize your bot to interact with users in specific contexts. For more information, check [official docs](https://developers.line.me/en/docs/messaging-api/using-beacons/).

### Signature Verification

To ensure that the request is sent from the LINE Platform, you should provide your **channel secret** so that Bottender can do signature validation for you. For more information, check [official docs](https://developers.line.me/en/docs/messaging-api/reference/#signature-validation).

## References

- [official docs](https://developers.line.me/en/docs/messaging-api/overview/): official docs of LINE messaging API.
- [LINE@ MANAGER](https://admin-official.line.me/)
- [LINE developers](https://developers.line.me)
- [messaging-api-line](https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-line)
- [line-hello-world](https://github.com/Yoctol/bottender/blob/master/examples/line-hello-world/index.js) example.
