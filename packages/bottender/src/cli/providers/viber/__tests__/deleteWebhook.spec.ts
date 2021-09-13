import { ViberClient } from 'messaging-api-viber';
import { mocked } from 'ts-jest/utils';

import getChannelConfig from '../../../../shared/getChannelConfig';
import { deleteWebhook } from '../webhook';
import * as log from '../../../../shared/log';

jest.mock('messaging-api-viber');
jest.mock('../../../../shared/log');
jest.mock('../../../../shared/getChannelConfig');

const ACCESS_TOKEN = '__ACCESS_TOKEN__';

function setup({ config }: { config?: Record<string, any> } = {}) {
  process.exit = jest.fn();

  mocked(getChannelConfig).mockReturnValue(
    config || {
      accessToken: ACCESS_TOKEN,
      sender: {
        name: 'sender',
      },
    }
  );
}

describe('resolve', () => {
  it('successfully delete webhook', async () => {
    setup();

    const ctx = {
      config: null,
      argv: {
        _: [],
      },
    };

    mocked(ViberClient.prototype.removeWebhook).mockResolvedValue({
      status: 0,
      statusMessage: 'ok',
    });

    await deleteWebhook(ctx);

    expect(log.print).toBeCalled();
  });
});

describe('reject', () => {
  it('reject when Viber return not success', () => {
    setup();

    const ctx = {
      config: null,
      argv: {
        _: [],
      },
    };

    mocked(ViberClient.prototype.removeWebhook).mockRejectedValueOnce(
      new Error('removeWebhook failed')
    );

    expect(deleteWebhook(ctx).then).toThrow();
  });

  it('reject when `accessToken` is not found in the `bottender.config.js` file', () => {
    setup();

    mocked(getChannelConfig).mockReturnValueOnce(null);

    const ctx = {
      config: null,
      argv: {
        _: [],
      },
    };

    expect(deleteWebhook(ctx).then).toThrow();
  });
});
