module.exports = async function App(context) {
  const liffUrl = `https://liff.line.me/${process.env.LINE_LIFF_ID}`;
  await context.sendText(liffUrl);
};
