# LINE hello world

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

You must put `accessToken` and `channelSecret` into `index.js`.

After that, you can run the bot with this npm script:

```sh
npm run dev
```

This command will start server for bot developing at `http://localhost:5000`.

If you successfully start the server, you will get a webhook url like `https://xxxxxxxx.ngrok.io/webhooks/line` from command line.

## Set webhook

To set the webhook, go to [LINE developers console](https://developers.line.me/console/) and use the webhook url you get from running `npm run dev` to edit webhook information for your channel.

## Idea of this example

This example is a simple bot running on [LINE](https://line.me/).
For more information, check our [LINE guides](https://bottender.js.org/docs/channel-line-setup).

## Related examples

- [messenger-hello-world](../messenger-hello-world)
- [slack-hello-world](../slack-hello-world)
- [telegram-hello-world](../telegram-hello-world)
- [viber-hello-world](../viber-hello-world)
