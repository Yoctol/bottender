# HTTP Server

## Express

https://github.com/expressjs/express

```js
const { createServer } = require('toolbot-core-experiment/express');

const server = createServer(bot);
```

## Koa

https://github.com/koajs/koa

```js
const { createServer } = require('toolbot-core-experiment/koa');

const server = createServer(bot);
```

## Micro

https://github.com/zeit/micro

```js
const { createRequestHandler } = require('toolbot-core-experiment/micro');

module.exports = createRequestHandler(bot);
```

## Restify

https://github.com/restify/node-restify

```js
const { createServer } = require('toolbot-core-experiment/restify');

const server = createServer(bot);
```
