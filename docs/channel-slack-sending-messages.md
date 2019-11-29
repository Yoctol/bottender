---
id: channel-slack-sending-messages
title: Sending Slack Messages
---

## Sending Text Messages

```js
async function SendHi(context) {
  await context.sendText('Hi!');
}
```

## Posting Messages

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

ts - Timestamp of the message to be updated.

## Deleting Messages

```js
await context.chat.delete({
  ts: '1405894322.002768',
});
```

ts - Timestamp of the message to be updated.

## Posting Ephemeral Messages

```js
await context.chat.postEphemeral({
  text: 'Hello world!',
});
```

## Sharing Me Messages

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
