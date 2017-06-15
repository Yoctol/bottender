import micro from 'micro';
import shortid from 'shortid';
import ngrok from 'ngrok';

import createRequestHandler from './createRequestHandler';

function createServer(bot, config = {}) {
  config.verifyToken = config.verifyToke || shortid.generate();

  const server = micro(createRequestHandler(bot, config));

  console.log(`verify token: ${config.verifyToken}`);
  if (config.ngrok) {
    ngrok.connect((err, url) => {
      console.log(`webhook url: ${url}/`);
    });
  }

  return server;
}

export default createServer;
