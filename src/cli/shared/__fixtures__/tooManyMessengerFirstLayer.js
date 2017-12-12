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
          composer_input_disabled: true,
          call_to_actions: [
            {
              title: 'My Account',
              type: 'nested',
              call_to_actions: [
                {
                  title: 'My Account',
                  type: 'nested',
                  call_to_actions: [
                    {
                      title: 'Contact Info',
                      type: 'postback',
                      payload: 'CONTACT_INFO_PAYLOAD',
                    },
                  ],
                },
                {
                  title: 'Pay Bill',
                  type: 'postback',
                  payload: 'PAYBILL_PAYLOAD',
                },
                {
                  title: 'History',
                  type: 'postback',
                  payload: 'HISTORY_PAYLOAD',
                },
                {
                  title: 'Contact Info',
                  type: 'postback',
                  payload: 'CONTACT_INFO_PAYLOAD',
                },
              ],
            },
            {
              type: 'web_url',
              title: 'Latest News',
              url: 'http://petershats.parseapp.com/hat-news',
              webview_height_ratio: 'full',
            },
            {
              type: 'web_url',
              title: 'Latest News',
              url: 'http://petershats.parseapp.com/hat-news',
              webview_height_ratio: 'full',
            },
            {
              type: 'web_url',
              title: 'Latest News',
              url: 'http://petershats.parseapp.com/hat-news',
              webview_height_ratio: 'full',
            },
          ],
        },
        {
          locale: 'zh_CN',
          composer_input_disabled: false,
          call_to_actions: [
            {
              title: 'Pay Bill',
              type: 'postback',
              payload: 'PAYBILL_PAYLOAD',
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
};
