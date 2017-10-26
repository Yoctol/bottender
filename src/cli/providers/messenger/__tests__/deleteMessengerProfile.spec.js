import { deleteMessengerProfile } from '../profile';

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
const _exit = process.exit;

beforeEach(() => {
  process.exit = jest.fn();
  _client = {
    deleteMessengerProfile: jest.fn(),
  };
  MessengerClient.connect = jest.fn(() => _client);
  log.error = jest.fn();
  log.print = jest.fn();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.messenger);
});

afterEach(() => {
  process.exit = _exit;
});

it('be defined', () => {
  expect(deleteMessengerProfile).toBeDefined();
});

describe('resolved', () => {
  it('call deleteMessengerProfile', async () => {
    _client.deleteMessengerProfile.mockReturnValue(Promise.resolve());

    await deleteMessengerProfile();

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

    await deleteMessengerProfile();

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
    _client.deleteMessengerProfile.mockReturnValue(Promise.reject(error));

    await deleteMessengerProfile();

    expect(log.error).toBeCalled();
    expect(log.error.mock.calls[2][0]).not.toMatch(/\[object Object\]/);
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown by ourselves', async () => {
    const error = {
      message: 'something wrong happened',
    };
    _client.deleteMessengerProfile.mockReturnValue(Promise.reject(error));

    await deleteMessengerProfile();

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });
});
