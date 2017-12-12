const requireServerLine = server => {
  switch (server) {
    case 'micro':
      return `const { createRequestHandler } = require('bottender/${server}');`;
    case undefined: // platform is console
      return '';
    default:
      return `const { createServer } = require('bottender/${server}');`;
  }
};

const requireBotJSONLine = platform => {
  switch (platform) {
    case 'console':
      return '';
    default:
      return `const config = require('./bottender.config.js').${platform};`;
  }
};

const newBotLines = (bot, platform, sessionStore) => {
  const lines = [];
  if (platform === 'console') {
    if (sessionStore) {
      lines.push(`const bot = new ${bot}({`);
      lines.push(`  ${sessionStore}`);
      lines.push('});');
    } else {
      lines.push(`const bot = new ${bot}();`);
    }
  } else {
    lines.push(`const bot = new ${bot}({`);
    lines.push('  accessToken: config.accessToken,');
    if (platform === 'line') {
      lines.push('  channelSecret: config.channelSecret,');
    } else if (platform === 'messenger') {
      lines.push('  appSecret: config.appSecret,');
    }
    if (sessionStore) {
      lines.push(`  ${sessionStore}`);
    }
    lines.push('});');
  }

  return lines.join('\n');
};

const runBotLines = (platform, server) => {
  if (platform === 'console') {
    return 'bot.createRuntime();';
  } else if (server === 'micro') {
    return 'module.exports = createRequestHandler(bot);';
  }
  return `const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});`;
};

export default function generateIndexFile(answer) {
  const { platform, session, server } = answer;
  const dependencies = [];
  let sessionStore = '';

  switch (platform) {
    case 'line':
      dependencies.push('LineBot');
      break;
    case 'slack':
      dependencies.push('SlackBot');
      break;
    case 'telegram':
      dependencies.push('TelegramBot');
      break;
    case 'viber':
      dependencies.push('ViberBot');
      break;
    case 'console':
    default:
      dependencies.push('ConsoleBot');
      break;
    case 'messenger':
      dependencies.push('MessengerBot');
      break;
  }

  switch (session) {
    case 'file':
      dependencies.push('FileSessionStore');
      sessionStore = 'sessionStore: new FileSessionStore(),';
      break;
    case 'redis':
      dependencies.push('RedisSessionStore');
      sessionStore = 'sessionStore: new RedisSessionStore(),';
      break;
    case 'mongo':
      dependencies.push('MongoSessionStore');
      sessionStore = `sessionStore: new MongoSessionStore('mongodb://localhost:27017/'),`;
      break;
    default:
  }

  const dependenciesLine = `const { ${dependencies.join(
    ', '
  )} } = require('bottender');`;
  const moduleDepsGroup = [dependenciesLine, requireServerLine(server)]
    .filter(s => !!s)
    .join('\n');
  const peerDepsGroup = requireBotJSONLine(platform);
  const newBotGroup = newBotLines(dependencies[0], platform, sessionStore);
  const handlerGroup = [
    'bot.onEvent(async context => {',
    "  await context.sendText('Hello World');",
    '});',
  ].join('\n');
  const runBotGroup = runBotLines(platform, server);

  return `${[
    moduleDepsGroup,
    peerDepsGroup,
    newBotGroup,
    handlerGroup,
    runBotGroup,
  ]
    .filter(s => !!s)
    .join('\n\n')}\n`;
}
