import { setWebhook } from '../webhook';

jest.mock('messaging-api-telegram');
jest.mock('prompt-confirm');

jest.mock('../../../shared/getWebhookFromNgrok');
jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const Confirm = require('prompt-confirm');
const { TelegramClient } = require('messaging-api-telegram');

const getWebhookFromNgrok = require('../../../shared/getWebhookFromNgrok')
  .default;
const log = require('../../../shared/log');
const getConfig = require('../../../shared/getConfig');

const MOCK_FILE_WITH_PLATFORM = {
  telegram: {
    accessToken: '__accessToken__',
  },
  line: {},
};
const _exit = process.exit;

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

  getWebhookFromNgrok.mockReturnValue(
    Promise.resolve('https://fakeDomain.ngrok.io')
  );

  Confirm.mockImplementation(() => ({
    run: jest.fn(() => Promise.resolve(true)),
  }));

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

    expect(getWebhookFromNgrok).toBeCalledWith('4040');
    expect(log.print).toHaveBeenCalledTimes(1);
    expect(log.print.mock.calls[0][0]).toMatch(/Successfully/);
  });

  it('set ngrok webhook port', async () => {
    await setWebhook(undefined, '5555');

    expect(getWebhookFromNgrok).toBeCalledWith('5555');
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
    TelegramClient.connect().setWebhook.mockReturnValueOnce(
      Promise.resolve({
        ok: false,
      })
    );
    expect(setWebhook(webhook).then).toThrow();
  });
});
