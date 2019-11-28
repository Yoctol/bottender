---
id: channel-messenger-sending-messages
title: Sending Messenger Messages
---

## Sending Text Messages

```js
async function SendHi(context) {
  await context.sendText('Hi!');
}
```

## Sending Rich Media Messages

### Image

```js
await context.sendImage('https://example.com/image.jpg');
```

### Video

```js
await context.sendVideo('https://example.com/video.mp4');
```

### Audio

```js
await context.sendAudio('https://example.com/audio.mp3');
```

### File

```js
await context.sendFile('https://example.com/receipt.pdf');
```

### Attaching Saved Assets

Attachment Upload API

https://developers.facebook.com/docs/messenger-platform/send-messages/saving-assets#attachment_upload_api

```js
await context.sendImage({ attachmentId: '<ATTACHMENT_ID>' });
await context.sendVideo({ attachmentId: '<ATTACHMENT_ID>' });
await context.sendAudio({ attachmentId: '<ATTACHMENT_ID>' });
await context.sendFile({ attachmentId: '<ATTACHMENT_ID>' });
```

### Attaching ReadStreams

```js
const fs = require('fs');

await context.sendImage(fs.createReadStream('image.jpg'));
await context.sendVideo(fs.createReadStream('video.mp4'));
await context.sendAudio(fs.createReadStream('audio.mp3'));
await context.sendFile(fs.createReadStream('receipt.pdf'));
```

### Attaching Buffers

```js
await context.sendVideo(imageBuffer, { filename: 'image.jpg' });
await context.sendVideo(videoBuffer, { filename: 'video.mp4' });
await context.sendVideo(audioBuffer, { filename: 'audio.mp3' });
await context.sendVideo(fileBuffer, { filename: 'receipt.pdf' });
```

## Sending Template Messages

### Generic Template

https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic

```js
await context.sendGenericTemplate([
  {
    title: "Welcome to Peter's Hats",
    imageUrl: 'https://petersfancybrownhats.com/company_image.png',
    subtitle: "We've got the right hat for everyone.",
    defaultAction: {
      type: 'web_url',
      url: 'https://peterssendreceiveapp.ngrok.io/view?item=103',
      messengerExtensions: true,
      webviewHeightRatio: 'tall',
      fallbackUrl: 'https://peterssendreceiveapp.ngrok.io/',
    },
    buttons: [
      {
        type: 'postback',
        title: 'Start Chatting',
        payload: 'DEVELOPER_DEFINED_PAYLOAD',
      },
    ],
  },
]);
```

### Button Template

https://developers.facebook.com/docs/messenger-platform/send-messages/template/button

```js
await context.sendButtonTemplate('What do you want to do next?', [
  {
    type: 'web_url',
    url: 'https://petersapparel.parseapp.com',
    title: 'Show Website',
  },
  {
    type: 'postback',
    title: 'Start Chatting',
    payload: 'USER_DEFINED_PAYLOAD',
  },
]);
```

### Receipt Template

https://developers.facebook.com/docs/messenger-platform/send-messages/template/receipt

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

### Media template

https://developers.facebook.com/docs/messenger-platform/send-messages/template/media

```js
await context.sendMediaTemplate([
  {
    mediaType: 'image',
    attachmentId: '1854626884821032',
    buttons: [
      {
        type: 'web_url',
        url: 'https://en.wikipedia.org/wiki/Rickrolling',
        title: 'View Website',
      },
    ],
  },
]);
```

## Sending with Quick Replies

- Text
- User Phone Number
- User Email

https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies

### Text Quick Replies

```js
await context.sendText('Hi!', {
  quickReplies: [
    {
      contentType: 'text',
      title: '<BUTTON_TEXT>',
      payload: '<DEVELOPER_DEFINED_PAYLOAD>',
    },
  ],
});
```

### User Phone Number Quick Replies

```js
await context.sendText('Hi!', {
  quickReplies: [
    {
      contentType: 'user_phone_number',
    },
  ],
});
```

### User Email Quick Replies

```js
await context.sendText('Hi!', {
  quickReplies: [
    {
      contentType: 'user_email',
    },
  ],
});
```

## Sending with Persona

```js
await context.sendText('Hi!', {
  personaId: '<PERSONA_ID>',
});
```

## Rate Limits

https://developers.facebook.com/docs/messenger-platform/send-messages#limits

The per day rate limit is equal to 200 \* the number of people the business can message via Messenger.

For pages with large audiences, we recommend a send rate of 250 requests per second.

You should architect your system to distribute any sudden high amounts of load over time and are able to control your throughput should you hit our rate limits.
