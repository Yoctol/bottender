# Telegram Game

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/telegram-game
cd telegram-game
```

Install dependencies:

```sh
npm install
```

You must fill `TELEGRAM_ACCESS_TOKEN`, `GAME_NAME` and `ROOT_PATH` in your `.env` file.

If you are not familiar with Telegram Bot, you may refer to Bottender's doc, [Telegram Setup](https://bottender.js.org/docs/channel-telegram-setup), to find detailed instructions.

After that, you can run the bot with this npm script:

```sh
npm run dev
```

This command starts a server listening at `http://localhost:5000` for bot development.

To set up ngrok for your server, run:

```sh
npx ngrok http 5000
```

If you successfully start the server, you get a webhook URL in the format of `https://xxxxxxxx.ngrok.io/webhooks/telegram` from your terminal.

## Set Webhook

While the server running, you can run following command with `bottender` to set up the webhook with the webhook URL you get from running `npm run dev`:

```sh
npx bottender telegram webhook set -w <YOUR_WEBHOOK_URL>
```

> **Note:** You must fill in your `.env` file before running this command.

## Idea of This Example

This example is a game bot running on [Telegram](https://telegram.org/).

This example contains the following topics:

- send the game to the user
- set game score of the user
- share the game to a different chat

You must create a new Telegram game by following [Telegram Bot API#Games](https://core.telegram.org/bots/api#games).

## Related Examples

- [telegram-hello-world](../telegram-hello-world)
- [telegram-poll](../telegram-poll)
