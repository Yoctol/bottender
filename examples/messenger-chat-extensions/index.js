const path = require('path');

const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/express');

const config = require('./bottender.config').messenger;

const bot = new MessengerBot({
  accessToken: config.accessToken,
  appSecret: config.appSecret,
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

const server = createServer(bot, { verifyToken: config.verifyToken });

// https://developers.facebook.com/docs/messenger-platform/webview/extensions#webview_on_web
// To support Messenger Extensions SDK on desktop Messenger client, server must return X-Frame-Options header.
const ALLOWED_BY = new Set([
  'https://www.messenger.com',
  'https://www.facebook.com',
]);

// Serve Chat Extensions webview
server.get('/index.html', (req, res) => {
  // https://github.com/helmetjs/frameguard#allowing-from-multiple-origins
  const domain = String(req.query.fb_iframe_origin);
  if (ALLOWED_BY.has(domain)) {
    res.setHeader('X-Frame-Options', `ALLOW-FROM ${domain}`);
  }
  res.sendFile(path.resolve(`${__dirname}/index.html`));
});

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
