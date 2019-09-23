import { TelegramClient } from 'messaging-api-telegram';

import getConfig from '../../../shared/getConfig';
import { deleteWebhook } from '../webhook';
import * as log from '../../../shared/log';

jest.mock('messaging-api-telegram');
jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const MOCK_FILE_WITH_PLATFORM = {
  channels: {
    telegram: {
      accessToken: '__accessToken__',
    },
    line: {},
  },
};

beforeEach(() => {
  process.exit = jest.fn();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.channels.telegram);

  TelegramClient.connect.mockReturnValue({
    deleteWebhook: jest.fn().mockResolvedValue(true),
  });
});

it('be defined', () => {
  expect(deleteWebhook).toBeDefined();
});

describe('resolve', () => {
  it('successfully delete webhook', async () => {
    const ctx = {
      argv: {},
    };

    await deleteWebhook(ctx);

    expect(log.print).toHaveBeenCalledTimes(1);
    expect(log.print.mock.calls[0][0]).toMatch(/Successfully/);
  });
});

describe('reject', () => {
  it('reject when Telegram return not success', () => {
    const ctx = {
      argv: {},
    };

    TelegramClient.connect().deleteWebhook.mockResolvedValueOnce({
      ok: false,
    });

    expect(deleteWebhook(ctx).then).toThrow();
  });

  it('reject when accessToken is not found in config file', () => {
    const ctx = {
      argv: {},
    };
    getConfig.mockReturnValueOnce({});

    expect(deleteWebhook(ctx).then).toThrow();
  });
});
