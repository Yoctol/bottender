import SmsEvent from '../SmsEvent';
import {
  MediaMessageReceived,
  MessageDelivered,
  MessageSent,
  TextMessageReceived,
} from '../SmsTypes';

const textMessageReceived: TextMessageReceived = {
  smsMessageSid: 'SM7cd85aed706d25735d1c8019234XXXXX',
  numMedia: '0',
  smsSid: 'SM7cd85aed706d25735d1c8019234XXXXX',
  smsStatus: 'received',
  body: 'hi',
  to: '+14155238886',
  toCity: '',
  toCountry: 'US',
  toState: 'CA',
  toZip: '',
  numSegments: '1',
  messageSid: 'SM7cd85aed706d25735d1c8019234XXXXX',
  accountSid: 'ACf19dfb164f82b2c9d6178c6ada3XXXXX',
  from: '+886123456789',
  fromCity: '',
  fromCountry: 'TW',
  fromState: '',
  fromZip: '',
  apiVersion: '2010-04-01',
};

const imageMessageReceived: MediaMessageReceived = {
  mediaContentType0: 'image/jpeg',
  smsMessageSid: 'MMad0463f6e2a946b3fc91d9a04a2XXXXX',
  numMedia: '1',
  smsSid: 'MMad0463f6e2a946b3fc91d9a04a2XXXXX',
  smsStatus: 'received',
  body: 'xd',
  to: '+14155238886',
  toCity: '',
  toCountry: 'US',
  toState: 'CA',
  toZip: '',
  numSegments: '1',
  messageSid: 'MMad0463f6e2a946b3fc91d9a04a2XXXXX',
  accountSid: 'ACf19dfb164f82b2c9d6178c6ada3XXXXX',
  from: '+886123456789',
  fromCity: '',
  fromCountry: 'TW',
  fromState: '',
  fromZip: '',
  mediaUrl0:
    'https://api.twilio.com/2010-04-01/Accounts/ACf19dfb164f82b2c9d6178c6ada3XXXXX/Messages/MMad0463f6e2a946b3fc91d9a04a2XXXXX/Media/MEfaf3decca478ebeb4924fe523ff7fdb2',
  apiVersion: '2010-04-01',
};

const messageSent: MessageSent = {
  smsSid: 'SM338ac551ecd04d698821b50ea5dXXXXX',
  smsStatus: 'sent',
  messageStatus: 'sent',
  channelToAddress: '+886123456789',
  to: '+886123456789',
  messageSid: 'SM338ac551ecd04d698821b50ea5dXXXXX',
  accountSid: 'ACf19dfb164f82b2c9d6178c6ada3XXXXX',
  structuredMessage: 'false',
  from: '+14155238886',
  apiVersion: '2010-04-01',
  channelInstallSid: 'XEcc20d939f803ee381f2442185d0XXXXX',
};

const messageDelivered: MessageDelivered = {
  eventType: 'DELIVERED',
  smsSid: 'SM338ac551ecd04d698821b50ea5dXXXXX',
  smsStatus: 'delivered',
  messageStatus: 'delivered',
  channelToAddress: '+886123456789',
  to: '+886123456789',
  messageSid: 'SM338ac551ecd04d698821b50ea5dXXXXX',
  accountSid: 'ACf19dfb164f82b2c9d6178c6ada3XXXXX',
  from: '+14155238886',
  apiVersion: '2010-04-01',
  channelInstallSid: 'XE85c014c372541a32e1102eb1631XXXXX',
};

it('#rawEvent', () => {
  expect(new SmsEvent(textMessageReceived).rawEvent).toEqual(
    textMessageReceived
  );
  expect(new SmsEvent(imageMessageReceived).rawEvent).toEqual(
    imageMessageReceived
  );
  expect(new SmsEvent(messageSent).rawEvent).toEqual(messageSent);
  expect(new SmsEvent(messageDelivered).rawEvent).toEqual(messageDelivered);
});

it('#isMessage', () => {
  expect(new SmsEvent(textMessageReceived).isMessage).toEqual(true);
  expect(new SmsEvent(imageMessageReceived).isMessage).toEqual(true);
  expect(new SmsEvent(messageSent).isMessage).toEqual(false);
  expect(new SmsEvent(messageDelivered).isMessage).toEqual(false);
});

