# Messenger attachment upload

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/messenger-attachment-upload
cd messenger-attachment-upload
```

Install dependencies:

```
npm install
```

You must put `accessToken`, `appSecret` and `verifyToken` into `bottender.config.js`.

To upload attachment, run following command with global `bottender`:

```
bottender messenger attachment upload
```

> Note: Will auto create a bottender-lock.json file.

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

This example shows how to use CLI tool which support messenger attachments uploading. And then use util function to get the right attachmentId for bot using.

## Related examples

- [with-config](../with-config)
- [console-hello-world](../console-hello-world)
- [line-hello-world](../line-hello-world)
- [slack-hello-world](../slack-hello-world)
- [telegram-hello-world](../telegram-hello-world)
