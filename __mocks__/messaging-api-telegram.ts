import createMockInstance from 'jest-create-mock-instance';

const MessagingAPITelegram = jest.genMockFromModule(
  'messaging-api-telegram'
) as any;
const { TelegramClient } = require.requireActual('messaging-api-telegram');

MessagingAPITelegram.TelegramClient.connect = jest.fn(() =>
  createMockInstance(TelegramClient)
);

module.exports = MessagingAPITelegram;
