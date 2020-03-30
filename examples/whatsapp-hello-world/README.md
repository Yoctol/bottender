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

You must put `accountSid` and `authToken` into `bottender.config.js`.

After that, you can run the bot with this npm script:

```sh
npm run dev
```

This command will start server for bot developing at `http://localhost:5000`.

If you successfully start the server, you will get a webhook URL like `https://xxxxxxxx.ngrok.io/webhooks/whatsapp` from command line.

## Idea of This Example

This example is a simple bot running on [Twilio API for WhatsApp](https://www.twilio.com/whatsapp).
For more information, check our [WhatsApp guides](https://bottender.js.org/docs/channel-whatsapp-setup).
