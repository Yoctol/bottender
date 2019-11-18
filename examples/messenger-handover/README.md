# Messenger handover

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/messenger-handover
cd messenger-handover
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

## Set webhook

While the server running, you can run following command with `bottender` to set up the webhook with the webhook url you get from running `npm run dev`:

```
npx bottender messenger webhook set -w <YOUR_WEBHOOK_URL>
```

> Note: You must put `appId`, `appSecret` and `verifyToken` into `bottender.config.js` before running this command.

## Idea of this example

This example shows how to use [Messenger Handover Protocol](https://developers.facebook.com/docs/messenger-platform/handover-protocol) in Bottender bots.
For more information, check our [Messenger guides](https://bottender.js.org/docs/channel-messenger-setup).

## Related examples

- [messenger-hello-world](../messenger-hello-world)
