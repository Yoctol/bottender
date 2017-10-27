jest.mock('import-fresh');

const setup = () => {
  const MOCK_FILE_WITH_PLATFORM = {
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
    },
    telegram: {
      accessToken: '__PUT_YOUR_ACCESS_TOKEN_HERE__',
    },
    slack: {
      accessToken: '__PUT_YOUR_ACCESS_TOKEN_HERE__',
    },
  };

  return {
    MOCK_FILE_WITH_PLATFORM,
  };
};

let getConfig;
let importFresh;
beforeEach(() => {
  importFresh = require('import-fresh'); // eslint-disable-line global-require
  getConfig = require('../getConfig'); // eslint-disable-line global-require
});

it('be defined', () => {
  expect(getConfig).toBeDefined();
});

it('read the config file with platform key', () => {
  const { MOCK_FILE_WITH_PLATFORM } = setup();

  importFresh.mockReturnValue(MOCK_FILE_WITH_PLATFORM);

  const configPath = 'bottender.config.js';
  const platform = 'messenger';
  const config = getConfig(configPath, platform);
  expect(config).toEqual({
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
  });
});
