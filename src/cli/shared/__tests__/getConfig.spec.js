jest.mock('fs');

const setup = () => {
  const MOCK_FILE_WITH_PLATFORM = {
    messenger: {
      accessToken: '__FAKE_ACCESS_TOKEN_WITH_PLATFORM__',
      verifyToken: '__FAKE_VERIFY_TOKEN_WITH_PLATFORM__',
      appId: '__FAKE_APP_ID_WITH_PLATFORM__',
      appSecret: '__FAKE_APP_SECRET_WITH_PLATFORM__',
    },
    line: {
      channelSecret: '__FAKE_CHANNEL_SECRET_WITH_PLATFORM__',
      accessToken: '__FAKE_ACCESS_TOKEN_WITH_PLATFORM__',
    },
  };
  const MOCK_FILE = {
    accessToken: '__FAKE_ACCESS_TOKEN__',
    verifyToken: '__FAKE_VERIFY_TOKEN__',
    appId: '__FAKE_APP_ID__',
    appSecret: '__FAKE_APP_SECRET__',
  };
  return {
    MOCK_FILE_WITH_PLATFORM,
    MOCK_FILE,
  };
};

let getConfig;
beforeEach(() => {
  getConfig = require('../getConfig'); // eslint-disable-line global-require
});

it('be defined', () => {
  expect(getConfig).toBeDefined();
});

it('read the config file with platform key', () => {
  const { MOCK_FILE_WITH_PLATFORM } = setup();
  require('fs').__setMockFiles(MOCK_FILE_WITH_PLATFORM); // eslint-disable-line global-require

  const configPath = 'bottender.config.sample.js';
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

it('read the config file without platform key', () => {
  const { MOCK_FILE } = setup();
  require('fs').__setMockFiles(MOCK_FILE); // eslint-disable-line global-require

  const configPath = 'bottender.config.sample.js';
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
