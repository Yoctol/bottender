const _botimize = require('botimize');

module.exports = function botimizeMiddleware(bot, { apiKey, platform }) {
  const botimize = _botimize(apiKey, platform);

  const { client } = bot.connector;
  const accessToken = client._accessToken;
  const axios = client.getHTTPClient();

  // Add a response interceptor
  axios.interceptors.response.use(response => {
    const { config } = response;
    if (
      /graph\.facebook\.com.*\/me\/messages/.test(config.url) || // Messenger
      /api\.line\.me\/v2\/bot\/message/.test(config.url) || // LINE
      /api\.telegram\.org.*\/send/.test(config.url) // Telegram
    ) {
      botimize.logOutgoing(
        { ...JSON.parse(config.data), accessToken },
        { parse: 'pure' }
      );
    }
    return response;
  });

  return (req, res, next) => {
    botimize.logIncoming({
      ...req.body,
      accessToken,
    });
    next();
  };
};
