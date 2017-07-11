import setGetStartedButton from '../setGetStartedButton';

jest.mock('messaging-api-messenger');

jest.mock('../../shared/log');
jest.mock('../../shared/getConfig');

const { MessengerClient } = require('messaging-api-messenger');

const log = require('../../shared/log');
const getConfig = require('../../shared/getConfig');

const defaultPayload = '__GET_STARTED__';
const MOCK_FILE_WITH_PLATFORM = {
  messenger: {
    accessToken: '__FAKE_TOKEN__',
  },
  LINE: {},
};
const configPath = 'bot.sample.json';

let _client;

beforeEach(() => {
  _client = {
    setGetStartedButton: jest.fn(),
  };
  MessengerClient.factory = jest.fn(() => _client);
  log.error = jest.fn();
  log.print = jest.fn();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.messenger);
});

it('be defined', () => {
  expect(setGetStartedButton).toBeDefined();
});

describe('#getConfig', () => {
  it('will call `bot.json` and platform = messenger when NOT passed <config_path>', async () => {
    _client.setGetStartedButton.mockReturnValue(Promise.resolve());

    await setGetStartedButton(defaultPayload);

    expect(getConfig).toBeCalledWith('bot.json', 'messenger');
  });

  it('will call <config_path> when it was passed', async () => {
    _client.setGetStartedButton.mockReturnValue(Promise.resolve());

    await setGetStartedButton(defaultPayload, configPath);

    expect(getConfig).toBeCalledWith('bot.sample.json', 'messenger');
  });
});

describe('resolved', () => {
  it('call setGetStartedButton with default payload', async () => {
    _client.setGetStartedButton.mockReturnValue(Promise.resolve());

    await setGetStartedButton(defaultPayload, configPath);

    expect(log.print).toHaveBeenCalledTimes(1);
    expect(_client.setGetStartedButton).toBeCalledWith(defaultPayload);
  });

  it('call setGetStartedButtonPayload in config file', async () => {
    _client.setGetStartedButton.mockReturnValue(Promise.resolve());
    getConfig.mockReturnValue({
      accessToken: '__FAKE_TOKEN__',
      getStartedButtonPayload: '__PUT_YOUR_PAYLOAD_HERE__',
    });

    await setGetStartedButton(undefined, configPath);

    expect(log.print).toHaveBeenCalledTimes(1);
    expect(_client.setGetStartedButton).toBeCalledWith(
      '__PUT_YOUR_PAYLOAD_HERE__'
    );
  });
});

describe('reject', () => {
  it('handle error when no payload found', async () => {
    process.exit = jest.fn();
    await setGetStartedButton(undefined, configPath);
    expect(log.error).toHaveBeenCalledTimes(2);
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown with only status', async () => {
    const error = {
      response: {
        status: 400,
      },
    };
    _client.setGetStartedButton.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await setGetStartedButton(defaultPayload, configPath);

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
    _client.setGetStartedButton.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await setGetStartedButton(defaultPayload, configPath);

    expect(log.error).toHaveBeenCalledTimes(3);
    expect(log.error.mock.calls[2][0]).not.toMatch(/\[object Object\]/);
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown by ourselves', async () => {
    const error = {
      message: 'something wrong happened',
    };
    _client.setGetStartedButton.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await setGetStartedButton(defaultPayload, configPath);

    expect(log.error).toHaveBeenCalledTimes(2);
    expect(process.exit).toBeCalled();
  });
});
