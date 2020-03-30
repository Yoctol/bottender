# Bottender

[![npm](https://img.shields.io/npm/v/bottender.svg)](https://www.npmjs.com/package/bottender)
[![CircleCI](https://circleci.com/gh/Yoctol/bottender.svg?style=shield)](https://circleci.com/gh/Yoctol/bottender)
[![coverage](https://codecov.io/gh/Yoctol/bottender/branch/master/graph/badge.svg)](https://codecov.io/gh/Yoctol/bottender)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Yoctol/bottender#contributing)
[![join chat](https://img.shields.io/badge/discord-join%20chat-green.svg)](https://discord.gg/apNsWBz)
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/Yoctol/bottender)
[![Follow @bottenderjs](https://img.shields.io/twitter/follow/bottenderjs.svg?label=Follow%20@bottenderjs)](https://twitter.com/intent/follow?screen_name=bottenderjs)

![](https://user-images.githubusercontent.com/3382565/76295244-3c80c800-62ef-11ea-88dc-a6039b3918c2.png)

> The readme below is the documentation for the v1 (stable) version of Bottender. To view the documentation:
>
> - for the latest Bottender version (v1.x), visit https://bottender.js.org/docs/en/getting-started
> - for the legacy Bottender version (v0.15), visit https://bottender.js.org/docs/en/0.15.17/getting-started

- **Declarative** - Bottender takes care of the complexity of conversational UIs for you. Design actions for each event and state in your application, and Bottender will run accordingly. his approach makes your code more predictable and easier to debug.

- **Native User Experience** - Bottender lets you create apps on every channel and never compromise on your users’ experience. You can apply progressive enhancement or graceful degradation strategy on your building blocks.

- **Easy Setup** - With Bottender, you only need a few configurations to make your bot work with channels, automatic server listening, webhook setup, signature verification and so much more.

- **Ready for Production** - There are thousands of bots powered by Bottender. It has been optimized for real world use cases, automatic batching request and dozens of other compelling features.

Bottender is built on top of
[Messaging APIs](https://github.com/Yoctol/messaging-apis).

## Installation

You can create a new Bottender app using the cli tools:

```sh
npx create-bottender-app my-app
```

Installation may fail on Windows during compilation of the native dependencies with `node-gyp`. To solve this problem, you can install [`windows-build-tools`](https://github.com/felixrieseberg/windows-build-tools#readme) or check [`node-gyp` documentation](https://github.com/nodejs/node-gyp#on-windows).

## Documentation

You can find the Bottender documentation [on the website](https://bottender.js.org?new).

Check out the [Getting Started](https://bottender.js.org/docs/en/getting-started) page for a quick overview.

## Community

[![join chat](https://img.shields.io/badge/discord-join%20chat-green.svg)](https://discord.gg/unmFzmR)

You can discuss anything about Bottender or chatbot development in our [Discord](https://discordapp.com/) Server. [Join now!](https://discord.gg/unmFzmR)

## Examples

We have a bunch of examples in the
[examples](https://github.com/Yoctol/bottender/tree/master/examples) folder.
Here is the first one to get you started:

```js
// index.js
module.export = async function App(context) {
  await context.sendText('Hello World');
};
```

```sh
npx bottender start --console
```

This will create and run a bot which always reply "Hello World" in the console.

## Notable Features

### Messenger

- Messenger Profile Sync
- Attachment Upload
- Handover Protocol
- Persona
- Built-in NLP
- Multiple Pages

### LINE

- Reply, Push, Multicast
- Imagemap
- Rich Menu
- Room, Group Chat
- Beacon

### Slack

- Channel Chat
- Interactive Message

### Telegram

- Webhook, Long Polling
- Update, Delete Messages
- Keyboard
- Group Chat
- Inline Query
- Message Live Location
- Payment

### Viber

- Subscribed, Unsubscribed Event
- Delivered, Seen Event

## Ecosystem

- [bottender-compose](https://github.com/Yoctol/bottender-compose) - An utility library for Bottender and higher-order handlers.

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

### Contribute using the online one-click setup

You can use Gitpod(a free online VS Code-like) for contributing. With a single click it will launch a workspace and automatically:

- clone the bottender repo.
- install the dependencies.
- run `yarn run start`.

So that you can start straight away.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Yoctol/bottender)

## License

MIT © [Yoctol](https://github.com/Yoctol/bottender)
