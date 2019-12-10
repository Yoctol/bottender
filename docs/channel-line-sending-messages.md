---
id: channel-line-sending-messages
title: Sending LINE Messages
---

LINE has become one of the most popular chat channels between businesses and customers in Asia, especially in Japan, Taiwan, and Thailand. LINE's 2019 strategy, "[Life on LINE](https://www.youtube.com/watch?v=vrkVmOlaLis)", depicts a user daily life surrounded with LINE's service, e.g., LINE Login, LINE Pay, LINE Music, LINE Today, LINE Things, LINE Spot. This offers a more dynamic, integrated, online to offline ecosystem of LINE Bot.

LINE Bots can be invited into a group, or focus on 1:1 communication. LINE Bots for group chat are benefit from the orgnaic growth - every time a bot invited into a group, make it gain more exposure. 


#### Reply API & Push API

Due to practical concerns, one thing developers should understand before sending any messages is the difference between `Reply API` and `Push API.`

![messaging-api-thumb0](https://user-images.githubusercontent.com/662387/70490029-4cdea680-1b38-11ea-9979-2f9a68cb02cd.png)

- `Push API` allows developers send messages directly to users anytime. Howeverm this is only free when you are using LINE developer account. In other cases, you may refer to [LINE Official Account Subscription Plans](https://www.linebiz.com/id-en/service/line-account-connect/) for the message fee.

- `Reply API` is free. But bots can only reply with a message to users who interacts with your LINE official account. 






## Sending Message

send any type of message

```js
await context.send([
  {
    type: 'text',
    text: 'hello',
  },
]);
```


## Sending Text Messages

### plain text



```js
async function SendHi(context) {
  await context.sendText('Hi!');
}
```

> **Note:**
> For more info, please refer to LINE's official doc, [`Text Message`](https://developers.line.biz/en/reference/messaging-api/#text-message)


### with line emoji



```js
async function SendHi(context) {
  await context.sendText(`${String.fromCodePoint(0x100084)} Hi!`);
}
```

> **Note:**
> For more developer ready emoji, please refer to LINE's official doc, [`Emoji List`](https://developers.line.biz/media/messaging-api/emoji-list.pdf)


## Sending Multiple Messages

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

bottender collects all messages you want to send and send in a single request.

## Sending Rich Media Messages

### Sticker

https://developers.line.biz/en/reference/messaging-api/#sticker-message

```js
await context.sendSticker({
  packageId: '1',
  stickerId: '1',
});
```

### Image

https://developers.line.biz/en/reference/messaging-api/#image-message

```js
await context.sendImage({
  originalContentUrl: 'https://example.com/image.jpg',
  previewImageUrl: 'https://example.com/preview.jpg',
});
```

### Video

https://developers.line.biz/en/reference/messaging-api/#video-message

```js
await context.sendVideo({
  originalContentUrl: 'https://example.com/video.mp4',
  previewImageUrl: 'https://example.com/preview.jpg',
});
```

### Audio

https://developers.line.biz/en/reference/messaging-api/#audio-message

```js
await context.sendAudio({
  originalContentUrl: 'https://example.com/audio.mp3',
  duration: 240000,
});
```

### Location

https://developers.line.biz/en/reference/messaging-api/#location-message

```js
await context.sendLocation({
  title: 'my location',
  address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
  latitude: 35.65910807942215,
  longitude: 139.70372892916203,
});
```

### Imagemap

https://developers.line.biz/en/reference/messaging-api/#imagemap-message

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

## Sending Template Messages

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

### Buttons Template

https://developers.line.biz/en/reference/messaging-api/#buttons

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

alias: sendBottonsTemplate

### Confirm Template

https://developers.line.biz/en/reference/messaging-api/#confirm

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

### Carousel Template

https://developers.line.biz/en/reference/messaging-api/#carousel

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

### Image Carousel Template

https://developers.line.biz/en/reference/messaging-api/#image-carousel

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

## Sending Flex Messages

https://developers.line.biz/en/reference/messaging-api/#flex-message

### bubble

https://developers.line.biz/en/reference/messaging-api/#bubble

```js
const contents = {
  type: 'bubble',
  header: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: 'Header text',
      },
    ],
  },
  hero: {
    type: 'image',
    url: 'https://example.com/flex/images/image.jpg',
  },
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: 'Body text',
      },
    ],
  },
  footer: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: 'Footer text',
      },
    ],
  },
  styles: {
    comment: 'See the example of a bubble style object',
  },
};

const altText = 'this is a flex';
await context.sendFlex(altText, contents);
```

### carousel

https://developers.line.biz/en/reference/messaging-api/#f-carousel

```js
const bubble = {
  type: 'bubble',
  header: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: 'Header text',
      },
    ],
  },
  hero: {
    type: 'image',
    url: 'https://example.com/flex/images/image.jpg',
  },
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: 'Body text',
      },
    ],
  },
  footer: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: 'Footer text',
      },
    ],
  },
  styles: {
    comment: 'See the example of a bubble style object',
  },
};

const contents = {
  type: 'carousel',
  contents: [bubble, bubble],
};

const altText = 'this is a flex';
await context.sendFlex(altText, contents);
```

## Sending with Quick Replies

https://developers.line.biz/en/reference/messaging-api/#message-common-properties

https://developers.line.biz/en/docs/messaging-api/using-quick-reply/

quickReply items limit : upto 13 items

quickReply object

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

### Text Quick Reply

https://developers.line.biz/en/reference/messaging-api/#message-action

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

### Postback Quick Replay

https://developers.line.biz/en/reference/messaging-api/#postback-action

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

### URI Quick Reply

https://developers.line.biz/en/reference/messaging-api/#uri-action

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

Note: The altUri.desktop property is supported only when you set URI actions in Flex Messages.

USE URI Scheme
https://developers.line.biz/en/docs/line-login/using-line-url-scheme/

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

### Datetime Picker Quick Reply

https://developers.line.biz/en/reference/messaging-api/#datetime-picker-action

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

Action mode

- date: Pick date
- time: Pick time
- datetime: Pick date and time

### Camera Quick Reply

https://developers.line.biz/en/reference/messaging-api/#camera-action

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

### Camera Roll Quick Reply

https://developers.line.biz/en/reference/messaging-api/#camera-roll-action

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

### Location Quick Reply

https://developers.line.biz/en/reference/messaging-api/#location-action

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

### how to send quick reply

send

```js
await context.send([
  {
    type: 'text',
    text: 'hello',
    quickReply,
  },
]);
```

sendText

```js
await context.sendText('hello', { quickReply });
```

send template

```js
await context.sendTemplate(altText, template, { quickReply });
```

send button template

```js
await context.sendButtonTemplate(altText, template, { quickReply });
```

send confirm template

```js
await context.sendConfirmTemplate(altText, template, { quickReply });
```

send carousel template

```js
await context.sendCarouselTemplate(altText, template, { quickReply });
```

sendFlex

```js
await context.sendFlex(altText, contents, { quickReply });
```

## Sending with Reply Token

### Send Messages

Bottender support automatically reply or push message

if reply token exists, use reply token to send message.

send

```js
await context.send([
  {
    type: 'text',
    text: 'hello',
    quickReply,
  },
]);
```

sendText

```js
await context.sendText('hello', { quickReply });
```

all method with send:

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

https://developers.line.biz/en/reference/messaging-api/#send-reply-message

Bottender support reply message

you don't need to handle the replytoken yourself.

reply

```js
await context.reply([
  {
    type: 'text',
    text: 'hello',
    quickReply,
  },
]);
```

replyText

```js
await context.replyText('hello', { quickReply });
```

all method with reply:

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

### Push Messages

https://developers.line.biz/en/reference/messaging-api/#send-push-message

Bottender support push message

```js
await context.push([
  {
    type: 'text',
    text: 'hello',
  },
]);
```

```js
await context.pushText('hello');
```

all method with push:

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

### Multicast Messages

https://developers.line.biz/en/reference/messaging-api/#send-multicast-message

### Broadcast Messages

https://developers.line.biz/en/reference/messaging-api/#send-broadcast-message

## Rate Limits

https://developers.line.biz/en/reference/messaging-api/#rate-limits

### send message

100,000 requests per minute
1,700 requests per second\*

### Send multicast message

100,000 requests per minute
1,700 requests per second\*
2,000,000 recipients per minute

### Send a broadcast message

60 requests per hour
