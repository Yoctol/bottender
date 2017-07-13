import MockAdapter from 'axios-mock-adapter';

import setWebhook, {
  client as _client,
  localClient as _localClient,
} from '../setWebhook';

jest.mock('../../shared/log');
jest.mock('../../shared/getConfig');

const log = require('../../shared/log');
const getConfig = require('../../shared/getConfig');

const MOCK_FILE_WITH_PLATFORM = {
  messenger: {
    appID: '__APP_ID__',
    appSecret: '__APP_SECRET__',
    verifyToken: '__verifyToken__',
  },
  LINE: {},
};
const configPath = 'bot.sample.json';

let client;
let localClient;

const setup = (
  {
    clientId = MOCK_FILE_WITH_PLATFORM.messenger.appID,
    clientSecret = MOCK_FILE_WITH_PLATFORM.messenger.appSecret,
    accessToken = '__FAKE_TOKEN__',
    webhook = 'http://example.com/webhook',
  } = {
    clientId: MOCK_FILE_WITH_PLATFORM.messenger.appID,
    clientSecret: MOCK_FILE_WITH_PLATFORM.messenger.appSecret,
    accessToken: '__FAKE_TOKEN__',
    webhook: 'http://example.com/webhook',
  }
) => ({
  getUrl: `/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
  postUrl: `/${clientId}/subscriptions?access_token=${accessToken}`,
  webhook,
  accessToken,
});

beforeEach(() => {
  const { getUrl, postUrl, accessToken } = setup();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.messenger);

  client = new MockAdapter(_client);
  client.onGet(getUrl).reply(200, {
    access_token: accessToken,
  });
  client.onPost(postUrl).reply(200, { success: true });

  localClient = new MockAdapter(_localClient);
  localClient.onGet('/api/tunnels').reply(200, {
    tunnels: [
      {
        public_url: 'http://fakeDomain.ngrok.io',
      },
      {
        public_url: 'https://fakeDomain.ngrok.io',
      },
    ],
  });

  log.print = jest.fn();
  log.error = jest.fn();
  log.bold = jest.fn(s => s);
});

afterEach(() => {
  jest.resetAllMocks();
});

it('be defined', () => {
  expect(setWebhook).toBeDefined();
});

describe('resolve', () => {
  it('successfully set webhook', async () => {
    const { webhook } = setup();

    await setWebhook(webhook, configPath);

    expect(log.print).toHaveBeenCalledTimes(3);
    expect(log.print.mock.calls[2]).toEqual(['Successfully set webhook']);
  });

  it('use default fields to setup', async () => {
    const { getUrl, postUrl, webhook, accessToken } = setup({
      webhook: 'http://fakeurl.com',
    });
    client.onGet(getUrl).reply(200, {
      access_token: accessToken,
    });
    client
      .onPost(postUrl, {
        object: 'page',
        callback_url: 'http://fakeurl.com',
        verify_token: '__verifyToken__',
        fields: ['messages', 'messaging_postbacks', 'messaging_referrals'],
      })
      .reply(200, { success: true });

    await setWebhook(webhook, configPath);

    expect(log.print).toHaveBeenCalledTimes(3);
    expect(log.print.mock.calls[0][0]).toMatch(/messages/);
    expect(log.print.mock.calls[0][0]).toMatch(/messaging_postbacks/);
    expect(log.print.mock.calls[0][0]).toMatch(/messaging_referrals/);
  });

  it('get ngrok webhook to setup', async () => {
    const { postUrl } = setup();

    client
      .onPost(postUrl, {
        object: 'page',
        callback_url: 'https://fakeDomain.ngrok.io',
        verify_token: '__verifyToken__',
        fields: ['messages', 'messaging_postbacks', 'messaging_referrals'],
      })
      .reply(200, { success: true });

    await setWebhook(undefined, configPath);

    expect(log.print).toHaveBeenCalledTimes(3);
    expect(log.print.mock.calls[0][0]).toMatch(/messages/);
    expect(log.print.mock.calls[0][0]).toMatch(/messaging_postbacks/);
    expect(log.print.mock.calls[0][0]).toMatch(/messaging_referrals/);
  });
});

describe('reject', () => {
  it('reject when `appID` not found in config file', async () => {
    const { webhook } = setup();
    getConfig.mockReturnValue({
      appSecret: '__APP_SECRET__',
      verifyToken: '__verifyToken__',
    });
    process.exit = jest.fn();

    await setWebhook(webhook, configPath);

    expect(process.exit).toBeCalled();
  });

  it('reject when `appSecret` not found in config file', async () => {
    const { webhook } = setup();
    getConfig.mockReturnValue({
      appID: '__APP_ID__',
      verifyToken: '__verifyToken__',
    });
    process.exit = jest.fn();

    await setWebhook(webhook, configPath);

    expect(process.exit).toBeCalled();
  });

  it('reject when messenger return not success', () => {
    const { postUrl, webhook } = setup();
    client.onPost(postUrl).reply(400, { success: false });
    expect(setWebhook(webhook, configPath).then).toThrow();
  });
});
