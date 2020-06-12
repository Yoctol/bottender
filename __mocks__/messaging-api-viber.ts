import createMockInstance from 'jest-create-mock-instance';

const MessagingAPIViber = jest.genMockFromModule('messaging-api-viber') as any;
const { ViberClient } = jest.requireActual('messaging-api-viber');

MessagingAPIViber.ViberClient.connect = jest.fn(() =>
  createMockInstance(ViberClient)
);

module.exports = MessagingAPIViber;
