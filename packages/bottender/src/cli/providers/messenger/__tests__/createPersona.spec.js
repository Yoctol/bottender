import { createPersona } from '../persona';

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
    createPersona: jest.fn(),
  };
  MessengerClient.connect = jest.fn(() => _client);
  log.error = jest.fn();
  log.print = jest.fn();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.messenger);
});

it('be defined', () => {
  expect(createPersona).toBeDefined();
});

describe('resolved', () => {
  it('--token should work', async () => {
    const ctx = {
      argv: {
        '--token': '12345',
        '--name': 'kpman',
        '--pic': 'https://i.imgur.com/zV6uy4T.jpg',
      },
    };

    process.exit = jest.fn();

    await createPersona(ctx);

    expect(MessengerClient.connect).toBeCalledWith('12345');
  });

  it('call createPersona', async () => {
    const ctx = {
      argv: {
        '--token': '12345',
        '--name': 'kpman',
        '--pic': 'https://i.imgur.com/zV6uy4T.jpg',
      },
    };

    process.exit = jest.fn();

    _client.createPersona.mockResolvedValue({});

    await createPersona(ctx);

    expect(MessengerClient.connect).toBeCalledWith('12345');
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
