---
id: version-1.3.1-channel-viber-routing
title: Viber Routing
original_id: channel-viber-routing
---

Bottender offers a bunch of helpers to route within your Viber or multi-platform app. For example, you may use Viber particular routes within your [`router`](the-basics-routing.md):

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

/* Note: You need to implement those functions */
async function HandleMessage(context) {}
async function HandleSubscribed(context) {}
async function HandleUnsubscribed(context) {}
async function HandleConversationStarted(context) {}
async function HandleDelivered(context) {}
async function HandleSeen(context) {}
async function HandleFailed(context) {}
async function HandleViber(context) {}
```

All available routes in `viber` that recognize different kind of events:

- `viber` - triggers the action when receiving any Viber events.
- `viber.message` - triggers the action when receiving Viber `message` events.
- `viber.subscribed` - triggers the action when receiving Viber `subscribed` events.
- `viber.unsubscribed` - triggers the action when receiving Viber `unsubscribed` events.
- `viber.conversationStarted` - triggers the action when receiving Viber `conversation_started` events.
- `viber.delivered` - triggers the action when receiving Viber `delivered` events.
- `viber.seen` - triggers the action when receiving Viber `seen` events.
- `viber.failed` - triggers the action when receiving Viber `failed` events.
