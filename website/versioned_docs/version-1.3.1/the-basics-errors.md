---
id: version-1.3.1-the-basics-errors
title: Error Handling
original_id: the-basics-errors
---

## Customizing the Error Message

Bottender makes displaying custom error messages easy for various runtime errors. To customize the error messages sending to users, you can create an `_error.js` file in your project root:

```js
// _error.js

module.exports = async function HandleError(context, props) {
  console.error(props.error);
  // or you can choose not to reply any error messages
  await context.sendText(
    'There are some unexpected errors happened. Please try again later, sorry for the inconvenience.'
  );
  if (process.env.NODE_ENV === 'production') {
    // send your error to your error tracker, for example: Sentry
  }
  if (process.env.NODE_ENV === 'development') {
    await context.sendText(props.error.stack);
  }
};
```

The above example does the following things while an error triggered:

1. Send a "There are some unexpected errors happened. Please try again later, sorry for the inconvenience." text message to the end user.
2. Log the error to the console.
3. Log the error into your error tracker.
4. Send `error.stack` as a text message to the user (only in development)

> **Note:** While building LINE bots, you must handle errors differently because the reply token can only be used once. For more information, see [Error Handling in LINE](channel-line-errors.md).

## Sending Errors to Sentry

[Sentry](https://sentry.io) is an error tracking and monitoring service that aggregates errors across your stack in real time.

To integrate with Sentry, first, you need to download the SDK from the registry to use the SDK:

```sh
# Using npm
$ npm install @sentry/node

# Using yarn
$ yarn add @sentry/node
```

Then, add the following few lines of code in your `_error.js` file to send your runtime errors to Sentry:

```js
// _error.js
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
});

module.exports = async function HandleError(context, props) {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(props.error);
  }
};
```

> **Note:** Make sure to fill in your **[DSN (Data Source Name)](https://docs.sentry.io/error-reporting/quickstart/?platform=node)** to configure the Sentry instance.

When errors happen in production, those errors will be sent to Sentry automatically.
