---
id: version-1.3.1-channel-slack-handling-events
title: Handling Slack Events
original_id: channel-slack-handling-events
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

## Handling Events with Router

Bottender offers a bunch of helpers to route within your Slack or multi-platform app. To learn more about how to use those Slack particular routes with router, check out [Slack Routing](channel-slack-routing.md).
