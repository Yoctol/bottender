module.exports = async function App(context) {
  await context.sendText(`User have clicked ${context.event.text}`);
};
