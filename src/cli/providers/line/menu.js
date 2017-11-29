/* eslint-disable consistent-return */
import { LineClient } from 'messaging-api-line';
import { differenceWith, isEqual, omit, findIndex } from 'lodash';
import inquirer from 'inquirer';
import invariant from 'invariant';
import pMap from 'p-map';
import chalk from 'chalk';

import getConfig from '../../shared/getConfig';
import { print, error, bold, log } from '../../shared/log';

const generateDeleteQuestions = richMenus => [
  {
    name: 'deletedRichMenuNames',
    message: 'Which rich menu do you want to delete?',
    type: 'checkbox',
    choices: richMenus.map(richMenu => richMenu.name),
  },
];

export const help = () => {
  console.log(`
    bottender line menu <action> [option]

    ${chalk.dim('Actions:')}

      get           Get the LINE rich menus
      set           Set the LINE rich menu by diff
      del, delete   Delete the LINE rich menus
      help          Show this help

    ${chalk.dim('Options:')}

      --force       With action del, force delete ${bold('ALL')} LINE rich menus

    ${chalk.dim('Examples:')}

    ${chalk.dim('-')} Set the LINE rich menu

      ${chalk.cyan('$ bottender line menu set')}

    ${chalk.dim('-')} Force update the LINE rich menu

      ${chalk.cyan('$ bottender line menu set --force')}
  `);
};

export async function getLineMenu() {
  try {
    const config = getConfig('bottender.config.js', 'line');

    invariant(config.accessToken, 'accessToken is not found in config file.');

    const client = LineClient.connect(config.accessToken);

    const richMenus = await client.getRichMenuList();

    if (richMenus) {
      print('The rich menus are:');

      print(`\n${JSON.stringify(richMenus, null, 2)}`);
    } else {
      error(`Failed to find ${bold('LINE rich menu')}.`);
    }
  } catch (err) {
    error(`Failed to get ${bold('LINE rich menu')}.`);
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

export async function setLineMenus() {
  try {
    const { accessToken, richMenus: localRichMenus } = getConfig(
      'bottender.config.js',
      'line'
    );

    invariant(accessToken, 'accessToken is not found in config file.');

    const client = LineClient.connect(accessToken);

    const onlineRichMenus = await client.getRichMenuList();

    invariant(
      onlineRichMenus,
      `Failed to get ${bold('LINE rich menu')} response.`
    );

    const existedRichMenus = onlineRichMenus.map(richMenu =>
      omit(richMenu, 'richMenuId')
    );

    const shouldDeleteRichMenus = differenceWith(
      existedRichMenus,
      localRichMenus,
      isEqual
    );
    const shouldAddRichMenus = differenceWith(
      localRichMenus,
      existedRichMenus,
      isEqual
    );

    if (shouldDeleteRichMenus.length === 0 && shouldAddRichMenus.length === 0) {
      print(
        `No change apply, because online rich menu is same as local settings.`
      );
    } else {
      if (shouldDeleteRichMenus.length !== 0) {
        await pMap(
          shouldDeleteRichMenus,
          async shouldDeleteRichMenu => {
            const { richMenuId } = onlineRichMenus[
              findIndex(onlineRichMenus, shouldDeleteRichMenu)
            ];

            await client.deleteRichMenu(richMenuId);
          },
          { concurrency: 5 }
        );
      }

      if (shouldAddRichMenus.length !== 0) {
        await pMap(shouldAddRichMenus, client.createRichMenu, {
          concurrency: 5,
        });
      }

      print(`Successfully set ${bold('LINE rich menu')}.`);
    }

    log(
      `You can use ${bold(
        'bottender line menu get'
      )} to see the full rich menu.`
    );
  } catch (err) {
    error(`Failed to set ${bold('LINE rich menu')}.`);
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

export async function deleteLineMenu(ctx) {
  const { force } = ctx.argv;
  try {
    const config = getConfig('bottender.config.js', 'line');

    invariant(config.accessToken, 'accessToken is not found in config file.');

    const client = LineClient.connect(config.accessToken);

    const richMenus = await client.getRichMenuList();

    invariant(richMenus, `Failed to get ${bold('LINE rich menu')} response.`);

    if (force) {
      await pMap(
        richMenus,
        async richMenu => {
          await client.deleteRichMenu(richMenu.richMenuId);
        },
        { concurrency: 5 }
      );

      print(`Successfully delete ${bold('all')} LINE rich menu.`);
    } else {
      const questions = generateDeleteQuestions(richMenus);
      const { deletedRichMenuNames } = await inquirer.prompt(questions);

      invariant(
        deletedRichMenuNames.length !== 0,
        `At least ${bold('one')} LINE rich menu should be selected.`
      );

      await pMap(
        deletedRichMenuNames,
        async deletedRichMenuName => {
          const { richMenuId: deletedRichMenuId } = richMenus.find(
            richMenu => richMenu.name === deletedRichMenuName
          );

          await client.deleteRichMenu(deletedRichMenuId);
        },
        { concurrency: 5 }
      );

      print(
        `Successfully delete ${bold(
          deletedRichMenuNames.join(', ')
        )} in existing LINE rich menu.`
      );
    }
  } catch (err) {
    error(`Failed to delete ${bold('LINE rich menu')}.`);
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
      await getLineMenu();
      break;
    case 'set':
      await setLineMenus(ctx);
      break;
    case 'delete':
    case 'del':
      await deleteLineMenu(ctx);
      break;
    case 'help':
      help();
      break;
    default:
      error('Please specify a valid subcommand: get, set, delete, help.');
      help();
  }
}
