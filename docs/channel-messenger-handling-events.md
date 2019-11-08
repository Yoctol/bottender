---
id: channel-messenger-handling-events
title: Handling Messenger Events
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

> **Note:** You must enable events - `messages`.

## Handling Payload Events

Payload events can be triggered by postback buttons on template messages and persistent menu, or message quick replies. To determine whether the event is a payload event, you may use `context.event.isPayload` boolean value to do that:

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

> **Note:** You must enable events - `messaging_postbacks`.

## Other Events

media..

```js
async function HandleImage(context) {
  await context.sendText(`received the image: ${context.event.image.url}`);
}

async function HandleAudio(context) {
  await context.sendText(`received the audio: ${context.event.audio.url}`);
}

async function HandleVideo(context) {
  await context.sendText(`received the video: ${context.event.video.url}`);
}

async function HandleFile(context) {
  await context.sendText(`received the file: ${context.event.file.url}`);
}

async function HandleLocation(context) {
  const { coordinates } = context.event.location;
  await context.sendText(
    `received the location: lat: ${coordinates.lat}, long: ${coordinates.long}`
  );
}

async function App(context) {
  if (context.event.isImage) {
    return HandleImage;
  }
  if (context.event.isAudio) {
    return HandleAudio;
  }
  if (context.event.isVideo) {
    return HandleVideo;
  }
  if (context.event.isFile) {
    return HandleFile;
  }
  if (context.event.isLocation) {
    return HandleLocation;
  }
}
```

delivery and read..

```js
async function HandleDelivery(context) {
  await context.sendText(`Watermark: ${context.event.delivery.watermark}`);
}

async function HandleRead(context) {
  await context.sendText(`Watermark: ${context.event.read.watermark}`);
}

async function App(context) {
  if (context.event.isDelivery) {
    return HandleDelivery;
  }
  if (context.event.isRead) {
    return HandleRead;
  }
}
```

> **Note:** You must enable events - `message_reads` and `message_deliveries`.

sticker..

```js
async function App(context) {
  if (context.event.isLikeSticker) {
    await context.sendText('Good to know you like us!');
  }
}
```
