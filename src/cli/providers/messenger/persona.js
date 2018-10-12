/* eslint-disable consistent-return */
import chalk from 'chalk';
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../../shared/getConfig';
import { bold, error, print } from '../../shared/log';

const help = () => {
  console.log(`
  bottender messenger persona <command> [option]

  ${chalk.dim('Commands:')}

    list              List all personas.
    create            Create a new persona with name and profile picture url.
    get               Get persona by persona ID.
    del, delete       Delete persona by persona ID.

  ${chalk.dim('Options:')}

    -t, --token       Specify Messenger access token.
    --name            Specify persona's name when create
    --url             Specify persona's profile image url when create
    --id              Specify persona's ID to get or delete

  ${chalk.dim('Examples:')}

  ${chalk.dim('-')} Create a new persona

    ${chalk.cyan(
      '$ bottender messenger persona create --name <PERSONA_NAME> --url <PROFILE_PIC_URL>'
    )}

  ${chalk.dim('-')} Get persona by ID

    ${chalk.cyan('$ bottender messenger persona get --id <PERSONA_ID>')}

  ${chalk.dim('-')} Delete persona with specific access token

    ${chalk.cyan(
      '$ bottender messenger persona delete --token __FAKE_TOKEN__ --id <PERSONA_ID>'
    )}
`);
};

export async function createPersona(ctx) {
  const { t, token: _token, name: personaName, url: personaUrl } = ctx.argv;
  const config = getConfig('bottender.config.js', 'messenger');

  invariant(personaName, 'name is not specified!!');
  invariant(personaUrl, 'profile picture url is not specified!!');

  let accessToken;

  try {
    if (t || _token) {
      accessToken = t || _token;
    } else {
      invariant(config.accessToken, 'accessToken is not found in config file');

      accessToken = config.accessToken;
    }

    const client = MessengerClient.connect(accessToken);

    const persona = {
      name: personaName,
      profile_picture_url: personaUrl,
    };

    const personaID = await client.createPersona(persona);

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
