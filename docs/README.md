# bottender

[![Build Status](https://travis-ci.org/Yoctol/bottender.svg?branch=master)](https://travis-ci.org/Yoctol/bottender)
[![coverage](https://codecov.io/gh/Yoctol/bottender/branch/master/graph/badge.svg)](https://codecov.io/gh/Yoctol/bottender)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

- Flexible
- Modern: ES6、async await
- Modular
- Learn Once, Write Anywhere

## Examples

```js
const { ConsoleBot } = require('toolbot-core-experiment');

const bot = new ConsoleBot();

bot.onEvent(context => {
  context.sendText('Hello World');
});

bot.createRuntime();
```

See more in [examples](../) folder.

## Installation

```sh
npm install -g toolbot-core-experiment
```

or

```sh
yarn global add toolbot-core-experiment
```

## Getting Started

See [Getting Started](./GettingStarted.md).

## Documentation

See [docs](./).

## License

MIT © [Yoctol](https://github.com/Yoctol/bottender)
