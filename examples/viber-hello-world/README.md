# Viber Hello World

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/viber-hello-world
cd viber-hello-world
```

Install dependencies:

```sh
npm install
```

You must fill `VIBER_ACCESS_TOKEN` in your `.env` file.

After that, you can run the bot with this npm script:

```sh
npm run dev
```

This command starts a server listening at `http://localhost:5000` for bot development.

If you successfully start the server, you get a webhook URL in the format of `https://xxxxxxxx.ngrok.io/webhooks/viber` from your terminal.

## Set Webhook

While the server is running, you can run the following command with `bottender` to set up the webhook with the webhook URL you got from running `npm run dev`:

```sh
npx bottender viber webhook set -w <YOUR_WEBHOOK_URL>
```

> **Note:** You must fill in your `.env` file before running this command.

## Idea of This Example

This example is a bot running on [Viber](https://www.viber.com/).
For more information, check our [Viber guides](https://bottender.js.org/docs/channel-viber-setup).
