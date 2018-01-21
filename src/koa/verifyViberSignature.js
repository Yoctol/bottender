const verifyViberSignature = bot => ({ request, response }, next) => {
  if (
    bot.connector.verifySignature(
      request.rawBody,
      request.headers['x-viber-content-signature']
    )
  ) {
    return next();
  }
  const error = {
    message: 'Viber Signature Validation Failed!',
    request: {
      rawBody: request.rawBody,
      headers: {
        'x-viber-content-signature':
          request.headers['x-viber-content-signature'],
      },
    },
  };
  console.error(error);
  response.status = 400;
  response.body = { error };
};

export default verifyViberSignature;
