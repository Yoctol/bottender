---
title: HTTP server
date: "2017/10/13"
---

# HTTP Server

## Introduction

Bottender supports the following HTTP servers. You can choose one of them to develop your own bots.

- [Express](#express)
- [Koa](#koa)
- [Micro](#micro)
- [Restify](#restify)

## Parameters

The `createServer` function accept two parameters:
- [Bot instance](#bot-instance) (required)
- [Options](#options)

### Bot instance

All you need to do is to use the right `createServer` function according to platform and pass the bot instance to get the server.

For example:

```js
const { createServer } = require('toolbot-core-experiment/express');

const bot = require('./bot'); // implement your bot logic

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
```

### Options

If you are developing a Messenger bot and you want to use your own verify token, you can pass options object with `verifyToken` key.

For example:

```js
const { createServer } = require('toolbot-core-experiment/express');

const bot = require('./bot'); // implement your Messenger bot logic

const server = createServer(bot, {
  verifyToken: '__FILL_YOUR_VERIFY_TOKEN_HERE__'
});

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
```

## Servers

### Express

> Fast, unopinionated, minimalist web framework for Node.js.   
https://github.com/expressjs/express

Example:

```js
const { createServer } = require('toolbot-core-experiment/express');

const bot = require('./bot'); // implement your bot logic

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
```

The full `Express` server example is [here](https://github.com/Yoctol/toolbot-core-experiment/tree/master/examples/with-express).

### Koa

> Koa is a new web framework designed by the team behind Express, which aims to be a smaller, more expressive, and more robust foundation for web applications and APIs.  
https://github.com/koajs/koa

Example:

```js
const { createServer } = require('toolbot-core-experiment/koa');

const bot = require('./bot'); // implement your bot logic

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
```

The full `Koa` server example is [here](https://github.com/Yoctol/toolbot-core-experiment/tree/master/examples/with-koa).

### Micro

> Asynchronous HTTP microservices  
https://github.com/zeit/micro

Example:

```js
const { createRequestHandler } = require('toolbot-core-experiment/micro');

const bot = require('./bot'); // implement your bot logic

module.exports = createRequestHandler(bot);
```

The full `Micro` server example is [here](https://github.com/Yoctol/toolbot-core-experiment/tree/master/examples/with-micro).

### Restify

> A Node.js web service framework optimized for building semantically correct RESTful web services ready for production use at scale. restify optimizes for introspection and perfromance, and is used in some of the largest Node.js deployments on Earth.  
https://github.com/restify/node-restify

```js
const { createServer } = require('toolbot-core-experiment/restify');

const bot = require('./bot'); // implement your bot logic

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
```

The full `Restify` server example is [here](https://github.com/Yoctol/toolbot-core-experiment/tree/master/examples/with-restify).
