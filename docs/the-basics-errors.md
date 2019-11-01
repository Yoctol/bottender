---
id: the-basics-errors
title: Error Handling
---

## Customizing the Error Message

Bottender makes it easy to display custom error message for various runtime errors. To customize the error message sending to the user, you may create an `_error.js` file in your project root:

```js
// _error.js

module.exports = async function HandleError(context, props) {
  await context.sendText(
    'There are some unexpected errors happened. Please try again later, sorry for the inconvenience.'
  );
  console.error(props.error);
  if (process.env.NODE_ENV === 'production') {
    // send your error to the error tracker, for example: Sentry
  }
  if (process.env.NODE_ENV === 'development') {
    await context.sendText(props.error.stack);
  }
};
```

The example code above will do following things for you while an error occurred:

1. Send `There are some unexpected errors happened. Please try again later, sorry for the inconvenience.` text message to the end user.
2. Log error to the console.
3. Log error into error tracker.
4. Send `error.stack` as text message to the user (only in the development)

## Sending Errors to Sentry

[Sentry](https://sentry.io) is an error tracking and monitoring tool that aggregates errors across your stack in real time.

To integrate with it, first, you need to download the sdk from registry to use it:

```sh
# Using npm
$ npm install @sentry/node

# Using yarn
$ yarn add @sentry/node
```

Then, add those few lines of code in your `_error.js` to send your runtime errors to Sentry. Make sure that you fill in you [DSN (Data Source Name)](https://docs.sentry.io/error-reporting/quickstart/?platform=node) to configure the Sentry instance:

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

When errors happen in production, those errors will be sent to Sentry automatically.
