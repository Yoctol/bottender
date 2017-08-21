import { json, send } from 'micro';

import verifyLINESignature from './verifyLINESignature';
import verifyMessengerWebhook from './verifyMessengerWebhook';
import verifySlackWebhook from './verifySlackWebhook';

function createRequestHandler(bot, config = {}) {
  const requestHandler = bot.createRequestHandler();
  return async (req, res) => {
    if (req.method === 'GET' && bot.connector.platform === 'messenger') {
      verifyMessengerWebhook({ verifyToken: config.verifyToken })(req, res);
    } else if (req.method === 'POST') {
      const body = await json(req);

      if (
        bot.connector.platform === 'slack' &&
        body.type === 'url_verification'
      ) {
        await verifySlackWebhook()(req, res);
      } else {
        if (bot.connector.platform === 'line') {
          const LINEVerified = await verifyLINESignature(bot)(req, res);
          if (!LINEVerified) {
            return;
          }
        }
        await requestHandler(body);
        send(res, 200);
      }
    } else {
      send(res, 405);
    }
  };
}

export default createRequestHandler;
