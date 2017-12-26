# Messenger multi-pages example

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/messenger-multi-pages
cd messenger-multi-pages
```

Install dependencies:

```
npm install
```

You must put `accessToken`, `appSecret` and `verifyToken` into `bottender.config.js`.

After that, you can run the bot with this npm script:

```
npm run dev
```

This command will start server for bot developing at `http://localhost:5000`.

> Note: You must set `PAGE_ID` and `ACCESS_TOKEN` env variables pairs before running this command. See `.env.sample` for more details.

## Set webhook

While the server running, you can run following command with global `bottender` to set up the webhook:

```
bottender messenger webhook set -w <YOUR_WEBHOOK_URL>
```

If you want to expose the server on your local development machine and get a secure URL, [ngrok](https://ngrok.com/) or [localtunnel](https://localtunnel.github.io/www/) may be good tools for you.

> Note: You must put `appId`, `appSecret` and `verifyToken` into `bottender.config.js` before running this command.

## Idea of this example

This example is a simple bot running on [Messenger](https://www.messenger.com/) to reply separately by different page.\
For more information, check our [Messenger guides](https://bottender.js.org/docs/Platforms-Messenger).

## Related examples

* [messenger-builder](../messenger-builder)
* [console-hello-world](../console-hello-world)
