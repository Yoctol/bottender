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

You must put `accessToken` into `bottender.config.js`.

If you are not familiar with Telegram Bot, you may refer to Bottender's doc, [Telegram Setup](https://bottender.js.org/docs/channel-telegram-setup), to find detailed instructions.

After that, you can run the bot with this npm script:

```sh
npm run dev
```

This command starts a server listening at `http://localhost:5000` for bot development.

If you successfully start the server, you get a webhook URL in the format of `https://xxxxxxxx.ngrok.io/webhooks/slack` from your terminal.

## Set Webhook

While the server is running, you can run the following command with `bottender` to set up the webhook with the webhook URL you got from running `npm run dev`:

```sh
npx bottender telegram webhook set -w <YOUR_WEBHOOK_URL>
```

> Note: You must put `accessToken` into `bottender.config.js` before running this command.

## Idea of This Example

This example is a bot running on [Telegram](https://telegram.org/).
For more information, check our [Telegram guides](https://bottender.js.org/docs/channel-telegram-setup).
