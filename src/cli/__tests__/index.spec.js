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
      ];
      require('../index');
      expect(getWhitelistedDomains).toBeCalled();
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
      ];
      require('../index');
      expect(deleteWhitelistedDomains).toBeCalled();
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
      ];
      require('../index');
      expect(getGetStarted).toBeCalled();
    });

    it('#delete', () => {
      const { deleteGetStarted } = require('../actions/messenger/get-started');
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
      const { getGreeting } = require('../actions/messenger/greeting');
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
      const { deleteGreeting } = require('../actions/messenger/greeting');
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
      } = require('../actions/messenger/persistent-menu');
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
      } = require('../actions/messenger/persistent-menu');
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
      const { setProfile } = require('../actions/messenger/profile');
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
