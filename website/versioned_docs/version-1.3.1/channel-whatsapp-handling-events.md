---
id: version-1.3.1-channel-whatsapp-handling-events
title: Handling WhatsApp Events
original_id: channel-whatsapp-handling-events
---

## Text Events

The most common events are text message events. To determine whether the event is a text message event, you may use the `context.event.isText` boolean value:

```js
async function App(context) {
  if (context.event.isText) {
    // handling the text message event
  }
}
```

You can get the text content using `context.event.text` to use it in the reply:

```js
async function App(context) {
  if (context.event.isText) {
    await context.sendText(`received the text message: ${context.event.text}`);
  }
}
```

## Media Events

Sometimes, your bot might receive the photos sent from the user. In this case, you can use `context.event.media` to get the content type and the URL of the media.

```js
async function App(context) {
  if (context.event.isMedia) {
    await context.sendText(
      `received the media message: ${context.event.media.contentType} ${context.event.media.url}`
    );
  }
}
```

## Handling Events with Router

Bottender offers a bunch of helpers to route within your WhatsApp or multi-platform app. To learn more about how to use those WhatsApp particular routes with router, check out [WhatsApp Routing](channel-whatsapp-routing.md).
