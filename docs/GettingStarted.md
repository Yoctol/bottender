# Getting Started

## Requirements

Bottender highly depends on [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), so you must make sure your runtime meets the following requirements:

- node >= 7.6

## Installing Bottender

Install `toolbot-core-experiment` package from the registry:

```sh
npm install -g toolbot-core-experiment
```

or

```sh
yarn global add toolbot-core-experiment
```


## Initialize

```
bottender init
```

This command will create a folder with a `bot.js` file within:

```js
const { ConsoleBot } = require('toolbot-core-experiment');

const bot = new ConsoleBot();

bot.handle(async context => {
  await context.sendText('Hello World');
});

bot.createRuntime();
```

We can skip over this file and directly see the result of the execution:

```sh
npm run dev
```

(show terminal gif)


## Teach Bot to Echo

Open the file and edit the follow lines of code:

```diff
bot.handle(async context => {
- await context.sendText('Hello World');
+ const { event } = context;
+ if (event.isTextMessage) {
+   await context.sendText(event.message.text);
+ }
});
```

And then the server will be restarted automatically.

(show terminal gif)

It works like a charm!


## Next Steps

You just created your first bot with bottender! To dive deeper into bot development, you may want to determine the intents behind the user saying. For more information on intent understanding, [check out its documentation](./Guides-Intents.md).
