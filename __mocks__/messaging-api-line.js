import createMockInstance from 'jest-create-mock-instance';

const MessagingAPILine = jest.genMockFromModule('messaging-api-line');
const { LineClient } = require.requireActual('messaging-api-line');

MessagingAPILine.LineClient.connect = jest.fn(() =>
  createMockInstance(LineClient)
);

module.exports = MessagingAPILine;
