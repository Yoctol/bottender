# Viber builder

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/viber-builder
cd viber-builder
```

Install dependencies:

```
npm install
```

You must put `accessToken` into `bottender.config.js`.

After that, you can run the bot with this npm script:

```
npm run dev
```

This command will start server for bot developing at `http://localhost:5000`.

## Set webhook

While the server running, you can run following command with global `bottender` to set up the webhook:

```
bottender viber webhook set -w <YOUR_WEBHOOK_URL>
```

If you want to expose the server on your local development machine and get a secure URL, [ngrok](https://ngrok.com/) or [localtunnel](https://localtunnel.github.io/www/) may be good tools for you.

> Note: You must put `accessToken` into `bottender.config.js` before running this command.

## Idea of this example

This example shows how to combine
[`Handler`](https://bottender.js.org/docs/APIReference-Handler) with
[Viber](https://www.viber.com/) bot.
For more information, check our [Viber guides](https://bottender.js.org/docs/Platforms-Viber).

## Related examples

* [viber-hello-world](../viber-hello-world)
* [messenger-builder](../messenger-builder)
* [line-builder](../line-builder)
* [slack-builder](../slack-builder)
* [telegram-builder](../telegram-builder)
