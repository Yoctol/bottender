# Messenger Batch

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/messenger-batch
cd messenger-batch
```

Install dependencies:

```sh
npm install
```

You have to put `appId`, `appSecret`, `pageId`, `accessToken` and `verifyToken` into `bottender.config.js`.

If you are not familiar with Messenger Bot, you may refer to Bottender's doc, [Setup Messenger](https://bottender.js.org/docs/channel-messenger-setup), to find detailed instructions.

After that, you can run the bot with this npm script:

```sh
npm run dev
```

This command will start server for bot developing at `http://localhost:5000`.

If you successfully start the server, you will get a webhook URL like `https://xxxxxxxx.ngrok.io/webhooks/messenger` from command line.

## Set Webhook

While the server running, you can run following command with `bottender` to set up the webhook with the webhook URL you get from running `npm run dev`:

```sh
npx bottender messenger webhook set -w <YOUR_WEBHOOK_URL>
```

> Note: You must put `appId`, `appSecret` and `verifyToken` into `bottender.config.js` before running this command.

## Idea of This Example

This example is a bot which sents multiple requsets (up to 50) in batches using `batchConfig` in bottender.config.js:

```js
const { isError613 } = require('messenger-batch');

module.exports = {
  channels: {
    messenger: {
      enabled: true,
      path: '/webhooks/messenger',
      pageId: process.env.MESSENGER_PAGE_ID,
      accessToken: process.env.MESSENGER_ACCESS_TOKEN,
      appId: process.env.MESSENGER_APP_ID,
      appSecret: process.env.MESSENGER_APP_SECRET,
      verifyToken: process.env.MESSENGER_VERIFY_TOKEN,
      batchConfig: {
        delay: 1000,
        shouldRetry: isError613, // (#613) Calls to this api have exceeded the rate limit.
        retryTimes: 2,
      },
    },
  },
};
```

[messenger batch](https://github.com/Yoctol/messenger-batch) implemented the approach described in [Making Batch Requests](https://developers.facebook.com/docs/graph-api/making-multiple-requests/).

## Related Examples

- [messenger-hello-world](../messenger-hello-world)
- [messenger-batch-multi-pages](../messenger-batch-multi-pages)
