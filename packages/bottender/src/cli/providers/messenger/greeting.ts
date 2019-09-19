/* eslint-disable consistent-return */
import chalk from 'chalk';
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../../shared/getConfig';
import { CliContext } from '../..';
import { bold, error, print } from '../../shared/log';

const help = (): void => {
  console.log(`
    bottender messenger greeting <command> [option]

    ${chalk.dim('Commands:')}

      get               Get greeting setting.
      del, delete       Delete greeting setting.

    ${chalk.dim('Examples:')}

    ${chalk.dim('-')} Get greeting setting

      ${chalk.cyan('$ bottender messenger greeting get')}

    ${chalk.dim('-')} Delete greeting setting with specific access token

      ${chalk.cyan('$ bottender messenger greeting delete')}
  `);
};

export async function getGreeting(_: CliContext): Promise<void> {
  try {
    const config = getConfig('messenger');

    invariant(config.accessToken, 'accessToken is not found in config file');

    const accessToken = config.accessToken;

    const client = MessengerClient.connect(accessToken);

    const greeting = await client.getGreeting();

    if (greeting && greeting[0] && greeting[0].text) {
      print(`The greeting is: ${bold(greeting[0].text)}`);
    } else {
      error(`Failed to find ${bold('greeting')} setting`);
    }
    return;
  } catch (err) {
    error(`Failed to get ${bold('greeting')} setting`);
    if (err.response) {
      error(`status: ${bold(err.response.status)}`);
      if (err.response.data) {
        error(`data: ${bold(JSON.stringify(err.response.data, null, 2))}`);
      }
    } else {
      error(err.message);
    }
    return process.exit(1);
  }
}

export async function deleteGreeting(_: CliContext): Promise<void> {
  try {
    const config = getConfig('messenger');

    invariant(config.accessToken, 'accessToken is not found in config file');

    const accessToken = config.accessToken;

    const client = MessengerClient.connect(accessToken);

    await client.deleteGreeting();

    print(`Successfully delete ${bold('greeting')} setting`);
    return;
  } catch (err) {
    error(`Failed to delete ${bold('greeting')} setting`);
    if (err.response) {
      error(`status: ${bold(err.response.status)}`);
      if (err.response.data) {
        error(`data: ${bold(JSON.stringify(err.response.data, null, 2))}`);
      }
    } else {
      error(err.message);
    }
    return process.exit(1);
  }
}

export default async function main(ctx: CliContext): Promise<void> {
  const subcommand = ctx.argv._[2];

  switch (subcommand) {
    case 'get':
      await getGreeting(ctx);
      break;
    case 'delete':
    case 'del':
      await deleteGreeting(ctx);
      break;
    default:
      error(`Please specify a valid subcommand: get, delete`);
      help();
  }
}
