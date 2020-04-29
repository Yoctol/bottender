# Messenger Batch Multi-Pages Example

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/messenger-batch-multi-pages
cd messenger-batch-multi-pages
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

After that, you can run the bot with this npm script:

```sh
npm run dev
```

This command starts a server listening at `http://localhost:5000` for bot development.

If you successfully start the server, you get a webhook URL in the format of `https://xxxxxxxx.ngrok.io/webhooks/messenger` from your terminal.

## Set Webhook

While the server is running, you can run the following command with `bottender` to set up the webhook with the webhook URL you got from running `npm run dev`:

```sh
npx bottender messenger webhook set
```

> **Note:** You must fill in your `.env` file before running this command.

## Idea of This Example

This example is a bot running on [Messenger](https://www.messenger.com/) to reply separately by different page.\
For more information, check our [Messenger guides](https://bottender.js.org/docs/channel-messenger-setup).

## Related Examples

- [messenger-batch](../messenger-batch)
- [messenger-multi-pages](../messenger-multi-pages)
