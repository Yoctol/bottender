const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/express');

const bot = new MessengerBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  appSecret: '__FILL_YOUR_SECRET_HERE__',
});

bot.onEvent(async context => {
  console.log(context.event.message.nlp.entities);
  const { datetime } = context.event.message.nlp.entities;

  if (!datetime) {
    await context.sendText('Not a date or time');
    return;
  }

  const dt = datetime[0];

  if (dt.type === 'value') {
    await context.sendText(`Did you mean ${dt.value} ? :)`);
  } else if (dt.type === 'interval') {
    const { from, to } = dt;
    await context.sendText(
      `Did you mean from ${from.value} to ${to.value} ? :)`
    );
  }
});

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
