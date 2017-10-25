/* eslint-disable consistent-return */
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../../shared/getConfig';
import { print, error, bold } from '../../shared/log';

export async function getGreeting(configPath = 'bottender.config.js') {
  try {
    const config = getConfig(configPath, 'messenger');

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

export async function setGreeting(
  _greeting,
  configPath = 'bottender.config.js'
) {
  try {
    const config = getConfig(configPath, 'messenger');
    const greeting = _greeting || config.greeting;

    invariant(config.accessToken, 'accessToken is not found in config file');
    invariant(
      greeting,
      'greeting is required but not found. using -g <greeting> to setup or list `greeting` key it in config file.'
    );

    const client = MessengerClient.connect(config.accessToken);
    await client.setGreetingText(greeting);

    print(`Successfully set greeting to ${bold(greeting)}`);
  } catch (err) {
    error('Failed to set greeting');
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

export async function deleteGreeting(configPath = 'bottender.config.js') {
  try {
    const config = getConfig(configPath, 'messenger');

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
