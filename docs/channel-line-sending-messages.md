---
id: channel-line-sending-messages
title: Sending LINE Messages
---

## Reply API and Push API

Due to cost concerns, you should clearly understand before sending any messages is the difference between Reply API and Push API:

![messaging-api-thumb0](https://user-images.githubusercontent.com/662387/70490029-4cdea680-1b38-11ea-9979-2f9a68cb02cd.png)

- **Reply API** is free. However, your bot can only reply to the user once after a user interacts with your LINE official account. For each bot reply, you can send up to 5 **message objects** (See LINE's official document, [Sending Reply Messages](https://developers.line.biz/en/reference/messaging-api/#send-reply-message)). If you attempt to reply with more than 5 message objects, you may see an error in your console.

- **Push API** allows developers to send messages directly to users anytime. However, it might cost some money depends on the pricing plan in your country.

By default, Bottender uses **Reply API** to send messages to users in conversations.

> **Note:** Reply API only works within 30 seconds from a user interacts with your LINE official account.

## Batching Messages

By default, Bottender runs in Batch Mode. Messages to reply are put into the queue and sent to LINE in a single request.

To send "hello" and "world" with two messages, you can use one of the following usage:

1. Call `context.sendText()` two times:

```js
await context.sendText('hello');
await context.sendText('world');
```

2. Call `send()` with two message objects:

```js
await context.send([
  {
    type: 'text',
    text: 'hello',
  },
  {
    type: 'text',
    text: 'world',
  },
]);
```

The above two examples are equivalent. However, we recommend using the first usage because of better compatibility with other platforms.

## Sending Text Messages

**Text message** is the most frequent and common message types among all chat channels. It also offers a minimal format while carrying out dynamic data, e.g., stock price and weather info.

 <p><img width="300" src="https://user-images.githubusercontent.com/662387/70680790-38cfac00-1cd4-11ea-88a3-12ed1c71effc.png"></p>

### Plain Text

The following example shows how to reply with plain text.

```js
async function SendHi(context) {
  await context.sendText('Hi!');
}
```

For more information, please refer to LINE's official doc, [Text Message](https://developers.line.biz/en/reference/messaging-api/#text-message).

### Text with LINE emoji

You can include LINE's original emoji (usually involves LINE Friends) in text messages using character code. You can find the list of LINE emoji in [emoji list](https://developers.line.me/media/messaging-api/emoji-list.pdf).

<p><img width="300" src="https://user-images.githubusercontent.com/662387/70680894-82b89200-1cd4-11ea-92e8-53e222bbd12d.png"></p>

```js
async function SendHi(context) {
  await context.sendText(`${String.fromCodePoint(0x100084)} Hi!`);
}
```

## Sending Rich Media Messages

**Rich Media Messages** of LINE consist of stickers, images, videos, audios, locations, and imagemaps. Rich Media Messages is useful when your priority is to catch the user's attention, e.g., limited promotion. Plus, it is also handy to create an immersive experience, e.g., telling a story.

### Sticker

By **Stickers**, LINE creates a versatile, communicative language. Stickers make your bot expressive and engaging. To send a sticker, you need to indicate the package ID and sticker ID of the sticker.

<p><img width="300" src="https://user-images.githubusercontent.com/662387/70680788-38cfac00-1cd4-11ea-81a7-880abdf1ff45.png"></p>

```js
await context.sendSticker({
  packageId: '1',
  stickerId: '1',
});
```

For more information, please refer to LINE's official doc, [Sticker Message](https://developers.line.biz/en/reference/messaging-api/#sticker-message).

> **Note:** You can only send LINE's original Stickers. You can find the sticker's package ID and sticker ID in the [sticker list](https://developers.line.biz/media/messaging-api/sticker_list.pdf).

### Image

To send an **Image**, you need to prepare URLs of the original image and a smaller preview image. Users can see the preview image in the chat. When the user clicked the preview image, s/he can see the original image.

<p><img width="300" src="https://user-images.githubusercontent.com/662387/70680782-379e7f00-1cd4-11ea-8f41-bd18c194a55b.png"></p>

If you want to set up a call to action on the image, you may refer to [Imagemaps](#imagemap).

```js
await context.sendImage({
  originalContentUrl: 'https://example.com/image.jpg',
  previewImageUrl: 'https://example.com/preview.jpg',
});
```

For more information, please refer to LINE's official doc, [Image Message](https://developers.line.biz/en/reference/messaging-api/#image-message).

> **Note:** The URLs must use HTTPS over TLS 1.2 or later.

### Video

To send a **Video**, you need to prepare the URL of the video file and the URL of a preview image. The user can play the video by tapping on the preview image.

<p><img width="300" src="https://user-images.githubusercontent.com/662387/70680791-38cfac00-1cd4-11ea-8d1f-ea98199ae363.png"></p>

```js
await context.sendVideo({
  originalContentUrl: 'https://example.com/video.mp4',
  previewImageUrl: 'https://example.com/preview.jpg',
});
```

For more information, please refer to LINE's official doc, [Video Message](https://developers.line.biz/en/reference/messaging-api/#video-message).

> **Note:** The URLs must use HTTPS over TLS 1.2 or later.

### Audio

To send an `Audio` file, you need to prepare the URL of the file and the duration of the audio.

<p><img width="300" src="https://user-images.githubusercontent.com/662387/70680776-3705e880-1cd4-11ea-843b-782a95aaa30d.png"></p>

```js
await context.sendAudio({
  originalContentUrl: 'https://example.com/audio.mp3',
  duration: 240000,
});
```

For more information, please refer to LINE's official doc, [Audio Message](https://developers.line.biz/en/reference/messaging-api/#audio-message).

> **Note:** The URLs must use HTTPS over TLS 1.2 or later.

### Location

To send your location information to users, you have to prepare a title, address, and latitude and longitude.

<p><img width="300" src="https://user-images.githubusercontent.com/662387/70680786-38371580-1cd4-11ea-9755-e8f335183ebd.png"></p>

```js
await context.sendLocation({
  title: 'my location',
  address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
  latitude: 35.65910807942215,
  longitude: 139.70372892916203,
});
```

For more information, please refer to LINE's official doc, [Location Message](https://developers.line.biz/en/reference/messaging-api/#location-message).

### Imagemap

**Imagemap** offers very flexible and interactive usage. It is an image with multiple tappable areas. When a user taps one of these areas, the user can link to a webpage or send a message on their behalf.

<p><img width="300" src="https://user-images.githubusercontent.com/662387/70680785-38371580-1cd4-11ea-98ce-c41438379fe8.png"></p>

```js
const imagemap = {
  baseUrl: 'https://example.com/bot/images/rm001',
  baseSize: {
    height: 1040,
    width: 1040,
  },
  actions: [
    {
      type: 'uri',
      linkUri: 'https://example.com/',
      area: {
        x: 0,
        y: 0,
        width: 520,
        height: 1040,
      },
    },
    {
      type: 'message',
      text: 'hello',
      area: {
        x: 520,
        y: 0,
        width: 520,
        height: 1040,
      },
    },
  ],
};
const altText = 'this is an imagemap';
await context.sendImagemap(altText, imagemap);
```

For more information, please refer to LINE's official doc, [Imagemap Message](https://developers.line.biz/en/reference/messaging-api/#imagemap-message).

## Sending Template Messages

**Template message** is interactive gallery composed of image, video, title, subtitle, and buttons.

Template message is the key to offer rich media interaction. It is usually used in the scenario of display multiple choices and next actions to the user, e.g., applying coupons, booking a room, making a reservation.

> **Note:**
> Compared with Template Message, we highly depend on [Flex Message](./channel-line-flex.md) once it is available. There are two main reasons:
>
> - Flex Message supports both desktop and mobile devices, while Template Message only supports mobile devices.
> - Flex Message is an HTML-like chat UI, which creates a better, engaging user experience.

```js
const template = {
  type: 'buttons',
  thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
  title: 'Menu',
  text: 'Please select',
  actions: [
    {
      type: 'postback',
      label: 'Buy',
      data: 'action=buy&itemid=123',
    },
    {
      type: 'postback',
      label: 'Add to cart',
      data: 'action=add&itemid=123',
    },
    {
      type: 'uri',
      label: 'View detail',
      uri: 'http://example.com/page/123',
    },
  ],
};
const altText = 'this is a template';
await context.sendTemplate(altText, template);
```

### Confirm Template

A **Confirm Template** is designed for confirmation.

<p><img width="300" src="https://user-images.githubusercontent.com/662387/70680779-379e7f00-1cd4-11ea-9706-941b6a30e003.png"></p>

```js
const template = {
  text: 'Are you sure?',
  actions: [
    {
      type: 'message',
      label: 'Yes',
      text: 'yes',
    },
    {
      type: 'message',
      label: 'No',
      text: 'no',
    },
  ],
};
const altText = 'this is a confirm template';
await context.sendConfirmTemplate(altText, template);
```

For more information, please refer to LINE's official doc, [Confirm Template](https://developers.line.biz/en/reference/messaging-api/#confirm).

### Buttons Template

A `Buttons Template` includes an image, title, text, and multiple action buttons.

<p><img width="300" src="https://user-images.githubusercontent.com/662387/70680777-3705e880-1cd4-11ea-896d-c0f53257276c.png"></p>

```js
const template = {
  thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
  title: 'Menu',
  text: 'Please select',
  actions: [
    {
      type: 'postback',
      label: 'Buy',
      data: 'action=buy&itemid=123',
    },
    {
      type: 'postback',
      label: 'Add to cart',
      data: 'action=add&itemid=123',
    },
    {
      type: 'uri',
      label: 'View detail',
      uri: 'http://example.com/page/123',
    },
  ],
};
const altText = 'this is a button template';
await context.sendButtonTemplate(altText, template);
```

For more information, please refer to LINE's official doc, [Buttons Template](https://developers.line.biz/en/reference/messaging-api/#buttons).

> **Note:** Depending on the character width, the message text may not fully be displayed due to the height limitation of the text area.

### Carousel Template

**Carousel Template** is an upgraded version of Buttons Template. For each Buttons Template, you can have an image, title, text, and multiple action buttons.

You can have up to 10 Buttons Template in a row to compose a Carousel Template.

<p><img width="300" src="https://user-images.githubusercontent.com/662387/70680778-3705e880-1cd4-11ea-8bcd-7e38aa45f74e.png"></p>

```js
const template = [
  {
    thumbnailImageUrl: 'https://example.com/bot/images/item1.jpg',
    title: 'this is menu',
    text: 'description',
    actions: [
      {
        type: 'postback',
        label: 'Buy',
        data: 'action=buy&itemid=111',
      },
      {
        type: 'postback',
        label: 'Add to cart',
        data: 'action=add&itemid=111',
      },
      {
        type: 'uri',
        label: 'View detail',
        uri: 'http://example.com/page/111',
      },
    ],
  },
  {
    thumbnailImageUrl: 'https://example.com/bot/images/item2.jpg',
    title: 'this is menu',
    text: 'description',
    actions: [
      {
        type: 'postback',
        label: 'Buy',
        data: 'action=buy&itemid=222',
      },
      {
        type: 'postback',
        label: 'Add to cart',
        data: 'action=add&itemid=222',
      },
      {
        type: 'uri',
        label: 'View detail',
        uri: 'http://example.com/page/222',
      },
    ],
  },
];
const altText = 'this is a carousel template';
await context.sendCarouselTemplate(altText, template);
```

For more information, please refer to LINE's official doc, [Carousel Template](https://developers.line.biz/en/reference/messaging-api/#carousel).

> **Note:**
>
> - Depending on the character width, the message text may not fully be displayed due to the height limitation of the text area.
> - You have to keep the number of actions consistent for all columns.

### Image Carousel Template

**Image Carousel Template** has multiple images that can be cycled like a carousel. Users can scroll the images horizontally to browse possible choices. Without the bother of buttons, it helps your user focus on the product images.

<p><img width="300" src="https://user-images.githubusercontent.com/662387/70680783-38371580-1cd4-11ea-888e-336a24e67029.png"></p>

```js
const template = [
  {
    imageUrl: 'https://example.com/bot/images/item1.jpg',
    action: {
      type: 'postback',
      label: 'Buy',
      data: 'action=buy&itemid=111',
    },
  },
  {
    imageUrl: 'https://example.com/bot/images/item2.jpg',
    action: {
      type: 'message',
      label: 'Yes',
      text: 'yes',
    },
  },
  {
    imageUrl: 'https://example.com/bot/images/item3.jpg',
    action: {
      type: 'uri',
      label: 'View detail',
      uri: 'http://example.com/page/222',
    },
  },
];
const altText = 'this is a image carousel template';
await context.sendImageCarouselTemplate(altText, template);
```

For more information, please refer to LINE's official doc, [Image Carousel Template](https://developers.line.biz/en/reference/messaging-api/#image-carousel).

## Sending Flex Messages

<p><img width="800" src="https://user-images.githubusercontent.com/662387/70701503-6bdf6300-1d07-11ea-86d6-924d676a1f80.png"></p>

Since we love [Flex Message](./channel-line-flex.md) and inspired by its flexibility and interactive, we wrote a separate doc, [Flex Message](./channel-line-flex.md).

## Sending with Quick Replies

We would recommend you to treat Quick Reply as an alternative to user text input.

When a user receives a message that contains Quick Reply Buttons from a LINE official account, those buttons appear at the bottom of the chat screen. The user can tap one of the buttons as a reply.

A Quick Reply consists of up to 13 Quick Reply Buttons. When the user taps a Quick Reply Button, the Quick Reply dismissed. Then, the title of the tapped button posts to the conversation as a response. Meanwhile, the user triggers the action bound with the Quick Reply Button.

Quick Reply can be used in a 1 on 1 chat with a LINE official account, a group, and a room.

<p><img width="300" src="https://user-images.githubusercontent.com/662387/70680787-38cfac00-1cd4-11ea-92ea-e7a2379ce9c2.png"></p>

```js
const quickReply = {
  items: [
    {
      type: 'action',
      action: {
        type: 'cameraRoll',
        label: 'Send photo',
      },
    },
    {
      type: 'action',
      action: {
        type: 'camera',
        label: 'Open camera',
      },
    },
  ],
};
```

For more information, please refer to LINE's official doc, [Using Quick Reply](https://developers.line.biz/en/docs/messaging-api/using-quick-reply/).

### Sending Quick Reply

Since Quick Reply works as an alternative of user input, you have to send Quick Reply as an attachment of other messages, e.g., Text Message, Template Message, or Flex.

#### Sending Quick Reply with Message

```js
await context.send([
  {
    type: 'text',
    text: 'hello',
    quickReply,
  },
]);
```

#### Sending Quick Reply with Text Message

```js
await context.sendText('hello', { quickReply });
```

#### Sending Quick Reply with Template Message

```js
await context.sendTemplate(altText, template, { quickReply });
```

#### Sending Quick Reply with Buttons Template Message

```js
await context.sendButtonTemplate(altText, template, { quickReply });
```

#### Sending Quick Reply with Confirm Template Message

```js
await context.sendConfirmTemplate(altText, template, { quickReply });
```

#### Sending Quick Reply with Carousel Template Message

```js
await context.sendCarouselTemplate(altText, template, { quickReply });
```

#### Sending Quick Reply with Flex Message

```js
await context.sendFlex(altText, contents, { quickReply });
```

In the following sections, you can see various types of Quick Reply.

### Text Quick Reply

When this action is tapped, the string in the text property is sent as a message from the user.

```js
const quickReply = {
  items: [
    {
      type: 'action',
      action: {
        type: 'message',
        label: 'Yes',
        text: 'Yes',
      },
    },
  ],
};
```

For more information, please refer to LINE's official doc, [Message Actions](https://developers.line.biz/en/reference/messaging-api/#message-action).

### Postback Quick Replay

When the action is tapped, a postback event is returned via webhook with the specified string in the data property.

```js
const quickReply = {
  items: [
    {
      type: 'action',
      action: {
        type: 'postback',
        label: 'Buy',
        data: 'action=buy&itemid=111',
        text: 'Buy',
      },
    },
  ],
};
```

For more information, please refer to LINE's official doc, [Postback Actions](https://developers.line.biz/en/reference/messaging-api/#postback-action).

### URI Quick Reply

The URI opened when the action is performed. The available schemes for URI are `http`, `https`, `line`, and `tel`. For the LINE URL scheme, you can trigger the following actions:

- Opening the camera and camera roll
- Opening the location screen
- Sharing your LINE official account
- Opening your LINE official account's Timeline and account page
- Sending text messages
- Opening profile information
- Opening common LINE screens
- Opening LINE settings screens
- Opening the Sticker Shop
- Opening the Theme Shop
- Making phone calls with LINE Out
- Opening a LIFF app

```js
const quickReply = {
  items: [
    {
      type: 'action',
      action: {
        type: 'uri',
        label: 'View details',
        uri: 'http://example.com/page/222',
        altUri: {
          desktop: 'http://example.com/pc/page/222',
        },
      },
    },
  ],
};
```

For more information, please refer to LINE's official doc, [URI Actions](https://developers.line.biz/en/reference/messaging-api/#uri-action).

> **Note:**
>
> - The `altUri.desktop` property is supported only when you set URI actions in Flex Messages.
> - For more information about the LINE URL scheme, see Using the [LINE URL Scheme](https://developers.line.biz/en/docs/line-login/using-line-url-scheme/).

### Datetime Picker Quick Reply

When a control associated with this action is tapped, a postback event is returned via webhook with the date and time selected by the user from the date and time selection dialog. The `Datetime Picker` action does not support time zones.

There are three different modes:

- date: Pick a date
- time: Pick time
- datetime: Pick date and time

```js
const quickReply = {
  items: [
    {
      type: 'datetimepicker',
      label: 'Select date',
      data: 'storeId=12345',
      mode: 'datetime',
      initial: '2017-12-25t00:00',
      max: '2018-01-24t23:59',
      min: '2017-12-25t00:00',
    },
  ],
};
```

For more information, please refer to LINE's official doc, [Datatime Picker Actions](https://developers.line.biz/en/reference/messaging-api/#datetime-picker-action).

> **Note:** The datetime picker action is only supported on versions equal to or later than LINE 7.9.0 for iOS and LINE 7.12.0 for Android.

### Camera Quick Reply

This action can be configured only with quick reply buttons. When a button associated with this action is tapped, the camera screen in LINE is opened.

```js
const quickReply = {
  items: [
    {
      type: 'action',
      action: {
        type: 'camera',
        label: 'Camera',
      },
    },
  ],
};
```

For more information, please refer to LINE's official doc, [Camera Actions](https://developers.line.biz/en/reference/messaging-api/#camera-action).

### Camera Roll Quick Reply

This action can be configured only with quick reply buttons. When a button associated with this action is tapped, the camera roll screen in LINE is opened.

```js
const quickReply = {
  items: [
    {
      type: 'action',
      action: {
        type: 'cameraRoll',
        label: 'Camera roll',
      },
    },
  ],
};
```

For more information, please refer to LINE's official doc, [Camera Roll Actions](https://developers.line.biz/en/reference/messaging-api/#camera-roll-action).

### Location Quick Reply

This action can be configured only with quick reply buttons. When a button associated with this action is tapped, the location screen in LINE is opened.

```js
const quickReply = {
  items: [
    {
      type: 'action',
      action: {
        type: 'location',
        label: 'Location',
      },
    },
  ],
};
```

For more information, please refer to LINE's official doc, [Location Action](https://developers.line.biz/en/reference/messaging-api/#location-action).

## Sending Messages with Icon and Display Name

![](https://user-images.githubusercontent.com/3382565/79414458-44faab80-7fdd-11ea-9b72-d039df1addf3.png)

You can specify the icon and display name by providing the `sender` property in the message options:

```js
const sender = {
  name: 'Cony',
  iconUrl: 'https://line.me/conyprof',
};

await context.sendText('Hello, I am Cony!!', { sender });
await context.sendImage(
  {
    originalContentUrl: 'https://example.com/image.jpg',
    previewImageUrl: 'https://example.com/preview.jpg',
  },
  { sender }
);
```

If you prefer to send messages with LINE original [message objects](https://developers.line.biz/en/reference/messaging-api/#message-objects), you can provide the `sender` property in the message object:

```js
await context.send([
  {
    type: 'text',
    text: 'Hello, I am Cony!!',
    sender: {
      name: 'Cony',
      iconUrl: 'https://line.me/conyprof',
    },
  },
]);
```

For more info, refer to LINE's official doc, [Change icon and display name](https://developers.line.biz/zh-hant/docs/messaging-api/icon-nickname-switch/#summary).

## Rate Limits

Just like many chat channels, LINE has rate limits for each endpoint. If you continue to send requests exceeding the rate limit for an extended period, your bot might stop responding. It is because LINE blocks incoming requests to your bot.

You have to take care Rate Limits if you attempt to build a campaign bot with massive sudden traffic, e.g., super discount for Black Friday.

### Send API

For **Send API**, you have to follow the below Rate Limits:

- 100,000 requests per minute
- 1,700 requests per second

For more information, please refer to LINE's API doc, [Rate Limits](https://developers.line.biz/en/reference/messaging-api/#rate-limits)
