---
id: api-event
title: Event
original_id: api-event
---

Bottender event helps you determine what kind of message is sent from user.

You can access `context.event` object within your handlers as the following example shows.

```js
bot.onEvent(async (context) => {
  if (context.event.isText) {
    await context.sendText('I know you sent text message.');
  } else {
    await context.sendText('I know you did not send text message.');
  }
});
```

For platform specific events, please check out following links:

| Platform                                | Doc                                               |
| --------------------------------------- | ------------------------------------------------- |
| Console                                 | [APIReference-ConsoleEvent](api-console-event)    |
| [Messenger](https://www.messenger.com/) | [APIReference-MessengerEvent](api-messengerevent) |
| [LINE](https://line.me/)                | [APIReference-LineEvent](api-lineevent)           |
| [Slack](https://slack.com/)             | [APIReference-SlackEvent](api-slackevent)         |
| [Telegram](https://telegram.org/)       | [APIReference-TelegramEvent](api-telegramevent)   |
| [Viber](https://www.viber.com/)         | [APIReference-ViberEvent](api-viberevent)         |

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
