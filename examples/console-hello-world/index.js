const { ConsoleBot } = require('toolbot-core-experiment');

const bot = new ConsoleBot();

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

bot.createRuntime();
