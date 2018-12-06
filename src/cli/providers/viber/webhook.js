import Confirm from 'prompt-confirm';
import invariant from 'invariant';
import { ViberClient } from 'messaging-api-viber';

import getConfig from '../../shared/getConfig';
import getSubArgs from '../sh/utils/getSubArgs';
import getWebhookFromNgrok from '../../shared/getWebhookFromNgrok';
import { bold, error, print, warn } from '../../shared/log';

import help from './help';

export async function setWebhook(
  webhook,
  ngrokPort = '4040',
  accessToken = undefined,
  eventTypes = []
) {
  try {
    if (!accessToken) {
      const config = getConfig('bottender.config.js', 'viber');

      invariant(config.accessToken, 'accessToken is not found in config file');

      accessToken = config.accessToken;
    }

    const client = ViberClient.connect(accessToken);

    if (!webhook) {
      warn('We can not find the webhook callback url you provided.');
      const prompt = new Confirm(
        `Are you using ngrok (get url from ngrok server on http://127.0.0.1:${ngrokPort})?`
      );
      const result = await prompt.run();
      if (result) {
        webhook = await getWebhookFromNgrok(ngrokPort);
      }
    }

    invariant(
      webhook,
      '`webhook` is required but not found. Use -w <webhook> to setup or make sure you are running ngrok server.'
    );

    await client.setWebhook(webhook, eventTypes);

    print('Successfully set Viber webhook callback URL');
  } catch (err) {
    error('Failed to set Viber webhook');
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

export async function deleteWebhook(ctx) {
  let accessToken;

  try {
    if (ctx.argv['--token']) {
      accessToken = ctx.argv['--token'];
    } else {
      const config = getConfig('bottender.config.js', 'viber');

      invariant(config.accessToken, 'accessToken is not found in config file');

      accessToken = config.accessToken;
    }

    const client = ViberClient.connect(accessToken);

    await client.removeWebhook();

    print('Successfully delete Viber webhook');
  } catch (err) {
    error('Failed to delete Viber webhook');
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

  ctx.argv = getSubArgs(ctx.argv, {
    '--webhook': String,
    '-w': '--webhook',
    '--token': String,
    '-t': '--token',
    '--events': String,
    '-e': '--events',
    '--ngrok-port': String,
  });

  switch (subcommand) {
    case 'set': {
      const webhook = ctx.argv['--webhook'];
      const accessToken = ctx.argv['--token'];
      const ngrokPort = ctx.argv['--ngrok-port'];
      const events = ctx.argv['--events'];

      if (typeof events === 'string') {
        const eventTypes = events.split(',');
        await setWebhook(webhook, ngrokPort, accessToken, eventTypes);
      } else {
        await setWebhook(webhook, ngrokPort, accessToken);
      }

      break;
    }
    case 'delete':
    case 'del':
      await deleteWebhook(ctx);
      break;
    default:
      error(`Please specify a valid subcommand: set, delete`);
      help();
  }
}
