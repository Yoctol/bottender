---
id: channel-telegram-sending-messages
title: Sending Telegram Messages
---

The more I know about Telegram, the more I love it.

Although Telegram is not one of the top 5 chat channels, I surprisingly found that Telegram is the most activity chat channels for bots from [Google Trends.](https://trends.google.com/trends/explore?date=2018-01-01%202019-01-01&q=Telegram%20Bot,Slack%20App,LINE%20Bot,Messenger%20Bot,Viber%20Bot)

<p><img width="100%" src="https://user-images.githubusercontent.com/662387/71064407-fad9f880-21a9-11ea-9022-9d0a566fc29c.png">
</p>

Plus, I may argue that Telegram is the most developer-friendly chat channel. For example:

- Setup Telegram Bot is so easy (see Bottender doc, ["Setup Telegram"](./channel-telegram-setup.md) for more info)
  - Talk to @BotFather to create a bot and get the bot access token. (You don't have to apply for a developer account.)
  - By Bottender, you can set your Telegram Bot webhook with one command `npx bottender telegram webhook set.`
- The desktop and mobile version of Telegram has the same behavior
- Your app can proactively send messages to your users without extra cost, while Messenger or LINE asked for extra cost for push messages.
- It's free, fast, and secure.

<p><img width="300" src="https://user-images.githubusercontent.com/662387/70965210-e292ac80-20c9-11ea-9f1b-74abced2ff9e.jpeg">
<br/> <em>@BotFather controls every Telegram Bots!</em> </p>

Telegram also cares about user's privacy. For example, you may check ["Privacy Mode"](https://core.telegram.org/bots#privacy-mode) before building a Telegram Bot for group chat. By default, A bot running in privacy mode only receives certain types of messages instead of full chat history.

#### Basic Factors of Telegram Bots: Messages, Reply Markup, Updatable

While using Bottender, you can get full access to Telegram features.

Telegram Bots support a bunch of rich messages. For example, even you can send `Markdown` or `HTML` in `Text Messages.` You can even send `Invoice Message` if your bot has a payment feature. Don't miss the lovely `Sticker Message.` You can even upload your `Sticker Pack` for your Telegram Bots.

`Reply Markup` is similar to the combination of `Quick Replies` and `Buttons` on Messenger or LINE. It is attached after a message and offered several choices to guide your users to open a webpage, trigger a bot action, reply a message on user's behalf,

Every `Messages` and `Reply Markup` is updatable. Remember to manage your bot sent messages if you tend to make a message update in the future.

In the following code, you can see a quick example of message update.

```js
const response = await context.sendMessage('hello');
await context.editMessageText(response.messageId, '*world*', {
  parseMode: 'markdown',
});
```

## Sending Text Messages

Find setup telegram

https://core.telegram.org/bots/api#sendmessage

```js
await context.sendMessage('hello');
```

### Markdown Style Parse Mode

https://core.telegram.org/bots/api#formatting-options

<!-- prettier-ignore-start -->
````markdown
*bold text*
_italic text_
[inline URL](http://www.example.com/)
[inline mention of a user](tg://user?id=123456789)
`inline fixed-width code`
```block_language
pre-formatted fixed-width code block
```
````
<!-- prettier-ignore-end -->

```js
await context.sendMessage('*hello*', { parseMode: 'markdown' });
```

### HTML Style Parse Mode

```html
<b>bold</b>, <strong>bold</strong> <i>italic</i>, <em>italic</em>
<a href="http://www.example.com/">inline URL</a>
<a href="tg://user?id=123456789">inline mention of a user</a>
<code>inline fixed-width code</code>
<pre>pre-formatted fixed-width code block</pre>
```

```js
await context.sendMessage('<b>hello</b>', { parseMode: 'html' });
```

## Sending Rich Media Messages

### Image

https://core.telegram.org/bots/api#sendphoto

```js
await context.sendPhoto('https://www.example.com/example.png');
```

### Audio

https://core.telegram.org/bots/api#sendaudio

```js
await context.sendAudio('https://www.example.com/example.mp3');
```

### Document

https://core.telegram.org/bots/api#senddocument

```js
await context.sendDocument('https://www.example.com/example.gif');
```

### Video

This object represents a video file.
https://core.telegram.org/bots/api#sendvideo

```js
await context.sendVideo('https://www.example.com/example.mp4');
```

### Animation

https://core.telegram.org/bots/api#sendanimation

```js
await context.sendAnimation('https://www.example.com/example.mp4');
```

No sound
This object represents an animation file (GIF or H.264/MPEG-4 AVC video without sound).

### Sticker

CAADAgADDQADWbv8JS5RHx3i_HUDFgQ
https://core.telegram.org/bots/api#sendsticker

```js
await context.sendSticker('CAADAgADQAADyIsGAAE7MpzFPFQX5QI');
```

get sticker id

```js
module.exports = async function App(context) {
  if (context.event.isSticker) {
    await context.sendText(
      `received the sticker: ${context.event.sticker.fileId}`
    );
  }
};
```

### Voice

// your audio must be in an .ogg file encoded with OPU
// download
https://core.telegram.org/bots/api#sendvoice

```js
await context.sendVoice('https://www.example.com/example.ogg');
```

### VideoNote

https://core.telegram.org/bots/api#sendvideonote

```js
await context.sendVideoNote('https://www.example.com/example.mp4');
```

### MediaGroup

Use this method to send a group of photos or videos as an album.
https://core.telegram.org/bots/api#sendmediagroup

```js
await context.sendMediaGroup([
  { type: 'photo', media: 'https://http.cat/100' },
  { type: 'photo', media: 'https://http.cat/101' },
]);
```

### Location

sanpshot of google map

https://core.telegram.org/bots/api#sendlocation

```js
await context.sendLocation({ latitude: 25.105497, longitude: 121.597366 });
```

### Venue

https://core.telegram.org/bots/api#sendvenue

```js
await context.sendVenue({
  location: { latitude: 25.105497, longitude: 121.597366 },
  title: 'taipei',
  address: 'taipei address',
});
```

### Contact

https://core.telegram.org/bots/api#sendcontact

```js
await context.sendContact({
  phoneNumber: '123456',
  firstName: 'first',
});
```

optional parameter put into the second argument

```js
await context.sendContact(
  {
    phoneNumber: '123456',
    firstName: 'first',
  },
  {
    lastName: '213',
  }
);
```

### Poll

https://core.telegram.org/bots/api#sendpoll

Use this method to send a native poll. A native poll can't be sent to a private chat (`"description": "Bad Request: polls can't be sent to private chats"`). On success, the sent Message is returned.

Note: Can't in private talk

```js
await context.sendPoll('Which one is your favorite food?', [
  '🍔',
  '🍕',
  '🌮',
  '🍱',
]);
```

### Invoice

Payment Provider Invalided ..
https://core.telegram.org/bots/api#sendvoice
（從官方文件找圖）

```js
const invoice = {
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
};
await context.sendInvoice(invoice);
```

### ChatAction

https://core.telegram.org/bots/api#sendchataction

```js
await context.sendChatAction('typing');
```

`typing` for text messages,
`upload_photo` for photos,
`record_video` or `upload_video` for videos,
`record_audio` or `upload_audio` for audio files,
`upload_document` for general files,
`find_location` for location data,
`record_video_note` or `upload_video_note` for video notes.

### Sending Forward Messages

https://core.telegram.org/bots/api#forwardmessage

```js
const chatId = 313534466;
await context.forwardMessageFrom(chatId, 'messageId', {
  disableNotification: true,
});
```

```js
const chatId = 413534466;
await context.forwardMessageTo(chatId, 'messageId', {
  disableNotification: true,
});
```

## Sending with Reply Markup

### Inline Keyboard

Remeber to manually remove

https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating
https://core.telegram.org/bots/2-0-intro#new-inline-keyboards
https://core.telegram.org/bots/api#inlinekeyboardmarkup

```js
const replyMarkup = {
  inline_keyboard: [
    [
      {
        text: 'hi',
        url: 'https://www.example.com',
      },
      {
        text: 'yo',
        callback_data: 'yo',
      },
    ],
  ],
};
```

### Keyboard

https://core.telegram.org/bots#keyboards
https://core.telegram.org/bots/api/#replykeyboardmarkup

```js
const replyMarkup = {
  keyboard: [
    [
      {
        text: 'hi',
      },
      {
        text: 'yo',
      },
    ],
  ],
};
```

#### Remove Keyboard

https://core.telegram.org/bots/api/#replykeyboardremove
說錯了是 replyKeyboardRemove

one_time_keyboard

selective 只有指定對象會看到

### How To Send Reply Markup

sendText

```js
await context.sendText(text, { replyMarkup });
```

sendPhoto

```js
await context.sendPhoto(url, { replyMarkup });
```

sendAudio

```js
await context.sendAudio(url, { replyMarkup });
```

sendDocument

```js
await context.sendDocument(url, { replyMarkup });
```

sendVideo

```js
await context.sendVideo(url, { replyMarkup });
```

sendAnimation

```js
await context.sendAnimation(url, { replyMarkup });
```

sendSticker

```js
await context.sendSticker(sticker, { replyMarkup });
```

sendVoice

```js
await context.sendVoice(url, { replyMarkup });
```

sendVideoNote

```js
await context.sendVideoNote(url, { replyMarkup });
```

sendMediaGroup

```js
await context.sendMediaGroup([media], { replyMarkup });
```

sendLocation

```js
await context.sendLocation(location, { replyMarkup });
```

sendVenue

```js
await context.sendVenue(venue, { replyMarkup });
```

sendContact

```js
await context.sendContact(contact, { replyMarkup });
```

## Updating Messages

https://core.telegram.org/bots/api#updating-messages

### Update Text

https://core.telegram.org/bots/api#editmessagetext

```js
const response = await context.sendMessage('hello');
await context.editMessageText(response.messageId, '*world*', {
  parseMode: 'markdown',
});
```

### Update Caption

https://core.telegram.org/bots/api#editmessagecaption

```js
const response = await context.sendPhoto('https://http.cat/302', {
  caption: `original caption`,
});
await context.editMessageCaption(response.messageId, 'new caption');
```

### Update Media

https://core.telegram.org/bots/api#editmessagemedia

```js
const response = await context.sendPhoto('https://http.cat/100');
await context.editMessageMedia(response.messageId, {
  type: 'photo',
  media: 'https://http.cat/302',
});
```

### Update ReplyMarkup

add / appended reply Markup
https://core.telegram.org/bots/api#editmessagereplymarkup

```js
const replyMarkup = {
  inline_keyboard: [
    [
      {
        text: 'hi',
        url: 'https://www.example.com',
      },
      {
        text: 'yo',
        callback_data: 'yo',
      },
    ],
  ],
};
const response = await context.sendMessage('hello');
await context.editMessageReplyMarkup(response.messageId, replyMarkup);
```

## Delete Messages

https://core.telegram.org/bots/api#deletemessage

```js
const response = await context.sendMessage('hello');
await context.deleteMessage(response.messageId);
```

## Rate Limits

https://core.telegram.org/bots/faq#my-bot-is-hitting-limits-how-do-i-avoid-this
