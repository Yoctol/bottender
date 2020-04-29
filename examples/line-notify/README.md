# LINE Notify

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/line-notify
cd line-notify
```

Install dependencies:

```sh
npm install
```

You must fill the following variables in your `.env` file:

- `LINE_ACCESS_TOKEN`
- `LINE_CHANNEL_SECRET`
- `LINE_NOTIFY_CLIENT_ID`
- `LINE_NOTIFY_CLIENT_SECRET`
- `ROOT_PATH`

If you are not familiar with LINE Bot, you may refer to Bottender's doc, [LINE Setup](https://bottender.js.org/docs/channel-line-setup) to find detailed instructions.

After that, you can run the bot with this npm script:

```sh
npm run dev
```

This command starts a server listening at `http://localhost:5000` for bot development.

To set up ngrok for your server, run:

```sh
npx ngrok http 5000
```

If you successfully set up ngrok, you get a webhook URL in the format of `https://xxxxxxxx.ngrok.io/webhooks/line` from your terminal.

## Set Webhook

To set the webhook, go to [LINE developers console](https://developers.line.me/console/) and use the webhook URL you got from running `npm run dev` to edit webhook information for your channel.

## Related Examples

- [custom-server-express](../custom-server-express)
