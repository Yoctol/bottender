# SMS Hello World

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/sms-hello-world
cd sms-hello-world
```

Install dependencies:

```sh
npm install
```

You must fill `SMS_ACCOUNT_SID`, `SMS_AUTH_TOKEN`, and `SMS_PHONE_NUMBER` in your `.env` file.

After that, you can run the bot with this npm script:

```sh
npm run dev
```

This command starts a server listening at `http://localhost:5000` for bot development.

If you successfully start the server, you get a webhook URL in the format of `https://xxxxxxxx.ngrok.io/webhooks/sms` from your terminal.

## Idea of This Example

This example is a bot running on [Twilio SMS](https://www.twilio.com).
For more information, check our [SMS guides](https://bottender.js.org/docs/channel-sms-setup).
