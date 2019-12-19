---
id: version-1.0.3-api-telegram-event
title: TelegramEvent
original_id: api-telegram-event
---

#### `rawEvent`

Underlying raw event from Telegram.

Example:

```js
event.rawEvent;
// {
//   message: {
//     messageId: 666,
//     from: {
//       id: 427770117,
//       isBot: false,
//       firstName: 'first',
//       lastName: 'last',
//       languageCode: 'en',
//     },
//     chat: {
//       id: 427770117,
//       first_name: 'first',
//       last_name: 'last',
//       type: 'private',
//     },
//     date: 1499402829,
//     text: 'text',
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

The message object from Telegram raw event.

Example:

```js
event.message;
// {
//   message_id: 666,
//   from: {
//     id: 427770117,
//     is_bot: false,
//     first_name: 'first',
//     last_name: 'last',
//     language_code: 'en',
//   },
//   chat: {
//     id: 427770117,
//     first_name: 'first',
//     last_name: 'last',
//     type: 'private',
//   },
//   date: 1499402829,
//   text: 'text',
// }
```

#### `isText`

Determine if the event is a message event which includes text.

Example:

```js
event.isText; // true
```

#### `text`

The text string from Telegram raw event.

Example:

```js
event.text; // 'text'
```

#### `isAudio`

Determine if the event is a message event which includes audio.

Example:

```js
event.isAudio; // true
```

#### `audio`

The audio object from Telegram raw event.

Example:

```js
event.audio;
// {
//   file_id: '321',
//   duration: 100,
//   title: 'audioooooooo',
// }
```

#### `isDocument`

Determine if the event is a message event which includes document.

Example:

```js
event.isDocument; // true
```

#### `document`

The document object from Telegram raw event.

Example:

```js
event.document;
// {
//   file_id: '234',
//   file_name: 'file',
// }
```

#### `isGame`

Determine if the event is a message event which includes game.

Example:

```js
event.isGame; // true
```

#### `game`

The game object from Telegram raw event.

Example:

```js
event.game;
// {
//   title: 'gammmmmmmme',
//   description: 'Description of the game',
//   photo: [
//     {
//       file_id: '112',
//       width: 100,
//       height: 100,
//     },
//     {
//       file_id: '116',
//       width: 50,
//       height: 50,
//     },
//   ],
// }
```

#### `isPhoto`

Determine if the event is a message event which includes photo.

Example:

```js
event.isPhoto; // true
```

#### `photo`

The photo object from Telegram raw event.

Example:

```js
event.photo;
// [
//   {
//     file_id: '112',
//     width: 100,
//     height: 100,
//   },
//   {
//     file_id: '116',
//     width: 50,
//     height: 50,
//   },
// ]
```

#### `isSticker`

Determine if the event is a message event which includes sticker.

Example:

```js
event.isSticker; // true
```

#### `sticker`

The sticker object from Telegram raw event.

Example:

```js
event.sticker;
// {
//   file_id: '123',
//   width: 50,
//   height: 50,
// }
```

#### `isVideo`

Determine if the event is a message event which includes video.

Example:

```js
event.isVideo; // true
```

#### `video`

The video object from Telegram raw event.

Example:

```js
event.video;
// {
//   file_id: '321',
//   width: 100,
//   height: 100,
//   duration: 199,
// }
```

#### `isVoice`

Determine if the event is a message event which includes voice.

Example:

```js
event.isVoice; // true
```

#### `voice`

The voice object from Telegram raw event.

Example:

```js
event.voice;
// {
//   file_id: '543',
//   duration: 299,
// }
```

#### `isVideoNote`

Determine if the event is a message event which includes video note.

Example:

```js
event.isVideoNote; // true
```

#### `videoNote`

The video note object from Telegram raw event.

Example:

```js
event.videoNote;
// {
//   file_id: '654',
//   length: 100,
//   duration: 399,
// }
```

#### `isContact`

Determine if the event is a message event which includes contact.

Example:

```js
event.isContact; // true
```

#### `contact`

The contact object from Telegram raw event.

Example:

```js
event.contact;
// {
//   phone_number: '123456789',
//   first_name: 'first',
// }
```

#### `isLocation`

Determine if the event is a message event which includes location.

Example:

```js
event.isLocation; // true
```

#### `location`

The location object from Telegram raw event.

Example:

```js
event.location;
// {
//   longitude: '111.111',
//   latitude: '99.99',
// }
```

#### `isVenue`

Determine if the event is a message event which includes venue.

Example:

```js
event.isVenue; // true
```

#### `venue`

The venue object from Telegram raw event.

Example:

```js
event.venue;
// {
//   location: {
//     longitude: '111.111',
//     latitude: '99.99',
//   },
//   title: 'title',
//   address: 'addressssss',
// }
```

#### `isEditedMessage`

Determine if the event is an edited message event.

Example:

```js
event.isEditedMessage; // true
```

#### `editedMessage`

The edited message from Telegram raw event.

Example:

```js
event.editedMessage;
// {
//   message_id: 229,
//   from: {
//     id: 427770117,
//     is_bot: false,
//     first_name: 'user_first',
//     last_name: 'user_last',
//     language_code: 'en',
//   },
//   chat: {
//     id: 427770117,
//     first_name: 'user_first',
//     last_name: 'user_last',
//     language_code: 'en',
//   },
//   date: 1515736358,
//   edit_date: 1515758017,
//   text: 'hiiiii',
// }
```

#### `isChannelPost`

Determine if the event is a channel post event.

Example:

```js
event.isChannelPost; // true
```

#### `channelPost`

The channel post from Telegram raw event.

Example:

```js
event.channelPost;
// {
//   message_id: 2,
//   chat: {
//     id: -1001305240521,
//     title: 'channel_12345',
//     type: 'channel',
//   },
//   date: 1515760382,
//   text: 'post~~~',
// }
```

#### `isEditedChannelPost`

Determine if the event is an edited channel post event.

Example:

```js
event.isEditedChannelPost; // true
```

#### `editedChannelPost`

The edited channel post from Telegram raw event.

Example:

```js
event.editedChannelPost;
// {
//   message_id: 2,
//   chat: {
//     id: -1001305240521,
//     title: 'channel_12345',
//     type: 'channel',
//   },
//   date: 1515760382,
//   edit_date: 1515760478,
//   text: 'post~~~edited',
// }
```

#### `isInlineQuery`

Determine if the event is an inline query event.

Example:

```js
event.isInlineQuery; // true
```

#### `inlineQuery`

The inline query from Telegram raw event.

Example:

```js
event.inlineQuery;
// {
//   id: '1837258670654537434',
//   from: {
//     id: 427770117,
//     is_bot: false,
//     first_name: 'user_first',
//     last_name: 'user_last',
//     language_code: 'en',
//   },
//   query: '123',
//   offset: '',
// }
```

#### `isChosenInlineResult`

Determine if the event is a chosen inline result event.

Example:

```js
event.isChosenInlineResult; // true
```

#### `chosenInlineResult`

The chosen inline result from Telegram raw event.

Example:

```js
event.chosenInlineResult;
// {
//   result_id: '2837258670654537434',
//   from: {
//     id: 427770117,
//     is_bot: false,
//     first_name: 'user_first',
//     last_name: 'user_last',
//     language_code: 'en',
//   },
//   inline_message_id: '1837258670654537434',
//   query: '123',
// }
```

#### `isCallbackQuery`

Determine if the event is a callback query event.

Example:

```js
event.isCallbackQuery; // true
```

#### `callbackQuery`

The callback query from Telegram raw event.

Example:

```js
event.callbackQuery;
// {
//   id: '123',
//   from: {
//     id: 427770117,
//     is_bot: false,
//     first_name: 'user_first',
//     last_name: 'user_last',
//     language_code: 'en',
//   },
//   message: {
//     message_id: 666,
//     from: {
//       id: 313534466,
//       is_bot: true,
//       first_name: 'bot_first',
//       username: 'bot_name',
//     },
//     chat: {
//       id: 427770117,
//       first_name: 'first',
//       last_name: 'last',
//       type: 'private',
//     },
//     date: 1499402829,
//     text: 'text',
//   },
//   chat_instance: '-1828607021492040088',
//   data: 'DEVELOPER_DEFINED_PAYLOAD',
// }
```

#### `isPayload`

Determine if the event is a callback query event.

Example:

```js
event.isPayload; // true
```

#### `payload`

The payload string from Telegram raw event.

Example:

```js
event.payload; // 'DEVELOPER_DEFINED_PAYLOAD'
```

#### `isShippingQuery`

Determine if the event is a shipping query event.

Example:

```js
event.isShippingQuery; // true
```

#### `shippingQuery`

The shipping query from Telegram raw event.

Example:

```js
event.shippingQuery;
// {
//   id: '123',
//   from: {
//     id: 427770117,
//     is_bot: false,
//     first_name: 'first',
//     last_name: 'last',
//     language_code: 'en',
//   },
//   invoice_payload: 'payload',
//   shipping_address: {
//     country_code: '...',
//     state: '...',
//     city: '...',
//     street_line1: '...',
//     street_line2: '...',
//     post_code: '...',
//   },
// }
```

#### `isPreCheckoutQuery`

Determine if the event is a pre checkout query event.

Example:

```js
event.isPreCheckoutQuery; // true
```

#### `preCheckoutQuery`

The pre checkout query from Telegram raw event.

Example:

```js
event.preCheckoutQuery;
// {
//   id: '123',
//   from: {
//     id: 427770117,
//     is_bot: false,
//     first_name: 'first',
//     last_name: 'last',
//     language_code: 'en',
//   },
//   currency: 'USD',
//   total_amount: 100,
//   invoice_payload: 'payload',
// }
```
