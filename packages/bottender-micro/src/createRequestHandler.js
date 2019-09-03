import url from 'url';

import parseUrlencoded from 'urlencoded-body-parser';
import { json, send, text } from 'micro';

function createRequestHandler(bot, config = {}) {
  const path = config.path || '/';

  const requestHandler = bot.createRequestHandler();
  return async (req, res) => {
    const requestPath = req.url.split('?')[0];

    if (requestPath !== path) {
      send(res, 404);
    }

    const { query } = url.parse(req.url, true);
    const [rawBody, body] = await Promise.all(
      req.method === 'POST'
        ? [
            text(req),
            req.headers['content-type'] === 'application/x-www-form-urlencoded'
              ? parseUrlencoded(req)
              : json(req),
          ]
        : ['', '']
    );

    const { shouldNext, response } = bot.connector.preprocess({
      method: req.method,
      headers: req.headers,
      query,
      rawBody,
      body,
    });

    if (!shouldNext) {
      if (response) {
        send(res, response.status || 200, response.body || '');
      }
      return;
    }

    const handlerResponse = await requestHandler(
      {
        ...query,
        ...body,
      },
      {
        req,
        res,
      }
    );
    if (handlerResponse) {
      Object.keys(handlerResponse.headers).forEach(key => {
        res.setHeader(key, handlerResponse.headers[key]);
      });
      send(res, handlerResponse.status || 200, handlerResponse.body || '');
    } else {
      send(res, 200);
    }
  };
}

export default createRequestHandler;
