# WhatsApp Hello World

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/whatsapp-hello-world
cd whatsapp-hello-world
```

Install dependencies:

```sh
npm install
```

You must put `ACCOUNT_SID`, `AUTH_TOKEN` and `PHONE_NUMBER` into `.env`.

After that, you can run the bot with this npm script:

```sh
npm run dev
```

This command starts a server listening at `http://localhost:5000` for bot development.

If you successfully start the server, you get a webhook URL in the format of `https://xxxxxxxx.ngrok.io/webhooks/whatsapp` from your terminal.

## Idea of This Example

This example is a bot running on [Twilio API for WhatsApp](https://www.twilio.com/whatsapp).
For more information, check our [WhatsApp guides](https://bottender.js.org/docs/channel-whatsapp-setup).
