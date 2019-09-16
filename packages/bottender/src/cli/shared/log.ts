/* eslint-disable no-console */
import chalk from 'chalk';
import figures from 'figures';

export function log(
  msg: string,
  color: string = 'blue',
  icon: string = 'pointer'
): void {
  console.log(`${chalk[color](figures[icon])} ${msg}`);
}

export function print(msg: string): void {
  log(msg, 'green');
}

export function warn(msg: string): void {
  log(msg, 'yellow', 'warning');
}

export function error(msg: string): void {
  log(msg, 'red', 'cross');
}

export function bold(msg: string): string {
  return chalk.bold(msg);
}
