# Slack builder

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/slack-builder
cd slack-builder
```

Install dependencies:

```
npm install
```

You must put `accessToken` and `verificationToken` into `index.js`.

After that, you can run the bot with this npm script:

```
npm run dev
```

This command will start server for bot developing at `http://localhost:5000`.

## Idea of this example

This example shows how to combine
[`Handler`](https://bottender.js.org/docs/APIReference-Handler) with
[Slack](https://slack.com/) bot.
For more information, check our [Slack guides](https://bottender.js.org/docs/Platforms-Slack).

## Related examples

* [slack-hello-world](../slack-hello-world)
* [messenger-builder](../messenger-builder)
* [line-builder](../line-builder)
* [telegram-builder](../telegram-builder)
* [viber-builder](../viber-builder)
