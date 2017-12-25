const { TelegramBot } = require('bottender');

const bot = new TelegramBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

bot.createLongPollingRuntime({
  limit: 10, // Limits the number of updates to be retrieved. Defaults to 100.
  timeout: 60, // Timeout in seconds for long polling. Defaults to 0.
  allowed_updates: ['message', 'callback_query'], // List the types of updates you want your bot to receive
});
