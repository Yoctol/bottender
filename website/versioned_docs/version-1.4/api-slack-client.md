---
id: version-1.4-api-slack-client
title: SlackClient
original_id: api-slack-client
---

- [Usage](#usage)
- [Methods](#methods)
- [Debug Tips](#debug-tips)
- [Test](#test)

## Usage

Get the `SlackOAuthClient` instance using the `getClient` function:

```js
const { getClient } = require('bottender');

const client = getClient('slack');

// `client` is a `SlackOAuthClient` instance
const accountInfo = await context.client.getAccountInfo();
```

Or, get the `SlackOAuthClient` instance from the `context`:

```js
async function MyAction(context) {
  if (context.platform === 'slack') {
    // `context.client` is a `SlackOAuthClient` instance
    const accountInfo = await context.client.getAccountInfo();
  }
}
```

### Error Handling

`SlackOAuthClient` uses [axios](https://github.com/axios/axios) as HTTP client. We use [axios-error](https://github.com/Yoctol/messaging-apis/tree/master/packages/axios-error) package to wrap API error instances for better formatting error messages. Calling `console.log` with the error instance returns the formatted message.. If you'd like to get the axios `request`, `response`, or `config`, you can still get them via those keys on the error instance.

```js
client.callMethod(method, body).catch(error => {
  console.log(error); // the formatted error message
  console.log(error.stack); // stack trace of the error
  console.log(error.config); // axios request config
  console.log(error.request); // axios HTTP request
  console.log(error.response); // axios HTTP response
});
```

<br />

## Methods

All methods return a Promise.

<br />

### Call Available Methods

#### `callMethod(method, body)` - [Official docs](https://api.slack.com/methods)

Call any API methods which follow [slack calling conventions](https://api.slack.com/web#basics).

| Param  | Type     | Description                                         |
| ------ | -------- | --------------------------------------------------- |
| method | `String` | One of [API Methods](https://api.slack.com/methods) |
| body   | `Object` | Body that the method needs.                         |

Example:

```js
client.callMethod('chat.postMessage', { channel: 'C8763', text: 'Hello!' });
```

<br />

### Chat API

#### `postMessage(channel, message [, options])` - [Official docs](https://api.slack.com/methods/chat.postMessage)

Send a message to a channel.

| Param               | Type                              | Description                                                                                |
| ------------------- | --------------------------------- | ------------------------------------------------------------------------------------------ |
| channel             | `String`                          | Channel, private group, or IM channel to send message to. Can be an encoded ID, or a name. |
| message             | <code>String &#124; Object</code> | The message to be sent, can be text message or attachment message.                         |
| options             | `Object`                          | Other optional parameters.                                                                 |
| options.accessToken | `String`                          | Custom access token of the request.                                                        |

Example:

```js
client.postMessage('C8763', { text: 'Hello!' });
client.postMessage('C8763', { attachments: [someAttachments] });
client.postMessage('C8763', 'Hello!');
client.postMessage('C8763', 'Hello!', { asUser: true });
```

If you send message with `attachments`, `messaging-api-slack` will automatically stringify the `attachments` field for you.

```js
client.postMessage(
  'C8763',
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

#### `postEphemeral(channel, user, message [, options])` - [Official docs](https://api.slack.com/methods/chat.postEphemeral)

Send an ephemeral message to a user in a channel.

| Param               | Type                              | Description                                                                                                                     |
| ------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| channel             | `String`                          | Channel, private group, or IM channel to send message to. Can be an encoded ID, or a name.                                      |
| user                | `String`                          | `id` of the user who will receive the ephemeral message. The user should be in the channel specified by the `channel` argument. |
| message             | <code>String &#124; Object</code> | The message to be sent, can be text message or attachment message.                                                              |
| options             | `Object`                          | Other optional parameters.                                                                                                      |
| options.accessToken | `String`                          | Custom access token of the request.                                                                                             |

Example:

```js
client.postEphemeral('C8763', 'U56781234', { text: 'Hello!' });
client.postEphemeral('C8763', 'U56781234', { attachments: [someAttachments] });
client.postEphemeral('C8763', 'U56781234', 'Hello!');
client.postEphemeral('C8763', 'U56781234', 'Hello!', { asUser: true });
```

<br />

### Users API

#### `getUserList(options?)` - [Official docs](https://api.slack.com/methods/users.list)

Lists all users in a Slack team.

| Param               | Type     | Description                                                                                                                                             |
| ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options             | `Object` | Other optional parameters.                                                                                                                              |
| options.cursor      | `String` | Paginate through collections of data by setting the `cursor` parameter to a `nextCursor` attribute returned by a previous request's `responseMetadata`. |
| options.accessToken | `String` | Custom access token of the request.                                                                                                                     |

Example:

```js
client.getUserList({ cursor }).then(res => {
  console.log(res);
  // {
  //   members: [
  //     { ... },
  //     { ... },
  //   ],
  //   next: 'abcdefg',
  // }
});
```

<br />

#### `getAllUserList(options?)` - [Official docs](https://api.slack.com/methods/users.list)

Recursively lists all users in a Slack team using cursor.

| Param               | Type     | Description                         |
| ------------------- | -------- | ----------------------------------- |
| options             | `Object` | Other optional parameters.          |
| options.accessToken | `String` | Custom access token of the request. |

Example:

```js
client.getAllUserList().then(res => {
  console.log(res);
  // [
  //   { ... },
  //   { ... },
  // ]
});
```

<br />

#### `getUserInfo(userId, options?)` - [Official docs](https://api.slack.com/methods/users.info)

Gets information about an user.

| Param               | Type     | Description                         |
| ------------------- | -------- | ----------------------------------- |
| userId              | `String` | User to get info on.                |
| options             | `Object` | Other optional parameters.          |
| options.accessToken | `String` | Custom access token of the request. |

Example:

```js
client.getUserInfo(userId).then(res => {
  console.log(res);
  // {
  //   id: 'U123456',
  //   name: 'bobby',
  //   ...
  // }
});
```

<br />

### Channels API

#### `getChannelList(options?)` - [Official docs](https://api.slack.com/methods/channels.list)

| Param               | Type     | Description                         |
| ------------------- | -------- | ----------------------------------- |
| options             | `Object` | Other optional parameters.          |
| options.accessToken | `String` | Custom access token of the request. |

Lists all channels in a Slack team.

Example:

```js
client.getChannelList().then(res => {
  console.log(res);
  // [
  //   { ... },
  //   { ... },
  // ]
});
```

<br />

#### `getChannelInfo(channelId, options?)` - [Official docs](https://api.slack.com/methods/channels.info)

Gets information about a channel.

| Param               | Type     | Description                         |
| ------------------- | -------- | ----------------------------------- |
| channelId           | `String` | Channel to get info on.             |
| options             | `Object` | Other optional parameters.          |
| options.accessToken | `String` | Custom access token of the request. |

Example:

```js
client.getChannelInfo(channelId).then(res => {
  console.log(res);
  // {
  //   id: 'C8763',
  //   name: 'fun',
  //   ...
  // }
});
```

<br />

### Conversasions API

#### `getConversationInfo(channelId, options?)` - [Official docs](https://api.slack.com/methods/conversations.info)

Retrieve information about a conversation.

| Param               | Type     | Description                         |
| ------------------- | -------- | ----------------------------------- |
| channelId           | `String` | Channel to get info on.             |
| options             | `Object` | Other optional parameters.          |
| options.accessToken | `String` | Custom access token of the request. |

Example:

```js
client.getConversationInfo(channelId).then(res => {
  console.log(res);
  // {
  //   id: 'C8763',
  //   name: 'fun',
  //   ...
  // }
});
```

<br />

#### `getConversationMembers(channelId, options?)` - [Official docs](https://api.slack.com/methods/conversations.members)

Retrieve members of a conversation.

| Param               | Type     | Description                         |
| ------------------- | -------- | ----------------------------------- |
| channelId           | `String` | Channel to get info on.             |
| options             | `Object` | Optional arguments.                 |
| options.accessToken | `String` | Custom access token of the request. |

Example:

```js
client.getConversationMembers(channelId, { cursor: 'xxx' });
client.getConversationMembers(channelId).then(res => {
  console.log(res);
  // {
  //   members: ['U061F7AUR', 'U0C0NS9HN'],
  //   next: 'cursor',
  // }
});
```

<br />

#### `getAllConversationMembers(channelId, options?)` - [Official docs](https://api.slack.com/methods/conversations.members)

Recursively retrieve members of a conversation using cursor.

| Param               | Type     | Description                         |
| ------------------- | -------- | ----------------------------------- |
| channelId           | `String` | Channel to get info on.             |
| options             | `Object` | Other optional parameters.          |
| options.accessToken | `String` | Custom access token of the request. |

Example:

```js
client.getAllConversationMembers(channelId).then(res => {
  console.log(res);
  // ['U061F7AUR', 'U0C0NS9HN', ...]
});
```

<br />

#### `getConversationList(options?)` - [Official docs](https://api.slack.com/methods/conversations.list)

Lists all channels in a Slack team.

| Param               | Type     | Description                         |
| ------------------- | -------- | ----------------------------------- |
| options             | `Object` | Optional arguments.                 |
| options.accessToken | `String` | Custom access token of the request. |

Example:

```js
client.getConversationList({ cursor: 'xxx' });
client.getConversationList().then(res => {
  console.log(res);
  // {
  //   channels: [
  //     {
  //       id: 'C012AB3CD',
  //       name: 'general',
  //       ...
  //     },
  //     {
  //       id: 'C012AB3C5',
  //       name: 'random',
  //       ...
  //     },
  //   ],
  //   next: 'cursor',
  // }
});
```

<br />

#### `getAllConversationList(options?)` - [Official docs](https://api.slack.com/methods/conversations.list)

Recursively lists all channels in a Slack team using cursor.

| Param               | Type     | Description                         |
| ------------------- | -------- | ----------------------------------- |
| options             | `Object` | Optional arguments.                 |
| options.accessToken | `String` | Custom access token of the request. |

Example:

```js
client.getAllConversationList().then(res => {
  console.log(res);
  // [
  //   {
  //     id: 'C012AB3CD',
  //     name: 'general',
  //     ...
  //   },
  //   {
  //     id: 'C012AB3C5',
  //     name: 'random',
  //     ...
  //   },
  // ],
});
```

<br />

## Debug Tips

### Log Requests Details

To enable default request debugger, use following `DEBUG` env variable:

```sh
DEBUG=messaging-api-slack
```

## Test

### Send Requests to Your Dummy Server

To avoid sending requests to the real Slack server, provide the `origin` option in your `bottender.js.config` file:

```js
module.exports = {
  channels: {
    viber: {
      enabled: true,
      path: '/webhooks/slack',
      accessToken: process.env.SLACK_ACCESS_TOKEN,
      signingSecret: process.env.SLACK_SIGNING_SECRET,
      origin:
        process.env.NODE_ENV === 'test'
          ? 'https://mydummytestserver.com'
          : undefined,
    },
  },
};
```

> **Warning:** Don't do this on the production server.
