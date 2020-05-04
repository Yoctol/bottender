# LINE Hello World

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/line-hello-world
cd line-hello-world
```

Install dependencies:

```sh
npm install
```

You must fill `LINE_ACCESS_TOKEN` and `LINE_CHANNEL_SECRET` in your `.env` file.

If you are not familiar with LINE Bot, you may refer to Bottender's doc, [LINE Setup](https://bottender.js.org/docs/channel-line-setup), to find detailed instructions.

After that, you can run the bot with this npm script:

```sh
npm run dev
```

This command starts a server listening at `http://localhost:5000` for bot development.

If you successfully start the server, you get a webhook URL in the format of `https://xxxxxxxx.ngrok.io/webhooks/line` from your terminal.

## Set Webhook

To set the webhook, go to [LINE developers console](https://developers.line.me/console/) and use the webhook URL you got from running `npm run dev` to edit webhook information for your channel.

## Idea of This Example

This example is a bot running on [LINE](https://line.me/).
For more information, check our [LINE guides](https://bottender.js.org/docs/channel-line-setup).

## Related Examples

- [line-liff-v1](../line-liff-v1)
- [line-liff-v2](../line-liff-v2)
- [line-notify](../line-notify)
- [line-rich-menu](../line-rich-menu)
- [line-rich-menu-submenu](../line-rich-menu-submenu)
