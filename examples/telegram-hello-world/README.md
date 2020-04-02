# Telegram Hello World

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/telegram-hello-world
cd telegram-hello-world
```

Install dependencies:

```sh
npm install
```

You have to put `accessToken` into `bottender.config.js`.

If you are not familiar with Telegram Bot, you may refer to Bottender's doc, [Telegram Setup](https://bottender.js.org/docs/channel-telegram-setup), to find detailed instructions.

After that, you can run the bot with this npm script:

```sh
npm run dev
```

This command will start server for bot developing at `http://localhost:5000`.

If you successfully start the server, you will get a webhook URL like `https://xxxxxxxx.ngrok.io/webhooks/slack` from command line.

## Set Webhook

While the server running, you can run following command with `bottender` to set up the webhook with the webhook URL you get from running `npm run dev`:

```sh
npx bottender telegram webhook set -w <YOUR_WEBHOOK_URL>
```

> Note: You must put `accessToken` into `bottender.config.js` before running this command.

## Idea of This Example

This example is a simple bot running on [Telegram](https://telegram.org/).
For more information, check our [Telegram guides](https://bottender.js.org/docs/channel-telegram-setup).

## Related Examples

- [messenger-hello-world](../messenger-hello-world)
- [line-hello-world](../line-hello-world)
- [slack-hello-world](../slack-hello-world)
- [viber-hello-world](../viber-hello-world)
