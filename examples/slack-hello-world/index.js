require('babel-register');

const { SlackBot } = require('../../src');
const { createServer } = require('../../src/express');

const config = {
  webhookURL: '__FILL_YOUR_WEBHOOKURL_HERE__',
};

const bot = new SlackBot({
  webhookURL: config.webhookURL,
});
bot.handle(context => {
  context.sendText('Hello World');
});

const server = createServer(bot, config);

server.listen(5000, () => {
  console.log('server is running...');
});
