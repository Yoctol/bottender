---
id: api-messengercontext
title: MessengerContext
original_id: api-messengercontext
---

- [Message Content Types](#message-content-types)
- [Templates](#templates)
- [Quick Replies](#quick-replies)
- [Sender Actions](#sender-actions)
- [Targeting Broadcast Messages](#targeting-broadcast-messages)
- [User Profile API](#user-profile-api)
- [Handover Protocol API](#handover-protocol-api)

#### `sendMessage(message [, options])`

Send messages to the user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

| Param   | Type     | Description                                                                                                                                                                                                                       |
| ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| message | `Object` | [message](https://developers.facebook.com/docs/messenger-platform/reference/send-api#message) object.                                                                                                                             |
| options | `Object` | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types) or [tags](https://developers.facebook.com/docs/messenger-platform/message-tags). |

Example:

```js
context.sendMessage({
  text: 'Hello!',
});
```

You can specify [messaging type](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types) using options. If `messaging_type` and `tag` is not provided, `UPDATE` will be used as default messaging type.

Example:

```js
context.sendMessage(
  {
    text: 'Hello!',
  },
  {
    messaging_type: 'RESPONSE',
  }
);
```

Available messaging types:

- `UPDATE` as default
- `RESPONSE` using `{ messaging_type: 'RESPONSE' }` options
- `MESSAGE_TAG` using `{ tag: 'ANY_TAG' }` options

<br />

<a id="message-content-types" />

### Message Content Types - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-messages#content_types)

#### `sendText(text [, options])`

Send plain text messages to the user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

| Param   | Type     | Description                                                                                                                                                                                                                       |
| ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text    | `String` | Text of the message to be sent.                                                                                                                                                                                                   |
| options | `Object` | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types) or [tags](https://developers.facebook.com/docs/messenger-platform/message-tags). |

Example:

```js
context.sendText('Hello!');
```

With `ISSUE_RESOLUTION` tag:

```js
context.sendText('Hello!', { tag: 'CONFIRMED_EVENT_UPDATE' });
```

<br />

#### `sendAttachment(attachment [, options])`

Send attachment messages to the user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

| Param      | Type     | Description                                                                                                                                                                                                                       |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| attachment | `Object` | [attachment](https://developers.facebook.com/docs/messenger-platform/reference/send-api#attachment) object.                                                                                                                       |
| options    | `Object` | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types) or [tags](https://developers.facebook.com/docs/messenger-platform/message-tags). |

Example:

```js
context.sendAttachment({
  type: 'image',
  payload: {
    url: 'https://example.com/pic.png',
  },
});
```

<br />

#### `sendAudio(audio [, options])`

Send sounds to the user by uploading them or sharing a URL using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

| Param   | Type                                                                         | Description                                                                                                                                       |
| ------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| audio   | <code>String &#124; Buffer &#124; ReadStream &#124; AttachmentPayload</code> | The audio to be sent.                                                                                                                             |
| options | `Object`                                                                     | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types). |

Example:

- Send audio using url string:

```js
context.sendAudio('https://example.com/audio.mp3');
```

- Use `AttachmentPayload` to send cached attachment:

```js
context.sendAudio({ attachment_id: '55688' });
```

- Use `ReadStream` created from local file:

```js
const fs = require('fs');

context.sendAudio(fs.createReadStream('audio.mp3'));
```

<br />

#### `sendImage(image [, options])`

Send images to the user by uploading them or sharing a URL using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request). Supported formats are jpg, png and gif.

| Param   | Type                                                                         | Description                                                                                                                                       |
| ------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| image   | <code>String &#124; Buffer &#124; ReadStream &#124; AttachmentPayload</code> | The image to be sent.                                                                                                                             |
| options | `Object`                                                                     | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types). |

Example:

- Send image using url string:

```js
context.sendImage('https://example.com/vr.jpg');
```

- Use `AttachmentPayload` to send cached attachment:

```js
context.sendImage({ attachment_id: '55688' });
```

- Use `ReadStream` created from local file:

```js
const fs = require('fs');

context.sendImage(fs.createReadStream('vr.jpg'));
```

<br />

#### `sendVideo(video [, options])`

Send videos to the user by uploading them or sharing a URL using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

| Param   | Type                                                                         | Description                                                                                                                                       |
| ------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| video   | <code>String &#124; Buffer &#124; ReadStream &#124; AttachmentPayload</code> | The video to be sent.                                                                                                                             |
| options | `Object`                                                                     | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types). |

Example:

- Send video using url string:

```js
context.sendVideo('https://example.com/video.mp4');
```

- Use `AttachmentPayload` to send cached attachment:

```js
context.sendVideo({ attachment_id: '55688' });
```

- Use `ReadStream` created from local file:

```js
const fs = require('fs');

context.sendVideo(fs.createReadStream('video.mp4'));
```

<br />

#### `sendFile(file [, options])`

Send files to the user by uploading them or sharing a URL using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

| Param   | Type                                                                         | Description                                                                                                                                       |
| ------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| file    | <code>String &#124; Buffer &#124; ReadStream &#124; AttachmentPayload</code> | The file to be sent.                                                                                                                              |
| options | `Object`                                                                     | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types). |

Example:

- Send file using url string:

```js
context.sendFile('https://example.com/receipt.pdf');
```

- Use `AttachmentPayload` to send cached attachment:

```js
context.sendFile({ attachment_id: '55688' });
```

- Use `ReadStream` created from local file:

```js
const fs = require('fs');

context.sendFile(fs.createReadStream('receipt.pdf'));
```

<br />

<a id="templates" />

### Templates - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference/templates)

#### `sendTemplate(template [, options])`

Send structured message templates to the user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

| Param    | Type     | Description                                                                                                                                                                                                                       |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| template | `Object` | Object of the template.                                                                                                                                                                                                           |
| options  | `Object` | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types) or [tags](https://developers.facebook.com/docs/messenger-platform/message-tags). |

Example:

```js
context.sendTemplate({
  template_type: 'button',
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

#### `sendButtonTemplate(title, buttons [, options])` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference/button-template)

Send button message templates to the user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

<img src="https://user-images.githubusercontent.com/3382565/37410664-0b80b080-27dc-11e8-8854-4408d6f32fdf.png" alt="sendButtonTemplate" width="250" />

| Param   | Type            | Description                                                                                                                                                         |
| ------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title   | `String`        | Text that appears above the buttons.                                                                                                                                |
| buttons | `Array<Object>` | Array of [button](https://developers.facebook.com/docs/messenger-platform/send-messages/template/button#button). Set of 1-3 buttons that appear as call-to-actions. |
| options | `Object`        | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types).                   |

Example:

```js
context.sendButtonTemplate('What do you want to do next?', [
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

#### `sendGenericTemplate(elements [, options])` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference/generic-template)

Send generic message templates to the user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

<img src="https://user-images.githubusercontent.com/3382565/37410502-bf948426-27db-11e8-8c9d-7fd6158d0cc2.png" alt="sendGenericTemplate" width="750" />

| Param    | Type            | Description                                                                                                                                                                                                                                         |
| -------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| elements | `Array<Object>` | Array of [element](https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic#element). Data for each bubble in message.                                                                                                |
| options  | `Object`        | Other optional parameters, such as `image_aspect_ratio`, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types) and [tags](https://developers.facebook.com/docs/messenger-platform/message-tags). |

Example:

```js
context.sendGenericTemplate(
  [
    {
      title: "Welcome to Peter's Hats",
      image_url: 'https://petersfancybrownhats.com/company_image.png',
      subtitle: "We've got the right hat for everyone.",
      default_action: {
        type: 'web_url',
        url: 'https://peterssendreceiveapp.ngrok.io/view?item=103',
        messenger_extensions: true,
        webview_height_ratio: 'tall',
        fallback_url: 'https://peterssendreceiveapp.ngrok.io/',
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
  { image_aspect_ratio: 'square' }
);
```

Adding a [tag](https://developers.facebook.com/docs/messenger-platform/message-tags) to a message allows you to send it outside the 24+1 window, for a limited number of use cases, per [Messenger Platform policy](https://developers.facebook.com/docs/messenger-platform/policy-overview).

Example:

```js
context.sendGenericTemplate(
  [
    {
      // ...
    },
  ],
  { tag: 'CONFIRMED_EVENT_UPDATE' }
);
```

Available tags:

- `COMMUNITY_ALERT`
- `CONFIRMED_EVENT_REMINDER`
- `NON_PROMOTIONAL_SUBSCRIPTION`
- `PAIRING_UPDATE`
- `APPLICATION_UPDATE`
- `ACCOUNT_UPDATE`
- `PAYMENT_UPDATE`
- `PERSONAL_FINANCE_UPDATE`
- `SHIPPING_UPDATE`
- `RESERVATION_UPDATE`
- `ISSUE_RESOLUTION`
- `APPOINTMENT_UPDATE`
- `GAME_EVENT`
- `TRANSPORTATION_UPDATE`
- `FEATURE_FUNCTIONALITY_UPDATE`
- `TICKET_UPDATE`

<br />

#### `sendListTemplate(items, buttons [, options])` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference/list-template)

Send list message templates to the user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

<img src="https://user-images.githubusercontent.com/3382565/37410530-c97f03e4-27db-11e8-8331-56610e6fc3ad.png" alt="sendListTemplate" width="250" />

| Param   | Type            | Description                                                                                                                                                                                     |
| ------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| items   | `Array<Object>` | Array of [element](https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic#element). List view elements.                                                         |
| buttons | `Array<Object>` | Array of [button](https://developers.facebook.com/docs/messenger-platform/send-messages/template/button#button). List of buttons associated on the list template message (maximum of 1 button). |
| options | `Object`        | Other optional parameters, such as `top_element_style` and [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types).                            |

Example:

```js
context.sendListTemplate(
  [
    {
      title: 'Classic T-Shirt Collection',
      image_url: 'https://peterssendreceiveapp.ngrok.io/img/collection.png',
      subtitle: 'See all our colors',
      default_action: {
        type: 'web_url',
        url: 'https://peterssendreceiveapp.ngrok.io/shop_collection',
        messenger_extensions: true,
        webview_height_ratio: 'tall',
        fallback_url: 'https://peterssendreceiveapp.ngrok.io/',
      },
      buttons: [
        {
          title: 'View',
          type: 'web_url',
          url: 'https://peterssendreceiveapp.ngrok.io/collection',
          messenger_extensions: true,
          webview_height_ratio: 'tall',
          fallback_url: 'https://peterssendreceiveapp.ngrok.io/',
        },
      ],
    },
  ],
  [
    {
      type: 'postback',
      title: 'View More',
      payload: 'USER_DEFINED_PAYLOAD',
    },
  ],
  { top_element_style: 'compact' }
);
```

<br />

#### `sendOpenGraphTemplate(elements [, options])` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/open-graph-template)

Send open graph message templates to the user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

<img src="https://user-images.githubusercontent.com/3382565/37410778-4a6e77e6-27dc-11e8-9a3a-487bd2f7197e.png" alt="sendOpenGraphTemplate" width="250" />

| Param    | Type            | Description                                                                                                                                       |
| -------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| elements | `Array<Object>` | Array of [element](https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic#element). Only one element is allowed.  |
| options  | `Object`        | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types). |

Example:

```js
context.sendOpenGraphTemplate([
  {
    url: 'https://open.spotify.com/track/7GhIk7Il098yCjg4BQjzvb',
    buttons: [
      {
        type: 'web_url',
        url: 'https://en.wikipedia.org/wiki/Rickrolling',
        title: 'View More',
      },
    ],
  },
]);
```

<br />

#### `sendMediaTemplate(elements [, options])` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-messages/template/media)

Send media message templates to the user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

<img src="https://user-images.githubusercontent.com/3382565/37410836-64249ada-27dc-11e8-8dc4-5a155916961a.png" alt="sendMediaTemplate" width="250" />

| Param    | Type            | Description                                                                                                                                       |
| -------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| elements | `Array<Object>` | Array of [element](https://developers.facebook.com/docs/messenger-platform/reference/template/media#payload). Only one element is allowed.        |
| options  | `Object`        | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types). |

Example:

```js
context.sendMediaTemplate([
  {
    media_type: 'image',
    attachment_id: '1854626884821032',
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

#### `sendReceiptTemplate(receipt [, options])` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference/receipt-template)

Send receipt message templates to the user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

<img src="https://user-images.githubusercontent.com/3382565/37410909-8b72001e-27dc-11e8-94ae-555cb4ae93c9.png" alt="sendReceiptTemplate" width="250" />

| Param   | Type     | Description                                                                                                                                       |
| ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| receipt | `Object` | [payload](https://developers.facebook.com/docs/messenger-platform/send-messages/template/receipt#payload) of receipt template.                    |
| options | `Object` | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types). |

Example:

```js
context.sendReceiptTemplate({
  recipient_name: 'Stephane Crozatier',
  order_number: '12345678902',
  currency: 'USD',
  payment_method: 'Visa 2345',
  order_url: 'http://petersapparel.parseapp.com/order?order_id=123456',
  timestamp: '1428444852',
  elements: [
    {
      title: 'Classic White T-Shirt',
      subtitle: '100% Soft and Luxurious Cotton',
      quantity: 2,
      price: 50,
      currency: 'USD',
      image_url: 'http://petersapparel.parseapp.com/img/whiteshirt.png',
    },
    {
      title: 'Classic Gray T-Shirt',
      subtitle: '100% Soft and Luxurious Cotton',
      quantity: 1,
      price: 25,
      currency: 'USD',
      image_url: 'http://petersapparel.parseapp.com/img/grayshirt.png',
    },
  ],
  address: {
    street_1: '1 Hacker Way',
    street_2: '',
    city: 'Menlo Park',
    postal_code: '94025',
    state: 'CA',
    country: 'US',
  },
  summary: {
    subtotal: 75.0,
    shipping_cost: 4.95,
    total_tax: 6.19,
    total_cost: 56.14,
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

#### `sendAirlineBoardingPassTemplate(attributes [, options])` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference/airline-boardingpass-template)

Send airline boarding pass message templates to the user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

<img src="https://user-images.githubusercontent.com/3382565/37410966-a5fb1542-27dc-11e8-9d23-e3a090b0cdeb.png" alt="sendAirlineBoardingPassTemplate" width="600" />

| Param      | Type     | Description                                                                                                                                        |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| attributes | `Object` | [payload](https://developers.facebook.com/docs/messenger-platform/send-messages/template/airline-boarding-pass#payload) of boarding pass template. |
| options    | `Object` | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types).  |

Example:

```js
context.sendAirlineBoardingPassTemplate({
  intro_message: 'You are checked in.',
  locale: 'en_US',
  boarding_pass: [
    {
      passenger_name: 'SMITH/NICOLAS',
      pnr_number: 'CG4X7U',
      travel_class: 'business',
      seat: '74J',
      auxiliary_fields: [
        {
          label: 'Terminal',
          value: 'T1',
        },
        {
          label: 'Departure',
          value: '30OCT 19:05',
        },
      ],
      secondary_fields: [
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
      logo_image_url: 'https://www.example.com/en/logo.png',
      header_image_url: 'https://www.example.com/en/fb/header.png',
      qr_code: 'M1SMITH/NICOLAS  CG4X7U nawouehgawgnapwi3jfa0wfh',
      above_bar_code_image_url: 'https://www.example.com/en/PLAT.png',
      flight_info: {
        flight_number: 'KL0642',
        departure_airport: {
          airport_code: 'JFK',
          city: 'New York',
          terminal: 'T1',
          gate: 'D57',
        },
        arrival_airport: {
          airport_code: 'AMS',
          city: 'Amsterdam',
        },
        flight_schedule: {
          departure_time: '2016-01-02T19:05',
          arrival_time: '2016-01-05T17:30',
        },
      },
    },
    {
      passenger_name: 'JONES/FARBOUND',
      pnr_number: 'CG4X7U',
      travel_class: 'business',
      seat: '74K',
      auxiliary_fields: [
        {
          label: 'Terminal',
          value: 'T1',
        },
        {
          label: 'Departure',
          value: '30OCT 19:05',
        },
      ],
      secondary_fields: [
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
      logo_image_url: 'https://www.example.com/en/logo.png',
      header_image_url: 'https://www.example.com/en/fb/header.png',
      qr_code: 'M1JONES/FARBOUND  CG4X7U nawouehgawgnapwi3jfa0wfh',
      above_bar_code_image_url: 'https://www.example.com/en/PLAT.png',
      flight_info: {
        flight_number: 'KL0642',
        departure_airport: {
          airport_code: 'JFK',
          city: 'New York',
          terminal: 'T1',
          gate: 'D57',
        },
        arrival_airport: {
          airport_code: 'AMS',
          city: 'Amsterdam',
        },
        flight_schedule: {
          departure_time: '2016-01-02T19:05',
          arrival_time: '2016-01-05T17:30',
        },
      },
    },
  ],
});
```

<br />

#### `sendAirlineCheckinTemplate(attributes [, options])` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference/airline-checkin-template)

Send airline checkin message templates to the user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

<img src="https://user-images.githubusercontent.com/3382565/37411010-bfb3d8a2-27dc-11e8-91de-30653cf2d62c.png" alt="sendAirlineCheckinTemplate" width="250" />

| Param      | Type     | Description                                                                                                                                       |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| attributes | `Object` | [payload](https://developers.facebook.com/docs/messenger-platform/send-api-reference/airline-checkin-template#payload) of checkin template.       |
| options    | `Object` | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types). |

Example:

```js
context.sendAirlineCheckinTemplate({
  intro_message: 'Check-in is available now.',
  locale: 'en_US',
  pnr_number: 'ABCDEF',
  flight_info: [
    {
      flight_number: 'f001',
      departure_airport: {
        airport_code: 'SFO',
        city: 'San Francisco',
        terminal: 'T4',
        gate: 'G8',
      },
      arrival_airport: {
        airport_code: 'SEA',
        city: 'Seattle',
        terminal: 'T4',
        gate: 'G8',
      },
      flight_schedule: {
        boarding_time: '2016-01-05T15:05',
        departure_time: '2016-01-05T15:45',
        arrival_time: '2016-01-05T17:30',
      },
    },
  ],
  checkin_url: 'https://www.airline.com/check-in',
});
```

<br />

#### `sendAirlineItineraryTemplate(attributes [, options])` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference/airline-itinerary-template)

Send airline itinerary message templates to the user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

<img src="https://user-images.githubusercontent.com/3382565/37411025-ce27545e-27dc-11e8-91be-28ab27644db7.png" alt="sendAirlineItineraryTemplate" width="600" />

| Param      | Type     | Description                                                                                                                                       |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| attributes | `Object` | [payload](https://developers.facebook.com/docs/messenger-platform/send-api-reference/airline-itinerary-template#payload) of itinerary template.   |
| options    | `Object` | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types). |

Example:

```js
context.sendAirlineItineraryTemplate({
  intro_message: "Here's your flight itinerary.",
  locale: 'en_US',
  pnr_number: 'ABCDEF',
  passenger_info: [
    {
      name: 'Farbound Smith Jr',
      ticket_number: '0741234567890',
      passenger_id: 'p001',
    },
    {
      name: 'Nick Jones',
      ticket_number: '0741234567891',
      passenger_id: 'p002',
    },
  ],
  flight_info: [
    {
      connection_id: 'c001',
      segment_id: 's001',
      flight_number: 'KL9123',
      aircraft_type: 'Boeing 737',
      departure_airport: {
        airport_code: 'SFO',
        city: 'San Francisco',
        terminal: 'T4',
        gate: 'G8',
      },
      arrival_airport: {
        airport_code: 'SLC',
        city: 'Salt Lake City',
        terminal: 'T4',
        gate: 'G8',
      },
      flight_schedule: {
        departure_time: '2016-01-02T19:45',
        arrival_time: '2016-01-02T21:20',
      },
      travel_class: 'business',
    },
    {
      connection_id: 'c002',
      segment_id: 's002',
      flight_number: 'KL321',
      aircraft_type: 'Boeing 747-200',
      travel_class: 'business',
      departure_airport: {
        airport_code: 'SLC',
        city: 'Salt Lake City',
        terminal: 'T1',
        gate: 'G33',
      },
      arrival_airport: {
        airport_code: 'AMS',
        city: 'Amsterdam',
        terminal: 'T1',
        gate: 'G33',
      },
      flight_schedule: {
        departure_time: '2016-01-02T22:45',
        arrival_time: '2016-01-03T17:20',
      },
    },
  ],
  passenger_segment_info: [
    {
      segment_id: 's001',
      passenger_id: 'p001',
      seat: '12A',
      seat_type: 'Business',
    },
    {
      segment_id: 's001',
      passenger_id: 'p002',
      seat: '12B',
      seat_type: 'Business',
    },
    {
      segment_id: 's002',
      passenger_id: 'p001',
      seat: '73A',
      seat_type: 'World Business',
      product_info: [
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
      segment_id: 's002',
      passenger_id: 'p002',
      seat: '73B',
      seat_type: 'World Business',
      product_info: [
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
  price_info: [
    {
      title: 'Fuel surcharge',
      amount: '1597',
      currency: 'USD',
    },
  ],
  base_price: '12206',
  tax: '200',
  total_price: '14003',
  currency: 'USD',
});
```

<br />

#### `sendAirlineFlightUpdateTemplate(attributes [, options])` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference/airline-update-template)

Send airline flight update message templates to the user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request).

<img src="https://user-images.githubusercontent.com/3382565/37411064-e3005a56-27dc-11e8-8486-4fc548ad7b1a.png" alt="sendAirlineFlightUpdateTemplate" width="250" />

| Param      | Type     | Description                                                                                                                                       |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| attributes | `Object` | [payload](https://developers.facebook.com/docs/messenger-platform/send-api-reference/airline-update-template#payload) of update template.         |
| options    | `Object` | Other optional parameters. For example, [messaging types](https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types). |

Example:

```js
context.sendAirlineFlightUpdateTemplate({
  intro_message: 'Your flight is delayed',
  update_type: 'delay',
  locale: 'en_US',
  pnr_number: 'CF23G2',
  update_flight_info: {
    flight_number: 'KL123',
    departure_airport: {
      airport_code: 'SFO',
      city: 'San Francisco',
      terminal: 'T4',
      gate: 'G8',
    },
    arrival_airport: {
      airport_code: 'AMS',
      city: 'Amsterdam',
      terminal: 'T4',
      gate: 'G8',
    },
    flight_schedule: {
      boarding_time: '2015-12-26T10:30',
      departure_time: '2015-12-26T11:30',
      arrival_time: '2015-12-27T07:30',
    },
  },
});
```

<br />

<a id="quick-replies" />

### Quick Replies - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-api-reference/quick-replies)

<img src="https://user-images.githubusercontent.com/3382565/37411344-91c8ad54-27dd-11e8-82fc-fd9adf896301.png" alt="Quick Replies" width="750" />

To send messages with quick replies to the user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request), pass `quick_replies` option to send message methods, for example, with `sendText`:

```js
context.sendText('Pick a color:', {
  quick_replies: [
    {
      content_type: 'text',
      title: 'Red',
      payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED',
    },
  ],
});
```

with `sendImage`:

```js
context.sendImage('https://example.com/vr.jpg', {
  quick_replies: [
    {
      content_type: 'text',
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

<br />

#### `sendSenderAction(action)`

Send sender actions to the user using the [Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api#request), to let users know you are processing their request.

| Param  | Type     | Description         |
| ------ | -------- | ------------------- |
| action | `String` | Name of the action. |

Example:

```js
context.sendSenderAction('typing_on');
```

<br />

#### `markSeen()`

Mark last message as read for the user.

Example:

```js
context.markSeen();
```

<br />

#### `typingOn()`

Turn typing indicators on for the user.

Example:

```js
context.typingOn();
```

<br />

#### `typingOff()`

Turn typing indicators off for the user.

Example:

```js
context.typingOff();
```

<br />

<a id="targeting-broadcast-messages" />

### Targeting Broadcast Messages - [Official Docs](https://developers.facebook.com/docs/messenger-platform/send-messages/broadcast-messages/target-broadcasts)

#### `associateLabel(labelId)`

Associating a Label to the user

| Param   | Type     | Description             |
| ------- | -------- | ----------------------- |
| labelId | `String` | ID of the custom label. |

Example:

```js
context.associateLabel(LABEL_ID);
```

<br />

#### `dissociateLabel(labelId)`

Removing a Label from the user.

| Param   | Type     | Description             |
| ------- | -------- | ----------------------- |
| labelId | `String` | ID of the custom label. |

Example:

```js
context.dissociateLabel(LABEL_ID);
```

<br />

#### `getAssociatedLabels()`

Retrieving Labels Associated with the user.

Example:

```js
context.getAssociatedLabels().then((result) => {
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

<a id="user-profile-api" />

### User Profile API - [Official Docs](https://developers.facebook.com/docs/messenger-platform/user-profile)

#### `getUserProfile()`

Retrieving profile of the user.

Example:

```js
context.getUserProfile().then((user) => {
  console.log(user);
  // {
  //   first_name: 'Johnathan',
  //   last_name: 'Jackson',
  //   profile_pic: 'https://example.com/pic.png',
  //   locale: 'en_US',
  //   timezone: 8,
  //   gender: 'male',
  // }
});
```

<br />

### Handover Protocol API

#### `passThreadControl(targetAppId [, metadata])` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/pass-thread-control)

Passes control of the thread from your app to another app.

| Param       | Type     | Description                                                                      |
| ----------- | -------- | -------------------------------------------------------------------------------- |
| targetAppId | `Number` | The app ID of the Secondary Receiver to pass thread control to.                  |
| metadata    | `String` | Metadata passed to the receiving app in the `pass_thread_control` webhook event. |

Example:

```js
context.passThreadControl(APP_ID);
```

<br />

#### `passThreadControlToPageInbox(metadata)` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/handover-protocol/pass-thread-control#page_inbox)

Passes control of the thread from your app to "Page Inbox" app.

| Param    | Type     | Description                                                                      |
| -------- | -------- | -------------------------------------------------------------------------------- |
| metadata | `String` | Metadata passed to the receiving app in the `pass_thread_control` webhook event. |

Example:

```js
context.passThreadControlToPageInbox();
```

<br />

#### `takeThreadControl(metadata)` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/take-thread-control)

Takes control of the thread from a Secondary Receiver app.

| Param    | Type     | Description                                                                           |
| -------- | -------- | ------------------------------------------------------------------------------------- |
| metadata | `String` | Metadata passed back to the secondary app in the `take_thread_control` webhook event. |

Example:

```js
context.takeThreadControl();
```

<br />

#### `requestThreadControl(metadata)` - [Official Docs](https://developers.facebook.com/docs/messenger-platform/handover-protocol/request-thread-control/)

Requests control of the thread from a Primary Receiver app.

| Param    | Type     | Description                                                                       |
| -------- | -------- | --------------------------------------------------------------------------------- |
| metadata | `String` | Metadata passed to the primary app in the `request_thread_control` webhook event. |

Example:

```js
context.requestThreadControl();
```

<br />
