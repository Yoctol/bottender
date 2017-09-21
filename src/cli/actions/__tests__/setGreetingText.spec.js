import setGreetingText from '../setGreetingText';

jest.mock('messaging-api-messenger');

jest.mock('../../shared/log');
jest.mock('../../shared/getConfig');

const { MessengerClient } = require('messaging-api-messenger');

const log = require('../../shared/log');
const getConfig = require('../../shared/getConfig');

const MOCK_FILE_WITH_PLATFORM = {
  messenger: {
    accessToken: '__FAKE_TOKEN__',
  },
  line: {},
};
const configPath = 'bot.sample.json';
const greetingText = '__FAKE_GREETING_TEXT__';

let _client;

beforeEach(() => {
  _client = {
    setGreetingText: jest.fn(),
  };
  MessengerClient.connect = jest.fn(() => _client);
  log.error = jest.fn();
  log.print = jest.fn();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.messenger);
});

it('be defined', () => {
  expect(setGreetingText).toBeDefined();
});

describe('resolved', () => {
  it('call setGreetingText with text', async () => {
    _client.setGreetingText.mockReturnValue(Promise.resolve());

    await setGreetingText(greetingText, configPath);

    expect(log.print).toHaveBeenCalledTimes(1);
    expect(_client.setGreetingText).toBeCalledWith('__FAKE_GREETING_TEXT__');
  });

  it('use config file greetingText', async () => {
    _client.setGreetingText.mockReturnValue(Promise.resolve());
    getConfig.mockReturnValue({
      accessToken: '__FAKE_TOKEN__',
      greetingText: '__FAKE_GREETING_TEXT_IN_TEST_CASE__',
    });

    await setGreetingText(undefined, configPath);

    expect(log.print).toHaveBeenCalledTimes(1);
    expect(_client.setGreetingText).toBeCalledWith(
      '__FAKE_GREETING_TEXT_IN_TEST_CASE__'
    );
  });
});

describe('reject', () => {
  it('handle error thrown when no greetingText pass or find in config file', async () => {
    process.exit = jest.fn();

    await setGreetingText(undefined, configPath);

    expect(log.error).toHaveBeenCalledTimes(2);
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown with only status', async () => {
    const error = {
      response: {
        status: 400,
      },
    };
    _client.setGreetingText.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await setGreetingText(greetingText, configPath);

    expect(log.error).toHaveBeenCalledTimes(2);
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
    _client.setGreetingText.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await setGreetingText(greetingText, configPath);

    expect(log.error).toHaveBeenCalledTimes(3);
    expect(log.error.mock.calls[2][0]).not.toMatch(/\[object Object\]/);
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown by ourselves', async () => {
    const error = {
      message: 'something wrong happened',
    };
    _client.setGreetingText.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await setGreetingText(greetingText, configPath);

    expect(log.error).toHaveBeenCalledTimes(2);
    expect(process.exit).toBeCalled();
  });
});
