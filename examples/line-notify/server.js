const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');
const ejs = require('ejs');
const { bottender, LineNotify } = require('bottender');

const app = bottender({
  dev: process.env.NODE_ENV !== 'production',
});

const port = Number(process.env.PORT) || 5000;

// the request handler of the bottender app
const handle = app.getRequestHandler();

const lineNotify = new LineNotify({
  clientId: process.env.LINE_NOTIFY_CLIENT_ID,
  clientSecret: process.env.LINE_NOTIFY_CLIENT_SECRET,
  redirectUri: `${process.env.ROOT_PATH}/notify/redirect`,
});

app.prepare().then(() => {
  const server = express();

  server.use(
    bodyParser.json({
      verify: (req, _, buf) => {
        req.rawBody = buf.toString();
      },
    })
  );

  server.get('/notify/new', (req, res) => {
    const filename = path.join(`${__dirname}/notify.html`);
    const url = lineNotify.getAuthLink('test');
    ejs.renderFile(filename, { url }, {}, function (err, str) {
      if (err) {
        console.log('err:');
        console.log(err);
      }
      res.send(str);
    });
  });

  server.get('/notify/redirect', async function (req, res) {
    const code = req.query.code;
    const token = await lineNotify.getToken(code);
    await lineNotify.sendNotify(token, 'Hello bottender!');
    res.send('Subscribe successfully. Please close this page.');
  });

  // route for webhook request
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
