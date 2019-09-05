import path from 'path';

import { createServer, registerRoutes } from '@bottender/express';

import LineBot from '../../../bot/LineBot';
import MessengerBot from '../../../bot/MessengerBot';
import SlackBot from '../../../bot/SlackBot';
import TelegramBot from '../../../bot/TelegramBot';
import ViberBot from '../../../bot/ViberBot';
import getBottenderConfig from '../../shared/getBottenderConfig';

import getSubArgs from './utils/getSubArgs';

const BOT_MAP = {
  messenger: MessengerBot,
  line: LineBot,
  slack: SlackBot,
  telegram: TelegramBot,
  viber: ViberBot,
};

const start = async ctx => {
  const argv = getSubArgs(ctx.argv, {
    '--console': Boolean,
    '--port': Number,

    // Aliases
    '-c': '--console',
    '-p': '--port',
  });

  const isConsole = argv['--console'] || false;
  const port = argv['--port'] || 5000;

  const config = getBottenderConfig();

  const { initialState, plugins = [], session, channels = {} } = config;

  // TODO: refine handler entry
  // eslint-disable-next-line import/no-dynamic-require
  const handler = require(path.resolve('index.js'));

  // session
  const sessionDriver = session.driver || 'memory';
  let SessionStore;
  switch (sessionDriver) {
    case 'file':
      SessionStore = require('../../../session/FileSessionStore').default;
      break;
    case 'mongo':
      SessionStore = require('../../../session/MongoSessionStore').default;
      break;
    case 'redis':
      SessionStore = require('../../../session/RedisSessionStore').default;
      break;
    default:
      SessionStore = require('../../../session/MemorySessionStore').default;
  }

  const sessionStore = new SessionStore(
    session[sessionDriver] || {},
    session.expiresIn
  );

  function initializeBot(bot) {
    if (initialState) {
      bot.setInitialState(initialState);
    }

    if (plugins) {
      plugins.forEach(plugin => {
        bot.use(plugin);
      });
    }

    bot.onEvent(handler);
  }

  if (isConsole) {
    const ConsoleBot = require('../../../bot/ConsoleBot').default;

    const bot = new ConsoleBot({
      fallbackMethods: true,
      sessionStore,
    });

    initializeBot(bot);

    bot.createRuntime();
  } else {
    let server;
    Object.entries(channels)
      .filter(([, { enabled }]) => enabled !== false)
      .map(([channel, { enabled, path: webhookPath, ...channelConfig }]) => {
        const ChannelBot = BOT_MAP[channel];
        const channelBot = new ChannelBot({
          ...channelConfig,
          sessionStore,
        });

        initializeBot(channelBot);

        return { channel, webhookPath, bot: channelBot };
      })
      .forEach(({ channel, webhookPath, bot }) => {
        const routePath = webhookPath || `/webhooks/${channel}`;
        if (server) {
          registerRoutes(server, bot, { path: routePath });
        } else {
          server = createServer(bot, { path: routePath });
        }
      });

    server.listen(port, () => {
      console.log(`server is running on ${port} port...`);
    });
  }
};

export default start;
