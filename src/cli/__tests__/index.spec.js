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
  process.argv = ['/usr/local/bin/iojs', '/usr/local/bin/toolbot', 'init'];
  require('../index');
  expect(init.default).toHaveBeenCalledTimes(1);
});

describe('#domain-whilelist', () => {
  it('#get', () => {
    const getWhitelistedDomains = require('../actions/getWhitelistedDomains');
    getWhitelistedDomains.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'whitelisted-domains:get',
      '-c',
      'bot.sample.json',
    ];
    require('../index');
    expect(getWhitelistedDomains.default).toBeCalledWith('bot.sample.json');
  });

  it('#set', () => {
    const setWhitelistedDomains = require('../actions/setWhitelistedDomains');
    setWhitelistedDomains.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'whitelisted-domains:set',
      '-c',
      'bot.sample.json',
      '-d',
      'http://www.yoctol.com,http://www.facebook.com',
    ];
    require('../index');
    expect(setWhitelistedDomains.default).toBeCalledWith(
      ['http://www.yoctol.com', 'http://www.facebook.com'],
      'bot.sample.json'
    );
  });

  it('#delete', () => {
    const deleteWhitelistedDomains = require('../actions/deleteWhitelistedDomains');
    deleteWhitelistedDomains.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'whitelisted-domains:delete',
      '-c',
      'bot.sample.json',
    ];
    require('../index');
    expect(deleteWhitelistedDomains.default).toBeCalledWith('bot.sample.json');
  });
});

describe('#get-started-button', () => {
  it('#get', () => {
    const getGetStartedButton = require('../actions/getGetStartedButton');
    getGetStartedButton.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'get-started:get',
      '-c',
      'bot.sample.json',
    ];
    require('../index');
    expect(getGetStartedButton.default).toBeCalledWith('bot.sample.json');
  });

  it('#set', () => {
    const setGetStartedButton = require('../actions/setGetStartedButton');
    setGetStartedButton.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'get-started:set',
      '-c',
      'bot.sample.json',
      '-p',
      '__PAYLOAD__',
    ];
    require('../index');
    expect(setGetStartedButton.default).toBeCalledWith(
      '__PAYLOAD__',
      'bot.sample.json'
    );
  });

  it('#delete', () => {
    const deleteGetStartedButton = require('../actions/deleteGetStartedButton');
    deleteGetStartedButton.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'get-started:delete',
      '-c',
      'bot.sample.json',
    ];
    require('../index');
    expect(deleteGetStartedButton.default).toBeCalledWith('bot.sample.json');
  });
});

describe('#greeting-text', () => {
  it('#get', () => {
    const getGreetingText = require('../actions/getGreetingText');
    getGreetingText.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'greeting-text:get',
      '-c',
      'bot.sample.json',
    ];
    require('../index');
    expect(getGreetingText.default).toBeCalledWith('bot.sample.json');
  });

  it('#set', () => {
    const setGreetingText = require('../actions/setGreetingText');
    setGreetingText.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'greeting-text:set',
      '-c',
      'bot.sample.json',
      '-g',
      '__greeting_text__',
    ];
    require('../index');
    expect(setGreetingText.default).toBeCalledWith(
      '__greeting_text__',
      'bot.sample.json'
    );
  });

  it('#delete', () => {
    const deleteGreetingText = require('../actions/deleteGreetingText');
    deleteGreetingText.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'greeting-text:delete',
      '-c',
      'bot.sample.json',
    ];
    require('../index');
    expect(deleteGreetingText.default).toBeCalledWith('bot.sample.json');
  });
});

describe('#persistent-menu', () => {
  it('#get', () => {
    const getPersistentMenu = require('../actions/getPersistentMenu');
    getPersistentMenu.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'persistent-menu:get',
      '-c',
      'bot.sample.json',
    ];
    require('../index');
    expect(getPersistentMenu.default).toBeCalledWith('bot.sample.json');
  });

  it('#set', () => {
    const setPersistentMenu = require('../actions/setPersistentMenu');
    setPersistentMenu.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'persistent-menu:set',
      '-c',
      'bot.sample.json',
    ];
    require('../index');
    expect(setPersistentMenu.default).toBeCalledWith('bot.sample.json');
  });

  it('#delete', () => {
    const deletePersistentMenu = require('../actions/deletePersistentMenu');
    deletePersistentMenu.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'persistent-menu:delete',
      '-c',
      'bot.sample.json',
    ];
    require('../index');
    expect(deletePersistentMenu.default).toBeCalledWith('bot.sample.json');
  });
});

describe('#messenger-profile', () => {
  it('#set', () => {
    const setMessengerProfile = require('../actions/setMessengerProfile');
    setMessengerProfile.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'messenger-profile:set',
      '-c',
      'bot.sample.json',
    ];
    require('../index');
    expect(setMessengerProfile.default).toBeCalledWith('bot.sample.json');
  });
});

describe('#setMessengerWebhook', () => {
  it('to be called without passing any options', () => {
    const setMessengerWebhook = require('../actions/setMessengerWebhook');
    setMessengerWebhook.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'set-messenger-webhook',
    ];
    require('../index');
    expect(setMessengerWebhook.default).toBeCalledWith(
      undefined,
      undefined,
      undefined
    );
  });
  it('to be called when passing webhook', () => {
    const setMessengerWebhook = require('../actions/setMessengerWebhook');
    setMessengerWebhook.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'set-messenger-webhook',
      '-w',
      'http://test.com',
    ];
    require('../index');
    expect(setMessengerWebhook.default).toBeCalledWith(
      'http://test.com',
      undefined,
      undefined
    );
  });
  it('to be called when passing webhook', () => {
    const setMessengerWebhook = require('../actions/setMessengerWebhook');
    setMessengerWebhook.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'set-messenger-webhook',
      '-v',
      '__FAKE_VERIFYTOKEN__',
    ];
    require('../index');
    expect(setMessengerWebhook.default).toBeCalledWith(
      undefined,
      undefined,
      '__FAKE_VERIFYTOKEN__'
    );
  });
});

describe('#setTelegramWebhook', () => {
  it('to be called without passing any options', () => {
    const setTelegramWebhook = require('../actions/setTelegramWebhook');
    setTelegramWebhook.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'set-telegram-webhook',
    ];
    require('../index');
    expect(setTelegramWebhook.default).toBeCalledWith(undefined, undefined);
  });
  it('to be called when passing webhook', () => {
    const setTelegramWebhook = require('../actions/setTelegramWebhook');
    setTelegramWebhook.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'set-telegram-webhook',
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

describe('*', () => {
  it('call error unknown command', () => {
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
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
      '/usr/local/bin/toolbot',
      'unknown-command',
    ];
    didYouMean.mockReturnValueOnce('set-webhook');
    require('../index');
    expect(log.error).toBeCalledWith(
      `unknown command: ${log.bold('unknown-command')}`
    );
    expect(log.error).lastCalledWith(
      `did you mean ${log.bold('set-webhook')}?`
    );
    expect(process.exit).toBeCalledWith(1);
  });
});

it('not warn when there is no any close match', () => {
  process.argv = [
    '/usr/local/bin/iojs',
    '/usr/local/bin/toolbot',
    'abcdefghijk',
  ];
  require('../index');
  expect(log.error).toHaveBeenCalledTimes(1);
  expect(process.exit).toBeCalledWith(1);
});
