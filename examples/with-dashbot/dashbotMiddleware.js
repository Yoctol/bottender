const _dashbot = require('dashbot');

module.exports = function dashbotMiddleware(bot, { apiKey, platform }) {
  const dashbot = _dashbot(apiKey)[platform];

  const { client } = bot.connector;
  const accessToken = client._accessToken;
  const axios = client.axios;

  // Add a response interceptor
  axios.interceptors.response.use(response => {
    const { config } = response;
    if (/graph\.facebook\.com.*\/me\/messages/.test(config.url)) {
      const { recipient: { id }, message: { text } } = JSON.parse(config.data);
      const requestData = {
        url: `https://graph.facebook.com/v${client.version}/me/messages`,
        qs: { access_token: accessToken },
        method: 'POST',
        json: {
          recipient: { id },
          message: {
            text,
          },
        },
      };

      dashbot.logOutgoing(requestData, response.body);
    }
    return response;
  });

  return (req, res, next) => {
    dashbot.logIncoming(req.body);

    next();
  };
};
