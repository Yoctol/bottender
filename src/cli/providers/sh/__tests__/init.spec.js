import path from 'path';

import stringifyObject from 'stringify-object';

import init from '../init';

jest.mock('inquirer');
jest.mock('child_process');
jest.mock('fs-extra');
jest.mock('cross-spawn');
jest.mock('../../../shared/log');

const { execSync } = require('child_process');

const inquirer = require('inquirer');
const fs = require('fs-extra');
const spawn = require('cross-spawn');

const { print, error } = require('../../../shared/log');

describe('init', () => {
  beforeEach(() => {
    inquirer.prompt = jest.fn();
    process.exit = jest.fn();
    process.chdir = jest.fn();
    execSync.mockReturnValue(true);
    fs.ensureDirSync = jest.fn();
    fs.readdirSync = jest.fn();
    fs.readdirSync.mockReturnValue({
      filter: jest.fn(),
    });
    fs.readdirSync().filter.mockReturnValue([]);
    fs.writeFileSync = jest.fn();
    fs.removeSync = jest.fn();
    spawn.mockReturnValue({
      on: jest.fn((action, callback) => callback(0)),
    });
  });

  it('be defined', () => {
    expect(init).toBeDefined();
  });

  it('should do all good', async () => {
    inquirer.prompt.mockResolvedValueOnce({
      name: 'newbot',
      platform: 'telegram',
      session: 'mongo',
      server: 'micro',
    });
    const botConfig = {
      telegram: {
        accessToken: '__PUT_YOUR_ACCESS_TOKEN_HERE__',
      },
    };
    const root = path.resolve('newbot');
    const gitignore = fs.readFileSync(
      path.resolve(__dirname, '../init/template/gitignore')
    );
    const readme = fs.readFileSync(
      path.resolve(__dirname, '../init/template/README.md')
    );

    await init();

    expect(process.exit).not.toBeCalled();
    expect(fs.writeFileSync).toBeCalledWith(
      path.join(root, 'bottender.config.js'),
      `module.exports = ${stringifyObject(botConfig, {
        indent: '  ',
      })};`
    );
    expect(fs.writeFileSync).toBeCalledWith(
      path.join(root, '.gitignore'),
      gitignore
    );
    expect(fs.writeFileSync).toBeCalledWith(
      path.join(root, 'README.md'),
      readme
    );
  });

  it('should not create bottender.config.js if select console as platform', async () => {
    inquirer.prompt.mockResolvedValueOnce({
      name: 'newbot',
      platform: 'console',
      session: 'memory',
      server: undefined,
    });
    const botConfig = {};
    const root = path.resolve('newbot');

    await init();

    expect(process.exit).not.toBeCalled();
    expect(fs.writeFileSync).not.lastCalledWith(
      path.join(root, 'bottender.config.js'),
      `module.exports = ${stringifyObject(botConfig, {
        indent: '  ',
      })};`
    );
  });

  it('should catch error when inquirer.prompt reject response with status', async () => {
    const err = new Error();
    err.response = {
      status: 'error status',
    };
    inquirer.prompt.mockRejectedValueOnce(err);

    await init();

    expect(error.mock.calls).toContainEqual(['status: error status']);
    expect(process.exit).toBeCalledWith(1);
  });

  it('should catch error when inquirer.prompt reject with message', async () => {
    const err = new Error('error message');
    inquirer.prompt.mockRejectedValueOnce(err);

    await init();

    expect(error.mock.calls).toContainEqual(['message: error message']);
    expect(process.exit).toBeCalledWith(1);
  });

  it('should call error if name is empty string', async () => {
    inquirer.prompt.mockResolvedValueOnce({
      name: '',
    });

    await init();

    expect(error).toBeCalledWith('Please specify the project name');
    expect(process.exit).toBeCalledWith(1);
  });

  it('should call error if name is undefined', async () => {
    inquirer.prompt.mockResolvedValueOnce({
      name: undefined,
    });

    await init();

    expect(error).toBeCalledWith('Please specify the project name');
    expect(process.exit).toBeCalledWith(1);
  });

  describe('createBot', () => {
    it('should exit if name is not valid for validate-npm-package-name', async () => {
      inquirer.prompt.mockResolvedValueOnce({
        name: '..qq',
      });

      await init();

      expect(error.mock.calls).toContainEqual([
        `Could not create a project called "..qq" because of npm naming restrictions:`,
      ]);
      expect(process.exit).toBeCalledWith(1);
    });

    it('should exit if it has conflicts', async () => {
      fs.readdirSync().filter.mockReturnValueOnce(['conflictFile']);

      inquirer.prompt.mockResolvedValueOnce({
        name: 'newbot',
      });

      await init();

      expect(print).toBeCalledWith(
        'Either try using a new directory name, or remove the files listed above.'
      );
      expect(process.exit).toBeCalledWith(1);
    });
  });

  describe('run', () => {
    it('should catch error when install failed', async () => {
      spawn.mockReturnValue({
        on: jest.fn((action, callback) => callback(1)),
      });
      fs.readdirSync.mockReturnValueOnce([]);
      fs.readdirSync.mockReturnValueOnce(['package.json']);
      inquirer.prompt.mockResolvedValueOnce({
        name: 'newbot',
      });
      await init();

      expect(error.mock.calls).toContainEqual([
        '  yarnpkg add --dev --silent nodemon has failed.',
      ]);
      expect(print.mock.calls).toContainEqual([
        'Deleting generated file... package.json',
      ]);
      expect(fs.removeSync).toBeCalledWith(path.join(path.resolve('newbot')));
      expect(process.exit).toBeCalledWith(1);
    });

    it('should catch error when install throw unexpected error', async () => {
      spawn.mockReturnValue({
        on: jest.fn(() => {
          throw new Error('Error!');
        }),
      });
      fs.readdirSync.mockReturnValueOnce([]);
      fs.readdirSync.mockReturnValueOnce(['package.json']);
      fs.readdirSync.mockReturnValueOnce(['index.js']);
      inquirer.prompt.mockResolvedValueOnce({
        name: 'newbot',
      });

      await init();

      expect(error.mock.calls).toContainEqual([
        'Unexpected error. Please report it as a bug:',
      ]);
      expect(fs.removeSync.mock.calls).toHaveLength(1);
      expect(process.exit).toBeCalledWith(1);
    });

    it('should call spawn with yarn if useYarn is true', async () => {
      inquirer.prompt.mockResolvedValueOnce({
        name: 'newbot',
        platform: 'line',
        session: 'file',
        server: 'koa',
      });

      await init();

      expect(spawn).toBeCalledWith(
        'yarnpkg',
        ['add', '--dev', '--silent', 'nodemon'],
        {
          stdio: 'inherit',
        }
      );
    });

    it('should call spawn with yarn if useYarn is false', async () => {
      execSync.mockImplementation(() => {
        throw new Error('Error!');
      });
      inquirer.prompt.mockResolvedValueOnce({
        name: 'newbot',
        platform: 'messenger',
        session: 'redis',
        server: 'express',
      });

      await init();

      expect(spawn.mock.calls).toContainEqual([
        'npm',
        ['install', '--dev', '--save-exact', '--loglevel', 'error', 'nodemon'],
        { stdio: 'inherit' },
      ]);
    });
  });
});
