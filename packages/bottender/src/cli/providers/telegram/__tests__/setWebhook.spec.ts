import Confirm from 'prompt-confirm';
import { TelegramClient } from 'messaging-api-telegram';

import getChannelConfig from '../../../shared/getChannelConfig';
import getWebhookFromNgrok from '../../../shared/getWebhookFromNgrok';
import { setWebhook } from '../webhook';
import * as log from '../../../shared/log';

jest.mock('messaging-api-telegram');
jest.mock('prompt-confirm');

jest.mock('../../../shared/getWebhookFromNgrok');
jest.mock('../../../shared/log');
jest.mock('../../../shared/getChannelConfig');

const MOCK_FILE_WITH_PLATFORM = {
  channels: {
    telegram: {
      accessToken: '__accessToken__',
    },
    line: {},
  },
};

const setup = (
  { webhook = undefined, ngrokPort = undefined, token = undefined } = {
    webhook: undefined,
    ngrokPort: undefined,
    token: undefined,
  }
) => ({
  argv: {
    '--webhook': webhook,
    '--ngrok-port': ngrokPort,
  },
});

beforeEach(() => {
  process.exit = jest.fn();
  getChannelConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.channels.telegram);

  getWebhookFromNgrok.mockResolvedValue('https://fakeDomain.ngrok.io');

  Confirm.mockImplementation(() => ({
    run: jest.fn().mockResolvedValue(true),
  }));

  TelegramClient.connect.mockReturnValue({
    setWebhook: jest.fn().mockResolvedValue(true),
  });
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

    getChannelConfig.mockReturnValue({});

    await setWebhook(ctx);

    expect(log.error).toBeCalledWith(
      '`accessToken` is not found in the `bottender.config.js` file'
    );
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
