# Analytics: Botimize

## Install and Run

Download this example or clone [Bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/analytics-botimize
cd analytics-botimize
npm install
npm run dev
```

## Idea of this example

This example shows how to combine your bot with **bot analytics tool**. In this
case, we take [Botimize](https://www.getbotimize.com/) as an example.

The following code is the main part of this example which demonstrates the way
to connect your bot with [Botimize](https://www.getbotimize.com/). Furthermore,
it will be better to check [server-express example](../server-express) first.

```js
const server = createServer(bot, {
  verifyToken: '__FILL_YOUR_VERIFY_TOKEN_HERE__',
  webhookMiddleware: botimizeMiddleware(bot, {
    apiKey: '__FILL_YOUR_BOTIMIZE_KEY_HERE__',
    platform: 'facebook',
  }),
});
```

## Related examples

* [analytics-chatbase](../analytics-chatbase)
* [analytics-dashbot](../analytics-dashbot)
* [analytics-botanalytics](../analytics-botanalytics)
* [server-express](../server-express)
* [messenger-hello-world](../messenger-hello-world)
