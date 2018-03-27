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
  { webhook = undefined, ngrokPort = undefined, token = undefined } = {
    webhook: undefined,
    ngrokPort: undefined,
    token: undefined,
  }
) => ({
  argv: {
    webhook,
    ngrokPort,
    token,
    t: token,
  },
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
    setWebhook: jest.fn(() => Promise.resolve(true)),
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
    const ctx = setup({ webhook: 'http://example.com/webhook' });

    await setWebhook(ctx);

    expect(log.print).toHaveBeenCalledTimes(1);
    expect(log.print.mock.calls[0][0]).toMatch(/Successfully/);
  });

  it('-t --token should work', async () => {
    const ctx = setup({ token: '12345' });

    await setWebhook(ctx);

    expect(TelegramClient.connect).toBeCalledWith('12345');
  });

  it('get ngrok webhook to setup', async () => {
    const ctx = setup();

    await setWebhook(ctx);

    expect(getWebhookFromNgrok).toBeCalledWith('4040');
    expect(log.print).toHaveBeenCalledTimes(1);
    expect(log.print.mock.calls[0][0]).toMatch(/Successfully/);
  });

  it('set ngrok webhook port', async () => {
    const ctx = setup({ ngrokPort: '5555' });
    ctx.argv['ngrok-port'] = ctx.argv.ngrokPort;

    await setWebhook(ctx);

    expect(getWebhookFromNgrok).toBeCalledWith('5555');
  });
});

describe('reject', () => {
  it('reject when accessToken not found in config file', async () => {
    const ctx = setup({ webhook: 'http://example.com/webhook' });

    getConfig.mockReturnValue({});

    await setWebhook(ctx);

    expect(log.error).toBeCalledWith('accessToken is not found in config file');
    expect(process.exit).toBeCalled();
  });

  it('reject when telegram return not success', async () => {
    const ctx = setup({ webhook: 'http://example.com/webhook' });

    TelegramClient.connect().setWebhook.mockImplementation(() => {
      throw new Error();
    });

    await setWebhook(ctx);

    expect(log.error).toBeCalledWith('Failed to set Telegram webhook');
    expect(process.exit).toBeCalled();
  });
});
