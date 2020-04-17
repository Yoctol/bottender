---
id: version-1.4-channel-line-errors
title: Error Handling in LINE
original_id: channel-line-errors
---

## Customizing the Error Message in LINE

Your bot can only reply to the user once after a user interacts with your LINE official account. However, the error may happen when calling Reply API. So, you can check the value of `context.isReplied` before replying to the user in your error handler:

```js
// _error.js

module.exports = async function HandleError(context, props) {
  console.error(props.error);
  if (!context.isReplied) {
    // or you can choose not to reply any error messages
    await context.replyText(
      'There are some unexpected errors happened. Please try again later, sorry for the inconvenience.'
    );
  }
  if (process.env.NODE_ENV === 'production') {
    // send your error to the error tracker, for example: Sentry
  }
};
```

For more information, you may refer to [Customizing the Error Message](the-basics-errors.md) for the basic knowledge of error handling.
