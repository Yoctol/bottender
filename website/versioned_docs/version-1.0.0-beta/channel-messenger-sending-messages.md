---
id: version-1.0.0-beta-channel-messenger-sending-messages
title: Sending Messenger Messages
original_id: channel-messenger-sending-messages
---

Messenger has become one of the most popular channels between businesses and customers. Most of the messenger bots are designed for 1:1 communication.

Although the document is about "sending messages," in most of the cases, Messenger bots send messages after it receives a user event.

> **Note:**
>
> - If you want to know better about when your bots can send message proactively, please refer to Messenger's guide link about [Messenger Platform Policy Overview](https://developers.facebook.com/docs/messenger-platform/policy/policy-overview#standard_messaging)
> - We have a separate document to introduce user event handling, please refer to [Handling Messenger Events](./channel-messenger-handling-events.md)

If you are not familiar with Messenger messages, we would like to recommend a short happy path.

To begin with, please try the basis of communication, [`Text Messages`](#sending-text-messages). Secondly, try [`Generic Template Messages`](#sending-template-messages) to help you display a collection of items (e.g., recommended restaurants, songs, or books). Finally, - [`Quick Replies`](#sending-with-quick-reply), which continuously guide your users for the next possible actions.

If you have experienced with Messenger messages, don't miss [`Rich Media Messages`](#sending-rich-media-messages) to show the personality of your bots. [`Rich Media Messages`](#sending-rich-media-messages) and [`Media Template Messages`](#media-template) are necessary if you are building a media-driven, storytelling bot. Take a look at [`Persona`](#sending-with-persona), if you offer bot auto-reply and human agent customer support at the same time. Finally, if you are making a chatbot for campaign purposes, please dive into [`Rate Limits`](#rate-limits) to ensure your bot is ready for high traffic.

## Sending Text Messages

![39993793_311437072745802_2909561891720265728_n](https://user-images.githubusercontent.com/662387/69112041-4e2d2e00-0aba-11ea-8e44-02aaaf804b5d.png)

`Text message` is the most frequent and common message types among all chat channels. It also offers a minimal format while carrying out dynamic data, e.g., stock price and weather info.

```js
async function SendHi(context) {
  await context.sendText('Hi!');
}
```

## Sending Rich Media Messages

![ezgif-1-ef5b05e9923c](https://user-images.githubusercontent.com/662387/69852152-7be65400-12be-11ea-87d3-25837d74c91c.gif)

Rich media consist of images, videos, audios, and files.

Rich media is useful when your priority is to catch the user's attention, e.g., limited promotion. Plus, it is also handy to create an immersive experience, e.g., telling a story.

In the following section, you can see four different approaches while sending `Rich Media Messages`.

If you want to benefit from Facebook's cache, i.e., much faster loader time, then you should jump to section [Attaching Saved Assets](#attaching-saved-assets).

### Approach 1: Send by URL

Sending by URL might be the easiest way in terms of implementation. We recommend you to use this approach only for prototyping; the loading speed is probably driving your clients or customers crazy.

```js
await context.sendImage('https://example.com/image.jpg');
await context.sendVideo('https://example.com/video.mp4');
await context.sendAudio('https://example.com/audio.mp3');
await context.sendFile('https://example.com/receipt.pdf');
```

### Approach 2: Attaching Saved Assets

If you want to benefit from Facebook's cache, i.e., a much pleasant loading speed, you should try this a bit complicated approach.

Firstly, you need to get a page-scoped `Attachment Id` by [Attachment Upload API](https://developers.facebook.com/docs/messenger-platform/send-messages/saving-assets#attachment_upload_api).

Once you have get your `Attachment Id`, you can send rich media messages with the following code.

```js
await context.sendImage({ attachmentId: '<ATTACHMENT_ID>' });
await context.sendVideo({ attachmentId: '<ATTACHMENT_ID>' });
await context.sendAudio({ attachmentId: '<ATTACHMENT_ID>' });
await context.sendFile({ attachmentId: '<ATTACHMENT_ID>' });
```

> **Note:** > `Attachment Id` is page-scoped.

> A commercial bot project usually involves a staging Page for development and a production Page for production. In this case, before bot release, you have to re-upload all the attachments and update all the `Attachment Id`.

### Approach 3: Attaching ReadStreams

In the following example, you can send rich media by creating a readable stream. The file path is relative to your bot location.

```js
const fs = require('fs');

await context.sendImage(fs.createReadStream('image.jpg'));
await context.sendVideo(fs.createReadStream('video.mp4'));
await context.sendAudio(fs.createReadStream('audio.mp3'));
await context.sendFile(fs.createReadStream('receipt.pdf'));
```

### Approach 4: Attaching Buffers

In the following example, you can send rich media by creating a buffer. The file path is relative to your bot location.

```js
await context.sendImage(imageBuffer, { filename: 'image.jpg' });
await context.sendVideo(videoBuffer, { filename: 'video.mp4' });
await context.sendAudio(audioBuffer, { filename: 'audio.mp3' });
await context.sendFile(fileBuffer, { filename: 'receipt.pdf' });
```

## Sending Template Messages

![66391040_700974230346439_7580226164833124352_n](https://user-images.githubusercontent.com/662387/69858895-f79bcd00-12cd-11ea-999d-2f6c97e83f51.png)

![66362686_447994139365537_8885089546354556928_n](https://user-images.githubusercontent.com/662387/69858886-f5397300-12cd-11ea-888a-c93ec4ca7288.png)

In short, `Template message` is an interactive gallery composed of image, video, title, subtitle, and buttons.

`Template message` is the key to offer rich media interaction. It usually used in the scenario of display multiple choices and next actions to the user, e.g., applying coupon, booking a room, making a reservation.

> **Note:**
>
> - If you are familiar with LINE and Messenger, you can find the difference Chat UI approach. While LINE creates an HTML-like, super flexible chat UI, [`Flex Messages`](./channel-line-flex.md), Messenger tends to focus on common chat UI patterns to offer a consistent user experience.

### Generic Template

![22880422_1740199342956641_1916832982102966272_n (1)](https://user-images.githubusercontent.com/662387/69859663-89f0a080-12cf-11ea-82d4-114745d4724d.png)

In a `Generic Template`, you can create up to 10 items in a row. Each item is composed of a title, subtitle, image, and up to 3 buttons.

> **Note:**
> Please refer to Messenger's official guide of [`Generic Template`](https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic) to find out the latest specification.

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

![23204276_131607050888932_1057585862134464512_n (1)](https://user-images.githubusercontent.com/662387/69862063-9dead100-12d4-11ea-88ea-f2aef56b59c8.png)

`Button Template` is similar to `Generic Template`; the only difference is the removal of the item image.

> **Note:**
> Please refer to Messenger's official guide of [`Button Template`](https://developers.facebook.com/docs/messenger-platform/send-messages/template/button) to find out the latest specification.

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

![23208289_889588377870772_7170760265053503488_n](https://user-images.githubusercontent.com/662387/69862400-4862f400-12d5-11ea-8786-2e7fa03e8408.png)

`Receipt Template` is a template designed for order confirmation.

> **Note:**
> Please refer to Messenger's official guide of [`Receipt Template`](https://developers.facebook.com/docs/messenger-platform/send-messages/template/receipt) to find out the latest specification.

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

### Media Template

![23666967_188506161716866_2869776016224550912_n](https://user-images.githubusercontent.com/662387/69862411-4c8f1180-12d5-11ea-84a7-1a07b10e15c4.png)
![23065701_1942345712696886_5686788878908784640_n](https://user-images.githubusercontent.com/662387/69862818-4483a180-12d6-11ea-8575-96f976551963.png)

You can find the simplicity and elegance of `Media Template`. Try it if you agree with "A picture is worth a thousand words." The difference between it and `Generic Template` is the removal of title and subtitle.

> **Note:**
> Please refer to Messenger's official guide of [`Media Template`](https://developers.facebook.com/docs/messenger-platform/send-messages/template/media) to find out the latest specification.

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

## Sending with Quick Reply

![64375249_668002483666648_541982039046356992_n (1)](https://user-images.githubusercontent.com/662387/69863622-42224700-12d8-11ea-9202-cd55011a62d0.png)

We would recommend you to treat `Quick Reply` as an alternative to user text input.

A `Quick Reply` consists of up to 13 `Quick Reply Buttons`. When the user taps a `Quick Reply Button`, the `Quick Reply` dismissed. Then, the title of the tapped button is posted to the conversation as a message. Meanwhile, a messages event sends to your webhook that contains the button title and an optional payload.

In the following sections, you can see three different types of `Quick Reply`.

> **Note:**
>
> - When we met `Quick Reply` first time, we were confused about the best practice of using `Quick Reply` or `Button`. Finally, we found out `Quick Reply` is the best solution to guide the user to keep interacting with the bot, while a `URL Button` brings user outside bot.
>   What's more, the `Quick Reply` disappears when one of `Quick Reply Buttons` is tapped, which keeps `Quick Reply` only live under the present context, while a `Button` can be triggered even it is in the chat history.
> - Please refer to Messenger's official guide of [`Quick Replies`](https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies) to find out the latest specification.

### Text Quick Reply

![27690048_220332918537125_7991605536967622656_n](https://user-images.githubusercontent.com/662387/69863608-3c2c6600-12d8-11ea-97c0-e82992175a24.png)

You can send up to 13 `Text Quick Reply Buttons` in a `Quick Reply`. Each `Text Quick Reply` can add one optional icon next to the button title.

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

### User Phone Number Quick Reply

![23417458_1117232598379764_7436715136921894912_n](https://user-images.githubusercontent.com/662387/69863631-48182800-12d8-11ea-8d6c-f8140829163d.png)

The `User Phone Number Quick Reply` can be treated as an agree button to collect the user's phone number.

Messenger automatically pre-fill the displayed quick reply with the phone number from the user's profile information. Since many CRM (Customer Relationship Management) use the phone number as a unique id, it is handy for future user mapping.

> **Note:**
> If the user's profile does not have a phone number, the quick reply doesn't show up. Also, the bot only receives the phone number until the user clicks the quick reply.

```js
await context.sendText('Hi!', {
  quickReplies: [
    {
      contentType: 'user_phone_number',
    },
  ],
});
```

### User Email Quick Reply

<img width="382" alt="27807597_203144990422079_3327502058327638016_n" src="https://user-images.githubusercontent.com/662387/69863616-3f275680-12d8-11ea-82b0-d4033f67f03c.png">

The `User Email Quick Reply` can be treated as an agree button to collect the user's Email.

Messenger automatically pre-fill the displayed quick reply with the Email from the user's profile information. Since many CRM (Customer Relationship Management) use the Email as a unique id, it is handy for future user mapping.

> **Note:**
> If the user's profile does not have a Email, the quick reply doesn't show up. Also, the bot only receives the Email until the user clicks the quick reply.

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

To give the customer a clear understanding of whether a human agent or a bot representing the Business Page, the `Persona` API allows a business to introduce a virtual persona into the thread. Please refer to our separate document about `Persona`.

```js
await context.sendText('Hi!', {
  personaId: '<PERSONA_ID>',
});
```

## Rate Limits

If you are making a bot with a sudden high traffic, e.g., a campaign bot for Black Friday, you should deal with `Rate Limits` before you receive [error code 613](https://developers.facebook.com/docs/messenger-platform/reference/send-api/error-codes).

Page Rate limits are in place to prevent malicious behavior and poor user experiences. For Pages with large audiences, Messenger recommends a send rate of 250 requests per second.

`Rate Limits` is various from the size of your Page audience.

```sh
Calls within 24 hours = 200 * Total Messenger Audience
```

To prevent from hit `Rate Limits`, Messenger also advises us to architect our system to distribute any sudden high amounts of load over time.

> **Note:**
> Refer to Messenger's official doc, [Rate Limiting](https://developers.facebook.com/docs/messenger-platform/send-messages#limits) for the latest Messenger policy.
