import { setMessengerProfile } from '../profile';

jest.mock('messaging-api-messenger');
jest.mock('warning');

jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const { MessengerClient } = require('messaging-api-messenger');

const log = require('../../../shared/log');
const getConfig = require('../../../shared/getConfig');

const MOCK_FILE_WITH_PLATFORM = {
  messenger: {
    accessToken: '__FAKE_TOKEN__',
    profile: {
      get_started: {
        payload: '<GET_STARTED_PAYLOAD>',
      },
      persistent_menu: [
        {
          locale: 'default',
          composer_input_disabled: false,
          call_to_actions: [
            {
              type: 'web_url',
              title: 'Powered by Example',
              url: 'https://www.example.com/',
            },
          ],
        },
      ],
    },
  },
};

let _client;
const _exit = process.exit;

beforeEach(() => {
  process.NODE_ENV = 'test';
  process.exit = jest.fn();
  _client = {
    setMessengerProfile: jest.fn(),
    deleteMessengerProfile: jest.fn(),
    getMessengerProfile: jest.fn(),
  };
  _client.getMessengerProfile.mockReturnValue([
    {
      persistent_menu: [
        {
          locale: 'default',
          composer_input_disabled: false,
          call_to_actions: [
            {
              type: 'web_url',
              title: 'Powered by Example',
              url: 'https://www.example.com/',
            },
          ],
        },
      ],
    },
  ]);
  MessengerClient.connect = jest.fn(() => _client);
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.messenger);
});

afterEach(() => {
  process.exit = _exit;
});

it('be defined', () => {
  expect(setMessengerProfile).toBeDefined();
});

