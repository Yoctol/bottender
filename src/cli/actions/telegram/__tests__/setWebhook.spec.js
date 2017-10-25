import MockAdapter from 'axios-mock-adapter';

import {
  setWebhook,
  client as _client,
  localClient as _localClient,
} from '../webhook';

jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const log = require('../../../shared/log');
const getConfig = require('../../../shared/getConfig');

const MOCK_FILE_WITH_PLATFORM = {
  telegram: {
    accessToken: '__accessToken__',
  },
  line: {},
};
const configPath = 'bot.sample.json';

let client;
let localClient;

const setup = (
  {
    accessToken = MOCK_FILE_WITH_PLATFORM.telegram.accessToken,
    webhook = 'http://example.com/webhook',
  } = {
    accessToken: MOCK_FILE_WITH_PLATFORM.telegram.accessToken,
    webhook: 'http://example.com/webhook',
  }
) => ({
  postUrl: `/bot${accessToken}/setWebhook`,
  webhook,
});

beforeEach(() => {
  const { postUrl } = setup();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.telegram);

  client = new MockAdapter(_client);
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

    expect(log.print).toHaveBeenCalledTimes(1);
    expect(log.print.mock.calls[0][0]).toMatch(/Successfully/);
  });

  it('use default fields to setup', async () => {
    const { postUrl, webhook } = setup({
      webhook: 'http://fakeurl.com',
    });
    client.onPost(postUrl).reply(200, { success: true });

    await setWebhook(webhook, configPath);

    expect(log.print).toHaveBeenCalledTimes(1);
    expect(log.print.mock.calls[0][0]).toMatch(/Successfully/);
  });

  it('get ngrok webhook to setup', async () => {
    const { postUrl } = setup();

    client.onPost(postUrl).reply(200, { success: true });

    await setWebhook(undefined, configPath);

    expect(log.print).toHaveBeenCalledTimes(1);
    expect(log.print.mock.calls[0][0]).toMatch(/Successfully/);
  });
});

describe('reject', () => {
  it('reject when `accessToken` not found in config file', async () => {
    const { webhook } = setup();
    getConfig.mockReturnValue({});
    process.exit = jest.fn();

    await setWebhook(webhook, configPath);

    expect(log.error).toBeCalledWith(
      '`accessToken` is not found in config file'
    );
    expect(process.exit).toBeCalled();
  });

  it('reject when telegram return not success', () => {
    const { postUrl, webhook } = setup();
    client.onPost(postUrl).reply(400, { success: false });
    expect(setWebhook(webhook, configPath).then).toThrow();
  });
});
