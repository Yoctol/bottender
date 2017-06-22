/* eslint-disable no-console */
import chalk from 'chalk';

import { error, print, bold } from '../log';

const _log = console.log;
describe('console', () => {
  beforeEach(() => {
    console.log = jest.fn();
  });
  afterEach(() => {
    console.log = _log;
  });

  it('error', () => {
    error('error!');
    expect(console.log).toBeCalledWith(chalk.red('error!'));
  });

  it('print', () => {
    print('print!');
    expect(console.log).toBeCalledWith(chalk.green('print!'));
  });

  it('bold', () => {
    expect(bold('bold!')).toEqual(chalk.bold('bold!'));
  });
});
