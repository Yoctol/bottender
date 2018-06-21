import url from 'url';

import { json, send } from 'micro';
import parseUrlencoded from 'urlencoded-body-parser';
import shortid from 'shortid';

import verifyLineSignature from './verifyLineSignature';
import verifyMessengerSignature from './verifyMessengerSignature';
import verifyMessengerWebhook from './verifyMessengerWebhook';
import verifySlackSignature from './verifySlackSignature';
import verifySlackWebhook from './verifySlackWebhook';
import verifyViberSignature from './verifyViberSignature';

function createRequestHandler(bot, config = {}) {
  const requestHandler = bot.createRequestHandler();
  return async (req, res) => {
    if (req.method === 'GET' && bot.connector.platform === 'messenger') {
      verifyMessengerWebhook({
        verifyToken:
          config.verifyToken || bot.connector.verifyToken || shortid.generate(),
      })(req, res);
    } else if (req.method === 'POST') {
      let body;
      if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        body = await parseUrlencoded(req);
      } else {
        body = await json(req);
      }

      if (
        bot.connector.platform === 'slack' &&
        body.type === 'url_verification'
      ) {
        await verifySlackWebhook()(req, res);
      } else {
        if (bot.connector.platform === 'messenger') {
          const valid = await verifyMessengerSignature(bot)(req, res);
          if (!valid) {
            return;
          }
        } else if (bot.connector.platform === 'line') {
          const valid = await verifyLineSignature(bot)(req, res);
          if (!valid) {
            return;
          }
        } else if (bot.connector.platform === 'slack') {
          const valid = await verifySlackSignature(bot)(req, res);
          if (!valid) {
            return;
          }
        } else if (bot.connector.platform === 'viber') {
          const valid = await verifyViberSignature(bot)(req, res);
          if (!valid) {
            return;
          }
        }
        const { query } = url.parse(req.url, true);

        const response = await requestHandler(
          {
            ...query,
            ...body,
          },
          {
            req,
            res,
          }
        );
        if (response) {
          Object.keys(response.headers).forEach(key => {
            res.setHeader(key, response.headers[key]);
          });
          send(res, response.status || 200, response.body || '');
        } else {
          send(res, 200);
        }
      }
    } else {
      send(res, 405);
    }
  };
}

export default createRequestHandler;
