# Messenger persistent menu

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/messenger-persistent-menu
cd messenger-persistent-menu
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

If you successfully start the server, you will get a webhook url like `https://xxxxxxxx.ngrok.io/webhooks/messenger` from command line.

## Set webhook

While the server running, you can run following command with global `bottender` to set up the webhook with the webhook url you get from running `npm run dev`:

```
bottender messenger webhook set -w <YOUR_WEBHOOK_URL>
```

> Note: You must put `appId`, `appSecret` and `verifyToken` into `bottender.config.js` before running this command.

## Idea of this example

It shows how to set a [persistent menu](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/persistent-menu/) on [Messenger](https://www.messenger.com/).
For more information, check our [Messenger guides](https://bottender.js.org/docs/Platforms-Messenger).

## Related examples

- [messenger-hello-world](../messenger-hello-world)
