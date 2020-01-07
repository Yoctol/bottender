---
id: version-1.1.0-channel-viber-handling-events
title: Handling Viber Events
original_id: channel-viber-handling-events
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

## Handling Events with Router

Bottender offers a bunch of helpers to routes within your Viber or multi-platform application. To learn more, please check out Bottender's doc, [Viber Routing](channel-messenger-routing.md).
