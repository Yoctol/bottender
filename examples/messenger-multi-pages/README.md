# Messenger Multi-Pages Example

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/messenger-multi-pages
cd messenger-multi-pages
```

Install dependencies:

```sh
npm install
```

You must fill the following variables in your `.env` file:

- `MESSENGER_ACCESS_TOKEN`
- `MESSENGER_APP_ID`
- `MESSENGER_APP_SECRET`
- `MESSENGER_VERIFY_TOKEN`
- `PAGE_1_PAGE_ID`
- `PAGE_1_ACCESS_TOKEN`
- `PAGE_2_PAGE_ID`
- `PAGE_2_ACCESS_TOKEN`

If you are not familiar with Messenger Bot, you may refer to Bottender's doc, [Messenger Setup](https://bottender.js.org/docs/channel-messenger-setup), to find detailed instructions.

> **Note:** `Page Subscriptions Fields` take effect for the 1st Facebook Page when you run the below `Set Webhook` script. However, in this example, you might have multiple Pages. Please double check your `Page Subscriptions Fields` for each Page. We recommend you at least enable the following fields:
>
> - `messages`
> - `messaging_postbacks`
> - `messaging_optins`
> - `messaging_referrals`
> - `messaging_policy_enforcement`

After that, you can run the bot with this npm script:

```sh
npm run dev
```

This command starts server for bot developing at `http://localhost:5000`.

If you successfully start the server, you can get a webhook URL like `https://xxxxxxxx.ngrok.io/webhooks/messenger` from command line.

## Set Webhook

While the server is running, you can run the following command with `bottender` to set up the webhook with the webhook URL you got from running `npm run dev`:

```sh
npx bottender messenger webhook set
```

> Note: You must put `appId`, `appSecret`, `pageId`, `accessToken` and `verifyToken` into `bottender.config.js` before running this command.

## Idea of This Example

This example shows how to make a single Facebook app to serve multiple Facebook Pages. For more information, check our [Messenger guides](https://bottender.js.org/docs/channel-messenger-setup).

## Related Examples

- [messenger-hello-world](../messenger-hello-world)
- [messenger-batch-multi-pages](../messenger-batch-multi-pages)
