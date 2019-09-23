import { ViberClient } from 'messaging-api-viber';

import { deleteWebhook } from '../webhook';
import { log } from '../../../shared/log';

jest.mock('messaging-api-viber');
jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const getConfig = require('../../../shared/getConfig').default;

const MOCK_FILE_WITH_PLATFORM = {
  channels: {
    viber: {
      accessToken: '__accessToken__',
    },
  },
};

beforeEach(() => {
  process.exit = jest.fn();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.channels.viber);

  ViberClient.connect.mockReturnValue({
    removeWebhook: jest.fn(() => ({
      status: 0,
      status_message: 'ok',
    })),
  });
});

it('be defined', () => {
  expect(deleteWebhook).toBeDefined();
});

describe('resolve', () => {
  it('--token should work', async () => {
    const ctx = {
      argv: { '--token': '12345' },
    };

    await deleteWebhook(ctx);

    expect(ViberClient.connect).toBeCalledWith('12345');
  });

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
  it('reject when Viber return not success', () => {
    const ctx = {
      argv: {},
    };

    ViberClient.connect().removeWebhook.mockRejectedValueOnce(
      new Error('removeWebhook failed')
    );

    expect(deleteWebhook(ctx).then).toThrow();
  });

  it('reject when `accessToken` is not found in config file', () => {
    const ctx = {
      argv: {},
    };

    getConfig.mockReturnValueOnce(null);

    expect(deleteWebhook(ctx).then).toThrow();
  });
});
