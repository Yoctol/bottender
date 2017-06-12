const { parse } = require('url');

require('babel-register');
const express = require('express');
const bodyParser = require('body-parser');
const nextjs = require('next');

const { MessengerBot } = require('../../src');
const { verifyMessengerWebhook } = require('../../src/express');

const config = {
  verifyToken: '1qaz2wsx',
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
};

const bot = new MessengerBot({
  accessToken: config.accessToken,
});

bot.handle(context => {
  context.sendText('Hello World');
});

async function createServer() {
  const nextApp = nextjs({
    dev: process.env.NODE_ENV !== 'production',
  });

  const handle = nextApp.getRequestHandler();

  await nextApp.prepare(); // eslint-disable-line no-await-in-loop

  const server = express();

  server.use(bodyParser.json());
  server.get(
    '/',
    verifyMessengerWebhook({
      verifyToken: config.verifyToken,
    })
  );
  server.post('/', bot.createExpressMiddleware());
  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  return server;
}

createServer()
  .then(server => {
    server.listen(5000, () => {
      console.log('server is running...');
    });
  })
  .catch(console.error);
