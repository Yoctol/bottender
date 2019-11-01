---
id: the-basics-session
title: Session Storage
---

## Introduction

Since HTTP driven applications are stateless, the mission of sessions is to store context of users during conversations. Bottender offers a variety of session drivers right out of the box, e.g. memory, file, redis, and mongo. These drivers could be accessed through an expressive, unified API. 

From connectors, the information of session could be accessed, e.g. session id,
plus, whether the session is between a bot and single user, or between a bot and a group of users. One bot could support multiple messaging platforms at once, and one connector refers to one messaging platform.


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

The four valid drivers are as follows:

- `memory` - sessions are stored in memory with [LRU cache](https://github.com/isaacs/node-lru-cache) and not persistent.
- `file` - sessions are stored in files placed in `.session` directory by default.
- `redis` - sessions are stored in a [redis](https://redis.io/) database.
- `mongo` - sessions are stored in a [mongo](https://www.mongodb.com/) database.

## Using Different Session Driver Based on NODE_ENV

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

## Setting the Session Expiration Time

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

With settings above, the user will get a new session and new [conversation state](the-basics-state.md) after inactive for 15 minutes.
