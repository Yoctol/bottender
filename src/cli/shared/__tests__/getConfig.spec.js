jest.mock('import-fresh');

const setup = () => {
  const MOCK_FILE_WITH_PLATFORM = {
    messenger: {
      accessToken: '__PUT_YOUR_ACCESS_TOKEN_HERE__',
      verifyToken: '__PUT_YOUR_VERITY_TOKEN_HERE__',
      appId: '__PUT_YOUR_APP_ID_HERE__',
      appSecret: '__PUT_YOUR_APP_SECRET_HERE__',
      persistentMenu: [
        {
          type: 'postback',
          title: '__TITLE_HERE__',
          payload: '__PAYLOAD_HERE__',
        },
        {
          type: 'web_url',
          title: '__TITLE_HERE__',
          url: '__URL_HERE__',
        },
      ],
      composerInputDisabled: false,
      domainWhitelist: ['http://example.com', 'http://facebook.com'],
      getStartedButtonPayload: '__PUT_YOUR_PAYLOAD_HERE__',
    },
    line: {
      channelSecret: '__FAKE_CHANNEL_SECRET_WITH_PLATFORM__',
      accessToken: '__FAKE_ACCESS_TOKEN_WITH_PLATFORM__',
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
    persistentMenu: [
      {
        type: 'postback',
        title: '__TITLE_HERE__',
        payload: '__PAYLOAD_HERE__',
      },
      {
        type: 'web_url',
        title: '__TITLE_HERE__',
        url: '__URL_HERE__',
      },
    ],
    composerInputDisabled: false,
    domainWhitelist: ['http://example.com', 'http://facebook.com'],
    getStartedButtonPayload: '__PUT_YOUR_PAYLOAD_HERE__',
  });
});
