const verifyLineSignature = bot => ({ request, response }, next) => {
  if (
    bot.connector.verifySignature(
      request.rawBody,
      request.headers['x-line-signature']
    )
  ) {
    return next();
  }
  const error = {
    message: 'LINE Signature Validation Failed!',
    request: {
      rawBody: request.rawBody,
      headers: {
        'x-line-signature': request.headers['x-line-signature'],
      },
    },
  };
  console.error(error);
  response.status = 400;
  response.body = { error };
};

export default verifyLineSignature;
