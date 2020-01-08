---
id: version-1.1.0-channel-slack-handling-events
title: Handling Slack Events
original_id: channel-slack-handling-events
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

Bottender offers a bunch of helpers to routes within your Slack or multi-platform application. To learn more, please check out Bottender's doc, [Slack Routing](channel-slack-routing.md).
