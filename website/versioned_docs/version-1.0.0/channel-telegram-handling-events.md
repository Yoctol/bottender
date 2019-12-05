---
id: version-1.0.0-channel-telegram-handling-events
title: Handling Telegram Events
original_id: channel-telegram-handling-events
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

## Handling Payload Events

Payload events can be triggered by keyboards. To determine whether the event is a payload event, you may use `context.event.isPayload` boolean value to do that:

```js
async function App(context) {
  if (context.event.isPayload) {
    // handling the payload event
  }
}
```

You can get the payload content using `context.event.payload` and use it in the reply:

```js
async function App(context) {
  if (context.event.isPayload) {
    await context.sendText(`received the payload: ${context.event.payload}`);
  }
}
```
