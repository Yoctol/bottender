import MockAdapter from 'axios-mock-adapter';

import { setWebhook, localClient as _localClient } from '../webhook';

jest.mock('messaging-api-telegram');
jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const { TelegramClient } = require('messaging-api-telegram');

const log = require('../../../shared/log');
const getConfig = require('../../../shared/getConfig');

const MOCK_FILE_WITH_PLATFORM = {
  telegram: {
    accessToken: '__accessToken__',
  },
  line: {},
};
const _exit = process.exit;

let localClient;

const setup = (
  { webhook = 'http://example.com/webhook' } = {
    webhook: 'http://example.com/webhook',
  }
) => ({
  webhook,
});

beforeEach(() => {
  process.exit = jest.fn();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.telegram);

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

  TelegramClient.connect.mockReturnValue({
    setWebhook: jest.fn(() =>
      Promise.resolve({
        ok: true,
        result: {
          url: 'https://4a16faff.ngrok.io/',
          has_custom_certificate: false,
          pending_update_count: 0,
          max_connections: 40,
        },
      })
    ),
  });
});

afterEach(() => {
  process.exit = _exit;
  jest.resetAllMocks();
});

it('be defined', () => {
  expect(setWebhook).toBeDefined();
});

describe('resolve', () => {
  it('successfully set webhook', async () => {
    const { webhook } = setup();

    await setWebhook(webhook);

    expect(log.print).toHaveBeenCalledTimes(1);
    expect(log.print.mock.calls[0][0]).toMatch(/Successfully/);
  });

  it('get ngrok webhook to setup', async () => {
    await setWebhook(undefined);

    expect(log.print).toHaveBeenCalledTimes(1);
    expect(log.print.mock.calls[0][0]).toMatch(/Successfully/);
  });
});

describe('reject', () => {
  it('reject when `accessToken` not found in config file', async () => {
    const { webhook } = setup();
    getConfig.mockReturnValue({});
    process.exit = jest.fn();

    await setWebhook(webhook);

    expect(log.error).toBeCalledWith(
      '`accessToken` is not found in config file'
    );
    expect(process.exit).toBeCalled();
  });

  it('reject when telegram return not success', () => {
    const { webhook } = setup();
    TelegramClient.connect().setWebhook.mockImplementationOnce(
      Promise.resolve({
        ok: false,
      })
    );
    expect(setWebhook(webhook).then).toThrow();
  });
});
