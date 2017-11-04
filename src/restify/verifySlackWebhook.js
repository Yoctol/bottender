const verifySlackWebhook = () => (req, res, next) => {
  const { body, params } = req;

  if (params && params.type && params.type === 'url_verification') {
    res.end(req.params.challenge);
  } else if (body && body.type && body.type === 'url_verification') {
    res.end(req.body.challenge);
  }

  return next();
};

export default verifySlackWebhook;
