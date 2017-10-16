const { ConsoleBot, FileSessionStore } = require('toolbot-core-experiment');

const bot = new ConsoleBot({
  sessionStore: new FileSessionStore(),
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

bot.createRuntime();
