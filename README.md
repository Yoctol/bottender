# bottender

[![npm](https://img.shields.io/npm/v/bottender.svg?style=flat-square)](https://www.npmjs.com/package/bottender)
[![CircleCI](https://circleci.com/gh/Yoctol/bottender.svg?style=shield)](https://circleci.com/gh/Yoctol/bottender)
[![coverage](https://codecov.io/gh/Yoctol/bottender/branch/master/graph/badge.svg)](https://codecov.io/gh/Yoctol/bottender)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![](https://user-images.githubusercontent.com/3382565/32216617-85cb703a-bdf3-11e7-9a0b-0e084b47c39e.png)

- **Flexible** - Declare handlers as any JavaScript function.

- **Modern** - Source written with ES6/ES7 syntax and great async await supports.

- **Modular** - Use session stores, server framework adapters and platform connectors with same interface.

- **Learn Once, Write Anywhere** - Handle multiple platforms with consistent development experience.

Bottender is built on top of [Messaging APIs](https://github.com/Yoctol/messaging-apis).

## Documentation

You can find the Bottender documentation on the website.

- [Getting Started](https://yoctol.github.io/bottender-docs/docs/GettingStarted)
- [Platforms](https://yoctol.github.io/bottender-docs/docs/Platforms-Messenger)
- [Guides](https://yoctol.github.io/bottender-docs/docs/Guides-Commands)
- [API Reference](https://yoctol.github.io/bottender-docs/docs/APIReference-Context)

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

Pull Requests and issue reports are welcome. You can follow steps below to submit your pull requests:  

Fork, then clone the repo:

```sh
git clone git@github.com:your-username/bottender.git
```

Install the dependencies:

```sh
cd bottender
yarn
```

Make sure the tests pass (including eslint, flow checks and jest tests):

```sh
yarn test
```

Make your changes and tests, and make sure the tests pass.

## License

MIT © [Yoctol](https://github.com/Yoctol/bottender)
