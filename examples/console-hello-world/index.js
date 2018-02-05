const { ConsoleBot } = require('bottender');

const bot = new ConsoleBot({ fallbackMethods: true });

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

bot.createRuntime();
