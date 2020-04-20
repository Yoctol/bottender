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

You must fill `APP_ID`, `APP_SECRET`, `PAGE_ID`, `ACCESS_TOKEN` and `VERIFY_TOKEN` in your `.env` file.

If you are not familiar with Messenger Bot, you may refer to Bottender's doc, [Messenger Setup](https://bottender.js.org/docs/channel-messenger-setup), to find detailed instructions.

After that, you can run the bot with this npm script:

```sh
npm run dev
```

This command starts a server listening at `http://localhost:5000` for bot development.

If you successfully start the server, you get a webhook URL in the format of `https://xxxxxxxx.ngrok.io/webhooks/line` from your terminal.

## Set Webhook

While the server is running, you can run the following command with `bottender` to set up the webhook with the webhook URL you got from running `npm run dev`:

```sh
npx bottender messenger webhook set
```

> **Note:** You must fill `APP_ID`, `APP_SECRET` and `VERIFY_TOKEN` in your `.env` file before running this command.

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
