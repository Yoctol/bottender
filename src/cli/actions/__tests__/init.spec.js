import init from '../init';

jest.mock('jsonfile');
jest.mock('inquirer');

const jsonfile = require('jsonfile');
const inquirer = require('inquirer');

describe('init', () => {
  beforeEach(() => {
    inquirer.prompt = jest.fn();
    jsonfile.writeFileSync = jest.fn();
  });

  it('be defined', () => {
    expect(init).toBeDefined();
  });

  it('write answers to init.config.json', async () => {
    inquirer.prompt.mockReturnValueOnce(
      Promise.resolve({
        platform: 'messenger',
        session: 'mongo',
        server: 'micro',
      })
    );

    await init();

    expect(jsonfile.writeFileSync.mock.calls[0]).toEqual([
      'init.config.json',
      { platform: 'messenger', session: 'mongo', server: 'micro' },
      { spaces: 2 },
    ]);
  });
});
