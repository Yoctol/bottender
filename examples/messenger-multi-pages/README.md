# Messenger multi-pages example

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/messenger-multi-pages
cd messenger-multi-pages
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

If you successfully start the server, you will get a webhook url like `https://xxxxxxxx.ngrok.io/webhooks/messenger` from command line.

> Note: You must set `PAGE_ID` and `ACCESS_TOKEN` env variables pairs before running this command.

## Set webhook

While the server running, you can run following command with global `bottender` to set up the webhook with the webhook url you get from running `npm run dev`:

```
bottender messenger webhook set -w <YOUR_WEBHOOK_URL>
```

> Note: You must put `appId`, `appSecret` and `verifyToken` into `bottender.config.js` before running this command.

## Idea of this example

This example is a simple bot running on [Messenger](https://www.messenger.com/) to reply separately by different page.\
For more information, check our [Messenger guides](https://bottender.js.org/docs/Platforms-Messenger).

## Related examples

- [messenger-hello-world](../messenger-hello-world)
- [messenger-batch-multi-pages](../messenger-batch-multi-pages)
