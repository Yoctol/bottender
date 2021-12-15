---
id: api-line-client
title: LineClient
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

`LineClient` uses [axios](https://github.com/axios/axios) as HTTP client. We use [axios-error](https://github.com/bottenderjs/messaging-apis/tree/master/packages/axios-error) package to wrap API error instances for better formatting error messages. Calling `console.log` with the error instance returns the formatted message. If you'd like to get the axios `request`, `response`, or `config`, you can still get them via those keys on the error instance.

```js
client.replyText(token, text).catch((error) => {
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

<img src="https://user-images.githubusercontent.com/563929/82649893-77d33780-9c4c-11ea-9075-f11848d92850.png" width="250px" />

You can include LINE original emoji in text messages using character codes. For a list of LINE emoji that can be sent in LINE chats, see the [emoji list](https://developers.line.me/media/messaging-api/emoji-list.pdf).

<img src="https://user-images.githubusercontent.com/563929/82650108-cbde1c00-9c4c-11ea-8510-b2909bc93d8d.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82650545-64749c00-9c4d-11ea-8038-0ac0dd817a02.png" width="250px" />
<img src="https://user-images.githubusercontent.com/563929/82650588-75251200-9c4d-11ea-955d-30ba9458ffd3.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82650704-a69ddd80-9c4d-11ea-9e86-8e2c5294d97f.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82651012-26c44300-9c4e-11ea-8c25-aade44dbe4f8.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82651104-478c9880-9c4e-11ea-8fdf-cb6d8a10bf9a.png" width="250px" />

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
<br />
For a list of stickers that can be sent with the Messaging API, see the [sticker list](https://developers.line.me/media/messaging-api/messages/sticker_list.pdf).

<img src="https://user-images.githubusercontent.com/563929/82651371-a7833f00-9c4e-11ea-9041-46dcb962b0c7.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82651489-cc77b200-9c4e-11ea-860a-2f7f1ecaa5b5.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82651618-f6c96f80-9c4e-11ea-873c-90821a7f5510.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82651801-398b4780-9c4f-11ea-986c-b8cadee4349b.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82651957-735c4e00-9c4f-11ea-8147-2fae91afb62e.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82652055-971f9400-9c4f-11ea-878a-23dcabb430dc.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82652147-b6b6bc80-9c4f-11ea-96dc-3a1b5ca9d582.png" />

| Param                    | Type     | Description                                                                                        |
| ------------------------ | -------- | -------------------------------------------------------------------------------------------------- |
| token                    | `String` | `replyToken` received via webhook.                                                                 |
| altText                  | `String` | Alternative text.                                                                                  |
| contents                 | `Object` | Flex Message [container](https://developers.line.me/en/mreference/essaging-api/#container) object. |
| options                  | `Object` | Optional options.                                                                                  |
| options.quickReply       | `Object` | Quick reply object to attach to the message.                                                       |
| options.quickReply.items | `Array`  | Quick reply items.                                                                                 |

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

<img src="https://user-images.githubusercontent.com/563929/82652318-01383900-9c50-11ea-8199-cb7c8f6362dc.png" width="250px" />

You can include LINE original emoji in text messages using character codes. For a list of LINE emoji that can be sent in LINE chats, see the [emoji list](https://developers.line.me/media/messaging-api/emoji-list.pdf).

<img src="https://user-images.githubusercontent.com/563929/82652521-52e0c380-9c50-11ea-829a-36cd706823e0.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82652911-021d9a80-9c51-11ea-9f6e-a6c18d0a87e5.png" width="250px" />
<img src="https://user-images.githubusercontent.com/563929/82652981-1cf00f00-9c51-11ea-89ba-7da7e74e5def.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82653198-6c363f80-9c51-11ea-9acd-28677530a3b3.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82653904-7dcc1700-9c52-11ea-9023-4ad89e76bb05.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82654102-c97ec080-9c52-11ea-94ef-5f26e52d78a1.png" width="250px" />

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
<br />
For a list of stickers that can be sent with the Messaging API, see the [sticker list](https://developers.line.me/media/messaging-api/messages/sticker_list.pdf).

<img src="https://user-images.githubusercontent.com/563929/82654187-ec10d980-9c52-11ea-9a81-dd8469d75e08.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82654362-309c7500-9c53-11ea-9252-c12dd84ae003.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82654518-735e4d00-9c53-11ea-9299-34eb4e3fb853.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82654609-9426a280-9c53-11ea-916c-d8a7f76bf119.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82654829-e071e280-9c53-11ea-9948-1142e34e73db.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82655190-62620b80-9c54-11ea-981d-cb0ae8e2da9a.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82655544-eae0ac00-9c54-11ea-8171-6f9526405dfa.png" />

| Param                    | Type     | Description                                                                                        |
| ------------------------ | -------- | -------------------------------------------------------------------------------------------------- |
| userId                   | `String` | ID of the receiver.                                                                                |
| altText                  | `String` | Alternative text.                                                                                  |
| contents                 | `Object` | Flex Message [container](https://developers.line.me/en/mreference/essaging-api/#container) object. |
| options                  | `Object` | Optional options.                                                                                  |
| options.quickReply       | `Object` | Quick reply object to attach to the message.                                                       |
| options.quickReply.items | `Array`  | Quick reply items.                                                                                 |

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

<img src="https://user-images.githubusercontent.com/563929/82649893-77d33780-9c4c-11ea-9075-f11848d92850.png" width="250px" />

You can include LINE original emoji in text messages using character codes. For a list of LINE emoji that can be sent in LINE chats, see the [emoji list](https://developers.line.me/media/messaging-api/emoji-list.pdf).

<img src="https://user-images.githubusercontent.com/563929/82650108-cbde1c00-9c4c-11ea-8510-b2909bc93d8d.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82650545-64749c00-9c4d-11ea-8038-0ac0dd817a02.png" width="250px" />
<img src="https://user-images.githubusercontent.com/563929/82650588-75251200-9c4d-11ea-955d-30ba9458ffd3.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82650704-a69ddd80-9c4d-11ea-9e86-8e2c5294d97f.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82651012-26c44300-9c4e-11ea-8c25-aade44dbe4f8.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82651104-478c9880-9c4e-11ea-8fdf-cb6d8a10bf9a.png" width="250px" />

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
<br />
For a list of stickers that can be sent with the Messaging API, see the [sticker list](https://developers.line.me/media/messaging-api/messages/sticker_list.pdf).

<img src="https://user-images.githubusercontent.com/563929/82651371-a7833f00-9c4e-11ea-9041-46dcb962b0c7.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82651489-cc77b200-9c4e-11ea-860a-2f7f1ecaa5b5.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82651618-f6c96f80-9c4e-11ea-873c-90821a7f5510.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82651801-398b4780-9c4f-11ea-986c-b8cadee4349b.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82651957-735c4e00-9c4f-11ea-8147-2fae91afb62e.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82652055-971f9400-9c4f-11ea-878a-23dcabb430dc.png" width="250px" />

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

<img src="https://user-images.githubusercontent.com/563929/82652147-b6b6bc80-9c4f-11ea-96dc-3a1b5ca9d582.png" />

| Param                    | Type            | Description                                                                                        |
| ------------------------ | --------------- | -------------------------------------------------------------------------------------------------- |
| userIds                  | `Array<String>` | IDs of the receivers.                                                                              |
| altText                  | `String`        | Alternative text.                                                                                  |
| contents                 | `Object`        | Flex Message [container](https://developers.line.me/en/mreference/essaging-api/#container) object. |
| options                  | `Object`        | Optional options.                                                                                  |
| options.quickReply       | `Object`        | Quick reply object to attach to the message.                                                       |
| options.quickReply.items | `Array`         | Quick reply items.                                                                                 |

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

<img src="https://user-images.githubusercontent.com/563929/82657377-d7831000-9c57-11ea-9b22-593944a4e670.png" width="250px" />

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
client.getMessageContent(MESSAGE_ID).then((buffer) => {
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
client.getUserProfile(USER_ID).then((profile) => {
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
client.getGroupMemberProfile(GROUP_ID, USER_ID).then((member) => {
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
client.getRoomMemberProfile(ROOM_ID, USER_ID).then((member) => {
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
<br />
This feature is only available for LINE@ Approved accounts or official accounts.

| Param   | Type     | Description          |
| ------- | -------- | -------------------- |
| groupId | `String` | ID of the group.     |
| start   | `String` | `continuationToken`. |

Example:

```js
client.getGroupMemberIds(GROUP_ID, CURSOR).then((res) => {
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
<br />
This feature is only available for LINE@ Approved accounts or official accounts.

| Param   | Type     | Description      |
| ------- | -------- | ---------------- |
| groupId | `String` | ID of the group. |

Example:

```js
client.getAllGroupMemberIds(GROUP_ID).then((ids) => {
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
<br />
This feature is only available for LINE@ Approved accounts or official accounts.

| Param  | Type     | Description          |
| ------ | -------- | -------------------- |
| roomId | `String` | ID of the room.      |
| start  | `String` | `continuationToken`. |

Example:

```js
client.getRoomMemberIds(ROOM_ID, CURSOR).then((res) => {
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
<br />
This feature is only available for LINE@ Approved accounts or official accounts.

| Param  | Type     | Description     |
| ------ | -------- | --------------- |
| roomId | `String` | ID of the room. |

Example:

```js
client.getAllRoomMemberIds(ROOM_ID).then((ids) => {
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
client.getRichMenuList().then((richMenus) => {
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
client.getRichMenu(RICH_MENU_ID).then((richMenu) => {
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

| Param    | Type       | Description                                                                                    |
| -------- | ---------- | ---------------------------------------------------------------------------------------------- |
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
  .then((richMenu) => {
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
client.getLinkedRichMenu(USER_ID).then((richMenu) => {
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
client.downloadRichMenuImage(RICH_MENU_ID).then((imageBuffer) => {
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
client.getDefaultRichMenu().then((richMenu) => {
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
client.issueLinkToken(USER_ID).then((result) => {
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
client.getLiffApps().then((apps) => {
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
      origin:
        process.env.NODE_ENV === 'test'
          ? 'https://mydummytestserver.com'
          : undefined,
    },
  },
};
```

> **Warning:** Don't do this on the production server.
