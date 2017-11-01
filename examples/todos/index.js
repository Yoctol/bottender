const { ConsoleBot } = require('bottender');

const bot = new ConsoleBot();

bot.setInitialState({
  todos: [],
});

bot.onEvent(async context => {
  if (context.event.isText) {
    if (context.event.text === '/list') {
      if (context.state.todos.length > 0) {
        await context.sendText(context.state.todos.join('\n'));
      } else {
        await context.sendText('No todos!');
      }
    } else if (context.event.text === '/clear') {
      context.resetState();
      await context.sendText('Successfully clear all todos!');
    } else {
      const newTodos = context.event.text;
      context.setState({
        todos: [...context.state.todos, newTodos],
      });
      await context.sendText(`Todo: ${newTodos} added!`);
    }
  }
});

bot.createRuntime();
