import { setMessengerProfile } from '../profile';

jest.mock('messaging-api-messenger');
jest.mock('warning');

jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const { MessengerClient } = require('messaging-api-messenger');

const log = require('../../../shared/log');
const getConfig = require('../../../shared/getConfig');

const MOCK_FILE_WITH_PLATFORM = {
  messenger: {
    accessToken: '__FAKE_TOKEN__',
    profile: {
      persistent_menu: [
        {
          locale: 'default',
          composer_input_disabled: false,
          call_to_actions: [
            {
              type: 'web_url',
              title: 'Powered by Example',
              url: 'https://www.example.com/',
            },
          ],
        },
      ],
    },
  },
  line: {},
};

let _client;
const _exit = process.exit;

beforeEach(() => {
  process.NODE_ENV = 'test';
  process.exit = jest.fn();
  _client = {
    setMessengerProfile: jest.fn(),
  };
  MessengerClient.connect = jest.fn(() => _client);
  log.print = jest.fn();
  log.error = jest.fn();
  log.bold = jest.fn();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.messenger);
});

afterEach(() => {
  process.exit = _exit;
  jest.resetAllMocks();
});

it('be defined', () => {
  expect(setMessengerProfile).toBeDefined();
});

describe('resolve', () => {
  it('successfully set persistent menu', async () => {
    await setMessengerProfile();

    expect(_client.setMessengerProfile).toBeCalledWith({
      persistent_menu: [
        {
          locale: 'default',
          composer_input_disabled: false,
          call_to_actions: [
            {
              type: 'web_url',
              title: 'Powered by Example',
              url: 'https://www.example.com/',
            },
          ],
        },
      ],
    });
  });
});

describe('reject', () => {
  it('handle error thrown with only status', async () => {
    const error = {
      response: {
        status: 400,
      },
    };

    _client.setMessengerProfile.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await setMessengerProfile();

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
    _client.setMessengerProfile.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await setMessengerProfile();

    expect(log.error).toBeCalled();
    expect(log.error.mock.calls[2][0]).not.toMatch(/\[object Object\]/);
    expect(process.exit).toBeCalled();
  });
});
