module.exports = async function App(context) {
  const liffUrl = `line://app/${process.env.LINE_LIFF_ID}`;
  await context.sendText(liffUrl);
};
