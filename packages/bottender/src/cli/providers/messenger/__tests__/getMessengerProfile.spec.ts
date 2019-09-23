import { MessengerClient } from 'messaging-api-messenger';

import { getMessengerProfile } from '../profile';
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
  _client = {
    getMessengerProfile: jest.fn(),
  };
  MessengerClient.connect = jest.fn(() => _client);
  log.error = jest.fn();
  log.print = jest.fn();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.channels.messenger);
});

it('be defined', () => {
  expect(getMessengerProfile).toBeDefined();
});

describe('resolved', () => {
  it('--token should work', async () => {
    const ctx = {
      argv: { '--token': '12345' },
    };

    await getMessengerProfile(ctx);

    expect(MessengerClient.connect).toBeCalledWith('12345');
  });

  it('call getMessengerProfile', async () => {
    const ctx = {
      argv: {},
    };

    _client.getMessengerProfile.mockResolvedValue({});

    await getMessengerProfile(ctx);

    expect(_client.getMessengerProfile).toBeCalledWith([
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

  it('error when no config setting', async () => {
    const ctx = {
      argv: {},
    };

    _client.getMessengerProfile.mockResolvedValue(null);

    await getMessengerProfile(ctx);

    expect(log.error).toBeCalled();
    expect(_client.getMessengerProfile).toBeCalled();
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
    _client.getMessengerProfile.mockRejectedValue(error);

    process.exit = jest.fn();

    await getMessengerProfile(ctx);

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
    _client.getMessengerProfile.mockRejectedValue(error);

    process.exit = jest.fn();

    await getMessengerProfile(ctx);

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
    _client.getMessengerProfile.mockRejectedValue(error);

    process.exit = jest.fn();

    await getMessengerProfile(ctx);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });
});
