# Bottender

[![npm](https://img.shields.io/npm/v/bottender.svg)](https://www.npmjs.com/package/bottender)
[![npm@next](https://img.shields.io/npm/v/bottender/next.svg)](https://www.npmjs.com/package/bottender)
[![CircleCI](https://circleci.com/gh/Yoctol/bottender.svg?style=shield)](https://circleci.com/gh/Yoctol/bottender)
[![coverage](https://codecov.io/gh/Yoctol/bottender/branch/master/graph/badge.svg)](https://codecov.io/gh/Yoctol/bottender)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Yoctol/bottender#contributing)
[![join chat](https://img.shields.io/badge/discord-join%20chat-green.svg)](https://discord.gg/unmFzmR)
![](https://user-images.githubusercontent.com/662387/38478130-5ceff16c-3be9-11e8-9b2b-d9fc2e0925c0.png)

* **Flexible** - Declare handlers as any JavaScript function.

* **Modern** - Source written with ES6/ES7 syntax and great async await
  supports.

* **Modular** - Use session stores, server framework adapters and platform
  connectors with same interface.

* **Learn Once, Write Anywhere** - Handle multiple platforms with consistent
  development experience.

Bottender is built on top of
[Messaging APIs](https://github.com/Yoctol/messaging-apis).

## Installation

You can install Bottender globally to use the cli tools:

```sh
npm install -g bottender
```

Or install it locally to use it programmatically:

```sh
npm install bottender
```

## Documentation

You can find the Bottender documentation on the website.

* [Getting Started](https://bottender.js.org/docs/GettingStarted)
* [Platforms](https://bottender.js.org/docs/Platforms-Messenger)
  * [Console](https://bottender.js.org/docs/Platforms-Console)
  * [Messenger](https://bottender.js.org/docs/Platforms-Messenger)
  * [LINE](https://bottender.js.org/docs/Platforms-LINE)
  * [Slack](https://bottender.js.org/docs/Platforms-Slack)
  * [Telegram](https://bottender.js.org/docs/Platforms-Telegram)
  * [Viber](https://bottender.js.org/docs/Platforms-Viber)
* [Guides](https://bottender.js.org/docs/Guides-Commands)
  * [CLI commands](https://bottender.js.org/docs/Guides-Commands)
  * [Server](https://bottender.js.org/docs/Guides-Server)
  * [Session](https://bottender.js.org/docs/Guides-Session)
* [API Reference](https://bottender.js.org/docs/APIReference-Context)

## Community

[![join chat](https://img.shields.io/badge/discord-join%20chat-green.svg)](https://discord.gg/unmFzmR)

You can discuss anything about Bottender or chatbot development in our [Discord](https://discordapp.com/) Server. [Join now!](https://discord.gg/unmFzmR)

## Examples

We have a bunch of examples in the
[examples](https://github.com/Yoctol/bottender/tree/master/examples) folder.
Here is the first one to get you started:

```js
const { ConsoleBot } = require('bottender');

const bot = new ConsoleBot();

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

bot.createRuntime();
```

This will create and run a bot which always reply "Hello World" in the console.

You'll notice that there is an async function to be passed to the `onEvent`
method, we call it handler. You can put your bot logic in there.

## Notable Features

### Messenger

* Messenger Profile Sync
* Attachment Upload
* Handover Protocol
* Targeting Broadcast Messages
* Built-in NLP
* Multiple Pages

### LINE

* Reply, Push, Multicast
* Imagemap
* Rich Menu
* Room, Group Chat
* Beacon

### Slack

* Channel Chat
* Interactive Message

### Telegram

* Webhook, Long Polling
* Update, Delete Messages
* Keyboard
* Group Chat
* Inline Query
* Message Live Location
* Payment

### Viber

* Subscribed, Unsubscribed Event
* Delivered, Seen Event

## Introduction Video

[![](https://user-images.githubusercontent.com/3382565/33467982-cc8a0e42-d693-11e7-9134-2d42ec135e19.png)](https://www.youtube.com/watch?v=C_OBHmbXCsE)

## Contributing

Pull Requests and issue reports are welcome. You can follow steps below to
submit your pull requests:

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
