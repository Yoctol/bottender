import { getPersistentMenu } from '../persistent-menu';

jest.mock('messaging-api-messenger');

jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const { MessengerClient } = require('messaging-api-messenger');

const log = require('../../../shared/log');
const getConfig = require('../../../shared/getConfig');

const MOCK_FILE_WITH_PLATFORM = {
  messenger: {
    accessToken: '__FAKE_TOKEN__',
  },
};

let _client;
const _consoleLog = console.log;

beforeEach(() => {
  _client = {
    getPersistentMenu: jest.fn(),
  };
  MessengerClient.connect = jest.fn(() => _client);
  log.error = jest.fn();
  log.print = jest.fn();
  console.log = jest.fn();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.messenger);
});

afterEach(() => {
  console.log = _consoleLog;
});

it('be defined', () => {
  expect(getPersistentMenu).toBeDefined();
});

describe('resolved', () => {
  it('--token should work', async () => {
    const ctx = {
      argv: { '--token': '12345' },
    };

    await getPersistentMenu(ctx);

    expect(MessengerClient.connect).toBeCalledWith('12345');
  });

  it('call getPersistentMenu', async () => {
    const ctx = {
      argv: { '--token': '12345' },
    };

    _client.getPersistentMenu.mockResolvedValue([
      {
        composer_input_disabled: false,
        call_to_actions: [
          {
            type: 'postback',
            title: 'RESTART',
            payload: 'RESTART',
          },
        ],
      },
    ]);

    await getPersistentMenu(ctx);

    expect(_client.getPersistentMenu).toBeCalled();
  });

  it('error when no config setting', async () => {
    const ctx = {
      argv: {},
    };

    _client.getPersistentMenu.mockResolvedValue([]);

    await getPersistentMenu(ctx);

    expect(log.error).toBeCalled();
    expect(_client.getPersistentMenu).toBeCalled();
  });
});

describe('reject', () => {
  it('handle error thrown with only status', async () => {
    const ctx = {
      argv: {},
    };
    const error = {
      response: {
        status: 400,
      },
    };
    _client.getPersistentMenu.mockRejectedValue(error);

    process.exit = jest.fn();

    await getPersistentMenu(ctx);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown by messenger', async () => {
    const ctx = {
      argv: {},
    };
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
    _client.getPersistentMenu.mockRejectedValue(error);

    process.exit = jest.fn();

    await getPersistentMenu(ctx);

    expect(log.error).toBeCalled();
    expect(log.error.mock.calls[2][0]).not.toMatch(/\[object Object\]/);
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown by ourselves', async () => {
    const ctx = {
      argv: {},
    };
    const error = {
      message: 'something wrong happened',
    };
    _client.getPersistentMenu.mockRejectedValue(error);

    process.exit = jest.fn();

    await getPersistentMenu(ctx);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });
});
