# Telegram Inline Keyboard

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/telegram-inline-keyboard
cd telegram-inline-keyboard
```

Install dependencies:

```sh
npm install
```

You must fill `TELEGRAM_ACCESS_TOKEN` in your `.env` file.

If you are not familiar with Telegram Bot, you may refer to Bottender's doc, [Telegram Setup](https://bottender.js.org/docs/channel-telegram-setup), to find detailed instructions.

After that, you can run the bot with this npm script:

```sh
npm run dev
```

This command starts a server listening at `http://localhost:5000` for bot development.

If you successfully start the server, you get a webhook URL in the format of `https://xxxxxxxx.ngrok.io/webhooks/telegram` from your terminal.

## Set Webhook

While the server is running, you can run the following command with `bottender` to set up the webhook with the webhook URL you got from running `npm run dev`:

```sh
npx bottender telegram webhook set
```

> **Note:** You must fill in your `.env` file before running this command.

## Idea of This Example

This example is a bot about inline keyboard running on [Telegram](https://telegram.org/).

This example contains the following topics:

- show the inline keyboard to the user
- build a multiple layer inline keyboard

For more information, check [Telegram Bots#Inline Keyboards](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating)

