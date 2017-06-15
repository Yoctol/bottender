require('babel-register');

const { MessengerBot, MongoSessionStore } = require('../../src');
const { createServer } = require('../../src/express');

const config = {
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
};

const bot = new MessengerBot({
  accessToken: config.accessToken,
  sessionStore: new MongoSessionStore('mongodb://localhost:27017/'),
});

bot.handle(context => {
  context.sendText('Hello World');
});

const server = createServer(bot, config);

server.listen(5000, () => {
  console.log('server is running...');
});
