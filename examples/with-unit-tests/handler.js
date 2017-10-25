module.exports = async context => {
  if (context.event.isText) {
    await context.sendText(`You say: ${context.event.text}`);
  } else if (context.event.isMessage) {
    await context.sendText('Sorry, I only read text messages.');
  }
};
