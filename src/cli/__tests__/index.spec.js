/* eslint-disable global-require */

jest.mock('../shared/log');
jest.mock('../providers/sh/init');
jest.mock('../providers/messenger/whitelisted-domains');
jest.mock('../providers/messenger/get-started');
jest.mock('../providers/messenger/greeting');
jest.mock('../providers/messenger/persistent-menu');
jest.mock('../providers/messenger/profile');
jest.mock('../providers/messenger/webhook');
jest.mock('../providers/telegram/webhook');

let log;

beforeEach(() => {
  jest.resetModules();
  log = require('../shared/log');
  log.error = jest.fn();
  log.bold = str => str;
  process.exit = jest.fn();
});

it('#init', () => {
  const init = require('../providers/sh/init');
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
      } = require('../providers/messenger/whitelisted-domains');
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'messenger',
        'whitelisted-domains',
        'get',
      ];
      require('../index');
      expect(getWhitelistedDomains).toBeCalled();
    });

    it('#delete', () => {
      const {
        deleteWhitelistedDomains,
      } = require('../providers/messenger/whitelisted-domains');
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'messenger',
        'whitelisted-domains',
        'delete',
      ];
      require('../index');
      expect(deleteWhitelistedDomains).toBeCalled();
    });
  });

  describe('get-started', () => {
    it('#get', () => {
      const { getGetStarted } = require('../providers/messenger/get-started');
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'messenger',
        'get-started',
        'get',
      ];
      require('../index');
      expect(getGetStarted).toBeCalled();
    });

    it('#delete', () => {
      const {
        deleteGetStarted,
      } = require('../providers/messenger/get-started');
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'messenger',
        'get-started',
        'delete',
      ];
      require('../index');
      expect(deleteGetStarted).toBeCalled();
    });
  });

  describe('greeting', () => {
    it('#get', () => {
      const { getGreeting } = require('../providers/messenger/greeting');
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'messenger',
        'greeting',
        'get',
      ];
      require('../index');
      expect(getGreeting).toBeCalled();
    });

    it('#delete', () => {
      const { deleteGreeting } = require('../providers/messenger/greeting');
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'messenger',
        'greeting',
        'delete',
      ];
      require('../index');
      expect(deleteGreeting).toBeCalled();
    });
  });

  describe('persistent-menu', () => {
    it('#get', () => {
      const {
        getPersistentMenu,
      } = require('../providers/messenger/persistent-menu');
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'messenger',
        'persistent-menu',
        'get',
      ];
      require('../index');
      expect(getPersistentMenu).toBeCalled();
    });

    it('#delete', () => {
      const {
        deletePersistentMenu,
      } = require('../providers/messenger/persistent-menu');
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'messenger',
        'persistent-menu',
        'delete',
      ];
      require('../index');
      expect(deletePersistentMenu).toBeCalled();
    });
  });

  describe('profile', () => {
    it('#set', () => {
      const { setProfile } = require('../providers/messenger/profile');
      process.argv = [
        '/usr/local/bin/iojs',
        '/usr/local/bin/bottender',
        'messenger',
        'profile',
        'set',
      ];
      require('../index');
      expect(setProfile).toBeCalled();
    });
  });

  describe('webhook set', () => {
    it('to be called when passing options', () => {
      const { setWebhook } = require('../providers/messenger/webhook');
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
        '__FAKE_VERIFYTOKEN__'
      );
    });
  });
});

describe('telegram', () => {
  describe('webhook set', () => {
    it('to be called when passing options', () => {
      const { setWebhook } = require('../providers/telegram/webhook');
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
    require('../index');
    expect(log.error).toBeCalledWith(
      `unknown command: ${log.bold('unknown-command')}`
    );
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
