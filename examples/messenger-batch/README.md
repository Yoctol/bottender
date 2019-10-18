# Messenger batch

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/messenger-batch
cd messenger-batch
```

Install dependencies:

```
npm install
```

You must put `accessToken`, `appSecret` and `verifyToken` into `bottender.config.js`.

After that, you can run the bot with this npm script:

```
npm run dev
```

This command will start server for bot developing at `http://localhost:5000`.

## Set webhook

While the server running, you can run following command with global `bottender` to set up the webhook:

```
bottender messenger webhook set -w <YOUR_WEBHOOK_URL>
```

If you want to expose the server on your local development machine and get a secure URL, [ngrok](https://ngrok.com/) or [localtunnel](https://localtunnel.github.io/www/) may be good tools for you.

> Note: You must put `appId`, `appSecret` and `verifyToken` into `bottender.config.js` before running this command.

## Idea of this example

This example is a bot which sents multiple requsets (up to 50) in batches using `batchConfig`:

```js
const { isError613 } = require('messenger-batch');

new MessengerBot({
  accessToken: config.accessToken,
  appSecret: config.appSecret,
  batchConfig: {
    delay: 1000,
    shouldRetry: isError613, // (#613) Calls to this api have exceeded the rate limit.
    retryTimes: 2,
  },
});
```

[messenger batch](https://github.com/Yoctol/messenger-batch) implemented the approach described in [Making Batch Requests](https://developers.facebook.com/docs/graph-api/making-multiple-requests/).

## Related examples

- [messenger-hello-world](../messenger-hello-world)
- [messenger-batch-multi-pages](../messenger-batch-multi-pages)
