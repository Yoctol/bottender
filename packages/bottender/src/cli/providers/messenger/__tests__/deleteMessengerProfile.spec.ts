import { MessengerClient } from 'messaging-api-messenger';

import { deleteMessengerProfile } from '../profile';
import { log } from '../../../shared/log';

jest.mock('messaging-api-messenger');

jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const getConfig = require('../../../shared/getConfig').default;

const MOCK_FILE_WITH_PLATFORM = {
  channels: {
    messenger: {
      accessToken: '__FAKE_TOKEN__',
    },
  },
};

let _client;

beforeEach(() => {
  process.exit = jest.fn();
  _client = {
    deleteMessengerProfile: jest.fn(),
  };
  MessengerClient.connect = jest.fn(() => _client);
  log.error = jest.fn();
  log.print = jest.fn();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.channels.messenger);
});

it('be defined', () => {
  expect(deleteMessengerProfile).toBeDefined();
});

describe('resolved', () => {
  it('--token should work', async () => {
    const ctx = {
      argv: { '--token': '12345' },
    };

    await deleteMessengerProfile(ctx);

    expect(MessengerClient.connect).toBeCalledWith('12345');
  });

  it('call deleteMessengerProfile', async () => {
    const ctx = {
      argv: {},
    };

    _client.deleteMessengerProfile.mockResolvedValue();

    await deleteMessengerProfile(ctx);

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
    const ctx = {
      argv: {},
    };
    const error = {
      response: {
        status: 400,
      },
    };
    _client.deleteMessengerProfile.mockRejectedValue(error);

    await deleteMessengerProfile(ctx);

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
    _client.deleteMessengerProfile.mockRejectedValue(error);

    await deleteMessengerProfile(ctx);

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
    _client.deleteMessengerProfile.mockRejectedValue(error);

    await deleteMessengerProfile(ctx);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });
});
