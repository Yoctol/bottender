import { MessengerClient } from 'messaging-api-messenger';

import getChannelConfig from '../../../../shared/getChannelConfig';
import { createPersona } from '../persona';
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
    createPersona: jest.fn(),
  };
  MessengerClient.connect = jest.fn(() => _client);
  log.error = jest.fn();
  log.print = jest.fn();
  getChannelConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.channels.messenger);
});

it('be defined', () => {
  expect(createPersona).toBeDefined();
});

describe('resolved', () => {
  it('call createPersona', async () => {
    const ctx = {
      argv: {
        '--name': 'kpman',
        '--pic': 'https://i.imgur.com/zV6uy4T.jpg',
      },
    };

    process.exit = jest.fn();

    _client.createPersona.mockResolvedValue({});

    await createPersona(ctx);

    expect(MessengerClient.connect).toBeCalledWith({
      accessToken: '__FAKE_TOKEN__',
    });
    expect(_client.createPersona).toBeCalledWith({
      name: 'kpman',
      profile_picture_url: 'https://i.imgur.com/zV6uy4T.jpg',
    });
  });

  it('error when no config setting', async () => {
    const ctx = {
      argv: {
        '--name': 'kpman',
        '--pic': 'https://i.imgur.com/zV6uy4T.jpg',
      },
    };

    process.exit = jest.fn();

    _client.createPersona.mockResolvedValue(null);

    await createPersona(ctx);

    expect(log.error).toBeCalled();
  });

  it('error when no persona name and pic', async () => {
    const ctx = {
      argv: {},
    };

    process.exit = jest.fn();

    _client.createPersona.mockResolvedValue(null);

    await createPersona(ctx);

    expect(log.error).toBeCalled();
  });
});

describe('reject', () => {
  it('handle error thrown with only status', async () => {
    const ctx = {
      argv: {
        '--name': 'kpman',
        '--pic': 'https://i.imgur.com/zV6uy4T.jpg',
      },
    };
    const error = {
      response: {
        status: 400,
      },
    };
    _client.createPersona.mockRejectedValue(error);

    process.exit = jest.fn();

    await createPersona(ctx);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown by messenger', async () => {
    const ctx = {
      argv: {
        '--name': 'kpman',
        '--pic': 'https://i.imgur.com/zV6uy4T.jpg',
      },
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
    _client.createPersona.mockRejectedValue(error);

    process.exit = jest.fn();

    await createPersona(ctx);

    expect(log.error).toBeCalled();
    expect(log.error.mock.calls[2][0]).not.toMatch(/\[object Object\]/);
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown by ourselves', async () => {
    const ctx = {
      argv: {
        '--name': 'kpman',
        '--pic': 'https://i.imgur.com/zV6uy4T.jpg',
      },
    };
    const error = {
      message: 'something wrong happened',
    };
    _client.createPersona.mockRejectedValue(error);

    process.exit = jest.fn();

    await createPersona(ctx);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });
});
