# Event

## Introduction

A Bottender Event can help you determine what kind of message is sent from user.

## Usage

### context.event

```js
bot.onEvent(async context => {
  if (context.event.isTextMessage) {
    await context.sendText('I know you sent text message.');
  } else {
    await context.sendText("I know you didn't send text message.");
  }
})
```

See more details at [example](https://github.com/Yoctol/toolbot-core-experiment/tree/master/examples/event)

## Methods

- **M**: Messenger
- **L**: LINE
- **S**: Slack
- **T**: Telegram
- **C**: Console

| Name | M | L | S | T | C | Return | Description |
|:-------------------:|:-:|:-:|:-:|:-:|:-:|:--------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|
| rawEvent | ✅ | ✅ | ✅ | ✅ | ✅ | M: MessengerRawEvent<br>L: LineRawEvent<br>S: SlackRawEvent<br>T: TelegramRawEvent<br>C: ConsoleRawEvent | Underlying raw event.<br> **Return value depends on your platform**. |
| isMessage | ✅ | ✅ | ✅ | ✅ | ✅ | boolean | Determine if the event is a **message** event. |
| message | ✅ | ✅ | ✅ | ✅ | ✅ | Message | The **message** object from raw event. |
| isTextMessage | ✅ | ✅ | ✅ | ✅ | ✅ | boolean | Determine if the event is a message event which includes **text**. |
| isAudioMessage | ✅ | ✅ |  | ✅ |  | boolean | Determine if the event is a message event which includes **audio** attachment. |
| isVideoMessage | ✅ | ✅ |  | ✅ |  | boolean | Determine if the event is a message event which includes **video** attachment. |
| isLocationMessage | ✅ | ✅ |  | ✅ |  | boolean | Determine if the event is a message event which includes **location** attachment. |
| isStickerMessage | ✅ | ✅ |  | ✅ |  | boolean | Determine if the event is a message event which includes **sticker**. |
| isImageMessage | ✅ | ✅ |  |  |  | boolean | Determine if the event is a message event which includes **image** attachment. |
| isFileMessage | ✅ |  |  |  |  | boolean | Determine if the event is a message event which includes **file** attachment. |
| isFallbackMessage | ✅ |  |  |  |  | boolean | Determine if the event is a message event which includes **fallback** attachment. |
| isChannelsMessage |  |  | ✅ |  |  | boolean | Determine if the event is a message event sent from **channels**. |
| isGroupsMessage |  |  | ✅ |  |  | boolean | Determine if the event is a message event sent from **groups**. |
| isImMessage |  |  | ✅ |  |  | boolean | Determine if the event is a message event sent from **instant messaging**. |
| isMpimMessage |  |  | ✅ |  |  | boolean | Determine if the event is a message event sent from **multiple people instant messaging**. |
| isDocumentMessage |  |  |  | ✅ |  | boolean | Determine if the event is a message event which includes **document**. |
| isGameMessage |  |  |  | ✅ |  | boolean | Determine if the event is a message event which includes **game**. |
| isPhotoMessage |  |  |  | ✅ |  | boolean | Determine if the event is a message event which includes **photo**. |
| isVoiceMessage |  |  |  | ✅ |  | boolean | Determine if the event is a message event which includes **voice**. |
| isVideoNoteMessage |  |  |  | ✅ |  | boolean | Determine if the event is a message event which includes **video note**. |
| isContactMessage |  |  |  | ✅ |  | boolean | Determine if the event is a message event which includes **contact**. |
| isVenueMessage |  |  |  | ✅ |  | boolean | Determine if the event is a message event which includes **venue**. |
| isPostback | ✅ | ✅ |  |  |  | boolean | Determine if the event is a **postback** event. |
| postback | ✅ | ✅ |  |  |  | Postback | The **postback** object from raw event. |
| hasAttachment | ✅ |  |  |  |  | boolean | Determine if the event has any **attachments**. |
| attachments | ✅ |  |  |  |  | Array | The **attachments array** from Messenger raw event. |
| isLikeSticker | ✅ |  |  |  |  | boolean | Determine if the event is a message event which includes **'like' sticker**. |
| isQuickReply | ✅ |  |  |  |  | boolean | Determine if the event is a message event triggered from **quick reply**. |
| quickReply | ✅ |  |  |  |  | QuickReply | The **quick reply** object from Messenger raw event. |
| isEcho | ✅ |  |  |  |  | boolean | Determine if the event is a message event sent from **our side**. |
| isPayment | ✅ |  |  |  |  | boolean | Determine if the event is a **payment** event. |
| payment | ✅ |  |  |  |  | Payment | The **payment** object from Messenger raw event. |
| isRead | ✅ |  |  |  |  | boolean | Determine if the event is a message **read** event. |
| isDelivery | ✅ |  |  |  |  | boolean | Determine if the event is a **message delivery** event. |
| isPayload | ✅ |  |  |  |  | boolean | Determine if the event is a postback or quick reply which includes **payload**. |
| payload | ✅ |  |  |  |  | string | The **payload** received from postback or quick reply. |
| isPolicyEnforcement | ✅ |  |  |  |  | boolean | Determine if the event is a **policy enforcement** event. |
| policyEnforcement | ✅ |  |  |  |  | PolicyEnforcement | The **policy enforcement** object from Messenger raw event. |
| isAppRoles | ✅ |  |  |  |  | boolean | Determine if the event is an **app roles** event. |
| appRoles | ✅ |  |  |  |  | AppRoles | The **app roles** object from Messenger raw event. |
| isStandby | ✅ |  |  |  |  | boolean | Determine if the event is a **standby** event. |
| isPassThreadControl | ✅ |  |  |  |  | boolean | Determine if the event is a **pass thread control** event. |
| passThreadControl | ✅ |  |  |  |  | PassThreadControl | The **pass thread control** object from Messenger raw event. |
| isTakeThreadControl | ✅ |  |  |  |  | boolean | Determine if the event is a **take thread control** event. |
| takeThreadControl | ✅ |  |  |  |  | TakeThreadControl | The **take thread control** object from Messenger raw event. |
| replied |  | ✅ |  |  |  | boolean | **Underlying raw event** from LINE. |
| replyToken |  | ✅ |  |  |  | ReplyToken | The **reply token** from LINE raw event. Only present on message, follow, join, postback, beacon events. |
| isFollow |  | ✅ |  |  |  | boolean | Determine if the event is a **follow** event. |
| isUnfollow |  | ✅ |  |  |  | boolean | Determine if the event is an **unfollow** event. |
| isJoin |  | ✅ |  |  |  | boolean | Determine if the event is a **join** event. |
| isLeave |  | ✅ |  |  |  | boolean | Determine if the event is a **leave** event. |
| date |  | ✅ |  |  |  | string | The **date string** from LINE postback event. |
| time |  | ✅ |  |  |  | string | The **time string** from LINE postback event. |
| datetime |  | ✅ |  |  |  | string | The **datetime string** from LINE postback event. |
| isBeacon |  | ✅ |  |  |  | boolean | Determine if the event is a **beacon** event. |
| isCallbackQuery |  |  |  | ✅ |  | boolean | Determine if the event is a **callback query** event. |
