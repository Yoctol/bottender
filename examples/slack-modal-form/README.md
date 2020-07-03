# Slack Modal Form

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/slack-modal-form
cd slack-modal-form
```

Install dependencies:

```sh
npm install
```

You must fill `SLACK_ACCESS_TOKEN` and `SLACK_SIGNING_SECRET` in your `.env` file.

If you are not familiar with Slack Bot, you may refer to Bottender's doc, [Slack Setup](https://bottender.js.org/docs/channel-slack-setup), to find detailed instructions.

After that, you can run the bot with this npm script:

```sh
npm run dev
```

This command starts a server listening at `http://localhost:5000` for bot development.

If you successfully start the server, you get a webhook URL in the format of `https://xxxxxxxx.ngrok.io/webhooks/slack` from your terminal.

## Set Webhook

To set the webhook, go to [Slack Developer Console](https://api.slack.com/apps) / [YourApp] / Event Subscriptions and [Slack Developer Console](https://api.slack.com/apps) / [YourApp] / Interactivity & Shortcuts, and use the webhook URL you got from running `npm run dev` to edit Request URLs for your bot.

## Idea of This Example

This example is a bot running on [Slack](https://slack.com/).

This example contains the following topics:

- How to use modal as a form.

For more information, check our [Slack guides](https://bottender.js.org/docs/en/channel-slack-block-kit).

## Related Examples

- [slack-home-tab](../slack-home-tab)
- [slack-modal-update](../slack-modal-update)
- [slack-modal-push](../slack-modal-push)
- [slack-modal-on-home](../slack-modal-on-home)
