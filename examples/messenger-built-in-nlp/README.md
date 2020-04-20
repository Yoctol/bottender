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

You must fill `APP_ID`, `APP_SECRET`, `PAGE_ID`, `ACCESS_TOKEN` and `VERIFY_TOKEN` in your `.env` file.

If you are not familiar with Messenger Bot, you may refer to Bottender's doc, [Messenger Setup](https://bottender.js.org/docs/channel-messenger-setup), to find detailed instructions.

Also, to enable built-in NLP, you should setup related settings following the official docs [Messenger Built-in NLP](https://developers.facebook.com/docs/messenger-platform/built-in-nlp/).

After that, you can run the bot with this npm script:

```sh
npm run dev
```

This command starts a server listening at `http://localhost:5000` for bot development.

If you successfully start the server, you get a webhook URL in the format of `https://xxxxxxxx.ngrok.io/webhooks/line` from your terminal.

## Set Webhook

While the server is running, you can run the following command with `bottender` to set up the webhook with the webhook URL you got from running `npm run dev`:

```sh
npx bottender messenger webhook set
```

> **Note:** You must fill `APP_ID`, `APP_SECRET` and `VERIFY_TOKEN` in your `.env` file before running this command.

## Idea of This Example

This example is a bot running on [Messenger](https://www.messenger.com/) with `buit-in NLP` enabled.
For more information, check the official docs [Messenger Built-in NLP](https://developers.facebook.com/docs/messenger-platform/built-in-nlp/).

## Related Examples

- [messenger-hello-world](../messenger-hello-world)
