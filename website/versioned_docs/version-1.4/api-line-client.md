---
id: version-1.4-api-line-client
title: LineClient
original_id: api-line-client
---

- [Usage](#usage)
- [Methods](#methods)
  - [Reply API](#reply-api)
    - [Imagemap Messages](#reply-imagemap-messages)
    - [Template Messages](#reply-template-messages)
    - [Flex Messages](#reply-flex-messages)
  - [Push API](#push-api)
    - [Imagemap Messages](#push-imagemap-messages)
    - [Template Messages](#push-template-messages)
    - [Flex Messages](#push-flex-messages)
  - [Multicast API](#multicast-api)
    - [Imagemap Messages](#multicast-imagemap-messages)
    - [Template Messages](#multicast-template-messages)
    - [Flex Messages](#multicast-flex-messages)
  - [Quick Replies](#quick-replies)
  - [Content API](#content-api)
  - [Profile API](#profile-api)
  - [Group/Room Member Profile API](#grouproom-member-profile-api)
  - [Group/Room Member IDs API](#grouproom-member-ids-api)
  - [Leave API](#leave-api)
  - [Rich Menu API](#rich-menu-api)
  - [Account Link API](#account-link-api)
  - [LINE Front-end Framework API](#liff-api)
- [Debug Tips](#debug-tips)
- [Test](#test)

## Usage

Get the `LineClient` instance using the `getClient` function:

```js
const { getClient } = require('bottender');

// This `client` variable is a `LineClient` instance
const client = getClient('line');

await client.pushText(USER_ID, 'Hello!');
```

Or, get the `LineClient` instance from the `context`:

```js
async function MyAction(context) {
  if (context.platform === 'line') {
    // `context.client` is a `LineClient` instance
    await context.client.pushText(USER_ID, 'Hello!');
  }
}
```

### Error Handling

`LineClient` uses [axios](https://github.com/axios/axios) as HTTP client. We use [axios-error](https://github.com/Yoctol/messaging-apis/tree/master/packages/axios-error) package to wrap API error instances for better formatting error messages. Directly `console.log` on the error instance will return the formatted message. If you'd like to get the axios `request`, `response`, or `config`, you can still get them via those keys on the error instance.

```js
client.replyText(token, text).catch(error => {
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

<a id="reply-api" />

### Reply API - [Official Docs](https://developers.line.me/en/reference/messaging-api/#send-reply-message)

Responds to events from users, groups, and rooms.

#### `reply(token, messages)`

Responds messages using specified reply token.

| Param    | Type            | Description                                                             |
| -------- | --------------- | ----------------------------------------------------------------------- |
| token    | `String`        | `replyToken` received via webhook.                                      |
| messages | `Array<Object>` | Array of objects which contains the contents of the message to be sent. |

Example:

```js
client.reply(REPLY_TOKEN, [
  {
    type: 'text',
    text: 'Hello!',
  },
]);
```

`replyToken` can only be used once, but you can send up to 5 messages using the same token.

```js
const { Line } = require('messaging-api-line');

client.reply(REPLY_TOKEN, [
  Line.createText('Hello'),
  Line.createImage({
    originalContentUrl: 'https://example.com/original.jpg',
    previewImageUrl: 'https://example.com/preview.jpg',
  }),
  Line.createText('End'),
]);
```

There are a bunch of factory methods can be used to create messages:

- `Line.createText(text, options)`
- `Line.createImage(image, options)`
- `Line.createVideo(video, options)`
- `Line.createAudio(audio, options)`
- `Line.createLocation(location, options)`
- `Line.createSticker(sticker, options)`
- `Line.createImagemap(altText, imagemap, options)`
- `Line.createTemplate(altText, template, options)`
- `Line.createButtonTemplate(altText, buttonTemplate, options)`
- `Line.createConfirmTemplate(altText, confirmTemplate, options)`
- `Line.createCarouselTemplate(altText, columns, options)`
- `Line.createImageCarouselTemplate(altText, columns, options)`
- `Line.createFlex(altText, contents, options)`

<br />

#### `replyText(token, text, options)` - [Official Docs](https://developers.line.me/en/reference/messaging-api/#text-message)

Responds text message using specified reply token.

<img src="https://developers.line.biz/assets/img/text.c8ca7daf.png" width="250px" />

You can include LINE original emoji in text messages using character codes. For a list of LINE emoji that can be sent in LINE chats, see the [emoji list](https://developers.line.me/media/messaging-api/emoji-list.pdf).

<img src="https://developers.line.biz/assets/img/emoji.c6a7d7b7.png" width="250px" />

| Param                    | Type     | Description                                  |
| ------------------------ | -------- | -------------------------------------------- |
| token                    | `String` | `replyToken` received via webhook.           |
| text                     | `String` | Text of the message to be sent.              |
| options                  | `Object` | Optional options.                            |
| options.quickReply       | `Object` | Quick reply object to attach to the message. |
| options.quickReply.items | `Array`  | Quick reply items.                           |

Example:

```js
client.replyText(REPLY_TOKEN, 'Hello!');
```

<br />

#### `replyImage(token, image, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#image-message)

Responds image message using specified reply token.

<img src="https://developers.line.biz/assets/img/image.4e7ca2a6.png" width="250px" /><img src="https://developers.line.biz/assets/img/image-full.e1c37915.png" width="250px" />

| Param                    | Type     | Description                                  |
| ------------------------ | -------- | -------------------------------------------- |
| token                    | `String` | `replyToken` received via webhook.           |
| image.originalContentUrl | `String` | Image URL.                                   |
| image.previewImageUrl    | `String` | Preview image URL.                           |
| options                  | `Object` | Optional options.                            |
| options.quickReply       | `Object` | Quick reply object to attach to the message. |
| options.quickReply.items | `Array`  | Quick reply items.                           |

Example:

```js
client.replyImage(REPLY_TOKEN, {
  originalContentUrl: 'https://example.com/original.jpg',
  previewImageUrl: 'https://example.com/preview.jpg',
});
```

<br />

#### `replyVideo(token, video, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#video-message)

Responds video message using specified reply token.

<img src="https://developers.line.biz/assets/img/video.603d29d7.png" width="250px" />

| Param                    | Type     | Description                                  |
| ------------------------ | -------- | -------------------------------------------- |
| token                    | `String` | `replyToken` received via webhook.           |
| video.originalContentUrl | `String` | URL of video file.                           |
| video.previewImageUrl    | `String` | URL of preview image.                        |
| options                  | `Object` | Optional options.                            |
| options.quickReply       | `Object` | Quick reply object to attach to the message. |
| options.quickReply.items | `Array`  | Quick reply items.                           |

Example:

```js
client.replyVideo(REPLY_TOKEN, {
  originalContentUrl: 'https://example.com/original.mp4',
  previewImageUrl: 'https://example.com/preview.jpg',
});
```

<br />

#### `replyAudio(token, audio, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#audio-message)

Responds audio message using specified reply token.

<img src="data:image/png;base64,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" width="250px" />

| Param                    | Type     | Description                                  |
| ------------------------ | -------- | -------------------------------------------- |
| token                    | `String` | `replyToken` received via webhook.           |
| audio.originalContentUrl | `String` | URL of audio file.                           |
| audio.duration           | `Number` | Length of audio file (milliseconds).         |
| options                  | `Object` | Optional options.                            |
| options.quickReply       | `Object` | Quick reply object to attach to the message. |
| options.quickReply.items | `Array`  | Quick reply items.                           |

Example:

```js
client.replyAudio(REPLY_TOKEN, {
  originalContentUrl: 'https://example.com/original.m4a',
  duration: 240000,
});
```

<br />

#### `replyLocation(token, location, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#location-message)

Responds location message using specified reply token.

<img src="data:image/png;base64,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" width="250px" />

| Param                    | Type     | Description                                  |
| ------------------------ | -------- | -------------------------------------------- |
| token                    | `String` | `replyToken` received via webhook.           |
| location                 | `Object` | Object contains location's parameters.       |
| location.title           | `String` | Title of the location.                       |
| location.address         | `String` | Address of the location.                     |
| location.latitude        | `Number` | Latitude of the location.                    |
| location.longitude       | `Number` | Longitude of the location.                   |
| options                  | `Object` | Optional options.                            |
| options.quickReply       | `Object` | Quick reply object to attach to the message. |
| options.quickReply.items | `Array`  | Quick reply items.                           |

Example:

```js
client.replyLocation(REPLY_TOKEN, {
  title: 'my location',
  address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
  latitude: 35.65910807942215,
  longitude: 139.70372892916203,
});
```

<br />

#### `replySticker(token, sticker, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#sticker-message)

Responds sticker message using specified reply token.  
For a list of stickers that can be sent with the Messaging API, see the [sticker list](https://developers.line.me/media/messaging-api/messages/sticker_list.pdf).

<img src="https://developers.line.biz/assets/img/sticker.d5384d1d.png" width="250px" />

| Param                    | Type     | Description                                  |
| ------------------------ | -------- | -------------------------------------------- |
| token                    | `String` | `replyToken` received via webhook.           |
| sticker.packageId        | `String` | Package ID.                                  |
| sticker.stickerId        | `String` | Sticker ID.                                  |
| options                  | `Object` | Optional options.                            |
| options.quickReply       | `Object` | Quick reply object to attach to the message. |
| options.quickReply.items | `Array`  | Quick reply items.                           |

Example:

```js
client.replySticker(REPLY_TOKEN, { packageId: '1', stickerId: '1' });
```

<br />

### Reply Imagemap Messages

#### `replyImagemap(token, altText, imagemap, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#imagemap-message)

Responds imagemap message using specified reply token.

<img src="https://developers.line.biz/assets/img/imagemap.02b6a337.png" width="250px" />

| Param                               | Type            | Description                                                                                 |
| ----------------------------------- | --------------- | ------------------------------------------------------------------------------------------- |
| token                               | `String`        | `replyToken` received via webhook.                                                          |
| altText                             | `String`        | Alternative text.                                                                           |
| imagemap                            | `Object`        | Object contains imagemap's parameters.                                                      |
| imagemap.baseUrl                    | `String`        | Base URL of image.                                                                          |
| imagemap.baseSize                   | `Object`        | Base size object.                                                                           |
| imagemap.baseSize.width             | `Number`        | Width of base image.                                                                        |
| imagemap.baseSize.height            | `Number`        | Height of base image.                                                                       |
| imagemap.video                      | `Object`        | Video object.                                                                               |
| imagemap.video.originalContentUrl   | `String`        | URL of the video file (Max: 1000 characters).                                               |
| imagemap.video.previewImageUrl      | `String`        | URL of the preview image (Max: 1000 characters).                                            |
| imagemap.video.area.x               | `Number`        | Horizontal position of the video area relative to the top-left corner of the imagemap area. |
| imagemap.video.area.y               | `Number`        | Vertical position of the video area relative to the top-left corner of the imagemap area.   |
| imagemap.video.area.width           | `Number`        | Width of the video area.                                                                    |
| imagemap.video.area.height          | `Number`        | Height of the video area.                                                                   |
| imagemap.video.externalLink.linkUri | `String`        | Webpage URL. Called when the label displayed after the video is tapped.                     |
| imagemap.video.externalLink.label   | `String`        | Label. Displayed after the video is finished.                                               |
| imagemap.actions                    | `Array<Object>` | Action when tapped.                                                                         |
| options                             | `Object`        | Optional options.                                                                           |
| options.quickReply                  | `Object`        | Quick reply object to attach to the message.                                                |
| options.quickReply.items            | `Array`         | Quick reply items.                                                                          |

Example:

```js
client.replyImagemap(REPLY_TOKEN, 'this is an imagemap', {
  baseUrl: 'https://example.com/bot/images/rm001',
  baseSize: {
    width: 1040,
    height: 1040,
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
});
```

<br />

### Reply Template Messages

#### `replyTemplate(token, altText, template, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#template-messages)

Responds template message using specified reply token.

| Param                    | Type     | Description                                  |
| ------------------------ | -------- | -------------------------------------------- |
| token                    | `String` | `replyToken` received via webhook.           |
| altText                  | `String` | Alternative text.                            |
| template                 | `Object` | Object with the contents of the template.    |
| options                  | `Object` | Optional options.                            |
| options.quickReply       | `Object` | Quick reply object to attach to the message. |
| options.quickReply.items | `Array`  | Quick reply items.                           |

Example:

```js
client.replyTemplate(REPLY_TOKEN, 'this is a template', {
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
});
```

<br />

#### `replyButtonTemplate(token, altText, buttonTemplate, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#buttons)

Alias: `replyButtonsTemplate`.

Responds button template message using specified reply token.

<img src="https://developers.line.biz/assets/img/buttons.5b4297f2.png" width="250px" />

| Param                               | Type            | Description                                                                                   |
| ----------------------------------- | --------------- | --------------------------------------------------------------------------------------------- |
| token                               | `String`        | `replyToken` received via webhook.                                                            |
| altText                             | `String`        | Alternative text.                                                                             |
| buttonTemplate                      | `Object`        | Object contains buttonTemplate's parameters.                                                  |
| buttonTemplate.thumbnailImageUrl    | `String`        | Image URL of buttonTemplate.                                                                  |
| buttonTemplate.imageAspectRatio     | `String`        | Aspect ratio of the image. Specify one of the following values: `rectangle`, `square`         |
| buttonTemplate.imageSize            | `String`        | Size of the image. Specify one of the following values: `cover`, `contain`                    |
| buttonTemplate.imageBackgroundColor | `String`        | Background color of image. Specify a RGB color value. The default value is `#FFFFFF` (white). |
| buttonTemplate.title                | `String`        | Title of buttonTemplate.                                                                      |
| buttonTemplate.text                 | `String`        | Message text of buttonTemplate.                                                               |
| buttonTemplate.defaultAction        | `Object`        | Action when image is tapped; set for the entire image, title, and text area.                  |
| buttonTemplate.actions              | `Array<Object>` | Action when tapped.                                                                           |
| options                             | `Object`        | Optional options.                                                                             |
| options.quickReply                  | `Object`        | Quick reply object to attach to the message.                                                  |
| options.quickReply.items            | `Array`         | Quick reply items.                                                                            |

Example:

```js
client.replyButtonTemplate(REPLY_TOKEN, 'this is a template', {
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
});
```

<br />

#### `replyConfirmTemplate(token, altText, confirmTemplate, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#confirm)

Responds confirm template message using specified reply token.

<img src="data:image/png;base64,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" width="250px" />

| Param                    | Type            | Description                                   |
| ------------------------ | --------------- | --------------------------------------------- |
| token                    | `String`        | `replyToken` received via webhook.            |
| altText                  | `String`        | Alternative text.                             |
| confirmTemplate          | `Object`        | Object contains confirmTemplate's parameters. |
| confirmTemplate.text     | `String`        | Message text of confirmTemplate.              |
| confirmTemplate.actions  | `Array<Object>` | Action when tapped.                           |
| options                  | `Object`        | Optional options.                             |
| options.quickReply       | `Object`        | Quick reply object to attach to the message.  |
| options.quickReply.items | `Array`         | Quick reply items.                            |

Example:

```js
client.replyConfirmTemplate(REPLY_TOKEN, 'this is a confirm template', {
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
});
```

<br />

#### `replyCarouselTemplate(token, altText, carouselItems, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#carousel)

Responds carousel template message using specified reply token.

<img src="https://developers.line.biz/assets/img/carousel.d89a53f5.png" width="250px" />

| Param                    | Type            | Description                                                                           |
| ------------------------ | --------------- | ------------------------------------------------------------------------------------- |
| token                    | `String`        | `replyToken` received via webhook.                                                    |
| altText                  | `String`        | Alternative text.                                                                     |
| carouselItems            | `Array<Object>` | Array of columns which contains object for carousel.                                  |
| options                  | `Object`        | Object contains options.                                                              |
| options.imageAspectRatio | `String`        | Aspect ratio of the image. Specify one of the following values: `rectangle`, `square` |
| options.imageSize        | `String`        | Size of the image. Specify one of the following values: `cover`, `contain`            |
| options.quickReply       | `Object`        | Quick reply object to attach to the message.                                          |
| options.quickReply.items | `Array`         | Quick reply items.                                                                    |

Example:

```js
client.replyCarouselTemplate(REPLY_TOKEN, 'this is a carousel template', [
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
]);
```

<br />

#### `replyImageCarouselTemplate(token, altText, carouselItems, options)` - [Official Docs](https://developers.line.me/en/reference/messaging-api/#image-carousel)

Responds image carousel template message using specified reply token.

<img src="https://developers.line.biz/assets/img/image-carousel.cb44b979.png" width="250px" />

| Param                    | Type            | Description                                                |
| ------------------------ | --------------- | ---------------------------------------------------------- |
| token                    | `String`        | `replyToken` received via webhook.                         |
| altText                  | `String`        | Alternative text.                                          |
| carouselItems            | `Array<Object>` | Array of columns which contains object for image carousel. |
| options                  | `Object`        | Optional options.                                          |
| options.quickReply       | `Object`        | Quick reply object to attach to the message.               |
| options.quickReply.items | `Array`         | Quick reply items.                                         |

Example:

```js
client.replyImageCarouselTemplate(
  REPLY_TOKEN,
  'this is an image carousel template',
  [
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
  ]
);
```

<br />

### Reply Flex Messages

#### `replyFlex(token, altText, contents, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#flex-message)

Responds flex message using specified reply token.

<img src="https://developers.line.biz/assets/img/bubbleSamples-Update1.96cf1f73.png" />

| Param                    | Type     | Description                                                                                             |
| ------------------------ | -------- | ------------------------------------------------------------------------------------------------------- |
| token                    | `String` | `replyToken` received via webhook.                                                                      |
| altText                  | `String` | Alternative text.                                                                                       |
| contents                 | `Object` | Flex Message [container](https://developers.line.me/en/mreference/essaging-api/#container) object. |
| options                  | `Object` | Optional options.                                                                                       |
| options.quickReply       | `Object` | Quick reply object to attach to the message.                                                            |
| options.quickReply.items | `Array`  | Quick reply items.                                                                                      |

Example:

```js
client.replyFlex(REPLY_TOKEN, 'this is a flex', {
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
});
```

<br />

<a id="push-api" />

### Push API - [Official Docs](https://developers.line.me/en/reference/messaging-api/#send-push-message)

Sends messages to a user, group, or room at any time.

#### `push(userId, messages)`

Sends messages using ID of the receiver.

| Param    | Type            | Description                                                             |
| -------- | --------------- | ----------------------------------------------------------------------- |
| userId   | `String`        | ID of the receiver.                                                     |
| messages | `Array<Object>` | Array of objects which contains the contents of the message to be sent. |

Example:

```js
client.push(USER_ID, [
  {
    type: 'text',
    text: 'Hello!',
  },
]);
```

<br />

#### `pushText(userId, text, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#text-message)

Sends text message using ID of the receiver.

<img src="https://developers.line.biz/assets/img/text.c8ca7daf.png" width="250px" />

You can include LINE original emoji in text messages using character codes. For a list of LINE emoji that can be sent in LINE chats, see the [emoji list](https://developers.line.me/media/messaging-api/emoji-list.pdf).

<img src="https://developers.line.biz/assets/img/emoji.c6a7d7b7.png" width="250px" />

| Param                    | Type     | Description                                  |
| ------------------------ | -------- | -------------------------------------------- |
| userId                   | `String` | ID of the receiver.                          |
| text                     | `String` | Text of the message to be sent.              |
| options                  | `Object` | Optional options.                            |
| options.quickReply       | `Object` | Quick reply object to attach to the message. |
| options.quickReply.items | `Array`  | Quick reply items.                           |

Example:

```js
client.pushText(USER_ID, 'Hello!');
```

<br />

#### `pushImage(userId, image, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#image-message)

Sends image message using ID of the receiver.

<img src="https://developers.line.biz/assets/img/image.4e7ca2a6.png" width="250px" /><img src="https://developers.line.biz/assets/img/image-full.e1c37915.png" width="250px" />

| Param                    | Type     | Description                                  |
| ------------------------ | -------- | -------------------------------------------- |
| userId                   | `String` | ID of the receiver.                          |
| image.originalContentUrl | `String` | Image URL.                                   |
| image.previewImageUrl    | `String` | Preview image URL.                           |
| options                  | `Object` | Optional options.                            |
| options.quickReply       | `Object` | Quick reply object to attach to the message. |
| options.quickReply.items | `Array`  | Quick reply items.                           |

Example:

```js
client.pushImage(USER_ID, {
  originalContentUrl: 'https://example.com/original.jpg',
  previewImageUrl: 'https://example.com/preview.jpg',
});
```

<br />

#### `pushVideo(userId, video, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#video-message)

Sends video message using ID of the receiver.

<img src="https://developers.line.biz/assets/img/video.603d29d7.png" width="250px" />

| Param                    | Type     | Description                                  |
| ------------------------ | -------- | -------------------------------------------- |
| userId                   | `String` | ID of the receiver.                          |
| video.originalContentUrl | `String` | URL of video file.                           |
| video.previewImageUrl    | `String` | URL of preview image.                        |
| options                  | `Object` | Optional options.                            |
| options.quickReply       | `Object` | Quick reply object to attach to the message. |
| options.quickReply.items | `Array`  | Quick reply items.                           |

Example:

```js
client.pushVideo(USER_ID, {
  originalContentUrl: 'https://example.com/original.mp4',
  previewImageUrl: 'https://example.com/preview.jpg',
});
```

<br />

#### `pushAudio(userId, audio, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#audio-message)

Sends audio message using ID of the receiver.

<img src="data:image/png;base64,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" width="250px" />

| Param                    | Type     | Description                                  |
| ------------------------ | -------- | -------------------------------------------- |
| userId                   | `String` | ID of the receiver.                          |
| audio.originalContentUrl | `String` | URL of audio file.                           |
| audio.duration           | `Number` | Length of audio file (milliseconds).         |
| options                  | `Object` | Optional options.                            |
| options.quickReply       | `Object` | Quick reply object to attach to the message. |
| options.quickReply.items | `Array`  | Quick reply items.                           |

Example:

```js
client.pushAudio(USER_ID, {
  originalContentUrl: 'https://example.com/original.m4a',
  duration: 240000,
});
```

<br />

#### `pushLocation(userId, location, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#location-message)

Sends location message using ID of the receiver.

<img src="data:image/png;base64,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" width="250px" />

| Param                    | Type     | Description                                  |
| ------------------------ | -------- | -------------------------------------------- |
| userId                   | `String` | ID of the receiver.                          |
| location                 | `Object` | Object contains location's parameters.       |
| location.title           | `String` | Title of the location.                       |
| location.address         | `String` | Address of the location.                     |
| location.latitude        | `Number` | Latitude of the location.                    |
| location.longitude       | `Number` | Longitude of the location.                   |
| options                  | `Object` | Optional options.                            |
| options.quickReply       | `Object` | Quick reply object to attach to the message. |
| options.quickReply.items | `Array`  | Quick reply items.                           |

Example:

```js
client.pushLocation(USER_ID, {
  title: 'my location',
  address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
  latitude: 35.65910807942215,
  longitude: 139.70372892916203,
});
```

<br />

#### `pushSticker(userId, sticker, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#sticker-message)

Sends sticker message using ID of the receiver.  
For a list of stickers that can be sent with the Messaging API, see the [sticker list](https://developers.line.me/media/messaging-api/messages/sticker_list.pdf).

<img src="https://developers.line.biz/assets/img/sticker.d5384d1d.png" width="250px" />

| Param                    | Type     | Description                                  |
| ------------------------ | -------- | -------------------------------------------- |
| userId                   | `String` | ID of the receiver.                          |
| sticker.packageId        | `String` | Package ID.                                  |
| sticker.stickerId        | `String` | Sticker ID.                                  |
| options                  | `Object` | Optional options.                            |
| options.quickReply       | `Object` | Quick reply object to attach to the message. |
| options.quickReply.items | `Array`  | Quick reply items.                           |

Example:

```js
client.pushSticker(USER_ID, { packageId: '1', stickerId: '1' });
```

<br />

### Push Imagemap Messages

#### `pushImagemap(userId, altText, imagemap, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#imagemap-message)

Sends imagemap message using ID of the receiver.

<img src="https://developers.line.biz/assets/img/imagemap.02b6a337.png" width="250px" />

| Param                               | Type            | Description                                                                                 |
| ----------------------------------- | --------------- | ------------------------------------------------------------------------------------------- |
| userId                              | `String`        | ID of the receiver.                                                                         |
| altText                             | `String`        | Alternative text.                                                                           |
| imagemap                            | `Object`        | Object contains imagemap's parameters.                                                      |
| imagemap.baseUrl                    | `String`        | Base URL of image.                                                                          |
| imagemap.baseSize                   | `Object`        | Base size object.                                                                           |
| imagemap.baseSize.width             | `Number`        | Width of base image.                                                                        |
| imagemap.baseSize.height            | `Number`        | Height of base image.                                                                       |
| imagemap.video                      | `Object`        | Video object.                                                                               |
| imagemap.video.originalContentUrl   | `String`        | URL of the video file (Max: 1000 characters).                                               |
| imagemap.video.previewImageUrl      | `String`        | URL of the preview image (Max: 1000 characters).                                            |
| imagemap.video.area.x               | `Number`        | Horizontal position of the video area relative to the top-left corner of the imagemap area. |
| imagemap.video.area.y               | `Number`        | Vertical position of the video area relative to the top-left corner of the imagemap area.   |
| imagemap.video.area.width           | `Number`        | Width of the video area.                                                                    |
| imagemap.video.area.height          | `Number`        | Height of the video area.                                                                   |
| imagemap.video.externalLink.linkUri | `String`        | Webpage URL. Called when the label displayed after the video is tapped.                     |
| imagemap.video.externalLink.label   | `String`        | Label. Displayed after the video is finished.                                               |
| imagemap.actions                    | `Array<Object>` | Action when tapped.                                                                         |
| options                             | `Object`        | Optional options.                                                                           |
| options.quickReply                  | `Object`        | Quick reply object to attach to the message.                                                |
| options.quickReply.items            | `Array`         | Quick reply items.                                                                          |

Example:

```js
client.pushImagemap(USER_ID, 'this is an imagemap', {
  baseUrl: 'https://example.com/bot/images/rm001',
  baseSize: {
    width: 1040,
    height: 1040,
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
});
```

<br />

### Push Template Messages

#### `pushTemplate(userId, altText, template, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#template-messages)

Sends template message using ID of the receiver.

| Param                    | Type     | Description                                  |
| ------------------------ | -------- | -------------------------------------------- |
| userId                   | `String` | ID of the receiver.                          |
| altText                  | `String` | Alternative text.                            |
| template                 | `Object` | Object with the contents of the template.    |
| options                  | `Object` | Optional options.                            |
| options.quickReply       | `Object` | Quick reply object to attach to the message. |
| options.quickReply.items | `Array`  | Quick reply items.                           |

Example:

```js
client.pushTemplate(USER_ID, 'this is a template', {
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
});
```

<br />

#### `pushButtonTemplate(userId, altText, buttonTemplate, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#buttons)

Alias: `pushButtonsTemplate`.

Sends button template message using ID of the receiver.

<img src="https://developers.line.biz/assets/img/buttons.5b4297f2.png" width="250px" />

| Param                               | Type            | Description                                                                                   |
| ----------------------------------- | --------------- | --------------------------------------------------------------------------------------------- |
| userId                              | `String`        | ID of the receiver.                                                                           |
| altText                             | `String`        | Alternative text.                                                                             |
| buttonTemplate                      | `Object`        | Object contains buttonTemplate's parameters.                                                  |
| buttonTemplate.thumbnailImageUrl    | `String`        | Image URL of buttonTemplate.                                                                  |
| buttonTemplate.imageAspectRatio     | `String`        | Aspect ratio of the image. Specify one of the following values: `rectangle`, `square`         |
| buttonTemplate.imageSize            | `String`        | Size of the image. Specify one of the following values: `cover`, `contain`                    |
| buttonTemplate.imageBackgroundColor | `String`        | Background color of image. Specify a RGB color value. The default value is `#FFFFFF` (white). |
| buttonTemplate.title                | `String`        | Title of buttonTemplate.                                                                      |
| buttonTemplate.text                 | `String`        | Message text of buttonTemplate.                                                               |
| buttonTemplate.defaultAction        | `Object`        | Action when image is tapped; set for the entire image, title, and text area.                  |
| buttonTemplate.actions              | `Array<Object>` | Action when tapped.                                                                           |
| options                             | `Object`        | Optional options.                                                                             |
| options.quickReply                  | `Object`        | Quick reply object to attach to the message.                                                  |
| options.quickReply.items            | `Array`         | Quick reply items.                                                                            |

Example:

```js
client.pushButtonTemplate(USER_ID, 'this is a template', {
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
});
```

<br />

#### `pushConfirmTemplate(userId, altText, confirmTemplate, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#confirm)

Sends confirm template message using ID of the receiver.

<img src="data:image/png;base64,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" width="250px" />

| Param                    | Type            | Description                                   |
| ------------------------ | --------------- | --------------------------------------------- |
| userId                   | `String`        | ID of the receiver.                           |
| altText                  | `String`        | Alternative text.                             |
| confirmTemplate          | `Object`        | Object contains confirmTemplate's parameters. |
| confirmTemplate.text     | `String`        | Message text of confirmTemplate.              |
| confirmTemplate.actions  | `Array<Object>` | Action when tapped.                           |
| options                  | `Object`        | Optional options.                             |
| options.quickReply       | `Object`        | Quick reply object to attach to the message.  |
| options.quickReply.items | `Array`         | Quick reply items.                            |

Example:

```js
client.pushConfirmTemplate(USER_ID, 'this is a confirm template', {
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
});
```

<br />

#### `pushCarouselTemplate(userId, altText, carouselItems, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#carousel)

Sends carousel template message using ID of the receiver.

<img src="https://developers.line.biz/assets/img/carousel.d89a53f5.png" width="250px" />

| Param                    | Type            | Description                                                                           |
| ------------------------ | --------------- | ------------------------------------------------------------------------------------- |
| userId                   | `String`        | ID of the receiver.                                                                   |
| altText                  | `String`        | Alternative text.                                                                     |
| carouselItems            | `Array<Object>` | Array of columns which contains object for carousel.                                  |
| options                  | `Object`        | Object contains options.                                                              |
| options.imageAspectRatio | `String`        | Aspect ratio of the image. Specify one of the following values: `rectangle`, `square` |
| options.imageSize        | `String`        | Size of the image. Specify one of the following values: `cover`, `contain`            |
| options.quickReply       | `Object`        | Quick reply object to attach to the message.                                          |
| options.quickReply.items | `Array`         | Quick reply items.                                                                    |

Example:

```js
client.pushCarouselTemplate(USER_ID, 'this is a carousel template', [
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
]);
```

<br />

#### `pushImageCarouselTemplate(userId, altText, carouselItems, options)` - [Official Docs](https://developers.line.me/en/reference/messaging-api/#image-carousel)

Sends image carousel template message using ID of the receiver.

<img src="https://developers.line.biz/assets/img/image-carousel.cb44b979.png" width="250px" />

| Param                    | Type            | Description                                                |
| ------------------------ | --------------- | ---------------------------------------------------------- |
| userId                   | `String`        | ID of the receiver.                                        |
| altText                  | `String`        | Alternative text.                                          |
| carouselItems            | `Array<Object>` | Array of columns which contains object for image carousel. |
| options                  | `Object`        | Optional options.                                          |
| options.quickReply       | `Object`        | Quick reply object to attach to the message.               |
| options.quickReply.items | `Array`         | Quick reply items.                                         |

Example:

```js
client.pushImageCarouselTemplate(
  USER_ID,
  'this is an image carousel template',
  [
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
  ]
);
```

<br />

### Push Flex Messages

#### `pushFlex(userId, altText, contents, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#flex-message)

Sends flex message using ID of the receiver.

<img src="https://developers.line.me/media/messaging-api/using-flex-messages/bubbleSample-77d825e6.png" />

| Param                    | Type     | Description                                                                                             |
| ------------------------ | -------- | ------------------------------------------------------------------------------------------------------- |
| userId                   | `String` | ID of the receiver.                                                                                     |
| altText                  | `String` | Alternative text.                                                                                       |
| contents                 | `Object` | Flex Message [container](https://developers.line.me/en/mreference/essaging-api/#container) object. |
| options                  | `Object` | Optional options.                                                                                       |
| options.quickReply       | `Object` | Quick reply object to attach to the message.                                                            |
| options.quickReply.items | `Array`  | Quick reply items.                                                                                      |

Example:

```js
client.pushFlex(USER_ID, 'this is a flex', {
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
});
```

<br />

<a id="multicast-api" />

### Multicast API - [Official Docs](https://developers.line.me/en/reference/messaging-api/#send-multicast-messages)

Sends messages to multiple users at any time.

#### `multicast(userIds, messages)`

Sends messages to multiple users.

| Param    | Type            | Description                                                             |
| -------- | --------------- | ----------------------------------------------------------------------- |
| userIds  | `Array<String>` | IDs of the receivers.                                                   |
| messages | `Array<Object>` | Array of objects which contains the contents of the message to be sent. |

Example:

```js
client.multicast(
  [USER_ID],
  [
    {
      type: 'text',
      text: 'Hello!',
    },
  ]
);
```

<br />

#### `multicastText(userIds, text, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#text-message)

Sends text message to multiple users.

<img src="https://developers.line.biz/assets/img/text.c8ca7daf.png" width="250px" />

You can include LINE original emoji in text messages using character codes. For a list of LINE emoji that can be sent in LINE chats, see the [emoji list](https://developers.line.me/media/messaging-api/emoji-list.pdf).

<img src="https://developers.line.biz/assets/img/emoji.c6a7d7b7.png" width="250px" />

| Param                    | Type            | Description                                  |
| ------------------------ | --------------- | -------------------------------------------- |
| userIds                  | `Array<String>` | IDs of the receivers.                        |
| text                     | `String`        | Text of the message to be sent.              |
| options                  | `Object`        | Optional options.                            |
| options.quickReply       | `Object`        | Quick reply object to attach to the message. |
| options.quickReply.items | `Array`         | Quick reply items.                           |

Example:

```js
client.multicastText([USER_ID], 'Hello!');
```

<br />

#### `multicastImage(userIds, image, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#image-message)

Sends image message to multiple users.

<img src="https://developers.line.biz/assets/img/image.4e7ca2a6.png" width="250px" /><img src="https://developers.line.biz/assets/img/image-full.e1c37915.png" width="250px" />

| Param                    | Type            | Description                                  |
| ------------------------ | --------------- | -------------------------------------------- |
| userIds                  | `Array<String>` | IDs of the receivers.                        |
| image.originalContentUrl | `String`        | Image URL.                                   |
| image.previewImageUrl    | `String`        | Preview image URL.                           |
| options                  | `Object`        | Optional options.                            |
| options.quickReply       | `Object`        | Quick reply object to attach to the message. |
| options.quickReply.items | `Array`         | Quick reply items.                           |

Example:

```js
client.multicastImage([USER_ID], {
  originalContentUrl: 'https://example.com/original.jpg',
  previewImageUrl: 'https://example.com/preview.jpg',
});
```

<br />

#### `multicastVideo(userIds, video, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#video-message)

Sends video message to multiple users.

<img src="https://developers.line.biz/assets/img/video.603d29d7.png" width="250px" />

| Param                    | Type            | Description                                  |
| ------------------------ | --------------- | -------------------------------------------- |
| userIds                  | `Array<String>` | IDs of the receivers.                        |
| video.originalContentUrl | `String`        | URL of video file.                           |
| video.previewImageUrl    | `String`        | URL of preview image.                        |
| options                  | `Object`        | Optional options.                            |
| options.quickReply       | `Object`        | Quick reply object to attach to the message. |
| options.quickReply.items | `Array`         | Quick reply items.                           |

Example:

```js
client.multicastVideo([USER_ID], {
  originalContentUrl: 'https://example.com/original.mp4',
  previewImageUrl: 'https://example.com/preview.jpg',
});
```

<br />

#### `multicastAudio(userIds, audio, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#audio-message)

Sends audio message to multiple users.

<img src="data:image/png;base64,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" width="250px" />

| Param                    | Type            | Description                                  |
| ------------------------ | --------------- | -------------------------------------------- |
| userIds                  | `Array<String>` | IDs of the receivers.                        |
| audio.originalContentUrl | `String`        | URL of audio file.                           |
| audio.duration           | `Number`        | Length of audio file (milliseconds).         |
| options                  | `Object`        | Optional options.                            |
| options.quickReply       | `Object`        | Quick reply object to attach to the message. |
| options.quickReply.items | `Array`         | Quick reply items.                           |

Example:

```js
client.multicastAudio([USER_ID], {
  originalContentUrl: 'https://example.com/original.m4a',
  duration: 240000,
});
```

<br />

#### `multicastLocation(userIds, location, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#location-message)

Sends location message to multiple users.

<img src="data:image/png;base64,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" width="250px" />

| Param                    | Type            | Description                                  |
| ------------------------ | --------------- | -------------------------------------------- |
| userIds                  | `Array<String>` | IDs of the receivers.                        |
| location                 | `Object`        | Object contains location's parameters.       |
| location.title           | `String`        | Title of the location.                       |
| location.address         | `String`        | Address of the location.                     |
| location.latitude        | `Number`        | Latitude of the location.                    |
| location.longitude       | `Number`        | Longitude of the location.                   |
| options                  | `Object`        | Optional options.                            |
| options.quickReply       | `Object`        | Quick reply object to attach to the message. |
| options.quickReply.items | `Array`         | Quick reply items.                           |

Example:

```js
client.multicastLocation([USER_ID], {
  title: 'my location',
  address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
  latitude: 35.65910807942215,
  longitude: 139.70372892916203,
});
```

<br />

#### `multicastSticker(userIds, sticker, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#sticker-message)

Sends sticker message to multiple users.  
For a list of stickers that can be sent with the Messaging API, see the [sticker list](https://developers.line.me/media/messaging-api/messages/sticker_list.pdf).

<img src="https://developers.line.biz/assets/img/sticker.d5384d1d.png" width="250px" />

| Param                    | Type            | Description                                  |
| ------------------------ | --------------- | -------------------------------------------- |
| userIds                  | `Array<String>` | IDs of the receivers.                        |
| sticker.packageId        | `String`        | Package ID.                                  |
| sticker.stickerId        | `String`        | Sticker ID.                                  |
| options                  | `Object`        | Optional options.                            |
| options.quickReply       | `Object`        | Quick reply object to attach to the message. |
| options.quickReply.items | `Array`         | Quick reply items.                           |

Example:

```js
client.multicastSticker([USER_ID], {
  packageId: '1',
  stickerId: '1',
});
```

<br />

### Multicast Imagemap Messages

#### `multicastImagemap(userIds, altText, imagemap, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#imagemap-message)

Sends imagemap message to multiple users.

<img src="https://developers.line.biz/assets/img/imagemap.02b6a337.png" width="250px" />

| Param                               | Type            | Description                                                                                 |
| ----------------------------------- | --------------- | ------------------------------------------------------------------------------------------- |
| userIds                             | `Array<String>` | IDs of the receivers.                                                                       |
| altText                             | `String`        | Alternative text.                                                                           |
| imagemap                            | `Object`        | Object contains imagemap's parameters.                                                      |
| imagemap.baseUrl                    | `String`        | Base URL of image.                                                                          |
| imagemap.baseSize                   | `Object`        | Base size object.                                                                           |
| imagemap.baseSize.width             | `Number`        | Width of base image.                                                                        |
| imagemap.baseSize.height            | `Number`        | Height of base image.                                                                       |
| imagemap.video                      | `Object`        | Video object.                                                                               |
| imagemap.video.originalContentUrl   | `String`        | URL of the video file (Max: 1000 characters).                                               |
| imagemap.video.previewImageUrl      | `String`        | URL of the preview image (Max: 1000 characters).                                            |
| imagemap.video.area.x               | `Number`        | Horizontal position of the video area relative to the top-left corner of the imagemap area. |
| imagemap.video.area.y               | `Number`        | Vertical position of the video area relative to the top-left corner of the imagemap area.   |
| imagemap.video.area.width           | `Number`        | Width of the video area.                                                                    |
| imagemap.video.area.height          | `Number`        | Height of the video area.                                                                   |
| imagemap.video.externalLink.linkUri | `String`        | Webpage URL. Called when the label displayed after the video is tapped.                     |
| imagemap.video.externalLink.label   | `String`        | Label. Displayed after the video is finished.                                               |
| imagemap.actions                    | `Array<Object>` | Action when tapped.                                                                         |
| options                             | `Object`        | Optional options.                                                                           |
| options.quickReply                  | `Object`        | Quick reply object to attach to the message.                                                |
| options.quickReply.items            | `Array`         | Quick reply items.                                                                          |

Example:

```js
client.multicastImagemap([USER_ID], 'this is an imagemap', {
  baseUrl: 'https://example.com/bot/images/rm001',
  baseSize: {
    width: 1040,
    height: 1040,
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
});
```

<br />

### Multicast Template Messages

#### `multicastTemplate(userIds, altText, template, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#template-messages)

Sends template message to multiple users.

| Param                    | Type            | Description                                  |
| ------------------------ | --------------- | -------------------------------------------- |
| userIds                  | `Array<String>` | IDs of the receivers.                        |
| altText                  | `String`        | Alternative text.                            |
| template                 | `Object`        | Object with the contents of the template.    |
| options                  | `Object`        | Optional options.                            |
| options.quickReply       | `Object`        | Quick reply object to attach to the message. |
| options.quickReply.items | `Array`         | Quick reply items.                           |

Example:

```js
client.multicastTemplate([USER_ID], 'this is a template', {
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
});
```

<br />

#### `multicastButtonTemplate(userIds, altText, buttonTemplate, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#buttons)

Alias: `multicastButtonsTemplate`.

Sends button template message to multiple users.

<img src="https://developers.line.biz/assets/img/buttons.5b4297f2.png" width="250px" />

| Param                               | Type            | Description                                                                                   |
| ----------------------------------- | --------------- | --------------------------------------------------------------------------------------------- |
| userIds                             | `Array<String>` | IDs of the receivers.                                                                         |
| altText                             | `String`        | Alternative text.                                                                             |
| buttonTemplate                      | `Object`        | Object contains buttonTemplate's parameters.                                                  |
| buttonTemplate.thumbnailImageUrl    | `String`        | Image URL of buttonTemplate.                                                                  |
| buttonTemplate.imageAspectRatio     | `String`        | Aspect ratio of the image. Specify one of the following values: `rectangle`, `square`         |
| buttonTemplate.imageSize            | `String`        | Size of the image. Specify one of the following values: `cover`, `contain`                    |
| buttonTemplate.imageBackgroundColor | `String`        | Background color of image. Specify a RGB color value. The default value is `#FFFFFF` (white). |
| buttonTemplate.title                | `String`        | Title of buttonTemplate.                                                                      |
| buttonTemplate.text                 | `String`        | Message text of buttonTemplate.                                                               |
| buttonTemplate.defaultAction        | `Object`        | Action when image is tapped; set for the entire image, title, and text area.                  |
| buttonTemplate.actions              | `Array<Object>` | Action when tapped.                                                                           |
| options                             | `Object`        | Optional options.                                                                             |
| options.quickReply                  | `Object`        | Quick reply object to attach to the message.                                                  |
| options.quickReply.items            | `Array`         | Quick reply items.                                                                            |

Example:

```js
client.multicastButtonTemplate([USER_ID], 'this is a template', {
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
});
```

<br />

#### `multicastConfirmTemplate(userIds, altText, confirmTemplate, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#confirm)

Sends confirm template message to multiple users.

<img src="data:image/png;base64,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" width="250px" />

| Param                    | Type            | Description                                   |
| ------------------------ | --------------- | --------------------------------------------- |
| userIds                  | `Array<String>` | IDs of the receivers.                         |
| altText                  | `String`        | Alternative text.                             |
| confirmTemplate          | `Object`        | Object contains confirmTemplate's parameters. |
| confirmTemplate.text     | `String`        | Message text of confirmTemplate.              |
| confirmTemplate.actions  | `Array<Object>` | Action when tapped.                           |
| options                  | `Object`        | Optional options.                             |
| options.quickReply       | `Object`        | Quick reply object to attach to the message.  |
| options.quickReply.items | `Array`         | Quick reply items.                            |

Example:

```js
client.multicastConfirmTemplate([USER_ID], 'this is a confirm template', {
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
});
```

<br />

#### `multicastCarouselTemplate(userIds, altText, carouselItems, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#carousel)

Sends carousel template message to multiple users.

<img src="https://developers.line.biz/assets/img/carousel.d89a53f5.png" width="250px" />

| Param                    | Type            | Description                                                                           |
| ------------------------ | --------------- | ------------------------------------------------------------------------------------- |
| userIds                  | `Array<String>` | IDs of the receivers.                                                                 |
| altText                  | `String`        | Alternative text.                                                                     |
| carouselItems            | `Array<Object>` | Array of columns which contains object for carousel.                                  |
| options                  | `Object`        | Object contains options.                                                              |
| options.imageAspectRatio | `String`        | Aspect ratio of the image. Specify one of the following values: `rectangle`, `square` |
| options.imageSize        | `String`        | Size of the image. Specify one of the following values: `cover`, `contain`            |
| options.quickReply       | `Object`        | Quick reply object to attach to the message.                                          |
| options.quickReply.items | `Array`         | Quick reply items.                                                                    |

Example:

```js
client.multicastCarouselTemplate([USER_ID], 'this is a carousel template', [
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
]);
```

<br />

#### `multicastImageCarouselTemplate(userIds, altText, carouselItems, options)` - [Official Docs](https://developers.line.me/en/reference/messaging-api/#image-carousel)

Sends image carousel template message to multiple users.

<img src="https://developers.line.biz/assets/img/image-carousel.cb44b979.png" width="250px" />

| Param                    | Type            | Description                                                |
| ------------------------ | --------------- | ---------------------------------------------------------- |
| userIds                  | `Array<String>` | IDs of the receivers.                                      |
| altText                  | `String`        | Alternative text.                                          |
| carouselItems            | `Array<Object>` | Array of columns which contains object for image carousel. |
| options                  | `Object`        | Optional options.                                          |
| options.quickReply       | `Object`        | Quick reply object to attach to the message.               |
| options.quickReply.items | `Array`         | Quick reply items.                                         |

Example:

```js
client.multicastImageCarouselTemplate(
  [USER_ID],
  'this is an image carousel template',
  [
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
  ]
);
```

<br />

### Multicast Flex Messages

#### `multicastFlex(userIds, altText, contents, options)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#flex-message)

Sends flex message to multiple users.

<img src="https://developers.line.me/media/messaging-api/using-flex-messages/bubbleSample-77d825e6.png" />

| Param                    | Type            | Description                                                                                             |
| ------------------------ | --------------- | ------------------------------------------------------------------------------------------------------- |
| userIds                  | `Array<String>` | IDs of the receivers.                                                                                   |
| altText                  | `String`        | Alternative text.                                                                                       |
| contents                 | `Object`        | Flex Message [container](https://developers.line.me/en/mreference/essaging-api/#container) object. |
| options                  | `Object`        | Optional options.                                                                                       |
| options.quickReply       | `Object`        | Quick reply object to attach to the message.                                                            |
| options.quickReply.items | `Array`         | Quick reply items.                                                                                      |

Example:

```js
client.multicastFlex([USER_ID], 'this is a flex', {
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
});
```

<br />

<a id="quick-replies" />

### Quick Replies - [Official Docs](https://developers.line.me/en/reference/messaging-api/#quick-reply)

Sends message with buttons appear at the bottom of the chat screen.

<img src="https://developers.line.me/media/messaging-api/using-quick-reply/quickReplySample2-b0da8a03.png" width="250px" />

```js
context.replyText(
  REPLY_TOKEN,
  'Select your favorite food category or send me your location!',
  {
    quickReply: {
      items: [
        {
          type: 'action',
          imageUrl: 'https://example.com/sushi.png',
          action: {
            type: 'message',
            label: 'Sushi',
            text: 'Sushi',
          },
        },
        {
          type: 'action',
          imageUrl: 'https://example.com/tempura.png',
          action: {
            type: 'message',
            label: 'Tempura',
            text: 'Tempura',
          },
        },
        {
          type: 'action',
          action: {
            type: 'location',
            label: 'Send location',
          },
        },
      ],
    },
  }
);
```

<br />

<a id="content-api" />

### Content API - [Official Docs](https://developers.line.me/en/reference/messaging-api/#get-content)

#### `getMessageContent(messageId)`

Retrieves image, video, and audio data sent in specified message.

| Param     | Type     | Description |
| --------- | -------- | ----------- |
| messageId | `String` | Message ID. |

Example:

```js
client.getMessageContent(MESSAGE_ID).then(buffer => {
  console.log(buffer);
  // <Buffer 61 61 73 64 ...>
});
```

<br />

<a id="profile-api" />

### Profile API - [Official Docs](https://developers.line.me/en/reference/messaging-api/#get-profile)

#### `getUserProfile(userId)`

Gets user profile information.

| Param  | Type     | Description     |
| ------ | -------- | --------------- |
| userId | `String` | ID of the user. |

Example:

```js
client.getUserProfile(USER_ID).then(profile => {
  console.log(profile);
  // {
  //   displayName: 'LINE taro',
  //   userId: USER_ID,
  //   pictureUrl: 'http://obs.line-apps.com/...',
  //   statusMessage: 'Hello, LINE!',
  // }
});
```

<br />

<a id="grouproom-member-profile-api" />

### Group/Room Member Profile API - [Official Docs](https://developers.line.me/en/messaging-api/group-chats/#getting-a-user-profile-of-a-member-of-a-group-or-room)

#### `getGroupMemberProfile(groupId, userId)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#get-group-member-profile)

Gets the user profile of a member of a group that the bot is in. This includes the user IDs of users who has not added the bot as a friend or has blocked the bot.

| Param   | Type     | Description      |
| ------- | -------- | ---------------- |
| groupId | `String` | ID of the group. |
| userId  | `String` | ID of the user.  |

Example:

```js
client.getGroupMemberProfile(GROUP_ID, USER_ID).then(member => {
  console.log(member);
  // {
  //   "displayName":"LINE taro",
  //   "userId":"Uxxxxxxxxxxxxxx...",
  //   "pictureUrl":"http://obs.line-apps.com/..."
  // }
});
```

<br />

#### `getRoomMemberProfile(roomId, userId)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#get-room-member-profile)

Gets the user profile of a member of a room that the bot is in. This includes the user IDs of users who has not added the bot as a friend or has blocked the bot.

| Param  | Type     | Description      |
| ------ | -------- | ---------------- |
| roomId | `String` | ID of the group. |
| userId | `String` | ID of the user.  |

Example:

```js
client.getRoomMemberProfile(ROOM_ID, USER_ID).then(member => {
  console.log(member);
  // {
  //   "displayName":"LINE taro",
  //   "userId":"Uxxxxxxxxxxxxxx...",
  //   "pictureUrl":"http://obs.line-apps.com/..."
  // }
});
```

<br />

<a id="grouproom-member-ids-api" />

### Group/Room Member IDs API - [Official Docs](https://developers.line.me/en/messaging-api/group-chats/#getting-user-ids-of-the-members-of-a-group-or-room)

#### `getGroupMemberIds(groupId, start)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#get-group-member-user-ids)

Gets the ID of the users of the members of a group that the bot is in. This includes the user IDs of users who have not added the bot as a friend or has blocked the bot.  
This feature is only available for LINE@ Approved accounts or official accounts.

| Param   | Type     | Description          |
| ------- | -------- | -------------------- |
| groupId | `String` | ID of the group.     |
| start   | `String` | `continuationToken`. |

Example:

```js
client.getGroupMemberIds(GROUP_ID, CURSOR).then(res => {
  console.log(res);
  // {
  //   memberIds: [
  //     'Uxxxxxxxxxxxxxx...',
  //     'Uxxxxxxxxxxxxxx...',
  //     'Uxxxxxxxxxxxxxx...'
  //   ],
  //   next: 'jxEWCEEP...'
  // }
});
```

<br />

#### `getAllGroupMemberIds(groupId)`

Recursively gets the ID of the users of the members of a group that the bot is in using cursors.  
This feature is only available for LINE@ Approved accounts or official accounts.

| Param   | Type     | Description      |
| ------- | -------- | ---------------- |
| groupId | `String` | ID of the group. |

Example:

```js
client.getAllGroupMemberIds(GROUP_ID).then(ids => {
  console.log(ids);
  // [
  //   'Uxxxxxxxxxxxxxx..1',
  //   'Uxxxxxxxxxxxxxx..2',
  //   'Uxxxxxxxxxxxxxx..3',
  //   'Uxxxxxxxxxxxxxx..4',
  //   'Uxxxxxxxxxxxxxx..5',
  //   'Uxxxxxxxxxxxxxx..6',
  // ]
});
```

<br />

#### `getRoomMemberIds(roomId, start)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#get-room-member-user-ids)

Gets the ID of the users of the members of a room that the bot is in. This includes the user IDs of users who have not added the bot as a friend or has blocked the bot.  
This feature is only available for LINE@ Approved accounts or official accounts.

| Param  | Type     | Description          |
| ------ | -------- | -------------------- |
| roomId | `String` | ID of the room.      |
| start  | `String` | `continuationToken`. |

Example:

```js
client.getRoomMemberIds(ROOM_ID, CURSOR).then(res => {
  console.log(res);
  // {
  //   memberIds: [
  //     'Uxxxxxxxxxxxxxx...',
  //     'Uxxxxxxxxxxxxxx...',
  //     'Uxxxxxxxxxxxxxx...'
  //   ],
  //   next: 'jxEWCEEP...'
  // }
});
```

<br />

#### `getAllRoomMemberIds(roomId)`

Recursively gets the ID of the users of the members of a room that the bot is in using cursors.  
This feature is only available for LINE@ Approved accounts or official accounts.

| Param  | Type     | Description     |
| ------ | -------- | --------------- |
| roomId | `String` | ID of the room. |

Example:

```js
client.getAllRoomMemberIds(ROOM_ID).then(ids => {
  console.log(ids);
  // [
  //   'Uxxxxxxxxxxxxxx..1',
  //   'Uxxxxxxxxxxxxxx..2',
  //   'Uxxxxxxxxxxxxxx..3',
  //   'Uxxxxxxxxxxxxxx..4',
  //   'Uxxxxxxxxxxxxxx..5',
  //   'Uxxxxxxxxxxxxxx..6',
  // ]
});
```

<br />

<a id="leave-api" />

### Leave API - [Official Docs](https://developers.line.me/en/messaging-api/group-chats/#leaving-a-group-or-room)

#### `leaveGroup(groupId)` - [Official Docs](https://developers.line.me/en/reference/messaging-api/#leave-group)

Leave a group.

| Param   | Type     | Description      |
| ------- | -------- | ---------------- |
| groupId | `String` | ID of the group. |

Example:

```js
client.leaveGroup(GROUP_ID);
```

<br />

#### `leaveRoom(roomId)` - [Official Docs](https://developers.line.me/en/reference/messaging-api/#leave-room)

Leave a room.

| Param  | Type     | Description     |
| ------ | -------- | --------------- |
| roomId | `String` | ID of the room. |

Example:

```js
client.leaveRoom(ROOM_ID);
```

<br />

<a id="rich-menu-api" />

### Rich Menu API - [Official Docs](https://developers.line.me/en/reference/messaging-api/#rich-menu)

#### `getRichMenuList()` - [Official Docs](https://developers.line.me/en/reference/messaging-api/#get-rich-menu-list)

Gets a list of all uploaded rich menus.

Example:

```js
client.getRichMenuList().then(richMenus => {
  console.log(richMenus);
  // [
  //   {
  //     richMenuId: 'RICH_MENU_ID',
  //     size: {
  //       width: 2500,
  //       height: 1686,
  //     },
  //     selected: false,
  //     name: 'Nice richmenu',
  //     chatBarText: 'Tap here',
  //     areas: [
  //       {
  //         bounds: {
  //           x: 0,
  //           y: 0,
  //           width: 2500,
  //           height: 1686,
  //         },
  //         action: {
  //           type: 'postback',
  //           data: 'action=buy&itemid=123',
  //         },
  //       },
  //     ],
  //   },
  // ]
});
```

<br />

#### `getRichMenu(richMenuId)` - [Official Docs](https://developers.line.me/en/reference/messaging-api/#get-rich-menu)

Gets a rich menu via a rich menu ID.

| Param      | Type     | Description                  |
| ---------- | -------- | ---------------------------- |
| richMenuId | `String` | ID of an uploaded rich menu. |

Example:

```js
client.getRichMenu(RICH_MENU_ID).then(richMenu => {
  console.log(richMenu);
  // {
  //   richMenuId: 'RICH_MENU_ID',
  //   size: {
  //     width: 2500,
  //     height: 1686,
  //   },
  //   selected: false,
  //   name: 'Nice richmenu',
  //   chatBarText: 'Tap here',
  //   areas: [
  //     {
  //       bounds: {
  //         x: 0,
  //         y: 0,
  //         width: 2500,
  //         height: 1686,
  //       },
  //       action: {
  //         type: 'postback',
  //         data: 'action=buy&itemid=123',
  //       },
  //     },
  //   ],
  // }
});
```

<br />

#### `createRichMenu(richMenu)` - [Official Docs](https://developers.line.me/en/reference/messaging-api/#create-rich-menu)

Creates a rich menu.

| Param    | Type       | Description                                                                                         |
| -------- | ---------- | --------------------------------------------------------------------------------------------------- |
| richMenu | `RichMenu` | A [rich menu object](https://developers.line.me/en/reference/messaging-api/#rich-menu-object). |

Example:

```js
client
  .createRichMenu({
    size: {
      width: 2500,
      height: 1686,
    },
    selected: false,
    name: 'Nice richmenu',
    chatBarText: 'Tap here',
    areas: [
      {
        bounds: {
          x: 0,
          y: 0,
          width: 2500,
          height: 1686,
        },
        action: {
          type: 'postback',
          data: 'action=buy&itemid=123',
        },
      },
    ],
  })
  .then(richMenu => {
    console.log(richMenu);
    // {
    //   richMenuId: "{richMenuId}"
    // }
  });
```

<br />

#### `deleteRichMenu(richMenuId)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#delete-rich-menu)

Deletes a rich menu.

| Param      | Type     | Description                  |
| ---------- | -------- | ---------------------------- |
| richMenuId | `String` | ID of an uploaded rich menu. |

Example:

```js
client.deleteRichMenu(RICH_MENU_ID);
```

<br />

#### `getLinkedRichMenu(userId)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#get-rich-menu-id-of-user)

Gets the ID of the rich menu linked to a user.

| Param  | Type     | Description     |
| ------ | -------- | --------------- |
| userId | `String` | ID of the user. |

Example:

```js
client.getLinkedRichMenu(USER_ID).then(richMenu => {
  console.log(richMenu);
  // {
  //   richMenuId: "{richMenuId}"
  // }
});
```

<br />

#### `linkRichMenu(userId, richMenuId)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#link-rich-menu-to-user)

Links a rich menu to a user.

| Param      | Type     | Description                  |
| ---------- | -------- | ---------------------------- |
| userId     | `String` | ID of the user.              |
| richMenuId | `String` | ID of an uploaded rich menu. |

Example:

```js
client.linkRichMenu(USER_ID, RICH_MENU_ID);
```

<br />

#### `unlinkRichMenu(userId)` - [Official Docs](https://developers.line.me/en/reference/messaging-api/#unlink-rich-menu-from-user)

Unlinks a rich menu from a user.

| Param  | Type     | Description     |
| ------ | -------- | --------------- |
| userId | `String` | ID of the user. |

Example:

```js
client.unlinkRichMenu(USER_ID);
```

<br />

#### `downloadRichMenuImage(richMenuId)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#download-rich-menu-image)

Downloads an image associated with a rich menu.

| Param      | Type     | Description                  |
| ---------- | -------- | ---------------------------- |
| richMenuId | `String` | ID of an uploaded rich menu. |

Example:

```js
client.downloadRichMenuImage(RICH_MENU_ID).then(imageBuffer => {
  console.log(imageBuffer);
  // <Buffer 61 61 73 64 ...>
});
```

<br />

#### `uploadRichMenuImage(richMenuId, buffer)` - [Official Docs](https://developers.line.me/en/mreference/essaging-api/#upload-rich-menu-image)

Uploads and attaches an image to a rich menu.

| Param      | Type     | Description                                    |
| ---------- | -------- | ---------------------------------------------- |
| richMenuId | `String` | ID of an uploaded rich menu.                   |
| buffer     | `Buffer` | Image buffer which must be jpeg or png format. |

Example:

```js
const fs = require('fs');

client.uploadRichMenuImage(RICH_MENU_ID, fs.readFileSync('image.png'));
```

<br />

#### `getDefaultRichMenu()` - [Official Docs](https://developers.line.me/en/reference/messaging-api/#get-default-rich-menu-id)

Gets the ID of the default rich menu set with the Messaging API.

Example:

```js
client.getDefaultRichMenu().then(richMenu => {
  console.log(richMenu);
  // {
  //   "richMenuId": "{richMenuId}"
  // }
});
```

<br />

#### `setDefaultRichMenu(richMenuId)` - [Official Docs](https://developers.line.me/en/reference/messaging-api/#set-default-rich-menu)

Sets the default rich menu. The default rich menu is displayed to all users who have added your bot as a friend and are not linked to any per-user rich menu.

| Param      | Type     | Description                  |
| ---------- | -------- | ---------------------------- |
| richMenuId | `String` | ID of an uploaded rich menu. |

Example:

```js
client.setDefaultRichMenu('{richMenuId}');
```

> The rich menu is displayed in the following order of priority (highest to lowest): The per-user rich menu set with the Messaging API, the default rich menu set with the Messaging API, and the default rich menu set with LINE@ Manager.

<br />

#### `deleteDefaultRichMenu()` - [Official Docs](https://developers.line.me/en/reference/messaging-api/#cancel-default-rich-menu)

Cancels the default rich menu set with the Messaging API.

Example:

```js
client.deleteDefaultRichMenu();
```

<br />

<a id="account-link-api" />

### Account Link API - [Official Docs](https://developers.line.me/en/reference/messaging-api/#account-link)

#### `issueLinkToken(userId)` - [Official Docs](https://developers.line.me/en/reference/messaging-api/#issue-link-token)

Issues a link token used for the [account link](https://developers.line.me/en/messaging-api/linking-accounts/) feature.

| Param  | Type     | Description     |
| ------ | -------- | --------------- |
| userId | `String` | ID of the user. |

Example:

```js
client.issueLinkToken(USER_ID).then(result => {
  console.log(result);
  // {
  //   linkToken: 'NMZTNuVrPTqlr2IF8Bnymkb7rXfYv5EY',
  // }
});
```

<a id="liff-api" />

### LINE Front-end Framework API - [Official Docs](https://developers.line.me/en/liff/reference/)

#### `createLiffApp(view)`

Adds an app to LIFF. You can add up to 10 LIFF apps on one channel.

| Param     | Type     | Description                                 |
| --------- | -------- | ------------------------------------------- |
| view.type | `String` | Size of the LIFF app view.                  |
| view.url  | `String` | URL of the LIFF app. Must start with HTTPS. |

Example:

```js
client.createLiffApp({
  type: 'compact',
  url: 'https://example.com/liff-app',
});
```

View type can be specified one of the following values:

- `compact`: 50% of the screen height of the device. This size can be specified only for the chat screen.
- `tall`: 80% of the screen height of the device. This size can be specified only for the chat screen.
- `full`: 100% of the screen height of the device. This size can be specified for any screens in the LINE app.

<br />

#### `updateLiffApp(liffId, view)`

Updates LIFF app settings.

| Param     | Type     | Description                                 |
| --------- | -------- | ------------------------------------------- |
| liffId    | `String` | ID of the LIFF app to be updated.           |
| view.type | `String` | Size of the LIFF app view.                  |
| view.url  | `String` | URL of the LIFF app. Must start with HTTPS. |

Example:

```js
client.updateLiffApp(LIFF_ID, {
  type: 'compact',
  url: 'https://example.com/liff-app',
});
```

<br />

#### `getLiffAppList`

Gets information on all the LIFF apps registered in the channel.

Example:

```js
client.getLiffApps().then(apps => {
  console.log(apps);
  // [
  //   {
  //     liffId: '{liffId}',
  //     view: {
  //       type: 'full',
  //       url: 'https://example.com/myservice',
  //     },
  //   },
  //   {
  //     liffId: '{liffId}',
  //     view: {
  //       type: 'tall',
  //       url: 'https://example.com/myservice2',
  //     },
  //   },
  // ]
});
```

<br />

#### `deleteLiffApp(liffId)`

Deletes a LIFF app.

| Param  | Type     | Description                       |
| ------ | -------- | --------------------------------- |
| liffId | `String` | ID of the LIFF app to be deleted. |

Example:

```js
client.deleteLiffApp(LIFF_ID);
```

<br />

## Debug Tips

### Log Requests Details

To enable default request debugger, use following `DEBUG` env variable:

```sh
DEBUG=messaging-api-line
```

## Test

### Send Requests to Your Dummy Server

To avoid sending requests to the real LINE server, provide the `origin` option in your `bottender.js.config` file:

```js
module.exports = {
  channels: {
    line: {
      enabled: true,
      path: '/webhooks/line',
      accessToken: process.env.LINE_ACCESS_TOKEN,
      channelSecret: process.env.LINE_CHANNEL_SECRET,
      origin: process.env.NODE_ENV === 'test' ? 'https://mydummytestserver.com' : undefined,
    },
  },
};
```

> **Warning:** Don't do this on the production server.
