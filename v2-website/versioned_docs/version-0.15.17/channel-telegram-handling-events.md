---
id: channel-telegram-handling-events
title: Handling Telegram Events
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

You can get the text content using `context.event.text` and use it in the reply:

```js
async function App(context) {
  if (context.event.isText) {
    await context.sendText(`received the text message: ${context.event.text}`);
  }
}
```

## Payload Events

Payload events can be triggered by keyboards. To determine whether the event is a payload event, you may use the `context.event.isPayload` boolean value:

```js
async function App(context) {
  if (context.event.isPayload) {
    // handling the payload event
  }
}
```

You can get the payload content using `context.event.payload` to use it in the reply:

```js
async function App(context) {
  if (context.event.isPayload) {
    await context.sendText(`received the payload: ${context.event.payload}`);
  }
}
```

## Handling Events with Router

Bottender offers a bunch of helpers to route within your Telegram or multi-platform app. To learn more about how to use those Telegram particular routes with router, check out [Telegram Routing](channel-telegram-routing.md).
