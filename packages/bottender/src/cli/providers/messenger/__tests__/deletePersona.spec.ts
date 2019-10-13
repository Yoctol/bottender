import { MessengerClient } from 'messaging-api-messenger';

import getChannelConfig from '../../../../shared/getChannelConfig';
import { deletePersona } from '../persona';
import * as log from '../../../../shared/log';

jest.mock('messaging-api-messenger');

jest.mock('../../../../shared/log');
jest.mock('../../../../shared/getChannelConfig');

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
    deletePersona: jest.fn(),
  };
  MessengerClient.connect = jest.fn(() => _client);
  log.error = jest.fn();
  log.print = jest.fn();
  getChannelConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.channels.messenger);
});

it('be defined', () => {
  expect(deletePersona).toBeDefined();
});

describe('resolved', () => {
  it('call deletePersona', async () => {
    const ctx = {
      argv: { '--id': '54321' },
    };

    process.exit = jest.fn();

    _client.deletePersona.mockResolvedValue({});

    await deletePersona(ctx);

    expect(MessengerClient.connect).toBeCalledWith({
      accessToken: '__FAKE_TOKEN__',
    });
    expect(_client.deletePersona).toBeCalledWith('54321');
  });

  it('error when no config setting', async () => {
    const ctx = {
      argv: { '--id': '54321' },
    };

    process.exit = jest.fn();

    _client.deletePersona.mockResolvedValue(null);

    await deletePersona(ctx);

    expect(log.error).toBeCalled();
  });

  it('error when no persona id', async () => {
    const ctx = {
      argv: {},
    };

    process.exit = jest.fn();

    _client.deletePersona.mockResolvedValue(null);

    await deletePersona(ctx);

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
    _client.deletePersona.mockRejectedValue(error);

    process.exit = jest.fn();

    await deletePersona(ctx);

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
    _client.deletePersona.mockRejectedValue(error);

    process.exit = jest.fn();

    await deletePersona(ctx);

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
    _client.deletePersona.mockRejectedValue(error);

    process.exit = jest.fn();

    await deletePersona(ctx);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });
});
