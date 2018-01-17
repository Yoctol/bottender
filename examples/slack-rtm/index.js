const { SlackBot } = require('bottender');

const bot = new SlackBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

bot.createRtmRuntime();
