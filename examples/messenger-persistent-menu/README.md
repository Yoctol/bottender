# Messenger persistent menu

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/messenger-deep-nested-menu
cd messenger-deep-nested-menu
```

Install dependencies:

```
npm install
```

You must put `accessToken`, `appSecret` and `verifyToken` into `bottender.config.js`.

To set messenger profile, run following command with global `bottender`:

```
bottender messenger profile set
```

After that, you can run the bot with this npm script:

```
npm run dev
```

This command will start server for bot developing at `http://localhost:5000`.

## Set webhook

While the server running, you can run following command with global `bottender` to set up the webhook:

```
bottender messenger webhook set -w <YOUR_WEBHOOK_URL>
```

If you want to expose the server on your local development machine and get a secure URL, [ngrok](https://ngrok.com/) or [localtunnel](https://localtunnel.github.io/www/) may be good tools for you.

> Note: You must put `appId`, `appSecret` and `verifyToken` into `bottender.config.js` before running this command.

## Idea of this example

It shows how to extend nested persistent menu to have 3 levels and total 75 call to actions.

## Related examples

* [messenger-hello-world](../messenger-hello-world)
* [with-config](../with-config)
