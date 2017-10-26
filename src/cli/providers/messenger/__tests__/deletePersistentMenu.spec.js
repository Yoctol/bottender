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
  line: {},
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
  it('call deletePersistentMenu', async () => {
    _client.deletePersistentMenu.mockReturnValue(Promise.resolve());

    await deletePersistentMenu();

    expect(_client.deletePersistentMenu).toBeCalled();
  });
});

describe('reject', () => {
  it('handle error thrown with only status', async () => {
    const error = {
      response: {
        status: 400,
      },
    };
    _client.deletePersistentMenu.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await deletePersistentMenu();

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
    _client.deletePersistentMenu.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await deletePersistentMenu();

    expect(log.error).toBeCalled();
    expect(log.error.mock.calls[2][0]).not.toMatch(/\[object Object\]/);
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown by ourselves', async () => {
    const error = {
      message: 'something wrong happened',
    };
    _client.deletePersistentMenu.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await deletePersistentMenu();

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });
});
