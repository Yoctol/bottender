const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');
const { bottender } = require('bottender');
const ejs = require('ejs');

const app = bottender({
  dev: process.env.NODE_ENV !== 'production',
});

const port = Number(process.env.PORT) || 5000;

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

  server.get('/api', (req, res) => {
    res.json({ ok: true });
  });

  server.all('/liff', (req, res) => {
    const filename = path.join(`${__dirname}/liff.html`);
    ejs.renderFile(filename, {}, {}, function(err, str) {
      if (err) {
        console.log('err:');
        console.log(err);
      }
      res.send(str);
    });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
