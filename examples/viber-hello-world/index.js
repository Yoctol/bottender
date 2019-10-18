module.exports = async function App(context) {
  if (context.event.isMessage) {
    await context.sendText('Hello World');
  }
};
