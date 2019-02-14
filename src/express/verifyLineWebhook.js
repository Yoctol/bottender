const verifyLineWebhook = bot => (req, res, next) => {
  if (bot.connector.isWebhookVerifyRequest(req.body)) {
    res.sendStatus(200);
  } else {
    return next();
  }
};

export default verifyLineWebhook;
