---
id: version-0.15.17-error-handling
title: Error Handling
original_id: error-handling
---

When you develop a bot using Bottender, you can use the following approaches for error handling:

- [Try Catch](#try-catch)
- [onError](#onerror)

### Try Catch

Bottender leverages one of the JS features `async/await`. It means that you can use [`try...catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) to handle errors.

Put the `try block` inside the handler function, and the error will be caught.

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

## builder.onError

Bottender also supports builder approaches to handle errors. Use `builder.onError` and pass the error handler function. You will get the error at the second parameter in the handler function.

For example:

```js
// you can choose other supported handler accroding to the platform
const { MessengerHandler } = require('bottender');

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

[Here](https://github.com/Yoctol/bottender/tree/v0.15.x/examples/messenger-builder) is the full example of Messenger builder.
