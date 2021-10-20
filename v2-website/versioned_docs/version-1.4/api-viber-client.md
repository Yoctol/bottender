---
id: api-viber-client
title: ViberClient
original_id: api-viber-client
---

- [Usage](#usage)
- [Methods](#methods)
  - [Webhook API](#webhook-api)
  - [Send API](#send-api)
  - [Keyboards](#keyboards)
  - [Broadcast API](#broadcast-api)
  - [Get Account Info](#get-account-info)
  - [Get User Details](#get-user-details)
  - [Get Online](#get-online)
- [Debug Tips](#debug-tips)
- [Test](#test)

## Usage

Get the `ViberClient` instance using the `getClient` function:

```js
const { getClient } = require('bottender');

const client = getClient('viber');

// `client` is a `ViberClient` instance
const accountInfo = await context.client.getAccountInfo();
```

Or, get the `ViberClient` instance from the `context`:

```js
async function MyAction(context) {
  if (context.platform === 'viber') {
    // `context.client` is a `ViberClient` instance
    const accountInfo = await context.client.getAccountInfo();
  }
}
```

### Error Handling

`ViberClient` uses [axios](https://github.com/axios/axios) as HTTP client. We use [axios-error](https://github.com/Yoctol/messaging-apis/tree/master/packages/axios-error) package to wrap API error instances for better formatting error messages. Calling `console.log` with the error instance returns the formatted message. If you'd like to get the axios `request`, `response`, or `config`, you can still get them via those keys on the error instance.

```js
client.setWebhook(url).catch((error) => {
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

### Webhook API

#### `setWebhook(url [, eventTypes])`

Setting a Webhook.

| Param      | Type            | Description                                                                                                                                                                                          |
| ---------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url        | `String`        | HTTPS Account webhook URL to receive callbacks & messages from users.                                                                                                                                |
| eventTypes | `Array<String>` | Indicates the types of Viber events that the account owner would like to be notified about. Possible values: `delivered`, `seen`, `failed`, `subscribed`, `unsubscribed` and `conversation_started`. |

Example:

```js
client.setWebhook('https://4a16faff.ngrok.io/');
```

You can filter event types using optional parameter:

```js
client.setWebhook('https://4a16faff.ngrok.io/', [
  'delivered',
  'seen',
  'conversation_started',
]);
```

<br />

#### `removeWebhook`

Removing your webhook.

Example:

```js
client.removeWebhook();
```

<br />

### Send API

#### `sendMessage(receiver, message)` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#send-message)

Sending a message to a user.

| Param    | Type     | Description                     |
| -------- | -------- | ------------------------------- |
| receiver | `String` | Unique Viber user id.           |
| message  | `Object` | Message and options to be sent. |

Example:

```js
client.sendMessage(USER_ID, {
  type: 'text',
  text: 'Hello',
});
```

> Note: Maximum total JSON size of the request is 30kb.

<br />

#### `sendText(receiver, text [, options])` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#text-message)

Sending a text message to a user.

<img src="https://user-images.githubusercontent.com/3382565/31481925-61e46008-aeeb-11e7-842f-79fee8066c6a.jpg" width="300" />

| Param    | Type     | Description                |
| -------- | -------- | -------------------------- |
| receiver | `String` | Unique Viber user id.      |
| text     | `String` | The text of the message.   |
| options  | `Object` | Other optional parameters. |

Example:

```js
client.sendText(USER_ID, 'Hello');
```

<br />

#### `sendPicture(receiver, picture [, options])` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#picture-message)

Sending a picture message to a user.

<img src="https://user-images.githubusercontent.com/3382565/31481916-5ec6cdac-aeeb-11e7-878b-6c8c4211a760.jpg" width="300" />

| Param             | Type     | Description                                                                                                                                                       |
| ----------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| receiver          | `String` | Unique Viber user id.                                                                                                                                             |
| picture           | `Object` |
| picture.text      | `String` | Description of the photo. Can be an empty string if irrelevant. Max 120 characters.                                                                               |
| picture.media     | `String` | URL of the image (JPEG). Max size 1 MB. Only JPEG format is supported. Other image formats as well as animated GIFs can be sent as URL messages or file messages. |
| picture.thumbnail | `String` | URL of a reduced size image (JPEG). Max size 100 kb. Recommended: 400x400. Only JPEG format is supported.                                                         |
| options           | `Object` | Other optional parameters.                                                                                                                                        |

Example:

```js
client.sendPicture(USER_ID, {
  text: 'Photo description',
  media: 'http://www.images.com/img.jpg',
  thumbnail: 'http://www.images.com/thumb.jpg',
});
```

<br />

#### `sendVideo(receiver, video [, options])` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#video-message)

Sending a video message to a user.

<img src="https://user-images.githubusercontent.com/3382565/31481918-5fa12074-aeeb-11e7-8287-830197d93b5b.jpg" width="300" />

| Param           | Type     | Description                                                                                               |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| receiver        | `String` | Unique Viber user id.                                                                                     |
| video           | `Object` |
| video.media     | `String` | URL of the video (MP4, H264). Max size 50 MB. Only MP4 and H264 are supported.                            |
| video.size      | `Number` | Size of the video in bytes.                                                                               |
| video.duration  | `Number` | Video duration in seconds; will be displayed to the receiver. Max 180 seconds.                            |
| video.thumbnail | `String` | URL of a reduced size image (JPEG). Max size 100 kb. Recommended: 400x400. Only JPEG format is supported. |
| options         | `Object` | Other optional parameters.                                                                                |

Example:

```js
client.sendVideo(USER_ID, {
  media: 'http://www.images.com/video.mp4',
  size: 10000,
  thumbnail: 'http://www.images.com/thumb.jpg',
  duration: 10,
});
```

<br />

#### `sendFile(receiver, file [, options])` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#file-message)

Sending a file message to a user.

<img src="https://user-images.githubusercontent.com/3382565/31481919-600f437e-aeeb-11e7-9f13-7269a055cb86.jpg" width="300" />

| Param         | Type     | Description                                                                                                                                                         |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| receiver      | `String` | Unique Viber user id.                                                                                                                                               |
| file          | `Object` |
| file.media    | `String` | URL of the file. Max size 50 MB. See [forbidden file formats](https://developers.viber.com/docs/api/rest-bot-api/#forbiddenFileFormats) for unsupported file types. |
| file.size     | `Number` | Size of the file in bytes.                                                                                                                                          |
| file.fileName | `String` | Name of the file. File name should include extension. Max 256 characters (including file extension).                                                                |
| options       | `Object` | Other optional parameters.                                                                                                                                          |

Example:

```js
client.sendFile(USER_ID, {
  media: 'http://www.images.com/file.doc',
  size: 10000,
  fileName: 'name_of_file.doc',
});
```

<br />

#### `sendContact(receiver, contact [, options])` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#contact-message)

Sending a contact message to a user.

<img src="https://user-images.githubusercontent.com/3382565/31481924-615ce8b2-aeeb-11e7-8425-2d3bfa115fc1.jpg" width="300" />

| Param               | Type     | Description                                     |
| ------------------- | -------- | ----------------------------------------------- |
| receiver            | `String` | Unique Viber user id.                           |
| contact             | `Object` |
| contact.name        | `String` | Name of the contact. Max 28 characters.         |
| contact.phoneNumber | `String` | Phone number of the contact. Max 18 characters. |
| options             | `Object` | Other optional parameters.                      |

Example:

```js
client.sendContact(USER_ID, {
  name: 'Itamar',
  phoneNumber: '+972511123123',
});
```

<br />

#### `sendLocation(receiver, location [, options])` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#location-message)

Sending a location message to a user.

<img src="https://user-images.githubusercontent.com/3382565/31481923-61199a9e-aeeb-11e7-8a25-e3813eceb25b.jpg" width="300" />

| Param        | Type     | Description                            |
| ------------ | -------- | -------------------------------------- |
| receiver     | `String` | Unique Viber user id.                  |
| location     | `Object` |
| location.lat | `String` | Latitude (±90°) within valid ranges.   |
| location.lon | `String` | Longitude (±180°) within valid ranges. |
| options      | `Object` | Other optional parameters.             |

Example:

```js
client.sendLocation(USER_ID, {
  lat: '37.7898',
  lon: '-122.3942',
});
```

<br />

#### `sendURL(receiver, url [, options])` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#url-message)

Sending an URL message to a user.

<img src="https://user-images.githubusercontent.com/3382565/31481921-6069f346-aeeb-11e7-97bf-83a17da0bc7a.jpg" width="300" />

| Param    | Type     | Description                |
| -------- | -------- | -------------------------- |
| receiver | `String` | Unique Viber user id.      |
| url      | `String` | URL. Max 2,000 characters. |
| options  | `Object` | Other optional parameters. |

Example:

```js
client.sendURL(USER_ID, 'http://developers.viber.com');
```

<br />

#### `sendSticker(receiver, stickerId [, options])` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#sticker-message)

Sending a sticker message to a user.

<img src="https://user-images.githubusercontent.com/3382565/31481922-60c2c444-aeeb-11e7-8fc9-bce2e5d06c42.jpg" width="300" />

| Param     | Type     | Description                                                                                                          |
| --------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| receiver  | `String` | Unique Viber user id.                                                                                                |
| stickerId | `Number` | Unique Viber sticker ID. For examples visit the [sticker IDs](https://viber.github.io/docs/tools/sticker-ids/) page. |
| options   | `Object` | Other optional parameters.                                                                                           |

Example:

```js
client.sendSticker(USER_ID, 46105);
```

<br />

#### `sendCarouselContent(receiver, richMedia [, options])` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#carousel-content-message)

Sending a carousel content message to a user.

<img src="https://user-images.githubusercontent.com/3382565/31481917-5f1b43b4-aeeb-11e7-8557-e25951d69b53.jpg" width="300" />

| Param                         | Type            | Description                                                                              |
| ----------------------------- | --------------- | ---------------------------------------------------------------------------------------- |
| receiver                      | `String`        | Unique Viber user id.                                                                    |
| richMedia.ButtonsGroupColumns | `Number`        | Number of columns per carousel content block. Default 6 columns. Possible values: 1 - 6. |
| richMedia.ButtonsGroupRows    | `Number`        | Number of rows per carousel content block. Default 7 rows. Possible values: 1 - 7.       |
| richMedia.Buttons             | `Array<Object>` | Array of buttons. Max of 6 _ ButtonsGroupColumns _ ButtonsGroupRows.                     |
| options                       | `Object`        | Other optional parameters.                                                               |

Example:

```js
client.sendCarouselContent(USER_ID, {
  type: 'rich_media',
  buttonsGroupColumns: 6,
  buttonsGroupRows: 7,
  bgColor: '#FFFFFF',
  buttons: [
    {
      columns: 6,
      rows: 3,
      actionType: 'open-url',
      actionBody: 'https://www.google.com',
      image: 'http://html-test:8080/myweb/guy/assets/imageRMsmall2.png',
    },
    {
      columns: 6,
      rows: 2,
      text: '<font color=#323232><b>Headphones with Microphone, On-ear Wired earphones</b></font><font color=#777777><br/>Sound Intone </font><font color=#6fc133>$17.99</font>',
      actionType: 'open-url',
      actionBody: 'https://www.google.com',
      textSize: 'medium',
      textVAlign: 'middle',
      textHAlign: 'left',
    },
    {
      columns: 6,
      rows: 1,
      actionType: 'reply',
      actionBody: 'https://www.google.com',
      text: '<font color=#ffffff>Buy</font>',
      textSize: 'large',
      textVAlign: 'middle',
      textHAlign: 'middle',
      image: 'https://s14.postimg.org/4mmt4rw1t/Button.png',
    },
    {
      columns: 6,
      rows: 1,
      actionType: 'reply',
      actionBody: 'https://www.google.com',
      text: '<font color=#8367db>MORE DETAILS</font>',
      textSize: 'small',
      textVAlign: 'middle',
      textHAlign: 'middle',
    },
    {
      columns: 6,
      rows: 3,
      actionType: 'open-url',
      actionBody: 'https://www.google.com',
      image: 'https://s16.postimg.org/wi8jx20wl/image_RMsmall2.png',
    },
    {
      columns: 6,
      rows: 2,
      text: "<font color=#323232><b>Hanes Men's Humor Graphic T-Shirt</b></font><font color=#777777><br/>Hanes</font><font color=#6fc133>$10.99</font>",
      actionType: 'open-url',
      actionBody: 'https://www.google.com',
      textSize: 'medium',
      textVAlign: 'middle',
      textHAlign: 'left',
    },
    {
      columns: 6,
      rows: 1,
      actionType: 'reply',
      actionBody: 'https://www.google.com',
      text: '<font color=#ffffff>Buy</font>',
      textSize: 'large',
      textVAlign: 'middle',
      textHAlign: 'middle',
      image: 'https://s14.postimg.org/4mmt4rw1t/Button.png',
    },
    {
      columns: 6,
      rows: 1,
      actionType: 'reply',
      actionBody: 'https://www.google.com',
      text: '<font color=#8367db>MORE DETAILS</font>',
      textSize: 'small',
      textVAlign: 'middle',
      textHAlign: 'middle',
    },
  ],
});
```

<br />

<a id="keyboards" />

### Keyboards - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#keyboards)

The Viber API allows sending a custom keyboard using the send message API, to supply the user with a set of predefined replies or actions. Keyboards can be attached to any message type and be sent and displayed together. To attach a keyboard to a message simply add the keyboard’s parameters to the options:

```js
client.sendText(USER_ID, 'Hello', {
  keyboard: {
    defaultHeight: true,
    bgColor: '#FFFFFF',
    buttons: [
      {
        columns: 6,
        rows: 1,
        bgColor: '#2db9b9',
        bgMediaType: 'gif',
        bgMedia: 'http://www.url.by/test.gif',
        bgLoop: true,
        actionType: 'open-url',
        actionBody: 'www.tut.by',
        image: 'www.tut.by/img.jpg',
        text: 'Key text',
        textVAlign: 'middle',
        textHAlign: 'center',
        textOpacity: 60,
        textSize: 'regular',
      },
    ],
  },
});
```

Which in turn will look like this:

<img src="https://developers.viber.com/docs/img/example_keyboard.png" width="300" />

<br />

<a id="broadcast-api" />

### Broadcast API - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#broadcast-message)

Those API methods use the same parameters as the send methods with a few variations described below. You should specify a list of receivers instead of a single receiver.

- `broadcastMessage(broadcastList, message)`
- `broadcastText(broadcastList, text [, options])`
- `broadcastPicture(broadcastList, picture [, options])`
- `broadcastVideo(broadcastList, video [, options])`
- `broadcastFile(broadcastList, file [, options])`
- `broadcastContact(broadcastList, contact [, options])`
- `broadcastLocation(broadcastList, location [, options])`
- `broadcastURL(broadcastList, url [, options])`
- `broadcastSticker(broadcastList, stickerId [, options])`
- `broadcastCarouselContent(broadcastList, richMedia [, options])`

| Param         | Type            | Description                                                                                                                                                        |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| broadcastList | `Array<String>` | This mandatory parameter defines the recipients for the message. Every user must be subscribed and have a valid user id. The maximum list length is 300 receivers. |

Example:

```js
client
  .broadcastText(
    [
      'pttm25kSGUo1919sBORWyA==',
      '2yBSIsbzs7sSrh4oLm2hdQ==',
      'EGAZ3SZRi6zW1D0uNYhQHg==',
      'kBQYX9LrGyF5mm8JTxdmpw==',
    ],
    'a broadcast to everybody'
  )
  .then((result) => {
    console.log(result);
    // {
    //   messageToken: 40808912438712,
    //   status: 0,
    //   statusMessage: 'ok',
    //   failedList: [
    //     {
    //       receiver: 'pttm25kSGUo1919sBORWyA==',
    //       status: 6,
    //       statusMessage: 'Not subscribed',
    //     },
    //     {
    //       receiver: 'EGAZ3SZRi6zW1D0uNYhQHg==',
    //       status: 5,
    //       statusMessage: 'Not found',
    //     },
    //   ],
    // }
  });
```

<br />

### Get Account Info

#### `getAccountInfo()` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#get-account-info)

It will fetch the account’s details as registered in Viber.

Example:

```js
client.getAccountInfo().then((info) => {
  console.log(info);
  // {
  //   status: 0,
  //   statusMessage: 'ok',
  //   id: 'pa:75346594275468546724',
  //   name: 'account name',
  //   uri: 'accountUri',
  //   icon: 'http://example.com',
  //   background: 'http://example.com',
  //   category: 'category',
  //   subcategory: 'sub category',
  //   location: {
  //     lon: 0.1,
  //     lat: 0.2,
  //   },
  //   country: 'UK',
  //   webhook: 'https://my.site.com',
  //   eventTypes: ['delivered', 'seen'],
  //   subscribersCount: 35,
  //   members: [
  //     {
  //       id: '01234567890A=',
  //       name: 'my name',
  //       avatar: 'http://example.com',
  //       role: 'admin',
  //     },
  //   ],
  // }
});
```

<br />

### Get User Details

#### `getUserDetails(id)` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#get-user-details)

It will fetch the details of a specific Viber user based on his unique user ID.

| Param | Type     | Description           |
| ----- | -------- | --------------------- |
| id    | `String` | Unique Viber user id. |

Example:

```js
client.getUserDetails('01234567890A=').then((user) => {
  console.log(user);
  // {
  //   id: '01234567890A=',
  //   name: 'John McClane',
  //   avatar: 'http://avatar.example.com',
  //   country: 'UK',
  //   language: 'en',
  //   primaryDeviceOs: 'android 7.1',
  //   apiVersion: 1,
  //   viberVersion: '6.5.0',
  //   mcc: 1,
  //   mnc: 1,
  //   deviceType: 'iPhone9,4',
  // };
});
```

<br />

### Get Online

#### `getOnlineStatus(ids)` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#get-online)

It will fetch the online status of a given subscribed account members.

| Param | Type            | Description                                         |
| ----- | --------------- | --------------------------------------------------- |
| id    | `Array<String>` | Array of unique Viber user id. 100 ids per request. |

Example:

```js
client
  .getOnlineStatus(['01234567890=', '01234567891=', '01234567893='])
  .then((status) => {
    console.log(status);
    // [
    //   {
    //     id: '01234567890=',
    //     onlineStatus: 0,
    //     onlineStatusMessage: 'online',
    //   },
    //   {
    //     id: '01234567891=',
    //     onlineStatus: 1,
    //     onlineStatusMessage: 'offline',
    //     lastOnline: 1457764197627,
    //   },
    //   {
    //     id: '01234567893=',
    //     onlineStatus: 3,
    //     onlineStatusMessage: 'tryLater',
    //   },
    // ];
  });
```

## Debug Tips

### Log Requests Details

To enable default request debugger, use following `DEBUG` env variable:

```sh
DEBUG=messaging-api-viber
```

## Test

### Send Requests to Your Dummy Server

To avoid sending requests to the real Viber server, provide the `origin` option in your `bottender.js.config` file:

```js
module.exports = {
  channels: {
    viber: {
      enabled: true,
      path: '/webhooks/viber',
      accessToken: process.env.VIBER_ACCESS_TOKEN,
      sender: {
        name: 'Sender Name',
      },
      origin:
        process.env.NODE_ENV === 'test'
          ? 'https://mydummytestserver.com'
          : undefined,
    },
  },
};
```

> **Warning:** Don't do this on the production server.
