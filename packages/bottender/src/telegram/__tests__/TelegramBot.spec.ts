import { mocked } from 'ts-jest/utils';

import TelegramBot from '../TelegramBot';
import TelegramConnector from '../TelegramConnector';

jest.mock('messaging-api-telegram');

beforeEach(() => {
  console.error = jest.fn();
});

it('should construct bot with TelegramConnector', () => {
  const bot = new TelegramBot({
    accessToken: 'FAKE_TOKEN',
  });

  expect(bot).toBeDefined();
  expect(bot.onEvent).toBeDefined();
  expect(bot.createRequestHandler).toBeDefined();
  expect(bot.connector).toBeDefined();
  expect(bot.connector).toBeInstanceOf(TelegramConnector);
});

it('should export createLongPollingRuntime method', () => {
  const bot = new TelegramBot({
    accessToken: 'FAKE_TOKEN',
  });

  expect(bot.createLongPollingRuntime).toBeDefined();
});

describe('#createLongPollingRuntime', () => {
  it('should call updates without params', done => {
    const bot = new TelegramBot({
      accessToken: 'FAKE_TOKEN',
    });

    const handler = jest.fn();

    bot.onEvent(handler);

    const getUpdates = [
      {
        updateId: 513400512,
        message: {
          messageId: 3,
          from: {
            id: 313534466,
            firstName: 'first',
            lastName: 'last',
            username: 'username',
          },
          chat: {
            id: 313534466,
            firstName: 'first',
            lastName: 'last',
            username: 'username',
            type: 'private',
          },
          date: 1499402829,
          text: 'hi',
        },
      },
    ];

    mocked(bot.connector.client.getUpdates)
      .mockResolvedValueOnce(getUpdates)
      .mockImplementationOnce(() => {
        bot.stop();
        expect(bot.connector.client.getUpdates).toBeCalledWith({});
        expect(handler).toBeCalledWith(expect.any(Object), {});
        done();
      });

    bot.createLongPollingRuntime();
  });

  it('should call updates with params', done => {
    const bot = new TelegramBot({
      accessToken: 'FAKE_TOKEN',
    });

    const handler = jest.fn();

    bot.onEvent(handler);

    const getUpdates = [
      {
        updateId: 513400512,
        message: {
          messageId: 3,
          from: {
            id: 313534466,
            firstName: 'first',
            lastName: 'last',
            username: 'username',
          },
          chat: {
            id: 313534466,
            firstName: 'first',
            lastName: 'last',
            username: 'username',
            type: 'private',
          },
          date: 1499402829,
          text: 'hi',
        },
      },
    ];

    mocked(bot.connector.client.getUpdates)
      .mockResolvedValueOnce(getUpdates)
      .mockImplementationOnce(() => {
        bot.stop();
        expect(bot.connector.client.getUpdates).toBeCalledWith({
          limit: 100,
          timeout: 0,
          allowedUpdates: ['message', 'edited_channel_post', 'callback_query'],
          offset: 1,
        });
        expect(handler).toBeCalledWith(expect.any(Object), {});
        done();
      });

    bot.createLongPollingRuntime({
      limit: 100,
      timeout: 0,
      allowedUpdates: ['message', 'edited_channel_post', 'callback_query'],
      offset: 1,
    });

    expect(bot.offset).toBe(1);
  });
});
