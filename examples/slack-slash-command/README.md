# Slack Slash Command

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/slack-slash-command
cd slack-slash-command
```

Install dependencies:

```sh
npm install
```

You have to put `accessToken` and `verificationToken` into `bottender.config.js`.

If you are not familiar with Slack Bot, you may refer to Bottender's doc, [Slack Setup](https://bottender.js.org/docs/channel-slack-setup), to find detailed instructions.

After that, you can run the bot with this npm script:

```sh
npm run dev
```

This command will start server for bot developing at `http://localhost:5000`.

If you successfully start the server, you will get a webhook URL like `https://xxxxxxxx.ngrok.io/webhooks/slack` from command line.

## Set Webhook

To set the webhook, go to [Slack Developer Console](https://api.slack.com/apps) / [YourApp] / Event Subscriptions, and use the webhook URL you get from running `npm run dev` to edit Request URL for your bot.

## Idea of This Example

This example is a simple bot running on [Slack](https://slack.com/).
For more information, check our [Slack guides](https://bottender.js.org/docs/channel-slack-setup).

## Related Examples

- [slack-hello-world](../slack-hello-world)
