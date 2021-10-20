---
id: version-1.3.1-the-basics-routing
title: Routing
original_id: the-basics-routing
---

**Routing** is a pattern that helps you organize your [Bottender actions](the-basics-actions.md) in your Bottender app. For example, you can use the `router` function and the `text` function to create an action that handles "hi" and "hello" text message events with the different actions (`SayHi` and `SayHello`) as follows:

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
    // return the `SayHi` action when receiving "hi" text messages
    text('hi', SayHi),
    // return the `SayHello` action when receiving "hello" text messages
    text('hello', SayHello),
  ]);
}
```

> **Note:** The `router` function, the `text` function, and some other functions that we introduce below are coming from the `bottender/router` module. If you want to use them, make sure to import them from the `bottender/router` module correctly.

The `router` function takes an array of routes to create a router. The created router checks each route is matching the condition or not in the specified order and returns the provided action of the first matching route.

The first argument of the `text` function defines the matching rule, which could also be an array of strings. In the following example, when receiving "hi", "hello" or "hey" text messages, the router returns the `SayHi` action:

```js
async function App(context) {
  return router([
    // return the `SayHi` action when receiving "hi", "hello" or "hey" text messages
    text(['hi', 'hello', 'hey'], SayHi),
  ]);
}
```

## Regular Expression Routes

If you are familiar with [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions), you can use JavaScript `RegExp` to extend your matching rules as follows:

```js
async function App(context) {
  return router([
    // return the `SayHi` action when receiving case-insensitive "hi" or "hello" text messages
    text(/^(hi|hello)$/i, SayHi),
  ]);
}
```

By using the regular expression, your bot now handles "HI", "Hello" text messages as well.

Sometimes you may want to add [named capture groups to your JavaScript RegExps](https://github.com/tc39/proposal-regexp-named-groups):

```js
async function App(context) {
  return router([
    // return the `Command` action when receiving "/join", "/invite", or "/whatever" text messages
    text(/^\/(?<command>\S+)$/i, Command),
  ]);
}
```

Then, you can access the result of the match groups in your `props`:

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

By using the `*` as the first argument of the `text` function, you may define a route for the unhandled text message events. The route triggers whenever no other route matches the incoming text event. Meanwhile, handling unhandled text message events is a chance to guide your users by sending a fallback message or a user's manual. For example:

```js
async function Unknown(context) {
  await context.sendText('Sorry. I do not understand what you say.');
}

async function App(context) {
  return router([
    text(/^(hi|hello)$/i, SayHi),
    // return the `Unknown` action when when no other route matches the incoming text message
    text('*', Unknown),
  ]);
}
```

Besides all unhandled text message events, you can fallback all kind of events by using `route('*', ...)` instead:

```js
const { router, route, text } = require('bottender/router');

async function App(context) {
  return router([
    text(/^(hi|hello)$/i, SayHi),
    // return the `Unknown` action when no other route matches the incoming event
    route('*', Unknown),
  ]);
}
```

> **Note:** The fallback route must be the last route in your router.

## Payload Routes

Payload events typically happen when users send payload data by clicking buttons, selecting menus, or clicking keyboards. For example, you may catch `GET_STARTED` payload that sends by clicking the button and respond with the `SayHi` action:

```js
const { router, payload } = require('bottender/router');

async function App(context) {
  return router([
    payload('GET_STARTED', SayHi),
    // return the `Unknown` action when no other route matches the incoming event
    route('*', Unknown),
  ]);
}
```

## Custom Routes

If you prefer to use your route predicate, you may use the `route` function to create your route wrapper. The `route` function takes a function that returns a boolean as the first argument:

```js
const { router, route } = require('bottender/router');

function sayHiTo(name, Action) {
  return route(context => context.event.text === `Hi ${name}`, Action);
}

async function App(context) {
  return router([
    sayHiTo('Bottender', SayHi),
    // return the `Unknown` action when no other route matches the incoming event
    route('*', Unknown),
  ]);
}
```

In the above example, the custom route matches the "Hi Bottender" text messages and returns the `SayHi` action.

## Platform Specific Routes

Bottender includes a bunch of helpers to route within your multi-platform app. To learn more about the details of those specific routes, check out their documentation accordingly:

- [Messenger Routes](channel-messenger-routing.md)
- [WhatsApp Routes](channel-whatsapp-routing.md)
- [LINE Routes](channel-line-routing.md)
- [Slack Routes](channel-slack-routing.md)
- [Telegram Routes](channel-telegram-routing.md)
- [Viber Routes](channel-viber-routing.md)
