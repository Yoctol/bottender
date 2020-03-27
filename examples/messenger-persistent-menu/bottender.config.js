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
      profile: {
        getStarted: {
          payload: 'GET_STARTED',
        },
        persistentMenu: [
          {
            locale: 'default',
            composerInputDisabled: false,
            callToActions: [
              {
                type: 'web_url',
                title: 'URL 1',
                url: 'http://bottender.js.org',
              },
              {
                type: 'web_url',
                title: 'URL 2',
                url: 'http://bottender.js.org',
              },
              {
                type: 'web_url',
                title: 'URL 3',
                url: 'http://bottender.js.org',
              },
            ],
          },
        ],
      },
    },
  },
};
