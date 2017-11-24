const { ConsoleBot } = require('bottender');

const bot = new ConsoleBot();

const allActions = {
  helloWorld: {
    method: 'sendText',
    body: 'Hello World!',
  },
  foo: {
    method: 'sendText',
    body: 'foo!',
  },
};

bot.use(context => {
  context.doActions = async actions => {
    for (let i = 0; i < actions.length; i += 1) {
      const action = actions[i];
      /* eslint-disable no-await-in-loop */
      await context[action.method](action.body);
      /* eslint-enable no-await-in-loop */
    }
  };
});

bot.onEvent(async context => {
  await context.doActions([allActions.helloWorld, allActions.foo]);
});

bot.createRuntime();
