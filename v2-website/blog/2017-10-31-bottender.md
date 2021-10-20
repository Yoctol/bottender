---
title: Bottender
author: C. T. Lin
authorURL: 'https://twitter.com/chentsulin'
authorTitle: Co-Creator of Bottender
authorTwitter: chentsulin
authorImageURL: 'https://avatars1.githubusercontent.com/u/3382565?s=460&v=4'
---

We're very proud to open-source [Bottender](https://github.com/yoctol/bottender), a JavaScript framework for cross-platform bots, built on top of [Messaging-APIs](https://github.com/Yoctol/messaging-apis) and lots of great tools from the JavaScript community!

![bottender logo](/img/blog/2017-10-31/logo-600x600.png)

To begin with, install `bottender` globally from the npm registry:

```sh
npm install -g bottender
```

And enter interactive bot creation process with:

```sh
bottender init
```

After answering a few questions, a new bot will be created for you.

![bottender init screenshot](/img/blog/2017-10-31/init-screenshot.png)

<br />

<!--truncate-->

## Motivation

We are eager to envision a future of modern and friendly bot development, because we believe bots are the next big thing in terms of impact, scale and complexity.

Bot development should benefit from the latest improvements in JavaScript. Thanks to Babel, Node.js and the V8 engine, modern developers have escaped from call-back hell, but still have full access to the power of asynchronous error handling and state maintenance.

Also, bot development should be friendly. That is, developing bots on multiple messaging platforms should imply a consistent development experience without losing any of the characteristics or features of each platform.

Here comes Bottender, our proposal of modern and friendly bot development.

<br />

## Only JavaScript. Handler is a function

The advantages of this approach over similar models is that you can do whatever you want in your function. And because of that, your entire system remains highly composable and testable.

```js
bot.onEvent((context) => {
  if (context.event.isText) {
    console.log('Cool. You sent a text to me.');
  }
});
```

Furthermore, this handler function are fully testable without pain. Your test suite can simply import and test it.

<br />

## Control Asynchronous Flow using Async Functions

When it comes to database queries or asynchronous API calls, modern async/await syntax give you great advantage to control your logic. Bottender's first class async/await support let you simply pass in any `async` handler. Farewell to callback hells.

```js
bot.onEvent(async (context) => {
  if (context.event.text === 'you shoull call api') {
    const result = await callSomeAsyncAPI(context.event.text);
    await context.sendText(result);
  }
});
```

<br />

## Keep Conversation State at Session Store

Conversation state can be initially defined with `bot.setInitialState()`, and can be modified during conversation using `context.setState()`. The state control is handled by underlying session store.

```js
bot.setInitialState({
  todos: [],
});

bot.onEvent((context) => {
  if (context.event.isText) {
    context.setState({
      todos: context.state.todos.concat(context.event.text),
    });
  }
});
```

You can use `memory` session store in development, and replace it with persistence session stores on production.

```js
const { FileSessionStore } = require('bottender');

const bot = new MessengerBot({
  sessionStore: new FileSessionStore(),
});
```

We provide not only `file` session store but also `redis` and `mongo` session stores. You can even submit your session store by following the interface implementation.

<br />

## Simple deployment

To put your bot logic online, you need a HTTP server. Bottender provides simple `createServer()` function that do the trick for you, the server created can be extended as well.

```js
const createServer = require('bottender/express');

const server = createServer(bot);

server.listen(3000, () => {
  console.log('bot server is running on 3000 port');
});
```

Bottender supports four Node.js server frameworks, simply require corresponding `createServer()` from submodules.

```js
// import from express
const createServer = require('bottender/express');

// import from koa
const createServer = require('bottender/koa');

// import from micro
const createServer = require('bottender/micro');

// import from restify
const createServer = require('bottender/restify');
```

Since Bottender works as a Node.js HTTP server, you can easily deploy your bots to PaaS like [Heroku](https://www.heroku.com/) or [Now](https://zeit.co/now). For more details, check out the [Deployment](https://bottender.js.org/docs/Guides-Deployment) guide.
