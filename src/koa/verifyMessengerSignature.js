const verifyMessengerSignature = bot => ({ request, response }, next) => {
  if (
    bot.connector.verifySignature(
      request.rawBody,
      request.header['x-hub-signature']
    )
  ) {
    return next();
  }
  const error = {
    message: 'Messenger Signature Validation Failed!',
    request: {
      rawBody: request.rawBody,
      header: {
        'x-hub-signature': request.header['x-hub-signature'],
      },
    },
  };
  console.error(error);
  response.status = 400;
  response.body = { error };
};

export default verifyMessengerSignature;
