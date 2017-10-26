import { deleteWebhook } from '../webhook';

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

  log.print = jest.fn();
  log.error = jest.fn();
  log.bold = jest.fn(s => s);

  TelegramClient.connect.mockReturnValue({
    deleteWebhook: jest.fn(() => ({
      data: {
        ok: true,
        result: {
          url: 'https://4a16faff.ngrok.io/',
          has_custom_certificate: false,
          pending_update_count: 0,
          max_connections: 40,
        },
      },
    })),
  });
});

afterEach(() => {
  process.exit = _exit;
  jest.resetAllMocks();
});

it('be defined', () => {
  expect(deleteWebhook).toBeDefined();
});

describe('resolve', () => {
  it('successfully delete webhook', async () => {
    await deleteWebhook();

    expect(log.print).toHaveBeenCalledTimes(1);
    expect(log.print.mock.calls[0][0]).toMatch(/Successfully/);
  });
});

describe('reject', () => {
  it('reject when Telegram return not success', async () => {
    TelegramClient.connect().deleteWebhook.mockReturnValueOnce({
      data: {
        ok: false,
      },
    });
    await deleteWebhook();
    expect(deleteWebhook().then).toThrow();
  });

  it('reject when `accessToken` is not found in config file', async () => {
    getConfig.mockReturnValueOnce(null);
    await deleteWebhook();
    expect(deleteWebhook().then).toThrow();
  });
});
