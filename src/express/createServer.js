import express from 'express';
import bodyParser from 'body-parser';

import registerRoutes from './registerRoutes';

function createServer(bot, config = {}) {
  const server = express();

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(
    bodyParser.json({
      verify: (req, res, buf) => {
        req.rawBody = buf.toString();
      },
    })
  );

  registerRoutes(server, bot, config);

  return server;
}

export default createServer;
