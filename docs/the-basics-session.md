---
id: the-basics-session
title: Session Storage
---

## Introduction

Since HTTP driven applications are stateless, sessions provide a way to store information about the user between conversations. Bottender ships with a variety of session drivers that are accessed through an expressive, unified API. Support for popular drivers such as memory, file, redis, and mongo is included out of the box.

Every connectors define the way to get the session id from the request payload and determine the session is about a user or shared between a group of users.

## Configuring Session Driver

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

The following four options are valid drivers:

- `memory` - sessions are stored in memory with [LRU cache](https://github.com/isaacs/node-lru-cache) and will not be persisted.
- `file` - sessions are stored in files placed in `.session` directory be default.
- `redis` - sessions are stored in a [redis](https://redis.io/) database.
- `mongo` - sessions are stored in a [mongo](https://www.mongodb.com/) database.

## Using Different Session Driver Based on NODE_ENV

You can safely use memory as the session driver when you develop your apps. After you save something into the session store, you can just reset them by restarting the process.

To achieve this, you can determine which session driver to use by using env variable:

```js
// bottender.config.js

module.exports = {
  session: {
    driver: process.env.NODE_ENV === 'production' ? 'mongo' : 'memory',
    // ...
  },
};
```

## Setting the Session Expiration Time

By default, the sessions stored by Bottender never expires. To set a explicit session expiration time, add the `session.expiresIn` setting in your `bottender.config.js` file:

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

After setting this, the user will get a new session and [conversation state](the-basics-state.md) after without any activities in 15 minutes.
