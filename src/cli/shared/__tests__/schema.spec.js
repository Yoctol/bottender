import Joi from 'joi';

import schema from '../schema';

const config = {
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

const nestedConfig = {
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
  line: {
    channelSecret: '__PUT_YOUR_CHANNEL_SECRET_HERE__',
    accessToken: '__PUT_YOUR_ACCESS_TOKEN_HERE__',
    richMenus: [
      {
        size: {
          width: 1250,
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
              width: 1250,
              height: 1686,
            },
            action: {
              type: 'postback',
              data: 'action=buy&itemid=123',
            },
          },
        ],
      },
      {
        size: {
          width: 1250,
          height: 1686,
        },
        selected: false,
        name: 'Nice richmenu 2',
        chatBarText: 'Touch me',
        areas: [
          {
            bounds: {
              x: 1250,
              y: 0,
              width: 1250,
              height: 1686,
            },
            action: {
              type: 'postback',
              data: 'action=sell&itemid=123',
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

const tooManyLineRichMenusConfig = {
  line: {
    channelSecret: '__PUT_YOUR_CHANNEL_SECRET_HERE__',
    accessToken: '__PUT_YOUR_ACCESS_TOKEN_HERE__',
    richMenus: Array.from(new Array(11), (_, index) => ({
      size: {
        width: 1250,
        height: 1686,
      },
      selected: false,
      name: `Nice richmenu ${index}`,
      chatBarText: 'Tap here',
      areas: [
        {
          bounds: {
            x: index * 5,
            y: index * 5,
            width: 5,
            height: 5,
          },
          action: {
            type: 'postback',
            data: `action=buy&itemid=${index}`,
          },
        },
      ],
    })),
  },
};

it('should valid', () => {
  const validateResult = Joi.validate(config, schema);
  expect(validateResult.error).toBeNull();
});

it('should valid nested config', () => {
  const validateResult = Joi.validate(nestedConfig, schema);
  expect(validateResult.error).toBeNull();
});

it('should check too many LINE rich menus', () => {
  const validateResult = Joi.validate(tooManyLineRichMenusConfig, schema);
  expect(validateResult.error).not.toBeNull();
  expect(validateResult.error.message).toBe(
    'child "line" fails because [child "richMenus" fails because ["richMenus" must contain less than or equal to 10 items]]'
  );
});
