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
        get_started: {
          payload: 'GET_STARTED',
        },
        persistent_menu: [
          {
            locale: 'default',
            composer_input_disabled: false,
            call_to_actions: [
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
