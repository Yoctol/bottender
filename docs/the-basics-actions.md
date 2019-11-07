---
id: the-basics-actions
title: Resolving Actions
---

Actions are the smallest building blocks of Bottender apps. An action describes what you want to respond according to the conversation context.

To define an action, just write a JavaScript function or async function:

```js
async function SayHi(context) {
  await context.sendText('Hi!');
}
```

Actions typically accept `context` as first argument. There are a bunch of stuff in the conversation context, and you can use them to construct your actions. For instance, you may use `context.sendText()` to send a text to the user from the bot.

## Composing Actions

Actions can refer to other actions as their return value. This lets us use the same action abstraction for any level of detail.

For example, you may create an `App` action that says `Hi!` back when it receives `hi` and says sorry for anything else:

```js
async function SayHi(context) {
  await context.sendText('Hi!');
}

async function Unknown(context) {
  await context.sendText('Sorry. I do not understand what you say.');
}

async function App(context) {
  if (context.event.text == 'hi') {
    return SayHi;
  }
  return Unknown;
}
```

> **Note:** New Bottender apps created by Create Bottender App have a single `App` action as entry point in `src/index.js`. However, if you are very familiar with Bottender, you can rename the action or even use different structure instead.

## Passing Props to Actions

Previously, you only saw Bottender actions that accept one argument - `context`:

```js
async function SayHi(context) {
  await context.sendText('Hi!');
}
```

However, you can access the second argument - `props` to define actions with flexibility in mind:

```js
async function SayHi(context, props) {
  await context.sendText(`Hi, ${props.name}.`);
}
```

Instead of returning the action directly without `props`, you can use `withProps` to pass a single object as `props` to the action:

```js
const { withProps } = require('bottender');

async function App(context) {
  return withProps(SayHi, { name: 'Bob' });
}
```

Bottender will call the `SayHi` action with `{ name: 'Bob' }` as the `props` and send `Hi, Bob.` text message as result to the user.

## How to Debug

Bottender use famous [debug](https://www.npmjs.com/package/debug) package internally to collect some helpful information that can be showed up when you provide corresponding `DEBUG` environment variable. To debug your actions, you may run your command with `DEBUG=bottender:dialog`, for example:

```sh
DEBUG=bottender:dialog npm start
```

> **Note:** If you are developing your bots on Windows, you may use [cross-env](https://www.npmjs.com/package/cross-env) to assign `DEBUG` environment variable:

```sh
cross-env DEBUG=bottender:dialog npm start
```

Or you may put your `DEBUG` environment setting into your `.env` file:

```
DEBUG=bottender:dialog
```

![](https://user-images.githubusercontent.com/3382565/67746734-0cccd400-fa62-11e9-9318-3517a983eb64.png)

We recommend that you should always name your actions, so it will print meaningful paths for you to debug instead of showing `Anonymous` as action name.
