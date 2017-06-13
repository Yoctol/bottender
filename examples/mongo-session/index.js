require('babel-register');

const { MessengerBot, MongoSessionStore } = require('../../src');
const { createServer } = require('../../src/express');

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

const server = createServer(bot, config);

server.listen(5000, () => {
  console.log('server is running...');
});
