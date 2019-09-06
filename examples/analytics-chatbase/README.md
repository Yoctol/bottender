# Analytics: Chatbase

## Install and Run

Download this example or clone [Bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/analytics-chatbase
cd analytics-chatbase
npm install
npm run dev
```

## Idea of this example

This example shows how to combine your bot with **bot analytics tool**. In this
case, we take [Chatbase](https://chatbase.com/welcome) which is built by Google
as an example.

The following code is the main part of this example which demonstrates the way
to connect your bot with [Chatbase](https://chatbase.com/welcome). Furthermore,
it will be better to check [server-express example](../server-express) first.

```js
const server = createServer(bot, {
  verifyToken: '__FILL_YOUR_VERIFY_TOKEN_HERE__',
  webhookMiddleware: chatbaseMiddleware(bot, {
    apiKey: '__FILL_YOUR_CHATBASE_KEY_HERE__',
    platform: 'Facebook',
  }),
});
```

## Related examples

* [analytics-dashbot](../analytics-dashbot)
* [analytics-botanalytics](../analytics-botanalytics)
* [server-express](../server-express)
* [messenger-hello-world](../messenger-hello-world)
