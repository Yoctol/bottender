import { json, send } from 'micro';

import verifyMessengerWebhook from './verifyMessengerWebhook';

function createRequestHandler(bot, config = {}) {
  const requestHandler = bot.createRequestHandler();
  return async (req, res) => {
    if (req.method === 'GET') {
      verifyMessengerWebhook({ verifyToken: config.verifyToken })(req, res);
    } else if (req.method === 'POST') {
      const body = await json(req);
      await requestHandler(body);
      send(res, 200);
    } else {
      send(res, 405);
    }
  };
}

export default createRequestHandler;
