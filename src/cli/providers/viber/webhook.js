import { ViberClient } from 'messaging-api-viber';
import invariant from 'invariant';
import Confirm from 'prompt-confirm';

import getWebhookFromNgrok from '../../shared/getWebhookFromNgrok';
import getConfig from '../../shared/getConfig';
import { print, error, bold, warn } from '../../shared/log';

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
  const { t, token: _token } = ctx.argv;

  let accessToken;

  try {
    if (t || _token) {
      accessToken = t || _token;
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

  switch (subcommand) {
    case 'set': {
      const webhook = ctx.argv.w;
      const ngrokPort = ctx.argv['ngrok-port'];
      const accessToken = ctx.argv.t || ctx.argv.token;

      if (typeof ctx.argv.e === 'string') {
        const eventTypes = ctx.argv.e.split(',');
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
