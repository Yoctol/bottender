import MockAdapter from 'axios-mock-adapter';

import { setWebhook, localClient as _localClient } from '../webhook';

jest.mock('messaging-api-viber');
jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const { ViberClient } = require('messaging-api-viber');

const log = require('../../../shared/log');
const getConfig = require('../../../shared/getConfig');

const MOCK_FILE_WITH_PLATFORM = {
  viber: {
    accessToken: '__accessToken__',
  },
};
const _exit = process.exit;

let localClient;

const setup = (
  { webhook = 'http://example.com/webhook', eventTypes = [] } = {
    webhook: 'http://example.com/webhook',
    eventTypes: [],
  }
) => ({
  webhook,
  eventTypes,
});

beforeEach(() => {
  process.exit = jest.fn();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.viber);

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

afterEach(() => {
  process.exit = _exit;
});

it('be defined', () => {
  expect(setWebhook).toBeDefined();
});

describe('resolve', () => {
  it('successfully set webhook', async () => {
    const { webhook, eventTypes } = setup({
      eventTypes: ['delivered', 'seen'],
    });

    await setWebhook(webhook, eventTypes);

    expect(ViberClient.connect().setWebhook).toBeCalledWith(
      webhook,
      eventTypes
    );
    expect(log.print).toHaveBeenCalledTimes(1);
    expect(log.print.mock.calls[0][0]).toMatch(/Successfully/);
  });

  it('get ngrok webhook to setup', async () => {
    await setWebhook(undefined);

    expect(ViberClient.connect().setWebhook).toBeCalledWith(
      'https://fakeDomain.ngrok.io',
      []
    );
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

  it('reject when viber return not success', () => {
    const { webhook } = setup();
    ViberClient.connect().setWebhook.mockReturnValueOnce(() =>
      Promise.reject()
    );

    expect(setWebhook(webhook).then).toThrow();
  });
});
