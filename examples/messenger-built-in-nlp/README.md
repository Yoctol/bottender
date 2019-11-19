# Messenger Built-in NLP

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/messenger-built-in-nlp
cd messenger-built-in-nlp
```

Install dependencies:

```sh
npm install
```

You must put `accessToken`, `appSecret` and `verifyToken` into `bottender.config.js`.

Also, to enable built-in NLP, you should setup related settings following the official docs [Messenger Built-in NLP](https://developers.facebook.com/docs/messenger-platform/built-in-nlp/).

After that, you can run the bot with this npm script:

```sh
npm run dev
```

This command will start server for bot developing at `http://localhost:5000`.

If you successfully start the server, you will get a webhook url like `https://xxxxxxxx.ngrok.io/webhooks/messenger` from command line.

## Set webhook

While the server running, you can run following command with `bottender` to set up the webhook with the webhook url you get from running `npm run dev`:

```sh
npx bottender messenger webhook set -w <YOUR_WEBHOOK_URL>
```

> Note: You must put `appId`, `appSecret` and `verifyToken` into `bottender.config.js` before running this command.

## Idea of this example

This example is a simple bot running on [Messenger](https://www.messenger.com/) with `buit-in NLP` enabled.
For more information, check the official docs [Messenger Built-in NLP](https://developers.facebook.com/docs/messenger-platform/built-in-nlp/).

## Related examples

- [messenger-hello-world](../messenger-hello-world)
