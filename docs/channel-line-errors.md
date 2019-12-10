---
id: channel-line-errors
title: Error Handling in LINE
---

## Customizing the Error Message in Different Environments Using Reply/Push

reply, push

```js
// _error.js

module.exports = async function HandleError(context, props) {
  console.error(props.error);
  if (process.env.NODE_ENV === 'development') {
    await context.pushText('There are some unexpected errors happened. Please try again later, sorry for the inconvenience.');
    await context.pushText(props.error.stack);
  } else if (!context.isReplied) {
    await context.replyText('There are some unexpected errors happened. Please try again later, sorry for the inconvenience.'
  }
  if (process.env.NODE_ENV === 'production') {
    // send your error to the error tracker, for example: Sentry
  }
};
```

[](the-basics-errors.md)
