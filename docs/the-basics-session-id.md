---
id: the-basics-session-id
title: Session Id
---

## Introduction

Bottender provide a consistent interface `session.id` as a unique identifier for all platform in all kinds of request.

## Usage

The following code is a demo to reply session.id to user:

```
module.exports = async function App(context) {
  await context.sendText(`session.platform: ${context.session.platform}`);
  await context.sendText(`session.id: ${context.session.id}`);
};
```

`session.id` includes the platform name and channel id to avoid any confiction when a bot connect to multiple platform.

[The defination of `session.id`](https://github.com/Yoctol/bottender/blob/master/packages/bottender/src/bot/Bot.ts#L185) in Bottender is:

```
sessionId = `${platform}:${sessionKey}`
```

`platform` is the platform name, the `sessionKey` come from different sources in different situations.

## Session Key of LINE

there are 3 type of source in LINE playform defined in [the LINE official document](https://developers.line.biz/en/reference/messaging-api/#common-properties), Source user, Source group and Source room.

if a request come from source user, then the sessionKey will be source.userId, for example:

```
line:U4af4980629...
```

if a request come from source group, then the sessionKey will be source.groupId, for example:

```
line:Ca56f94637c...
```

if a request come from source room, then the sessionKey will be source.roomId, for example:

```
line:Ra8dbf4673c...
```

you can read [the implement detail here](https://github.com/Yoctol/bottender/blob/master/packages/bottender/src/bot/LineConnector.ts#L115)

## Session Key in Telegram

The `sessionKey` represent for the `chat.id` in Telegram platform. The principal is the same as the LINE platform, but the implement is more complicated.

this is an example of `session.id`:

```
telegram:16423...
```

you can read [the implement detail here](https://github.com/Yoctol/bottender/blob/master/packages/bottender/src/bot/TelegramConnector.ts#L55)

## Session Key in Messagenger

The `sessionKey` represent for the `recipient.id` or `sender.id` in Slack platform.

you can read [the implement detail here](https://github.com/Yoctol/bottender/blob/master/packages/bottender/src/bot/MessengerConnector.ts#L233)

## Session Key in Slack

The `sessionKey` represent for the `channel.id` in Slack platform.

you can read [the implement detail here](https://github.com/Yoctol/bottender/blob/master/packages/bottender/src/bot/SlackConnector.ts#L117)

## Session Key in Viper

The `sessionKey` represent for the `user.id` or `sender.id` in Slack platform.

you can read [the implement detail here](https://github.com/Yoctol/bottender/blob/master/packages/bottender/src/bot/ViberConnector.ts#L66)
