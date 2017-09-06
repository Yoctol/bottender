## Getting Started

### Install Package

Install `toolbot-core-experiment` package from registry:

```sh
npm i -g toolbot-core-experiment
```

### Initialize

```
bottender init
```

This command will create a folder with a `bot.js` within:

```js=
const { ConsoleBot } = require('toolbot-core-experiment');

const bot = new ConsoleBot();

bot.handle(context => {
  context.sendText('Hello World');
});

bot.createRuntime();
```

We can skip over this file and directly see the result of execution:

```sh
npm start
```

(show terminal gif)


### Echo Bot

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

And then restart the server.

(show terminal gif)

It works like a charm!
