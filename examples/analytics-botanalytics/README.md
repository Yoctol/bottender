# Analytics: Botanalytics

## Install and Run

Download this example or clone [Bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/analytics-botanalytics
cd analytics-botanalytics
npm install
npm run dev
```

## Idea of this example

This example shows how to combine your bot with **bot analytics tool**. In this
case, we take [botanalytics](https://botanalytics.co/) as an example.

The following code is the main part of this example which demonstrates the way
to connect your bot with [botanalytics](https://botanalytics.co/). Furthermore,
it will be better to check [server-express example](../server-express) first.

```js
const server = createServer(bot, {
  verifyToken: '__FILL_YOUR_VERIFY_TOKEN_HERE__',
  webhookMiddleware: botanalyticsMiddleware(bot, {
    apiToken: '__FILL_YOUR_BOTANALYTICS_TOKEN_HERE__',
  }),
});
```

## Related examples

- [analytics-chatbase](../analytics-chatbase)
- [analytics-dashbot](../analytics-dashbot)
- [server-express](../server-express)
- [messenger-hello-world](../messenger-hello-world)
