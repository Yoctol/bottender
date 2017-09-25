import axios from 'axios';
import get from 'lodash/get';
import invariant from 'invariant';

import getConfig from '../shared/getConfig';
import { print, error, bold } from '../shared/log';

export const client = axios.create({
  baseURL: 'https://graph.facebook.com/v2.9/',
  headers: { 'Content-Type': 'application/json' },
});

export const localClient = axios.create({
  baseURL: 'http://localhost:4040',
});

const getWebhookFromNgrok = async () => {
  const res = await localClient.get('/api/tunnels');
  return get(res, 'data.tunnels[1].public_url'); // tunnels[1] return `https` protocol
};

const _getClientToken = async (clientId, clientSecret) => {
  const res = await client.get(
    `/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
  );
  return res.data.access_token;
};

export default (async function setWebhook(_webhook, _configPath, _verifyToken) {
  try {
    const platform = 'messenger';
    const configPath = _configPath || 'bottender.config.js';
    const config = getConfig(configPath, platform);
    const defaultFields = [
      'messages',
      'messaging_postbacks',
      'messaging_referrals',
    ];
    const webhook = _webhook || (await getWebhookFromNgrok());
    const verifyToken = _verifyToken || config.verifyToken;

    invariant(config.appId, '`appId` is not found in config file');
    invariant(config.appSecret, '`appSecret` is not found in config file');
    invariant(
      verifyToken,
      'verifyToken is required but not found. using -v <verifyToken> to setup or list `verifyToken` key it in config file.'
    );
    invariant(
      webhook,
      '`webhook` is required but not found. Use -w <webhook> to setup or make sure you are running ngrok server.'
    );

    if (!config.fields) {
      print(
        `\`fields\` is not found in config file, we will use ${bold(
          defaultFields.join(', ')
        )} to setup.`
      );
      print(
        'See more on: https://developers.facebook.com/docs/graph-api/reference/v2.9/app/subscriptions'
      );
    }
    const fields = config.fields || defaultFields;

    const token = await _getClientToken(config.appId, config.appSecret);
    const res = await client.post(
      `/${config.appId}/subscriptions?access_token=${token}`,
      {
        object: 'page',
        callback_url: webhook,
        verify_token: verifyToken,
        fields,
      }
    );
    invariant(res.data.success, 'Setting for webhook is failed');

    print('Successfully set webhook');
  } catch (err) {
    error('set webhook error with');
    if (err.response) {
      error(`status: ${bold(err.response.status)}`);
      if (err.response.data) {
        error(`data: ${bold(JSON.stringify(err.response.data, null, 2))}`);
      }
    } else {
      error(`message: ${bold(err.message)}`);
    }
    return process.exit(1);
  }
});
