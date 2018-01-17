# Slack RTM

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/slack-rtm
cd slack-rtm
```

Install dependencies:

```
npm install
```

You must put `accessToken` into `index.js`.

After that, you can run the bot with this npm script:

```
npm run dev
```

This command will start a Slack bot.

## Idea of this example

This example is a simple bot running on [Slack](https://slack.com/) using [Real Time Messaging API](https://api.slack.com/rtm) to receive events instead of [Events API](https://api.slack.com/events-api) webhooks.
For more information, check our [Slack guides](https://bottender.js.org/docs/Platforms-Slack) and Slack official documentation of [comparison between RTM API and Events API](https://api.slack.com/faq#events_api).

## Related examples

* [slack-builder](../slack-builder)
* [slack-hello-world](../slack-hello-world)

