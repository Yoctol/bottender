import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../../../shared/getConfig';
import { getPersona } from '../persona';
import * as log from '../../../shared/log';

jest.mock('messaging-api-messenger');

jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

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
    getPersona: jest.fn(),
  };
  MessengerClient.connect = jest.fn(() => _client);
  log.error = jest.fn();
  log.print = jest.fn();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.channels.messenger);
});

it('be defined', () => {
  expect(getPersona).toBeDefined();
});

describe('resolved', () => {
  it('call getPersona', async () => {
    const ctx = {
      argv: { '--id': '54321' },
    };

    process.exit = jest.fn();

    _client.getPersona.mockResolvedValue({});

    await getPersona(ctx);

    expect(MessengerClient.connect).toBeCalledWith('__FAKE_TOKEN__');
    expect(_client.getPersona).toBeCalledWith('54321');
  });

  it('error when no config setting', async () => {
    const ctx = {
      argv: { '--id': '54321' },
    };

    process.exit = jest.fn();

    _client.getPersona.mockResolvedValue(null);

    await getPersona(ctx);

    expect(log.error).toBeCalled();
  });

  it('error when no persona id', async () => {
    const ctx = {
      argv: {},
    };

    process.exit = jest.fn();

    _client.getPersona.mockResolvedValue(null);

    await getPersona(ctx);

    expect(log.error).toBeCalled();
  });
});

describe('reject', () => {
  it('handle error thrown with only status', async () => {
    const ctx = {
      argv: { '--id': '54321' },
    };
    const error = {
      response: {
        status: 400,
      },
    };
    _client.getPersona.mockRejectedValue(error);

    process.exit = jest.fn();

    await getPersona(ctx);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown by messenger', async () => {
    const ctx = {
      argv: { '--id': '54321' },
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
    _client.getPersona.mockRejectedValue(error);

    process.exit = jest.fn();

    await getPersona(ctx);

    expect(log.error).toBeCalled();
    expect(log.error.mock.calls[2][0]).not.toMatch(/\[object Object\]/);
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown by ourselves', async () => {
    const ctx = {
      argv: { '--id': '54321' },
    };
    const error = {
      message: 'something wrong happened',
    };
    _client.getPersona.mockRejectedValue(error);

    process.exit = jest.fn();

    await getPersona(ctx);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });
});
