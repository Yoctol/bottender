const path = require('path');

const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const express = require('express');
const { bottender } = require('bottender');

const index = require('./routes');
const users = require('./routes/users');

const app = bottender({
  dev: process.env.NODE_ENV !== 'production',
});

const port = Number(process.env.PORT) || 5000;

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  /* ----------  Views  ---------- */

  server.set('views', path.join(__dirname, 'views'));
  server.set('view engine', 'jade');

  /* ----------  Static Assets  ---------- */

  server.use(favicon(path.join(__dirname, '/public/favicon.ico')));
  server.use(express.static(path.join(__dirname, 'public')));

  server.use(
    bodyParser.json({
      verify: (req, _, buf) => {
        req.rawBody = buf.toString();
      },
    })
  );
  server.use(bodyParser.urlencoded({ extended: false }));

  /* ----------  Primary / Happy Path  ---------- */

  server.use('/', index);
  server.use('/users', users);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
