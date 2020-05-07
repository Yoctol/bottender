const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');
const { bottender, getClient } = require('bottender');

const { getSession } = require('./gameSession');

const client = getClient('telegram');

const app = bottender({
  dev: process.env.NODE_ENV !== 'production',
});

const port = Number(process.env.PORT) || 5000;

// the request handler of the bottender app
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(
    bodyParser.json({
      verify: (req, _, buf) => {
        req.rawBody = buf.toString();
      },
    })
  );

  server.get('/game', (req, res) => {
    const filename = path.join(`${__dirname}/game.html`);
    res.sendFile(filename);
  });

  server.post('/setScore', async (req, res) => {
    const data = getSession(req.body.key);
    const score = req.body.score;
    await client.setGameScore(data.userId, score, {
      force: true,
      ...data,
    });
    res.send({ ok: true });
  });

  // route for webhook request
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
