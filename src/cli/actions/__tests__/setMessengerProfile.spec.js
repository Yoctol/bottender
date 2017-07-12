import setMessengerProfile from '../setMessengerProfile';

jest.mock('messaging-api-messenger');
jest.mock('warning');

jest.mock('../../shared/log');
jest.mock('../../shared/getConfig');

const { MessengerClient } = require('messaging-api-messenger');

const log = require('../../shared/log');
const getConfig = require('../../shared/getConfig');

const MOCK_FILE_WITH_PLATFORM = {
  messenger: {
    accessToken: '__FAKE_TOKEN__',
    persistentMenu: [
      {
        type: 'web_url',
        title: 'Powered by Example',
        url: 'https://www.example.com/',
      },
    ],
  },
  LINE: {},
};
const configPath = 'bot.sample.json';

let _client;

beforeEach(() => {
  process.NODE_ENV = 'test';
  _client = {
    deleteMessengerProfile: jest.fn(),
    setDomainWhitelist: jest.fn(),
    setGetStartedButton: jest.fn(),
    setGreetingText: jest.fn(),
    setPersistentMenu: jest.fn(),
  };
  MessengerClient.connect = jest.fn(() => _client);
  log.print = jest.fn();
  log.error = jest.fn();
  log.bold = jest.fn();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.messenger);
});

afterEach(() => {
  jest.resetAllMocks();
});

it('be defined', () => {
  expect(setMessengerProfile).toBeDefined();
});

describe('resolve', () => {
  it('delete persistent_menu, get_started, greeting for messenger profile', async () => {
    await setMessengerProfile(configPath);

    expect(_client.deleteMessengerProfile.mock.calls[0][0]).toEqual([
      'persistent_menu',
      'get_started',
    ]);
    expect(_client.deleteMessengerProfile.mock.calls[1][0]).toEqual([
      'greeting',
    ]);
  });

  it('successfully set persistent menu', async () => {
    await setMessengerProfile(configPath);

    expect(_client.setPersistentMenu).toBeCalledWith([
      {
        type: 'web_url',
        title: 'Powered by Example',
        url: 'https://www.example.com/',
      },
    ]);

    expect(_client.setDomainWhitelist).not.toBeCalled();
    expect(_client.setGetStartedButton).not.toBeCalled();
    expect(_client.setGreetingText).not.toBeCalled();
  });

  it('successfully set persistent menu with composerInputDisabled: true', async () => {
    getConfig.mockReturnValue({
      accessToken: '__FAKE_TOKEN__',
      persistentMenu: [
        {
          type: 'web_url',
          title: 'Powered by Example',
          url: 'https://www.example.com/',
        },
      ],
      composerInputDisabled: true,
    });

    await setMessengerProfile(configPath);

    expect(_client.setPersistentMenu).toBeCalledWith(
      [
        {
          type: 'web_url',
          title: 'Powered by Example',
          url: 'https://www.example.com/',
        },
      ],
      {
        composerInputDisabled: true,
      }
    );

    expect(_client.setDomainWhitelist).not.toBeCalled();
    expect(_client.setGetStartedButton).not.toBeCalled();
    expect(_client.setGreetingText).not.toBeCalled();
  });

  it('successfully set greetingText', async () => {
    getConfig.mockReturnValue({
      accessToken: '__FAKE_TOKEN__',
      greetingText: 'Now you see me.',
      persistentMenu: [
        {
          type: 'web_url',
          title: 'Powered by Example',
          url: 'https://www.example.com/',
        },
      ],
    });

    await setMessengerProfile(configPath);

    expect(_client.setPersistentMenu).toBeCalledWith([
      {
        type: 'web_url',
        title: 'Powered by Example',
        url: 'https://www.example.com/',
      },
    ]);
    expect(_client.setGreetingText).toBeCalledWith('Now you see me.');

    expect(_client.setDomainWhitelist).not.toBeCalled();
    expect(_client.setGetStartedButton).not.toBeCalled();
  });

  it('successfully set domain whitelist', async () => {
    getConfig.mockReturnValue({
      accessToken: '__FAKE_TOKEN__',
      domainWhitelist: ['http://www.awesome.com'],
    });

    await setMessengerProfile(configPath);

    expect(_client.setDomainWhitelist).toBeCalledWith([
      'http://www.awesome.com',
    ]);

    expect(_client.setGetStartedButton).not.toBeCalled();
    expect(_client.setGreetingText).not.toBeCalled();
    expect(_client.setPersistentMenu).not.toBeCalled();
  });
});

describe('reject', () => {
  it('handle error thrown with only status', async () => {
    const error = {
      response: {
        status: 400,
      },
    };

    _client.deleteMessengerProfile.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await setMessengerProfile(configPath);

    expect(log.error).toHaveBeenCalledTimes(2);
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
    _client.deleteMessengerProfile.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await setMessengerProfile(configPath);

    expect(log.error).toHaveBeenCalledTimes(3);
    expect(log.error.mock.calls[2][0]).not.toMatch(/\[object Object\]/);
    expect(process.exit).toBeCalled();
  });
});
