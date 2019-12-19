---
id: version-1.0.3-api-viber-event
title: ViberEvent
original_id: api-viber-event
---

#### `rawEvent`

Underlying raw event from Viber.

Example:

```js
event.rawEvent;
// {
//   event: 'message',
//   timestamp: 1457764197627,
//   message_token: 4912661846655238145,
//   sender: {
//     id: '01234567890A=',
//     name: 'John McClane',
//     avatar: 'http://avatar.example.com',
//     country: 'UK',
//     language: 'en',
//     api_version: 1,
//   },
//   message: {
//     type: 'text',
//     text: 'a message to the service',
//     tracking_data: 'tracking data',
//   },
// }
```

#### `isMessage`

Determine if the event is a message event.

Example:

```js
event.isMessage; // true
```

#### `message`

The message object from Viber raw event.

Example:

```js
event.message;
// {
//   type: 'text',
//   text: 'a message to the service',
//   tracking_data: 'tracking data',
// }
```

#### `isText`

Determine if the event is a message event which includes text.

Example:

```js
event.isText; // true
```

#### `text`

The text string from Viber raw event.

Example:

```js
event.text; // 'a message to the service'
```

#### `isPicture`

Determine if the event is a message event which includes picture.

Example:

```js
event.isPicture; // true
```

#### `picture`

The picture URL from Viber raw event.

Example:

```js
event.picture; // 'http://example.com/img.jpg'
```

#### `isVideo`

Determine if the event is a message event which includes video.

Example:

```js
event.isVideo; // true
```

#### `video`

The video URL from Viber raw event.

Example:

```js
event.video; // 'http://example.com/video.mp4'
```

#### `isFile`

Determine if the event is a message event which includes file.

Example:

```js
event.isFile; // true
```

#### `file`

The file URL from Viber raw event.

Example:

```js
event.file; // 'http://example.com/doc.pdf'
```

#### `isSticker`

Determine if the event is a message event which includes sticker.

Example:

```js
event.isSticker; // true
```

#### `sticker`

The sticker id from Viber raw event.

Example:

```js
event.sticker; // 46105
```

#### `isContact`

Determine if the event is a message event which includes contact.

Example:

```js
event.isContact; // true
```

#### `contact`

The contact object from Viber raw event.

Example:

```js
event.contact;
// {
//   name: 'Itamar',
//   phone_number: '+972511123123',
// }
```

#### `isURL`

Determine if the event is a message event which includes URL.

Example:

```js
event.isURL; // true
```

#### `url`

The URL from Viber raw event.

Example:

```js
event.url; // 'http://example.com'
```

#### `isLocation`

Determine if the event is a message event which includes location.

Example:

```js
event.isLocation; // true
```

#### `location`

The location object from Viber raw event.

Example:

```js
event.location;
// {
//   lat: 50.76891,
//   lon: 6.11499,
// }
```

#### `isSubscribed`

Determine if the event is a subscribed event.

Example:

```js
event.isSubscribed; // true
```

#### `subscribed`

The subscribed payload from Viber raw event.

Example:

```js
event.subscribed;
// {
//   event: 'subscribed',
//   timestamp: 1457764197627,
//   user: {
//     id: '01234567890A=',
//     name: 'John McClane',
//     avatar: 'http://avatar.example.com',
//     country: 'UK',
//     language: 'en',
//     api_version: 1,
//   },
//   message_token: 4912661846655238145,
// }
```

#### `isUnsubscribed`

Determine if the event is an unsubscribed event.

Example:

```js
event.isUnsubscribed; // true
```

#### `unsubscribed`

The unsubscribed payload from Viber raw event.

Example:

```js
event.unsubscribed;
// {
//   event: 'unsubscribed',
//   timestamp: 1457764197627,
//   user_id: '01234567890A=',
//   message_token: 4912661846655238145,
// }
```

#### `isConversationStarted`

Determine if the event is a conversation_started event.

Example:

```js
event.isConversationStarted; // true
```

#### `conversationStarted`

The conversation started payload from Viber raw event.

Example:

```js
event.conversationStarted;
// {
//   event: 'conversation_started',
//   timestamp: 1457764197627,
//   message_token: 4912661846655238145,
//   type: 'open',
//   context: 'context information',
//   user: {
//     id: '01234567890A=',
//     name: 'John McClane',
//     avatar: 'http://avatar.example.com',
//     country: 'UK',
//     language: 'en',
//     api_version: 1,
//   },
//   subscribed: false,
// }
```

#### `isDelivered`

The delivered payload from Viber raw event.

Example:

```js
event.isDelivered; // true
```

#### `delivered`

The delivered payload from Viber raw event.

Example:

```js
event.delivered;
// {
//   event: 'delivered',
//   timestamp: 1457764197627,
//   message_token: 4912661846655238145,
//   user_id: '01234567890A=',
// }
```

#### `isSeen`

Determine if the event is a seen event.

Example:

```js
event.isSeen; // true
```

#### `seen`

The seen payload from Viber raw event.

Example:

```js
event.seen;
// {
//   event: 'seen',
//   timestamp: 1457764197627,
//   message_token: 4912661846655238145,
//   user_id: '01234567890A=',
// }
```

#### `isFailed`

Determine if the event is a failed event.

Example:

```js
event.isFailed; // true
```

#### `failed`

The failed payload from Viber raw event.

Example:

```js
event.failed;
// {
//   event: 'failed',
//   timestamp: 1457764197627,
//   message_token: 4912661846655238145,
//   user_id: '01234567890A=',
//   desc: 'failure description',
// }
```
