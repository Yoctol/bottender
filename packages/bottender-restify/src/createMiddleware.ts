import isEmpty from 'lodash/isEmpty';
import { Next, Request, Response } from 'restify';

import { Bot } from './types';

function createMiddleware(bot: Bot) {
  const requestHandler = bot.createRequestHandler();
  return async (req: Request, res: Response, next: Next): Promise<void> => {
    if (isEmpty(req.query) && !req.body) {
      throw new Error(
        'createMiddleware(): Missing query and body, you may need a body parser. Use `restify.plugins.bodyParser()` before this middleware.'
      );
    }

    const response = await requestHandler(
      {
        ...req.query,
        ...req.body,
      },
      {
        req,
        res,
      }
    );
    if (response) {
      res.send(response.status || 200, response.body || '', response.headers);
    } else {
      res.send(200);
    }
    return next();
  };
}

export default createMiddleware;
