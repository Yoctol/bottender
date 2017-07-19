require('babel-register');

const { SlackBot } = require('../../src');
const { createServer } = require('../../src/express');

const config = {
  accessToken: '__FILL_YOUR_TOKEN_HERE__', // FIXME
};

const bot = new SlackBot({
  accessToken: config.accessToken, // FIXME
});

bot.handle(context => {
  context.sendText('Hello World');
});

const server = createServer(bot, config);

server.listen(5000, () => {
  console.log('server is running...');
});
