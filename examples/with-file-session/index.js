require('babel-register');

const { ConsoleBot, FileSessionStore } = require('../../src');

const bot = new ConsoleBot({
  sessionStore: new FileSessionStore(),
});

bot.onEvent(context => {
  context.sendText('Hello World');
});

bot.createRuntime();
