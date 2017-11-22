const { ConsoleBot, FileSessionStore } = require('bottender');

const bot = new ConsoleBot({
  sessionStore: new FileSessionStore(),
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

bot.createRuntime();
