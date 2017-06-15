const { json, send } = require('micro');

const verifyMessengerWebhook = require('./verifyMessengerWebhook');

function createRequestHandler(bot, config = {}) {
  const requestHandler = bot.createRequestHandler();
  return async (req, res) => {
    if (req.method === 'GET') {
      await verifyMessengerWebhook({ verifyToken: config.verifyToken });
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
