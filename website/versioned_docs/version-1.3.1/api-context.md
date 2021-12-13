---
id: api-context
title: Context
original_id: api-context
---

Bottender context encapsulates many helpful methods and exports session, client, event, etc., which makes you easier to develop chatbots on different platforms.

For platform specific methods, please check out following links:

| Platform                                | Doc                                                    |
| --------------------------------------- | ------------------------------------------------------ |
| Console                                 | [APIReference-ConsoleContext](api-console-context)     |
| [Messenger](https://www.messenger.com/) | [APIReference-MessengerContext](api-messenger-context) |
| [LINE](https://line.me/)                | [APIReference-LineContext](api-line-context)           |
| [Slack](https://slack.com/)             | [APIReference-SlackContext](api-slack-context)         |
| [Telegram](https://telegram.org/)       | [APIReference-TelegramContext](api-telegram-context)   |
| [Viber](https://www.viber.com/)         | [APIReference-ViberContext](api-viber-context)         |

#### `platform`

Example:

```js
context.platform; // 'console', 'messenger', 'line', 'slack', 'telegram', 'viber'...
```

#### `client`

The client instance. Client type depends on your platform.

For more information, see [Messaging APIs](https://github.com/bottenderjs/messaging-apis).

Example:

```js
context.client; // client from [Messaging APIs](https://github.com/bottenderjs/messaging-apis)
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
context.session.id;
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
async function MyAction(context) {
  await context.typing(100); // turn on typing mode and wait 0.1 secs.
  await context.sendText('Hello World');
}
```

#### `sendText(text, options)`

Send text to the owner of the session.

Example:

```js
context.sendText('Hello');
```
