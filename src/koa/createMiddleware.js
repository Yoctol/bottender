function createMiddleware(bot) {
  const requestHandler = bot.createRequestHandler();
  return async ({ request, response }) => {
    if (!request.body) {
      throw new Error(
        'createMiddleware(): Missing body parser. Use `koa-bodyparser` or other similar package before this middleware.'
      );
    }
    await requestHandler(request.body);
    response.status = 200;
  };
}

export default createMiddleware;
