/* eslint-disable consistent-return */
import Table from 'cli-table3';
import chalk from 'chalk';
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../../shared/getConfig';
import getSubArgs from '../sh/utils/getSubArgs';
import { CliContext } from '../..';
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

    --name            Specify persona's name when create
    --pic             Specify persona's profile image url when create
    --id              Specify persona's ID to get or delete

  ${chalk.dim('Examples:')}

  ${chalk.dim('-')} Create a new persona

    ${chalk.cyan(
      '$ bottender messenger persona create --name <PERSONA_NAME> --pic <PROFILE_IMAGE_URL>'
    )}

  ${chalk.dim('-')} Get persona by ID

    ${chalk.cyan('$ bottender messenger persona get --id <PERSONA_ID>')}

  ${chalk.dim('-')} Delete persona with specific access token

    ${chalk.cyan('$ bottender messenger persona delete --id <PERSONA_ID>')}
`);
};

export async function createPersona(ctx: CliContext): Promise<void> {
  const argv = getSubArgs(ctx.argv, {
    '--name': String,
    '--pic': String,
  });

  const personaName = argv['--name'];
  const personaUrl = argv['--pic'];

  try {
    const config = getConfig('messenger');

    const { accessToken } = config;

    invariant(accessToken, 'accessToken is not found in config file');

    invariant(
      personaName,
      '`name` is required but not found. Use --name <name> to specify persona name'
    );
    invariant(
      personaUrl,
      '`pic` is required but not found. Use --pic <url> to specify persona profile picture url'
    );

    const client = MessengerClient.connect({
      accessToken,
    });

    const persona = {
      name: personaName as string,
      profile_picture_url: personaUrl as string,
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

export async function listPersona(_: CliContext): Promise<void> {
  try {
    const config = getConfig('messenger');

    const { accessToken } = config;

    invariant(accessToken, 'accessToken is not found in config file');

    const client = MessengerClient.connect({
      accessToken,
    });

    const personas = await client.getAllPersonas();

    if (personas.length !== 0) {
      print('Personas');
      const table = new Table({
        head: ['id', 'name', 'image url'],
        colWidths: [30, 30, 30],
      });
      personas.forEach(item => {
        table.push([item.id, item.name, item.profile_picture_url] as any);
      });
      console.log(table.toString()); // eslint-disable-line no-console
    } else {
      print('No personas are found.');
    }
  } catch (err) {
    error(`Failed to list ${bold('personas')}`);
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

export async function getPersona(ctx: CliContext): Promise<void> {
  const argv = getSubArgs(ctx.argv, {
    '--id': String,
  });

  const personaId = argv['--id'];

  try {
    const config = getConfig('messenger');

    const { accessToken } = config;

    invariant(accessToken, 'accessToken is not found in config file');
    invariant(
      personaId,
      '`id` is required but not found. Use --id <id> to specify persona id'
    );

    const client = MessengerClient.connect({
      accessToken,
    });

    const persona = await client.getPersona(personaId as string);

    if (persona !== undefined) {
      print(`Information of persona ${bold(personaId as string)}:`);
      print(`Name: ${bold(persona.name)}`);
      print(`Profile picture: ${bold(persona.profile_picture_url)}`);
    } else {
      print(`Cannot get persona of ID ${bold(personaId as string)}`);
    }
  } catch (err) {
    error(
      `Failed to get ${bold('persona')} of ID ${bold(personaId as string)}`
    );

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

export async function deletePersona(ctx: CliContext): Promise<void> {
  const argv = getSubArgs(ctx.argv, {
    '--id': String,
  });

  const personaId = argv['--id'];

  try {
    const config = getConfig('messenger');

    const { accessToken } = config;

    invariant(accessToken, 'accessToken is not found in config file');
    invariant(
      personaId,
      '`id` is required but not found. Use --id <id> to specify persona id'
    );

    const client = MessengerClient.connect({
      accessToken,
    });

    const res = await client.deletePersona(personaId as string);

    if (res.success === true || res.success === 'true') {
      print(`Sucessfully delete persona of ID ${bold(personaId as string)}`);
    } else {
      print(`Cannot get persona of ID ${bold(personaId as string)}`);
    }
  } catch (err) {
    error(
      `Failed to delete ${bold('persona')} of ID ${bold(personaId as string)}`
    );

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

export default async function main(ctx: CliContext) {
  const subcommand = ctx.argv._[2];

  switch (subcommand) {
    case 'create':
      return createPersona(ctx);
    case 'list':
      return listPersona(ctx);
    case 'get':
      return getPersona(ctx);
    case 'delete':
    case 'del':
      return deletePersona(ctx);
    default:
      error(`Please specify a valid subcommand: create, list, get, delete`);
      help();
  }
}
