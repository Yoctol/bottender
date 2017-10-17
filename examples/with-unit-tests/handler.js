module.exports = async context => {
  if (context.event.isTextMessage) {
    await context.sendText(`You say: ${context.event.message.text}`);
  } else if (context.event.isMessage) {
    await context.sendText('Sorry, I only read text messages.');
  }
};
