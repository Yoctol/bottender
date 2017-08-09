require('babel-register');

const { ConsoleBot, FileSessionStore } = require('../../src');

const bot = new ConsoleBot({
  sessionStore: new FileSessionStore(),
});

bot.handle(context => {
  context.sendText('Hello World');
});

bot.createRuntime();
