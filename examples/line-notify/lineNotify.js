const querystring = require('querystring');

const axios = require('axios');

function getAuthLink(clientId, redirectUrl, state) {
  const data = {
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUrl,
    scope: 'notify',
    state,
  };
  querystring.encode(data);
  return `https://notify-bot.line.me/oauth/authorize?${querystring.encode(
    data
  )}`;
}

async function getToken(code, redirectUri, clientId, clientSecret) {
  const url = 'https://notify-bot.line.me/oauth/token';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const formData = {
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
  };
  return axios.post(url, querystring.encode(formData), { headers });
}

async function sendNotify(token, message) {
  const url = 'https://notify-api.line.me/api/notify';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${token}`,
  };
  const formData = {
    message,
  };
  return axios.post(url, querystring.encode(formData), { headers });
}

module.exports = {
  getAuthLink,
  getToken,
  sendNotify,
};
