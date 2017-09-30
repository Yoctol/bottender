/* @flow */
/* eslint-disable no-console */
import chalk from 'chalk';

export function print(msg: string): void {
  console.log(chalk.green(`❯ ${msg}`));
}

export function warn(msg: string): void {
  console.log(chalk.yellow(`❯ ${msg}`));
}

export function error(msg: string): void {
  console.log(chalk.bold.red(`❯ ${msg}`));
}

export function bold(msg: string): string {
  return chalk.bold(msg);
}
