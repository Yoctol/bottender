---
id: version-0.15.17-getting-started
title: Getting Started
original_id: getting-started
---

## Requirements

Bottender highly depends on [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) syntax, so you must make sure your runtime meets the following requirements:

- node >= 7.6

## Installing Bottender

To start using it, install `bottender` globally from the npm registry:

```sh
npm install -g bottender
```

Or install it by yarn:

```sh
yarn global add bottender
```

## Initialize

After installed, we can start to create a new bot with `bottender init` command:

![](https://user-images.githubusercontent.com/3382565/42831197-41b3f436-8a20-11e8-80a9-d2cd4895e0f5.png)

This will create a folder with a `bottender.config.js` file within:

```js
const { ConsoleBot } = require('bottender');

const bot = new ConsoleBot();

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

bot.createRuntime();
```

We can skip over this file and jump to see the result of the execution:

```sh
npm run dev
```

![](https://user-images.githubusercontent.com/3382565/42831198-41e68f86-8a20-11e8-8b22-3378c37c4ed4.png)

As you can see, we just got a bot that always replies "Hello World" in the console.

## Teach Bot to Echo

Open the file and edit the following lines of code:

```diff
bot.onEvent(async context => {
- await context.sendText('Hello World');
+ if (context.event.isText) {
+   await context.sendText(context.event.text);
+ }
});
```

And the server will be restarted automatically.

![](https://user-images.githubusercontent.com/3382565/42831200-4215364c-8a20-11e8-9e19-cd0709bc1b13.png)

That's it!

## Next Steps

You just created your first bot with Bottender! To dive deeper into bot development, you may want to determine the intents behind what the user says. For more information on intent understanding, [check out its documentation](Guides-Intents.md).
