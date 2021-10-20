---
id: channel-line-errors
title: Error Handling in LINE
original_id: channel-line-errors
---

## Customizing the Error Message in Different Environments Using Reply/Push

In development and production environments, you may choose different approaches for sending error messages, since LINE `Reply API` and `Push API` have fundamental differences.

- `Push API` allows developers to send messages directly to users anytime. However, it is only free when your bot is in the development environment. In the production environment, you may refer to [LINE Official Account Subscription Plans](https://www.linebiz.com/id-en/service/line-account-connect/) to check out the message fee.

- `Reply API` is free. But bots can only reply with a message to a user who interacts with your LINE official account.

When it comes to error handling in the development environment, you can benefit from the free `Push API` to send error messages. But in the production environment, if your bot is still available to reply, you can choose to respond to your user an error message.

```js
// _error.js

module.exports = async function HandleError(context, props) {
 console.error(props.error);
 if (process.env.NODE_ENV === 'development') {
 await context.pushText('There are some unexpected errors happened. Please try again later, sorry for the inconvenience.');
 await context.pushText(props.error.stack);
 } else if (!context.isReplied) {
 // or you can choose not to reply any error messages
 await context.replyText('There are some unexpected errors happened. Please try again later, sorry for the inconvenience.'
 }
 if (process.env.NODE_ENV === 'production') {
 // send your error to the error tracker, for example: Sentry
 }
};
```

For more information, you may refer to [Customizing the Error Message](the-basics-errors.md) for the basic knowledge of error handling.
