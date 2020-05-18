const { isError613 } = require('messenger-batch');

const {
  PAGE_1_PAGE_ID,
  PAGE_1_ACCESS_TOKEN,
  PAGE_2_PAGE_ID,
  PAGE_2_ACCESS_TOKEN,
} = process.env;

/**
 * The example show how to map pages to tokens from (id, token) set,
 * but you can dynamically load tokens from SQL database, mongodb, redis, REST API ...
 * or whatever you want.
 */
const mapPageToAccessToken = pageId => {
  switch (pageId) {
    case PAGE_1_PAGE_ID:
      return PAGE_1_ACCESS_TOKEN;
    case PAGE_2_PAGE_ID:
    default:
      return PAGE_2_ACCESS_TOKEN;
  }
};

module.exports = {
  channels: {
    messenger: {
      enabled: true,
      path: '/webhooks/messenger',
      accessToken: process.env.MESSENGER_ACCESS_TOKEN,
      appId: process.env.MESSENGER_APP_ID,
      appSecret: process.env.MESSENGER_APP_SECRET,
      verifyToken: process.env.MESSENGER_VERIFY_TOKEN,
      mapPageToAccessToken,
      batchConfig: {
        delay: 1000,
        shouldRetry: isError613, // (#613) Calls to this api have exceeded the rate limit.
        retryTimes: 2,
      },
    },
  },
};
