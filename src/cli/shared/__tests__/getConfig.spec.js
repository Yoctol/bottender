jest.mock('fs');

const setup = () => {
  const MOCK_FILE_WITH_PLATFORM = {
    messenger: {
      accessToken: '__FAKE_ACCESS_TOKEN_WITH_PLATFORM__',
      verifyToken: '__FAKE_VERIFY_TOKEN_WITH_PLATFORM__',
      appId: '__FAKE_APP_ID_WITH_PLATFORM__',
      appSecret: '__FAKE_APP_SECRET_WITH_PLATFORM__',
    },
    LINE: {
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

  const configPath = 'bot.sample.json';
  const platform = 'messenger';
  const config = getConfig(configPath, platform);
  expect(config).toEqual({
    accessToken: '__FAKE_ACCESS_TOKEN_WITH_PLATFORM__',
    verifyToken: '__FAKE_VERIFY_TOKEN_WITH_PLATFORM__',
    appId: '__FAKE_APP_ID_WITH_PLATFORM__',
    appSecret: '__FAKE_APP_SECRET_WITH_PLATFORM__',
  });
});

it('read the config file without platform key', () => {
  const { MOCK_FILE } = setup();
  require('fs').__setMockFiles(MOCK_FILE); // eslint-disable-line global-require

  const configPath = 'bot.sample.json';
  const platform = 'messenger';
  const config = getConfig(configPath, platform);
  expect(config).toEqual({
    accessToken: '__FAKE_ACCESS_TOKEN__',
    verifyToken: '__FAKE_VERIFY_TOKEN__',
    appId: '__FAKE_APP_ID__',
    appSecret: '__FAKE_APP_SECRET__',
  });
});
