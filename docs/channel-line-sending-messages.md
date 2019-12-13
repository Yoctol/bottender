---
id: channel-line-sending-messages
title: Sending LINE Messages
---

LINE has become one of the most popular chat channels between businesses and customers in Asia, especially in Japan, Taiwan, and Thailand. LINE's 2019 strategy, "[Life on LINE](https://www.youtube.com/watch?v=vrkVmOlaLis)," depicts a user's daily life surrounded with LINE's service, e.g., LINE Login, LINE Pay, LINE Music, LINE Today, LINE Things, LINE Spot. The completeness of the LINE's ecosystem offers more dynamic, integrated, online to offline possibilities of LINE Bots.

LINE Bots can be invited into a group, or focus on 1:1 communication. LINE Bots for group chat benefit from organic growth. Once a bot joined a group, it gains more exposure.

#### Reply API & Push API

Due to cost concerns, one thing developers should clearly understand before sending any messages is the difference between `Reply API` and `Push API.`

![messaging-api-thumb0](https://user-images.githubusercontent.com/662387/70490029-4cdea680-1b38-11ea-9979-2f9a68cb02cd.png)

- `Push API` allows developers to send messages directly to users anytime. However, it is only free in development. In production, you may refer to [LINE Official Account Subscription Plans](https://www.linebiz.com/id-en/service/line-account-connect/) to check out the messaging fee of your official account.

- Using `Reply API` is free. But bots can only reply once to a user who interacted with your LINE official account. For each bot reply, you can send up to 5 `Message Objects` (See LINE's official document, "[Sending reply messages](https://developers.line.biz/en/docs/messaging-api/building-bot/#sending-reply-messages)"). If you attempt to reply more than 5 `Message Objects`, you will see an error in console.

> **Note:**
>
> - It's a bit tricky to count the number of `Message Objects.` For example, each function call of `Sending Message,` `Sending Text Message,` or `Sending Template Messages` is calculated as one `Message Object.`, while the final attached `Quick Reply` doesn't count as a `Message Object.`

## Sending Messages

Bottender aims to support every feature of each chat channel. In the code below, you can see the most primitive way to send any LINE messages by Bottender.

```js
await context.send([
  {
    type: 'text',
    text: 'hello',
  },
]);
```

Bottender also cares about "Developer Experience." In the following section, you can see a full set of syntactic sugar to make codes in Bottender much readable and expressive.

## Sending Text Messages

`Text message` is the most frequent and common message types among all chat channels. It also offers a minimal format while carrying out dynamic data, e.g., stock price and weather info.

 <p><img width="300" src="https://user-images.githubusercontent.com/662387/70680790-38cfac00-1cd4-11ea-88a3-12ed1c71effc.png"></p>

### Plain Text

The following example shows how to reply with plain text.

```js
async function SendHi(context) {
  await context.sendText('Hi!');
}
```

> **Note:**
> For more info, please refer to LINE's official doc, [`Text Message`](https://developers.line.biz/en/reference/messaging-api/#text-message)

### Text with LINE emoji

You can include LINE's original emoji (usually involves LINE Friends) in text messages using character code. You can find the list of LINE emoji in [emoji list](https://developers.line.me/media/messaging-api/emoji-list.pdf).

<p><img width="300" src="https://user-images.githubusercontent.com/662387/70680894-82b89200-1cd4-11ea-92e8-53e222bbd12d.png"></p>

```js
async function SendHi(context) {
  await context.sendText(`${String.fromCodePoint(0x100084)} Hi!`);
}
```

## Sending Multiple Messages

Bottender collects all sending messages in a single request. You can see two different approaches below.

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

or

```js
await context.sendText('hello');
await context.sendText('world');
```

## Sending Rich Media Messages

`Rich Media Messages` of LINE consist of stickers, images, videos, audios, locations, and imageMaps. `Rich Media Messages` is useful when your priority is to catch the user's attention, e.g., limited promotion. Plus, it is also handy to create an immersive experience, e.g., telling a story.

### Sticker

By `Stickers,` LINE creates a versatile, communicative language. `Stickers` make your bot expressive and engaging. To send a sticker, you need to indicate the package ID and sticker ID of the sticker.

<p><img width="300" src="https://user-images.githubusercontent.com/662387/70680788-38cfac00-1cd4-11ea-81a7-880abdf1ff45.png"></p>

```js
await context.sendSticker({
  packageId: '1',
  stickerId: '1',
});
```

> **Note:**
>
> - You can only send LINE's original `Stickers.` You can find the sticker's package ID and sticker ID in the [sticker list](https://developers.line.biz/media/messaging-api/sticker_list.pdf).
> - For more info, please refer to LINE's official doc, [`Sticker Message`](https://developers.line.biz/en/reference/messaging-api/#sticker-message)

### Image

To send an `Image,` you need to prepare URLs of the original image and a smaller preview image. Users can see the preview image in the chat. When the user clicked the preview image, s/he can see the original image.

<p><img width="300" src="https://user-images.githubusercontent.com/662387/70680782-379e7f00-1cd4-11ea-8f41-bd18c194a55b.png"></p>

If you want to set up a call to action on the image, you may refer to [ImageMaps](#imagemap).

```js
await context.sendImage({
  originalContentUrl: 'https://example.com/image.jpg',
  previewImageUrl: 'https://example.com/preview.jpg',
});
```

> **Note:**
>
> - The URLs must use HTTPS over TLS 1.2 or later.
> - For more info, please refer to LINE's official doc, [`Image Message`](https://developers.line.biz/en/reference/messaging-api/#image-message)

### Video

To send a `Video,` you need to prepare the URL of the video file and the URL of a preview image. The user can play the video by tapping on the preview image.

<p><img width="300" src="https://user-images.githubusercontent.com/662387/70680791-38cfac00-1cd4-11ea-8d1f-ea98199ae363.png"></p>

```js
await context.sendVideo({
  originalContentUrl: 'https://example.com/video.mp4',
  previewImageUrl: 'https://example.com/preview.jpg',
});
```

> **Note:**
>
> - The URLs must use HTTPS over TLS 1.2 or later.
> - For more info, please refer to LINE's official doc, [`Video Message`](https://developers.line.biz/en/reference/messaging-api/#video-message)

### Audio

To send an `Audio` file, you need to prepare the URL of the file and the duration of the audio.

<p><img width="300" src="https://user-images.githubusercontent.com/662387/70680776-3705e880-1cd4-11ea-843b-782a95aaa30d.png"></p>

```js
await context.sendAudio({
  originalContentUrl: 'https://example.com/audio.mp3',
  duration: 240000,
});
```

> **Note:**
>
> - The URLs must use HTTPS over TLS 1.2 or later.
> - For more info, please refer to LINE's official doc, [`Audio Message`](https://developers.line.biz/en/reference/messaging-api/#audio-message)

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

> **Note:**
>
> - The URLs must use HTTPS over TLS 1.2 or later.
> - For more info, please refer to LINE's official doc, [`Location Message`](https://developers.line.biz/en/reference/messaging-api/#location-message)

### Imagemap

`Imagemap` offers very flexible and interactive usage. It is an image with multiple tappable areas. When a user taps one of these areas, the user can link to a webpage or send a message on their behalf.

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

> **Note:**
> For more info, please refer to LINE's official doc, [`Imagemap Message`](https://developers.line.biz/en/reference/messaging-api/#imagemap-message)

## Sending Template Messages

`Template message` is an interactive gallery composed of image, video, title, subtitle, and buttons.

`Template message` is the key to offer rich media interaction. It usually used in the scenario of display multiple choices, and next actions to the user, e.g., applying coupons, booking a room, making a reservation.

> **Note:**
> Compared with `Template Message,` we highly depend on [`Flex Message`](./channel-line-flex.md) once it is available. There are two main reasons:
>
> - `Flex Message` supports both desktop and mobile devices, while `Template Message` only supports mobile devices.
> - `Flex Message` is an HTML-like chat UI, which creates a better, engaging user experience.

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

A `Confirm Template` is designed for confirmation.

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
const altText = 'this is a confirm template'
await context.sendConfirmTemplate(, template);
```

> **Note:**
> For more info, please refer to LINE's official doc, [`Confirm Template`](https://developers.line.biz/en/reference/messaging-api/#confirm)

### Buttons Template

A `Buttons Template` has an image, title, text, and multiple action buttons.

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

> **Note:**
>
> - Depending on the character width, the message text may not fully be displayed due to the height limitation of the text area.
> - For more info, please refer to LINE's official doc, [`Buttons Template`](https://developers.line.biz/en/reference/messaging-api/#buttons)

### Carousel Template

A `Carousel Template` is an upgraded version of `Buttons Template.` For each `Buttons Template,` you can have an image, title, text, and multiple action buttons.

You can have up to 10 `Buttons Template` in a row to compose a `Carousel Template.`

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

> **Note:**
>
> - Depending on the character width, the message text may not fully be displayed due to the height limitation of the text area.
> - You have to keep the number of actions consistent for all columns.
> - For more info, please refer to LINE's official doc, [`Carousel Template`](https://developers.line.biz/en/reference/messaging-api/#carousel)

### Image Carousel Template

`Image Carousel Template` has multiple images that can be cycled like a carousel. Users can scroll the images horizontally to browse possible choices. Without the bother of buttons, it helps your user focus on the product images.

<p><img width="300" src="https://user-images.githubusercontent.com/662387/70680783-38371580-1cd4-11ea-888e-336a24e67029.png"></p>

```js
await context.sendReceiptTemplate({
  recipientName: 'Stephane Crozatier',
  orderNumber: '12345678902',
  currency: 'USD',
  paymentMethod: 'Visa 2345',
  orderUrl: 'http://petersapparel.parseapp.com/order?order_id=123456',
  timestamp: '1428444852',
  elements: [
    {
      title: 'Classic White T-Shirt',
      subtitle: '100% Soft and Luxurious Cotton',
      quantity: 2,
      price: 50,
      currency: 'USD',
      imageUrl: 'http://petersapparel.parseapp.com/img/whiteshirt.png',
    },
    {
      title: 'Classic Gray T-Shirt',
      subtitle: '100% Soft and Luxurious Cotton',
      quantity: 1,
      price: 25,
      currency: 'USD',
      imageUrl: 'http://petersapparel.parseapp.com/img/grayshirt.png',
    },
  ],
  address: {
    street1: '1 Hacker Way',
    street2: '',
    city: 'Menlo Park',
    postalCode: '94025',
    state: 'CA',
    country: 'US',
  },
  summary: {
    subtotal: 75.0,
    shippingCost: 4.95,
    totalTax: 6.19,
    totalCost: 56.14,
  },
  adjustments: [
    {
      name: 'New Customer Discount',
      amount: 20,
    },
    {
      name: '$10 Off Coupon',
      amount: 10,
    },
  ],
});
```

> **Note:**
> For more info, please refer to LINE's official doc, [`Image Carousel Template`](https://developers.line.biz/en/reference/messaging-api/#image-carousel)

## Sending Flex Messages

<p><img width="800" src="https://user-images.githubusercontent.com/662387/70701503-6bdf6300-1d07-11ea-86d6-924d676a1f80.png"></p>

Since we love [`Flex Message`](./channel-line-flex.md) and inspired by its flexiblity and interactive, we wrote a seperate doc, [`Flex Message`](./channel-line-flex.md)

## Sending with Quick Replies

We would recommend you to treat `Quick Reply` as an alternative to user text input.

When a user receives a message that contains `Quick Reply Buttons` from a LINE official account, those buttons appear at the bottom of the chat screen. The user can tap one of the buttons as a reply.

A `Quick Reply` consists of up to 13 `Quick Reply Buttons.` When the user taps a `Quick Reply Button,` the `Quick Reply` dismissed. Then, the title of the tapped button posts to the conversation as a response. Meanwhile, the user triggers the action bound with the `Quick Reply Button.`

`Quick Reply` can be used in a 1:1 chat with a LINE official account, a group, and a room.

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

> **Note:**
> For more info, please refer to LINE's official doc, [`Using Quick Reply`](https://developers.line.biz/en/docs/messaging-api/using-quick-reply/)

### Sending Quick Reply

Since `Quick Reply` works as an alternative of user input, you have to send `Quick Reply` as an attachment of other messages, e.g., `Text Message,` `Template Message,` or `Flex.`

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

In the following sections, you can see various types of `Quick Reply.`

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

> **Note:**
> For more info, please refer to LINE's official doc, [`Message Actions`](https://developers.line.biz/en/reference/messaging-api/#message-action)

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

> **Note:**
> For more info, please refer to LINE's official doc, [`Postback Actions`](https://developers.line.biz/en/reference/messaging-api/#postback-action)

### URI Quick Reply

The URI opened when the action is performed. The available schemes for URI are `http`, `https,` `line,` and `tel.` For the LINE URL scheme, you can trigger the following actions:

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

> **Note:**
>
> - The altUri.desktop property is supported only when you set URI actions in Flex Messages.
> - For more information about the LINE URL scheme, see Using the [`LINE URL Scheme`](https://developers.line.biz/en/docs/line-login/using-line-url-scheme/).
> - For more info, please refer to LINE's official doc, [`URI Actions`](https://developers.line.biz/en/reference/messaging-api/#uri-action)

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

> **Note:**
>
> - The datetime picker action is only supported on versions equal to or later than LINE 7.9.0 for iOS and LINE 7.12.0 for Android.
> - For more info, please refer to LINE's official doc, [`Datatime Picker Actions`](https://developers.line.biz/en/reference/messaging-api/#datetime-picker-action)

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

> **Note:**
>
> - For more info, please refer to LINE's official doc, [`Camera Actions`](https://developers.line.biz/en/reference/messaging-api/#camera-action)

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

> **Note:**
>
> - For more info, please refer to LINE's official doc, [`Camera Roll Actions`](https://developers.line.biz/en/reference/messaging-api/#camera-roll-action)

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

> **Note:**
>
> - For more info, please refer to LINE's official doc, [`Location Action`](https://developers.line.biz/en/reference/messaging-api/#location-action)

## Thinking in Bottender: Send Messages, Reply Messages & Push Messages

Bottender aims to offer better abstract concepts for multiple chat channels support. Apart from LINE's unique `Reply API` and `Push API,` Bottender offers `Send API` as a configurable middleware.

For example, If you don't want to pay extra fee for bot response, in `bottender.config.js,` you can config your `Send API` sending messages by `Reply API.` However, if you want to send more than 5 `Message Objects` in one reply, you can also ask Bottender use `Push API` to send extra messages by `Send API.`

### Send Messages

Bottender offers the following `Send API:`

- send
- sendText
- sendSticker
- sendImage
- sendAudio
- sendVideo
- sendLocation
- sendImagemap
- sendFlex
- sendTemplate
- sendBottonTemplate
- sendConfirmTemplate
- sendCarouselTemplate
- sendImageCarouselTemplate

### Reply Messages

If you are confident that all you need is `Reply API,` you can use the following `Reply API.` Bottender helps you manage the reply token, so you don't have to manage it by yourself.

Bottender offers the following `Reply API:`

- reply
- replyText
- replySticker
- replyImage
- replyAudio
- replyVideo
- replyLocation
- replyImagemap
- replyFlex
- replyTemplate
- replyBottonTemplate
- replyConfirmTemplate
- replyCarouselTemplate
- replyImageCarouselTemplate

> **Note:**
> For sample code, please refer to Bottender's API doc, [Reply API](https://bottender.js.org/docs/api-line-context#reply-api)

### Push Messages

If messaging cost is not an issue to you, you may focus on `Push API.`

Bottender offers the following `Push API:`

- push
- pushText
- pushSticker
- pushImage
- pushAudio
- pushVideo
- pushLocation
- pushImagemap
- pushFlex
- pushTemplate
- pushBottonTemplate
- pushConfirmTemplate
- pushCarouselTemplate
- pushImageCarouselTemplate

> **Note:**
> For sample code, please refer to Bottender's API doc, [Push API](https://bottender.js.org/docs/api-line-context#push-api)

## Rate Limits

Just like many chat channels, LINE has rate limits for each endpoint. If you continue to send requests exceeding the rate limit for an extended period, your bot might stop responding. It is because LINE blocks incoming requests to your bot.

You have to take care `Rate Limits` if you attempt to build a campaign bot with massive sudden traffic, e.g., super discount for Black Friday.

### Send API

For `Send API,` you have to follow the below `Rate Limits`:
100,000 requests per minute
1,700 requests per second

> **Note:**
> For more info, please refer to LINE's API doc, [Rate Limits](https://developers.line.biz/en/reference/messaging-api/#rate-limits)
