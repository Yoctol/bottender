# Session: Redis

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/session-redis
cd session-redis
npm install
npm run dev -- --console
```

## Redis Connection Settings

```js
module.exports = {
  session: {
    driver: 'redis',
    stores: {
      redis: {
        port: 6379,
        host: '127.0.0.1',
        password: 'auth',
        db: 0,
      },
    },
  },
};
```

## Idea of This Example

This example shows how to use session to store some information from users in your Redis server. For more information, check our [session guide](https://bottender.js.org/docs/the-basics-session).

## Related Examples

- [session-memory](../session-memory)
- [session-file](../session-file)
- [session-mongo](../session-mongo)
