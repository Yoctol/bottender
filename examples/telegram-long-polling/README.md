# Telegram long polling

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/telegram-long-polling
cd telegram-long-polling
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

This command will start server for bot developing at `http://localhost:5000`.

## Idea of this example

This example is a simple bot running on [Telegram](https://telegram.org/) using [getUpdates](https://core.telegram.org/bots/api#getupdates) API (long polling).
For more information, check our [Telegram guides](https://bottender.js.org/docs/Platforms-Telegram).

## Related examples

- [telegram-hello-world](../telegram-hello-world)
