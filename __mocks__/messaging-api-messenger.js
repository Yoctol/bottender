import createMockInstance from 'jest-create-mock-instance';

const MessagingAPIMessenger = jest.genMockFromModule('messaging-api-messenger');
const { MessengerClient } = require.requireActual('messaging-api-messenger');

MessagingAPIMessenger.MessengerClient.connect = jest.fn(() =>
  createMockInstance(MessengerClient)
);

module.exports = MessagingAPIMessenger;
