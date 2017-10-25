/* eslint-disable consistent-return */
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../../shared/getConfig';
import { print, error, bold } from '../../shared/log';

export async function getGreeting() {
  try {
    const config = getConfig('bottender.config.js', 'messenger');

    invariant(config.accessToken, 'accessToken is not found in config file');

    const client = MessengerClient.connect(config.accessToken);

    const { data } = await client.getGreetingText();
    if (data.length) {
      print(`The greeting is: ${bold(data[0].greeting[0].text)}`);
    } else {
      error('Failed to find greeting setting');
    }
  } catch (err) {
    error('Failed to get greeting');
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

export async function deleteGreeting() {
  try {
    const config = getConfig('bottender.config.js', 'messenger');

    invariant(config.accessToken, 'accessToken is not found in config file');

    const client = MessengerClient.connect(config.accessToken);

    await client.deleteGreetingText();

    print('Successfully delete greeting');
  } catch (err) {
    error('Failed to delete greeting');
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
