const express = require('express');
const bodyParser = require('body-parser');

const { MessengerBot, verifyMessengerWebhook } = require('../../src');

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
    // FIXME
    verifyToken: config.verifyToken,
  })
);
server.post(bot.createKoaMiddleware()); // FIXME

server.listen(5000, () => {
  console.log('server is running...');
});
