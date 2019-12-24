---
id: version-1.0.5-channel-messenger-handling-events
title: Handling Messenger Events
original_id: channel-messenger-handling-events
---

For a Messenger bot, the two most frequent Messenger events are `Text Event` and `Payload Event.`

- `Text Event` is triggered when a user inputs text.
- `Payload Event` can be triggered by postback buttons on all kinds of templates, buttons, persistent menu, or quick replies.

Apart from the above events, Messenger also supports advanced events for better user experience. For example, [`Media Related Events`](#media-related-events) offer a bunch of events when users send a piece of rich media to a bot, for instance, image, video, audio, and file. [Delivery/Read Event](#deliveryread-events) is handy while calculating how many users received a broadcast message. A humor response of [Sticker Event](#sticker-events), makes your bot more human-like.

## Enable Messenger Events

Due to Facebook's policy, you have to subscribe to the event types you need.
Hence, in the development of each bot, remember to enable Messenger events from [Facebook Developer Console](https://developers.facebook.com/apps/). Or, you can enable Messenger events by editing `bottender.config.js`.

For example, if your bot responds to `Text Event` and `Payload Event`, you may enable the above Messenger events by writing your `bottender.config.js` as follows.

```js
module.exports = {
  channels: {
    messenger: {
      fields: ['messages', 'messaging_postbacks'],
    },
  },
};
```

And, make the config works by the following command:

```sh
bottender messenger webhook set
```

## Text Events

For a bot, the most common event is `Text Event`. To determine whether the event type is `Text Event`, you may check the boolean value of `context.event.isText`:

```js
async function App(context) {
  if (context.event.isText) {
    // handling the text message event
  }
}
```

You can get the text content from `context.event.text` and use it in the reply. A common usage of repeating user input is for confirmation, e.g., booking a hotel or a flight.

```js
async function App(context) {
  if (context.event.isText) {
    await context.sendText(`received the text message: ${context.event.text}`);
  }
}
```

> **Note:** You must enable events - `messages`.

## Payload Events

`Payload Event` is the second frequent event type, which is triggered by postback buttons on template messages, persistent menu, or quick replies. To determine whether the event type is a `Payload Event`, you may use `context.event.isPayload` boolean value:

```js
async function App(context) {
  if (context.event.isPayload) {
    // handling the payload event
  }
}
```

You can get the payload content from `context.event.payload` and use it in the reply:

```js
async function App(context) {
  if (context.event.isPayload) {
    await context.sendText(`received the payload: ${context.event.payload}`);
  }
}
```

> **Note:** You must enable events - `messaging_postbacks`.

## Other Events

### Media Related Events

In our current experience, image and location are comparatively accessible. For example, an `Image Event` could be a starting point for a image-based search engine to find relevant products. And `Location Event` is often used under the context that when your bot tries to recommendation your user nearby shops or branches.

In the following example, you can see a bunch of `Media Related Events` from image, audio, video, file, and location.

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

### Delivery/Read Events

`Delivery Event` and `Read Event` are necessary when you try to estimate how many users read your message — for example, the influence of a PR campaign.

In the following example, you can see an example of how to handle delivery and read events.

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

### Sticker Events

A proper response of `Sticker Event` would make your bot more human-like. For example, you can define a set of stickers that your bots understand as a shortcut (or secret code). It offers an alternative way for your user to interact with your bot.

In the following example, you can see an example of the famous `Like Sticker` (a growing big thumb up).

```js
async function App(context) {
  if (context.event.isLikeSticker) {
    await context.sendText('Good to know you like us!');
  }
}
```
