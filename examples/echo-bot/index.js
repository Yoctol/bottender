module.exports = async function App(context) {
  if (context.event.isText) {
    await context.sendText(context.event.text);
  }
};
