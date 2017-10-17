const { ConsoleBot } = require('toolbot-core-experiment');

const bot = new ConsoleBot();

bot.onEvent(async context => {
  if (context.session.asking) {
    context.session.nickname = context.event.message.text;
    context.session.asking = false;
    await context.sendText(`Hello ${context.session.nickname}`);
  } else {
    context.session.asking = true;
    await context.sendText("Hi, what's your nickname?");
  }
});

bot.createRuntime();
