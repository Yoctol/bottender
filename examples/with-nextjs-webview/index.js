const { parse } = require('url');

const nextjs = require('next');
const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/express');

const bot = new MessengerBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  appSecret: '__FILL_YOUR_SECRET_HERE__',
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

async function createServerWithNext() {
  const nextApp = nextjs({
    dev: process.env.NODE_ENV !== 'production',
  });

  const handle = nextApp.getRequestHandler();

  await nextApp.prepare();

  const server = createServer(bot);

  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  return server;
}

createServerWithNext()
  .then(server => {
    server.listen(5000, () => {
      console.log('server is running on 5000 port...');
    });
  })
  .catch(console.error);
