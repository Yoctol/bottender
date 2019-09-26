import createMockInstance from 'jest-create-mock-instance';

const MessagingAPISlack = jest.genMockFromModule('messaging-api-slack') as any;
const { SlackOAuthClient } = require.requireActual('messaging-api-slack');

MessagingAPISlack.SlackOAuthClient.connect = jest.fn(() =>
  createMockInstance(SlackOAuthClient)
);

module.exports = MessagingAPISlack;
