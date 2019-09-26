/* eslint-disable no-console */
import chalk from 'chalk';
import figures from 'figures';

export function log(
  msg: string,
  color: 'green' | 'yellow' | 'red' | 'blue' = 'blue',
  icon: keyof typeof figures = 'pointer'
): void {
  console.log(`${chalk[color](figures[icon])} ${msg}`);
}

export function print(msg = ''): void {
  log(msg, 'green');
}

export function warn(msg = ''): void {
  log(msg, 'yellow', 'warning');
}

export function error(msg = ''): void {
  log(msg, 'red', 'cross');
}

export function bold(msg = ''): string {
  return chalk.bold(msg);
}
