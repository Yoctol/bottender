# Getting Started

## Install Package

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

bot.handle(context => {
  context.sendText('Hello World');
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
bot.handle(context => {
- context.sendText('Hello World');
+ const { event } = context;
+ if (event.isTextMessage) {
+   context.sendText(event.message.text);
+ }
});
```

And then the server will be restarted automatically.

(show terminal gif)

It works like a charm!


## Next Steps

Guides...[Understand User Intents](./Guides-Intent.md)
