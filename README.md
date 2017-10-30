# bottender

[![npm](https://img.shields.io/npm/v/bottender.svg?style=flat-square)](https://www.npmjs.com/package/bottender)
[![Build Status](https://travis-ci.org/Yoctol/bottender.svg?branch=master)](https://travis-ci.org/Yoctol/bottender)
[![coverage](https://codecov.io/gh/Yoctol/bottender/branch/master/graph/badge.svg)](https://codecov.io/gh/Yoctol/bottender)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

- **Flexible** - Declare handlers as any JavaScript function.

- **Modern** - Source written with ES6/ES7 syntax and great async await supports.

- **Modular** - Use session stores, server framework adapters and platform connectors with same interface.

- **Learn Once, Write Anywhere** - Handle multiple platforms with unified development experience.

Bottender is built on top of [Messaging APIs](https://github.com/Yoctol/messaging-apis).

Supported platforms:

<img src="https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/R_1BAhxMP5I.png" alt="Messenger" width="100" /><img src="http://is5.mzstatic.com/image/thumb/Purple117/v4/01/c2/4d/01c24d99-4aae-71ea-24e2-d0b68f8c53d2/source/1200x630bb.jpg" alt="LINE" width="100" /><img src="https://cdn-images-1.medium.com/max/1200/1*TiKyhAN2gx4PpbOsiBhYcw.png" alt="Slack" width="100" /><img src="https://telegram.org/img/t_logo.png" alt="Telegram" width="90" />

## Documentation

You can find the Bottender documentation on the website.

- [Getting Started](https://yoctol.github.io/bottender-docs/docs/GettingStarted)
- [Guides](https://yoctol.github.io/bottender-docs/docs/GettingStarted) TODO
- [API Reference](https://yoctol.github.io/bottender-docs/docs/GettingStarted) TODO

## Examples

We have a bunch of examples in the [examples](../examples) folder. Here is the first one to get you started:

```js
const { ConsoleBot } = require('bottender');

const bot = new ConsoleBot();

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

bot.createRuntime();
```

This will create and run a bot which always reply "Hello World" in the console.

You'll notice that there is an async function to be passed to the `onEvent` method, we call it handler. You can put your bot logic in there.

## Installation

You can install Bottender globally to use the cli tools:

```sh
npm install -g bottender
```

Or install it locally to use it programmatically:

```sh
npm install bottender
```

## Contributing

TODO

## License

MIT © [Yoctol](https://github.com/Yoctol/bottender)
