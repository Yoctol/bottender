# Session: Redis

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/session-redis
cd session-redis
npm install
npm run dev
```

## Idea of this example

This example shows how to use Session to store some information from users and
store sessions in your Redis server. For more information, check our
[session guide](https://bottender.js.org/docs/Guides-Session).

## Redis connection settings

`RedisSessionStore` use [ioredis](https://github.com/luin/ioredis) as underlying redis client, so you can use any method `ioredis` supports:

```js
new RedisSessionStore()       // Connect to 127.0.0.1:6379
new RedisSessionStore(6380)   // 127.0.0.1:6380
new RedisSessionStore({
  port: 6379,          // Redis port
  host: '127.0.0.1',   // Redis host
  family: 4,           // 4 (IPv4) or 6 (IPv6)
  password: 'auth',
  db: 0
})
// Connect to 127.0.0.1:6380, db 4, using password "authpassword"
new RedisSessionStore('redis://:authpassword@127.0.0.1:6380/4')
```

## Related examples

* [session-memory](../session-memory)
* [session-file](../session-file)
* [session-mongo](../session-mongo)
