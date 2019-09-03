const verifySlackSignature = bot => (req, res, next) => {
  if (bot.connector.verifySignature(req.body.token)) {
    return next();
  }
  const error = {
    message: 'Slack Verification Token Validation Failed!',
    request: {
      body: req.body,
    },
  };
  console.error(error);
  res.status(400);
  res.send({ error });
};

export default verifySlackSignature;
