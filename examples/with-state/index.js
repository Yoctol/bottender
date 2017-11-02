const { ConsoleBot } = require('bottender');

const bot = new ConsoleBot();

bot.setInitialState({
  asking: false,
  nickname: null,
});

bot.onEvent(async context => {
  if (context.state.asking) {
    context.setState({ nickname: context.event.text, asking: false });
    await context.sendText(`Hello ${context.state.nickname}`);
  } else {
    context.resetState();
    context.setState({ asking: true });
    await context.sendText("Hi, what's your nickname?");
  }
});

bot.createRuntime();
