---
id: the-basics-errors
title: Error Handling
---

## Customizing the Error Message

To customize the error message sending to the user, you may create an `_error.js` file in your project root:

```js
// _error.js

module.exports = async function HandleError(context, props) {
  await context.sendText(
    'There are some unexpected errors happened. Please try again later, sorry for the inconvenience.'
  );
  if (process.env.NODE_ENV === 'production') {
    // send your error to the error tracker, for example: Sentry
  }
  if (process.env.NODE_ENV === 'development') {
    await context.sendText(props.error.stack);
  }
  console.error(props.error);
};
```

The example code above will do following things for you while an error occurred:

1. Send `There are some unexpected errors happened. Please try again later, sorry for the inconvenience.` text message to the end user.
2. Log error into error tracker
3. Send `error.stack` as text message to the user (only in the development)
4. Log error to the console
