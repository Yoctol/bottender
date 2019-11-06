# Slack hello world

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/slack-hello-world
cd slack-hello-world
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

This example is a simple bot running on [Slack](https://slack.com/).
For more information, check our [Slack guides](https://bottender.js.org/docs/Platforms-Slack).

## Related examples

- [messenger-hello-world](../messenger-hello-world)
- [slack-hello-world](../slack-hello-world)
- [telegram-hello-world](../telegram-hello-world)
- [viber-hello-world](../viber-hello-world)
