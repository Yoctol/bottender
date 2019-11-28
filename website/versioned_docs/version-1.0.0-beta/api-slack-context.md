---
id: version-1.0.0-beta-api-slack-context
title: SlackContext
original_id: api-slack-context
---

#### Chat API

#### `postMessage(message [, options])` - [Official docs](https://api.slack.com/methods/chat.postMessage)

Alias: `sendText`.

Sends a message to the channel.

| Param   | Type                              | Description                                                        |
| ------- | --------------------------------- | ------------------------------------------------------------------ |
| message | <code>String &#124; Object</code> | The message to be sent, can be text message or attachment message. |
| options | `Object`                          | Other optional parameters.                                         |

Example:

```js
context.postMessage({ text: 'Hello!' });
context.postMessage({ attachments: [someAttachments] });
context.postMessage('Hello!');
context.postMessage('Hello!', { as_user: true });
```

If you send message with `attachments`, `messaging-api-slack` will automatically stringify the `attachments` field for you.

```js
context.postMessage(
  {
    text: 'Hello!',
    attachments: [
      {
        text: 'Choose a game to play',
        fallback: 'You are unable to choose a game',
        callbackId: 'wopr_game',
        color: '#3AA3E3',
        attachmentType: 'default',
        actions: [
          {
            name: 'game',
            text: 'Chess',
            type: 'button',
            value: 'chess',
          },
        ],
      },
    ],
  },
  {
    asUser: true,
  }
);
```

<br />

#### `postEphemeral(message [, options])` - [Official docs](https://api.slack.com/methods/chat.postEphemeral)

Sends an ephemeral message to the user.

| Param   | Type                              | Description                                                        |
| ------- | --------------------------------- | ------------------------------------------------------------------ |
| message | <code>String &#124; Object</code> | The message to be sent, can be text message or attachment message. |
| options | `Object`                          | Other optional parameters.                                         |

Example:

```js
context.postEphemeral({ text: 'Hello!' });
context.postEphemeral({ attachments: [someAttachments] });
context.postEphemeral('Hello!');
context.postEphemeral('Hello!', { asUser: true });
```
