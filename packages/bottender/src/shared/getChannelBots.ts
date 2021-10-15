import path from 'path';

import invariant from 'ts-invariant';
import { Action, Bot } from '@bottender/core';
import { merge } from 'lodash';
import { pascalcase } from 'messaging-api-common';

import { BottenderConfig, ChannelBot, getSessionStore } from '..';

import getBottenderConfig from './getBottenderConfig';

let channelBots: ChannelBot[] = [];

export function cleanChannelBots(): void {
  channelBots = [];
}

function getChannelBots(): ChannelBot[] {
  if (channelBots.length > 0) {
    return channelBots;
  }

  const bottenderConfig = getBottenderConfig();

  const { initialState, channels = {} } = merge(
    bottenderConfig /* , config */
  ) as BottenderConfig;

  const sessionStore = getSessionStore();

  // TODO: refine handler entry, improve error message and hint
  // eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires
  const Entry: Action<any, any> = require(path.resolve('index.js'));
  let ErrorEntry: Action<any, any>;
  try {
    // eslint-disable-next-line import/no-dynamic-require
    ErrorEntry = require(path.resolve('_error.js'));
  } catch (err: any) {} // eslint-disable-line no-empty

  function initializeBot(bot: Bot<any, any, any, any>): void {
    if (initialState) {
      bot.setInitialState(initialState);
    }

    bot.onEvent(Entry);
    if (ErrorEntry) {
      bot.onError(ErrorEntry);
    }
  }

  channelBots = (Object.entries(channels) as [string, any][])
    .filter(([, { enabled }]) => enabled)
    .map(
      ([
        channel,
        { path: webhookPath, sync, onRequest, connector, ...connectorConfig },
      ]) => {
        let channelConnector;
        if (
          [
            'messenger',
            'line',
            'telegram',
            'slack',
            'viber',
            'whatsapp',
          ].includes(channel)
        ) {
          // eslint-disable-next-line import/no-dynamic-require
          const ChannelConnector = require(`@bottender/${channel}`)[
            `${pascalcase(channel)}Connector`
          ];
          channelConnector = new ChannelConnector(connectorConfig);
        } else {
          invariant(connector, `The connector of ${channel} is missing.`);
          channelConnector = connector;
        }

        const channelBot = new Bot({
          sessionStore,
          sync,
          onRequest,
          connector: channelConnector,
        }) as Bot<any, any, any, any>;

        initializeBot(channelBot);

        return {
          webhookPath: webhookPath ?? `/webhooks/${channel}`,
          bot: channelBot,
        };
      }
    );

  return channelBots;
}

export default getChannelBots;
