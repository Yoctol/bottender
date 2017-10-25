/* eslint-disable global-require */

jest.mock('didyoumean');
jest.mock('../shared/log');
jest.mock('../actions/init');
jest.mock('../actions/messenger/whitelisted-domains');
jest.mock('../actions/messenger/get-started');
jest.mock('../actions/messenger/greeting');
jest.mock('../actions/messenger/persistent-menu');
jest.mock('../actions/messenger/profile');
jest.mock('../actions/messenger/webhook');
jest.mock('../actions/telegram/webhook');

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
      const {
        getWhitelistedDomains,
      } = require('../actions/messenger/whitelisted-domains');
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
      expect(getWhitelistedDomains).toBeCalledWith('bottender.config.js');
    });

    it('#set', () => {
      const {
        setWhitelistedDomains,
      } = require('../actions/messenger/whitelisted-domains');
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
      expect(setWhitelistedDomains).toBeCalledWith(
        ['http://www.yoctol.com', 'http://www.facebook.com'],
        'bottender.config.js'
      );
    });

    it('#delete', () => {
      const {
        deleteWhitelistedDomains,
      } = require('../actions/messenger/whitelisted-domains');
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
      expect(deleteWhitelistedDomains).toBeCalledWith('bottender.config.js');
    });
  });

  describe('get-started', () => {
    it('#get', () => {
      const { getGetStarted } = require('../actions/messenger/get-started');
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
      expect(getGetStarted).toBeCalledWith('bottender.config.js');
    });

    it('#set', () => {
      const { setGetStarted } = require('../actions/messenger/get-started');
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
      expect(setGetStarted).toBeCalledWith(
        '__PAYLOAD__',
        'bottender.config.js'
      );
    });

    it('#delete', () => {
      const { deleteGetStarted } = require('../actions/messenger/get-started');
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
      expect(deleteGetStarted).toBeCalledWith('bottender.config.js');
    });
  });

  describe('greeting', () => {
    it('#get', () => {
      const { getGreeting } = require('../actions/messenger/greeting');
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
      expect(getGreeting).toBeCalledWith('bottender.config.js');
    });

    it('#set', () => {
      const { setGreeting } = require('../actions/messenger/greeting');
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
      expect(setGreeting).toBeCalledWith(
        '__greeting_text__',
        'bottender.config.js'
      );
    });

    it('#delete', () => {
      const { deleteGreeting } = require('../actions/messenger/greeting');
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
      expect(deleteGreeting).toBeCalledWith('bottender.config.js');
    });
  });

  describe('persistent-menu', () => {
    it('#get', () => {
      const {
        getPersistentMenu,
      } = require('../actions/messenger/persistent-menu');
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
      expect(getPersistentMenu).toBeCalledWith('bottender.config.js');
    });

    it('#set', () => {
      const {
        setPersistentMenu,
      } = require('../actions/messenger/persistent-menu');
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
      expect(setPersistentMenu).toBeCalledWith('bottender.config.js');
    });

    it('#delete', () => {
      const {
        deletePersistentMenu,
      } = require('../actions/messenger/persistent-menu');
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
      expect(deletePersistentMenu).toBeCalledWith('bottender.config.js');
    });
  });

  describe('profile', () => {
    it('#set', () => {
      const { setProfile } = require('../actions/messenger/profile');
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
      expect(setProfile).toBeCalledWith('bottender.config.js');
    });
  });

  describe('webhook set', () => {
    it('to be called when passing options', () => {
      const { setWebhook } = require('../actions/messenger/webhook');
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
      expect(setWebhook).toBeCalledWith(
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
      const { setWebhook } = require('../actions/telegram/webhook');
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
      expect(setWebhook).toBeCalledWith('http://test.com', undefined);
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
    expect(process.exit).toBeCalled();
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
    expect(process.exit).toBeCalled();
  });
});

it('not warn when there is no any close match', () => {
  process.argv = [
    '/usr/local/bin/iojs',
    '/usr/local/bin/bottender',
    'abcdefghijk',
  ];
  require('../index');
  expect(log.error).toBeCalled();
  expect(process.exit).toBeCalled();
});
