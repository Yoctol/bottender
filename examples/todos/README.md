# Todos

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/todos
cd todos
npm install
npm run dev --console
```

## Idea of This Example

Building a todo app is the best way to understand new tools. This example shows
what a To-Do console bot looks like. We suggest that you read our
[session guide](https://bottender.js.org/docs/next/the-basics-session) first. That will
help you come to a better understanding.

To begin with, the bot sets a initial state in `bottender.config.js`. Noticed that
state must be an **Object**.

```js
module.exports = {
  initialState: {
    todos: [],
  },
};
```

There are three features in this example: **Add todo**, **list all todos** and
**clear all todos**.

First of all, just talk anything to the bot, and it will call `context.setState`
to store your todo in session. This shows how to add a todo.

```js
async function AddTodo(context) {
  const newTodos = context.event.text;
  context.setState({
    todos: [...context.state.todos, newTodos],
  });
  await context.sendText(`Todo: ${newTodos} added!`);
}
```

To show all todos, enter **/list**, then the bot will check whether
`context.session` is empty. If it has any todos, the bot will send all of them
to you.

```js
async function ShowTodos(context, { todos }) {
  if (todos.length > 0) {
    await context.sendText(todos.join('\n'));
  } else {
    return TodoNotFound;
  }
}
```

Finally, enter **/clear**, the bot will clear all todos by calling
`context.resetState`. That is a very useful method to reset your state.

```js
async function ClearTodos(context) {
  context.resetState();
  await context.sendText('Successfully clear all todos!');
}
```

For more information about Bottender, please visit our
[Docs Website](https://bottender.js.org/).

## Related Examples

- [with-state](../with-state)
