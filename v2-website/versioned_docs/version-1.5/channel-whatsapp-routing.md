---
id: channel-whatsapp-routing
title: WhatsApp Routing
original_id: channel-whatsapp-routing
---

Bottender offers a bunch of helpers to route within your WhatsApp or multi-platform app. For example, you may use WhatsApp particular routes within your [`router`](the-basics-routing.md):

```js
const { router, whatsapp } = require('bottender/router');

function App() {
  return router([
    whatsapp.message(HandleMessage),
    whatsapp.media(HandleMedia),
    whatsapp.received(HandleReceived),
    whatsapp.sent(HandleSent),
    whatsapp.delivered(HandleDelivered),
    whatsapp.read(HandleRead),
    whatsapp.any(HandleWhatsapp),
  ]);
}

/* Note: You need to implement those functions */
async function HandleMessage(context) {}
async function HandleMedia(context) {}
async function HandleReceived(context) {}
async function HandleSent(context) {}
async function HandleDelivered(context) {}
async function HandleRead(context) {}
async function HandleWhatsapp(context) {}
```

All available routes in `whatsapp` that recognize different kind of events:

- `whatsapp.any` - triggers the action when receiving any WhatsApp events.
- `whatsapp.message` - triggers the action when receiving WhatsApp `received` events. Alias: `whatsapp.received`.
- `whatsapp.media` - triggers the action when receiving WhatsApp `received` events includes media.
- `whatsapp.received` - triggers the action when receiving WhatsApp `received` events.
- `whatsapp.sent` - triggers the action when receiving WhatsApp `sent` events.
- `whatsapp.delivered` - triggers the action when receiving WhatsApp `delivered` events.
- `whatsapp.read` - triggers the action when receiving WhatsApp `read` events.
