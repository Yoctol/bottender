---
id: api-line-context
title: LineContext
---

- [Reply API](#reply-api)
  - [Imagemap Message](#reply-imagemap-message)
  - [Template Messages](#reply-template-messages)
  - [Flex Messages](#reply-flex-messages)
- [Push API](#push-api)
  - [Imagemap Message](#push-imagemap-message)
  - [Template Messages](#push-template-messages)
  - [Flex Messages](#push-flex-messages)
- [Quick Replies](#quick-replies)
- [Profile API](#profile-api)
- [Group/Room Member Profile API](#grouproom-member-profile-api)
- [Group/Room Member IDs API](#grouproom-member-ids-api)
- [Leave API](#leave-api)
- [Rich Menu API](#rich-menu-api)
- [Account Link API](#account-link-api)

<a id="reply-api" />

### Reply API - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#send-reply-message)

Responds to events from users, groups, and rooms.

#### `reply(messages)`

Responds messages to the receiver using reply token.

| Param    | Type       | Description                                                             |
| -------- | ---------- | ----------------------------------------------------------------------- |
| messages | `Object[]` | Array of objects which contains the contents of the message to be sent. |

Example:

```js
context.reply([
  {
    type: 'text',
    text: 'Hello!',
  },
]);
```

`replyToken` can only be used once, but you can send up to 5 messages using the same token.

```js
const { Line } = require('messaging-api-line');

context.reply([
  Line.createText('Hello'),
  Line.createImage({
    originalContentUrl: 'https://example.com/original.jpg',
    previewImageUrl: 'https://example.com/preview.jpg',
  }),
  Line.createText('End'),
]);
```

<br />

#### `replyText(text)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#text-message)

Responds text message to the receiver using reply token.

<img src="https://user-images.githubusercontent.com/563929/82649893-77d33780-9c4c-11ea-9075-f11848d92850.png" width="250px" />

You can include LINE original emoji in text messages using character codes. For a list of LINE emoji that can be sent in LINE chats, see the [emoji list](https://developers.line.me/media/messaging-api/emoji-list.pdf).

<img src="https://user-images.githubusercontent.com/563929/82650108-cbde1c00-9c4c-11ea-8510-b2909bc93d8d.png" width="250px" />

| Param | Type     | Description                     |
| ----- | -------- | ------------------------------- |
| text  | `String` | Text of the message to be sent. |

Example:

```js
context.replyText('Hello!');
```

<br />

#### `replyImage(imageUrl, previewImageUrl)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#image-message)

Responds image message to the receiver using reply token.

<img src="https://user-images.githubusercontent.com/563929/82650545-64749c00-9c4d-11ea-8038-0ac0dd817a02.png" width="250px" />
<img src="https://user-images.githubusercontent.com/563929/82650588-75251200-9c4d-11ea-955d-30ba9458ffd3.png" width="250px" />

| Param           | Type     | Description        |
| --------------- | -------- | ------------------ |
| imageUrl        | `String` | Image URL.         |
| previewImageUrl | `String` | Preview image URL. |

Example:

```js
context.replyImage({
  originalContentUrl: 'https://example.com/original.jpg',
  previewImageUrl: 'https://example.com/preview.jpg',
});
```

<br />

#### `replyVideo(videoUrl, previewImageUrl)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#video-message)

Responds video message to the receiver using reply token.

<img src="https://user-images.githubusercontent.com/563929/82650704-a69ddd80-9c4d-11ea-9e86-8e2c5294d97f.png" width="250px" />

| Param           | Type     | Description           |
| --------------- | -------- | --------------------- |
| videoUrl        | `String` | URL of video file.    |
| previewImageUrl | `String` | URL of preview image. |

Example:

```js
context.replyVideo({
  originalContentUrl: 'https://example.com/original.mp4',
  previewImageUrl: 'https://example.com/preview.jpg',
});
```

<br />

#### `replyAudio(audioUrl, duration)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#audio-message)

Responds audio message to the receiver using reply token.

<img src="https://user-images.githubusercontent.com/563929/82651012-26c44300-9c4e-11ea-8c25-aade44dbe4f8.png" width="250px" />

| Param    | Type     | Description           |
| -------- | -------- | --------------------- |
| audioUrl | `String` | URL of audio file.    |
| duration | `Number` | Length of audio file. |

Example:

```js
context.replyAudio({
  originalContentUrl: 'https://example.com/original.m4a',
  duration: 240000,
});
```

<br />

#### `replyLocation(location)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#location-message)

Responds location message to the receiver using reply token.

<img src="https://user-images.githubusercontent.com/563929/82651104-478c9880-9c4e-11ea-8fdf-cb6d8a10bf9a.png" width="250px" />

| Param              | Type     | Description                            |
| ------------------ | -------- | -------------------------------------- |
| location           | `Object` | Object contains location's parameters. |
| location.title     | `String` | Title of the location.                 |
| location.address   | `String` | Address of the location.               |
| location.latitude  | `Number` | Latitude of the location.              |
| location.longitude | `Number` | Longitude of the location.             |

Example:

```js
context.replyLocation({
  title: 'my location',
  address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
  latitude: 35.65910807942215,
  longitude: 139.70372892916203,
});
```

<br />

#### `replySticker(packageId, stickerId)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#sticker-message)

Responds sticker message to the receiver using reply token.
<br />
For a list of stickers that can be sent with the Messaging API, see the [sticker list](https://developers.line.me/media/messaging-api/messages/sticker_list.pdf).

<img src="https://user-images.githubusercontent.com/563929/82651371-a7833f00-9c4e-11ea-9041-46dcb962b0c7.png" width="250px" />

| Param     | Type     | Description |
| --------- | -------- | ----------- |
| packageId | `String` | Package ID. |
| stickerId | `String` | Sticker ID. |

Example:

```js
context.replySticker({ packageId: '1', stickerId: '1' });
```

<br />

### Reply Imagemap Message

#### `replyImagemap(altText, imagemap)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#imagemap-message)

Responds imagemap message to the receiver using reply token.

<img src="https://user-images.githubusercontent.com/563929/82651489-cc77b200-9c4e-11ea-860a-2f7f1ecaa5b5.png" width="250px" />

| Param                    | Type       | Description                            |
| ------------------------ | ---------- | -------------------------------------- |
| altText                  | `String`   | Alternative text.                      |
| imagemap                 | `Object`   | Object contains imagemap's parameters. |
| imagemap.baseUrl         | `String`   | Base URL of image.                     |
| imagemap.baseSize        | `Object`   | Base size object.                      |
| imagemap.baseSize.width  | `Number`   | Width of base image.                   |
| imagemap.baseSize.height | `Number`   | Height of base image.                  |
| imagemap.actions         | `Object[]` | Action when tapped.                    |

Example:

```js
context.replyImagemap('this is an imagemap', {
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

#### `replyTemplate(altText, template)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#template-messages)

Responds template message to the receiver using reply token.

| Param    | Type     | Description                               |
| -------- | -------- | ----------------------------------------- |
| altText  | `String` | Alternative text.                         |
| template | `Object` | Object with the contents of the template. |

Example:

```js
context.replyTemplate('this is a template', {
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

#### `replyButtonTemplate(altText, buttonTemplate)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#buttons)

Alias: `replyButtonsTemplate`.

Responds button template message to the receiver using reply token.

<img src="https://user-images.githubusercontent.com/563929/82651618-f6c96f80-9c4e-11ea-873c-90821a7f5510.png" width="250px" />

| Param                               | Type       | Description                                                                                   |
| ----------------------------------- | ---------- | --------------------------------------------------------------------------------------------- |
| altText                             | `String`   | Alternative text.                                                                             |
| buttonTemplate                      | `Object`   | Object contains buttonTemplate's parameters.                                                  |
| buttonTemplate.thumbnailImageUrl    | `String`   | Image URL of buttonTemplate.                                                                  |
| buttonTemplate.imageAspectRatio     | `String`   | Aspect ratio of the image. Specify one of the following values: `rectangle`, `square`         |
| buttonTemplate.imageSize            | `String`   | Size of the image. Specify one of the following values: `cover`, `contain`                    |
| buttonTemplate.imageBackgroundColor | `String`   | Background color of image. Specify a RGB color value. The default value is `#FFFFFF` (white). |
| buttonTemplate.title                | `String`   | Title of buttonTemplate.                                                                      |
| buttonTemplate.text                 | `String`   | Message text of buttonTemplate.                                                               |
| buttonTemplate.defaultAction        | `Object`   | Action when image is tapped; set for the entire image, title, and text area.                  |
| buttonTemplate.actions              | `Object[]` | Action when tapped.                                                                           |

Example:

```js
context.replyButtonTemplate('this is a template', {
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

#### `replyConfirmTemplate(altText, confirmTemplate)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#confirm)

Responds confirm template message to the receiver using reply token.

<img src="https://user-images.githubusercontent.com/563929/82651801-398b4780-9c4f-11ea-986c-b8cadee4349b.png" width="250px" />

| Param                   | Type       | Description                                   |
| ----------------------- | ---------- | --------------------------------------------- |
| altText                 | `String`   | Alternative text.                             |
| confirmTemplate         | `Object`   | Object contains confirmTemplate's parameters. |
| confirmTemplate.text    | `String`   | Message text of confirmTemplate.              |
| confirmTemplate.actions | `Object[]` | Action when tapped.                           |

Example:

```js
context.replyConfirmTemplate('this is a confirm template', {
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

#### `replyCarouselTemplate(altText, carouselItems, options)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#carousel)

Responds carousel template message to the receiver using reply token.

<img src="https://user-images.githubusercontent.com/563929/82651957-735c4e00-9c4f-11ea-8147-2fae91afb62e.png" width="250px" />

| Param                    | Type       | Description                                                                           |
| ------------------------ | ---------- | ------------------------------------------------------------------------------------- |
| altText                  | `String`   | Alternative text.                                                                     |
| carouselItems            | `Object[]` | Array of columns which contains object for carousel.                                  |
| options                  | `Object`   | Object contains options.                                                              |
| options.imageAspectRatio | `String`   | Aspect ratio of the image. Specify one of the following values: `rectangle`, `square` |
| options.imageSize        | `String`   | Size of the image. Specify one of the following values: `cover`, `contain`            |

Example:

```js
context.replyCarouselTemplate('this is a carousel template', [
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

#### `replyImageCarouselTemplate(altText, carouselItems)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#image-carousel)

Responds image carousel template message to the receiver using reply token.

<img src="https://user-images.githubusercontent.com/563929/82652055-971f9400-9c4f-11ea-878a-23dcabb430dc.png" width="250px" />

| Param         | Type       | Description                                                |
| ------------- | ---------- | ---------------------------------------------------------- |
| altText       | `String`   | Alternative text.                                          |
| carouselItems | `Object[]` | Array of columns which contains object for image carousel. |

Example:

```js
context.replyImageCarouselTemplate('this is an image carousel template', [
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
]);
```

<br />

### Reply Flex Messages

#### `replyFlex(altText, contents)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#flex-message)

Responds flex message using specified reply token.

<img src="https://user-images.githubusercontent.com/563929/82652147-b6b6bc80-9c4f-11ea-96dc-3a1b5ca9d582.png" />

| Param    | Type     | Description                                                                                             |
| -------- | -------- | ------------------------------------------------------------------------------------------------------- |
| altText  | `String` | Alternative text.                                                                                       |
| contents | `Object` | Flex Message [container](https://developers.line.me/en/docs/messaging-api/reference/#container) object. |

Example:

```js
context.replyFlex('this is a flex', {
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

### Push API - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#send-push-message)

Sends messages to the user, group, or room at any time.

#### `push(messages)`

Sends messages to the receiver using ID.

| Param    | Type       | Description                                                             |
| -------- | ---------- | ----------------------------------------------------------------------- |
| messages | `Object[]` | Array of objects which contains the contents of the message to be sent. |

Example:

```js
context.push([
  {
    type: 'text',
    text: 'Hello!',
  },
]);
```

<br />

#### `pushText(text)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#text-message)

Alias: `sendText`.

Sends text message to the receiver using ID.

<img src="https://user-images.githubusercontent.com/563929/82652318-01383900-9c50-11ea-8199-cb7c8f6362dc.png" width="250px" />

You can include LINE original emoji in text messages using character codes. For a list of LINE emoji that can be sent in LINE chats, see the [emoji list](https://developers.line.me/media/messaging-api/emoji-list.pdf).

<img src="https://user-images.githubusercontent.com/563929/82652521-52e0c380-9c50-11ea-829a-36cd706823e0.png" width="250px" />

| Param | Type     | Description                     |
| ----- | -------- | ------------------------------- |
| text  | `String` | Text of the message to be sent. |

Example:

```js
context.pushText('Hello!');
```

<br />

#### `pushImage(imageUrl, previewImageUrl)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#image-message)

Alias: `sendImage`.

Sends image message to the receiver using ID.

<img src="https://user-images.githubusercontent.com/563929/82652911-021d9a80-9c51-11ea-9f6e-a6c18d0a87e5.png" width="250px" />
<img src="https://user-images.githubusercontent.com/563929/82652981-1cf00f00-9c51-11ea-89ba-7da7e74e5def.png" width="250px" />

| Param           | Type     | Description        |
| --------------- | -------- | ------------------ |
| imageUrl        | `String` | Image URL.         |
| previewImageUrl | `String` | Preview image URL. |

Example:

```js
context.pushImage({
  originalContentUrl: 'https://example.com/original.jpg',
  previewImageUrl: 'https://example.com/preview.jpg',
});
```

<br />

#### `pushVideo(videoUrl, previewImageUrl)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#video-message)

Alias: `sendVideo`.

Sends video message using ID of the receiver.

<img src="https://user-images.githubusercontent.com/563929/82653198-6c363f80-9c51-11ea-9acd-28677530a3b3.png" width="250px" />

| Param           | Type     | Description           |
| --------------- | -------- | --------------------- |
| videoUrl        | `String` | URL of video file.    |
| previewImageUrl | `String` | URL of preview image. |

Example:

```js
context.pushVideo({
  originalContentUrl: 'https://example.com/original.mp4',
  previewImageUrl: 'https://example.com/preview.jpg',
});
```

<br />

#### `pushAudio(audioUrl, duration)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#audio-message)

Alias: `sendAudio`.

Sends audio message to the receiver using ID.

<img src="https://user-images.githubusercontent.com/563929/82653904-7dcc1700-9c52-11ea-9023-4ad89e76bb05.png" width="250px" />

| Param    | Type     | Description           |
| -------- | -------- | --------------------- |
| audioUrl | `String` | URL of audio file.    |
| duration | `Number` | Length of audio file. |

Example:

```js
context.pushAudio({
  originalContentUrl: 'https://example.com/original.m4a',
  duration: 240000,
});
```

<br />

#### `pushLocation(location)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#location-message)

Alias: `sendLocation`.

Sends location message to the receiver using ID.

<img src="https://user-images.githubusercontent.com/563929/82654102-c97ec080-9c52-11ea-94ef-5f26e52d78a1.png" width="250px" />

| Param              | Type     | Description                            |
| ------------------ | -------- | -------------------------------------- |
| location           | `Object` | Object contains location's parameters. |
| location.title     | `String` | Title of the location.                 |
| location.address   | `String` | Address of the location.               |
| location.latitude  | `Number` | Latitude of the location.              |
| location.longitude | `Number` | Longitude of the location.             |

Example:

```js
context.pushLocation({
  title: 'my location',
  address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
  latitude: 35.65910807942215,
  longitude: 139.70372892916203,
});
```

<br />

#### `pushSticker(packageId, stickerId)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#sticker-message)

Alias: `sendSticker`.

Sends sticker message to the receiver using ID.
For a list of stickers that can be sent with the Messaging API, see the [sticker list](https://developers.line.me/media/messaging-api/messages/sticker_list.pdf).

<img src="https://user-images.githubusercontent.com/563929/82654187-ec10d980-9c52-11ea-9a81-dd8469d75e08.png" width="250px" />

| Param     | Type     | Description |
| --------- | -------- | ----------- |
| packageId | `String` | Package ID. |
| stickerId | `String` | Sticker ID. |

Example:

```js
context.pushSticker({ packageId: '1', stickerId: '1' });
```

<br />

### Push Imagemap Message

#### `pushImagemap(altText, imagemap)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#imagemap-message)

Alias: `sendImagemap`.

Sends imagemap message using ID of the receiver.

<img src="https://user-images.githubusercontent.com/563929/82654362-309c7500-9c53-11ea-9252-c12dd84ae003.png" width="250px" />

| Param                    | Type       | Description                            |
| ------------------------ | ---------- | -------------------------------------- |
| altText                  | `String`   | Alternative text.                      |
| imagemap                 | `Object`   | Object contains imagemap's parameters. |
| imagemap.baseUrl         | `String`   | Base URL of image.                     |
| imagemap.baseSize        | `Object`   | Base size object.                      |
| imagemap.baseSize.width  | `Number`   | Width of base image.                   |
| imagemap.baseSize.height | `Number`   | Height of base image.                  |
| imagemap.actions         | `Object[]` | Action when tapped.                    |

Example:

```js
context.pushImagemap('this is an imagemap', {
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

#### `pushTemplate(altText, template)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#template-messages)

Alias: `sendTemplate`.

Sends template message to the receiver using ID.

| Param    | Type     | Description                               |
| -------- | -------- | ----------------------------------------- |
| altText  | `String` | Alternative text.                         |
| template | `Object` | Object with the contents of the template. |

Example:

```js
context.pushTemplate('this is a template', {
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

#### `pushButtonTemplate(altText, buttonTemplate)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#buttons)

Alias: `pushButtonsTemplate`, `sendButtonTemplate`, `sendButtonsTemplate`.

Sends button template message to the receiver using ID.

<img src="https://user-images.githubusercontent.com/563929/82654518-735e4d00-9c53-11ea-9299-34eb4e3fb853.png" width="250px" />

| Param                               | Type       | Description                                                                                   |
| ----------------------------------- | ---------- | --------------------------------------------------------------------------------------------- |
| altText                             | `String`   | Alternative text.                                                                             |
| buttonTemplate                      | `Object`   | Object contains buttonTemplate's parameters.                                                  |
| buttonTemplate.thumbnailImageUrl    | `String`   | Image URL of buttonTemplate.                                                                  |
| buttonTemplate.imageAspectRatio     | `String`   | Aspect ratio of the image. Specify one of the following values: `rectangle`, `square`         |
| buttonTemplate.imageSize            | `String`   | Size of the image. Specify one of the following values: `cover`, `contain`                    |
| buttonTemplate.imageBackgroundColor | `String`   | Background color of image. Specify a RGB color value. The default value is `#FFFFFF` (white). |
| buttonTemplate.title                | `String`   | Title of buttonTemplate.                                                                      |
| buttonTemplate.text                 | `String`   | Message text of buttonTemplate.                                                               |
| buttonTemplate.defaultAction        | `Object`   | Action when image is tapped; set for the entire image, title, and text area.                  |
| buttonTemplate.actions              | `Object[]` | Action when tapped.                                                                           |

Example:

```js
context.pushButtonTemplate('this is a template', {
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

#### `pushConfirmTemplate(altText, confirmTemplate)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#confirm)

Alias: `sendConfirmTemplate`.

Sends confirm template message using ID of the receiver.

<img src="https://user-images.githubusercontent.com/563929/82654609-9426a280-9c53-11ea-916c-d8a7f76bf119.png" width="250px" />

| Param                   | Type       | Description                                   |
| ----------------------- | ---------- | --------------------------------------------- |
| altText                 | `String`   | Alternative text.                             |
| confirmTemplate         | `Object`   | Object contains confirmTemplate's parameters. |
| confirmTemplate.text    | `String`   | Message text of confirmTemplate.              |
| confirmTemplate.actions | `Object[]` | Action when tapped.                           |

Example:

```js
context.pushConfirmTemplate('this is a confirm template', {
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

#### `pushCarouselTemplate(altText, carouselItems, options)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#carousel)

Alias: `sendCarouselTemplate`.

Sends carousel template message to the receiver using ID.

<img src="https://user-images.githubusercontent.com/563929/82654829-e071e280-9c53-11ea-9948-1142e34e73db.png" width="250px" />

| Param                    | Type       | Description                                                                           |
| ------------------------ | ---------- | ------------------------------------------------------------------------------------- |
| altText                  | `String`   | Alternative text.                                                                     |
| carouselItems            | `Object[]` | Array of columns which contains object for carousel.                                  |
| options                  | `Object`   | Object contains options.                                                              |
| options.imageAspectRatio | `String`   | Aspect ratio of the image. Specify one of the following values: `rectangle`, `square` |
| options.imageSize        | `String`   | Size of the image. Specify one of the following values: `cover`, `contain`            |

Example:

```js
context.pushCarouselTemplate('this is a carousel template', [
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

#### `pushImageCarouselTemplate(altText, carouselItems)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#image-carousel)

Alias: `sendImageCarouselTemplate`.

Sends image carousel template message to the receiver using ID.

<img src="https://user-images.githubusercontent.com/563929/82655190-62620b80-9c54-11ea-981d-cb0ae8e2da9a.png" width="250px" />

| Param         | Type       | Description                                                |
| ------------- | ---------- | ---------------------------------------------------------- |
| altText       | `String`   | Alternative text.                                          |
| carouselItems | `Object[]` | Array of columns which contains object for image carousel. |

Example:

```js
context.pushImageCarouselTemplate('this is an image carousel template', [
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
]);
```

<br />

### Push Flex Messages

#### `pushFlex(altText, contents)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#flex-message)

Sends flex message using ID of the receiver.

<img src="https://user-images.githubusercontent.com/563929/82655544-eae0ac00-9c54-11ea-8171-6f9526405dfa.png" />

| Param    | Type     | Description                                                                                             |
| -------- | -------- | ------------------------------------------------------------------------------------------------------- |
| altText  | `String` | Alternative text.                                                                                       |
| contents | `Object` | Flex Message [container](https://developers.line.me/en/docs/messaging-api/reference/#container) object. |

Example:

```js
context.pushFlex('this is a flex', {
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

<a id="profile-api" />

### Profile API - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#get-profile)

#### `getUserProfile()`

Gets user profile information.

Example:

```js
context.getUserProfile().then(profile => {
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

### Group/Room Member Profile API - [Official Docs](https://developers.line.me/en/docs/messaging-api/group-chats/#getting-a-user-profile-of-a-member-of-a-group-or-room)

#### `getMemberProfile(userId)`

Gets the user profile of a member of the group/room that the bot is in. This includes the user IDs of users who has not added the bot as a friend or has blocked the bot.

| Param  | Type     | Description     |
| ------ | -------- | --------------- |
| userId | `String` | ID of the user. |

Example:

```js
context.getMemberProfile(USER_ID).then(member => {
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

### Group/Room Member IDs API - [Official Docs](https://developers.line.me/en/docs/messaging-api/group-chats/#getting-user-ids-of-the-members-of-a-group-or-room)

#### `getMemberIds(start)`

Gets the ID of the users of the members of the group/room that the bot is in. This includes the user IDs of users who have not added the bot as a friend or has blocked the bot.
<br />
This feature is only available for LINE@ Approved accounts or official accounts.

| Param | Type     | Description          |
| ----- | -------- | -------------------- |
| start | `String` | `continuationToken`. |

Example:

```js
context.getMemberIds(CURSOR).then(res => {
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

#### `getAllMemberIds()`

Recursively gets the ID of the users of the members of the group/room that the bot is in using cursors.
<br />
This feature is only available for LINE@ Approved accounts or official accounts.

Example:

```js
context.getAllMemberIds().then(ids => {
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

### Leave API - [Official Docs](https://developers.line.me/en/docs/messaging-api/group-chats/#leaving-a-group-or-room)

#### `leave()`

Leave from the group or room.

Example:

```js
context.leave();
```

<br />

<a id="rich-menu-api" />

### Rich Menu API - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#rich-menu)

<br />

#### `getLinkedRichMenu()` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#get-rich-menu-id-of-user)

Gets the ID of the rich menu linked to the user.

Example:

```js
context.getLinkedRichMenu().then(richMenu => {
  console.log(richMenu);
  // {
  //   richMenuId: "{richMenuId}"
  // }
});
```

<br />

#### `linkRichMenu(richMenuId)` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#link-rich-menu-to-user)

Links a rich menu to the user.

| Param      | Type     | Description                  |
| ---------- | -------- | ---------------------------- |
| richMenuId | `String` | ID of an uploaded rich menu. |

Example:

```js
context.linkRichMenu(RICH_MENU_ID);
```

<br />

#### `unlinkRichMenu()` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#unlink-rich-menu-from-user)

Unlinks a rich menu from the user.

Example:

```js
context.unlinkRichMenu();
```

<br />

<a id="account-link-api" />

### Account Link API - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#account-link)

#### `issueLinkToken()` - [Official Docs](https://developers.line.me/en/docs/messaging-api/reference/#issue-link-token)

Issues a link token used for the [account link](https://developers.line.me/en/docs/messaging-api/linking-accounts/) feature.

Example:

```js
context.issueLinkToken().then(result => {
  console.log(result);
  // {
  //   linkToken: 'NMZTNuVrPTqlr2IF8Bnymkb7rXfYv5EY',
  // }
});
```
