const verifyViberSignature = bot => (req, res, next) => {
  if (
    bot.connector.verifySignature(
      req.rawBody,
      req.headers['x-viber-content-signature']
    )
  ) {
    return next();
  }
  const error = {
    message: 'Viber Signature Validation Failed!',
    request: {
      rawBody: req.rawBody,
      headers: {
        'x-viber-content-signature': req.headers['x-viber-content-signature'],
      },
    },
  };
  console.error(error);
  res.status(400);
  res.send({ error });
};

export default verifyViberSignature;
