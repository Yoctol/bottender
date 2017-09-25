const verifyMessenferSignature = bot => (req, res, next) => {
  if (
    bot.connector.verifySignature(req.rawBody, req.header['x-hub-signature'])
  ) {
    return next();
  }
  const error = {
    message: 'Messenger Signature Validation Failed!',
    request: {
      rawBody: req.rawBody,
      headers: {
        'x-hub-signature': req.header['x-hub-signature'],
      },
    },
  };
  console.error(error);
  res.status(400);
  res.send({ error });
};

export default verifyMessenferSignature;
