---
id: channel-telegram-routing
title: Telegram Routings
---

Bottender offers a bunch of helpers to route within your Telegram or multi-platform application. For example, you may use Telegram particular routes within your `router`:

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
    telegram(HandleTelegram),
  ]);
}

async function HandleMessage(context) {
  /* skip... */
}
async function HandleEditedMessage(context) {
  /* skip... */
}
async function HandleChannelPost(context) {
  /* skip... */
}
async function HandleEditedChannelPost(context) {
  /* skip... */
}
async function HandleInlineQuery(context) {
  /* skip... */
}
async function HandleChosenInlineResult(context) {
  /* skip... */
}
async function HandleCallbackQuery(context) {
  /* skip... */
}
async function HandleShippingQuery(context) {
  /* skip... */
}
async function HandlePreCheckoutQuery(context) {
  /* skip... */
}
async function HandlePoll(context) {
  /* skip... */
}
async function HandleTelegram(context) {
  /* skip... */
}
```

All available routes in `telegram` that recognize different kind of events:

- `telegram` - matches when receiving any telegram events.
- `telegram.message` - matches when receiving telegram `message` events.
- `telegram.editedMessage` - matches when receiving telegram `editedMessage` events.
- `telegram.channelPost` - matches when receiving telegram `channelPost` events.
- `telegram.editedChannelPost` - matches when receiving telegram `editedChannelPost` events.
- `telegram.inlineQuery` - matches when receiving telegram `inlineQuery` events.
- `telegram.chosenInlineResult` - matches when receiving telegram `chosenInlineResult` events.
- `telegram.callbackQuery` - matches when receiving telegram `callbackQuery` events.
- `telegram.shippingQuery` - matches when receiving telegram `shippingQuery` events.
- `telegram.preCheckoutQuery` - matches when receiving telegram `preCheckoutQuery` events.
- `telegram.poll` - matches when receiving telegram `poll` events.
