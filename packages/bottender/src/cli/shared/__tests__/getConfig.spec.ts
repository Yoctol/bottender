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
    },
  };

  return {
    MOCK_FILE_WITH_PLATFORM,
  };
};

let getBottenderConfig;
let Joi;
let getConfig;

beforeEach(() => {
  getBottenderConfig = require('../getBottenderConfig').default; // eslint-disable-line global-require
  Joi = require('@hapi/joi'); // eslint-disable-line global-require
  getConfig = require('../getConfig').default; // eslint-disable-line global-require
});

it('be defined', () => {
  expect(getConfig).toBeDefined();
});

it('read the config file with platform key', () => {
  const { MOCK_FILE_WITH_PLATFORM } = setup();

  getBottenderConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM);

  const platform = 'messenger';
  const config = getConfig(platform);
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

describe('Joi validate', () => {
  it('should validate as default', () => {
    const { MOCK_FILE_WITH_PLATFORM } = setup();
    getBottenderConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM);

    const platform = 'messenger';

    const spy = jest.spyOn(Joi, 'validate');
    getConfig(platform);

    expect(spy).toBeCalled();

    spy.mockReset();
    spy.mockRestore();
  });

  it('should throw error if validate failed', () => {
    const { MOCK_FILE_WITH_PLATFORM } = setup();
    // slack.accessToken should be string type originally
    MOCK_FILE_WITH_PLATFORM.channels.slack.accessToken = 12345;

    getBottenderConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM);

    const platform = 'messenger';

    const spy = jest.spyOn(Joi, 'validate');

    expect(() => {
      getConfig(platform);
    }).toThrow();
    expect(spy).toHaveBeenCalled();

    spy.mockReset();
    spy.mockRestore();
  });

  it('should pass validate when with `--skip-validate`', () => {
    const { MOCK_FILE_WITH_PLATFORM } = setup();
    getBottenderConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM);
    process.argv = [
      'node',
      'cli/index.js',
      'messenger',
      'profile',
      'set',
      '--skip-validate',
    ];

    const platform = 'messenger';

    const spy = jest.spyOn(Joi, 'validate');
    getConfig(platform);

    expect(spy).not.toBeCalled();

    spy.mockReset();
    spy.mockRestore();
  });
});
