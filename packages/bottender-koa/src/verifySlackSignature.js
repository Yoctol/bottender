const verifySlackSignature = bot => ({ request, response }, next) => {
  if (bot.connector.verifySignature(request.body.token)) {
    return next();
  }
  const error = {
    message: 'Slack Verification Token Validation Failed!',
    request: {
      body: request.body,
    },
  };
  console.error(error);
  response.status = 400;
  response.body = { error };
};

export default verifySlackSignature;
