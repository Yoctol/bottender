require('dotenv').config();

module.exports = {
  messenger: {
    accessToken: process.env.ACCESS_TOKEN,
    verifyToken: process.env.VERIFY_TOKEN,
    appId: process.env.APP_ID,
    appSecret: process.env.APP_SECRET,
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
              title: 'Open Chat Extensions',
              url: 'https://your.domain.tw/index.html',
              messenger_extensions: true,
            },
          ],
        },
      ],
      greeting: [
        {
          locale: 'default',
          text: 'Hello! Welcome to use this bot!',
        },
      ],
      whitelisted_domains: ['https://your.domain.tw'],
      home_url: {
        url: 'https://your.domain.tw/index.html',
        webview_height_ratio: 'tall',
        webview_share_button: 'show',
        in_test: true,
      },
    },
  },
};
