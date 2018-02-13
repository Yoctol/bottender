import { getWebhook } from '../webhook';

jest.mock('messaging-api-telegram');
jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const { TelegramClient } = require('messaging-api-telegram');

const log = require('../../../shared/log');
const getConfig = require('../../../shared/getConfig');

const _exit = process.exit;
const MOCK_FILE_WITH_PLATFORM = {
  telegram: {
    accessToken: '__accessToken__',
  },
  line: {},
};

beforeEach(() => {
  process.exit = jest.fn();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.telegram);

  TelegramClient.connect.mockReturnValue({
    getWebhookInfo: jest.fn(() =>
      Promise.resolve({
        ok: true,
        result: {
          url: 'https://4a16faff.ngrok.io/',
          has_custom_certificate: false,
          pending_update_count: 0,
          max_connections: 40,
        },
      })
    ),
  });
});

afterEach(() => {
  process.exit = _exit;
});

it('be defined', () => {
  expect(getWebhook).toBeDefined();
});

describe('resolve', () => {
  it('--token should work', async () => {
    const ctx = {
      argv: { token: '12345' },
    };

    await getWebhook(ctx);

    expect(TelegramClient.connect).toBeCalledWith('12345');
  });

  it('Abbreviational options should work', async () => {
    const ctx = {
      argv: { t: '12345' },
    };

    await getWebhook(ctx);

    expect(TelegramClient.connect).toBeCalledWith('12345');
  });

  it('successfully get webhook', async () => {
    const ctx = {
      argv: {},
    };

    await getWebhook(ctx);

    expect(log.print).toHaveBeenCalledTimes(4);
  });
});

describe('reject', () => {
  it('reject when Telegram return not success', () => {
    const ctx = {
      argv: {},
    };
    TelegramClient.connect().getWebhookInfo.mockReturnValueOnce(
      Promise.resolve({
        ok: false,
      })
    );

    expect(getWebhook(ctx).then).toThrow();
  });

  it('reject when accessToken is not found in config file', () => {
    const ctx = {
      argv: {},
    };

    getConfig.mockReturnValueOnce({});

    expect(getWebhook(ctx).then).toThrow();
  });
});
