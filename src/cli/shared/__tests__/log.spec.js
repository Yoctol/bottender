/* eslint-disable no-console */
import chalk from 'chalk';
import figures from 'figures';

import { log, print, warn, error, bold } from '../log';

const _log = console.log;

describe('console', () => {
  beforeEach(() => {
    console.log = jest.fn();
  });
  afterEach(() => {
    console.log = _log;
  });

  it('log', () => {
    log('log!');
    expect(console.log).toBeCalledWith(`${chalk.blue(figures.pointer)} log!`);
  });

  it('print', () => {
    print('print!');
    expect(console.log).toBeCalledWith(
      `${chalk.green(figures.pointer)} print!`
    );
  });

  it('warn', () => {
    warn('warn!');
    expect(console.log).toBeCalledWith(
      `${chalk.yellow(figures.warning)} warn!`
    );
  });

  it('error', () => {
    error('error!');
    expect(console.log).toBeCalledWith(`${chalk.red(figures.cross)} error!`);
  });

  it('bold', () => {
    expect(bold('bold!')).toEqual(chalk.bold('bold!'));
  });
});
