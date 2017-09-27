require('babel-register');

const { ConsoleBot } = require('../../src');

const bot = new ConsoleBot();

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

bot.createRuntime();
