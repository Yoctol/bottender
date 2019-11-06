const { isError613 } = require('messenger-batch');

module.exports = {
  channels: {
    messenger: {
      enabled: true,
      path: '/webhooks/messenger',
      pageId: process.env.MESSENGER_PAGE_ID,
      accessToken: process.env.MESSENGER_ACCESS_TOKEN,
      appId: process.env.MESSENGER_APP_ID,
      appSecret: process.env.MESSENGER_APP_SECRET,
      verifyToken: process.env.MESSENGER_VERIFY_TOKEN,
      batchConfig: {
        delay: 1000,
        shouldRetry: isError613, // (#613) Calls to this api have exceeded the rate limit.
        retryTimes: 2,
      },
    },
  },
};
