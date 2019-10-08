---
id: api-lineevent
title: LineEvent
---

#### `rawEvent`

Underlying raw event from LINE.

Example:

```js
event.rawEvent;
// {
//   replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
//   type: 'message',
//   timestamp: 1462629479859,
//   source: {
//     type: 'user',
//     userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
//   },
//   message: {
//     id: '325708',
//     type: 'text',
//     text: 'Hello, world',
//   },
// }
```

#### `replyToken`

The reply token from LINE raw event. Only present on message, follow, join, postback, beacon events.

Example:

```js
event.replyToken; // 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA'
```

#### `source`

The source object from LINE raw event.

Example:

```js
event.source;
// {
//   type: 'user',
//   userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
// }
```

#### `isMessage`

Determine if the event is a message event.

Example:

```js
event.isMessage; // true
```

#### `message`

The message object from LINE raw event.

Example:

```js
event.message;
// {
//   id: '325708',
//   type: 'text',
//   text: 'Hello, world',
// }
```

#### `isText`

Determine if the event is a message event which includes text.

Example:

```js
event.isText; // true
```

#### `text`

The text string from LINE raw event.

Example:

```js
event.text; // 'Hello, world'
```

#### `isImage`

Determine if the event is a message event which includes image.

Example:

```js
event.isImage; // true
```

#### `image`

The image object from LINE raw event.

Example:

```js
event.image;
// {
//   id: '325708',
//   type: 'image',
// }
```

#### `isVideo`

Determine if the event is a message event which includes video.

Example:

```js
event.isVideo; // true
```

#### `video`

The video object from LINE raw event.

Example:

```js
event.video;
// {
//   id: '325708',
//   type: 'video',
// }
```

#### `isAudio`

Determine if the event is a message event which includes audio.

Example:

```js
event.isAudio; // true
```

#### `audio`

The audio object from LINE raw event.

Example:

```js
event.audio;
// {
//   id: '325708',
//   type: 'audio',
// }
```

#### `isLocation`

Determine if the event is a message event which includes location.

Example:

```js
event.isLocation; // true
```

#### `location`

The location object from LINE raw event.

Example:

```js
event.location;
// {
//   address: 'Golden Gate Bridge, San Francisco, CA, United States',
//   id: '325708',
//   latitude: 37.819722,
//   longitude: -122.478611,
//   title: 'my location',
//   type: 'location',
// }
```

#### `isSticker`

Determine if the event is a message event which includes sticker.

Example:

```js
event.isSticker; // true
```

#### `sticker`

The sticker object from LINE raw event.

Example:

```js
event.sticker;
// {
//   id: '325708',
//   packageId: '1',
//   stickerId: '1',
//   type: 'sticker',
// }
```

#### `isFollow`

Determine if the event is a follow event.

Example:

```js
event.isFollow; // true
```

#### `follow`

The source object from LINE raw event.

Example:

```js
event.follow;
// {
//   type: 'user',
//   userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
// }
```

#### `isUnfollow`

Determine if the event is an unfollow event.

Example:

```js
event.isUnfollow; // true
```

#### `unfollow`

The source object from LINE raw event.

Example:

```js
event.unfollow;
// {
//   type: 'user',
//   userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
// }
```

#### `isJoin`

Determine if the event is a join event.

Example:

```js
event.isJoin; // true
```

#### `join`

The source object from LINE raw event.

Example:

```js
event.join;
// {
//   type: 'group',
//   groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
// }
```

#### `isLeave`

Determine if the event is a leave event.

Example:

```js
event.isLeave; // true
```

#### `leave`

The source object from LINE raw event.

Example:

```js
event.leave;
// {
//   type: 'group',
//   groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
// }
```

#### `isPostback`

Determine if the event is a postback event.

Example:

```js
event.isPostback; // true
```

#### `postback`

The postback object from LINE raw event.

Example:

```js
event.postback;
// {
//   data: 'action=buyItem&itemId=123123&color=red',
// }
```

#### `isPayload`

Determine if the event is a postback event.

Example:

```js
event.isPayload; // true
```

#### `payload`

The payload string from LINE raw event.

Example:

```js
event.payload; // 'action=buyItem&itemId=123123&color=red'
```

#### `date`

The date string from LINE postback event.

Example:

```js
event.date; // '2017-09-06'
```

#### `time`

The time string from LINE postback event.

Example:

```js
event.time; // '12:30'
```

#### `datetime`

The datetime string from LINE postback event.

Example:

```js
event.datetime; // '2017-09-06T12:30'
```

#### `isBeacon`

Determine if the event is a beacon event.

Example:

```js
event.isBeacon; // true
```

#### `beacon`

The beacon object from LINE raw event.

Example:

```js
event.beacon;
// {
//   hwid: 'd41d8cd98f',
//   type: 'enter',
// }
```

#### `isAccountLink`

Determine if the event is an accountLink event.

Example:

```js
event.isAccountLink; // true
```

#### `accountLink`

The link object from LINE raw event.

Example:

```js
event.accountLink;
// {
//   result: 'ok',
//   nonce: 'xxxxxxxxxxxxxxx',
// }
```
