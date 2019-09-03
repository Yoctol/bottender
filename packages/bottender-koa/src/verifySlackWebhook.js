const verifySlackWebhook = () => ({ request, response }, next) => {
  if (request.body.type === 'url_verification') {
    response.body = request.body.challenge;
  } else {
    return next();
  }
};

export default verifySlackWebhook;
