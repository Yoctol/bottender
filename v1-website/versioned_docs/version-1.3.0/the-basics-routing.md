---
id: version-1.3.0-the-basics-routing
title: Routing
original_id: the-basics-routing
---

`Routing` is a handy design pattern to help you organize bot actions.

The most basic Bottender `Route` is composed of a text and an action, providing a straightforward and expressive definition:

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

`Router` is consists of an array of `Routes`. It returns the action of the first matched route. It is possible to have nested routers or any pattern that compatible with actions.

The first argument of route defines the matching rule, which could be an array of strings. The action of the route will be returned when one of the strings is matched:

```js
async function App(context) {
  return router([
    // // return SayHi when receiving hi or hello or hey text message
    text(['hi', 'hello', 'hey'], SayHi),
  ]);
}
```

## Regular Expression Routes

If you are familiar with [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions), it's a powerful way to extend your matching rules with JavaScript RegExp:

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
  // | input | command |
  // | --------- | ---------- |
  // | /join | `join` |
  // | /invite | `invite` |
  // | /whatever | `whatever` |
  await context.sendText(`Executing command: ${command}`);
}
```

> **Note:** `RegExp Named Capturing Groups` is supported by Node 10+.

## Fallback Routes

By using the `*` as the first argument, you may define a route for unhandled events, which triggers whenever no other routes match the incoming event. Meanwhile, reply to unhandled events is a chance to introduce bot features by sending a fallback message or a user's manual.

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

Besides all unhandled text message events, you can fallback all events by `route('*', ...)` instead:

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

> **Note:** The fallback route must be the final route in your router.

## Payload Routes

Payload events typically happen when users send payload data by clicking buttons, selecting menus, or clicking keyboards. For example, you may catch `GET_STARTED` payload that send by button click and respond with `SayHi` action:

```js
const { router, payload } = require('bottender/router');

async function App(context) {
  return router([
    payload('GET_STARTED', SayHi),
    // return Unknown when when no other route matches the incoming event
    route('*', Unknown),
  ]);
}
```

## Custom Routes

If you wish to use your route predicate, you may use the `route` to create your route wrapper.

```js
const { router, route } = require('bottender/router');

function sayHiTo(name, Action) {
  return route(context => context.event.text === `Hi ${name}`, Action);
}

async function App(context) {
  return router([
    sayHiTo('Bottender', SayHi),
    // return Unknown when when no other route matches the incoming event
    route('*', Unknown),
  ]);
}
```

In the above example, the custom route matches `Hi Bottender` text message and resolve `SayHi` action.

## Platform Specific Routes

Bottender includes a bunch of helpers to route within your multi-platform application. To learn more about the details of those specific routes, check out their documentation:

- [Messenger Routes](channel-messenger-routing.md)
- [WhatsApp Routes](channel-whatsapp-routing.md)
- [LINE Routes](channel-line-routing.md)
- [Slack Routes](channel-slack-routing.md)
- [Telegram Routes](channel-telegram-routing.md)
- [Viber Routes](channel-viber-routing.md)
