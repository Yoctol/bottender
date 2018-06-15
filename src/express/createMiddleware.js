function createMiddleware(bot) {
  const requestHandler = bot.createRequestHandler();

  const wrapper = fn => (req, res, next) =>
    fn(req, res).catch(err => next(err));

  return wrapper(async (req, res) => {
    if (!req.query && !req.body) {
      throw new Error(
        'createMiddleware(): Missing body parser. Use `body-parser` or other similar package before this middleware.'
      );
    }
    const response = await requestHandler({
      ...req.query,
      ...req.body,
    });
    if (response) {
      res.set(response.headers || {});
      res.status(response.status || 200);
      res.send(response.body || '');
    } else {
      res.status(200);
      res.send('');
    }
  });
}

export default createMiddleware;
