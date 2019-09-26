# Slack interactive message

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/slack-interactive-message
cd slack-interactive-message
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

This example shows how to send [messages with interactive components (button/menu)](https://api.slack.com/interactive-messages) and handle the event triggered by users clicking the button/menu.

For more information, check our [Slack guides](https://bottender.js.org/docs/Platforms-Slack).

## Usage

To receive interactive message requests, you need to setup **Interactive Components** in your Slack app with the same URL as **Event Subscriptions** URL.

After that, type 'heyo' to the bot and it will respond you with buttons and menu. Then click them to see what happens!

![default](https://user-images.githubusercontent.com/1003146/33164927-e2ec8da6-d06f-11e7-9378-e8a3e9b37257.png)

## Related examples

- [slack-builder](../slack-builder)
- [slack-hello-world](../slack-hello-world)