describe('resolve', () => {
  describe('--force', () => {
    it('will delete all fields and set profile', async () => {
      const ctx = {
        argv: { '--force': true },
      };
      await setMessengerProfile(ctx);
      expect(_client.deleteMessengerProfile).toBeCalledWith([
        'account_linking_url',
        'persistent_menu',
        'get_started',
        'greeting',
        'whitelisted_domains',
        'payment_settings',
        'target_audience',
        'home_url',
      ]);
      expect(_client.setMessengerProfile).toBeCalledWith({
        get_started: {
          payload: '<GET_STARTED_PAYLOAD>',
        },
        persistent_menu: [
          {
            locale: 'default',
            composer_input_disabled: false,
            call_to_actions: [
              {
                type: 'web_url',
                title: 'Powered by Example',
                url: 'https://www.example.com/',
              },
            ],
          },
        ],
      });
    });

    it('--token should work', async () => {
      const ctx = {
        argv: { '--token': '12345' },
      };

      await setMessengerProfile(ctx);

      expect(MessengerClient.connect).toBeCalledWith('12345');
    });

    it('should set whole profile once', async () => {
      const ctx = {
        argv: {
          '--force': true,
        },
      };
      getConfig.mockReturnValue({
        accessToken: '__FAKE_TOKEN__',
        profile: {
          get_started: {
            payload: '<GET_STARTED_PAYLOAD>',
          },
          persistent_menu: [
            {
              locale: 'default',
              composer_input_disabled: false,
              call_to_actions: [
                {
                  type: 'web_url',
                  title: 'Open Chat Extensions',
                  url: 'http://example.com/index.html',
                  messenger_extensions: true,
                },
              ],
            },
          ],
        },
      });

      await setMessengerProfile(ctx);

      expect(_client.setMessengerProfile).toBeCalledWith({
        get_started: {
          payload: '<GET_STARTED_PAYLOAD>',
        },
        persistent_menu: [
          {
            locale: 'default',
            composer_input_disabled: false,
            call_to_actions: [
              {
                type: 'web_url',
                title: 'Open Chat Extensions',
                url: 'http://example.com/index.html',
                messenger_extensions: true,
              },
            ],
          },
        ],
      });
    });

    it('should set whitelisted_domains before other fields', async () => {
      const ctx = {
        argv: {
          '--force': true,
        },
      };
      getConfig.mockReturnValue({
        accessToken: '__FAKE_TOKEN__',
        profile: {
          get_started: {
            payload: '<GET_STARTED_PAYLOAD>',
          },
          persistent_menu: [
            {
              locale: 'default',
              composer_input_disabled: false,
              call_to_actions: [
                {
                  type: 'web_url',
                  title: 'Open Chat Extensions',
                  url: 'http://example.com/index.html',
                  messenger_extensions: true,
                },
              ],
            },
          ],
          whitelisted_domains: ['http://example.com'], // profile has `whitelisted_domains`
          home_url: {
            url: 'http://example.com/index.html',
            webview_height_ratio: 'tall',
            webview_share_button: 'show',
            in_test: true,
          },
        },
      });

      await setMessengerProfile(ctx);

      expect(_client.setMessengerProfile.mock.calls[0][0]).toEqual({
        whitelisted_domains: ['http://example.com'],
      });
      expect(_client.setMessengerProfile.mock.calls[1][0]).toEqual({
        get_started: {
          payload: '<GET_STARTED_PAYLOAD>',
        },
        persistent_menu: [
          {
            locale: 'default',
            composer_input_disabled: false,
            call_to_actions: [
              {
                type: 'web_url',
                title: 'Open Chat Extensions',
                url: 'http://example.com/index.html',
                messenger_extensions: true,
              },
            ],
          },
        ],
        home_url: {
          url: 'http://example.com/index.html',
          webview_height_ratio: 'tall',
          webview_share_button: 'show',
          in_test: true,
        },
      });
    });
  });

  it('successfully set diff fields `persistent_menu`', async () => {
    const ctx = {
      argv: {},
    };
    _client.getMessengerProfile.mockReturnValue([
      {
        persistent_menu: [
          {
            locale: 'default',
            composer_input_disabled: false,
            call_to_actions: [
              {
                type: 'web_url',
                title: 'Powered by Facebook',
                url: 'https://www.facebook.com/',
              },
            ],
          },
        ],
      },
    ]);

    await setMessengerProfile(ctx);

    expect(_client.setMessengerProfile).toBeCalledWith({
      get_started: {
        payload: '<GET_STARTED_PAYLOAD>',
      },
      persistent_menu: [
        {
          locale: 'default',
          composer_input_disabled: false,
          call_to_actions: [
            {
              type: 'web_url',
              title: 'Powered by Example',
              url: 'https://www.example.com/',
            },
          ],
        },
      ],
    });
  });

  it('should set whitelisted_domains before other fields', async () => {
    const ctx = {
      argv: {},
    };
    _client.getMessengerProfile.mockReturnValue([
      {
        persistent_menu: [
          {
            locale: 'default',
            composer_input_disabled: false,
            call_to_actions: [
              {
                type: 'web_url',
                title: 'Powered by Facebook',
                url: 'https://www.facebook.com/',
              },
            ],
          },
        ],
      },
    ]);
    getConfig.mockReturnValue({
      accessToken: '__FAKE_TOKEN__',
      profile: {
        get_started: {
          payload: '<GET_STARTED_PAYLOAD>',
        },
        persistent_menu: [
          {
            locale: 'default',
            composer_input_disabled: false,
            call_to_actions: [
              {
                type: 'web_url',
                title: 'Open Chat Extensions',
                url: 'http://example.com/index.html',
                messenger_extensions: true,
              },
            ],
          },
        ],
        whitelisted_domains: ['http://example.com'],
        home_url: {
          url: 'http://example.com/index.html',
          webview_height_ratio: 'tall',
          webview_share_button: 'show',
          in_test: true,
        },
      },
    });

    await setMessengerProfile(ctx);

    expect(_client.setMessengerProfile.mock.calls[0][0]).toEqual({
      whitelisted_domains: ['http://example.com'],
    });
    expect(_client.setMessengerProfile.mock.calls[1][0]).toEqual({
      get_started: {
        payload: '<GET_STARTED_PAYLOAD>',
      },
      persistent_menu: [
        {
          locale: 'default',
          composer_input_disabled: false,
          call_to_actions: [
            {
              type: 'web_url',
              title: 'Open Chat Extensions',
              url: 'http://example.com/index.html',
              messenger_extensions: true,
            },
          ],
        },
      ],
      home_url: {
        url: 'http://example.com/index.html',
        webview_height_ratio: 'tall',
        webview_share_button: 'show',
        in_test: true,
      },
    });
  });

  it('successfully set diff fields `get_started`', async () => {
    const ctx = {
      argv: {},
    };

    await setMessengerProfile(ctx);

    expect(_client.setMessengerProfile).toBeCalledWith({
      get_started: {
        payload: '<GET_STARTED_PAYLOAD>',
      },
    });
  });

  it('successfully delete diff fields `whitelisted_domains`', async () => {
    _client.getMessengerProfile.mockReturnValue([
      {
        persistent_menu: [
          {
            locale: 'default',
            composer_input_disabled: false,
            call_to_actions: [
              {
                type: 'web_url',
                title: 'Powered by Example',
                url: 'https://www.example.com/',
              },
            ],
          },
        ],
        whitelisted_domains: [
          'https://www.facebook.com/',
          'https://www.google.com/',
        ],
      },
    ]);
    const ctx = {
      argv: {},
    };

    await setMessengerProfile(ctx);

    expect(_client.deleteMessengerProfile).toBeCalledWith([
      'whitelisted_domains',
    ]);
  });

  it('do nothing and log info', async () => {
    _client.getMessengerProfile.mockReturnValue([
      {
        get_started: {
          payload: '<GET_STARTED_PAYLOAD>',
        },
        persistent_menu: [
          {
            locale: 'default',
            composer_input_disabled: false,
            call_to_actions: [
              {
                type: 'web_url',
                title: 'Powered by Example',
                url: 'https://www.example.com/',
              },
            ],
          },
        ],
      },
    ]);
    const ctx = {
      argv: {},
    };

    await setMessengerProfile(ctx);

    expect(_client.deleteMessengerProfile).not.toBeCalled();
    expect(_client.setMessengerProfile).not.toBeCalled();
    expect(log.print).toHaveBeenCalledWith(
      `No change apply because the profile settings is the same.`
    );
  });
});

describe('reject', () => {
  it('handle error thrown with only status', async () => {
    const error = {
      response: {
        status: 400,
      },
    };
    const ctx = {
      argv: {},
    };

    _client.setMessengerProfile.mockRejectedValue(error);

    process.exit = jest.fn();

    await setMessengerProfile(ctx);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown by messenger', async () => {
    const error = {
      response: {
        status: 400,
        data: {
          error: {
            message: '(#100) ...',
            type: 'OAuthException',
            code: 100,
            error_subcode: 2018145,
            fbtrace_id: 'HXd3kIOXLsK',
          },
        },
      },
    };
    const ctx = {
      argv: {},
    };
    _client.setMessengerProfile.mockRejectedValue(error);

    process.exit = jest.fn();

    await setMessengerProfile(ctx);

    expect(log.error).toBeCalled();
    expect(log.error.mock.calls[2][0]).not.toMatch(/\[object Object\]/);
    expect(process.exit).toBeCalled();
  });
});
