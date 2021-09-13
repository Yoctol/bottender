// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MessagingAPILine = jest.genMockFromModule('messaging-api-line') as any;

MessagingAPILine.Line = jest.requireActual('messaging-api-line').Line;

module.exports = MessagingAPILine;
