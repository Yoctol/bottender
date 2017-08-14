import MockAdapter from 'axios-mock-adapter';

import setTelegramWebhook, {
  client as _client,
  localClient as _localClient,
} from '../setTelegramWebhook';

jest.mock('../../shared/log');
jest.mock('../../shared/getConfig');

const log = require('../../shared/log');
const getConfig = require('../../shared/getConfig');

const MOCK_FILE_WITH_PLATFORM = {
  telegram: {
    token: '__TOKEN__',
  },
  LINE: {},
};
const configPath = 'bot.sample.json';

let client;
let localClient;

const setup = (
  {
    token = MOCK_FILE_WITH_PLATFORM.telegram.token,
    webhook = 'http://example.com/webhook',
  } = {
    token: MOCK_FILE_WITH_PLATFORM.telegram.token,
    webhook: 'http://example.com/webhook',
  }
) => ({
  postUrl: `/bot${token}/setWebhook`,
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
  expect(setTelegramWebhook).toBeDefined();
});

describe('resolve', () => {
  it('successfully set webhook', async () => {
    const { webhook } = setup();

    await setTelegramWebhook(webhook, configPath);

    expect(log.print).toHaveBeenCalledTimes(1);
    expect(log.print.mock.calls[0]).toEqual(['Successfully set webhook']);
  });

  it('use default fields to setup', async () => {
    const { postUrl, webhook } = setup({
      webhook: 'http://fakeurl.com',
    });
    client.onPost(postUrl).reply(200, { success: true });

    await setTelegramWebhook(webhook, configPath);

    expect(log.print).toHaveBeenCalledTimes(1);
    expect(log.print.mock.calls[0]).toEqual(['Successfully set webhook']);
  });

  it('get ngrok webhook to setup', async () => {
    const { postUrl } = setup();

    client.onPost(postUrl).reply(200, { success: true });

    await setTelegramWebhook(undefined, configPath);

    expect(log.print).toHaveBeenCalledTimes(1);
    expect(log.print.mock.calls[0]).toEqual(['Successfully set webhook']);
  });
});

describe('reject', () => {
  it('reject when `token` not found in config file', async () => {
    const { webhook } = setup();
    getConfig.mockReturnValue({});
    process.exit = jest.fn();

    await setTelegramWebhook(webhook, configPath);

    expect(log.error).toBeCalledWith('set webhook error with');
    expect(process.exit).toBeCalled();
  });

  it('reject when telegram return not success', () => {
    const { postUrl, webhook } = setup();
    client.onPost(postUrl).reply(400, { success: false });
    expect(setTelegramWebhook(webhook, configPath).then).toThrow();
  });
});
