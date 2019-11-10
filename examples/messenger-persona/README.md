# Messenger persona

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/messenger-persona
cd messenger-persona
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

If you successfully start the server, you will get a webhook url like `https://xxxxxxxx.ngrok.io/webhooks/messenger` from command line.

> Note: You must set `PERSONA_1` and `PERSONA_2` env variables pairs before running this command. You can create them using `bottender messenger persona create`.

## Set webhook

While the server running, you can run following command with global `bottender` to set up the webhook with the webhook url you get from running `npm run dev`:

```
bottender messenger webhook set -w <YOUR_WEBHOOK_URL>
```

> Note: You must put `appId`, `appSecret` and `verifyToken` into `bottender.config.js` before running this command.

## Idea of this example

This example is a simple bot running on [Messenger](https://www.messenger.com/) to demonstrate how to use persona API.

To set persona for the whole context, use `context.usePersona`:

```js
context.usePersona('<PERSONA_ID>');
await context.sendText('hi');
```

Or you can specify different persona for each actions:

```js
await context.sendText('hi', { persona_id: '<PERSONA_ID_1>' });
await context.sendText('hi', { persona_id: '<PERSONA_ID_2>' });
```

For more information, check our [Messenger guides](https://bottender.js.org/docs/Platforms-Messenger).

## Related examples

- [messenger-hello-world](../messenger-hello-world)
