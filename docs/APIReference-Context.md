---
id: api-context
title: Context
---

Bottender context encapsulates many helpful methods and exports session, client, event, etc., which makes you easier to develop chatbots on different platforms.

For platform specific methods, please check out following links:

| Platform                                | Doc                                                               |
| --------------------------------------- | ----------------------------------------------------------------- |
| Console                                 | [APIReference-ConsoleContext](APIReference-ConsoleContext.md)     |
| [Messenger](https://www.messenger.com/) | [APIReference-MessengerContext](APIReference-MessengerContext.md) |
| [LINE](https://line.me/)                | [APIReference-LineContext](APIReference-LineContext.md)           |
| [Slack](https://slack.com/)             | [APIReference-SlackContext](APIReference-SlackContext.md)         |
| [Telegram](https://telegram.org/)       | [APIReference-TelegramContext](APIReference-TelegramContext.md)   |
| [Viber](https://www.viber.com/)         | [APIReference-ViberContext](APIReference-ViberContext.md)         |

#### `platform`

Example:

```js
context.platform; // 'console', 'messenger', 'line', 'slack', 'telegram', 'viber'...
```

#### `client`

The client instance. Client type depends on your platform.

See [Messaging APIs](https://github.com/Yoctol/messaging-apis) for more information.

Example:

```js
context.client; // client from [Messaging APIs](https://github.com/Yoctol/messaging-apis)
```

#### `event`

The event instance. Event type depends on your platform.

Example:

```js
context.event;
```

#### `session`

The session instance.

Example:

```js
context.session.user.id;
```

#### `state`

The state object.

Example:

```js
context.state;
```

#### `setState(state)`

Shallow merge changes to the state.

Example:

```js
context.setState({
  oneOfMyStateKey: '...',
});
```

#### `resetState()`

Reset the state to the initial state.

Example:

```js
context.resetState();
```

#### `typing(milliseconds)`

Delay and show indicators for milliseconds.

| Param        | Type     | Description                            |
| ------------ | -------- | -------------------------------------- |
| milliseconds | `Number` | Wait for milliseconds and show typing. |

Example:

```js
bot.onEvent(async context => {
  await context.typing(100); // turn on typing mode and wait 0.1 secs.
  await context.sendText('Hello World');
});
```

#### `sendText(text, options)`

Send text to the owner of the session.

Example:

```js
context.sendText('Hello');
```
