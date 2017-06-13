require('babel-register');
const express = require('express');
const bodyParser = require('body-parser');

const { MessengerBot, MongoSessionStore } = require('../../src');
const {
  createMiddleware,
  verifyMessengerWebhook,
} = require('../../src/express');

const config = {
  verifyToken: '1qaz2wsx',
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
};

const MONGO_URL = 'mongodb://localhost:27017/';
const sessionHandler = new MongoSessionStore(MONGO_URL);

const bot = new MessengerBot({
  accessToken: config.accessToken,
  sessionHandler,
});

bot.handle(context => {
  context.sendText('Hello World');
});

const server = express();

server.use(bodyParser.json());
server.get(
  '/',
  verifyMessengerWebhook({
    verifyToken: config.verifyToken,
  })
);
server.post('/', createMiddleware(bot));

server.listen(5000, () => {
  console.log('server is running...');
});
