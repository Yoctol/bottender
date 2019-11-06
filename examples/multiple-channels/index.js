module.exports = async function App(context) {
  await context.sendText(`Hello World. Platform: ${context.platform}`);
};
