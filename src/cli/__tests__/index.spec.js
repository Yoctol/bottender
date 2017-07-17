/* eslint-disable global-require */
import path from 'path';

jest.mock('../shared/log');
jest.mock('../actions/init');
jest.mock('../actions/deleteDomainWhitelist');
jest.mock('../actions/deleteGetStartedButton');
jest.mock('../actions/deleteGreetingText');
jest.mock('../actions/deletePersistentMenu');
jest.mock('../actions/getDomainWhitelist');
jest.mock('../actions/getGetStartedButton');
jest.mock('../actions/getGreetingText');
jest.mock('../actions/getPersistentMenu');
jest.mock('../actions/setDomainWhitelist');
jest.mock('../actions/setGetStartedButton');
jest.mock('../actions/setGreetingText');
jest.mock('../actions/setMessengerProfile');
jest.mock('../actions/setPersistentMenu');
jest.mock('../actions/setWebhook');
jest.mock('../actions/uploadImages');

let log;

beforeEach(() => {
  jest.resetModules();
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
    const getDomainWhitelist = require('../actions/getDomainWhitelist');
    getDomainWhitelist.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'domain-whitelist:get',
      '-c',
      'bot.sample.json',
    ];
    require('../index');
    expect(getDomainWhitelist.default).toBeCalledWith('bot.sample.json');
  });

  it('#set', () => {
    const setDomainWhitelist = require('../actions/setDomainWhitelist');
    setDomainWhitelist.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'domain-whitelist:set',
      '-c',
      'bot.sample.json',
      '-d',
      'http://www.yoctol.com,http://www.facebook.com',
    ];
    require('../index');
    expect(setDomainWhitelist.default).toBeCalledWith(
      ['http://www.yoctol.com', 'http://www.facebook.com'],
      'bot.sample.json'
    );
  });

  it('#delete', () => {
    const deleteDomainWhitelist = require('../actions/deleteDomainWhitelist');
    deleteDomainWhitelist.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'domain-whitelist:delete',
      '-c',
      'bot.sample.json',
    ];
    require('../index');
    expect(deleteDomainWhitelist.default).toBeCalledWith('bot.sample.json');
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

describe('#webhook', () => {
  it('to be called without passing any options', () => {
    const setWebhook = require('../actions/setWebhook');
    setWebhook.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'set-webhook',
    ];
    require('../index');
    expect(setWebhook.default).toBeCalledWith(undefined, undefined, undefined);
  });
  it('to be called when passing webhook', () => {
    const setWebhook = require('../actions/setWebhook');
    setWebhook.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'set-webhook',
      '-w',
      'http://test.com',
    ];
    require('../index');
    expect(setWebhook.default).toBeCalledWith(
      'http://test.com',
      undefined,
      undefined
    );
  });
  it('to be called when passing webhook', () => {
    const setWebhook = require('../actions/setWebhook');
    setWebhook.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'set-webhook',
      '-v',
      '__FAKE_VERIFYTOKEN__',
    ];
    require('../index');
    expect(setWebhook.default).toBeCalledWith(
      undefined,
      undefined,
      '__FAKE_VERIFYTOKEN__'
    );
  });
});

describe('#upload-images', () => {
  it('to be called without passing any options', () => {
    const uploadImages = require('../actions/uploadImages');
    uploadImages.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'upload-images',
      'fake-folder',
    ];
    require('../index');
    expect(uploadImages.default).toBeCalledWith({
      folderPath: path.resolve(
        __dirname,
        path.relative(__dirname, 'fake-folder')
      ),
      outputPath: undefined,
      container: undefined,
    });
  });

  it('to be called with outputPath', () => {
    const uploadImages = require('../actions/uploadImages');
    uploadImages.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'upload-images',
      'fake-folder',
      '-o',
      'fake-output',
    ];
    require('../index');
    expect(uploadImages.default).toBeCalledWith({
      folderPath: path.resolve(
        __dirname,
        path.relative(__dirname, 'fake-folder')
      ),
      outputPath: 'fake-output',
      container: undefined,
    });
  });

  it('to be called with container name', () => {
    const uploadImages = require('../actions/uploadImages');
    uploadImages.default = jest.fn();
    process.argv = [
      '/usr/local/bin/iojs',
      '/usr/local/bin/toolbot',
      'upload-images',
      'fake-folder',
      '-c',
      'fake-container',
    ];
    require('../index');
    expect(uploadImages.default).toBeCalledWith({
      folderPath: path.resolve(
        __dirname,
        path.relative(__dirname, 'fake-folder')
      ),
      outputPath: undefined,
      container: 'fake-container',
      delayMilliseconds: undefined,
    });
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
