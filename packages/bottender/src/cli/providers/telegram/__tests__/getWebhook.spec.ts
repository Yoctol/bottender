import { TelegramClient } from 'messaging-api-telegram';
import { mocked } from 'ts-jest/utils';

import getChannelConfig from '../../../../shared/getChannelConfig';
import { getWebhook } from '../webhook';
import * as log from '../../../../shared/log';

jest.mock('messaging-api-telegram');
jest.mock('../../../../shared/log');
jest.mock('../../../../shared/getChannelConfig');

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

  mocked(getChannelConfig).mockReturnValue(
    MOCK_FILE_WITH_PLATFORM.channels.telegram
  );

  mocked(TelegramClient.prototype.getWebhookInfo).mockResolvedValue({
    url: 'https://4a16faff.ngrok.io/',
    hasCustomCertificate: false,
    pendingUpdateCount: 0,
    maxConnections: 40,
  });
});

describe('resolve', () => {
  it('successfully get webhook', async () => {
    const ctx = {
      config: null,
      argv: {
        _: [],
      },
    };

    await getWebhook(ctx);

    expect(log.print).toHaveBeenCalledTimes(4);
  });
});

describe('reject', () => {
  it('reject when Telegram return not success', () => {
    const ctx = {
      config: null,
      argv: {
        _: [],
      },
    };
    mocked(TelegramClient.prototype.getWebhookInfo).mockResolvedValueOnce({
      ok: false,
    });

    expect(getWebhook(ctx).then).toThrow();
  });

  it('reject when `accessToken` is not found in the `bottender.config.js` file', () => {
    const ctx = {
      config: null,
      argv: {
        _: [],
      },
    };

    mocked(getChannelConfig).mockReturnValueOnce({});

    expect(getWebhook(ctx).then).toThrow();
  });
});
