# LINE builder

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/line-builder
cd line-builder
```

Install dependencies:

```
npm install
```

You must put `accessToken` and `channelSecret` into `index.js`.

After that, you can run the bot with this npm script:

```
npm run dev
```

This command will start server for bot developing at `http://localhost:5000`.

## Set webhook

To set the webhook, go to [LINE developers console](https://developers.line.me/console/) and edit webhook information for your channel.

If you want to expose the server on your local development machine and get a secure URL, [ngrok](https://ngrok.com/) or [localtunnel](https://localtunnel.github.io/www/) may be good tools for you.

## Idea of this example

This example shows how to combine
[`Handler`](https://bottender.js.org/docs/APIReference-Handler) with
[LINE](https://line.me/) bot. For more information, check our
[LINE guides](https://bottender.js.org/docs/Platforms-LINE).

## Related examples

- [line-hello-world](../line-hello-world)
- [messenger-builder](../messenger-builder)
- [slack-builder](../slack-builder)
- [telegram-builder](../telegram-builder)
- [viber-builder](../viber-builder)
