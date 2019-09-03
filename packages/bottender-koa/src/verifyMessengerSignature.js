const verifyMessengerSignature = bot => ({ request, response }, next) => {
  if (
    bot.connector.verifySignature(
      request.rawBody,
      request.headers['x-hub-signature']
    )
  ) {
    return next();
  }
  const error = {
    message: 'Messenger Signature Validation Failed!',
    request: {
      rawBody: request.rawBody,
      headers: {
        'x-hub-signature': request.headers['x-hub-signature'],
      },
    },
  };
  console.error(error);
  response.status = 400;
  response.body = { error };
};

export default verifyMessengerSignature;
