# Messenger Batch Multi-Pages Example

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/messenger-batch-multi-pages
cd messenger-batch-multi-pages
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

> Note: You must set `PAGE_ID` and `ACCESS_TOKEN` env variables pairs before running this command.

## Set Webhook

While the server running, you can run following command with `bottender` to set up the webhook with the webhook URL you get from running `npm run dev`:

```sh
npx bottender messenger webhook set -w <YOUR_WEBHOOK_URL>
```

> Note: You must put `appId`, `appSecret` and `verifyToken` into `bottender.config.js` before running this command.

## Idea of this Example

This example is a simple bot running on [Messenger](https://www.messenger.com/) to reply separately by different page.\
For more information, check our [Messenger guides](https://bottender.js.org/docs/channel-messenger-setup).

## Related Examples

- [messenger-batch](../messenger-batch)
- [messenger-multi-pages](../messenger-multi-pages)
