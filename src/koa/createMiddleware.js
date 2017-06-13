function createMiddleware(bot) {
  const requestHandler = bot.createRequestHandler();
  return async ({ request, response }) => {
    await requestHandler(request.body);
    response.status = 200;
  };
}

export default createMiddleware;
