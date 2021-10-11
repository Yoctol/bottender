const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const { bottender } = require('bottender');

const app = bottender({
  dev: process.env.NODE_ENV !== 'production',
});

const port = Number(process.env.PORT) || 5000;

const handle = app.getRequestHandler();

const server = express();
server.use(
  bodyParser.json({
    verify: (req, _, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

server.all('*', (req, res) => {
  app.prepare().then(() => {
    return handle(req, res);
  });
});

server.listen(port, (err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log(`> Ready on http://localhost:${port}`);
});

module.exports.handler = serverless(server);
