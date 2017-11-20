const _chatbase = require('@google/chatbase');

module.exports = function chatbaseMiddleware(bot, { apiKey, platform }) {
  const chatbase = _chatbase.setApiKey(apiKey).setPlatform(platform);

  const { client } = bot.connector;
  const axios = client.getHTTPClient();

  // Add a response interceptor
  axios.interceptors.response.use(response => {
    const { config } = response;
    if (/graph\.facebook\.com.*\/me\/messages/.test(config.url)) {
      const { recipient: { id }, message: { text } } = JSON.parse(config.data);

      chatbase
        .newMessage()
        .setAsTypeAgent()
        .setUserId(id)
        .setTimestamp(Date.now().toString())
        .setMessage(text)
        .send()
        .catch(e => console.error(e));
    }
    return response;
  });

  return (req, res, next) => {
    const {
      sender: { id },
      message: { text },
    } = req.body.entry[0].messaging[0];

    chatbase
      .newMessage()
      .setAsTypeUser()
      .setUserId(id)
      .setTimestamp(Date.now().toString())
      .setMessage(text)
      .send()
      .catch(e => console.error(e));

    next();
  };
};
