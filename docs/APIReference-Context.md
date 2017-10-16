# Context

## Introduction

A Bottender Context encapsulates many helpful methods into a single object like session, client from [messaging-apis](https://github.com/Yoctol/messaging-apis), event, etc. which makes you easiler to develop a chatbot system on different platform.

## General Methods
| Property | Return | Description |
|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| platform | string | The name of the platform. |
| client | Messenger: [MessengerClient](https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger)<br> LINE: [LineClient](https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-line)<br> Slack: [SlackClient](https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-slack)<br> Telegram: [TelegramClient](https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-telegram)<br> Console: ConsoleClient  | The client instance.<br> Return value depends on your platform. |
| event | Messenger: MessengerEvent<br> LINE: LineEvent<br> Slack: SlackEvent<br> Telegram: TelegramEvent<br> Console: ConsoleEvent | The event instance.<br> Return value depends on your platform. |
| session | Object | The session state of the context. |
| [typing](https://github.com/Yoctol/toolbot-core-experiment/blob/docs-context/docs/APIReference-Context.md#typingmilliseconds) | Promise | Delay and show indicators for milliseconds. |
| [sendText](https://github.com/Yoctol/toolbot-core-experiment/blob/docs-context/docs/APIReference-Context.md#sendtexttext-options) | Promise | Send text to the owner of the session. |

## Messenger
 These are other methods on Messenger. See more details at [messaging-api-messenger](https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger).
- sendAttachment
- sendImage
- sendAudio
- sendVideo
- sendFile
- sendQuckReplies
- sendGenericTemplate
- sendButtonTemplate
- sendListTemplate
- sendReceiptTemplate
- sendAirlineBoardingPassTemplate
- sendAirlineCheckinTemplate
- sendAirlineItineraryTemplate
- sendAirlineFlightUpdateTemplate

Description:
- Each of these functions is similar to method in [messaging-api-messenger](https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger), but we handle **first parameters (userId)** for you.

## LINE
These are other methods on LINE. See more details at [messaging-api-line](https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-line)
- replyText
- pushText
<br><br>
- replyImage
- pushImage
- sendImage
<br><br>
- replyVideo
- pushVideo
- sendVideo
<br><br>
- replyAudio
- pushAudio
- sendAudio
<br><br>
- replyLocation
- pushLocation
- sendLocation
<br><br>
- replySticker
- pushSticker
- sendSticker
<br><br>
- replyImagemap
- pushImagemap
- sendImagemap
<br><br>
- replyButtonTemplate
- pushButtonTemplate
- sendButtonTemplate
<br><br>
- replyConfirmTemplate
- pushConfirmTemplate
- sendConfirmTemplate
<br><br>
- replyCarouselTemplate
- pushCarouselTemplate
- sendCarouselTemplate
<br><br>
- replyImageCarouselTemplate
- pushImageCarouselTemplate
- sendImageCarouselTemplate

Description:
- Each of these functions is similar to method in [messaging-api-line](https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-line), but we handle **first parameters (userId or replyToken)** for you.

- **Notice: sendXXX will use exact same API as pushXXX**

## Slack
These are other methods on Slack. See more details at [messaging-api-slack](https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-slack)

- postMessage

Description:
- Each of these functions is similar to method in [messaging-api-slack](https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-slack), but we handle **first parameters (channelId)** for you.

## Telegram
These are other methods on Telegram. See more details at [messaging-api-telegram](https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-telegram)

- sendMessage
- sendPhoto
- sendAudio
- sendDocument
- sendSticker
- sendVideo
- sendVoice
- sendLocation
- sendVenue
- sendContact
- sendChatAction

Description:
- Each of these functions is similar to method in [messaging-api-telegram](https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-telegram), but we handle **first parameters (chatId)** for you.

## Example

Let's use [example](https://github.com/Yoctol/toolbot-core-experiment/blob/master/examples/messenger-hello-world/index.js) with Messenger platform.

```js
bot.onEvent(async context => {
  // platform
  console.log(context.platform); // Messenger

  // send text message to user
  await context.sendText('Hello World');
});
```

### `typing(milliseconds)`
| Param    | Type            | Description
| -------  | --------------- | -----------
| milliseconds | `Number` | First, User will see bot is typing. Second, wait for milliseconds. Then bot's typing mode will close.

```js
bot.onEvent(async context => {
  await context.typing(100); // bot turn on typing mode and wait 0.1 secs then close.
  await context.sendText('Hello World');
});
```

### `sendText(text, options)`

similar as [client.sendText(userId, text [, options])](https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#sendtextuserid-text--options)

```js
// MessengerBot
bot.onEvent(async context => {
  const userId = context.session.user.id;

  // they are doing same things
  await context.sendText('Hello Messenger');
  await context.client.sendText(userId, 'Goodbye Messenger');
});
```

```js
// LineBot
bot.onEvent(async context => {
  const userId = context.session.user.id;

  // they are doing same things
  await context.sendText('Hello LINE');
  await context.client.pushText(userId, 'Goodbye LINE');
});
```
