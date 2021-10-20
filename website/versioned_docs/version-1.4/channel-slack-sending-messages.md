---
id: channel-slack-sending-messages
title: Sending Slack Messages
original_id: channel-slack-sending-messages
---

Since Slack is a messaging channel specialized for team communication, Slack bots are usually expected to work either inside a channel or 1 on 1 chat.

Chatting in the channel makes collecting individual preferences efficiently. For example, we have a Slack bot to collect colleagues' afternoon tea orders.

Plus, Slack bot is especially good at notification scenarios, e.g., monitoring the health status of online service, or current stars of [Bottender GitHub repo](https://github.com/Yoctol/bottender)(Star it if you like it!). It is because Slack apps can post messages to channels, groups, or users without any extra fee.

While developing with Official Slack API, developers have to manage token, channel id, user id of each dialog. Bottender helps developers manage those parameters by `context.` Bot developers can always make a bot respond to its current context, no matter the context is `Public Channels,` `Private Channels,` `Private Groups,` or `Direct Messaging.`

> **Note:**
>
> - The idea of `Bot` connects to Slack's `APP.` It is important when you are cross-referencing Bottender doc with Slack's official doc.
> - Since Slack is one of the sophisticated chat channels, in this doc, we only cover the most frequent use of methods. To access the full list of Slack API support of Bottender, you may refer to [Bottender's API](api-slack-context.md).
>   If you are interested in Slack's complete methods, you may refer to Slack's official document, "[API Methods.](https://api.slack.com/methods)". Don't miss the `Test` tab next to each method; it offers a handy way to try native Slack API better.

## Sending Text Messages

![Screen Shot 2019-12-02 at 6 38 26 PM](https://user-images.githubusercontent.com/662387/69952866-0f27bf80-1533-11ea-8cbc-41b68e2f733e.png)

`Text message` is the most frequent and common message types. It also offers a minimal medium carrying out dynamic data, e.g., stock price and weather info.

```js
async function SendHi(context) {
  await context.sendText('Hi!');
}
```

## Posting Messages

![Screen Shot 2019-12-06 at 2 52 03 PM](https://user-images.githubusercontent.com/662387/70302447-1b17c800-1838-11ea-8c9a-affe2820fb2f.png)

This method posts a message to a public channel, private channel, or direct message. To fully support Slack's chat UI features, Bottender passes message parameters to Slack's API.

```js
await context.chat.postMessage({
  text: 'Hello world!',
});
```

For more information, please refer to Slack's official doc, [`chat.postMessage`](https://api.slack.com/methods/chat.postMessage)

## Updating Messages

![image](https://user-images.githubusercontent.com/662387/70304195-5e743580-183c-11ea-8859-fab3b2d1b55b.png)

Updating existing messages is one of the unique features of Slack. It is useful when your bot displays a real-time date, and you don't want to have a frequently scrolling window.

In the above image, the second message is updated by Bottender. You may notice that while a user updated his message, a little annotation `(edited)` is shown next to the message, a bot update its existing message without `(edited)` annotation.

```js
await context.chat.update({
  text: 'Hello world!',
  ts: '1405894322.002768',
});
```

For more information, please refer to Slack's official doc, [`chat.update`](https://api.slack.com/methods/chat.update)

> **Note:**
>
> - The `ts` parameter in the code above, refers to the timestamp of the message, which is a (per-channel) unique id of each message,
> - Ephemeral messages created by chat.postEphemeral or otherwise cannot be updated with this method.

## Deleting Messages

This method deletes a message posted by the bot from a channel.

```js
await context.chat.delete({
  ts: '1405894322.002768',
});
```

For more information, please refer to Slack's official doc, [`chat.delete`](https://api.slack.com/methods/chat.delete)

> **Note:** The `ts` parameter in the code above, refers to the timestamp of the message, which is a (per-channel) unique id of each message,

## Posting Ephemeral Messages

![image](https://user-images.githubusercontent.com/662387/70307764-da727b80-1844-11ea-9c33-488cf477e6a4.png)

Bots can post `Ephemeral Messages` only visible to the assigned user in a specific public channel, private channel, or private conversation. In short, `Ephemeral Messages` allows bots to replies context-sensitive information to the user under current Bottender `context.` For example, when a user inputs `check-in`, the bot could post an `Ephemeral Message` to the user check-in time.

For more information, please refer to Slack's official doc, [`chat.postEphemeral`](https://api.slack.com/methods/chat.postEphemeral)

> **Note:** `Ephemeral Message` delivery is not guaranteed — the user must be currently active in Slack and a member of the specified channel.

```js
await context.chat.postEphemeral({
  text: 'Hello world!',
});
```

For more information, please refer to Slack's official doc, [`chat.postEphemeral`](https://api.slack.com/methods/chat.postEphemeral)

## Sharing Me Messages

![image](https://user-images.githubusercontent.com/662387/70309070-9e8ce580-1847-11ea-97b3-c4d5bfaf6996.png)

Share a me message into a channel.

```js
await context.chat.meMessage({
  text: 'Hello world!',
});
```

For more information, please refer to Slack's official doc, [`chat.meMessage`](https://api.slack.com/methods/chat.meMessage)

## Retrieving A Permalink URL for Specific Extant Messages

![image](https://user-images.githubusercontent.com/662387/70309356-4efae980-1848-11ea-815e-dfdf7ae49cc2.png)

Retrieve a permalink URL for a specific extant message

```js
await context.chat.getPermalink({
  messageTs: '1234567890.123456',
});
```

For more information, please refer to Slack's official doc, [`chat.getPermalink`](https://api.slack.com/methods/chat.getPermalink)

> **Note:** The `messageTs` parameter in the code above, refers to the timestamp of the message, which is a (per-channel) unique id of each message,

## Scheduling Messages

Slack owns a built-in message scheduling system. For other chat channels, you probably have to run a `cronjob` to schedule messages.

### Scheduling Messages

![image](https://user-images.githubusercontent.com/662387/70310573-efeaa400-184a-11ea-8f24-2cae4b644d08.png)

Schedules a message to be sent to a channel.

```js
await context.chat.scheduleMessage({
  text: 'Hello world!',
  postAt: '299876400',
});
```

For more information, please refer to Slack's official doc, [`chat.scheduleMessage`](https://api.slack.com/methods/chat.scheduleMessage)

> **Note:** The `postAt` parameter in the code above follows Unix EPOCH timestamp.

### Getting a List of Scheduled Messages

You can get a list of scheduled messages by the following code.

```js
await context.chat.scheduledMessages.list();
```

For more information, please refer to Slack's official doc, [`chat.scheduledMessages.list`](https://api.slack.com/methods/chat.scheduledMessages.list)

### Deleting Pending Scheduled Messages

First, you have to use `chat.scheduledMessages.list` to figure out the `<SCHEDULED_MESSAGE_ID>` you want to delete. Then you can use the below method to delete a scheduled message.

```js
await context.chat.deleteScheduledMessage({
  scheduledMessageId: '<SCHEDULED_MESSAGE_ID>',
});
```

For more information, please refer to Slack's official doc, [`chat.deleteScheduledMessage`](https://api.slack.com/methods/chat.deleteScheduledMessage)
