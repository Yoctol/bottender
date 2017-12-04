export default {
  messenger: {
    accessToken: '__PUT_YOUR_ACCESS_TOKEN_HERE__',
    verifyToken: '__PUT_YOUR_VERITY_TOKEN_HERE__',
    appId: '__PUT_YOUR_APP_ID_HERE__',
    appSecret: '__PUT_YOUR_APP_SECRET_HERE__',
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
              type: 'postback',
              title: '__TITLE_HERE__',
              payload: '__PAYLOAD_HERE__',
            },
            {
              type: 'web_url',
              title: '__TITLE_HERE__',
              url: 'http://example.com',
              webview_height_ratio: 'tall',
            },
          ],
        },
      ],
      greeting: [
        {
          locale: 'default',
          text: 'Hello!',
        },
      ],
      whitelisted_domains: ['http://example.com'],
    },
  },
  line: {
    channelSecret: '__PUT_YOUR_CHANNEL_SECRET_HERE__',
    accessToken: '__PUT_YOUR_ACCESS_TOKEN_HERE__',
    richMenus: [
      {
        size: {
          width: 2500,
          height: 1686,
        },
        selected: false,
        name: 'Nice richmenu',
        chatBarText: 'Tap here',
        areas: [
          {
            bounds: {
              x: 0,
              y: 0,
              width: 2500,
              height: 1686,
            },
            action: {
              type: 'postback',
              data: 'action=buy&itemid=123',
            },
          },
        ],
      },
    ],
  },
  telegram: {
    accessToken: '__PUT_YOUR_ACCESS_TOKEN_HERE__',
  },
  slack: {
    accessToken: '__PUT_YOUR_ACCESS_TOKEN_HERE__',
  },
  ngrok: true,
};
