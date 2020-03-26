---
id: version-1.3.1-the-basics-actions
title: Bottender Actions
original_id: the-basics-actions
---

**Bottender actions** are the smallest building blocks of Bottender apps. An action describes what you want your bot to do when receiving an event:

```js
async function SayHi(context) {
  await context.sendText('Hi!');
}
```

A typical action takes `context` as the first argument. The `context` variable provides the data in the conversation context and various methods to interact with the user. You can use those data and methods to build your actions. For example, you may create an `Echo` action to reply with the text it receives to the user using `context.sendText(context.event.text)`:

```js
async function Echo(context) {
  if (context.event.isText) {
    await context.sendText(context.event.text);
  }
}
```

> **Note:** The `context` variable provides methods differently among platforms. You can apply a progressive enhancement strategy using platform-specific methods.

## Composing Actions

Bottender actions are composable. Actions can refer to other actions as their return value.

For example, you may use the `SayHi` and `Unknown` action to create another `App` action:

```js
async function SayHi(context) {
  await context.sendText('Hi!');
}

async function Unknown(context) {
  await context.sendText('Sorry.');
}

async function App(context) {
  if (context.event.text == 'hi') {
    return SayHi;
  }
  return Unknown;
}
```

If the `App` action receives a "hi" text message, it replies with a "Hi!" text message. Otherwise, the `App` action replies with a "Sorry." text message.

> **Note:** New Bottender apps created by Create Bottender App have an `App` action as an entry point in the `src/index.js` file. However, if you are familiar with Bottender, you may rename the action or even use different structure instead.

## Passing Props to Actions

In the above examples, the actions only take one argument `context`. However, you can utilize the second argument - `props` to define your actions with flexibility in mind:

```js
async function SayHi(context, props) {
  await context.sendText(`Hi, ${props.name}.`);
}
```

Instead of returning the action directly without `props`, you can use the `withProps` function to provide an object as `props` for the action:

```js
const { withProps } = require('bottender');

async function App(context) {
  return withProps(SayHi, { name: 'Bob' });
}
```

Bottender provides `{ name: 'Bob' }` as `props` for the `SayHi` action, so your bot replies the "Hi, Bob." text message as a result to the user.

## How to Debug Actions

Bottender uses the famous [debug](https://www.npmjs.com/package/debug) package internally to collect some helpful information that can be showed up when you provide the corresponding `DEBUG` environment variable. To debug your actions, you may run your command with `DEBUG=bottender:action`, for example:

```sh
DEBUG=bottender:action npm start
```

> **Note:** If you are developing your bots on Windows, you may use the [cross-env](https://www.npmjs.com/package/cross-env) package to assign the `DEBUG` environment variable:

```sh
cross-env DEBUG=bottender:action npm start
```

Or you may put your `DEBUG` environment setting into your `.env` file:

```
DEBUG=bottender:action
```

![](https://user-images.githubusercontent.com/3382565/70204869-0dd9db00-175d-11ea-814f-140b3807f39d.gif)

We recommend that you always name your actions, so Bottender prints meaningful paths for you to debug instead of showing `Anonymous` as the action name.
