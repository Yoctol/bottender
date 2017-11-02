# Echo Bot

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/echo-bot
cd echo-bot
npm install
npm run dev
```

## Idea of this example

This is a simple console bot which will echo what you said and shows how to distinguish what kind of message the bot has received. The easiest way is to use `context.event.isXXXXX`. It helps your bot recognize incoming requests.   
Check our [event guide](https://bottender.js.org/docs/APIReference-Event/) for more information.

## Related examples

- [console-hello-world](../console-hello-world)
