const express = require('express');
const bodyParser = require('body-parser');

const { MessengerBot } = require('../../src');
const { verifyMessengerWebhook } = require('../../src/express');

const config = {
  verifyToken: '',
  accessToken: '',
};

const bot = new MessengerBot({
  accessToken: config.accessToken,
});

const server = express();

server.use(bodyParser.json());
server.get(
  verifyMessengerWebhook({
    verifyToken: config.verifyToken,
  })
);
server.post(bot.createExpressMiddleware());

server.listen(5000, () => {
  console.log('server is running...');
});
