module.exports = async function App(context) {
  const url = `${process.env.ROOT_PATH}/notify/new`;
  await context.sendText(url);
};
