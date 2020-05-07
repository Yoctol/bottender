module.exports = async function App(context) {
  await context.chat.postEphemeral('This is a ephemeral message.');
};
