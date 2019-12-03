---
id: version-1.0.0-beta-api-viber-context
title: ViberContext
original_id: api-viber-context
---

- [Send API](#send-api)
- [Keyboards](#keyboards)
- [Get User Details](#get-user-details)
- [Get Online](#get-online)

### Send API

#### `sendMessage(message)` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#send-message)

Sending a message to the user.

| Param   | Type     | Description                     |
| ------- | -------- | ------------------------------- |
| message | `Object` | Message and options to be sent. |

Example:

```js
context.sendMessage({
  type: 'text',
  text: 'Hello',
});
```

> **Note:** Maximum total JSON size of the request is 30kb.

<br />

#### `sendText(text [, options])` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#text-message)

Sending a text message to the user.

<img src="https://user-images.githubusercontent.com/3382565/31481925-61e46008-aeeb-11e7-842f-79fee8066c6a.jpg" width="300" />

| Param   | Type     | Description                |
| ------- | -------- | -------------------------- |
| text    | `String` | The text of the message.   |
| options | `Object` | Other optional parameters. |

Example:

```js
context.sendText('Hello');
```

<br />

#### `sendPicture(picture [, options])` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#picture-message)

Sending a picture message to the user.

<img src="https://user-images.githubusercontent.com/3382565/31481916-5ec6cdac-aeeb-11e7-878b-6c8c4211a760.jpg" width="300" />

| Param             | Type     | Description                                                                                                                                                       |
| ----------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| picture           | `Object` |
| picture.text      | `String` | Description of the photo. Can be an empty string if irrelevant. Max 120 characters.                                                                               |
| picture.media     | `String` | URL of the image (JPEG). Max size 1 MB. Only JPEG format is supported. Other image formats as well as animated GIFs can be sent as URL messages or file messages. |
| picture.thumbnail | `String` | URL of a reduced size image (JPEG). Max size 100 kb. Recommended: 400x400. Only JPEG format is supported.                                                         |
| options           | `Object` | Other optional parameters.                                                                                                                                        |

Example:

```js
context.sendPicture({
  text: 'Photo description',
  media: 'http://www.images.com/img.jpg',
  thumbnail: 'http://www.images.com/thumb.jpg',
});
```

<br />

#### `sendVideo(video [, options])` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#video-message)

Sending a video message to the user.

<img src="https://user-images.githubusercontent.com/3382565/31481918-5fa12074-aeeb-11e7-8287-830197d93b5b.jpg" width="300" />

| Param           | Type     | Description                                                                                               |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| video           | `Object` |
| video.media     | `String` | URL of the video (MP4, H264). Max size 50 MB. Only MP4 and H264 are supported.                            |
| video.size      | `Number` | Size of the video in bytes.                                                                               |
| video.duration  | `Number` | Video duration in seconds; will be displayed to the receiver. Max 180 seconds.                            |
| video.thumbnail | `String` | URL of a reduced size image (JPEG). Max size 100 kb. Recommended: 400x400. Only JPEG format is supported. |
| options         | `Object` | Other optional parameters.                                                                                |

Example:

```js
context.sendVideo({
  media: 'http://www.images.com/video.mp4',
  size: 10000,
  thumbnail: 'http://www.images.com/thumb.jpg',
  duration: 10,
});
```

<br />

#### `sendFile(file [, options])` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#file-message)

Sending a file message to the user.

<img src="https://user-images.githubusercontent.com/3382565/31481919-600f437e-aeeb-11e7-9f13-7269a055cb86.jpg" width="300" />

| Param         | Type     | Description                                                                                                                                                         |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| file          | `Object` |
| file.media    | `String` | URL of the file. Max size 50 MB. See [forbidden file formats](https://developers.viber.com/docs/api/rest-bot-api/#forbiddenFileFormats) for unsupported file types. |
| file.size     | `Number` | Size of the file in bytes.                                                                                                                                          |
| file.fileName | `String` | Name of the file. File name should include extension. Max 256 characters (including file extension).                                                                |
| options       | `Object` | Other optional parameters.                                                                                                                                          |

Example:

```js
context.sendFile({
  media: 'http://www.images.com/file.doc',
  size: 10000,
  fileName: 'name_of_file.doc',
});
```

<br />

#### `sendContact(contact [, options])` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#contact-message)

Sending a contact message to the user.

<img src="https://user-images.githubusercontent.com/3382565/31481924-615ce8b2-aeeb-11e7-8425-2d3bfa115fc1.jpg" width="300" />

| Param               | Type     | Description                                     |
| ------------------- | -------- | ----------------------------------------------- |
| contact             | `Object` |
| contact.name        | `String` | Name of the contact. Max 28 characters.         |
| contact.phoneNumber | `String` | Phone number of the contact. Max 18 characters. |
| options             | `Object` | Other optional parameters.                      |

Example:

```js
context.sendContact({
  name: 'Itamar',
  phoneNumber: '+972511123123',
});
```

<br />

#### `sendLocation(location [, options])` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#location-message)

Sending a location message to the user.

<img src="https://user-images.githubusercontent.com/3382565/31481923-61199a9e-aeeb-11e7-8a25-e3813eceb25b.jpg" width="300" />

| Param        | Type     | Description                            |
| ------------ | -------- | -------------------------------------- |
| location     | `Object` |
| location.lat | `String` | Latitude (±90°) within valid ranges.   |
| location.lon | `String` | Longitude (±180°) within valid ranges. |
| options      | `Object` | Other optional parameters.             |

Example:

```js
context.sendLocation({
  lat: '37.7898',
  lon: '-122.3942',
});
```

<br />

#### `sendURL(url [, options])` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#url-message)

Sending an URL message to the user.

<img src="https://user-images.githubusercontent.com/3382565/31481921-6069f346-aeeb-11e7-97bf-83a17da0bc7a.jpg" width="300" />

| Param   | Type     | Description                |
| ------- | -------- | -------------------------- |
| url     | `String` | URL. Max 2,000 characters. |
| options | `Object` | Other optional parameters. |

Example:

```js
context.sendURL('http://developers.viber.com');
```

<br />

#### `sendSticker(stickerId [, options])` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#sticker-message)

Sending a sticker message to the user.

<img src="https://user-images.githubusercontent.com/3382565/31481922-60c2c444-aeeb-11e7-8fc9-bce2e5d06c42.jpg" width="300" />

| Param     | Type     | Description                                                                                                          |
| --------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| stickerId | `Number` | Unique Viber sticker ID. For examples visit the [sticker IDs](https://viber.github.io/docs/tools/sticker-ids/) page. |
| options   | `Object` | Other optional parameters.                                                                                           |

Example:

```js
context.sendSticker(46105);
```

<br />

#### `sendCarouselContent(richMedia [, options])` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#carousel-content-message)

Sending a carousel content message to the user.

<img src="https://user-images.githubusercontent.com/3382565/31481917-5f1b43b4-aeeb-11e7-8557-e25951d69b53.jpg" width="300" />

| Param                         | Type       | Description                                                                              |
| ----------------------------- | ---------- | ---------------------------------------------------------------------------------------- |
| richMedia.buttonsGroupColumns | `Number`   | Number of columns per carousel content block. Default 6 columns. Possible values: 1 - 6. |
| richMedia.buttonsGroupRows    | `Number`   | Number of rows per carousel content block. Default 7 rows. Possible values: 1 - 7.       |
| richMedia.buttons             | `Object[]` | Array of buttons. Max of 6 _ ButtonsGroupColumns _ ButtonsGroupRows.                     |
| options                       | `Object`   | Other optional parameters.                                                               |

Example:

```js
context.sendCarouselContent({
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
      text:
        '<font color=#323232><b>Headphones with Microphone, On-ear Wired earphones</b></font><font color=#777777><br>Sound Intone </font><font color=#6fc133>$17.99</font>',
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
      text:
        "<font color=#323232><b>Hanes Men's Humor Graphic T-Shirt</b></font><font color=#777777><br>Hanes</font><font color=#6fc133>$10.99</font>",
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

The Viber API allows sending a custom keyboard using the send_message API, to supply the user with a set of predefined replies or actions. Keyboards can be attached to any message type and be sent and displayed together. To attach a keyboard to a message simply add the keyboard’s parameters to the options:

```js
context.sendText('Hello', {
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

### Get User Details

#### `getUserDetails()` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#get-user-details)

It will fetch the details of the user.

Example:

```js
context.getUserDetails().then(user => {
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

-->

<br />

### Get Online

#### `getOnlineStatus()` - [Official Docs](https://developers.viber.com/docs/api/rest-bot-api/#get-online)

It will fetch the online status of the user.

Example:

```js
context.getOnlineStatus().then(status => {
  console.log(status);
  // {
  //   id: '01234567891=',
  //   onlineStatus: 1,
  //   onlineStatusMessage: 'offline',
  //   lastOnline: 1457764197627,
  // }
});
```
