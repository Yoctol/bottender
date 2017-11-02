# Todos

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/todos
cd todos
npm install
npm run dev
```

## Idea of this example

Building a To-Do app is the best way to understand new tools. This example shows what a To-Do console bot looks like. We suggest you read our [session guide](https://yoctol.github.io/bottender-docs/docs/Guides-Session) before. That will help you come to a better understanding.  

To begin with, the bot sets a initial state like following code.  Noticed that state must be an **`Object`**.  

```js
bot.setInitialState({
  todos: [],
});
```

There are three features in this example: **Add todo**, **list all todos** and **clear all todos**.  

First of all, just talk anything to the bot, and it will call `context.setState` to store your todo in memory session. This shows how to add a todo.  

```js
const newTodos = context.event.text;
context.setState({
  todos: [...context.state.todos, newTodos],
});
await context.sendText(`Todo: ${newTodos} added!`);
```

To show all todos, enter **/list**, then the bot will check whether `context.seesion` is empty. If it has any todos, the bot will send all of them to you.  

```js
if (context.state.todos.length > 0) {
  await context.sendText(context.state.todos.join('\n'));
} else {
  await context.sendText('No todos!');
}
```

Finally, enter **/clear**, the bot will clear all todos by calling `context.resetState`. That is a very useful method to reset your state.  

```js
context.resetState();
await context.sendText('Successfully clear all todos!');
```

For more information about Bottender, please visit our [Docs Website](https://bottender.js.org/).

## Related examples

- [console-hello-world](../console-hello-world)
- [with-memory-session](../with-memory-session)
