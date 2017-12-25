# Telegram long polling

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/telegram-long-polling
cd telegram-long-polling
npm install
npm run dev
```

## Idea of this example

This example is a simple bot running on [Telegram](https://telegram.org/) using [getUpdates](https://core.telegram.org/bots/api#getupdates) API (long polling). You
have to get `accessToken` before running this bot.\
For more information, check our [Telegram guides](https://bottender.js.org/docs/Platforms-Telegram).

## Related examples

* [telegram-hello-world](../telegram-hello-world)
