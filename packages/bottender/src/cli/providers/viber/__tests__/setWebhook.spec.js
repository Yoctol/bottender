import { setWebhook } from '../webhook';

jest.mock('messaging-api-viber');
jest.mock('prompt-confirm');

jest.mock('../../../shared/getWebhookFromNgrok');
jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const Confirm = require('prompt-confirm');
const { ViberClient } = require('messaging-api-viber');

const getWebhookFromNgrok = require('../../../shared/getWebhookFromNgrok')
  .default;
const log = require('../../../shared/log');
const getConfig = require('../../../shared/getConfig').default;

const MOCK_FILE_WITH_PLATFORM = {
  channels: {
    viber: {
      accessToken: '__accessToken__',
    },
  },
};

const setup = (
  {
    webhook = 'http://example.com/webhook',
    eventTypes = [],
    accessToken = undefined,
  } = {
    webhook: 'http://example.com/webhook',
    eventTypes: [],
    accessToken: undefined,
  }
) => ({
  webhook,
  accessToken,
  eventTypes,
});

beforeEach(() => {
  process.exit = jest.fn();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.channels.viber);

  getWebhookFromNgrok.mockResolvedValue('https://fakeDomain.ngrok.io');

  Confirm.mockImplementation(() => ({
    run: jest.fn().mockResolvedValue(true),
  }));

  ViberClient.connect.mockReturnValue({
    setWebhook: jest.fn(() => ({
      status: 0,
      status_message: 'ok',
      event_types: [
        'delivered',
        'seen',
        'failed',
        'subscribed',
        'unsubscribed',
        'conversation_started',
      ],
    })),
  });
});

it('be defined', () => {
  expect(setWebhook).toBeDefined();
});

describe('resolve', () => {
  it('successfully set webhook', async () => {
    const { webhook, accessToken, eventTypes } = setup({
      eventTypes: ['delivered', 'seen'],
    });

    await setWebhook(webhook, undefined, accessToken, eventTypes);

    expect(ViberClient.connect().setWebhook).toBeCalledWith(
      webhook,
      eventTypes
    );
    expect(log.print).toHaveBeenCalledTimes(1);
    expect(log.print.mock.calls[0][0]).toMatch(/Successfully/);
  });

  it('-t --token should work', async () => {
    const { webhook, accessToken } = setup({ accessToken: '12345' });

    await setWebhook(webhook, undefined, accessToken);

    expect(ViberClient.connect).toBeCalledWith('12345');
  });

  it('get ngrok webhook to setup', async () => {
    await setWebhook(undefined);

    expect(getWebhookFromNgrok).toBeCalledWith('4040');
    expect(ViberClient.connect().setWebhook).toBeCalledWith(
      'https://fakeDomain.ngrok.io',
      []
    );
    expect(log.print).toHaveBeenCalledTimes(1);
    expect(log.print.mock.calls[0][0]).toMatch(/Successfully/);
  });

  it('set ngrok webhook port', async () => {
    await setWebhook(undefined, '5555');

    expect(getWebhookFromNgrok).toBeCalledWith('5555');
  });
});

describe('reject', () => {
  it('reject when accessToken not found in config file', async () => {
    const { webhook } = setup();
    getConfig.mockReturnValue({});
    process.exit = jest.fn();

    await setWebhook(webhook);

    expect(log.error).toBeCalledWith('accessToken is not found in config file');
    expect(process.exit).toBeCalled();
  });

  it('reject when viber return not success', () => {
    const { webhook } = setup();
    ViberClient.connect().setWebhook.mockRejectedValueOnce(
      new Error('setWebhook failed')
    );

    expect(setWebhook(webhook).then).toThrow();
  });
});
