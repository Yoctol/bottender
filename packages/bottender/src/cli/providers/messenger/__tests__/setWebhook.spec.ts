import Confirm from 'prompt-confirm';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../../../shared/getConfig';
import getWebhookFromNgrok from '../../../shared/getWebhookFromNgrok';
import { setWebhook } from '../webhook';
import * as log from '../../../shared/log';

jest.mock('messaging-api-messenger');
jest.mock('prompt-confirm');

jest.mock('../../../shared/getWebhookFromNgrok');
jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const ACCESS_TOKEN = '__ACCESS_TOKEN__';
const APP_ID = '__APP_ID__';
const APP_SECRET = '__APP_SECRET__';
const VERIFY_TOKEN = '__VERIFY_TOKEN__';
const WEBHOOK = 'http://example.com/webhook';

function setup({
  config,
  success = true,
}: { config?: Record<string, any>; success?: boolean } = {}) {
  getWebhookFromNgrok.mockResolvedValue('https://fakeDomain.ngrok.io');

  getConfig.mockReturnValue(
    config || {
      accessToken: ACCESS_TOKEN,
      appId: APP_ID,
      appSecret: APP_SECRET,
      verifyToken: VERIFY_TOKEN,
    }
  );

  const client = {
    createSubscription: jest.fn(),
    debugToken: jest.fn(),
    getPageInfo: jest.fn(),
  };

  client.createSubscription.mockResolvedValue({ success });
  client.debugToken.mockResolvedValue({
    type: 'PAGE',
    app_id: '000000000000000',
    application: 'Social Cafe',
    expires_at: 1352419328,
    is_valid: true,
    issued_at: 1347235328,
    scopes: ['email', 'user_location'],
    user_id: 1207059,
  });

  client.getPageInfo.mockResolvedValue({ id: '123456789', name: 'Page Name' });

  MessengerClient.connect = jest.fn(() => client);

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
  it('successfully set webhook with default fields and show messages', async () => {
    const { client } = setup();

    const ctx = {
      argv: {
        _: ['messenger', 'webhook', 'set', `--webhook=${WEBHOOK}`],
      },
    };

    await setWebhook(ctx);

    expect(client.createSubscription).toBeCalledWith({
      access_token: '__APP_ID__|__APP_SECRET__',
      callback_url: 'http://example.com/webhook',
      fields: [
        'messages',
        'messaging_postbacks',
        'messaging_optins',
        'messaging_referrals',
        'messaging_handovers',
        'messaging_policy_enforcement',
      ],
      object: 'page',
      verify_token: '__VERIFY_TOKEN__',
    });

    expect(log.print).toBeCalled();
  });

  it('get ngrok webhook to setup', async () => {
    const { client } = setup();

    const ctx = {
      argv: {
        _: ['messenger', 'webhook', 'set'],
      },
    };

    await setWebhook(ctx);

    expect(getWebhookFromNgrok).toBeCalledWith(undefined);
    expect(client.createSubscription).toBeCalledWith({
      access_token: '__APP_ID__|__APP_SECRET__',
      callback_url: 'https://fakeDomain.ngrok.io',
      fields: [
        'messages',
        'messaging_postbacks',
        'messaging_optins',
        'messaging_referrals',
        'messaging_handovers',
        'messaging_policy_enforcement',
      ],
      object: 'page',
      verify_token: '__VERIFY_TOKEN__',
    });
  });

  it('set ngrok webhook port', async () => {
    setup();

    const ctx = {
      argv: {
        _: ['messenger', 'webhook', 'set', `--ngrok-port=5555`],
      },
    };

    await setWebhook(ctx);

    expect(getWebhookFromNgrok).toBeCalledWith('5555');
  });
});

describe('reject', () => {
  it('reject when `appId` not found in config file', async () => {
    setup({
      config: {
        appSecret: APP_SECRET,
        verifyToken: VERIFY_TOKEN,
      },
    });

    const ctx = {
      argv: {
        _: ['messenger', 'webhook', 'set'],
      },
    };

    await setWebhook(ctx);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });

  it('reject when `appSecret` not found in config file', async () => {
    setup({
      config: {
        appId: APP_ID,
        verifyToken: VERIFY_TOKEN,
      },
    });

    const ctx = {
      argv: {
        _: ['messenger', 'webhook', 'set'],
      },
    };

    await setWebhook(ctx);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });

  it('reject when messenger return not success', async () => {
    setup({ success: false });

    const ctx = {
      argv: {
        _: ['messenger', 'webhook', 'set'],
      },
    };

    await setWebhook(ctx);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });
});
