import { setWhitelistedDomains } from '../whitelisted-domains';

jest.mock('messaging-api-messenger');

jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const { MessengerClient } = require('messaging-api-messenger');

const log = require('../../../shared/log');
const getConfig = require('../../../shared/getConfig');

const domains = ['http://www.facebook.com'];
const MOCK_FILE_WITH_PLATFORM = {
  messenger: {
    accessToken: '__FAKE_TOKEN__',
  },
  line: {},
};
const configPath = 'bot.sample.json';

let _client;

beforeEach(() => {
  _client = {
    setDomainWhitelist: jest.fn(),
  };
  MessengerClient.connect = jest.fn(() => _client);
  log.error = jest.fn();
  log.print = jest.fn();
  getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.messenger);
});

it('be defined', () => {
  expect(setWhitelistedDomains).toBeDefined();
});

describe('#getConfig', () => {
  it('will call `bottender.config.js` and platform = messenger when NOT passed <config_path>', async () => {
    _client.setDomainWhitelist.mockReturnValue(Promise.resolve());

    await setWhitelistedDomains(domains);

    expect(getConfig).toBeCalledWith('bottender.config.js', 'messenger');
  });

  it('will call <config_path> when it was passed', async () => {
    _client.setDomainWhitelist.mockReturnValue(Promise.resolve());

    await setWhitelistedDomains(domains, configPath);

    expect(getConfig).toBeCalledWith('bot.sample.json', 'messenger');
  });
});

describe('resolved', () => {
  it('call setWhitelistedDomains with array of domains', async () => {
    _client.setDomainWhitelist.mockReturnValue(Promise.resolve());

    await setWhitelistedDomains(domains, configPath);

    expect(log.print).toHaveBeenCalledTimes(1);
    expect(_client.setDomainWhitelist).toBeCalledWith([
      'http://www.facebook.com',
    ]);
  });

  it('call setWhitelistedDomains with array of domains from config file', async () => {
    _client.setDomainWhitelist.mockReturnValue(Promise.resolve());
    getConfig.mockReturnValue({
      accessToken: '__FAKE_TOKEN__',
      domainWhitelist: ['http://www.facebook.com', 'http://www.example.com'],
    });

    await setWhitelistedDomains(undefined, configPath);

    expect(log.print).toHaveBeenCalledTimes(1);
    expect(_client.setDomainWhitelist).toBeCalledWith([
      'http://www.facebook.com',
      'http://www.example.com',
    ]);
  });
});

describe('reject', () => {
  it('handle error when not found domainWhitelist in args or config file', async () => {
    process.exit = jest.fn();

    await setWhitelistedDomains(undefined, configPath);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown with only status', async () => {
    const error = {
      response: {
        status: 400,
      },
    };
    _client.setDomainWhitelist.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await setWhitelistedDomains(domains, configPath);

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
    _client.setDomainWhitelist.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await setWhitelistedDomains(domains, configPath);

    expect(log.error).toBeCalled();
    expect(log.error.mock.calls[2][0]).not.toMatch(/\[object Object\]/);
    expect(process.exit).toBeCalled();
  });

  it('handle error thrown by ourselves', async () => {
    const error = {
      message: 'something wrong happened',
    };
    _client.setDomainWhitelist.mockReturnValue(Promise.reject(error));

    process.exit = jest.fn();

    await setWhitelistedDomains(domains, configPath);

    expect(log.error).toBeCalled();
    expect(process.exit).toBeCalled();
  });
});
