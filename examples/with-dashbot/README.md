# With Dashbot

## Install and Run

Download this example or clone [Bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/with-dashbot
cd with-dashbot
npm install
npm run dev
```

## Idea of this example

This example shows how to combine your bot with **bot analytics tool**. In this
case, we take [Dashbot](https://www.dashbot.io/) as an example.

The following code is the main part of this example which demonstrates the way
to connect your bot with [Dashbot](https://www.dashbot.io/). Furthermore, it
will be better to check [with-express example](../with-express) first.

```js
const server = createServer(bot, {
  verifyToken: '__FILL_YOUR_VERIFY_TOKEN_HERE__',
  webhookMiddleware: dashbotMiddleware(bot, {
    apiKey: '__FILL_YOUR_DASHBOT_KEY_HERE__',
    platform: 'facebook',
  }),
});
```

## Related examples

* [with-chatbase](../with-chatbase)
* [with-botimize](../with-botimize)
* [with-botanalytics](../with-botanalytics)
* [with-express](../with-express)
* [messenger-hello-world](../messenger-hello-world)
