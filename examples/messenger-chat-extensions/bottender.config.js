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
              title: 'Open Chat Extensions',
              url: 'https://your.domain.tw/index.html',
              messenger_extensions: true,
            },
          ],
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
