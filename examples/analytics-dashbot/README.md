# Analytics: Dashbot

## Install and Run

Download this example or clone [Bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/analytics-dashbot
cd analytics-dashbot
npm install
npm run dev
```

## Idea of this example

This example shows how to combine your bot with **bot analytics tool**. In this
case, we take [Dashbot](https://www.dashbot.io/) as an example.

The following code is the main part of this example which demonstrates the way
to connect your bot with [Dashbot](https://www.dashbot.io/). Furthermore, it
will be better to check [server-express example](../server-express) first.

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

* [analytics-chatbase](../analytics-chatbase)
* [analytics-botimize](../analytics-botimize)
* [analytics-botanalytics](../analytics-botanalytics)
* [server-express](../server-express)
* [messenger-hello-world](../messenger-hello-world)
