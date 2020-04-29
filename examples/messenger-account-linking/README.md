# Messenger Account Linking

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/messenger-account-linking
cd messenger-account-linking
```

Install dependencies:

```sh
npm install
```

You must fill the following variables in your `.env` file:

- `SERVER_ORIGIN`
- `MESSENGER_PAGE_ID`
- `MESSENGER_ACCESS_TOKEN`
- `MESSENGER_APP_ID`
- `MESSENGER_APP_SECRET`
- `MESSENGER_VERIFY_TOKEN`

After that, you can run the bot with this npm script:

```sh
npm run dev
```

This command starts a server listening at `http://localhost:5000` for bot development.

To set up ngrok for your server, run:

```sh
npx ngrok http 5000
```

If you successfully set up ngrok, you get a webhook URL in the format of `https://xxxxxxxx.ngrok.io/webhooks/messenger` from your terminal.

## Set Webhook

While the server is running, you can run the following command with `bottender` to set up the webhook with the webhook URL you got from running `npm run dev`:

```sh
npx bottender messenger webhook set
```

> **Note:** You must fill in your `.env` file before running this command.

## Screenshots

![](https://user-images.githubusercontent.com/3382565/77674259-39135f00-6fc6-11ea-8170-57aef3437743.png)

## Idea of This Example

This is a account linking example rewritten from [fbsamples/messenger-bot-samples](https://github.com/fbsamples/messenger-bot-samples/tree/master/account-linking) to show how to implement account linking with Bottender.

## Related Examples

- [messenger-hello-world](../messenger-hello-world)
- [custom-server-express](../custom-server-express)
