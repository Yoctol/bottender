---
id: version-1.4-api-messenger-client
title: MessengerClient
original_id: api-messenger-client
---

- [Usage](#usage)
- [Methods](#methods)
  - [Send API](#send-api)
    - [Content Types](#content-types)
    - [Templates](#templates)
    - [Quick Replies](#quick-replies)
    - [Sender Actions](#sender-actions)
    - [Attachment Upload API](#attachment-upload-api)
    - [Message Batching](#message-batching)
  - [User Profile API](#user-profile-api)
  - [Messenger Profile API](#messenger-profile-api)
    - [Persistent Menu](#persistent-menu)
    - [Get Started Button](#get-started-button)
    - [Greeting Text](#greeting-text)
    - [Whitelisted Domains](#domain-whitelist)
    - [Account Linking URL](#account-linking-url)
    - [Target Audience](#target-audience)
    - [Chat Extension Home URL](#chat-extension-home-url)
  - [Handover Protocol API](#handover-protocol-api)
  - [Page Messaging Insights API](#page-messaging-insights-api)
  - [Built-in NLP API](#built-in-nlp-api)
  - [Event Logging API](#event-logging-api)
  - [ID Matching API](#id-matching-api)
  - [Persona API](#persona-api)
  - [Others](#others)
- [Debug Tips](#debug-tips)
- [Test](#test)

## Usage

Get the `MessengerClient` instance using the `getClient` function:

```js
const { getClient } = require('bottender');

const client = getClient('messenger');

// `client` is a `MessengerClient` instance
await client.sendRawBody(body);
```

Or, get the `MessengerClient` instance from the `context`:

```js
async function MyAction(context) {
  if (context.platform === 'messenger') {
    // `context.client` is a `MessengerClient` instance
    await context.client.sendRawBody(body);
  }
}
```

### Error Handling

`MessengerClient` uses [axios](https://github.com/axios/axios) as HTTP client. We use [axios-error](https://github.com/Yoctol/messaging-apis/tree/master/packages/axios-error) package to wrap API error instances for better formatting error messages. Directly `console.log` on the error instance will return the formatted message. If you'd like to get the axios `request`, `response`, or `config`, you can still get them via those keys on the error instance.

```js
client.sendRawBody(body).catch(error => {
  console.log(error); // the formatted error message
  console.log(error.stack); // stack trace of the error
  console.log(error.config); // axios request config
  console.log(error.request); // axios HTTP request
  console.log(error.response); // axios HTTP response
});
```

<br />

## Methods

All methods return a Promise.

<br />

<a id="send-api" />

### Send API - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference)

#### `sendRawBody(body)`

Send request raw body using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

| Param | Type     | Description          |
| ----- | -------- | -------------------- |
| body  | `Object` | Raw body to be sent. |

Example:

```js
client.sendRawBody({
  recipient: {
    id: USER_ID,
  },
  message: {
    text: 'Hello!',
  },
});
```

<br />

#### `sendMessage(userId, message [, options])`

Send messages to specified user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

| Param   | Type                              | Description                                                                                                                                                                                                                       |
| ------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId  | <code>String &#124; Object</code> | Page-scoped user ID of the recipient or [recipient](https://developers.facebook.com/docs/messenger-platform/send-api-reference#recipient) object.                                                                                                                                         |
| message | `Object`                          | [message](https://developers.facebook.com/docs/messenger-platform/reference/send-api#message) object.                                                                                                                             |
| options | `Object`                          | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types) or [tags](https://developers.facebook.com/docs/messenger-platform/message-tags). |

Example:

```js
client.sendMessage(USER_ID, {
  text: 'Hello!',
});
```

You can specify [messaging type](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types) using options. If `messagingType` and `tag` is not provided, `UPDATE` will be used as default messaging type.

Example:

```js
client.sendMessage(
  USER_ID,
  {
    text: 'Hello!',
  },
  {
    messagingType: 'RESPONSE',
  }
);
```

Available messaging types:

- `UPDATE` as default
- `RESPONSE` using `{ messagingType: 'RESPONSE' }` options
- `MESSAGE_TAG` using `{ tag: 'ANY_TAG' }` options

<br />

<a id="content-types" />

### Content Types - [Content types](https://developers.facebook.com/docs/messenger-platform/send-api-reference/contenttypes)

#### `sendText(userId, text [, options])`

Send plain text messages to specified user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

| Param   | Type                              | Description                                                                                                                                                                                                                       |
| ------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId  | <code>String &#124; Object</code> | Page-scoped user ID of the recipient or [recipient](https://developers.facebook.com/docs/messenger-platform/send-api-reference#recipient) object.                                                                                                                                         |
| text    | `String`                          | Text of the message to be sent.                                                                                                                                                                                                   |
| options | `Object`                          | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types) or [tags](https://developers.facebook.com/docs/messenger-platform/message-tags). |

Example:

```js
client.sendText(USER_ID, 'Hello!', { tag: 'CONFIRMED_EVENT_UPDATE' });
```

<br />

#### `sendAttachment(userId, attachment [, options])`

Send attachment messages to specified user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

| Param            | Type                              | Description                                                                                                                                                                                                                       |
| ---------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId           | <code>String &#124; Object</code> | Page-scoped user ID of the recipient or [recipient](https://developers.facebook.com/docs/messenger-platform/send-api-reference#recipient) object.                                                                                                                                         |
| attachment       | `Object`                          | [attachment](https://developers.facebook.com/docs/messenger-platform/reference/send-api#attachment) object.                                                                                                                       |
| options          | `Object`                          | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types) or [tags](https://developers.facebook.com/docs/messenger-platform/message-tags). |
| options.filename | `String` | Required when upload from buffer. |

Example:

```js
client.sendAttachment(USER_ID, {
  type: 'image',
  payload: {
    url: 'https://example.com/pic.png',
  },
});
```

<br />

#### `sendAudio(userId, audio [, options])`

Send sounds to specified user by uploading them or sharing a URL using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

| Param            | Type                                                                         | Description                                                                                                                                       |
| ---------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId           | <code>String &#124; Object</code>                                            | Page-scoped user ID of the recipient or [recipient](https://developers.facebook.com/docs/messenger-platform/send-api-reference#recipient) object.                                                         |
| audio            | <code>String &#124; Buffer &#124; ReadStream &#124; AttachmentPayload</code> | The audio to be sent.                                                                                                                             |
| options          | `Object`                                                                     | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types). |
| options.filename | `String` | Required when upload from buffer.                                            |

Example:

- Send audio using a URL string:

```js
client.sendAudio(USER_ID, 'https://example.com/audio.mp3');
```

- Use `AttachmentPayload` to send cached attachment:

```js
client.sendAudio(USER_ID, { attachmentId: '55688' });
```

- Use `ReadStream` created from local file:

```js
const fs = require('fs');

client.sendAudio(USER_ID, fs.createReadStream('audio.mp3'));
```

- Use `Buffer` to send attachment:

```js
client.sendAudio(USER_ID, buffer, { filename: 'audio.mp3' });
```

<br />

#### `sendImage(userId, image [, options])`

Send images to specified user by uploading them or sharing a URL using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request). Supported formats are jpg, png and gif.

| Param            | Type                                                                         | Description                                                                                                                                       |
| ---------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId           | <code>String &#124; Object</code>                                            | Page-scoped user ID of the recipient or [recipient](https://developers.facebook.com/docs/messenger-platform/send-api-reference#recipient) object.                                                         |
| image            | <code>String &#124; Buffer &#124; ReadStream &#124; AttachmentPayload</code> | The image to be sent.                                                                                                                             |
| options          | `Object`                                                                     | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types). |
| options.filename | `String` | Required when upload from buffer.                                            |

Example:

- Send image using a URL string:

```js
client.sendImage(USER_ID, 'https://example.com/vr.jpg');
```

- Use `AttachmentPayload` to send cached attachment:

```js
client.sendImage(USER_ID, { attachmentId: '55688' });
```

- Use `ReadStream` created from local file:

```js
const fs = require('fs');

client.sendImage(USER_ID, fs.createReadStream('vr.jpg'));
```

- Use `Buffer` to send attachment:

```js
client.sendImage(USER_ID, buffer, { filename: 'vr.jpg' });
```

<br />

#### `sendVideo(userId, video [, options])`

Send videos to specified user by uploading them or sharing a URL using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

| Param            | Type                                                                         | Description                                                                                                                                       |
| ---------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId           | <code>String &#124; Object</code>                                            | Page-scoped user ID of the recipient or [recipient](https://developers.facebook.com/docs/messenger-platform/send-api-reference#recipient) object.                                                         |
| video            | <code>String &#124; Buffer &#124; ReadStream &#124; AttachmentPayload</code> | The video to be sent.                                                                                                                             |
| options          | `Object`                                                                     | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types). |
| options.filename | `String` | Required when upload from buffer.                                            |

Example:

- Send video using a URL string:

```js
client.sendVideo(USER_ID, 'https://example.com/video.mp4');
```

- Use `AttachmentPayload` to send cached attachment:

```js
client.sendVideo(USER_ID, { attachmentId: '55688' });
```

- Use `ReadStream` created from local file:

```js
const fs = require('fs');

client.sendVideo(USER_ID, fs.createReadStream('video.mp4'));
```

- Use `Buffer` to send attachment:

```js
client.sendVideo(USER_ID, buffer, { filename: 'video.mp4' });
```

<br />

#### `sendFile(userId, file [, options])`

Send files to specified user by uploading them or sharing a URL using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

| Param            | Type                                                                         | Description                                                                                                                                       |
| ---------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId           | <code>String &#124; Object</code>                                            | Page-scoped user ID of the recipient or [recipient](https://developers.facebook.com/docs/messenger-platform/send-api-reference#recipient) object.                                                         |
| file             | <code>String &#124; Buffer &#124; ReadStream &#124; AttachmentPayload</code> | The file to be sent.                                                                                                                              |
| options          | `Object`                                                                     | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types). |
| options.filename | `String` |Required when upload from buffer.                                            |

Example:

- Send file using a URL string:

```js
client.sendFile(USER_ID, 'https://example.com/receipt.pdf');
```

- Use `AttachmentPayload` to send cached attachment:

```js
client.sendFile(USER_ID, { attachmentId: '55688' });
```

- Use `ReadStream` created from local file:

```js
const fs = require('fs');

client.sendFile(USER_ID, fs.createReadStream('receipt.pdf'));
```

- Use `Buffer` to send attachment:

```js
client.sendFile(USER_ID, buffer, { filename: 'file.pdf' });
```

<br />

<a id="templates" />

### Templates - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference/templates)

#### `sendTemplate(userId, template [, options])`

Send structured message templates to specified user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

| Param    | Type                              | Description                                                                                                                                                                                                                       |
| -------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId   | <code>String &#124; Object</code> | Page-scoped user ID of the recipient or [recipient](https://developers.facebook.com/docs/messenger-platform/send-api-reference#recipient) object.                                                                                                                                         |
| template | `Object`                          | Object of the template.                                                                                                                                                                                                           |
| options  | `Object`                          | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types) or [tags](https://developers.facebook.com/docs/messenger-platform/message-tags). |

Example:

```js
client.sendTemplate(USER_ID, {
  templateType: 'button',
  text: 'title',
  buttons: [
    {
      type: 'postback',
      title: 'Start Chatting',
      payload: 'USER_DEFINED_PAYLOAD',
    },
  ],
});
```

<br />

#### `sendButtonTemplate(userId, title, buttons [, options])` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference/button-template)

Send button message templates to specified user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

<img src="https://user-images.githubusercontent.com/3382565/37410664-0b80b080-27dc-11e8-8854-4408d6f32fdf.png" alt="sendButtonTemplate" width="250" />

| Param   | Type                              | Description                                                                                                                                                         |
| ------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId  | <code>String &#124; Object</code> | Page-scoped user ID of the recipient or [recipient](https://developers.facebook.com/docs/messenger-platform/send-api-reference#recipient) object.                                                                           |
| title   | `String`                          | Text that appears above the buttons.                                                                                                                                |
| buttons | `Array<Object>`                   | Array of [button](https://developers.facebook.com/docs/messenger-platform/send-messages/template/button#button). Set of 1-3 buttons that appear as call-to-actions. |
| options | `Object`                          | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types).                   |

Example:

```js
client.sendButtonTemplate(USER_ID, 'What do you want to do next?', [
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

<br />

#### `sendGenericTemplate(userId, elements [, options])` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference/generic-template)

Send generic message templates to specified user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

<img src="https://user-images.githubusercontent.com/3382565/37410502-bf948426-27db-11e8-8c9d-7fd6158d0cc2.png" alt="sendGenericTemplate" width="750" />

| Param    | Type                              | Description                                                                                                                                                                                                                                       |
| -------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId   | <code>String &#124; Object</code> | Page-scoped user ID of the recipient or [recipient](https://developers.facebook.com/docs/messenger-platform/send-api-reference#recipient) object.                                                                                                                                                         |
| elements | `Array<Object>`                   | Array of [element](https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic#element). Data for each bubble in message.                                                                                              |
| options  | `Object`                          | Other optional parameters, such as `imageAspectRatio`, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types) and [tags](https://developers.facebook.com/docs/messenger-platform/message-tags). |

Example:

```js
client.sendGenericTemplate(
  USER_ID,
  [
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
  ],
  { imageAspectRatio: 'square' }
);
```

Adding a [tag](https://developers.facebook.com/docs/messenger-platform/message-tags) to a message allows you to send it outside the 24+1 window, for a limited number of use cases, per [Messenger Platform policy](https://developers.facebook.com/docs/messenger-platform/policy-overview).

Example:

```js
client.sendGenericTemplate(
  USER_ID,
  [
    {
      // ...
    },
  ],
  { tag: 'CONFIRMED_EVENT_UPDATE' }
);
```

Available tags:

- `CONFIRMED_EVENT_UPDATE`
- `POST_PURCHASE_UPDATE`
- `ACCOUNT_UPDATE`
- `HUMAN_AGENT` (Closed BETA)

<br />

#### `sendMediaTemplate(userId, elements [, options])` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-messages/template/media)

Send media message templates to specified user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

<img src="https://user-images.githubusercontent.com/3382565/37410836-64249ada-27dc-11e8-8dc4-5a155916961a.png" alt="sendMediaTemplate" width="250" />

| Param    | Type                              | Description                                                                                                                                       |
| -------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId   | <code>String &#124; Object</code> | Page-scoped user ID of the recipient or [recipient](https://developers.facebook.com/docs/messenger-platform/send-api-reference#recipient) object.                                                         |
| elements | `Array<Object>`                   | Array of [element](https://developers.facebook.com/docs/messenger-platform/reference/template/media#payload). Only one element is allowed.        |
| options  | `Object`                          | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types). |

Example:

```js
client.sendMediaTemplate(USER_ID, [
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

<br />

#### `sendReceiptTemplate(userId, receipt [, options])` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference/receipt-template)

Send receipt message templates to specified user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

<img src="https://user-images.githubusercontent.com/3382565/37410909-8b72001e-27dc-11e8-94ae-555cb4ae93c9.png" alt="sendReceiptTemplate" width="250" />

| Param   | Type                              | Description                                                                                                                                       |
| ------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId  | <code>String &#124; Object</code> | Page-scoped user ID of the recipient or [recipient](https://developers.facebook.com/docs/messenger-platform/send-api-reference#recipient) object.                                                         |
| receipt | `Object`                          | [payload](https://developers.facebook.com/docs/messenger-platform/send-messages/template/receipt#payload) of receipt template.                    |
| options | `Object`                          | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types). |

Example:

```js
client.sendReceiptTemplate(USER_ID, {
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

<br />

#### `sendAirlineBoardingPassTemplate(userId, attributes [, options])` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference/airline-boardingpass-template)

Send airline boarding pass message templates to specified user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

<img src="https://user-images.githubusercontent.com/3382565/37410966-a5fb1542-27dc-11e8-9d23-e3a090b0cdeb.png" alt="sendAirlineBoardingPassTemplate" width="600" />

| Param      | Type                              | Description                                                                                                                                        |
| ---------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId     | <code>String &#124; Object</code> | Page-scoped user ID of the recipient or [recipient](https://developers.facebook.com/docs/messenger-platform/send-api-reference#recipient) object.                                                          |
| attributes | `Object`                          | [payload](https://developers.facebook.com/docs/messenger-platform/send-messages/template/airline-boarding-pass#payload) of boarding pass template. |
| options    | `Object`                          | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types).  |

Example:

```js
client.sendAirlineBoardingPassTemplate(RECIPIENT_ID, {
  introMessage: 'You are checked in.',
  locale: 'en_US',
  boardingPass: [
    {
      passengerName: 'SMITH/NICOLAS',
      pnrNumber: 'CG4X7U',
      travelClass: 'business',
      seat: '74J',
      auxiliaryFields: [
        {
          label: 'Terminal',
          value: 'T1',
        },
        {
          label: 'Departure',
          value: '30OCT 19:05',
        },
      ],
      secondaryFields: [
        {
          label: 'Boarding',
          value: '18:30',
        },
        {
          label: 'Gate',
          value: 'D57',
        },
        {
          label: 'Seat',
          value: '74J',
        },
        {
          label: 'Sec.Nr.',
          value: '003',
        },
      ],
      logoImageUrl: 'https://www.example.com/en/logo.png',
      headerImageUrl: 'https://www.example.com/en/fb/header.png',
      qrCode: 'M1SMITH/NICOLAS  CG4X7U nawouehgawgnapwi3jfa0wfh',
      aboveBarCodeImageUrl: 'https://www.example.com/en/PLAT.png',
      flightInfo: {
        flightNumber: 'KL0642',
        departureAirport: {
          airportCode: 'JFK',
          city: 'New York',
          terminal: 'T1',
          gate: 'D57',
        },
        arrivalAirport: {
          airportCode: 'AMS',
          city: 'Amsterdam',
        },
        flightSchedule: {
          departureTime: '2016-01-02T19:05',
          arrivalTime: '2016-01-05T17:30',
        },
      },
    },
    {
      passengerName: 'JONES/FARBOUND',
      pnrNumber: 'CG4X7U',
      travelClass: 'business',
      seat: '74K',
      auxiliaryFields: [
        {
          label: 'Terminal',
          value: 'T1',
        },
        {
          label: 'Departure',
          value: '30OCT 19:05',
        },
      ],
      secondaryFields: [
        {
          label: 'Boarding',
          value: '18:30',
        },
        {
          label: 'Gate',
          value: 'D57',
        },
        {
          label: 'Seat',
          value: '74K',
        },
        {
          label: 'Sec.Nr.',
          value: '004',
        },
      ],
      logoImageUrl: 'https://www.example.com/en/logo.png',
      headerImageUrl: 'https://www.example.com/en/fb/header.png',
      qrCode: 'M1JONES/FARBOUND  CG4X7U nawouehgawgnapwi3jfa0wfh',
      aboveBarCodeImageUrl: 'https://www.example.com/en/PLAT.png',
      flightInfo: {
        flightNumber: 'KL0642',
        departureAirport: {
          airportCode: 'JFK',
          city: 'New York',
          terminal: 'T1',
          gate: 'D57',
        },
        arrivalAirport: {
          airportCode: 'AMS',
          city: 'Amsterdam',
        },
        flightSchedule: {
          departureTime: '2016-01-02T19:05',
          arrivalTime: '2016-01-05T17:30',
        },
      },
    },
  ],
});
```

<br />

#### `sendAirlineCheckinTemplate(userId, attributes [, options])` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference/airline-checkin-template)

Send airline checkin message templates to specified user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

<img src="https://user-images.githubusercontent.com/3382565/37411010-bfb3d8a2-27dc-11e8-91de-30653cf2d62c.png" alt="sendAirlineCheckinTemplate" width="250" />

| Param      | Type                              | Description                                                                                                                                       |
| ---------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId     | <code>String &#124; Object</code> | Page-scoped user ID of the recipient or [recipient](https://developers.facebook.com/docs/messenger-platform/send-api-reference#recipient) object.                                                         |
| attributes | `Object`                          | [payload](https://developers.facebook.com/docs/messenger-platform/send-api-reference/airline-checkin-template#payload) of checkin template.       |
| options    | `Object`                          | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types). |

Example:

```js
client.sendAirlineCheckinTemplate(USER_ID, {
  introMessage: 'Check-in is available now.',
  locale: 'en_US',
  pnrNumber: 'ABCDEF',
  flightInfo: [
    {
      flightNumber: 'f001',
      departureAirport: {
        airportCode: 'SFO',
        city: 'San Francisco',
        terminal: 'T4',
        gate: 'G8',
      },
      arrivalAirport: {
        airportCode: 'SEA',
        city: 'Seattle',
        terminal: 'T4',
        gate: 'G8',
      },
      flightSchedule: {
        boardingTime: '2016-01-05T15:05',
        departureTime: '2016-01-05T15:45',
        arrivalTime: '2016-01-05T17:30',
      },
    },
  ],
  checkinUrl: 'https://www.airline.com/check-in',
});
```

<br />

#### `sendAirlineItineraryTemplate(userId, attributes [, options])` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference/airline-itinerary-template)

Send airline itinerary message templates to specified user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

<img src="https://user-images.githubusercontent.com/3382565/37411025-ce27545e-27dc-11e8-91be-28ab27644db7.png" alt="sendAirlineItineraryTemplate" width="600" />

| Param      | Type                              | Description                                                                                                                                       |
| ---------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId     | <code>String &#124; Object</code> | Page-scoped user ID of the recipient or [recipient](https://developers.facebook.com/docs/messenger-platform/send-api-reference#recipient) object.                                                         |
| attributes | `Object`                          | [payload](https://developers.facebook.com/docs/messenger-platform/send-api-reference/airline-itinerary-template#payload) of itinerary template.   |
| options    | `Object`                          | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types). |

Example:

```js
client.sendAirlineItineraryTemplate(USER_ID, {
  introMessage: "Here's your flight itinerary.",
  locale: 'en_US',
  pnrNumber: 'ABCDEF',
  passengerInfo: [
    {
      name: 'Farbound Smith Jr',
      ticketNumber: '0741234567890',
      passengerId: 'p001',
    },
    {
      name: 'Nick Jones',
      ticketNumber: '0741234567891',
      passengerId: 'p002',
    },
  ],
  flightInfo: [
    {
      connectionId: 'c001',
      segmentId: 's001',
      flightNumber: 'KL9123',
      aircraftType: 'Boeing 737',
      departureAirport: {
        airportCode: 'SFO',
        city: 'San Francisco',
        terminal: 'T4',
        gate: 'G8',
      },
      arrivalAirport: {
        airportCode: 'SLC',
        city: 'Salt Lake City',
        terminal: 'T4',
        gate: 'G8',
      },
      flightSchedule: {
        departureTime: '2016-01-02T19:45',
        arrivalTime: '2016-01-02T21:20',
      },
      travelClass: 'business',
    },
    {
      connectionId: 'c002',
      segmentId: 's002',
      flightNumber: 'KL321',
      aircraftType: 'Boeing 747-200',
      travelClass: 'business',
      departureAirport: {
        airportCode: 'SLC',
        city: 'Salt Lake City',
        terminal: 'T1',
        gate: 'G33',
      },
      arrivalAirport: {
        airportCode: 'AMS',
        city: 'Amsterdam',
        terminal: 'T1',
        gate: 'G33',
      },
      flightSchedule: {
        departureTime: '2016-01-02T22:45',
        arrivalTime: '2016-01-03T17:20',
      },
    },
  ],
  passengerSegmentInfo: [
    {
      segmentId: 's001',
      passengerId: 'p001',
      seat: '12A',
      seatType: 'Business',
    },
    {
      segmentId: 's001',
      passengerId: 'p002',
      seat: '12B',
      seatType: 'Business',
    },
    {
      segmentId: 's002',
      passengerId: 'p001',
      seat: '73A',
      seatType: 'World Business',
      productInfo: [
        {
          title: 'Lounge',
          value: 'Complimentary lounge access',
        },
        {
          title: 'Baggage',
          value: '1 extra bag 50lbs',
        },
      ],
    },
    {
      segmentId: 's002',
      passengerId: 'p002',
      seat: '73B',
      seatType: 'World Business',
      productInfo: [
        {
          title: 'Lounge',
          value: 'Complimentary lounge access',
        },
        {
          title: 'Baggage',
          value: '1 extra bag 50lbs',
        },
      ],
    },
  ],
  priceInfo: [
    {
      title: 'Fuel surcharge',
      amount: '1597',
      currency: 'USD',
    },
  ],
  basePrice: '12206',
  tax: '200',
  totalPrice: '14003',
  currency: 'USD',
});
```

<br />

#### `sendAirlineUpdateTemplate(userId, attributes [, options])` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference/airline-update-template)

Send airline flight update message templates to specified user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

<img src="https://user-images.githubusercontent.com/3382565/37411064-e3005a56-27dc-11e8-8486-4fc548ad7b1a.png" alt="sendAirlineUpdateTemplate" width="250" />

| Param      | Type                              | Description                                                                                                                                       |
| ---------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId     | <code>String &#124; Object</code> | Page-scoped user ID of the recipient or [recipient](https://developers.facebook.com/docs/messenger-platform/send-api-reference#recipient) object.                                                         |
| attributes | `Object`                          | [payload](https://developers.facebook.com/docs/messenger-platform/send-api-reference/airline-update-template#payload) of update template.         |
| options    | `Object`                          | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types). |

Example:

```js
client.sendAirlineUpdateTemplate(USER_ID, {
  introMessage: 'Your flight is delayed',
  updateType: 'delay',
  locale: 'en_US',
  pnrNumber: 'CF23G2',
  updateFlightInfo: {
    flightNumber: 'KL123',
    departureAirport: {
      airportCode: 'SFO',
      city: 'San Francisco',
      terminal: 'T4',
      gate: 'G8',
    },
    arrivalAirport: {
      airportCode: 'AMS',
      city: 'Amsterdam',
      terminal: 'T4',
      gate: 'G8',
    },
    flightSchedule: {
      boardingTime: '2015-12-26T10:30',
      departureTime: '2015-12-26T11:30',
      arrivalTime: '2015-12-27T07:30',
    },
  },
});
```

<br />

<a id="quick-replies" />

### Quick Replies - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference/quick-replies)

<img src="https://user-images.githubusercontent.com/3382565/37411344-91c8ad54-27dd-11e8-82fc-fd9adf896301.png" alt="Quick Replies" width="750" />

To send messages with quick replies to specified user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request), pass `quickReplies` option to send message methods, for example, with `sendText`:

```js
client.sendText(USER_ID, 'Pick a color:', {
  quickReplies: [
    {
      contentType: 'text',
      title: 'Red',
      payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED',
    },
  ],
});
```

with `sendImage`:

```js
client.sendImage(USER_ID, 'https://example.com/vr.jpg', {
  quickReplies: [
    {
      contentType: 'text',
      title: 'Red',
      payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED',
    },
  ],
});
```

It works with all of send message methods.

<br />

<a id="sender-actions" />

### Sender Actions - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference/sender-actions)

<img src="https://user-images.githubusercontent.com/3382565/37411363-9b65ecaa-27dd-11e8-8f51-7aac7fd0bd2f.png" alt="Sender Actions" width="250" />

#### `sendSenderAction(userId, action)`

Send sender actions to specified user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request), to let users know you are processing their request.

| Param  | Type                              | Description                                                                               |
| ------ | --------------------------------- | ----------------------------------------------------------------------------------------- |
| userId | <code>String &#124; Object</code> | Page-scoped user ID of the recipient or [recipient](https://developers.facebook.com/docs/messenger-platform/send-api-reference#recipient) object. |
| action | `String`                          | Name of the action.                                                                       |

Example:

```js
client.sendSenderAction(USER_ID, 'typing_on');
```

<br />

#### `markSeen(userId)`

Mark last message as read for specified user.

| Param  | Type                              | Description                                                                               |
| ------ | --------------------------------- | ----------------------------------------------------------------------------------------- |
| userId | <code>String &#124; Object</code> | Page-scoped user ID of the recipient or [recipient](https://developers.facebook.com/docs/messenger-platform/send-api-reference#recipient) object. |

Example:

```js
client.markSeen(USER_ID);
```

<br />

#### `typingOn(userId)`

Turn typing indicators on for specified user.

| Param  | Type                              | Description                                                                               |
| ------ | --------------------------------- | ----------------------------------------------------------------------------------------- |
| userId | <code>String &#124; Object</code> | Page-scoped user ID of the recipient or [recipient](https://developers.facebook.com/docs/messenger-platform/send-api-reference#recipient) object. |

Example:

```js
client.typingOn(USER_ID);
```

<br />

#### `typingOff(userId)`

Turn typing indicators off for specified user.

| Param  | Type                              | Description                                                                               |
| ------ | --------------------------------- | ----------------------------------------------------------------------------------------- |
| userId | <code>String &#124; Object</code> | Page-scoped user ID of the recipient or [recipient](https://developers.facebook.com/docs/messenger-platform/send-api-reference#recipient) object. |

Example:

```js
client.typingOff(USER_ID);
```

<br />

<a id="attachment-upload-api" />

### Attachment Upload API - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference/attachment-upload)

> Note: Only attachments that were uploaded with the `isReusable` property set to `true` can be sent to other message recipients.

#### `uploadAttachment(type, attachment, options)`

Upload specified type attachment using URL address, buffer, or stream.

| Param              | Type                                                                                             | Description                                    |
| ------------------ | ------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| type               | `String`                                                                                         | Must be one of `image`, `video`, `audio` or `file`. |
| attachment         | <code>String &#124; Buffer &#124; ReadStream</code>                                              | Attachment to be uploaded.                     |
| options            | `Object`                                                                                         | Other optional parameters.                     |
| options.isReusable | Set to `true` to make the saved asset sendable to other message recipients. Defaults to `false`. |
| options.filename   | Required when upload from buffer.                                                                |

Example:

```js
client.uploadAttachment('image', 'http://www.example.com/image.jpg', {
  isReusable: true,
});
```

Or using read stream:

```js
const fs = require('fs');

client.uploadAttachment('image', fs.createReadStream('image.jpg'), {
  isReusable: true,
});
```

Or using buffer:

```js
client.uploadAttachment('image', buffer, {
  isReusable: true,
  filename: 'image.jpg',
});
```

<br />

#### `uploadAudio(audio, options)`

Upload audio attachment using URL address, buffer, or stream.

| Param   | Type                                                | Description                |
| ------- | --------------------------------------------------- | -------------------------- |
| audio   | <code>String &#124; Buffer &#124; ReadStream</code> | The audio to be uploaded.  |
| options | `Object`                                            | Other optional parameters. |

Example:

```js
client.uploadAudio('http://www.example.com/audio.mp3', { isReusable: true });
```

Or using read stream:

```js
const fs = require('fs');

client.uploadAudio(fs.createReadStream('audio.mp3'), { isReusable: true });
```

Or using buffer:

```js
client.uploadAudio(buffer, {
  isReusable: true,
  filename: 'audio.mp3',
});
```

<br />

#### `uploadImage(image, options)`

Upload image attachment using URL address, buffer, or stream.

| Param   | Type                                                | Description                |
| ------- | --------------------------------------------------- | -------------------------- |
| image   | <code>String &#124; Buffer &#124; ReadStream</code> | The image to be uploaded.  |
| options | `Object`                                            | Other optional parameters. |

Example:

```js
client.uploadImage('http://www.example.com/image.jpg', { isReusable: true });
```

Or using read stream:

```js
const fs = require('fs');

client.uploadImage(fs.createReadStream('image.jpg'), { isReusable: true });
```

Or using buffer:

```js
client.uploadImage(buffer, {
  isReusable: true,
  filename: 'image.jpg',
});
```

<br />

#### `uploadVideo(video, options)`

Upload video attachment using URL address, buffer, or stream.

| Param   | Type                                                | Description                |
| ------- | --------------------------------------------------- | -------------------------- |
| video   | <code>String &#124; Buffer &#124; ReadStream</code> | The video to be uploaded.  |
| options | `Object`                                            | Other optional parameters. |

Example:

```js
client.uploadVideo('http://www.example.com/video.mp4', { isReusable: true });
```

Or using read stream:

```js
const fs = require('fs');

client.uploadVideo(fs.createReadStream('video.mp4'), { isReusable: true });
```

Or using buffer:

```js
client.uploadVideo(buffer, {
  isReusable: true,
  filename: 'video.mp4',
});
```

<br />

#### `uploadFile(file, options)`

Upload file attachment using URL address, buffer, or stream.

| Param   | Type                                                | Description                |
| ------- | --------------------------------------------------- | -------------------------- |
| file    | <code>String &#124; Buffer &#124; ReadStream</code> | The file to be uploaded.   |
| options | `Object`                                            | Other optional parameters. |

Example:

```js
client.uploadFile('http://www.example.com/file.pdf', { isReusable: true });
```

Or using read stream:

```js
const fs = require('fs');

client.uploadFile(fs.createReadStream('file.pdf'), { isReusable: true });
```

Or using buffer:

```js
client.uploadFile(buffer, {
  isReusable: true,
  filename: 'file.pdf',
});
```

<br />

<a id="message-batching" />

### Message Batching - [Official Docs](https://developers.facebook.com/docs/graph-api/making-multiple-requests)

#### `sendBatch(requests)`

Sends multiple requests in one batch.

| Param    | Type            | Description               |
| -------- | --------------- | ------------------------- |
| requests | `Array<Object>` | Subrequests in the batch. |

Example

```js
const { MessengerBatch } = require('messaging-api-messenger');

client.sendBatch([
  MessengerBatch.sendText(USER_ID, '1'),
  MessengerBatch.sendText(USER_ID, '2'),
  MessengerBatch.sendText(USER_ID, '3'),
  MessengerBatch.sendText(USER_ID, '4'),
  MessengerBatch.sendText(USER_ID, '5'),
]);
```

There are a bunch of factory methods can be used to create batch messages:

- `MessengerBatch.sendRequest`
- `MessengerBatch.sendMessage`
- `MessengerBatch.sendText`
- `MessengerBatch.sendAttachment`
- `MessengerBatch.sendAudio`
- `MessengerBatch.sendImage`
- `MessengerBatch.sendVideo`
- `MessengerBatch.sendFile`
- `MessengerBatch.sendTemplate`
- `MessengerBatch.sendButtonTemplate`
- `MessengerBatch.sendGenericTemplate`
- `MessengerBatch.sendListTemplate`
- `MessengerBatch.sendOpenGraphTemplate`
- `MessengerBatch.sendReceiptTemplate`
- `MessengerBatch.sendMediaTemplate`
- `MessengerBatch.sendAirlineBoardingPassTemplate`
- `MessengerBatch.sendAirlineCheckinTemplate`
- `MessengerBatch.sendAirlineItineraryTemplate`
- `MessengerBatch.sendAirlineUpdateTemplate`
- `MessengerBatch.sendSenderAction`
- `MessengerBatch.typingOn`
- `MessengerBatch.typingOff`
- `MessengerBatch.markSeen`
- `MessengerBatch.getUserProfile`
- `MessengerBatch.passThreadControl`
- `MessengerBatch.passThreadControlToPageInbox`
- `MessengerBatch.takeThreadControl`
- `MessengerBatch.requestThreadControl`
- `MessengerBatch.associateLabel`
- `MessengerBatch.dissociateLabel`
- `MessengerBatch.getAssociatedLabels`

Those methods exactly have same argument signature with client methods.

<br />

<a id="custom-labels" />

### Custom Labels - [Official Docs](https://developers.facebook.com/docs/messenger-platform/identity/custom-labels)

#### `createLabel(name)`

Creating a Label.

| Param | Type     | Description               |
| ----- | -------- | ------------------------- |
| name  | `String` | name of the custom label. |

Example:

```js
client.createLabel('awesome').then(label => {
  console.log(label);
  // {
  //   id: 1712444532121303
  // }
});
```

<br />

#### `associateLabel(userId, labelId)`

Associating a Label to a PSID.

| Param   | Type     | Description                           |
| ------- | -------- | ------------------------------------- |
| userId  | `String` | Page-scoped user ID of the recipient. |
| labelId | `String` | ID of the custom label.               |

Example:

```js
client.associateLabel(USER_ID, LABEL_ID);
```

<br />

#### `dissociateLabel(userId, labelId)`

Removing a Label From a PSID.

| Param   | Type     | Description                           |
| ------- | -------- | ------------------------------------- |
| userId  | `String` | Page-scoped user ID of the recipient. |
| labelId | `String` | ID of the custom label.               |

Example:

```js
client.dissociateLabel(USER_ID, LABEL_ID);
```

<br />

#### `getAssociatedLabels(userId)`

Retrieving Labels Associated with a PSID.

| Param  | Type     | Description                           |
| ------ | -------- | ------------------------------------- |
| userId | `String` | Page-scoped user ID of the recipient. |

Example:

```js
client.getAssociatedLabels(USER_ID).then(result => {
  console.log(result);
  // {
  //   data: [
  //     {
  //       name: 'myLabel',
  //       id: '1001200005003',
  //     },
  //     {
  //       name: 'myOtherLabel',
  //       id: '1001200005002',
  //     },
  //   ],
  //   paging: {
  //     cursors: {
  //       before:
  //         'QVFIUmx1WTBpMGpJWXprYzVYaVhabW55dVpycko4U2xURGE5ODNtNFZAPal94a1hTUnNVMUtoMVVoTzlzSDktUkMtQkUzWEFLSXlMS3ZALYUw3TURLelZAPOGVR',
  //       after:
  //         'QVFIUmItNkpTbjVzakxFWGRydzdaVUFNNnNPaUl0SmwzVHN5ZAWZAEQ3lZANDAzTXFIM0NHbHdYSkQ5OG1GaEozdjkzRmxpUFhxTDl4ZAlBibnE4LWt1eGlTa3Bn',
  //     },
  //   },
  // }
});
```

<br />

#### `getLabelDetails(labelId, options)`

Retrieving Label Details.

| Param          | Type            | Description                     |
| -------------- | --------------- | ------------------------------- |
| labelId        | `String`        | ID of the custom label.         |
| options.fields | `Array<String>` | fields to retrieve with its ID. |

Example:

```js
client.getLabelDetails(LABEL_ID, { fields: ['name'] }).then(result => {
  console.log(result);
  // {
  //   id: "1001200005002",
  //   name: "myLabel",
  // }
});
```

<br />

#### `getLabelList()`

Retrieving a List of All Labels.

Example:

```js
client.getLabelList().then(result => {
  console.log(result);
  // {
  //   data: [
  //     {
  //       name: 'myLabel',
  //       id: '1001200005003',
  //     },
  //     {
  //       name: 'myOtherLabel',
  //       id: '1001200005002',
  //     },
  //   ],
  //   paging: {
  //     cursors: {
  //       before:
  //         'QVFIUmx1WTBpMGpJWXprYzVYaVhabW55dVpycko4U2xURGE5ODNtNFZAPal94a1hTUnNVMUtoMVVoTzlzSDktUkMtQkUzWEFLSXlMS3ZALYUw3TURLelZAPOGVR',
  //       after:
  //         'QVFIUmItNkpTbjVzakxFWGRydzdaVUFNNnNPaUl0SmwzVHN5ZAWZAEQ3lZANDAzTXFIM0NHbHdYSkQ5OG1GaEozdjkzRmxpUFhxTDl4ZAlBibnE4LWt1eGlTa3Bn',
  //     },
  //   },
  // }
});
```

<br />

#### `deleteLabel(labelId)`

Deleting a Label.

| Param   | Type     | Description             |
| ------- | -------- | ----------------------- |
| labelId | `String` | ID of the custom label. |

Example:

```js
client.deleteLabel(LABEL_ID);
```

<br />

<a id="user-profile-api" />

### User Profile API - [Official Docs](https://developers.facebook.com/docs/messenger-platform/user-profile)

#### `getUserProfile(userId, options)`

Retrieving a Person's Profile.

| Param          | Type            | Description                                                                                                                                                                      |
| -------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId         | `String`        | Page-scoped user ID of the recipient.                                                                                                                                            |
| options.fields | `Array<String>` | Value must be among `id`, `name`, `first_name`, `last_name`, `profile_pic`, `locale`, `timezone`, `gender`, default with `id`, `name`, `first_name`, `last_name`, `profile_pic`, |

Example:

```js
client.getUserProfile(USER_ID).then(user => {
  console.log(user);
  // {
  //   id: '5566'
  //   firstName: 'Johnathan',
  //   lastName: 'Jackson',
  //   profilePic: 'https://example.com/pic.png',
  // }
});
```

<br />

<a id="messenger-profile-api" />

### Messenger Profile API - [Official Docs](https://developers.facebook.com/docs/messenger-platform/messenger-profile)

#### `getMessengerProfile(fields)`

Retrieves the current value of one or more Messenger Profile properties by name.

| Param  | Type            | Description                                                                                                                                    |
| ------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| fields | `Array<String>` | Value must be among `account_linking_url`, `persistent_menu`, `get_started`, `greeting`, `whitelisted_domains`, `target_audience`, `home_url`. |

Example:

```js
client.getMessengerProfile(['get_started', 'persistent_menu']).then(profile => {
  console.log(profile);
  // [
  //   {
  //     getStarted: {
  //       payload: 'GET_STARTED',
  //     },
  //   },
  //   {
  //     persistentMenu: [
  //       {
  //         locale: 'default',
  //         composerInputDisabled: true,
  //         callToActions: [
  //           {
  //             type: 'postback',
  //             title: 'Restart Conversation',
  //             payload: 'RESTART',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ]
});
```

<br />

#### `setMessengerProfile(profile)`

Sets the values of one or more Messenger Profile properties. Only properties set in the request body will be overwritten.

| Param   | Type     | Description                                                                                                                      |
| ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| profile | `Object` | Object of [Profile](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api#profile_properties). |

Example:

```js
client.setMessengerProfile({
  getStarted: {
    payload: 'GET_STARTED',
  },
  persistentMenu: [
    {
      locale: 'default',
      composerInputDisabled: true,
      callToActions: [
        {
          type: 'postback',
          title: 'Restart Conversation',
          payload: 'RESTART',
        },
      ],
    },
  ],
});
```

<br />

#### `deleteMessengerProfile(fields)`

Deletes one or more Messenger Profile properties. Only properties specified in the fields array will be deleted.

| Param  | Type            | Description                                                                                                                                    |
| ------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| fields | `Array<String>` | Value must be among `account_linking_url`, `persistent_menu`, `get_started`, `greeting`, `whitelisted_domains`, `target_audience`, `home_url`. |

Example:

```js
client.deleteMessengerProfile(['get_started', 'persistent_menu']);
```

<br />

<a id="persistent-menu" />

### Persistent Menu - [Official Docs](https://developers.facebook.com/docs/messenger-platform/messenger-profile/persistent-menu)

![](https://scontent-tpe1-1.xx.fbcdn.net/v/t39.2365-6/16686128_804279846389859_443648268883197952_n.png?oh=adde03b0bc7dd524a58cf46016e0267d&oe=59FC90D6)

#### `getPersistentMenu`

Retrieves the current value of persistent menu.

Example:

```js
client.getPersistentMenu().then(menu => {
  console.log(menu);
  // [
  //   {
  //     locale: 'default',
  //     composerInputDisabled: true,
  //     callToActions: [
  //       {
  //         type: 'postback',
  //         title: 'Restart Conversation',
  //         payload: 'RESTART',
  //       },
  //       {
  //         type: 'web_url',
  //         title: 'Powered by ALOHA.AI, Yoctol',
  //         url: 'https://www.yoctol.com/',
  //       },
  //     ],
  //   },
  // ]
});
```

<br />

#### `setPersistentMenu(menu)`

Sets the values of persistent menu.

| Param | Type            | Description                                                                                                                          |
| ----- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| menu  | `Array<Object>` | Array of [menu](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/persistent-menu#properties). |

Example:

```js
client.setPersistentMenu([
  {
    locale: 'default',
    callToActions: [
      {
        title: 'Play Again',
        type: 'postback',
        payload: 'RESTART',
      },
      {
        title: 'Language Setting',
        type: 'nested',
        callToActions: [
          {
            title: '中文',
            type: 'postback',
            payload: 'CHINESE',
          },
          {
            title: 'English',
            type: 'postback',
            payload: 'ENGLISH',
          },
        ],
      },
      {
        title: 'Explore D',
        type: 'nested',
        callToActions: [
          {
            title: 'Explore',
            type: 'web_url',
            url: 'https://www.youtube.com/watch?v=v',
            webviewHeightRatio: 'tall',
          },
          {
            title: 'W',
            type: 'web_url',
            url: 'https://www.facebook.com/w',
            webviewHeightRatio: 'tall',
          },
          {
            title: 'Powered by YOCTOL',
            type: 'web_url',
            url: 'https://www.yoctol.com/',
            webviewHeightRatio: 'tall',
          },
        ],
      },
    ],
  },
]);
```

> Note: You must set a get started button to use the persistent menu.

<br />

#### `deletePersistentMenu`

Deletes persistent menu.

Example:

```js
client.deletePersistentMenu();
```

<a id="get-started-button" />

### Get Started Button - [Official Docs](https://developers.facebook.com/docs/messenger-platform/messenger-profile/get-started-button)

<img src="https://scontent-tpe1-1.xx.fbcdn.net/v/t39.2365-6/14302685_243106819419381_1314180151_n.png?oh=9487042d8c0067eb2fda1efa45d0e17b&oe=59F7185C" alt="Get Started Button" width="500" />

#### `getGetStarted`

Retrieves the current value of get started button.

Example:

```js
client.getGetStarted().then(getStarted => {
  console.log(getStarted);
  // {
  //   payload: 'GET_STARTED',
  // }
});
```

<br />

#### `setGetStarted(payload)`

Sets the values of get started button.

| Param   | Type     | Description                                                                                                 |
| ------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| payload | `String` | Payload sent back to your webhook in a `messaging_postbacks` event when the 'Get Started' button is tapped. |

Example:

```js
client.setGetStarted('GET_STARTED');
```

<br />

#### `deleteGetStarted`

Deletes get started button.

Example:

```js
client.deleteGetStarted();
```

<a id="greeting-text" />

### Greeting Text - [Officail docs](https://developers.facebook.com/docs/messenger-platform/messenger-profile/greeting-text)

<img src="https://scontent-tpe1-1.xx.fbcdn.net/v/t39.2365-6/14287888_188235318253964_1078929636_n.png?oh=a1171ab50f04d3a244ed703eafd2dbef&oe=59F01AF5" alt="Greeting Text" width="250" />

#### `getGreeting`

Retrieves the current value of greeting text.

Example:

```js
client.getGreeting().then(greeting => {
  console.log(greeting);
  // [
  //   {
  //     locale: 'default',
  //     text: 'Hello!',
  //   },
  // ]
});
```

<br />

#### `setGreeting(greeting)`

Sets the values of greeting text.

| Param    | Type            | Description                                                                                                                       |
| -------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| greeting | `Array<Object>` | Array of [greeting](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/greeting#properties). |

Example:

```js
client.setGreeting([
  {
    locale: 'default',
    text: 'Hello!',
  },
]);
```

<br />

#### `deleteGreeting`

Deletes greeting text.

Example:

```js
client.deleteGreeting();
```

<a id="domain-whitelist" />

### Whitelisted Domains - [Official Docs](https://developers.facebook.com/docs/messenger-platform/messenger-profile/domain-whitelisting)

#### `getWhitelistedDomains`

Retrieves the current value of whitelisted domains.

Example:

```js
client.getWhitelistedDomains().then(domains => {
  console.log(domains);
  // ['http://www.example.com/']
});
```

<br />

#### `setWhitelistedDomains(domains)`

Sets the values of whitelisted domains.

| Param   | Type            | Description                                                                                                                                            |
| ------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| domains | `Array<String>` | Array of [whitelisted_domain](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/domain-whitelisting#properties). |

Example:

```js
client.setWhitelistedDomains(['www.example.com']);
```

<br />

#### `deleteWhitelistedDomains`

Deletes whitelisted domains.

Example:

```js
client.deleteWhitelistedDomains();
```

<a id="account-linking-url" />

### Account Linking URL - [Official Docs](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/account-linking-url)

#### `getAccountLinkingURL`

Retrieves the current value of account linking URL.

Example:

```js
client.getAccountLinkingURL().then(accountLinking => {
  console.log(accountLinking);
  // {
  //   accountLinkingUrl:
  //     'https://www.example.com/oauth?response_type=code&client_id=1234567890&scope=basic',
  // }
});
```

<br />

#### `setAccountLinkingURL(url)`

Sets the values of account linking URL.

| Param | Type     | Description          |
| ----- | -------- | -------------------- |
| url   | `String` | Account linking URL. |

Example:

```js
client.setAccountLinkingURL(
  'https://www.example.com/oauth?response_type=code&client_id=1234567890&scope=basic'
);
```

<br />

#### `deleteAccountLinkingURL`

Deletes account linking URL.

Example:

```js
client.deleteAccountLinkingURL();
```

<br />

<a id="target-audience" />

### Target Audience - [Official Docs](https://developers.facebook.com/docs/messenger-platform/messenger-profile/target-audience)

#### `getTargetAudience`

Retrieves the current value of target audience.

Example:

```js
client.getTargetAudience().then(targetAudience => {
  console.log(targetAudience);
  // {
  //   audienceType: 'custom',
  //   countries: {
  //     whitelist: ['US', 'CA'],
  //   },
  // }
});
```

<br />

#### `setTargetAudience(type, whitelist, blacklist)`

Sets the values of target audience.

| Param     | Type            | Description                                                                                                                             |
| --------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| type      | `String`        | Audience type. Valid values include `all | custom | none`.                                                                              |
| whitelist | `Array<String>` | List of ISO 3166 Alpha-2 codes. Users in any of the blacklist countries won't see your bot on discovery surfaces on Messenger Platform. |
| blacklist | `Array<String>` | List of ISO 3166 Alpha-2 codes. Users in any of the whitelist countries will see your bot on discovery surfaces on Messenger Platform.  |

Exmaple:

```js
client.setTargetAudience('custom', ['US', 'CA'], ['UK']);
```

<br />

#### `deleteTargetAudience`

Deletes target audience.

Example:

```js
client.deleteTargetAudience();
```

<br />

<a id="chat-extension-home-url" />

### Chat Extension Home URL - [Official Docs](https://developers.facebook.com/docs/messenger-platform/messenger-profile/home-url)

#### `getHomeURL`

Retrieves the current value of chat extension home URL.

Example:

```js
client.getHomeURL().then(chatExtension => {
  console.log(chatExtension);
  // {
  //   url: 'http://petershats.com/send-a-hat',
  //   webviewHeightRatio: 'tall',
  //   inTest: true,
  // }
});
```

<br />

#### `setHomeURL(url, attributes)`

Sets the values of chat extension home URL.

| Param      | Type     | Description                                                                                                                                  |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| url        | `String` | The URL to be invoked from drawer.                                                                                                           |
| attributes | `Object` | Other [properties](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/home-url#properties) of home URL. |

Exmaple:

```js
client.setHomeURL('http://petershats.com/send-a-hat', {
  webviewHeightRatio: 'tall',
  inTest: true,
});
```

<br />

#### `deleteHomeURL`

Deletes chat extension home URL.

Example:

```js
client.deleteHomeURL();
```

<br />

### Handover Protocol API

#### `passThreadControl(userId, targetAppId, metadata)` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/pass-thread-control)

Passes thread control from your app to another app.

| Param       | Type     | Description                                                                      |
| ----------- | -------- | -------------------------------------------------------------------------------- |
| userId      | `String` | The PSID of the message recipient.                                               |
| targetAppId | `Number` | The app ID of the Secondary Receiver to pass thread control to.                  |
| metadata    | `String` | Metadata passed to the receiving app in the `pass_thread_control` webhook event. |

Example:

```js
client.passThreadControl(USER_ID, APP_ID, 'free formed text for another app');
```

<br />

#### `passThreadControlToPageInbox(userId, metadata)` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/handover-protocol/pass-thread-control#page_inbox)

Passes thread control from your app to "Page Inbox" app.

| Param    | Type     | Description                                                                      |
| -------- | -------- | -------------------------------------------------------------------------------- |
| userId   | `String` | The PSID of the message recipient.                                               |
| metadata | `String` | Metadata passed to the receiving app in the `pass_thread_control` webhook event. |

Example:

```js
client.passThreadControlToPageInbox(
  USER_ID,
  'free formed text for another app'
);
```

<br />

#### `takeThreadControl(userId, metadata)` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/take-thread-control)

Takes control of a specific thread from a Secondary Receiver app.

| Param    | Type     | Description                                                                           |
| -------- | -------- | ------------------------------------------------------------------------------------- |
| userId   | `String` | The PSID of the message recipient.                                                    |
| metadata | `String` | Metadata passed back to the secondary app in the `take_thread_control` webhook event. |

Example:

```js
client.takeThreadControl(USER_ID, 'free formed text for another app');
```

<br />

#### `requestThreadControl(userId, metadata)` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/handover-protocol/request-thread-control/)

Requests control of a specific thread from a Primary Receiver app.

| Param    | Type     | Description                                                                       |
| -------- | -------- | --------------------------------------------------------------------------------- |
| userId   | `String` | The PSID of the message recipient.                                                |
| metadata | `String` | Metadata passed to the primary app in the `request_thread_control` webhook event. |

Example:

```js
client.requestThreadControl(USER_ID, 'free formed text for primary app');
```

<br />

#### `getThreadOwner` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/handover-protocol/get-thread-owner)

Get the current thread owner.

| Param  | Type     | Description                        |
| ------ | -------- | ---------------------------------- |
| userId | `String` | The PSID of the message recipient. |

Example:

```js
client.getThreadOwner(USER_ID).then(threadOwner => {
  console.log(threadOwner);
  // {
  //   appId: '12345678910'
  // }
});
```

<br />

#### `getSecondaryReceivers` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/secondary-receivers)

Retrieves the list of apps that are Secondary Receivers for a page.

Example:

```js
client.getSecondaryReceivers().then(receivers => {
  console.log(receivers);
  // [
  //   {
  //     "id": "12345678910",
  //     "name": "David's Composer"
  //   },
  //   {
  //     "id": "23456789101",
  //     "name": "Messenger Rocks"
  //   }
  // ]
});
```

<br />

<a id="page-messaging-insights-api" />

### Page Messaging Insights API - [Official Docs](https://developers.facebook.com/docs/messenger-platform/insights/page-messaging)

Requirements for insights API:

- Page token must have `read_insights` permission.
- Insights are only generated for a Facebook Page that has more than `30` people that like it.

#### `getInsights(metrics, options)`

Retrieves the insights of your Facebook Page.

| Param         | Type     | Description                                                                                                                         |
| ------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| metrics       | `Array`  | [The metrics](https://developers.facebook.com/docs/messenger-platform/reference/messaging-insights-api/#metrics) you want to check. |
| options       | `Object` | Optional arguments.                                                                                                                 |
| options.since | `number` | Optional. UNIX timestamp of the start time to get the metric for.                                                                   |
| options.until | `number` | Optional. UNIX timestamp of the end time to get the metric for.                                                                     |

Example:

```js
client
  .getInsights(['page_messages_reported_conversations_unique'])
  .then(counts => {
    console.log(counts);
    // [
    //   {
    //     "name": "page_messages_reported_conversations_unique",
    //     "period": "day",
    //     "values": [
    //       {
    //         "value": "<VALUE>",
    //         "endTime": "<UTC_TIMESTAMP>"
    //       },
    //       {
    //         "value": "<VALUE>",
    //         "endTime": "<UTC_TIMESTAMP>"
    //       }
    //     ]
    //   }
    // ]
  });
```

<br />

#### `getBlockedConversations(options)`

Retrieves the number of conversations with the Page that have been blocked.

| Param         | Type     | Description                                                       |
| ------------- | -------- | ----------------------------------------------------------------- |
| options       | `Object` | Optional arguments.                                               |
| options.since | `number` | Optional. UNIX timestamp of the start time to get the metric for. |
| options.until | `number` | Optional. UNIX timestamp of the end time to get the metric for.   |

Example:

```js
client.getBlockedConversations().then(counts => {
  console.log(counts);
  //   {
  //     "name": "page_messages_blocked_conversations_unique",
  //     "period": "day",
  //     "values": [
  //       {
  //         "value": "<VALUE>",
  //         "endTime": "<UTC_TIMESTAMP>"
  //       },
  //       {
  //         "value": "<VALUE>",
  //         "endTime": "<UTC_TIMESTAMP>"
  //       }
  //    ]
  //   }
});
```

<br />

#### `getReportedConversations(options)`

Retrieves the number of conversations from your Page that have been reported by people for reasons such as spam, or containing inappropriate content.

| Param         | Type     | Description                                                       |
| ------------- | -------- | ----------------------------------------------------------------- |
| options       | `Object` | Optional arguments.                                               |
| options.since | `number` | Optional. UNIX timestamp of the start time to get the metric for. |
| options.until | `number` | Optional. UNIX timestamp of the end time to get the metric for.   |

Example:

```js
client.getReportedConversations().then(counts => {
  console.log(counts);
  //   {
  //     "name": "page_messages_reported_conversations_unique",
  //     "period": "day",
  //     "values": [
  //       {
  //         "value": "<VALUE>",
  //         "endTime": "<UTC_TIMESTAMP>"
  //       },
  //       {
  //         "value": "<VALUE>",
  //         "endTime": "<UTC_TIMESTAMP>"
  //       }
  //     ]
  //   }
});
```

<br />

#### `getOpenConversations(options)`

**Deprecated**

> `getOpenConversations()` is deprecated on May 11, 2018.
> Currently this method returns the same result as the replacing method getTotalMessagingConnections()

Retrieves the total number of open conversations between your Page and people in Messenger. This metric excludes blocked conversations.

| Param         | Type     | Description                                                       |
| ------------- | -------- | ----------------------------------------------------------------- |
| options       | `Object` | Optional arguments.                                               |
| options.since | `number` | Optional. UNIX timestamp of the start time to get the metric for. |
| options.until | `number` | Optional. UNIX timestamp of the end time to get the metric for.   |

Example:

```js
client.getOpenConversations().then(result => {
  console.log(result);
  // {
  //   name: 'page_messages_total_messaging_connections',
  //   period: 'day',
  //   values: [
  //     { value: 1000, endTime: '2018-03-12T07:00:00+0000' },
  //     { value: 1000, endTime: '2018-03-13T07:00:00+0000' },
  //   ],
  //   title: 'Messaging connections',
  //   description:
  //     'Daily: The number of people who have sent a message to your business, not including people who have blocked or reported your business on Messenger. (This number only includes connections made since October 2016.)',
  //   id:
  //     '1386473101668063/insights/page_messages_total_messaging_connections/day',
  // }
});
```

<br />

#### `getTotalMessagingConnections(options)`

Retrieves the number of people who have sent a message to your business, not including people who have blocked or reported your business on Messenger. (This number only includes connections made since October 2016.)

| Param         | Type     | Description                                                       |
| ------------- | -------- | ----------------------------------------------------------------- |
| options       | `Object` | Optional arguments.                                               |
| options.since | `number` | Optional. UNIX timestamp of the start time to get the metric for. |
| options.until | `number` | Optional. UNIX timestamp of the end time to get the metric for.   |

Example:

```js
client.getTotalMessagingConnections().then(result => {
  console.log(result);
  // {
  //   name: 'page_messages_total_messaging_connections',
  //   period: 'day',
  //   values: [
  //     { value: 1000, endTime: '2018-03-12T07:00:00+0000' },
  //     { value: 1000, endTime: '2018-03-13T07:00:00+0000' },
  //   ],
  //   title: 'Messaging connections',
  //   description:
  //     'Daily: The number of people who have sent a message to your business, not including people who have blocked or reported your business on Messenger. (This number only includes connections made since October 2016.)',
  //   id:
  //     '1386473101668063/insights/page_messages_total_messaging_connections/day',
  // }
});
```

<br />

#### `getNewConversations(options)`

Retrieves the number of messaging conversations on Facebook Messenger that began with people who had never messaged with your business before.

| Param         | Type     | Description                                                       |
| ------------- | -------- | ----------------------------------------------------------------- |
| options       | `Object` | Optional arguments.                                               |
| options.since | `number` | Optional. UNIX timestamp of the start time to get the metric for. |
| options.until | `number` | Optional. UNIX timestamp of the end time to get the metric for.   |

Example:

```js
client.getNewConversations().then(result => {
  console.log(result);
  // {
  //   name: 'page_messages_new_conversations_unique',
  //   period: 'day',
  //   values: [
  //     { value: 1, endTime: '2018-03-12T07:00:00+0000' },
  //     { value: 0, endTime: '2018-03-13T07:00:00+0000' },
  //   ],
  //   title: 'Daily unique new conversations count',
  //   description:
  //     'Daily: The number of messaging conversations on Facebook Messenger that began with people who had never messaged with your business before.',
  //   id:
  //     '1386473101668063/insights/page_messages_new_conversations_unique/day',
  // }
});
```

<br />

<a id="built-in-nlp-api" />

### Built-in NLP API - [Official Docs](https://developers.facebook.com/docs/messenger-platform/built-in-nlp)

#### `setNLPConfigs(config)`

Set values of NLP configs.

| Param              | Type      | Description                                                                                                                                                                                                                                                                             |
| ------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| config             | `Object`  | Configuration of NLP.                                                                                                                                                                                                                                                                   |
| config.nlpEnabled  | `Boolean` | Optional. Either enable NLP or disable NLP for that Page.                                                                                                                                                                                                                               |
| config.model       | `String`  | Optional. Specifies the NLP model to use. Either one of `{CHINESE, CROATIAN, DANISH, DUTCH, ENGLISH, FRENCH_STANDARD, GERMAN_STANDARD, HEBREW, HUNGARIAN, IRISH, ITALIAN_STANDARD, KOREAN, NORWEGIAN_BOKMAL, POLISH, PORTUGUESE, ROMANIAN, SPANISH, SWEDISH, VIETNAMESE}`, or `CUSTOM`. |
| config.customToken | `String`  | Optional. Access token from Wit.                                                                                                                                                                                                                                                        |
| config.verbose     | `Boolean` | Optional. Specifies whether verbose mode if enabled, which returns extra information like the position of the detected entity in the query.                                                                                                                                             |
| config.nBest       | `Number`  | Optional. The number of entities to return, in descending order of confidence. Minimum 1. Maximum 8. Defaults to 1.                                                                                                                                                                     |

Example:

```js
client.setNLPConfigs({
  nlpEnabled: true,
});
```

<br />

#### `enableNLP`

Enabling Built-in NLP.

Example:

```js
client.enableNLP();
```

<br />

#### `disableNLP`

Disabling Built-in NLP.

Example:

```js
client.disableNLP();
```

<br />

<a id="event-logging-api" />

### Event Logging API - [Official Docs](https://developers.facebook.com/docs/app-events/bots-for-messenger#logging-custom-events)

#### `logCustomEvents(activity)`

Log custom events by using the [Application Activities Graph API](https://developers.facebook.com/docs/graph-api/reference/application/activities/) endpoint.

| Param                     | Type            | Description                           |
| ------------------------- | --------------- | ------------------------------------- |
| activity                  | `Object`        |
| activity.appId            | `Number`        | ID of the app.                        |
| activity.pageId           | `String`        | ID of the page.                       |
| activity.pageScopedUserId | `String`        | Page-scoped user ID of the recipient. |
| activity.events           | `Array<Object>` | Custom events.                        |

Example:

```js
client.logCustomEvents({
  appId: APP_ID,
  pageId: PAGE_ID,
  pageScopedUserId: USER_ID,
  events: [
    {
      _eventName: 'fb_mobile_purchase',
      _valueToSum: 55.22,
      _fbCurrency: 'USD',
    },
  ],
});
```

<a id="id-matching-api" />

### ID Matching API - [Official Docs](https://developers.facebook.com/docs/messenger-platform/identity/id-matching)

#### `getIdsForApps({ userId, appSecret, ...options })`

Given a user ID for an app, retrieve the IDs for other apps owned by the same business

| Param        | Type     | Description                   |
| ------------ | -------- | ----------------------------- |
| userId       | `String` | Page-scoped user ID.          |
| appSecret    | `String` | Secret of the app.            |
| options.app  | `String` | The app to retrieve the IDs.  |
| options.page | `String` | The page to retrieve the IDs. |

Example:

```js
client
  .getIdsForApps({
    userId: USER_ID,
    appSecret: APP_SECRET,
  })
  .then(result => {
    console.log(result);
    // {
    //   data: [
    //     {
    //       id: '10152368852405295',
    //       app: {
    //         category: 'Business',
    //         link: 'https://www.facebook.com/games/?app_id=1419232575008550',
    //         name: "John's Game App",
    //         id: '1419232575008550',
    //       },
    //     },
    //     {
    //       id: '645195294',
    //       app: {
    //         link: 'https://apps.facebook.com/johnsmovieappns/',
    //         name: 'JohnsMovieApp',
    //         namespace: 'johnsmovieappns',
    //         id: '259773517400382',
    //       },
    //     },
    //   ],
    //   paging: {
    //     cursors: {
    //       before: 'MTQ4OTU4MjQ5Nzc4NjY4OAZDZDA',
    //       after: 'NDAwMDExOTA3MDM1ODMwA',
    //     },
    //   },
    // };
  });
```

<br />

#### `getIdsForPages({ userId, appSecret, ...options })`

Given a user ID for a Page (associated with a bot), retrieve the IDs for other Pages owned by the same business.

| Param        | Type     | Description                   |
| ------------ | -------- | ----------------------------- |
| userId       | `String` | Page-scoped user ID.          |
| appSecret    | `String` | Secret of the app.            |
| options.app  | `String` | The app to retrieve the IDs.  |
| options.page | `String` | The page to retrieve the IDs. |

Example:

```js
client
  .getIdsForPages({
    userId: USER_ID,
    appSecret: APP_SECRET,
  })
  .then(result => {
    console.log(result);
    // {
    //   data: [
    //     {
    //       id: '12345123', // The psid for the user for that page
    //       page: {
    //         category: 'Musician',
    //         link:
    //           'https://www.facebook.com/Johns-Next-Great-Thing-380374449010653/',
    //         name: "John's Next Great Thing",
    //         id: '380374449010653',
    //       },
    //     },
    //   ],
    //   paging: {
    //     cursors: {
    //       before: 'MTQ4OTU4MjQ5Nzc4NjY4OAZDZDA',
    //       after: 'NDAwMDExOTA3MDM1ODMwA',
    //     },
    //   },
    // };
  });
```

<br />

<a id="persona-api" />

### Persona API - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-messages/personas)

#### `createPersona(persona)` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-messages/personas/#create)

Creates a persona.

| Param                     | Type                | Description                     |
| ------------------------- | ------------------- | ------------------------------- |
| persona.name              | <code>String</code> | name of the persona.            |
| persona.profilePictureUrl | <code>String</code> | profile picture of the persona. |

```js
createPersona({
  name: 'John Mathew',
  profilePictureUrl: 'https://facebook.com/john_image.jpg',
}).then(persona => {
  console.log(persona);
  // {
  //  "id": "<PERSONA_ID>"
  // }
});
```

<br />

#### `getPersona(personaId)` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-messages/personas/#get)

Retrieves the name and profile picture of a persona.

| Param     | Type                | Description        |
| --------- | ------------------- | ------------------ |
| personaId | <code>String</code> | ID of the persona. |

```js
getPersona(personaId).then(persona => {
  console.log(persona);
  // {
  //   "name": "John Mathew",
  //   "profilePictureUrl": "https://facebook.com/john_image.jpg",
  //   "id": "<PERSONA_ID>"
  // }
});
```

<br />

#### `getPersonas(cursor?: string)` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-messages/personas/#retrieve_all)

Retrieves personas associated with a Page using the cursor.

| Param  | Type                | Description        |
| ------ | ------------------- | ------------------ |
| cursor | <code>String</code> | pagination cursor. |

```js
getPersonas(cursor).then(personas => {
  console.log(personas);
  // {
  //   "data": [
  //     {
  //       "name": "John Mathew",
  //       "profilePictureUrl": "https://facebook.com/john_image.jpg",
  //       "id": "<PERSONA_ID>"
  //     },
  //     {
  //       "name": "David Mark",
  //       "profilePictureUrl": "https://facebook.com/david_image.jpg",
  //       "id": "<PERSONA_ID>"
  //     }
  //   ],
  //   "paging": {
  //     "cursors": {
  //       "before": "QVFIUlMtR2ZATQlRtVUZALUlloV1",
  //       "after": "QVFIUkpnMGx0aTNvUjJNVmJUT0Yw"
  //     }
  //   }
  // }
});
```

<br />

#### `getAllPersonas()` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-messages/personas/#retrieve_all)

Retrieves all the personas associated with a Page.

```js
getAllPersonas().then(personas => {
  console.log(personas);
  //   [
  //     {
  //       "name": "John Mathew",
  //       "profilePictureUrl": "https://facebook.com/john_image.jpg",
  //       "id": "<PERSONA_ID>"
  //     },
  //     {
  //       "name": "David Mark",
  //       "profilePictureUrl": "https://facebook.com/david_image.jpg",
  //       "id": "<PERSONA_ID>"
  //     }
  //   ]
});
```

<br />

#### `deletePersona(personaId)` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-messages/personas/#remove)

Deletes a persona.

| Param     | Type                | Description        |
| --------- | ------------------- | ------------------ |
| personaId | <code>String</code> | ID of the persona. |

```js
deletePersona(personaId);
```

<br />

### Others

#### `debugToken` - [Official Docs](https://developers.facebook.com/docs/facebook-login/access-tokens/debugging-and-error-handling)

Gets token information.

Example:

```js
client.debugToken().then(pageInfo => {
  console.log(pageInfo);
  // {
  //    appId: '000000000000000',
  //    application: 'Social Cafe',
  //    expiresAt: 1352419328,
  //    isValid: true,
  //    issuedAt: 1347235328,
  //    scopes: ['email', 'user_location'],
  //    userId: 1207059,
  //  }
});
```

#### `createSubscription`

Create new Webhooks subscriptions.

| Param         | Type            | Description                                                                                                                       |
| ------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| accessToken   | `String`        | App access token.                                                                                                                 |
| callbackUrl   | `String`        | The URL that will receive the POST request when an update is triggered, and a GET request when attempting this publish operation. |
| verifyToken   | `String`        | An arbitrary string that can be used to confirm to your server that the request is valid.                                         |
| fields        | `Array<String>` | One or more of the set of valid fields in this object to subscribe to.                                                            |
| object        | `String`        | Indicates the object type that this subscription applies to. Defaults to `page`.                                                  |
| includeValues | `Boolean`       | Indicates if change notifications should include the new values.                                                                  |

Example:

```js
client.createSubscription({
  accessToken: APP_ACCESS_TOKEN,
  callbackUrl: 'https://mycallback.com',
  fields: ['messages', 'messaging_postbacks', 'messaging_referrals'],
  verifyToken: VERIFY_TOKEN,
});
```

Or provide app id and app secret instead of app access token:

```js
client.createSubscription({
  accessToken: `${APP_ID}|${APP_SECRET}`,
  callbackUrl: 'https://mycallback.com',
  fields: ['messages', 'messaging_postbacks', 'messaging_referrals'],
  verifyToken: VERIFY_TOKEN,
});
```

Default Fields:

- `messages`
- `messaging_postbacks`
- `messaging_optins`
- `messaging_referrals`
- `messaging_handovers`
- `messaging_policy_enforcement`

#### `getSubscriptions`

Get the current Webhook subscriptions set up on your app.

| Param       | Type     | Description       |
| ----------- | -------- | ----------------- |
| accessToken | `String` | App access token. |

Example:

```js
client.getSubscriptions({
  accessToken: APP_ACCESS_TOKEN,
});
```

Or provide app id and app secret instead of app access token:

```js
client.getSubscriptions({
  accessToken: `${APP_ID}|${APP_SECRET}`,
});
```

#### `getPageSubscription`

Get the current page subscriptions set up on your app.

| Param       | Type     | Description       |
| ----------- | -------- | ----------------- |
| accessToken | `String` | App access token. |

Example:

```js
client.getPageSubscription({
  accessToken: APP_ACCESS_TOKEN,
});
```

Or provide app id and app secret instead of app access token:

```js
client.getPageSubscription({
  accessToken: `${APP_ID}|${APP_SECRET}`,
});
```

<br />

#### `getPageInfo`

Get page name and page id using Graph API.

Example:

```js
client.getPageInfo().then(page => {
  console.log(page);
  // {
  //   name: 'Bot Demo',
  //   id: '1895382890692546',
  // }
});
```

#### `getMessagingFeatureReview`

Programmatically check the feature submission status of Page-level Platform features.

Example:

```js
client.getMessagingFeatureReview().then(data => {
  console.log(data);
  // [
  //   {
  //     "feature": "subscription_messaging",
  //     "status": "<pending|rejected|approved|limited>"
  //   }
  // ]
});
```

## Debug Tips

### Log Requests Details

To enable default request debugger, use following `DEBUG` env variable:

```sh
DEBUG=messaging-api-messenger
```

## Test

### Send Requests to Your Dummy Server

To avoid sending requests to the real Messenger server, provide the `origin` option in your `bottender.js.config` file:

```js
module.exports = {
  channels: {
    messenger: {
      enabled: true,
      path: '/webhooks/messenger',
      pageId: process.env.MESSENGER_PAGE_ID,
      accessToken: process.env.MESSENGER_ACCESS_TOKEN,
      appId: process.env.MESSENGER_APP_ID,
      appSecret: process.env.MESSENGER_APP_SECRET,
      verifyToken: process.env.MESSENGER_VERIFY_TOKEN,
      origin: process.env.NODE_ENV === 'test' ? 'https://mydummytestserver.com' : undefined,
    },
  },
};
```

> **Warning:** Don't do this on the production server.
