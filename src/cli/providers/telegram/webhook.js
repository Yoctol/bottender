import axios from 'axios';
import get from 'lodash/get';
import invariant from 'invariant';

import getConfig from '../../shared/getConfig';
import { print, error, bold } from '../../shared/log';

export const client = axios.create({
  baseURL: `https://api.telegram.org`,
  headers: { 'Content-Type': 'application/json' },
});

export const localClient = axios.create({
  baseURL: 'http://localhost:4040',
});

const getWebhookFromNgrok = async () => {
  const res = await localClient.get('/api/tunnels');
  return get(res, 'data.tunnels[1].public_url'); // tunnels[1] return `https` protocol
};

export async function setWebhook(_webhook) {
  try {
    const { accessToken } = getConfig('bottender.config.js', 'telegram');
    const webhook = _webhook || (await getWebhookFromNgrok());

    invariant(accessToken, '`accessToken` is not found in config file');
    invariant(
      webhook,
      '`webhook` is required but not found. Use -w <webhook> to setup or make sure you are running ngrok server.'
    );

    const res = await client.post(`/bot${accessToken}/setWebhook`);
    invariant(res.data.success, 'Setting for webhook is failed');

    print('Successfully set Telegram webhook callback URL');
  } catch (err) {
    error('Failed to set Telegram webhook');
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
  console.log(ctx);
}
