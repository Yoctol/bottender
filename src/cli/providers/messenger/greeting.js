/* eslint-disable consistent-return */
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../../shared/getConfig';
import { print, error, bold } from '../../shared/log';

export async function getGreeting() {
  try {
    const config = getConfig('bottender.config.js', 'messenger');

    invariant(config.accessToken, 'accessToken is not found in config file');

    const client = MessengerClient.connect(config.accessToken);

    const greeting = await client.getGreeting();
    if (greeting && greeting[0] && greeting[0].text) {
      print(`The greeting is: ${bold(greeting[0].text)}`);
    } else {
      error(`Failed to find ${bold('greeting')} setting`);
    }
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

export async function deleteGreeting() {
  try {
    const config = getConfig('bottender.config.js', 'messenger');

    invariant(config.accessToken, 'accessToken is not found in config file');

    const client = MessengerClient.connect(config.accessToken);

    await client.deleteGreeting();

    print(`Successfully delete ${bold('greeting')} setting`);
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

export default async function main(ctx) {
  const subcommand = ctx.argv._[2];
  switch (subcommand) {
    case 'get':
      await getGreeting();
      break;
    case 'delete':
    case 'del':
      await deleteGreeting();
      break;
    default:
  }
}
