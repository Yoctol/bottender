---
id: channel-viber-sending-messages
title: Sending Viber Messages
original_id: channel-viber-sending-messages
---

## Sending Text Messages

Use this method to send text messages.

```js
async function SendHi(context) {
  await context.sendText('Hi!');
}
```

Which in turn will look like this:

![](https://user-images.githubusercontent.com/3382565/31481925-61e46008-aeeb-11e7-842f-79fee8066c6a.jpg)

For more information, please refer to Viber's official doc, [Text message](https://developers.viber.com/docs/api/rest-bot-api/#text-message).

## Sending Picture Messages

Use this method to send picture.

```js
await context.sendPicture({
  text: 'Photo description',
  media: 'http://www.images.com/img.jpg',
  thumbnail: 'http://www.images.com/thumb.jpg',
});
```

Which in turn will look like this:

![](https://user-images.githubusercontent.com/3382565/31481916-5ec6cdac-aeeb-11e7-878b-6c8c4211a760.jpg)

For more information, please refer to Viber's official doc, [Picture message](https://developers.viber.com/docs/api/rest-bot-api/#picture-message).

## Sending Video Messages

Use this method to send videos.

```js
await context.sendVideo({
  media: 'http://www.images.com/video.mp4',
  size: 10000,
  thumbnail: 'http://www.images.com/thumb.jpg',
  duration: 10,
});
```

Which in turn will look like this:

![](https://user-images.githubusercontent.com/3382565/31481918-5fa12074-aeeb-11e7-8287-830197d93b5b.jpg)

For more information, please refer to Viber's official doc, [Video message](https://developers.viber.com/docs/api/rest-bot-api/#video-message).

## Sending File Messages

Use this method to send files.

```js
await context.sendFile({
  media: 'http://www.images.com/file.doc',
  size: 10000,
  fileName: 'name_of_file.doc',
});
```

Which in turn will look like this:

![](https://user-images.githubusercontent.com/3382565/31481919-600f437e-aeeb-11e7-9f13-7269a055cb86.jpg)

For more information, please refer to Viber's official doc, [File message](https://developers.viber.com/docs/api/rest-bot-api/#file-message).

## Sending Contact Messages

Use this method to send contact messages.

```js
await context.sendContact({
  name: 'Itamar',
  phoneNumber: '+972511123123',
});
```

Which in turn will look like this:

![](https://user-images.githubusercontent.com/3382565/31481924-615ce8b2-aeeb-11e7-8425-2d3bfa115fc1.jpg)

For more information, please refer to Viber's official doc, [Contact message](https://developers.viber.com/docs/api/rest-bot-api/#contact-message).

## Sending Location Messages

Use this method to send a location point on the map.

```js
await context.sendLocation({
  lat: '37.7898',
  lon: '-122.3942',
});
```

Which in turn will look like this:

![](https://user-images.githubusercontent.com/3382565/31481923-61199a9e-aeeb-11e7-8a25-e3813eceb25b.jpg)

For more information, please refer to Viber's official doc, [Location message](https://developers.viber.com/docs/api/rest-bot-api/#location-message).

## Sending URL Messages

Use this method to send URLs.

```js
await client.sendURL('http://developers.viber.com');
```

Which in turn will look like this:

![](https://user-images.githubusercontent.com/3382565/31481921-6069f346-aeeb-11e7-97bf-83a17da0bc7a.jpg)

For more information, please refer to Viber's official doc, [URL message](https://developers.viber.com/docs/api/rest-bot-api/#url-message).

## Sending Sticker Messages

Use this method to send stickers.

```js
await context.sendSticker(46105);
```

Which in turn will look like this:

![](https://user-images.githubusercontent.com/3382565/31481922-60c2c444-aeeb-11e7-8fc9-bce2e5d06c42.jpg)

For more information, please refer to Viber's official doc, [Sticker message](https://developers.viber.com/docs/api/rest-bot-api/#sticker-message).

## Sending Carousel Content Messages

Use this method to send carousel messages.

```js
await context.sendCarouselContent({
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
      Rows: 3,
      ActionType: 'open-url',
      ActionBody: 'https://www.google.com',
      Image: 'https://s16.postimg.org/wi8jx20wl/image_RMsmall2.png',
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

Which in turn will look like this:

![](https://user-images.githubusercontent.com/3382565/31481917-5f1b43b4-aeeb-11e7-8557-e25951d69b53.jpg)

For more information, please refer to Viber's official doc, [Rich Media message / Carousel content message](https://developers.viber.com/docs/api/rest-bot-api/#rich-media-message--carousel-content-message).

## Sending with Keyboard

Use `keyboard` option to send keyboard with the message.

```js
await context.sendText('Hello', {
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

![](https://camo.githubusercontent.com/fe2141c452f4cf0ed0f7854f51c589b15873a317/68747470733a2f2f646576656c6f706572732e76696265722e636f6d2f646f63732f696d672f6578616d706c655f6b6579626f6172642e706e67)

For more information, please refer to Viber's official doc, [Keyboards](https://developers.viber.com/docs/api/rest-bot-api/#keyboards).
