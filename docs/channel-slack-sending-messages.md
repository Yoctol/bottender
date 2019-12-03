---
id: channel-slack-sending-messages
title: Sending Slack Messages
---

Slack is a messaging channel specialized for team communication. The three major types of Slack communications are `Channels`, `Priavte Groups`, and `Direct Messaging`. Slack bots are usually expected to interact inside group chat. The idea of `Bot` refers to Slack's `APP`.

In the following section, you can see the basic usage of messages / chat.

> **Note:**
> If you are cruious about Slack's complete methods, you may refer to Slack's official document, "[API Methods.](https://api.slack.com/methods)"

PUSH Boradcast


## Sending Text Messages

![Screen Shot 2019-12-02 at 6 38 26 PM](https://user-images.githubusercontent.com/662387/69952866-0f27bf80-1533-11ea-8cbc-41b68e2f733e.png)


`Text message` is the most frequent and common message types. It also offers a minimal medium carrying out dynamic data, e.g., stock price and weather info. 

```js
async function SendHi(context) {
  await context.sendText('Hi!');
}
```

## Posting Messages

send to a channel

```js
await context.chat.postMessage({
  text: 'Hello world!',
});
```

## Updating Messages

```js
await context.chat.update({
  text: 'Hello world!',
  ts: '1405894322.002768',
});
```
message id = ts
ts - Timestamp of the message to be updated.

## Deleting Messages

```js
await context.chat.delete({
  ts: '1405894322.002768',
});
```

ts - Timestamp of the message to be updated.

## Posting Ephemeral Messages
only readable user himself 
and disappear after a while

```js
await context.chat.postEphemeral({
  text: 'Hello world!',
});
```

## Sharing Me Messages

(deleteable)

```js
await context.chat.meMessage({
  text: 'Hello world!',
});
```

## Retrieving A Permalink URL for Specific Extant Messages

```js
await context.chat.getPermalink({
  messageTs: '1234567890.123456',
});
```

## Scheduling Messages

### Scheduling Messages to Be Sent

```js
await context.chat.scheduleMessage({
  text: 'Hello world!',
  postAt: '299876400',
});
```

postAt is Unix EPOCH timestamp

### Getting a List of Scheduled Messages

```js
await context.chat.scheduledMessages.list();
```

### Deleting Pending Scheduled Messages

```js
await context.chat.deleteScheduledMessage({
  scheduledMessageId: '<SCHEDULED_MESSAGE_ID>',
});
```
