import { deletePersistentMenu } from '../persistent-menu';

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

beforeEach(() => {
  _client = {
    deletePersistentMenu: jest.fn(),
  };
  MessengerClient.connect = jest.fn(() => _client);
  log.error = jest.fn();
  log.print = jest.fn();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.messenger);
});

it('be defined', () => {
  expect(deletePersistentMenu).toBeDefined();
});

describe('resolved', () => {
  it('--token should work', async () => {
    const ctx = {
      argv: { token: '12345' },
    };

    await deletePersistentMenu(ctx);

    expect(MessengerClient.connect).toBeCalledWith('12345');
  });

  it('Abbreviational options should work', async () => {
    const ctx = {
      argv: { t: '12345' },
    };

    await deletePersistentMenu(ctx);

    expect(MessengerClient.connect).toBeCalledWith('12345');
    expect(_client.deletePersistentMenu).toBeCalled();
  });

  it('call deletePersistentMenu', async () => {
    const ctx = {
      argv: {},
    };

    _client.deletePersistentMenu.mockResolvedValue();

    await deletePersistentMenu(ctx);

    expect(_client.deletePersistentMenu).toBeCalled();
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
    _client.deletePersistentMenu.mockRejectedValue(error);

    process.exit = jest.fn();

    await deletePersistentMenu(ctx);

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
    _client.deletePersistentMenu.mockRejectedValue(error);

    process.exit = jest.fn();

    await deletePersistentMenu(ctx);

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
    _client.deletePersistentMenu.mockRejectedValue(error);

    process.exit = jest.fn();

    await deletePersistentMenu(ctx);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });
});
