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
  line: {},
};

let _client;

beforeEach(() => {
  _client = {
    getPersistentMenu: jest.fn(),
  };
  MessengerClient.connect = jest.fn(() => _client);
  log.error = jest.fn();
  log.print = jest.fn();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.messenger);
});

it('be defined', () => {
  expect(getPersistentMenu).toBeDefined();
});

describe('#getConfig', () => {
  it('will call `bottender.config.js` and platform = messenger when NOT passed <config_path>', async () => {
    _client.getPersistentMenu.mockReturnValue(
      Promise.resolve({
        data: [
          {
            persistent_menu: [
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
            ],
          },
        ],
      })
    );

    await getPersistentMenu();

    expect(getConfig).toBeCalledWith('bottender.config.js', 'messenger');
  });
});

describe('resolved', () => {
  it('call getPersistentMenu', async () => {
    _client.getPersistentMenu.mockReturnValue(
      Promise.resolve({
        data: [
          {
            persistent_menu: [
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
            ],
          },
        ],
      })
    );

    await getPersistentMenu();

    expect(_client.getPersistentMenu).toBeCalled();
  });

  it('error when no config setting', async () => {
    _client.getPersistentMenu.mockReturnValue(
      Promise.resolve({
        data: [],
      })
    );

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
