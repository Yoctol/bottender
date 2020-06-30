import Confirm from 'prompt-confirm';
import { ViberClient } from 'messaging-api-viber';
import { mocked } from 'ts-jest/utils';

import getChannelConfig from '../../../../shared/getChannelConfig';
import getWebhookFromNgrok from '../../../../shared/getWebhookFromNgrok';
import { setWebhook } from '../webhook';
import * as log from '../../../../shared/log';

jest.mock('messaging-api-viber');
jest.mock('prompt-confirm');

jest.mock('../../../../shared/getWebhookFromNgrok');
jest.mock('../../../../shared/log');
jest.mock('../../../../shared/getChannelConfig');

const ACCESS_TOKEN = '__ACCESS_TOKEN__';
const WEBHOOK = 'http://example.com/webhook';

function setup({ config }: { config?: Record<string, any> } = {}) {
  process.exit = jest.fn();

  log.bold = jest.fn(s => s);

  mocked(getWebhookFromNgrok).mockResolvedValue('https://fakeDomain.ngrok.io');

  mocked(getChannelConfig).mockReturnValue(
    config || {
      accessToken: ACCESS_TOKEN,
      sender: {
        name: 'sender',
      },
    }
  );

  mocked(ViberClient.prototype.setWebhook).mockResolvedValue({
    status: 0,
    statusMessage: 'ok',
    eventTypes: [
      'delivered',
      'seen',
      'failed',
      'subscribed',
      'unsubscribed',
      'conversation_started',
    ],
  });

  Confirm.mockImplementation(() => ({
    run: jest.fn().mockResolvedValue(true),
  }));

  return {};
}

it('be defined', () => {
  expect(setWebhook).toBeDefined();
});

describe('resolve', () => {
  it('successfully set webhook', async () => {
    setup({
      config: {
        accessToken: ACCESS_TOKEN,
        sender: {
          name: 'sender',
        },
        Events: ['delivered', 'seen'],
      },
    });

    const ctx = {
      config: null,
      argv: {
        _: ['viber', 'webhook', 'set', `--webhook=${WEBHOOK}`],
      },
    };

    await setWebhook(ctx);

    const client = mocked(ViberClient).mock.instances[0];

    expect(client.setWebhook).toBeCalledWith('http://example.com/webhook', [
      'delivered',
      'seen',
    ]);

    expect(log.print).toBeCalled();
  });

  it('get ngrok webhook to set up', async () => {
    setup();

    const ctx = {
      config: null,
      argv: {
        _: ['viber', 'webhook', 'set'],
      },
    };

    await setWebhook(ctx);

    const client = mocked(ViberClient).mock.instances[0];

    expect(getWebhookFromNgrok).toBeCalledWith('4040');
    expect(client.setWebhook).toBeCalledWith(
      'https://fakeDomain.ngrok.io/webhooks/viber',
      undefined
    );
    expect(log.print).toBeCalled();
  });

  it('set ngrok webhook port', async () => {
    setup();

    const ctx = {
      config: null,
      argv: {
        _: ['viber', 'webhook', 'set', `--ngrok-port=5555`],
      },
    };

    await setWebhook(ctx);

    expect(getWebhookFromNgrok).toBeCalledWith('5555');
  });
});

describe('reject', () => {
  it('reject when accessToken not found in config file', async () => {
    setup({ config: {} });

    const ctx = {
      config: null,
      argv: {
        _: ['viber', 'webhoook', 'set'],
      },
    };

    await setWebhook(ctx);

    expect(log.error).toBeCalledWith(
      '`accessToken` is not found in the `bottender.config.js` file'
    );
    expect(process.exit).toBeCalled();
  });

  it('reject when viber return not success', async () => {
    setup();

    mocked(ViberClient.prototype.setWebhook).mockRejectedValueOnce(
      new Error('setWebhook failed')
    );

    const ctx = {
      config: null,
      argv: {
        _: ['viber', 'webhoook', 'set'],
      },
    };

    await setWebhook(ctx);

    expect(log.error).toBeCalled();
  });
});
