# Messenger One-Time Notification

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/messenger-one-time-notification
cd messenger-one-time-notification
```

Install dependencies:

```sh
npm install
```

You must fill `MESSENGER_APP_ID`, `MESSENGER_APP_SECRET`, `MESSENGER_PAGE_ID`, `MESSENGER_ACCESS_TOKEN`, and `MESSENGER_VERIFY_TOKEN` in your `.env` file.

> **Note:** Pages interested in using [Messenger One-Time Notification](https://developers.facebook.com/docs/messenger-platform/send-messages/one-time-notification/) API need to apply for the "One-Time Notification" permission within the "Advanced Messaging" section of Page Settings. For more info, see [Permissions](https://developers.facebook.com/docs/messenger-platform/send-messages/one-time-notification#permissions).

If you are not familiar with Messenger Bot, you may refer to Bottender's doc, [Messenger Setup](https://bottender.js.org/docs/channel-messenger-setup), to find detailed instructions.

After that, you can run the bot with this npm script:

```sh
npm run dev
```

This command starts a server listening at `http://localhost:5000` for bot development.

If you successfully start the server, you get a webhook URL in the format of `https://xxxxxxxx.ngrok.io/webhooks/messenger` from your terminal.

## Set Webhook

While the server is running, you can run the following command with `bottender` to set up the webhook with the webhook URL you got from running `npm run dev`:

```sh
npx bottender messenger webhook set
```

> **Note:** You must fill in your `.env` file before running this command.

## Idea of This Example

This example is a bot running on [Messenger](https://www.messenger.com/) that shows you how to use [Messenger One-Time Notification](https://developers.facebook.com/docs/messenger-platform/send-messages/one-time-notification/) in your Bottender app.
