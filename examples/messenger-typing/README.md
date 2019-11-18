# With Typing

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/messenger-typing
cd messenger-typing
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

This example shows using `withTyping` to make your bot user experience better.
It will show typing indicator and delay all your send request for seconds. For
example, this is
[Messenger sender action](https://developers.facebook.com/docs/messenger-platform/send-messages/sender-actions/).
Notice that the unit of optional number of delay seconds is **millisecond**.

## Related examples

- [messenger-hello-world](../messenger-hello-world)
