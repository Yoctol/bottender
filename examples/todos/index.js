const { withProps } = require('bottender');
const { router, text } = require('bottender/router');

async function TodoNotFound(context) {
  await context.sendText('No todos!');
}
async function ShowTodos(context, { todos }) {
  if (todos.length > 0) {
    await context.sendText(todos.join('\n'));
  } else {
    return TodoNotFound;
  }
}

async function ClearTodos(context) {
  context.resetState();
  await context.sendText('Successfully clear all todos!');
}

async function AddTodo(context) {
  const newTodos = context.event.text;
  context.setState({
    todos: [...context.state.todos, newTodos],
  });
  await context.sendText(`Todo: ${newTodos} added!`);
}

module.exports = async function App(context) {
  return router([
    text('/list', withProps(ShowTodos, { todos: context.state.todos })),
    text('/clear', ClearTodos),
    text('*', AddTodo),
  ]);
};
