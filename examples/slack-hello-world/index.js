const { SlackBot } = require('bottender');
const { createServer } = require('bottender/express');

const bot = new SlackBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  verificationToken: '__FILL_YOUR_VERIFICATION_TOKEN_HERE__',
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
