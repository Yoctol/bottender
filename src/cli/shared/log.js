/* @flow */
/* eslint-disable no-console */
import chalk from 'chalk';

export function print(msg: string): void {
  console.log(chalk.green(msg));
}

export function warn(msg: string): void {
  console.log(chalk.magenta(msg));
}

export function error(msg: string): void {
  console.log(chalk.red(msg));
}

export function bold(msg: string): string {
  return chalk.bold(msg);
}
