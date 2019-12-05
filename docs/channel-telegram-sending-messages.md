---
id: channel-telegram-sending-messages
title: Sending Telegram Messages
---

## Sending Text Messages

https://core.telegram.org/bots/api#sendmessage

```js
await context.sendMessage('hello');
```

### Markdown Style Parse Mode

https://core.telegram.org/bots/api#formatting-options

```markdown
_bold text_
_italic text_
[inline URL](http://www.example.com/)
[inline mention of a user](tg://user?id=123456789)
`inline fixed-width code`
\`\`\`block_language
pre-formatted fixed-width code block
\`\`\`
```

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

https://core.telegram.org/bots/api#sendvideo

```js
await context.sendVideo('https://www.example.com/example.mp4');
```

### Animation

https://core.telegram.org/bots/api#sendanimation

```js
await context.sendAnimation('https://www.example.com/example.mp4');
```

### Sticker

https://core.telegram.org/bots/api#sendsticker

```js
await context.sendSticker('CAADAgADQAADyIsGAAE7MpzFPFQX5QI');
```

### Voice

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

https://core.telegram.org/bots/api#sendmediagroup

```js
await context.sendMediaGroup([
  { type: 'photo', media: 'BQADBAADApYAAgcZZAfj2-xeidueWwI' },
]);
```

### Location

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

```js
await context.sendPoll({
  question: 'Which one is your favorite food?',
  options: ['🍔', '🍕', '🌮', '🍱'],
});
```

### Invoice

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
const response = await context.sendPhoto('https://www.example.com/example.png');
await context.editMessageCaption(response.messageId, 'new caption');
```

### Update Media

https://core.telegram.org/bots/api#editmessagemedia

```js
const response = await context.sendPhoto('https://www.example.com/example.png');
await context.editMessageMedia(response.messageId, {
  type: 'photo',
  media: 'https://www.example.com/example2.png',
});
```

### Update ReplyMarkup

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
