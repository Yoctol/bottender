/* eslint-disable global-require */

jest.mock('didyoumean');
jest.mock('../shared/log');
jest.mock('../actions/init');
jest.mock('../actions/deleteWhitelistedDomains');
jest.mock('../actions/deleteGetStartedButton');
jest.mock('../actions/deleteGreetingText');
jest.mock('../actions/deletePersistentMenu');
jest.mock('../actions/getWhitelistedDomains');
jest.mock('../actions/getGetStartedButton');
jest.mock('../actions/getGreetingText');
jest.mock('../actions/getPersistentMenu');
jest.mock('../actions/setWhitelistedDomains');
jest.mock('../actions/setGetStartedButton');
jest.mock('../actions/setGreetingText');
jest.mock('../actions/setMessengerProfile');
jest.mock('../actions/setPersistentMenu');
jest.mock('../actions/setMessengerWebhook');
jest.mock('../actions/setTelegramWebhook');

let log;
let didYouMean;

beforeEach(() => {
  jest.resetModules();
  didYouMean = require('didyoumean');
  log = require('../shared/log');
  log.error = jest.fn();
  log.bold = str => str;
  process.exit = jest.fn();
});

it('#init', () => {
  const init = require('../actions/init');
  init.default = jest.fn();
  process.argv = ['/usr/local/bin/iojs', '/usr/local/bin/bottender', 'init'];
  require('../index');
  expect(init.default).toHaveBeenCalledTimes(1);
});

describe('messenger', () => {
  describe('domain-whilelist', () => {
    it('#get', () => {
      const getWhitelistedDomains = require('../actions/getWhitelistedDomains');
      getWhitelistedDomains.default = jest.fn();
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'messenger',
        'whitelisted-domains',
        'get',
        '-c',
        'bottender.config.js',
      ];
      require('../index');
      expect(getWhitelistedDomains.default).toBeCalledWith(
        'bottender.config.js'
      );
    });

    it('#set', () => {
      const setWhitelistedDomains = require('../actions/setWhitelistedDomains');
      setWhitelistedDomains.default = jest.fn();
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'messenger',
        'whitelisted-domains',
        'set',
        '-c',
        'bottender.config.js',
        '-d',
        'http://www.yoctol.com,http://www.facebook.com',
      ];
      require('../index');
      expect(setWhitelistedDomains.default).toBeCalledWith(
        ['http://www.yoctol.com', 'http://www.facebook.com'],
        'bottender.config.js'
      );
    });

    it('#delete', () => {
      const deleteWhitelistedDomains = require('../actions/deleteWhitelistedDomains');
      deleteWhitelistedDomains.default = jest.fn();
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'messenger',
        'whitelisted-domains',
        'delete',
        '-c',
        'bottender.config.js',
      ];
      require('../index');
      expect(deleteWhitelistedDomains.default).toBeCalledWith(
        'bottender.config.js'
      );
    });
  });

  describe('get-started', () => {
    it('#get', () => {
      const getGetStartedButton = require('../actions/getGetStartedButton');
      getGetStartedButton.default = jest.fn();
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'messenger',
        'get-started',
        'get',
        '-c',
        'bottender.config.js',
      ];
      require('../index');
      expect(getGetStartedButton.default).toBeCalledWith('bottender.config.js');
    });

    it('#set', () => {
      const setGetStartedButton = require('../actions/setGetStartedButton');
      setGetStartedButton.default = jest.fn();
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'messenger',
        'get-started',
        'set',
        '-c',
        'bottender.config.js',
        '-p',
        '__PAYLOAD__',
      ];
      require('../index');
      expect(setGetStartedButton.default).toBeCalledWith(
        '__PAYLOAD__',
        'bottender.config.js'
      );
    });

    it('#delete', () => {
      const deleteGetStartedButton = require('../actions/deleteGetStartedButton');
      deleteGetStartedButton.default = jest.fn();
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'messenger',
        'get-started',
        'delete',
        '-c',
        'bottender.config.js',
      ];
      require('../index');
      expect(deleteGetStartedButton.default).toBeCalledWith(
        'bottender.config.js'
      );
    });
  });

  describe('greeting-text', () => {
    it('#get', () => {
      const getGreetingText = require('../actions/getGreetingText');
      getGreetingText.default = jest.fn();
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'messenger',
        'greeting-text',
        'get',
        '-c',
        'bottender.config.js',
      ];
      require('../index');
      expect(getGreetingText.default).toBeCalledWith('bottender.config.js');
    });

    it('#set', () => {
      const setGreetingText = require('../actions/setGreetingText');
      setGreetingText.default = jest.fn();
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'messenger',
        'greeting-text',
        'set',
        '-c',
        'bottender.config.js',
        '-g',
        '__greeting_text__',
      ];
      require('../index');
      expect(setGreetingText.default).toBeCalledWith(
        '__greeting_text__',
        'bottender.config.js'
      );
    });

    it('#delete', () => {
      const deleteGreetingText = require('../actions/deleteGreetingText');
      deleteGreetingText.default = jest.fn();
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'messenger',
        'greeting-text',
        'delete',
        '-c',
        'bottender.config.js',
      ];
      require('../index');
      expect(deleteGreetingText.default).toBeCalledWith('bottender.config.js');
    });
  });

  describe('persistent-menu', () => {
    it('#get', () => {
      const getPersistentMenu = require('../actions/getPersistentMenu');
      getPersistentMenu.default = jest.fn();
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'messenger',
        'persistent-menu',
        'get',
        '-c',
        'bottender.config.js',
      ];
      require('../index');
      expect(getPersistentMenu.default).toBeCalledWith('bottender.config.js');
    });

    it('#set', () => {
      const setPersistentMenu = require('../actions/setPersistentMenu');
      setPersistentMenu.default = jest.fn();
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'messenger',
        'persistent-menu',
        'set',
        '-c',
        'bottender.config.js',
      ];
      require('../index');
      expect(setPersistentMenu.default).toBeCalledWith('bottender.config.js');
    });

    it('#delete', () => {
      const deletePersistentMenu = require('../actions/deletePersistentMenu');
      deletePersistentMenu.default = jest.fn();
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'messenger',
        'persistent-menu',
        'delete',
        '-c',
        'bottender.config.js',
      ];
      require('../index');
      expect(deletePersistentMenu.default).toBeCalledWith(
        'bottender.config.js'
      );
    });
  });

  describe('profile', () => {
    it('#set', () => {
      const setMessengerProfile = require('../actions/setMessengerProfile');
      setMessengerProfile.default = jest.fn();
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'messenger',
        'profile',
        'set',
        '-c',
        'bottender.config.js',
      ];
      require('../index');
      expect(setMessengerProfile.default).toBeCalledWith('bottender.config.js');
    });
  });

  describe('webhook set', () => {
    it('to be called when passing options', () => {
      const setMessengerWebhook = require('../actions/setMessengerWebhook');
      setMessengerWebhook.default = jest.fn();
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'messenger',
        'webhook',
        'set',
        '-w',
        'http://test.com',
        '-v',
        '__FAKE_VERIFYTOKEN__',
      ];
      require('../index');
      expect(setMessengerWebhook.default).toBeCalledWith(
        'http://test.com',
        undefined,
        '__FAKE_VERIFYTOKEN__'
      );
    });
  });
});

