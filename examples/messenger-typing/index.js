module.exports = async function App(context) {
  await context.sendText('Hello World');
  await context.sendText('Hello World');
  await context.sendText('Hello World~~~~~~~~~~', { delay: 2000 });
};
