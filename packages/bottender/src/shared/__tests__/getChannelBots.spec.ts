import path from 'path';

import { mocked } from 'ts-jest/utils';

import getBottenderConfig from '../getBottenderConfig';
import getChannelBots from '../getChannelBots';

jest.mock('../../shared/getBottenderConfig');
jest.mock(
  '/Users/username/bot/index.js',
  () =>
    async function App(context) {
      await context.sendText('Hello World');
    },
  { virtual: true }
);

const pathResolve = path.resolve;

beforeEach(() => {
  const customPathResolve = jest.fn((...args) => {
    if (args[0] === 'index.js') return '/Users/username/bot/index.js';
    return pathResolve(...args);
  });
  path.resolve = customPathResolve;
});

afterEach(() => {
  path.resolve = pathResolve;
});

it('be defined', () => {
  expect(getChannelBots).toBeDefined();
});

it('should be empty array', () => {
  mocked(getBottenderConfig).mockReturnValue({});
  expect(getChannelBots()).toEqual([]);
});

it('should create channelBots', () => {
  mocked(getBottenderConfig).mockReturnValue({
    channels: {
      messenger: {
        enabled: true,
        path: '/webhooks/messenger',
        sync: true,
        accessToken: 'ACCESS_TOKEN',
        appId: 'APP_ID',
        appSecret: 'APP_SECRET',
      },
    },
  });
  const channelBots = getChannelBots();
  expect(channelBots.length).toEqual(1);

  const webhookPaths = channelBots.map((c) => c.webhookPath);
  expect(webhookPaths[0]).toEqual('/webhooks/messenger');
});
