import { RTMClient } from '@slack/rtm-api';

import SlackBot from '../SlackBot';
import SlackConnector from '../SlackConnector';

jest.mock('@slack/rtm-api');

beforeEach(() => {
  console.error = jest.fn();
});

it('should construct bot with SlackConnector', () => {
  const bot = new SlackBot({
    accessToken: 'zzzzzZZZZZ',
  });
  expect(bot).toBeDefined();
  expect(bot.onEvent).toBeDefined();
  expect(bot.createRequestHandler).toBeDefined();
  expect(bot.connector).toBeDefined();
  expect(bot.connector).toBeInstanceOf(SlackConnector);
});

describe('createRtmRuntime', () => {
  it('should work', () => {
    const bot = new SlackBot({
      accessToken: 'zzzzzZZZZZ',
    });
    const start = jest.fn();
    const on = jest.fn();
    const handler = jest.fn();

    RTMClient.mockImplementation(() => ({
      on,
      start,
    }));

    bot.createRequestHandler = jest.fn(() => handler);

    bot.createRtmRuntime();

    expect(on).toBeCalledWith('message', handler);
    expect(start).toHaveBeenCalledTimes(1);
  });
});
