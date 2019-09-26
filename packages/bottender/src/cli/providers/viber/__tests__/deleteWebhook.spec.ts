import { ViberClient } from 'messaging-api-viber';

import getConfig from '../../../shared/getConfig';
import { deleteWebhook } from '../webhook';
import * as log from '../../../shared/log';

jest.mock('messaging-api-viber');
jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const ACCESS_TOKEN = '__ACCESS_TOKEN__';

function setup({ config }: { config?: Record<string, any> } = {}) {
  getConfig.mockReturnValue(
    config || {
      accessToken: ACCESS_TOKEN,
      sender: {
        name: 'sender',
      },
    }
  );

  process.exit = jest.fn();

  ViberClient.connect.mockReturnValue({
    removeWebhook: jest.fn(() => ({
      status: 0,
      status_message: 'ok',
    })),
  });
}

it('be defined', () => {
  expect(deleteWebhook).toBeDefined();
});

describe('resolve', () => {
  it('successfully delete webhook', async () => {
    setup();

    const ctx = {
      argv: {},
    };

    await deleteWebhook(ctx);

    expect(log.print).toBeCalled();
  });
});

describe('reject', () => {
  it('reject when Viber return not success', () => {
    setup();

    const ctx = {
      argv: {},
    };

    ViberClient.connect().removeWebhook.mockRejectedValueOnce(
      new Error('removeWebhook failed')
    );

    expect(deleteWebhook(ctx).then).toThrow();
  });

  it('reject when `accessToken` is not found in the `bottender.config.js` file', () => {
    setup();

    getConfig.mockReturnValueOnce(null);

    const ctx = {
      argv: {},
    };

    expect(deleteWebhook(ctx).then).toThrow();
  });
});
