---
id: channel-telegram-routing
title: Telegram Routings
---

Bottender offers a bunch of helpers to route within your Telegram or multi-platform app. For example, you may use Telegram particular routes within your `router`:

```js
const { router, telegram } = require('bottender/router');

function App() {
  return router([
    telegram.message(HandleMessage),
    telegram.editedMessage(HandleEditedMessage),
    telegram.channelPost(HandleChannelPost),
    telegram.editedChannelPost(HandleEditedChannelPost),
    telegram.inlineQuery(HandleInlineQuery),
    telegram.chosenInlineResult(HandleChosenInlineResult),
    telegram.callbackQuery(HandleCallbackQuery),
    telegram.shippingQuery(HandleShippingQuery),
    telegram.preCheckoutQuery(HandlePreCheckoutQuery),
    telegram.poll(HandlePoll),
    telegram.any(HandleTelegram),
  ]);
}

/* Note: You need to implement those functions */
async function HandleMessage(context) {}
async function HandleEditedMessage(context) {}
async function HandleChannelPost(context) {}
async function HandleEditedChannelPost(context) {}
async function HandleInlineQuery(context) {}
async function HandleChosenInlineResult(context) {}
async function HandleCallbackQuery(context) {}
async function HandleShippingQuery(context) {}
async function HandlePreCheckoutQuery(context) {}
async function HandlePoll(context) {}
async function HandleTelegram(context) {}
```

All available routes in `telegram` that recognize different kind of events:

- `telegram.any` - triggers the action when receiving any Telegram events.
- `telegram.message` - triggers the action when receiving Telegram `message` events.
- `telegram.editedMessage` - triggers the action when receiving Telegram `editedMessage` events.
- `telegram.channelPost` - triggers the action when receiving Telegram `channelPost` events.
- `telegram.editedChannelPost` - triggers the action when receiving Telegram `editedChannelPost` events.
- `telegram.inlineQuery` - triggers the action when receiving Telegram `inlineQuery` events.
- `telegram.chosenInlineResult` - triggers the action when receiving Telegram `chosenInlineResult` events.
- `telegram.callbackQuery` - triggers the action when receiving Telegram `callbackQuery` events.
- `telegram.shippingQuery` - triggers the action when receiving Telegram `shippingQuery` events.
- `telegram.preCheckoutQuery` - triggers the action when receiving Telegram `preCheckoutQuery` events.
- `telegram.poll` - triggers the action when receiving Telegram `poll` events.
