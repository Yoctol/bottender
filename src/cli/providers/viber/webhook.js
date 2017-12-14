import { ViberClient } from 'messaging-api-viber';
import axios from 'axios';
import get from 'lodash/get';
import invariant from 'invariant';

import getConfig from '../../shared/getConfig';
import { print, error, bold } from '../../shared/log';

import help from './help';

export const localClient = axios.create({
  baseURL: 'http://localhost:4040',
});

const getWebhookFromNgrok = async () => {
  const res = await localClient.get('/api/tunnels');
  return get(res, 'data.tunnels[1].public_url'); // tunnels[1] return `https` protocol
};

export async function setWebhook(_webhook, eventTypes = []) {
  try {
    const { accessToken } = getConfig('bottender.config.js', 'viber');

    invariant(accessToken, '`accessToken` is not found in config file');

    const client = ViberClient.connect(accessToken);
    const webhook = _webhook || (await getWebhookFromNgrok());

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

export async function deleteWebhook() {
  try {
    const { accessToken } = getConfig('bottender.config.js', 'viber');

    invariant(accessToken, '`accessToken` is not found in config file');

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

      if (typeof ctx.argv.e === 'string') {
        const eventTypes = ctx.argv.e.split(',');
        await setWebhook(webhook, eventTypes);
      } else {
        await setWebhook(webhook);
      }

      break;
    }
    case 'delete':
    case 'del':
      await deleteWebhook();
      break;
    default:
      error(`Please specify a valid subcommand: set, delete`);
      help();
  }
}
