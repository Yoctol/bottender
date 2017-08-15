const verifyLINESignature = bot => ({ request, response }, next) => {
  if (
    bot.connector.verifySignature(
      request.rawBody,
      request.header['x-line-signature']
    )
  ) {
    return next();
  }
  const error = {
    message: 'LINE Signature Validation Failed!',
    request: {
      rawBody: request.rawBody,
      header: {
        'x-line-signature': request.header['x-line-signature'],
      },
    },
  };
  console.error(error);
  response.status = 400;
  response.body = { error };
};

export default verifyLINESignature;
