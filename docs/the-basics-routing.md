---
id: the-basics-routing
title: Routing
---

The most basic Bottender routes accept a text and an action, providing a very simple and expressive method of defining routes:

```js
const { router, text } = require('bottender/router');

async function SayHi(context) {
  await context.sendText('Hi!');
}

async function SayHello(context) {
  await context.sendText('Hello!');
}

async function App() {
  return router([
    text('hi', SayHi), // return SayHi when receiving hi text message
    text('hello', SayHello), // return SayHello when receiving hello text message
  ]);
}
```

`router` accepts an array of routes and returns an action as return value, so it's possible to have nested routers or work with any pattern that compatible with actions.

It also can take an array of strings as first argument and will be matched when receiving one of them:

```js
async function App(context) {
  return router([
    // // return SayHi when receiving hi or hello or hey text message
    text(['hi', 'hello', 'hey'], SayHi),
  ]);
}
```

## Regular Expression Routes

If you are familiar [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions), it's a powerful way to extend your matching rule with JavaScript RegExp:

```js
async function App(context) {
  return router([
    // return SayHi when receiving case-insensitive hi or hello text message
    text(/^(hi|hello)$/i, SayHi),
  ]);
}
```

Sometimes you may want to add [named capture groups to your JavaScript RegExps](https://github.com/tc39/proposal-regexp-named-groups):

```js
async function App(context) {
  return router([
    // return Command when receiving /join, /invite, /whatever
    text(/^\/(?<command>\S+)$/i, Command),
  ]);
}
```

Then, you can access match groups result in your props:

```js
async function Command(
  context,
  {
    match: {
      groups: { command },
    },
  }
) {
  // | input     | command    |
  // | --------- | ---------- |
  // | /join     | `join`     |
  // | /invite   | `invite`   |
  // | /whatever | `whatever` |
  await context.sendText(`Executing command: ${command}`);
}
```

> Note: `RegExp Named Capturing Groups` is supported from Node 10.

## Fallback Routes

Using the `*` as first argument, you may define a route that will be matched when no other route matches the incoming event. Typically, unhandled events can be handled by sending a fallback message or the guide to using the bot.

```js
async function Unknown(context) {
  await context.sendText('Sorry. I do not understand what you say.');
}

async function App(context) {
  return router([
    text(/^(hi|hello)$/i, SayHi),
    // return Unknown when when no other route matches the incoming text message
    text('*', Unknown),
  ]);
}
```

If you want to fallback all events and not only text message events, you can use `route('*', ...)` instead:

```js
const { router, route, text } = require('bottender/router');

async function App(context) {
  return router([
    text(/^(hi|hello)$/i, SayHi),
    // return Unknown when when no other route matches the incoming event
    route('*', Unknown),
  ]);
}
```

> Note: The fallback route should always be the last route registered in your router.

<!--## Payload Routes-->
<!--## Custom Routes-->
