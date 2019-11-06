// This bot should be assigned as primary receiver app
module.exports = async function App(context) {
  if (context.event.isText && !context.event.isEcho) {
    if (context.event.isStandby) {
      if (context.event.text === '/back') {
        await context.takeThreadControl();
        await context.sendText('Taking thread control back.');
      }
    } else if (context.event.text === '/help') {
      await context.sendText('Passing thread control to the page inbox.');
      await context.passThreadControlToPageInbox();
    } else {
      await context.sendText('Respond by bot.');
    }
  }
};
