const { parse } = require('url');

require('babel-register');
const nextjs = require('next');

const { MessengerBot } = require('../../src');
const { createServer } = require('../../src/express');

const config = {
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
};

const bot = new MessengerBot({
  accessToken: config.accessToken,
});

bot.onEvent(context => {
  context.sendText('Hello World');
});

async function createServerWithNext() {
  const nextApp = nextjs({
    dev: process.env.NODE_ENV !== 'production',
  });

  const handle = nextApp.getRequestHandler();

  await nextApp.prepare(); // eslint-disable-line no-await-in-loop

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
