import Confirm from 'prompt-confirm';
import { MessengerClient } from 'messaging-api-messenger';

import getChannelConfig from '../../../../shared/getChannelConfig';
import getWebhookFromNgrok from '../../../../shared/getWebhookFromNgrok';
import { setWebhook } from '../webhook';
import * as log from '../../../../shared/log';

jest.mock('messaging-api-messenger');
jest.mock('prompt-confirm');

jest.mock('../../../../shared/getWebhookFromNgrok');
jest.mock('../../../../shared/log');
jest.mock('../../../../shared/getChannelConfig');

const PAGE_ID = '__PAGE_ID__';
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

  getChannelConfig.mockReturnValue(
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
    appId: '000000000000000',
    application: 'Social Cafe',
    expiresAt: 1352419328,
    isValid: true,
    issuedAt: 1347235328,
    scopes: ['email', 'user_location'],
    userId: 1207059,
  });

  client.getPageInfo.mockResolvedValue({ id: '123456789', name: 'Page Name' });
  client.axios = {
    post: jest.fn(),
  };

  client.axios.post.mockResolvedValue({ data: { success: true } });

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
      accessToken: '__APP_ID__|__APP_SECRET__',
      callbackUrl: 'http://example.com/webhook',
      fields: [
        'messages',
        'messaging_postbacks',
        'messaging_optins',
        'messaging_referrals',
        'messaging_handovers',
        'messaging_policy_enforcement',
      ],
      object: 'page',
      verifyToken: '__VERIFY_TOKEN__',
    });

    expect(log.print).toBeCalled();
  });

  it('get ngrok webhook to set up', async () => {
    const { client } = setup();

    client.axios.post = jest
      .fn()
      .mockResolvedValue({ data: { success: true } });

    const ctx = {
      argv: {
        _: ['messenger', 'webhook', 'set'],
      },
    };

    await setWebhook(ctx);

    expect(getWebhookFromNgrok).toBeCalledWith('4040');
    expect(client.createSubscription).toBeCalledWith({
      accessToken: '__APP_ID__|__APP_SECRET__',
      callbackUrl: 'https://fakeDomain.ngrok.io/webhooks/messenger',
      fields: [
        'messages',
        'messaging_postbacks',
        'messaging_optins',
        'messaging_referrals',
        'messaging_handovers',
        'messaging_policy_enforcement',
      ],
      object: 'page',
      verifyToken: '__VERIFY_TOKEN__',
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

  it('should subscribe app for the page if pageId is provided', async () => {
    const { client } = setup({
      config: {
        pageId: PAGE_ID,
        accessToken: ACCESS_TOKEN,
        appId: APP_ID,
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

    expect(getWebhookFromNgrok).toBeCalledWith('4040');
    expect(client.createSubscription).toBeCalledWith({
      accessToken: '__APP_ID__|__APP_SECRET__',
      callbackUrl: 'https://fakeDomain.ngrok.io/webhooks/messenger',
      fields: [
        'messages',
        'messaging_postbacks',
        'messaging_optins',
        'messaging_referrals',
        'messaging_handovers',
        'messaging_policy_enforcement',
      ],
      object: 'page',
      verifyToken: '__VERIFY_TOKEN__',
    });

    expect(client.axios.post).toBeCalledWith(
      '/__PAGE_ID__/subscribed_apps?access_token=__ACCESS_TOKEN__',
      {
        subscribedFields:
          'messages,messaging_postbacks,messaging_optins,messaging_referrals,messaging_handovers,messaging_policy_enforcement',
      }
    );
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
