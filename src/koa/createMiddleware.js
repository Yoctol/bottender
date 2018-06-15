import isEmpty from 'lodash/isEmpty';

function createMiddleware(bot) {
  const requestHandler = bot.createRequestHandler();
  return async ({ request, response }) => {
    if (isEmpty(request.query) && !request.body) {
      throw new Error(
        'createMiddleware(): Missing body parser. Use `koa-bodyparser` or other similar package before this middleware.'
      );
    }

    const res = await requestHandler({
      ...request.query,
      ...request.body,
    });
    if (res) {
      response.set(res.headers || {});
      response.status = res.status || 200;
      response.body = res.body || '';
    } else {
      response.body = '';
      response.status = 200;
    }
  };
}

export default createMiddleware;
