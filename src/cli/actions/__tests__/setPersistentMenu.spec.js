import setPersistentMenu from '../setPersistentMenu';

jest.mock('messaging-api-messenger');

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
        title: 'Awesome Web title',
        url: 'https://www.example.com/demo',
      },
    ],
  },
  line: {},
};
const configPath = 'bot.sample.json';

let _client;

beforeEach(() => {
  _client = {
    setPersistentMenu: jest.fn(),
  };
  MessengerClient.connect = jest.fn(() => _client);
  log.print = jest.fn();
  log.error = jest.fn();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.messenger);
});

afterEach(() => {
  jest.resetAllMocks();
});

it('be defined', () => {
  expect(setPersistentMenu).toBeDefined();
});

describe('resolve', () => {
  it('default user input is false', async () => {
    await setPersistentMenu(configPath);
    expect(_client.setPersistentMenu).toBeCalledWith(
      [
        {
          type: 'web_url',
          title: 'Awesome Web title',
          url: 'https://www.example.com/demo',
        },
      ],
      {
        composerInputDisabled: false,
      }
    );
    expect(log.print).toHaveBeenCalledTimes(2);
  });
  it('disable user input in persistent menu', async () => {
    getConfig.mockReturnValue({
      accessToken: '__FAKE_TOKEN__',
      persistentMenu: [
        {
          type: 'web_url',
          title: 'Awesome Web title',
          url: 'https://www.example.com/demo',
        },
      ],
      composerInputDisabled: true,
    });

    await setPersistentMenu(configPath);

    expect(_client.setPersistentMenu).toBeCalledWith(
      [
        {
          type: 'web_url',
          title: 'Awesome Web title',
          url: 'https://www.example.com/demo',
        },
      ],
      {
        composerInputDisabled: true,
      }
    );
    expect(log.print).toHaveBeenCalledTimes(2);
  });
});

describe('reject', () => {
  it('handle error thrown with only status', async () => {
    const error = {
      response: {
        status: 400,
      },
    };
    _client.setPersistentMenu.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await setPersistentMenu(configPath);

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
    _client.setPersistentMenu.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await setPersistentMenu(configPath);

    expect(log.error).toHaveBeenCalledTimes(3);
    expect(log.error.mock.calls[2][0]).not.toMatch(/\[object Object\]/);
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown by ourselves', async () => {
    const error = {
      message: 'something wrong happened',
    };
    _client.setPersistentMenu.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await setPersistentMenu(configPath);

    expect(log.error).toHaveBeenCalledTimes(2);
    expect(process.exit).toBeCalled();
  });
});
