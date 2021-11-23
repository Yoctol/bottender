---
id: channel-whatsapp-sending-messages
title: Sending WhatsApp Messages
---

## Sending Text Messages

Use this method to send text messages.

```js
async function SendHi(context) {
  await context.sendText('Hi!');
}
```

To send with media URLs, you may use `mediaUrl` options:

```js
await context.sendText('Hi', {
  mediaUrl: ['https://example.com/image.jpg'],
});
```
