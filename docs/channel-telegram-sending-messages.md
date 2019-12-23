---
id: channel-telegram-sending-messages
title: Sending Telegram Messages
---

The more I know about Telegram, the more I love it. It might be the best chat channel for educational, experimental, personal bot project.

Although Telegram is not one of the top 5 chat channels, I surprisingly found that Telegram is the most activity chat channels for bots from [Google Trends.](https://trends.google.com/trends/explore?date=2018-01-01%202019-01-01&q=Telegram%20Bot,Slack%20App,LINE%20Bot,Messenger%20Bot,Viber%20Bot)

<p><img width="100%" src="https://user-images.githubusercontent.com/662387/71064407-fad9f880-21a9-11ea-9022-9d0a566fc29c.png">
</p>

Plus, I may argue that Telegram is the most developer-friendly chat channel. For example:

- You don't need a developer account to build bots. You just needs to talk to @BotFather (see Bottender doc, ["Setup Telegram"](./channel-telegram-setup.md) for more info)
- The desktop and mobile version of Telegram has quite similar behavior
- Your app can proactively send messages to your users without extra cost (while Messenger or LINE asked for extra cost for push messages)

<p><img width="300" src="https://user-images.githubusercontent.com/662387/70965210-e292ac80-20c9-11ea-9f1b-74abced2ff9e.jpeg">
<br/> <em>Telegram is so freindly that developers can't refuse</em> </p>

Telegram also cares about user's privacy. For example, you may check ["Privacy Mode"](https://core.telegram.org/bots#privacy-mode) before building a Telegram Bot for group chat. By default, A bot running in privacy mode only receives certain types of messages instead of complete chat history.

### Basic Factors of Telegram Bots: Messages, Reply Markup, Updatable

Briefly speaking, the two basic concepts you need to know about Telegram bots are: `Messages` and `Reply Markup.` Both of them are `Updatable.`

Telegram Bots support a bunch of rich messages. For example, even you can send `Markdown` or `HTML` in `Text Messages.` You can even send `Invoice Message` if your bot has a payment feature. Don't miss the lovely `Sticker Message.` Telegram helps you to host `Sticker Pack`.

`Reply Markup` is similar to the combination of `Quick Replies` and `Buttons` on Messenger or LINE. It is attached under a message and offered multiple choices to guide your users to open a webpage, trigger a bot action, reply a message on user's behalf,

Every `Messages` and `Reply Markup` is updatable. Remember to manage your bot sent messages if you tend to make a message update afterward.

In the following code, you can see a quick example of the message update.

```js
const response = await context.sendMessage('hello');
await context.editMessageText(response.messageId, '*world*', {
  parseMode: 'markdown',
});
```

### Bottender Playground

If you can't wait to try Telegram Bots features, we prepared a simple demo bot for you, [Bottender Playground](https://t.me/BottenderPlaygroundBot).

 <p><a href="https://t.me/BottenderPlaygroundBot" target="_blank"><img width="400" src="https://user-images.githubusercontent.com/662387/71264165-6c6aa000-237e-11ea-9be5-626a6eadcdba.jpg"></a></p>

<hr />

In the following sections, you can see a brief introduction about using Telegram APIs in Bottender.

## Sending Text Messages

Use this method to send text messages. You can choose to send a message in plain text, `Markdown,` or `HTML.`

On success, the sent message is returned. You can save the returned message for further updates.

```js
await context.sendMessage('hello');
```

> **Note:**
> For more info, please refer to Telegram's official doc, [sendMessage](https://core.telegram.org/bots/api#sendmessage).

### Markdown Style Parse Mode

Use this method to send text messages in `Markdown.`

On success, the sent message is returned. You can save the returned message for further updates.

```js
await context.sendMessage('*hello*', { parseMode: 'markdown' });
```

You can see the possible `Markdown` format below.

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

> **Note:**
> For more info, please refer to Telegram's official doc, [Formatting Options](https://core.telegram.org/bots/api#formatting-options).

### HTML Style Parse Mode

Use this method to send text messages in HTML.

On success, the sent message is returned. You can save the returned message for further updates.

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

> **Note:**
> For more info, please refer to Telegram's official doc, [Formatting Options](https://core.telegram.org/bots/api#formatting-options).

## Sending Rich Media Messages

Sending Rich Media in Telegram is straightforward and consistent, in the majority of the case, all you need to prepare is a URL.

### Photo

Use this method to send photos. On success, the sent message is returned.

```js
await context.sendPhoto('https://www.example.com/example.png');
```

> **Note:**
> For more info, please refer to Telegram's official doc, [sendPhoto](https://core.telegram.org/bots/api#sendphoto).

### Audio

Use this method to send audio. On success, the sent message is returned.

```js
await context.sendAudio('https://www.example.com/example.mp3');
```

> **Note:**
> For more info, please refer to Telegram's official doc, [sendAudio](https://core.telegram.org/bots/api#sendaudio).

### Document

Use this method to send general files. On success, the sent message is returned. Bots can currently send files of any type of up to 50 MB in size; this limit may change in the future.

```js
await context.sendDocument('https://www.example.com/example.gif');
```

> **Note:**
> For more info, please refer to Telegram's official doc, [sendDocument](https://core.telegram.org/bots/api#senddocument).

### Video

Use this method to send video files; Telegram clients support mp4 videos (other formats may be sent as `Document`). On success, the sent message is returned. Bots can currently send video files of up to 50 MB in size; this limit may change in the future.

```js
await context.sendVideo('https://www.example.com/example.mp4');
```

> **Note:**
> For more info, please refer to Telegram's official doc, [sendVideo](https://core.telegram.org/bots/api#sendvideo).

### Animation

Use this method to send animation files (GIF or H.264/MPEG-4 AVC video **without sound**). On success, the sent message is returned. Bots can currently send animation files of up to 50 MB in size; this limit may change in the future.

```js
await context.sendAnimation('https://www.example.com/example.mp4');
```

> **Note:**
> For more info, please refer to Telegram's official doc, [sendAnimation](https://core.telegram.org/bots/api#sendanimation).

### Sticker

Use this method to send static .WEBP or animated .TGS stickers. On success, the sent message is returned.

```js
await context.sendSticker('CAADAgADQAADyIsGAAE7MpzFPFQX5QI');
```

If you are eager to know the sticker ID of existing stickers, you may refer to the following code.

```js
module.exports = async function App(context) {
  if (context.event.isSticker) {
    await context.sendText(
      `received the sticker: ${context.event.sticker.fileId}`
    );
  }
};
```

> **Note:**
> For more info, please refer to Telegram's official doc, [sendSticker](https://core.telegram.org/bots/api#sendsticker).

### Voice

Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message.

For this to work, your audio must be in an .ogg file encoded with OPUS (other formats may be sent as Audio or Document). On success, the sent message is returned. Bots can currently send voice messages of up to 50 MB in size; this limit may change in the future.

```js
await context.sendVoice('https://www.example.com/example.ogg');
```

> **Note:**
> For more info, please refer to Telegram's official doc, [sendVoice](https://core.telegram.org/bots/api#sendvoice).

### VideoNote

As of v.4.0, Telegram clients support rounded square mp4 videos of up to 1 minute long. Use this method to send video messages. On success, the sent message is returned.

```js
await context.sendVideoNote('https://www.example.com/example.mp4');
```

> **Note:**
> For more info, please refer to Telegram's official doc, [sendVideoNote](https://core.telegram.org/bots/api#sendvideonote).

### MediaGroup

Use this method to send a group of photos or videos as an album. On success, an array of the sent messages is returned.

```js
await context.sendMediaGroup([
  { type: 'photo', media: 'https://http.cat/100' },
  { type: 'photo', media: 'https://http.cat/101' },
]);
```

> **Note:**
> For more info, please refer to Telegram's official doc, [sendMediaGroup](https://core.telegram.org/bots/api#sendmediagroup).

### Location

Use this method to send a location point on the map. On success, the sent message is returned.

```js
await context.sendLocation({ latitude: 25.105497, longitude: 121.597366 });
```

> **Note:**
> For more info, please refer to Telegram's official doc, [sendLocation](https://core.telegram.org/bots/api#sendlocation).

### Venue

Use this method to send information about a venue. On success, the sent message is returned.

```js
await context.sendVenue({
  location: { latitude: 25.105497, longitude: 121.597366 },
  title: 'taipei',
  address: 'taipei address',
});
```

> **Note:**
> For more info, please refer to Telegram's official doc, [sendVenue](https://core.telegram.org/bots/api#sendvenue).

### Contact

Use this method to send phone contacts. On success, the sent message is returned.

```js
await context.sendContact({
  phoneNumber: '123456',
  firstName: 'first',
});
```

If you have optional parameters, put them into the second argument.

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

> **Note:**
> For more info, please refer to Telegram's official doc, [sendContact](https://core.telegram.org/bots/api#sendcontact).

### Poll

Use this method to send a native poll. A native poll can't be sent to a private chat. On success, the sent message is returned.

```js
await context.sendPoll('Which one is your favorite food?', [
  '🍔',
  '🍕',
  '🌮',
  '🍱',
]);
```

> **Note:**
>
> - If you try to send poll in a private chat, you will get an error message like, `"description": "Bad Request: polls can't be sent to private chats"`.
> - For more info, please refer to Telegram's official doc, [sendPoll](https://core.telegram.org/bots/api#sendpoll).

### Invoice

You have to enable payment provider for your Telegram Bot before sending Invoice. Use this method to send invoices. On success, the sent message is returned.

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

> **Note:**
> For more info, please refer to Telegram's official doc, [sendInvoice](https://core.telegram.org/bots/api#sendinvoice).

### ChatAction

Use this method to make your bot more human-like. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns True on success.

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

> **Note:**
> For more info, please refer to Telegram's official doc, [sendChatAction](https://core.telegram.org/bots/api#sendchataction).

### Forward Messages

Use this method to forward messages of any kind. On success, the sent Message is returned.

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

> **Note:**
> For more info, please refer to Telegram's official doc, [forwardMesasge](https://core.telegram.org/bots/api#forwardmessage).

## Sending with Reply Markup

For bot users, `Reply Markup` are useful guides to the next possible actions. `Reply Markup` in Telegram is similar to the combination of `Quick Reply` and `Button` in Messenger and LINE.

### Inline Keyboard

This object represents an inline keyboard that appears right next to the message it belongs to.

```js
const replyMarkup = {
  inlineKeyboard: [
    [
      {
        text: 'hi',
        url: 'https://www.example.com',
      },
      {
        text: 'yo',
        callbackData: 'yo',
      },
    ],
  ],
};
```

> **Note:**
> For more info, please refer to Telegram's official doc,
> [Inline Keyboards Markup](https://core.telegram.org/bots/api#inlinekeyboardmarkup), [New Inline Keyboards](https://core.telegram.org/bots/2-0-intro#new-inline-keyboards), and [Inline Keyboards(On the Fly)](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating),.

### Keyboard

<p><img width="300" src="https://user-images.githubusercontent.com/662387/70965224-e45c7000-20c9-11ea-9a1d-2e911e00e435.jpeg"></p>

<p><img width="300" src="https://user-images.githubusercontent.com/662387/70965221-e3c3d980-20c9-11ea-9b9d-05410817c5d8.jpeg"></p>

Whenever your bot sends a message, it can pass along a special keyboard with predefined reply options.

Telegram apps that receive the message display your keyboard to the user. Tapping any of the buttons immediately sends the respective command.

If you want your keyboard disappears after any tap, try to set `oneTimeKeyboard` to `true`. Set `selective` to `true` if you just want to offer keyboards to the mentioned users.

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

> **Note:**
> For more info, please refer to Telegram's official doc,
> [Keyboards](https://core.telegram.org/bots#keyboards), [Reply Keyboards](https://core.telegram.org/bots/api/#replykeyboardmarkup), and [Remove Reply Keyboard](https://core.telegram.org/bots/api/#replykeyboardremove).

### How To Send A Reply Markup

You will see how to send a `Reply Markup` in the code below.

#### sendText

```js
await context.sendText(text, { replyMarkup });
```

#### sendPhoto

```js
await context.sendPhoto(url, { replyMarkup });
```

#### sendAudio

```js
await context.sendAudio(url, { replyMarkup });
```

#### sendDocument

```js
await context.sendDocument(url, { replyMarkup });
```

#### sendVideo

```js
await context.sendVideo(url, { replyMarkup });
```

#### sendAnimation

```js
await context.sendAnimation(url, { replyMarkup });
```

#### sendSticker

```js
await context.sendSticker(sticker, { replyMarkup });
```

#### sendVoice

```js
await context.sendVoice(url, { replyMarkup });
```

#### sendVideoNote

```js
await context.sendVideoNote(url, { replyMarkup });
```

#### sendMediaGroup

```js
await context.sendMediaGroup([media], { replyMarkup });
```

#### sendLocation

```js
await context.sendLocation(location, { replyMarkup });
```

#### sendVenue

```js
await context.sendVenue(venue, { replyMarkup });
```

#### sendContact

```js
await context.sendContact(contact, { replyMarkup });
```

## Updating Messages

Telegram offers bots the capability to update sent messages. A Telegram bots can even delete a sent message by itself.

You can see a few update example code below.

> **Note:**
> For more info, please refer to Telegram's official doc,
> [Update Messages](https://core.telegram.org/bots/api#updating-messages)

### Update Text

```js
const response = await context.sendMessage('hello');
await context.editMessageText(response.messageId, '*world*', {
  parseMode: 'markdown',
});
```

> **Note:**
> For more info, please refer to Telegram's official doc,
> [Edit Message Text](https://core.telegram.org/bots/api#editmessagetext)

### Update Caption

```js
const response = await context.sendPhoto('https://http.cat/302', {
  caption: `original caption`,
});
await context.editMessageCaption(response.messageId, 'new caption');
```

> **Note:**
> For more info, please refer to Telegram's official doc,
> [Edit Message Caption](https://core.telegram.org/bots/api#editmessagecaption)

### Update Media

```js
const response = await context.sendPhoto('https://http.cat/100');
await context.editMessageMedia(response.messageId, {
  type: 'photo',
  media: 'https://http.cat/302',
});
```

> **Note:**
> For more info, please refer to Telegram's official doc,
> [Edit Message Media](https://core.telegram.org/bots/api#editmessagemedia)

### Update ReplyMarkup

```js
const replyMarkup = {
  inlineKeyboard: [
    [
      {
        text: 'hi',
        url: 'https://www.example.com',
      },
      {
        text: 'yo',
        callbackData: 'yo',
      },
    ],
  ],
};
const response = await context.sendMessage('hello');
await context.editMessageReplyMarkup(response.messageId, replyMarkup);
```

> **Note:**
> For more info, please refer to Telegram's official doc,
> [Edit Message Reply Markup](https://core.telegram.org/bots/api#editmessagereplymarkup)

## Delete Messages

```js
const response = await context.sendMessage('hello');
await context.deleteMessage(response.messageId);
```

> **Note:**
> For more info, please refer to Telegram's official doc,
> [Delete Message](https://core.telegram.org/bots/api#deletemessage)

## Rate Limits

At this moment, Telegram doesn't support sending bulk messages, e.g., notifications.

To avoid hitting rate limits, i.e., send messages to 30 users per second, consider spreading them over longer intervals, e.g., 8-12 hours. Otherwise, you'll start getting 429 errors.

> **Note:**
> For more info, please refer to Telegram's official doc about [Rate Limit](https://core.telegram.org/bots/faq#my-bot-is-hitting-limits-how-do-i-avoid-this)
