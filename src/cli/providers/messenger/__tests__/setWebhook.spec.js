import MockAdapter from 'axios-mock-adapter';

import { setWebhook, ngrokClient } from '../webhook';

jest.mock('messaging-api-messenger');
jest.mock('prompt-confirm');

jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const Confirm = require('prompt-confirm');
const { MessengerClient } = require('messaging-api-messenger');

const log = require('../../../shared/log');
const getConfig = require('../../../shared/getConfig');

const APP_ID = '__APP_ID__';
const APP_SECRET = '__APP_SECRET__';
const VERIFY_TOKEN = '__VERIFY_TOKEN__';
const WEBHOOK = 'http://example.com/webhook';

const MOCK_FILE_WITH_PLATFORM = {
  messenger: {
    appId: APP_ID,
    appSecret: APP_SECRET,
    verifyToken: VERIFY_TOKEN,
  },
};

function setup({ success = true } = {}) {
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.messenger);

  const client = {
    createSubscription: jest.fn(),
  };

  client.createSubscription.mockReturnValue(Promise.resolve({ success }));

  MessengerClient.connect = jest.fn(() => client);

  const ngrokClientMock = new MockAdapter(ngrokClient);
  ngrokClientMock.onGet('/api/tunnels').reply(200, {
    tunnels: [
      {
        public_url: 'http://fakeDomain.ngrok.io',
      },
      {
        public_url: 'https://fakeDomain.ngrok.io',
      },
    ],
  });

  Confirm.mockImplementation(() => ({
    run: jest.fn(() => Promise.resolve(true)),
  }));

  log.print = jest.fn();
  log.error = jest.fn();
  log.bold = jest.fn(s => s);

  process.exit = jest.fn();

  return {
    client,
    ngrokClientMock,
  };
}

it('be defined', () => {
  expect(setWebhook).toBeDefined();
});

describe('resolve', () => {
  it('successfully set webhook and show messages', async () => {
    setup();

    await setWebhook(WEBHOOK, VERIFY_TOKEN);

    const logs = log.print.mock.calls.map(call => call[0]);

    expect(log.print).toBeCalled();
    expect(logs.some(text => /Successfully/.test(text))).toBe(true);
  });

  it('use default fields to setup', async () => {
    const { client } = setup();

    await setWebhook(WEBHOOK, VERIFY_TOKEN);

    expect(client.createSubscription).toBeCalledWith({
      app_id: '__APP_ID__',
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
  });

  it('get ngrok webhook to setup', async () => {
    const { client } = setup();

    await setWebhook(undefined, VERIFY_TOKEN);

    expect(client.createSubscription).toBeCalledWith({
      app_id: '__APP_ID__',
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
});

describe('reject', () => {
  it('reject when `appId` not found in config file', async () => {
    setup();

    getConfig.mockReturnValue({
      appSecret: '__APP_SECRET__',
      verifyToken: '__verifyToken__',
    });

    await setWebhook(WEBHOOK, VERIFY_TOKEN);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });

  it('reject when `appSecret` not found in config file', async () => {
    setup();

    getConfig.mockReturnValue({
      appId: '__APP_ID__',
      verifyToken: '__verifyToken__',
    });

    await setWebhook(WEBHOOK, VERIFY_TOKEN);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });

  it('reject when messenger return not success', async () => {
    setup({ success: false });

    await setWebhook(WEBHOOK, VERIFY_TOKEN);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });
});
