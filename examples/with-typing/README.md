# With Typing

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/with-typing
cd with-typing
npm install
npm run dev
```

## Idea of this example

This example shows using `withTyping` to make your bot user experience better.
It will show typing indicator and delay all your send request for seconds. For
example, this is
[Messenger sender action](https://developers.facebook.com/docs/messenger-platform/send-messages/sender-actions/).
Notice that the unit of optional number of delay seconds is **millisecond**.

## Related examples

- [server-express](../server-express)
- [messenger-hello-world](../messenger-hello-world)
