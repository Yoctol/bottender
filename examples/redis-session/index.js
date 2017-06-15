require('babel-register');

const {
  MessengerBot,
  RedisCacheStore,
  CacheBasedSessionStore,
} = require('../../src');
const { createServer } = require('../../src/express');

const config = {
  verifyToken: '1qaz2wsx',
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
};

const cache = new RedisCacheStore();

const bot = new MessengerBot({
  accessToken: config.accessToken,
  sessionStore: new CacheBasedSessionStore(cache),
});

bot.handle(context => {
  context.sendText('Hello World');
});

const server = createServer(bot, config);

server.listen(5000, () => {
  console.log('server is running...');
});
