const { ConsoleBot } = require('bottender');

const bot = new ConsoleBot();

bot.onEvent(async context => {
  if (context.session.asking) {
    context.session.nickname = context.event.text;
    context.session.asking = false;
    await context.sendText(`Hello ${context.session.nickname}`);
  } else {
    context.session.asking = true;
    await context.sendText("Hi, what's your nickname?");
  }
});

bot.createRuntime();
