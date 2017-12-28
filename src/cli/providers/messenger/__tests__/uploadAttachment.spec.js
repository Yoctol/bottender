import { uploadAttachment } from '../attachment';

jest.mock('fs');
jest.mock('inquirer');
jest.mock('messaging-api-messenger');
jest.mock('recursive-readdir');

jest.mock('../../../shared/log');
jest.mock('../../../shared/getConfig');

const inquirer = require('inquirer');
const { MessengerClient } = require('messaging-api-messenger');
const readdir = require('recursive-readdir');

const log = require('../../../shared/log');
const getConfig = require('../../../shared/getConfig');

const MOCK_FILE_WITH_PLATFORM = {
  messenger: {
    accessToken: '__PUT_YOUR_ACCESS_TOKEN_HERE__',
    appId: '__APP_ID__',
    appSecret: '__APP_SECRET__',
    verifyToken: '__verifyToken__',
  },
};

let _client;

describe('uploadAttachment', () => {
  beforeEach(() => {
    _client = {
      getPageInfo: jest.fn(),
      uploadAttachment: jest.fn(),
    };
    MessengerClient.connect = jest.fn(() => _client);
    getConfig.mockReturnValue(MOCK_FILE_WITH_PLATFORM.messenger);
    readdir.mockReturnValue(
      Promise.resolve([
        {
          name: 'The X-Files',
        },
      ])
    );
    inquirer.prompt = jest.fn();
    inquirer.prompt.mockReturnValue(
      Promise.resolve({
        confirm: true,
      })
    );
    process.exit = jest.fn();
  });

  it('be defined', () => {
    expect(uploadAttachment).toBeDefined();
  });

  describe('resolve', () => {
    it('--yes should work', async () => {
      const ctx = {
        argv: { force: true, yes: true },
      };

      await uploadAttachment(ctx);

      expect(inquirer.prompt).not.toBeCalled();
      expect(log.print).not.toBeCalledWith('bye');
    });

    it('Abbreviational options should work', async () => {
      const ctx = {
        argv: { f: true, y: true },
      };

      await uploadAttachment(ctx);

      expect(inquirer.prompt).not.toBeCalled();
      expect(log.print).not.toBeCalledWith('bye');
    });
  });

  describe('reject', () => {
    it('reject when `accessToken` not found in config file', async () => {
      const ctx = {
        argv: {},
      };

      getConfig.mockReturnValueOnce({
        appId: '__APP_ID__',
        appSecret: '__APP_SECRET__',
        verifyToken: '__verifyToken__',
      });

      await uploadAttachment(ctx);

      expect(process.exit).toBeCalled();
      expect(log.error).toBeCalledWith(
        'accessToken is not found in config file'
      );
    });

    it('exit when user does not confirm force upload', async () => {
      const ctx = {
        argv: {
          force: true,
        },
      };
      inquirer.prompt.mockReturnValueOnce(
        Promise.resolve({
          confirm: false,
        })
      );

      await uploadAttachment(ctx);

      expect(inquirer.prompt).toBeCalledWith([
        {
          type: 'confirm',
          message: 'Are you sure you want to force upload all assets?',
          name: 'confirm',
        },
      ]);
      expect(process.exit).toBeCalled();
    });
  });
});
