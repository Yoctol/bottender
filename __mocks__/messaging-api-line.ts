import createMockInstance from 'jest-create-mock-instance';

const MessagingAPILine = jest.genMockFromModule('messaging-api-line') as any;
const { Line, LineClient } = require.requireActual('messaging-api-line');

MessagingAPILine.Line = Line;

MessagingAPILine.LineClient.connect = jest.fn(() =>
  createMockInstance(LineClient)
);

module.exports = MessagingAPILine;
