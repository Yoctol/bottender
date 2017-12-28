import { getPersistentMenu } from '../persistent-menu';

jest.mock('messaging-api-messenger');

jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const { MessengerClient } = require('messaging-api-messenger');

const log = require('../../../shared/log');
const getConfig = require('../../../shared/getConfig');

const MOCK_FILE_WITH_PLATFORM = {
  messenger: {
    accessToken: '__FAKE_TOKEN__',
  },
};

let _client;
const _consoleLog = console.log;

beforeEach(() => {
  _client = {
    getPersistentMenu: jest.fn(),
  };
  MessengerClient.connect = jest.fn(() => _client);
  log.error = jest.fn();
  log.print = jest.fn();
  console.log = jest.fn();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.messenger);
});

afterEach(() => {
  console.log = _consoleLog;
});

it('be defined', () => {
  expect(getPersistentMenu).toBeDefined();
});

describe('resolved', () => {
  it('call getPersistentMenu', async () => {
    _client.getPersistentMenu.mockReturnValue(
      Promise.resolve([
        {
          composer_input_disabled: false,
          call_to_actions: [
            {
              type: 'postback',
              title: 'RESTART',
              payload: 'RESTART',
            },
          ],
        },
      ])
    );

    await getPersistentMenu();

    expect(_client.getPersistentMenu).toBeCalled();
  });

  it('error when no config setting', async () => {
    _client.getPersistentMenu.mockReturnValue(Promise.resolve([]));

    await getPersistentMenu();

    expect(log.error).toBeCalled();
    expect(_client.getPersistentMenu).toBeCalled();
  });
});

describe('reject', () => {
  it('handle error thrown with only status', async () => {
    const error = {
      response: {
        status: 400,
      },
    };
    _client.getPersistentMenu.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await getPersistentMenu();

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown by messenger', async () => {
    const error = {
      response: {
        status: 400,
        data: {
          error: {
            message: '(#100) ...',
            type: 'OAuthException',
            code: 100,
            error_subcode: 2018145,
            fbtrace_id: 'HXd3kIOXLsK',
          },
        },
      },
    };
    _client.getPersistentMenu.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await getPersistentMenu();

    expect(log.error).toBeCalled();
    expect(log.error.mock.calls[2][0]).not.toMatch(/\[object Object\]/);
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown by ourselves', async () => {
    const error = {
      message: 'something wrong happened',
    };
    _client.getPersistentMenu.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await getPersistentMenu();

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });
});
