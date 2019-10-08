---
id: version-0.15.17-console
title: Console
original_id: console
---

## Build Your First Console Bot

Import `ConsoleBot` from `bottender` package and create a bot instance:

```js
const { ConsoleBot } = require('bottender');

const bot = new ConsoleBot();
```

Then, define your handler function:

```js
bot.onEvent(async context => {
  if (context.event.isText) {
    await context.sendText('received text.');
  } else if (context.event.isPayload) {
    await context.sendText('received payload.');
  }
});
```

Call `createRuntime` to start the interactive mode:

```js
bot.createRuntime();
```

## Interaction

### Sending Text

Send text to the bot. For example:

```
> MY_TEXT
```

### Sending Payload

Send payload to the bot. For example:

```
> /payload THIS_IS_MY_COOL_PAYLOAD
```

## Fallback Unsupported Methods

`ConsoleBot` only has native support for `sendText`. After setting `fallbackMethods` to `true`, you can call any methods on the context and display all of the response as text:

```js
const bot = new ConsoleBot({
  fallbackMethods: true,
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
  await context.sendImage('https://example.com/vr.jpg');
  await context.sendButtonTemplate('What do you want to do next?', [
    {
      type: 'web_url',
      url: 'https://petersapparel.parseapp.com',
      title: 'Show Website',
    },
    {
      type: 'postback',
      title: 'Start Chatting',
      payload: 'USER_DEFINED_PAYLOAD',
    },
  ]);
});
```

It will get responses like below:

```
Bot > Hello World
Bot > sendImage: ["https://example.com/vr.jpg"]
Bot > sendButtonTemplate: ["What do you want to do next?",[{"type":"web_url","url":"https://petersapparel.parseapp.com","title":"Show Website"},{"type":"postback","title":"Start Chatting","payload":"USER_DEFINED_PAYLOAD"}]]
```

It's helpful when you want to test bots of any platforms on the console.

## Exit Runtime

To exit console runtime, just type `/exit` or `/quit` as message.

## References

- [console-hello-world](https://github.com/Yoctol/bottender/blob/master/examples/console-hello-world/index.js) example.
