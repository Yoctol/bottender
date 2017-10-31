const { ConsoleBot } = require('bottender');

const bot = new ConsoleBot();

bot.onEvent(async context => {
  if (context.event.isText) {
    const text = context.event.text;
    await context.sendText(text);
  }
});

bot.createRuntime();
