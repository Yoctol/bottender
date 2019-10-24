---
id: the-basics-errors
title: Error Handling
---

## Customizing the Error Message

To customize the error message sending to the user, you may create an `_error.js` file in your project root:

```js
// _error.js

module.exports = async function HandleError(context, { error }) {
  await context.sendText(
    'There are some unexpected errors happened. Please try again later, sorry for the inconvenience.'
  );
  if (process.env.NODE_ENV === 'production') {
    // send your error to the error tracker, for example: Sentry
  }
  if (process.env.NODE_ENV === 'development') {
    await context.sendText(error.stack);
  }
  console.error(error);
};
```

According to the code in the above example, it will do following things for you:

1. Send `There are some unexpected errors happened. Please try again later, sorry for the inconvenience.` text message to the end user.
2. Log error into error tracker
3. Send `error.stack` as text message to the user when developing the app.
4. Log error to the console
