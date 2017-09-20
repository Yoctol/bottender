import getGetStartedButton from '../getGetStartedButton';

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
  LINE: {},
};
const configPath = 'bot.sample.json';

let _client;

beforeEach(() => {
  _client = {
    getGetStartedButton: jest.fn(),
  };
  MessengerClient.connect = jest.fn(() => _client);
  log.error = jest.fn();
  log.print = jest.fn();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.messenger);
});

it('be defined', () => {
  expect(getGetStartedButton).toBeDefined();
});

describe('#getConfig', () => {
  it('will call `bottender.config.js` and platform = messenger when NOT passed <config_path>', async () => {
    _client.getGetStartedButton.mockReturnValue(
      Promise.resolve({
        data: [
          {
            get_started: {
              payload: 'get started yo!',
            },
          },
        ],
      })
    );

    await getGetStartedButton();

    expect(getConfig).toBeCalledWith('bottender.config.js', 'messenger');
  });

  it('will call <config_path> when it was passed', async () => {
    _client.getGetStartedButton.mockReturnValue(
      Promise.resolve({
        data: [
          {
            get_started: {
              payload: 'get started yo!',
            },
          },
        ],
      })
    );

    await getGetStartedButton(configPath);

    expect(getConfig).toBeCalledWith('bot.sample.json', 'messenger');
  });
});

describe('resolved', () => {
  it('call getGetStartedButton', async () => {
    _client.getGetStartedButton.mockReturnValue(
      Promise.resolve({
        data: [
          {
            get_started: {
              payload: 'get started yo!',
            },
          },
        ],
      })
    );

    await getGetStartedButton(configPath);

    expect(log.print).toHaveBeenCalledTimes(1);
    expect(_client.getGetStartedButton).toBeCalled();
  });

  it('error when no config setting', async () => {
    _client.getGetStartedButton.mockReturnValue(
      Promise.resolve({
        data: [],
      })
    );

    await getGetStartedButton(configPath);

    expect(log.error).toHaveBeenCalledTimes(1);
    expect(_client.getGetStartedButton).toBeCalled();
  });
});

describe('reject', () => {
  it('handle error thrown with only status', async () => {
    const error = {
      response: {
        status: 400,
      },
    };
    _client.getGetStartedButton.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await getGetStartedButton(configPath);

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
    _client.getGetStartedButton.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await getGetStartedButton(configPath);

    expect(log.error).toHaveBeenCalledTimes(3);
    expect(log.error.mock.calls[2][0]).not.toMatch(/\[object Object\]/);
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown by ourselves', async () => {
    const error = {
      message: 'something wrong happened',
    };
    _client.getGetStartedButton.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await getGetStartedButton(configPath);

    expect(log.error).toHaveBeenCalledTimes(2);
    expect(process.exit).toBeCalled();
  });
});
