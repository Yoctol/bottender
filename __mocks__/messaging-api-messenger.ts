import createMockInstance from 'jest-create-mock-instance';

const MessagingAPIMessenger = jest.genMockFromModule(
  'messaging-api-messenger'
) as any;
const { MessengerClient } = jest.requireActual('messaging-api-messenger');

MessagingAPIMessenger.MessengerClient.connect = jest.fn(() =>
  createMockInstance(MessengerClient)
);

module.exports = MessagingAPIMessenger;
