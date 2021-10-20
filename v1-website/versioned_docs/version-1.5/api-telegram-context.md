---
id: version-1.5-api-telegram-context
title: TelegramContext
original_id: api-telegram-context
---

- [Send API](#send-api)
- [Get API](#get-api)
- [Updating API](#updating-api)
- [Group API](#group-api)
- [Payments API](#payments-api)
- [Inline Mode API](#inline-mode-api)
- [Game API](#game-api)
- [Others](#others)

<a id="send-api" />

### Send API - [Official Docs](https://core.telegram.org/bots/api#available-methods)

#### `sendMessage(text [, options])` - [Official Docs](https://core.telegram.org/bots/api/#sendmessage)

Sends text messages.

| Param   | Type     | Description                     |
| ------- | -------- | ------------------------------- |
| text    | `String` | Text of the message to be sent. |
| options | `Object` | Other optional parameters.      |

Exmaple:

```js
context.sendMessage('hi', {
  disableWebPagePreview: true,
  disableNotification: true,
});
```

<br />

#### `sendPhoto(photo [, options])` - [Official Docs](https://core.telegram.org/bots/api/#sendphoto)

Sends photos.

| Param   | Type     | Description                                             |
| ------- | -------- | ------------------------------------------------------- |
| photo   | `String` | Pass a file id (recommended) or HTTP URL to send photo. |
| options | `Object` | Other optional parameters.                              |

Example:

```js
context.sendPhoto('https://example.com/image.png', {
  caption: 'gooooooodPhoto',
  disableNotification: true,
});
```

<br />

#### `sendAudio(audio [, options])` - [Official Docs](https://core.telegram.org/bots/api/#sendaudio)

Sends audio files.

| Param   | Type     | Description                                             |
| ------- | -------- | ------------------------------------------------------- |
| audio   | `String` | Pass a file id (recommended) or HTTP URL to send audio. |
| options | `Object` | Other optional parameters.                              |

Example:

```js
context.sendAudio('https://example.com/audio.mp3', {
  caption: 'gooooooodAudio',
  disableNotification: true,
});
```

<br />

#### `sendDocument(document [, options])` - [Official Docs](https://core.telegram.org/bots/api/#senddocument)

Sends general files.

| Param    | Type     | Description                                                |
| -------- | -------- | ---------------------------------------------------------- |
| document | `String` | Pass a file id (recommended) or HTTP URL to send document. |
| options  | `Object` | Other optional parameters.                                 |

Example:

```js
context.sendDocument('https://example.com/doc.gif', {
  caption: 'gooooooodDocument',
  disableNotification: true,
});
```

<br />

#### `sendSticker(sticker [, options])` - [Official Docs](https://core.telegram.org/bots/api/#sendsticker)

Sends `.webp` stickers.

| Param   | Type     | Description                                               |
| ------- | -------- | --------------------------------------------------------- |
| sticker | `String` | Pass a file id (recommended) or HTTP URL to send sticker. |
| options | `Object` | Other optional parameters.                                |

Example:

```js
context.sendSticker('CAADAgADQAADyIsGAAE7MpzFPFQX5QI', {
  disableNotification: true,
});
```

<br />

#### `sendVideo(video [, options])` - [Official Docs](https://core.telegram.org/bots/api/#sendvideo)

Sends video files, Telegram clients support `mp4` videos (other formats may be sent as Document).

| Param   | Type     | Description                                             |
| ------- | -------- | ------------------------------------------------------- |
| video   | `String` | Pass a file id (recommended) or HTTP URL to send video. |
| options | `Object` | Other optional parameters.                              |

Example:

```js
context.sendVideo('https://example.com/video.mp4', {
  caption: 'gooooooodVideo',
  disableNotification: true,
});
```

<br />

#### `sendVoice(voice [, options])` - [Official Docs](https://core.telegram.org/bots/api/#sendvoice)

Sends audio files.

| Param   | Type     | Description                                             |
| ------- | -------- | ------------------------------------------------------- |
| voice   | `String` | Pass a file id (recommended) or HTTP URL to send voice. |
| options | `Object` | Other optional parameters.                              |

Example:

```js
context.sendVoice('https://example.com/voice.ogg', {
  caption: 'gooooooodVoice',
  disableNotification: true,
});
```

<br />

#### `sendVideoNote(videoNote [, options])` - [Official Docs](https://core.telegram.org/bots/api/#sendvideonote)

Sends video messages. As of v.4.0, Telegram clients support rounded square mp4 videos of up to 1 minute long.

| Param     | Type     | Description                                                  |
| --------- | -------- | ------------------------------------------------------------ |
| videoNote | `String` | Pass a file id (recommended) or HTTP URL to send video note. |
| options   | `Object` | Other optional parameters.                                   |

Example:

```js
context.sendVideoNote('https://example.com/video_note.mp4', {
  duration: 40,
  disableNotification: true,
});
```

<br />

#### `sendMediaGroup(media [, options])` - [Official Docs](https://core.telegram.org/bots/api/#sendmediagroup)

send a group of photos or videos as an album.

| Param   | Type                                                          | Description                                                                              |
| ------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| media   | [InputMedia](https://core.telegram.org/bots/api#inputmedia)[] | A JSON-serialized array describing photos and videos to be sent, must include 2–10 items |
| options | `Object`                                                      | Other optional parameters.                                                               |

Example:

```js
context.sendMediaGroup([
  { type: 'photo', media: 'BQADBAADApYAAgcZZAfj2-xeidueWwI' },
]);
```

<br />

#### `sendLocation(location [, options])` - [Official Docs](https://core.telegram.org/bots/api/#sendlocation)

Sends point on the map.

| Param              | Type     | Description                             |
| ------------------ | -------- | --------------------------------------- |
| location           | `Object` | Object contains latitude and longitude. |
| location.latitude  | `Number` | Latitude of the location.               |
| location.longitude | `Number` | Longitude of the location.              |
| options            | `Object` | Other optional parameters.              |

Example:

```js
context.sendLocation(
  {
    latitude: 30,
    longitude: 45,
  },
  {
    disableNotification: true,
  }
);
```

<br />

#### `sendVenue(venue [, options])` - [Official Docs](https://core.telegram.org/bots/api/#sendvenue)

Sends information about a venue.

| Param           | Type     | Description                               |
| --------------- | -------- | ----------------------------------------- |
| venue           | `Object` | Object contains information of the venue. |
| venue.latitude  | `Number` | Latitude of the venue.                    |
| venue.longitude | `Number` | Longitude of the venue.                   |
| venue.title     | `String` | Name of the venue.                        |
| venue.address   | `String` | Address of the venue.                     |
| options         | `Object` | Other optional parameters.                |

Example:

```js
context.sendVenue(
  {
    latitude: 30,
    longitude: 45,
    title: 'a_title',
    address: 'an_address',
  },
  {
    disableNotification: true,
  }
);
```

<br />

#### `sendContact(contact [, options])` - [Official Docs](https://core.telegram.org/bots/api/#sendcontact)

Sends phone contacts.

| Param               | Type     | Description                                 |
| ------------------- | -------- | ------------------------------------------- |
| contact             | `Object` | Object contains information of the contact. |
| contact.phoneNumber | `String` | Phone number of the contact.                |
| contact.firstName   | `String` | First name of the contact.                  |
| options             | `Object` | Other optional parameters.                  |

Example:

```js
context.sendContact(
  {
    phoneNumber: '886123456789',
    firstName: 'first',
  },
  { lastName: 'last' }
);
```

<br />

#### `sendChatAction(action)` - [Official Docs](https://core.telegram.org/bots/api/#sendchataction)

Tells the user that something is happening on the bot's side.

| Param  | Type     | Description                  |
| ------ | -------- | ---------------------------- |
| action | `String` | Type of action to broadcast. |

Example:

```js
context.sendChatAction('typing');
```

<br />

### Get API

#### `getUserProfilePhotos(options)` - [Official Docs](https://core.telegram.org/bots/api/#getuserprofilephotos)

Gets a list of profile pictures for a user.

| Param   | Type     | Description               |
| ------- | -------- | ------------------------- |
| options | `Object` | Other optional parameters |

Example:

```js
context.getUserProfilePhotos().then((result) => {
  console.log(result);
  // {
  //   totalCount: 3,
  //   photos: [
  //     [
  //       {
  //         fileId: 'AgADBAADGTo4Gz8cZAeR-ouu4XBx78EeqRkABHahi76pN-aO0UoDA050',
  //         fileSize: 14650,
  //         width: 160,
  //         height: 160,
  //       },
  //       {
  //         fileId: 'AgADBAADGTo4Gz8cZAeR-ouu4XBx78EeqRkABKCfooqTgFUX0EoD5B1C',
  //         fileSize: 39019,
  //         width: 320,
  //         height: 320,
  //       },
  //       {
  //         fileId: 'AgADBAADGTo4Gz8cZAeR-ouu4XBx78EeqRkABPL_pC9K3UpI0koD1B1C',
  //         fileSize: 132470,
  //         width: 640,
  //         height: 640,
  //       },
  //     ],
  //   ],
  // }
});
```

#### `getChat()` - [Official Docs](https://core.telegram.org/bots/api/#getchat)

Gets up to date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.)

Example:

```js
context.getChat().then((result) => {
  console.log(result);
  // {
  //   id: 313534466,
  //   firstName: 'first',
  //   lastName: 'last',
  //   username: 'username',
  //   type: 'private',
  // }
});
```

<br />

#### `getChatAdministrators()` - [Official Docs](https://core.telegram.org/bots/api/#getchatadministrators)

Gets a list of administrators in the chat.

Example:

```js
context.getChatAdministrators().then((result) => {
  console.log(result);
  // [
  //   {
  //     user: {
  //       id: 313534466,
  //       firstName: 'first',
  //       lastName: 'last',
  //       username: 'username',
  //       languangeCode: 'zh-TW',
  //     },
  //     status: 'creator',
  //   },
  // ]
});
```

<br />

#### `getChatMembersCount()` - [Official Docs](https://core.telegram.org/bots/api/#getchatmemberscount)

Gets the number of members in the chat.

Example:

```js
context.getChatMembersCount().then((result) => {
  console.log(result);
  // '6'
});
```

<br />

#### `getChatMember(userId)` - [Official Docs](https://core.telegram.org/bots/api/#getchatmember)

Gets information about a member of the chat.

| Param  | Type     | Description                           |
| ------ | -------- | ------------------------------------- |
| userId | `Number` | Unique identifier of the target user. |

Example:

```js
context.getChatMember(USER_ID).then((result) => {
  console.log(result);
  // {
  //   user: {
  //     id: 313534466,
  //     firstName: 'first',
  //     lastName: 'last',
  //     username: 'username',
  //     languangeCode: 'zh-TW',
  //   },
  //   status: 'creator',
  // }
});
```

<br />

### Updating API

#### `editMessageText(text [, options])` - [Official Docs](https://core.telegram.org/bots/api/#editmessagetext)

Edits text and game messages sent by the bot or via the bot (for inline bots).

| Param   | Type     | Description                |
| ------- | -------- | -------------------------- |
| text    | `String` | New text of the message.   |
| options | `Object` | Other optional parameters. |

Example:

```js
context.editMessageText('new_text');
```

<br />

#### `editMessageCaption(caption [, options])` - [Official Docs](https://core.telegram.org/bots/api/#editmessagecaption)

Edits captions of messages sent by the bot or via the bot (for inline bots).

| Param   | Type     | Description                 |
| ------- | -------- | --------------------------- |
| caption | `String` | New caption of the message. |
| options | `Object` | Other optional parameters.  |

Example:

```js
context.editMessageCaption('new_caption');
```

<br />

#### `editMessageReplyMarkup(replyMarkup [, options])` - [Official Docs](https://core.telegram.org/bots/api/#editmessagereplymarkup)

Edits only the reply markup of messages sent by the bot or via the bot (for inline bots).

| Param       | Type     | Description                     |
| ----------- | -------- | ------------------------------- |
| replyMarkup | `Object` | New replyMarkup of the message. |
| options     | `Object` | Other optional parameters.      |

Example:

```js
context.editMessageReplyMarkup({
  keyboard: [[{ text: 'new_button_1' }, { text: 'new_button_2' }]],
  resizeKeyboard: true,
  oneTimeKeyboard: true,
});
```

<br />

#### `deleteMessage(messageId)` - [Official Docs](https://core.telegram.org/bots/api/#deletemessage)

Deletes a message, including service messages.

| Param     | Type     | Description                          |
| --------- | -------- | ------------------------------------ |
| messageId | `Number` | Identifier of the message to delete. |

Example:

```js
context.deleteMessage(MESSAGE_ID);
```

<br />

#### `editMessageLiveLocation(location [, options])` - [Official Docs](https://core.telegram.org/bots/api/#editmessagelivelocation)

Edit live location messages sent by the bot or via the bot (for inline bots).

| Param              | Type     | Description                                 |
| ------------------ | -------- | ------------------------------------------- |
| location           | `Object` | Object contains new latitude and longitude. |
| location.latitude  | `Number` | Latitude of new location.                   |
| location.longitude | `Number` | Longitude of new location.                  |
| options            | `Object` | Other optional parameters.                  |

Example:

```js
context.editMessageLiveLocation({
  latitude: 30,
  longitude: 45,
});
```

<br />

#### `stopMessageLiveLocation(options)` - [Official Docs](https://core.telegram.org/bots/api/#stopmessagelivelocation)

Stop updating a live location message sent by the bot or via the bot (for inline bots) before _live_period_ expires.

| Param   | Type     | Description                |
| ------- | -------- | -------------------------- |
| options | `Object` | Other optional parameters. |

Example:

```js
context.stopMessageLiveLocation();
```

### Group API

#### `kickChatMember(userId [, options])` - [Official Docs](https://core.telegram.org/bots/api/#kickchatmember)

Kicks a user from the group, the supergroup or the channel.

| Param   | Type     | Description                           |
| ------- | -------- | ------------------------------------- |
| userId  | `Number` | Unique identifier of the target user. |
| options | `Object` | Other optional parameters.            |

Example:

```js
context.kickChatMember(USER_ID, { untilDate: UNIX_TIME });
```

<br />

#### `unbanChatMember(userId)` - [Official Docs](https://core.telegram.org/bots/api/#unbanchatmember)

Unbans a previously kicked user in the supergroup or channel.

| Param  | Type     | Description                           |
| ------ | -------- | ------------------------------------- |
| userId | `Number` | Unique identifier of the target user. |

Example:

```js
context.unbanChatMember(USER_ID);
```

<br />

#### `restrictChatMember(userId [, options])` - [Official Docs](https://core.telegram.org/bots/api/#restrictchatmember)

Restricts a user in the supergroup

| Param   | Type     | Description                           |
| ------- | -------- | ------------------------------------- |
| userId  | `Number` | Unique identifier of the target user. |
| options | `Object` | Other optional parameters.            |

Example:

```js
context.restrictChatMember(USER_ID, { canSendMessages: true });
```

<br />

#### `promoteChatMember(userId [, options])` - [Official Docs](https://core.telegram.org/bots/api/#promotechatmember)

Promotes or demotes a user in the supergroup or the channel.

| Param   | Type     | Description                           |
| ------- | -------- | ------------------------------------- |
| userId  | `Number` | Unique identifier of the target user. |
| options | `Object` | Other optional parameters.            |

Example:

```js
context.promoteChatMember(USER_ID, {
  canChangeInfo: true,
  canInviteUsers: true,
});
```

<br />

#### `exportChatInviteLink()` - [Official Docs](https://core.telegram.org/bots/api/#exportchatinvitelink)

Exports an invite link to the supergroup or the channel.

Example:

```js
context.exportChatInviteLink();
```

<br />

#### `setChatPhoto(photo)` - [Official Docs](https://core.telegram.org/bots/api/#setchatphoto)

Sets a new profile photo for the chat.

| Param | Type     | Description                                             |
| ----- | -------- | ------------------------------------------------------- |
| photo | `String` | Pass a file id (recommended) or HTTP URL to send photo. |

Example:

```js
context.setChatPhoto('https://example.com/image.png');
```

<br />

#### `deleteChatPhoto()` - [Official Docs](https://core.telegram.org/bots/api/#deletechatphoto)

Deletes the chat photo.

Example:

```js
context.deleteChatPhoto();
```

<br />

#### `setChatTitle(title)` - [Official Docs](https://core.telegram.org/bots/api/#setchattitle)

Changes the title of the chat.

| Param | Type     | Description                       |
| ----- | -------- | --------------------------------- |
| title | `String` | New chat title, 1-255 characters. |

Example:

```js
context.setChatTitle('New Title');
```

<br />

#### `setChatDescription(description)` - [Official Docs](https://core.telegram.org/bots/api/#setchatdescription)

Changes the description of the supergroup or the channel.

| Param       | Type     | Description                             |
| ----------- | -------- | --------------------------------------- |
| description | `String` | New chat description, 0-255 characters. |

Example:

```js
context.setChatDescription('New Description');
```

<br />

#### `setChatStickerSet(stickerSetName)` - [Official Docs](https://core.telegram.org/bots/api/#setchatstickerset)

Set a new group sticker set for the supergroup.

| Param          | Type     | Description                                                 |
| -------------- | -------- | ----------------------------------------------------------- |
| stickerSetName | `String` | Name of the sticker set to be set as the group sticker set. |

Example:

```js
context.setChatStickerSet('Sticker Set Name');
```

<br />

#### `deleteChatStickerSet()` - [Official Docs](https://core.telegram.org/bots/api/#deletechatstickerset)

Delete a group sticker set from the supergroup.

Example:

```js
context.deleteChatStickerSet();
```

<br />

#### `pinChatMessage(messageId [, options])` - [Official Docs](https://core.telegram.org/bots/api/#pinChatMessage)

Pins a message in the supergroup.

| Param     | Type     | Description                     |
| --------- | -------- | ------------------------------- |
| messageId | `Number` | Identifier of a message to pin. |
| options   | `Object` | Other optional parameters.      |

Example:

```js
context.pinChatMessage(MESSAGE_ID, { disableNotification: true });
```

<br />

#### `unpinChatMessage()` - [Official Docs](https://core.telegram.org/bots/api/#unpinchatmessage)

Unpins a message in the supergroup chat.

Example:

```js
context.unpinChatMessage();
```

<br />

#### `leaveChat()` - [Official Docs](https://core.telegram.org/bots/api/#leavechat)

Leaves the group, supergroup or channel.

Example:

```js
context.leaveChat();
```

<br />

### Payments API

#### `sendInvoice(product [, options])` - [Official Docs](https://core.telegram.org/bots/api/#sendinvoice)

Sends invoice.

| Param                  | Type       | Description                          |
| ---------------------- | ---------- | ------------------------------------ |
| product                | `Object`   | Object of the product.               |
| product.title          | `String`   | Product name.                        |
| product.description    | `String`   | Product description.                 |
| product.payload        | `String`   | Bot defined invoice payload.         |
| product.providerToken  | `String`   | Payments provider token.             |
| product.startParameter | `String`   | Deep-linking parameter.              |
| product.currency       | `String`   | Three-letter ISO 4217 currency code. |
| product.prices         | `Object[]` | Breakdown of prices.                 |
| options                | `Object`   | Additional Telegram query options.   |

Example:

```js
context.sendInvoice({
  title: 'product name',
  description: 'product description',
  payload: 'bot-defined invoice payload',
  providerToken: 'PROVIDER_TOKEN',
  startParameter: 'pay',
  currency: 'USD',
  prices: [
    { label: 'product', amount: 11000 },
    { label: 'tax', amount: 11000 },
  ],
});
```

<br />

#### `answerShippingQuery(ok [, options])` - [Official Docs](https://core.telegram.org/bots/api/#answershippingquery)

Reply to the shipping query.

| Param   | Type      | Description                                     |
| ------- | --------- | ----------------------------------------------- |
| ok      | `Boolean` | Specify if delivery of the product is possible. |
| options | `Object`  | Additional Telegram query options.              |

Example:

```js
context.answerShippingQuery(true);
```

<br />

#### `answerPreCheckoutQuery(ok [, options])` - [Official Docs](https://core.telegram.org/bots/api/#answerprecheckoutquery)

Respond to the pre-checkout query.

| Param   | Type      | Description                                     |
| ------- | --------- | ----------------------------------------------- |
| ok      | `Boolean` | Specify if delivery of the product is possible. |
| options | `Object`  | Additional Telegram query options.              |

Example:

```js
context.answerPreCheckoutQuery(true);
```

<br />

### Inline mode API

#### `answerInlineQuery(results [, options])` - [Official Docs](https://core.telegram.org/bots/api/#answerinlinequery)

Send answers to the inline query.

| Param   | Type                                                                        | Description                                               |
| ------- | --------------------------------------------------------------------------- | --------------------------------------------------------- |
| results | [InlineQueryResult](https://core.telegram.org/bots/api#inlinequeryresult)[] | Array of object represents one result of an inline query. |
| options | `Object`                                                                    | Additional Telegram query options.                        |

Example:

```js
context.answerInlineQuery(
  [
    {
      type: 'photo',
      id: 'UNIQUE_ID',
      photoFileId: 'FILE_ID',
      title: 'PHOTO_TITLE',
    },
    {
      type: 'audio',
      id: 'UNIQUE_ID',
      audioFileId: 'FILE_ID',
      caption: 'AUDIO_TITLE',
    },
  ],
  {
    cacheTime: 1000,
  }
);
```

<br />

### Game API

#### `sendGame(gameShortName [, options])` - [Official Docs](https://core.telegram.org/bots/api#sendgame)

Sends a game.

| Param         | Type     | Description                        |
| ------------- | -------- | ---------------------------------- |
| gameShortName | String   | Short name of the game.            |
| options       | `Object` | Additional Telegram query options. |

Example:

```js
context.sendGame('Mario Bros.', {
  disableNotification: true,
});
```

<br />

#### `setGameScore(score [, options])` - [Official Docs](https://core.telegram.org/bots/api#setgamescore)

Sets the score of the specified user in a game.

| Param   | Type     | Description                        |
| ------- | -------- | ---------------------------------- |
| score   | Number   | New score, must be non-negative.   |
| options | `Object` | Additional Telegram query options. |

Example:

```js
context.setGameScore(999);
```

<br />

#### `getGameHighScores()` - [Official Docs](https://core.telegram.org/bots/api#getgamehighscores)

Gets data for high score tables.

| Param   | Type     | Description                        |
| ------- | -------- | ---------------------------------- |
| options | `Object` | Additional Telegram query options. |

Example:

```js
context.getGameHighScores();
```

<br />

### Others

#### `forwardMessageFrom(fromChatId, messageId [, options])` - [Official Docs](https://core.telegram.org/bots/api/#forwardmessage)

Forwards messages of any kind.

| Param      | Type                              | Description                                                         |
| ---------- | --------------------------------- | ------------------------------------------------------------------- |
| fromChatId | <code>Number &#124; String</code> | Unique identifier for the chat where the original message was sent. |
| messageId  | `Number`                          | Message identifier in the chat specified in fromChatId.             |
| options    | `Object`                          | Other optional parameters.                                          |

Example:

```js
context.forwardMessageFrom(CHAT_ID, MESSAGE_ID, {
  disableNotification: true,
});
```

#### `forwardMessageTo(toChatId, messageId [, options])` - [Official Docs](https://core.telegram.org/bots/api/#forwardmessage)

Forwards messages of any kind.

| Param     | Type                              | Description                                                              |
| --------- | --------------------------------- | ------------------------------------------------------------------------ |
| toChatId  | <code>Number &#124; String</code> | Unique identifier for the target chat or username of the target channel. |
| messageId | `Number`                          | Message identifier in the chat specified in fromChatId.                  |
| options   | `Object`                          | Other optional parameters.                                               |

Example:

```js
context.forwardMessageTo(CHAT_ID, MESSAGE_ID, {
  disableNotification: true,
});
```
