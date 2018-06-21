import isEmpty from 'lodash/isEmpty';

function createMiddleware(bot) {
  const requestHandler = bot.createRequestHandler();
  return async (req, res, next) => {
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
