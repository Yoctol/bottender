import path from 'path';

import express from 'express';
import merge from 'lodash/merge';
import { createServer, registerRoutes } from '@bottender/express';

import Bot from './bot/Bot';
import LineBot from './bot/LineBot';
import MessengerBot from './bot/MessengerBot';
import SlackBot from './bot/SlackBot';
import TelegramBot from './bot/TelegramBot';
import ViberBot from './bot/ViberBot';
import getBottenderConfig from './shared/getBottenderConfig';
import { Action, BottenderConfig, Channel, Plugin } from './types';

const BOT_MAP = {
  messenger: MessengerBot,
  line: LineBot,
  slack: SlackBot,
  telegram: TelegramBot,
  viber: ViberBot,
};

function initializeServer({
  isConsole,
  config,
}: {
  isConsole?: boolean;
  config?: BottenderConfig;
} = {}): express.Application | void {
  const bottenderConfig = getBottenderConfig();

  const { initialState, plugins, session, channels } = merge(
    bottenderConfig,
    config
  );

  // session
  const sessionDriver = (session && session.driver) || 'memory';
  let SessionStore;
  switch (sessionDriver) {
    case 'file':
      SessionStore = require('./session/FileSessionStore').default;
      break;
    case 'mongo':
      SessionStore = require('./session/MongoSessionStore').default;
      break;
    case 'redis':
      SessionStore = require('./session/RedisSessionStore').default;
      break;
    default:
      SessionStore = require('./session/MemorySessionStore').default;
  }

  const sessionDriverConfig =
    ((session && session.stores) || {})[sessionDriver] || {};

  const sessionStore = new SessionStore(
    sessionDriverConfig,
    session && session.expiresIn
  );

  // TODO: refine handler entry, improve error message and hint
  // eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires
  const Entry: Action<any, any> = require(path.resolve('index.js'));
  let ErrorEntry: Action<any, any>;
  try {
    // eslint-disable-next-line import/no-dynamic-require
    ErrorEntry = require(path.resolve('_error.js'));
  } catch (err) {} // eslint-disable-line no-empty

  function initializeBot(bot: Bot<any, any, any>): void {
    if (initialState) {
      bot.setInitialState(initialState);
    }

    if (plugins) {
      plugins.forEach((plugin: Plugin<any, any>) => {
        bot.use(plugin);
      });
    }

    bot.onEvent(Entry);
    if (ErrorEntry) {
      bot.onError(ErrorEntry);
    }
  }

  if (isConsole) {
    const ConsoleBot = require('./bot/ConsoleBot').default;

    const bot = new ConsoleBot({
      fallbackMethods: true,
      sessionStore,
    });

    initializeBot(bot);

    bot.createRuntime();
  } else {
    let server: express.Application | undefined;

    Object.entries(channels || {})
      .filter(([, { enabled }]) => enabled)
      .map(([channel, { path: webhookPath, ...channelConfig }]) => {
        const ChannelBot = BOT_MAP[channel as Channel];
        const channelBot = new ChannelBot({
          ...channelConfig,
          sessionStore,
        } as any);

        initializeBot(channelBot);

        return { channel, webhookPath, bot: channelBot };
      })
      .forEach(({ channel, webhookPath, bot }) => {
        const routePath = webhookPath || `/webhooks/${channel}`;
        if (server) {
          registerRoutes(server, bot, { path: routePath });
        } else {
          server = createServer(bot, {
            path: routePath,
          });
        }
      });

    return server;
  }
}

export default initializeServer;
