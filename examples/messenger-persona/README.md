# Messenger Persona

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/messenger-persona
cd messenger-persona
```

Install dependencies:

```sh
npm install
```

You have to put `appId`, `appSecret`, `pageId`, `accessToken` and `verifyToken` into `bottender.config.js`.

If you are not familiar with Messenger Bot, you may refer to Bottender's doc, [Setup Messenger](https://bottender.js.org/docs/channel-messenger-setup), to find detailed instructions.

After that, you can run the bot with this npm script:

```sh
npm run dev
```

This command will start server for bot developing at `http://localhost:5000`.

If you successfully start the server, you will get a webhook URL like `https://xxxxxxxx.ngrok.io/webhooks/messenger` from command line.

> Note: You must set `PERSONA_1` and `PERSONA_2` env variables pairs before running this command. You can create them using `npx bottender messenger persona create --name <name> --pic <url>`.

## Set Webhook

While the server running, you can run following command with `bottender` to set up the webhook with the webhook URL you get from running `npm run dev`:

```sh
npx bottender messenger webhook set -w <YOUR_WEBHOOK_URL>
```

> Note: You must put `appId`, `appSecret` and `verifyToken` into `bottender.config.js` before running this command.

## Idea of this Example

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

For more information, check our [Messenger guides](https://bottender.js.org/docs/channel-messenger-setup).

## Related Examples

- [messenger-hello-world](../messenger-hello-world)
