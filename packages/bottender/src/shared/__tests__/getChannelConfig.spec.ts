jest.mock('../getBottenderConfig');

const setup = () => {
  const MOCK_FILE_WITH_PLATFORM = {
    channels: {
      messenger: {
        accessToken: '__PUT_YOUR_ACCESS_TOKEN_HERE__',
        verifyToken: '__PUT_YOUR_VERITY_TOKEN_HERE__',
        appId: '__PUT_YOUR_APP_ID_HERE__',
        appSecret: '__PUT_YOUR_APP_SECRET_HERE__',
        profile: {
          getStarted: {
            payload: 'GET_STARTED',
          },
          persistentMenu: [
            {
              locale: 'default',
              composerInputDisabled: false,
              callToActions: [
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
          whitelistedDomains: ['http://example.com'],
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
    },
  };

  return {
    MOCK_FILE_WITH_PLATFORM,
  };
};

let getBottenderConfig;
let getChannelConfig;

beforeEach(() => {
  getBottenderConfig = require('../getBottenderConfig').default; // eslint-disable-line global-require
  getChannelConfig = require('../getChannelConfig').default; // eslint-disable-line global-require
});

it('be defined', () => {
  expect(getChannelConfig).toBeDefined();
});

it('read the config file with platform key', () => {
  const { MOCK_FILE_WITH_PLATFORM } = setup();

  getBottenderConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM);

  const platform = 'messenger';
  const config = getChannelConfig(platform);
  expect(config).toEqual({
    accessToken: '__PUT_YOUR_ACCESS_TOKEN_HERE__',
    verifyToken: '__PUT_YOUR_VERITY_TOKEN_HERE__',
    appId: '__PUT_YOUR_APP_ID_HERE__',
    appSecret: '__PUT_YOUR_APP_SECRET_HERE__',
    profile: {
      getStarted: {
        payload: 'GET_STARTED',
      },
      persistentMenu: [
        {
          locale: 'default',
          composerInputDisabled: false,
          callToActions: [
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
      whitelistedDomains: ['http://example.com'],
    },
  });
});

describe('Joi validate', () => {
  it('should validate as default', () => {
    const { MOCK_FILE_WITH_PLATFORM } = setup();
    getBottenderConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM);

    const platform = 'messenger';

    expect(() => {
      getChannelConfig(platform);
    }).not.toThrow();
  });

  it('should throw error if validate failed', () => {
    const { MOCK_FILE_WITH_PLATFORM } = setup();

    // messenger.accessToken should be string type originally
    MOCK_FILE_WITH_PLATFORM.channels.messenger.accessToken = 12345;

    getBottenderConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM);

    expect(() => {
      getChannelConfig('messenger');
    }).toThrow();
  });
});
