/* eslint-disable consistent-return */
import Table from 'cli-table2';
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../../shared/getConfig';
import { print, error, bold } from '../../shared/log';

import help from './help';

export async function getPersistentMenu() {
  try {
    const config = getConfig('bottender.config.js', 'messenger');

    invariant(config.accessToken, 'accessToken is not found in config file');

    const client = MessengerClient.connect(config.accessToken);

    const persistentMenu = await client.getPersistentMenu();

    if (persistentMenu && persistentMenu[0]) {
      const menu = persistentMenu[0];
      print(`input disabled: ${menu.composer_input_disabled}`);
      print('actions:');
      const table = new Table({
        head: ['type', 'title', 'payload'],
        colWidths: [30, 30, 30],
      });
      menu.call_to_actions.forEach(item => {
        table.push([item.type, item.title, item.payload]);
      });
      console.log(table.toString()); // eslint-disable-line no-console
    } else {
      error(`Failed to find ${bold('persistent_menu')} setting`);
    }
  } catch (err) {
    error(`Faile to get ${bold('persistent_menu')} setting`);
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

export async function deletePersistentMenu() {
  try {
    const config = getConfig('bottender.config.js', 'messenger');

    invariant(config.accessToken, 'accessToken is not found in config file');

    const client = MessengerClient.connect(config.accessToken);

    await client.deletePersistentMenu();

    print(`Successfully delete ${bold('persistent_menu')} setting`);
  } catch (err) {
    error(`Failed to delete ${bold('persistent_menu')} setting`);
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
      await getPersistentMenu();
      break;
    case 'delete':
    case 'del':
      await deletePersistentMenu();
      break;
    default:
      error(`Please specify a valid subcommand: get, delete`);
      help();
  }
}
