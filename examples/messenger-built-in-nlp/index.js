const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/express');

const bot = new MessengerBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  appSecret: '__FILL_YOUR_SECRET_HERE__',
});

bot.onEvent(async context => {
  /* eslint-disable no-console */
  console.log(context.event.message.nlp.entities);
  const entities = context.event.message.nlp.entities;
  if (entities.datetime && entities.datetime[0].type === 'value') {
    const datetime = entities.datetime[0].value;
    await context.sendText(`Do you mean ${datetime} ? :)`);
  } else if (entities.datetime && entities.datetime[0].type === 'interval') {
    const from = entities.datetime[0].from.value;
    const to = entities.datetime[0].to.value;
    await context.sendText(`Do you mean from ${from} to ${to} ? :)`);
  } else {
    await context.sendText('Not a date or time');
  }
});

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
