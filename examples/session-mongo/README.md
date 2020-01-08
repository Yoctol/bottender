# Session: MongoDB

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/session-mongo
cd session-mongo
npm install
npm run dev -- --console
```

## Idea of this Example

This example shows how to use Session to store some information from users and
store sessions in your MongoDB. For more information, check our
[session guide](https://bottender.js.org/docs/the-basics-session).

## Related Examples

- [session-memory](../session-memory)
- [session-file](../session-file)
- [session-redis](../session-redis)
