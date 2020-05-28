const { FacebookConnector } = require('@bottender/facebook');

module.exports = {
  channels: {
    facebook: {
      enabled: true,
      path: '/webhooks/facebook',
      connector: new FacebookConnector({
        pageId: process.env.FACEBOOK_PAGE_ID,
        accessToken: process.env.FACEBOOK_ACCESS_TOKEN,
        appId: process.env.FACEBOOK_APP_ID,
        appSecret: process.env.FACEBOOK_APP_SECRET,
        verifyToken: process.env.FACEBOOK_VERIFY_TOKEN,
      }),
    },
  },
};
