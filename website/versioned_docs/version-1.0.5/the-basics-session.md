---
id: version-1.0.5-the-basics-session
title: Session
original_id: the-basics-session
---

## Introduction

Bottender provide a mechanism for you to recognize each conversation and store temporary data on ecah conversation. just like session of the web server.

- [Session state](the-basics-session.md#session-state): store and retrieve data on each conversation
- [Session id](the-basics-session.md#session-id): a identifier to recognize each conversation
- [Session storage](the-basics-session.md#session-storage): specify what kind of storage you want to use

## Session State

`State` is widely used in flow control of daily mahcines, e.g. traffic light. The change of state is in response to external inputs and/or conditions is satisfied. For example, a green traffic light (a state) changes to yellow traffic light after 60 sec (a satisfied time condition).

### A Counting Bot Example

Considering a couting bot which responds the number of message events it received, for example:

```
You > Hi
Bot > Count: 1
You > Hi
Bot > Count: 2
```

In this section, we will explain how to use state correctly to build a counter. It begins with a count state variable, which will be updated when the bot receives an event.

Let's start with a static action like this:

```js
async function EventCount(context) {
  await context.sendText('Count: 1');
}
```

### Adding State to the Conversation

1. Set initial state in `bottender.config.js` file:

```js
module.exports = {
  initialState: {
    count: 0,
  },
};
```

After adding this, Bottender will set initial state to this object for the new conversation session.

2. Access state value using `context.state`:

```js
async function EventCount(context) {
  const count = context.state.count + 1;
  await context.sendText(`Count: ${count}`);
}
```

Even though we use state variable to render the message content, it always gets `Count: 1` as result. That's why step 3 is necessary.

3. Set state value using `context.setState()`:

```js
async function EventCount(context) {
  const count = context.state.count + 1;

  context.setState({
    count,
  });

  await context.sendText(`Count: ${count}`);
}
```

Then it works as expected.

> **Note:** don't modify state directly using `this.state.stateKey = stateValue;`, it may cause unexpected behavior in the future.

### State Updates are Merged

When you call `setState()`, Bottender shallow merges the object you provide into the current state.

```js
context.state; // { count: 1 }

context.setState({
  myObject: {},
});

context.state; // { count: 1, myObject: {} }
```

But if you want to do a deeper merge, you need to do it explicitly:

```js
context.setState({
  myObject: {
    ...context.myObject,
    key: value,
  },
});
```

### Debug State in Console Mode

In ["Console Mode"](the-basics-console-mode.md), you can leverage the convenient built-in command - `/state` to help you debugging you state transition:

```
You > /state
```

This commmand formats the state with `JSON.stringify()` and send the result as a bot message to you:

```
Bot > { "count": 1 }
```

## Session Id

Bottender provide a consistent interface `session.id` as a unique identifier for all platform in all kinds of request.

### Usage

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

### Session Key of LINE

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

### Session Key in Telegram

The `sessionKey` represent for the `chat.id` in Telegram platform. The principal is the same as the LINE platform, but the implement is more complicated.

this is an example of `session.id`:

```
telegram:16423...
```

you can read [the implement detail here](https://github.com/Yoctol/bottender/blob/master/packages/bottender/src/bot/TelegramConnector.ts#L55)

### Session Key in Messenger

The `sessionKey` represent for the `recipient.id` or `sender.id` in Slack platform.

you can read [the implement detail here](https://github.com/Yoctol/bottender/blob/master/packages/bottender/src/bot/MessengerConnector.ts#L233)

### Session Key in Slack

The `sessionKey` represent for the `channel.id` in Slack platform.

you can read [the implement detail here](https://github.com/Yoctol/bottender/blob/master/packages/bottender/src/bot/SlackConnector.ts#L117)

### Session Key in Viper

The `sessionKey` represent for the `user.id` or `sender.id` in Slack platform.

you can read [the implement detail here](https://github.com/Yoctol/bottender/blob/master/packages/bottender/src/bot/ViberConnector.ts#L66)

## Session Storage

Since HTTP driven applications are stateless, the mission of sessions is to store context of users during conversations. Bottender offers a variety of session drivers right out of the box, e.g. memory, file, redis, and mongo. These drivers could be accessed through an expressive, unified API.

From connectors, the information of session could be accessed, e.g. session id,
plus, whether the session is between a bot and single user, or between a bot and a group of users. One bot could support multiple messaging platforms at once, and one connector refers to one messaging platform.

You can specify an explicit session expiration time to reset the state. It makes a bot more human-like by forgetting (initializing) the state after conversation has been inactive for a while

### Configuring Session Driver

Session driver can be set by `session.driver` value in the `bottender.config.js` file:

```js
// bottender.config.js

module.exports = {
  session: {
    driver: 'memory',
    stores: {
      memory: {
        maxSize: 500,
      },
      file: {
        dirname: '.session',
      },
      redis: {
        port: 6379,
        host: '127.0.0.1',
        password: 'auth',
        db: 0,
      },
      mongo: {
        url: 'mongodb://localhost:27017',
        collectionName: 'sessions',
      },
    },
  },
};
```

The four valid drivers are as follows:

- `memory` - sessions are stored in memory with [LRU cache](https://github.com/isaacs/node-lru-cache) and not persistent.
- `file` - sessions are stored in files placed in `.session` directory by default.
- `redis` - sessions are stored in a [redis](https://redis.io/) database.
- `mongo` - sessions are stored in a [mongo](https://www.mongodb.com/) database.

### Using Different Session Driver Based on NODE_ENV

It is recommended to use memory as the session driver in the development for shorter iteration. By restarting the process, the session store could be reset completely.

You can determine which session driver to use in the development or production by env variable:

```js
// bottender.config.js

module.exports = {
  session: {
    driver: process.env.NODE_ENV === 'production' ? 'mongo' : 'memory',
    // ...
  },
};
```

### Setting the Session Expiration Time

By default, the sessions stored by Bottender never expire. To set explicit session expiration time, add the `session.expiresIn` setting in your `bottender.config.js` file:

```js
// bottender.config.js

module.exports = {
  session: {
    driver: 'memory',
    expiresIn: 15, // 15 minutes
    // ...
  },
};
```

With settings above, the user will get a new session and new [session state](the-basics-session.md#session-state) after inactive for 15 minutes.
