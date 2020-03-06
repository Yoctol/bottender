---
id: version-1.3.0-channel-whatsapp-handling-events
title: Handling WhatsApp Events
original_id: channel-whatsapp-handling-events
---

## Handling Text Events

The most common event that your bot would ever receive is text message. To determine whether the event is a text message event, you may use `context.event.isText` boolean value to do that:

```js
async function App(context) {
  if (context.event.isText) {
    // handling the text message event
  }
}
```

You can get the text content using `context.event.text` and use it in the reply:

```js
async function App(context) {
  if (context.event.isText) {
    await context.sendText(`received the text message: ${context.event.text}`);
  }
}
```

## Handling Media Events

Sometimes, your bot might receive the photos sent from the user. In this case, you could use `context.event.media` to get the content type and the URL of the media.

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

Bottender offers a bunch of helpers to routes within your WhatsApp or multi-platform application. To learn more, please check out Bottender's doc, [WhatsApp Routing](channel-whatsapp-routing.md).
