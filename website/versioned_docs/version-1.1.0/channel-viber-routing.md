---
id: version-1.1.0-channel-viber-routing
title: Viber Routing
original_id: channel-viber-routing
---

Bottender offers a bunch of helpers to route within your Viber or multi-platform application. For example, you may use Viber particular routes within your [`router`](the-basics-routing.md):

```js
const { router, viber } = require('bottender/router');

function App() {
  return router([
    viber.message(HandleMessage),
    viber.subscribed(HandleSubscribed),
    viber.unsubscribed(HandleUnsubscribed),
    viber.conversationStarted(HandleConversationStarted),
    viber.delivered(HandleDelivered),
    viber.seen(HandleSeen),
    viber.failed(HandleFailed),
    viber(HandleViber),
  ]);
}

async function HandleMessage(context) {
  /* skip... */
}
async function HandleSubscribed(context) {
  /* skip... */
}
async function HandleUnsubscribed(context) {
  /* skip... */
}
async function HandleConversationStarted(context) {
  /* skip... */
}
async function HandleDelivered(context) {
  /* skip... */
}
async function HandleSeen(context) {
  /* skip... */
}
async function HandleFailed(context) {
  /* skip... */
}
async function HandleViber(context) {
  /* skip... */
}
```

All available routes in `viber` that recognize different kind of events:

- `viber` - matches when receiving any viber events.
- `viber.message` - matches when receiving viber `message` events.
- `viber.subscribed` - matches when receiving viber `subscribed` events.
- `viber.unsubscribed` - matches when receiving viber `unsubscribed` events.
- `viber.conversationStarted` - matches when receiving viber `conversation_started` events.
- `viber.delivered` - matches when receiving viber `delivered` events.
- `viber.seen` - matches when receiving viber `seen` events.
- `viber.failed` - matches when receiving viber `failed` events.
