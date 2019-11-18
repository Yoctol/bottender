# Telegram hello world

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/telegram-hello-world
cd telegram-hello-world
```

Install dependencies:

```
npm install
```

You must put `accessToken` into `bottender.config.js`.

After that, you can run the bot with this npm script:

```
npm run dev
```

This command will start server for bot developing at `http://localhost:5000`.

If you successfully start the server, you will get a webhook url like `https://xxxxxxxx.ngrok.io/webhooks/slack` from command line.

## Set webhook

While the server running, you can run following command with `bottender` to set up the webhook with the webhook url you get from running `npm run dev`:

```
npx bottender telegram webhook set -w <YOUR_WEBHOOK_URL>
```

> Note: You must put `accessToken` into `bottender.config.js` before running this command.

## Idea of this example

This example is a simple bot running on [Telegram](https://telegram.org/).
For more information, check our [Telegram guides](https://bottender.js.org/docs/channel-telegram-setup).

## Related examples

- [messenger-hello-world](../messenger-hello-world)
- [line-hello-world](../line-hello-world)
- [slack-hello-world](../slack-hello-world)
- [viber-hello-world](../viber-hello-world)
