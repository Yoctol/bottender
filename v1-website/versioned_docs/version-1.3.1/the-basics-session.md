---
id: version-1.3.1-the-basics-session
title: Session
original_id: the-basics-session
---

## Introduction

Conversations may happen in a 1 on 1 chat or even in a channel with thousands of people in there. So, Bottender provides a mechanism called **session** to distinguish different conversations and store temporary data on the corresponding conversation. The session mechanism in Bottender bots is similar to the session mechanism in typical web servers.

Before using the session, you may want to know the following terminologies:

- [Session State](the-basics-session.md#session-state): temporary data on the conversation.
- [Session ID](the-basics-session.md#session-id): an unique identifier of the conversation.
- [Session Storage](the-basics-session.md#session-storage): where to store the session.

## Session State

Session state is the temporary data stored on the corresponding conversation. You can provide customized user experience with session state. For example, you can use session state to count the number of the received messages.

### A Counting Bot Example

Considering a counting bot which replies the number of message events it received, for example:

```
You > Hi
Bot > Count: 1
You > Hi
Bot > Count: 2
```

In this section, we will explain how to use the state correctly to build a counter. It begins with a count state variable, which is updated when the bot receives an event.

Let's start with a static [Bottender action](the-basics-actions.md) as follows:

```js
async function EventCount(context) {
  await context.sendText('Count: 1');
}
```

### Adding State to the Conversation

1. Set initial state in the `bottender.config.js` file:

```js
module.exports = {
  initialState: {
    count: 0,
  },
};
```

After adding the above settings, Bottender sets the initial state to the specified object for the new conversation session.

2. Access state value using `context.state`:

```js
async function EventCount(context) {
  const count = context.state.count + 1;
  await context.sendText(`Count: ${count}`);
}
```

Even though we use the state variable to render the message content, it always gets `Count: 1` as a result. That's why step 3 is necessary.

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

If you want to do a deeper merge, you need to do it explicitly:

```js
context.setState({
  myObject: {
    ...context.myObject,
    key: value,
  },
});
```

### Debug State in Console Mode

In [Console Mode](the-basics-console-mode.md), you can leverage the convenient built-in command - `/state` to help you debug you state transition:

```
You > /state
```

The `/state` command formats the state with `JSON.stringify()` and send the result as a bot message to you:

```
Bot > { "count": 1 }
```

## Session ID

Every session has a unique identifier. You can get the unique identifier on the `context` by accessing `context.session.id`. For example, you may let your bot replies with the platform and session ID information to the user:

```js
module.exports = async function App(context) {
  await context.sendText(`Platform: ${context.platform}`);
  await context.sendText(`Session ID: ${context.session.id}`);
};
```

To avoid ID conflict among platforms, Bottender combines the name of the platform and the session key to create the unique session ID. For example:

- `telegram:16423...` on Telegram
- `line:U4af4980629...` on LINE

To support all kinds of 1 on 1 chats and channel chats on all platforms, Bottender gets session keys from user IDs, channel IDs, group IDs, room IDs, or whatever that Bottender can use to distinguish the conversations.

For example, the LINE platform defines three types of sources (user, group, and room) in [the LINE official document](https://developers.line.biz/en/reference/messaging-api/#common-properties):

- If an event comes from a user, the session key is the value of `source.userId`, so the entire session ID looks like: `line:U4af4980629...`.
- If an event comes from a group, the session key is the value of `source.groupId`, so the entire session ID looks like: `line:Ca56f94637c...`.
- If an event comes from a room, the session key is the value of `source.roomId`, so the entire session ID looks like: `line:Ra8dbf4673c...`.

## Session Storage

Since HTTP driven apps are stateless, the mission of sessions is to store the context of users during conversations.

### Configuring Session Driver

The session driver configuration option defines where session data are stored for each conversation. To set the session driver, edit the `session.driver` field in the `bottender.config.js` file:

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
        dirname: '.sessions',
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

Bottender ships with several great drivers out of the box:

- `memory` - sessions are stored in memory with [LRU cache](https://github.com/isaacs/node-lru-cache) and not persistent.
- `file` - sessions are stored in the files placed in the `.sessions` directory.
- `redis` - sessions are stored in a [Redis](https://redis.io/) database.
- `mongo` - sessions are stored in a [MongoDB](https://www.mongodb.com/) database.

### Using Different Session Driver Based on NODE_ENV

We recommend using `memory` as the session driver in development for shorter iteration. By restarting the process, you can reset the session store completely.

Also, you can determine which session driver to use in development or production separately by using an environment variable:

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

You can specify an explicit session expiration time to reset the state. It makes a bot more human-like by forgetting (re-initializing) the state after the conversation has been inactive for a while.

By default, Bottender never expires the stored sessions. To set explicit session expiration time, add the `session.expiresIn` setting in your `bottender.config.js` file:

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

With the above settings, the users get a new session and [state](the-basics-session.md#session-state) after 15 minutes of user inactive.