describe('telegram', () => {
  describe('webhook set', () => {
    it('to be called when passing options', () => {
      const setTelegramWebhook = require('../actions/setTelegramWebhook');
      setTelegramWebhook.default = jest.fn();
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'telegram',
        'webhook',
        'set',
        '-w',
        'http://test.com',
      ];
      require('../index');
      expect(setTelegramWebhook.default).toBeCalledWith(
        'http://test.com',
        undefined
      );
    });
  });
});

describe('*', () => {
  it('call error unknown command', () => {
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/bottender',
      'unknown-command',
    ];
    didYouMean.mockReturnValueOnce(null);
    require('../index');
    expect(log.error).toBeCalledWith(
      `unknown command: ${log.bold('unknown-command')}`
    );
    expect(process.exit).toBeCalledWith(1);
  });

  it('call error unknown command', () => {
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/bottender',
      'unknown-command',
    ];
    didYouMean.mockReturnValueOnce('help');
    require('../index');
    expect(log.error).toBeCalledWith(
      `unknown command: ${log.bold('unknown-command')}`
    );
    expect(log.error).lastCalledWith(`did you mean ${log.bold('help')}?`);
    expect(process.exit).toBeCalledWith(1);
  });
});

it('not warn when there is no any close match', () => {
  process.argv = [
    '/usr/local/bin/iojs',
    '/usr/local/bin/bottender',
    'abcdefghijk',
  ];
  require('../index');
  expect(log.error).toHaveBeenCalledTimes(1);
  expect(process.exit).toBeCalledWith(1);
});
