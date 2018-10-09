/* eslint-disable consistent-return */
import chalk from 'chalk';
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';
import { diff } from 'deep-object-diff';

import getConfig from '../../shared/getConfig';
import { bold, error, print } from '../../shared/log';

const help = () => {
  console.log(`
  bottender messenger persona <command> [option]

  ${chalk.dim('Commands:')}

    list              List all personas.
    create            Create new personas.
    get               Get persona by persona ID.
    del, delete       Delete persona by persona ID.

  ${chalk.dim('Options:')}

    -t, --token       Specify Messenger access token.

  ${chalk.dim('Examples:')}

  ${chalk.dim('-')} Create new persona from bottender.config

    ${chalk.cyan('$ bottender messenger persona create')}

  ${chalk.dim('-')} Get persona by ID

    ${chalk.cyan('$ bottender messenger persona get <PERSONA_ID>')}

  ${chalk.dim('-')} Delete persona with specific access token

    ${chalk.cyan(
      '$ bottender messenger persona delete --token __FAKE_TOKEN__ <PERSONA_ID>'
    )}
`);
};

export async function createPersona(ctx) {
  const { t, token: _token } = ctx.argv;
  const config = getConfig('bottender.config.js', 'messenger');
  const personas = config.personas;

  invariant(personas, '`personas` is not found in config file');

  let accessToken;

  try {
    if (t || _token) {
      accessToken = t || _token;
    } else {
      invariant(config.accessToken, 'accessToken is not found in config file');

      accessToken = config.accessToken;
    }

    const client = MessengerClient.connect(accessToken);

    const existedPersonas = client.getAllPersonas();
    const diffResult = diff(existedPersonas, personas);

    if (Object.keys(diffResult).length !== 0) {
      //   const shouldDeleteFields = Object.keys(
      //     deletedDiff(existedPersonas, personas)
      //   );
      //   const shouldCreateFields = [
      //     ...Object.keys(addedDiff(existedPersonas, personas)),
      //     ...Object.keys(updatedDiff(existedPersonas, personas)),
      //   ];
    }

    const personaID = await client.createPersona(personas);

    print(`Successfully create ${bold('persona')} ${bold(personaID.id)}`);
  } catch (err) {
    error(`Failed to create ${bold('persona')}`);
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
    case 'create':
      await createPersona(ctx);
      break;
    default:
      error(`Please specify a valid subcommand: set`);
      help();
  }
}
