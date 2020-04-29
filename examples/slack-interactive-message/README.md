# Slack Interactive Message

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/slack-interactive-message
cd slack-interactive-message
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

To set the webhook, go to [Slack Developer Console](https://api.slack.com/apps) / [YourApp] / Event Subscriptions, and use the webhook URL you got from running `npm run dev` to edit Request URL for your bot.

## Idea of This Example

This example shows how to send [messages with interactive components (button/menu)](https://api.slack.com/interactive-messages) and handle the event triggered by users clicking the button/menu.

For more information, check our [Slack guides](https://bottender.js.org/docs/channel-slack-setup).

## Usage

To receive interactive message requests, you need to set up **Interactive Components** in your Slack app with the same URL as **Event Subscriptions** URL.

After that, type 'heyo' to the bot and it will respond you with buttons and menu. Then click them to see what happens!

![default](https://user-images.githubusercontent.com/1003146/33164927-e2ec8da6-d06f-11e7-9378-e8a3e9b37257.png)

## Related Examples

- [slack-hello-world](../slack-hello-world)
- [slack-slash-command](../slack-slash-command)
