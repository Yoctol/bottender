---
title: Error Handling
date: "2017/10/13"
---

# Error Handling

## Introduction

When you develop a bot by Bottender, you can use the following approaches to handle error:
- [Try Catch](#try-catch)
- [onError](#onerror)

### Try Catch

Bottender leverages one of the JS features `async/await`. It means that you can use [`try...catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) to handle error.

Put the `try block` inside the handler function, and the error will be catched.

For example:

```js
bot.onEvent(async context => {
  try {
    await fetch('');
    await context.sendText('');
  } catch (err) {
    // handle errors here...
  }
});
```

## onError

Bottender also supports builder approaches to handle error. Use `builder.onError` and pass the error handler function. You can get the error at the second parameter in the handler function.

For example:

```js
// you can choose other supported handler accroding to the platform
const { MessengerHandler } = require('toolbot-core-experiment');

const handler = new MessengerHandler()
  .onEvent(async context => {
    throw new Error('An error happened!');
  })
  .onError(async (context, err) => {
    // handle errors here...
    await context.sendText(err.message);
  }); 

bot.onEvent(handler);
```

[Here](https://github.com/Yoctol/toolbot-core-experiment/tree/master/examples/messenger-builder) is the full example of Messenger builder.
