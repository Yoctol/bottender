const verifySlackrWebhook = () => (req, res, next) => {
  if (req.params.type === 'url_verification') {
    res.end(req.params.challenge);
  }
  return next();
};

export default verifySlackrWebhook;
