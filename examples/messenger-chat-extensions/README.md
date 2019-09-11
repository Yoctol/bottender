# Messenger Chat Extensions

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/messenger-chat-extensions
cd messenger-chat-extensions
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

> Note: You must add your domain to [Whitelisted Domains](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/domain-whitelisting) and add [Home URL](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/home-url) to get this example work.

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

This example shows how to make a Messenger bot with Chat Extensions.
You can edit `bottender.config.js` and use `bottender messenger profile set` command to do the setup.

For more information, check [Official Docs](https://developers.facebook.com/docs/messenger-platform/guides/chat-extensions) for Chat Extensions.

## Related examples

- [with-nextjs-webviews](../with-nextjs-webviews)
- [with-config](../with-config)
- [with-config-env](../with-config-env)
