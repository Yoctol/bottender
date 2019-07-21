module.exports = {
  messenger: {
    appId: '__PUT_YOUR_APP_ID_HERE__',
    appSecret: '__PUT_YOUR_APP_SECRET_HERE__',
    accessToken: '__PUT_YOUR_ACCESS_TOKEN_HERE__',
    verifyToken: '__PUT_YOUR_VERITY_TOKEN_HERE__',
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
};
