require('babel-register');

const { SlackBot } = require('../../src');
const { createServer } = require('../../src/express');

const config = {
  token: '__FILL_YOUR_token_HERE__',
};

const bot = new SlackBot({
  token: config.token,
});
bot.handle(context => {
  context.sendText('Hello World');
});

const server = createServer(bot, config);

server.listen(5000, () => {
  console.log('server is running...');
});
