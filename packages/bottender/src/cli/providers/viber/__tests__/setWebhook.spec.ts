import Confirm from 'prompt-confirm';
import { ViberClient } from 'messaging-api-viber';

import getChannelConfig from '../../../shared/getChannelConfig';
import getWebhookFromNgrok from '../../../shared/getWebhookFromNgrok';
import { setWebhook } from '../webhook';
import * as log from '../../../shared/log';

jest.mock('messaging-api-viber');
jest.mock('prompt-confirm');

jest.mock('../../../shared/getWebhookFromNgrok');
jest.mock('../../../shared/log');
jest.mock('../../../shared/getChannelConfig');

const ACCESS_TOKEN = '__ACCESS_TOKEN__';
const WEBHOOK = 'http://example.com/webhook';

function setup({ config }: { config?: Record<string, any> } = {}) {
  getWebhookFromNgrok.mockResolvedValue('https://fakeDomain.ngrok.io');

  getChannelConfig.mockReturnValue(
    config || {
      accessToken: ACCESS_TOKEN,
      sender: {
        name: 'sender',
      },
    }
  );

  const client = {
    setWebhook: jest.fn(),
  };

  client.setWebhook.mockResolvedValue({
    status: 0,
    status_message: 'ok',
    event_types: [
      'delivered',
      'seen',
      'failed',
      'subscribed',
      'unsubscribed',
      'conversation_started',
    ],
  });

  ViberClient.connect.mockReturnValue(client);

  Confirm.mockImplementation(() => ({
    run: jest.fn().mockResolvedValue(true),
  }));

  log.print = jest.fn();
  log.error = jest.fn();
  log.bold = jest.fn(s => s);

  process.exit = jest.fn();

  return {
    client,
  };
}

it('be defined', () => {
  expect(setWebhook).toBeDefined();
});

describe('resolve', () => {
  it('successfully set webhook', async () => {
    const { client } = setup({
      config: {
        accessToken: ACCESS_TOKEN,
        sender: {
          name: 'sender',
        },
        eventTypes: ['delivered', 'seen'],
      },
    });

    const ctx = {
      argv: {
        _: ['viber', 'webhook', 'set', `--webhook=${WEBHOOK}`],
      },
    };

    await setWebhook(ctx);

    expect(client.setWebhook).toBeCalledWith('http://example.com/webhook', [
      'delivered',
      'seen',
    ]);

    expect(log.print).toBeCalled();
  });

  it('get ngrok webhook to setup', async () => {
    const { client } = setup();

    const ctx = {
      argv: {
        _: ['viber', 'webhook', 'set'],
      },
    };

    await setWebhook(ctx);

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
    const { client } = setup();

    client.setWebhook.mockRejectedValueOnce(new Error('setWebhook failed'));

    const ctx = {
      argv: {
        _: ['viber', 'webhoook', 'set'],
      },
    };

    await setWebhook(ctx);

    expect(log.error).toBeCalled();
  });
});
