const verifyLINESignature = bot => (req, res, next) => {
  if (
    bot.connector.verifySignature(req.rawBody, req.headers['x-line-signature'])
  ) {
    return next();
  }
  const error = {
    message: 'LINE Signature Validation Failed!',
    request: {
      rawBody: req.rawBody,
      headers: {
        'x-line-signature': req.headers['x-line-signature'],
      },
    },
  };
  console.error(error);
  res.status(400);
  res.send({ error });
};

export default verifyLINESignature;
