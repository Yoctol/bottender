---
id: session
title: Conversation Session
---

A session is a place to store data that you want to access to across requests. Each user that talks to your bot have a unique session. You can use sessions to store and access user data as they talk to your bot.

## Session Expiration

You are able to set expired time for session optionally. The default value of expiration is **one year** after `SessionStore` object is created.  
The expiration should be sent as a **Number of minutes** when you are initializing a `SessionStore` object.

Here is an example of creating a `MongoSessionStore` object with expired time:

```js
// Session will expire after 10 minutes
const { ConsoleBot, MongoSessionStore } = require('bottender');

const bot = new ConsoleBot({
  sessionStore: new MongoSessionStore(
    'mongodb://localhost:27017/',
    {
      collectionName: 'session',
    },
    10
  ),
});
```

## Use Different Session Store

Session store is a place where session data is being stored on the server.

We implement the following kinds of session store. All kinds of bots will use memory session store as default.

- **memory** - sessions are stored in memory with [LRU cache](https://github.com/isaacs/node-lru-cache) and will not be persisted. See [example](https://github.com/Yoctol/bottender/tree/v0.15.x/examples/session-memory)
- **file** - sessions are stored in `.sessions` by default. See
  [example](https://github.com/Yoctol/bottender/tree/v0.15.x/examples/session-file)
- **mongo** - sessions are stored in a mongo database. See
  [example](https://github.com/Yoctol/bottender/tree/v0.15.x/examples/session-mongo)
- **redis** - sessions are stored in redis based stores. See
  [example](https://github.com/Yoctol/bottender/tree/v0.15.x/examples/session-redis)

## Session Store Configuration

### MemorySessionStore

```js
import { MemorySessionStore } from 'bottender';

new MemorySessionStore(max, expiresIn);
```

| Param     | Type     | Description                                                                           |
| --------- | -------- | ------------------------------------------------------------------------------------- |
| max       | `Number` | The max number of items in memory cache, defaults to `Infinity`.                      |
| expiresIn | `Number` | Optional. Session expiration time in minutes, defaults to `365 * 24 * 60`, or 1 year. |

Examples:

```js
new MemorySessionStore();
new MemorySessionStore(1000);
```

### FileSessionStore

```js
import { FileSessionStore } from 'bottender';

new FileSessionStore(dirname, expiresIn);
```

| Param     | Type     | Description                                                                           |
| --------- | -------- | ------------------------------------------------------------------------------------- |
| dirname   | `String` | Optional. The directory name to store session files, defaults to `.sessions`.         |
| expiresIn | `Number` | Optional. Session expiration time in minutes, defaults to `365 * 24 * 60`, or 1 year. |

Examples:

```js
new FileSessionStore();
new FileSessionStore('my-sessions-folder');
```

### MongoSessionStore

```js
import { MongoSessionStore } from 'bottender';

new MongoSessionStore(url, options, expiresIn);
```

| Param                  | Type     | Description                                                                                                     |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| url                    | `String` | The [mongodb connection string](https://docs.mongodb.com/manual/reference/connection-string/) to your database. |
| options                | `Object` | Optional. The options object. See below for details.                                                            |
| options.collectionName | `String` | Optional. The collection name to store the sessions, defaults to `sessions`.                                    |
| expiresIn              | `Number` | Optional. Session expiration time in minutes, defaults to `365 * 24 * 60`, or 1 year.                           |

Examples:

```js
new MongoSessionStore(); // Connect to 127.0.0.1:27017
new MongoSessionStore(
  'mongodb://db1.example.net:27017,db2.example.net:2500/?replicaSet=test',
  { collectionName: 'my-sessions' }
);
```

### RedisSessionStore

```js
import { RedisSessionStore } from 'bottender';

new RedisSessionStore(redisOption, expiresIn);
```

| Param       | Type                       | Description                                                                                                                 |
| ----------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| redisOption | `String | Number | Object` | The [ioredis connection option](https://github.com/luin/ioredis#connect-to-redis) to your database. See below for examples. |
| expiresIn   | `Number`                   | Optional. Session expiration time in minutes, defaults to `365 * 24 * 60`, or 1 year.                                       |

Examples:

```js
new RedisSessionStore(); // Connect to 127.0.0.1:6379
new RedisSessionStore(6380); // 127.0.0.1:6380
new RedisSessionStore({
  port: 6379, // Redis port
  host: '127.0.0.1', // Redis host
  family: 4, // 4 (IPv4) or 6 (IPv6)
  password: 'auth',
  db: 0,
});
// Connect to 127.0.0.1:6380, db 4, using password "authpassword"
new RedisSessionStore('redis://:authpassword@127.0.0.1:6380/4');
```

## Adding Custom Session Drivers

Your custom session driver should implement the `SessionStore` interface. This interface contains just a few simple methods you need to implement. A stubbed store implementation looks something like this:

```js
// @flow

class Store implements SessionStore {
  init(): Promise<SessionStore> {
    /* Initializes the session store */
  }
  read(sessionId: string): Promise<Session | null> {
    /* Reads single session from the session store  */
  }
  write(sessionId: string, data): Promise<void> {
    /* Writes single session to the session store  */
  }
  destroy(sessionId: string): Promise<void> {
    /* Deletes single session from the session store  */
  }
  all(): Promise<Array<Session>> {
    /* Reads all sessions from the session store  */
  }
}
```

## Manipulate Session State

See more on [state](Guides-State.md).
