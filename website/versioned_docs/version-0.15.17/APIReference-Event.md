---
id: version-0.15.17-api-event
title: Event
original_id: api-event
---

Bottender event helps you determine what kind of message is sent from user.

You can access `context.event` object within your handlers as the following example shows.

```js
bot.onEvent(async context => {
  if (context.event.isText) {
    await context.sendText('I know you sent text message.');
  } else {
    await context.sendText('I know you did not send text message.');
  }
});
```

For platform specific events, please check out following links:

| Platform                                | Doc                                                           |
| --------------------------------------- | ------------------------------------------------------------- |
| Console                                 | [APIReference-ConsoleEvent](APIReference-ConsoleEvent.md)     |
| [Messenger](https://www.messenger.com/) | [APIReference-MessengerEvent](APIReference-MessengerEvent.md) |
| [LINE](https://line.me/)                | [APIReference-LineEvent](APIReference-LineEvent.md)           |
| [Slack](https://slack.com/)             | [APIReference-SlackEvent](APIReference-SlackEvent.md)         |
| [Telegram](https://telegram.org/)       | [APIReference-TelegramEvent](APIReference-TelegramEvent.md)   |
| [Viber](https://www.viber.com/)         | [APIReference-ViberEvent](APIReference-ViberEvent.md)         |

#### `rawEvent`

Underlying raw event.

Example:

```js
event.rawEvent;
// {
//   ...
// }
```

#### `isMessage`

Determine if the event is a message event.

Example:

```js
event.isMessage; // true
```

#### `message`

The message object from Messenger raw event.

Example:

```js
event.message;
// {
//   ...
//   text: 'Awesome.',
// }
```

#### `isText`

Determine if the event is a message event which includes text.

Example:

```js
event.isText; // true
```

#### `text`

The text string from Messenger raw event.

Example:

```js
event.text; // 'Awesome.'
```
