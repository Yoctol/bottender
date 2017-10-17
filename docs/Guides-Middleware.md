---
title: Middleware
date: "2017-10-11"
---

# Middleware

Compose handlers.
Sometime you may like to use multiple handlers to handle one event, so you can reuse each of them on different situation. We provide `middleware` method which enable you composing multiple handlers in a functional style.
> Middleware are simple functions which return a MiddlewareFunction with signature (ctx, next). When the middleware is run, it must manually invoke next() to run the "downstream" middleware.
>
> -- <cite>koa</cite>

## API
### middleware([handler1, handler2, ...])
Compose the given handlers as a middleware and return a composed handler.

Handlers are an array of functions with args like below:
```js
/**
 * @param {Object} context - A context can use all methods in client (see {@link
 *     https://github.com/Yoctol/messaging-apis}|messaging-apis}) and sessions.
 * @param {Function} next - call `next()` to pass control to the next handler.
 */
function handler(context, next) { /* ... */ }
```
## Example

```js
const { middleware } = require('toolbot-core-experiment');

...

const composedHandler = middleware([
  function handler1(context, next) { /* ... */ },
  function handler2(context, next) { /* ... */ },
  ...,
]);

bot.onEvent(composedHandlers);

...
```

Each event came from bot will be handled by function handler1.

Call `next()` in function handler1 and it will go to function handler2.

more [example](https://github.com/Yoctol/toolbot-core-experiment/tree/master/examples/middleware) for middleware.
