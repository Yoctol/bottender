const { MessengerBot, withTyping } = require('bottender');
const { createServer } = require('bottender/express');

const bot = new MessengerBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  appSecret: '__FILL_YOUR_SECRET_HERE__',
});

bot.use(withTyping({ delay: 1000 }));

bot.onEvent(async context => {
  await context.sendText('Hello World');
  await context.sendText('Hello World');
  await context.sendText('Hello World~~~~~~~~~~', { delay: 2000 });
});

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
