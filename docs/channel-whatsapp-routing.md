---
id: channel-whatsapp-routing
title: WhatsApp Routing
---

Bottender offers a bunch of helpers to route within your WhatsApp or multi-platform application. For example, you may use WhatsApp particular routes within your [`router`](the-basics-routing.md):

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
    whatsapp(HandleWhatsapp),
  ]);
}

async function HandleMessage(context) {
  /* skip... */
}
async function HandleMedia(context) {
  /* skip... */
}
async function HandleReceived(context) {
  /* skip... */
}
async function HandleSent(context) {
  /* skip... */
}
async function HandleDelivered(context) {
  /* skip... */
}
async function HandleRead(context) {
  /* skip... */
}
async function HandleWhatsapp(context) {
  /* skip... */
}
```

All available routes in `whatsapp` that recognize different kind of events:

- `whatsapp` - matches when receiving any whatsapp events.
- `whatsapp.message` - matches when receiving whatsapp `received` events. Alias: `whatsapp.received`.
- `whatsapp.media` - matches when receiving whatsapp `received` events includes media.
- `whatsapp.received` - matches when receiving whatsapp `received` events.
- `whatsapp.sent` - matches when receiving whatsapp `sent` events.
- `whatsapp.delivered` - matches when receiving whatsapp `delivered` events.
- `whatsapp.read` - matches when receiving whatsapp `read` events.
