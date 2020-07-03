# Slack Home Tab

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/slack-home-tab
cd slack-home-tab
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

## Slack App Settings

To enable the home tab, go to [Slack Developer Console](https://api.slack.com/apps) / [YourApp] / App Home / Show Tabs, and enable the home tab.

## Set Webhook

To set the webhook, go to [Slack Developer Console](https://api.slack.com/apps) / [YourApp] / Event Subscriptions and [Slack Developer Console](https://api.slack.com/apps) / [YourApp] / Interactivity & Shortcuts, and use the webhook URL you got from running `npm run dev` to edit Request URLs for your bot.

You must subscribed the `app_home_opened` event.

## Idea of This Example

This example is a bot running on [Slack](https://slack.com/).

This example contains the following topics:

- How to use home tab.
- How to update home tab view.

For more information, check our [Slack guides](https://bottender.js.org/docs/en/channel-slack-block-kit).

## Related Examples

- [slack-modal-update](../slack-modal-update)
- [slack-modal-push](../slack-modal-push)
- [slack-modal-form](../slack-modal-form)
- [slack-modal-on-home](../slack-modal-on-home)
