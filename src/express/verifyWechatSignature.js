const verifyWechatSignature = bot => (req, res, next) => {
  if (
    true // FIXME
  ) {
    return next();
  }
  const error = {
    message: 'Wechat Signature Validation Failed!',
    request: {
      rawBody: req.rawBody,
      headers: {
        'x-hub-signature': req.headers['x-hub-signature'],
      },
    },
  };
  console.error(error);
  res.status(400);
  res.send({ error });
};

export default verifyWechatSignature;