it('#message', () => {
  expect(new SmsEvent(textMessageReceived).message).toEqual(
    textMessageReceived
  );
  expect(new SmsEvent(imageMessageReceived).message).toEqual(
    imageMessageReceived
  );
  expect(new SmsEvent(messageSent).message).toEqual(null);
  expect(new SmsEvent(messageDelivered).message).toEqual(null);
});

it('#isText', () => {
  expect(new SmsEvent(textMessageReceived).isText).toEqual(true);
  expect(new SmsEvent(imageMessageReceived).isText).toEqual(false);
  expect(new SmsEvent(messageSent).isText).toEqual(false);
  expect(new SmsEvent(messageDelivered).isText).toEqual(false);
});

it('#text', () => {
  expect(new SmsEvent(textMessageReceived).text).toEqual('hi');
  expect(new SmsEvent(imageMessageReceived).text).toEqual('xd');
  expect(new SmsEvent(messageSent).text).toEqual(null);
  expect(new SmsEvent(messageDelivered).text).toEqual(null);
});

it('#isMedia', () => {
  expect(new SmsEvent(textMessageReceived).isMedia).toEqual(false);
  expect(new SmsEvent(imageMessageReceived).isMedia).toEqual(true);
  expect(new SmsEvent(messageSent).isMedia).toEqual(false);
  expect(new SmsEvent(messageDelivered).isMedia).toEqual(false);
});

it('#media', () => {
  expect(new SmsEvent(textMessageReceived).media).toEqual(null);
  expect(new SmsEvent(imageMessageReceived).media).toEqual({
    contentType: 'image/jpeg',
    url:
      'https://api.twilio.com/2010-04-01/Accounts/ACf19dfb164f82b2c9d6178c6ada3XXXXX/Messages/MMad0463f6e2a946b3fc91d9a04a2XXXXX/Media/MEfaf3decca478ebeb4924fe523ff7fdb2',
  });
  expect(new SmsEvent(messageSent).media).toEqual(null);
  expect(new SmsEvent(messageDelivered).media).toEqual(null);
});

it('#isReceived', () => {
  expect(new SmsEvent(textMessageReceived).isReceived).toEqual(true);
  expect(new SmsEvent(imageMessageReceived).isReceived).toEqual(true);
  expect(new SmsEvent(messageSent).isReceived).toEqual(false);
  expect(new SmsEvent(messageDelivered).isReceived).toEqual(false);
});

it('#received', () => {
  expect(new SmsEvent(textMessageReceived).received).toEqual(
    textMessageReceived
  );
  expect(new SmsEvent(imageMessageReceived).received).toEqual(
    imageMessageReceived
  );
  expect(new SmsEvent(messageSent).received).toEqual(null);
  expect(new SmsEvent(messageDelivered).received).toEqual(null);
});

it('#isSent', () => {
  expect(new SmsEvent(textMessageReceived).isSent).toEqual(false);
  expect(new SmsEvent(imageMessageReceived).isSent).toEqual(false);
  expect(new SmsEvent(messageSent).isSent).toEqual(true);
  expect(new SmsEvent(messageDelivered).isSent).toEqual(false);
});

it('#sent', () => {
  expect(new SmsEvent(textMessageReceived).sent).toEqual(null);
  expect(new SmsEvent(imageMessageReceived).sent).toEqual(null);
  expect(new SmsEvent(messageSent).sent).toEqual(messageSent);
  expect(new SmsEvent(messageDelivered).sent).toEqual(null);
});

it('#isDelivered', () => {
  expect(new SmsEvent(textMessageReceived).isDelivered).toEqual(false);
  expect(new SmsEvent(imageMessageReceived).isDelivered).toEqual(false);
  expect(new SmsEvent(messageSent).isDelivered).toEqual(false);
  expect(new SmsEvent(messageDelivered).isDelivered).toEqual(true);
});

it('#delivered', () => {
  expect(new SmsEvent(textMessageReceived).delivered).toEqual(null);
  expect(new SmsEvent(imageMessageReceived).delivered).toEqual(null);
  expect(new SmsEvent(messageSent).delivered).toEqual(null);
  expect(new SmsEvent(messageDelivered).delivered).toEqual(messageDelivered);
});
