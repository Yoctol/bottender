import WhatsappEvent from '../WhatsappEvent';
import {
  MediaMessageReceived,
  MessageDelivered,
  MessageRead,
  MessageSent,
  TextMessageReceived,
} from '../WhatsappTypes';

const textMessageReceived: TextMessageReceived = {
  smsMessageSid: 'SM7cd85aed706d25735d1c8019234XXXXX',
  numMedia: '0',
  smsSid: 'SM7cd85aed706d25735d1c8019234XXXXX',
  smsStatus: 'received',
  body: 'hi',
  to: 'whatsapp:+14155238886',
  numSegments: '1',
  messageSid: 'SM7cd85aed706d25735d1c8019234XXXXX',
  accountSid: 'ACf19dfb164f82b2c9d6178c6ada3XXXXX',
  from: 'whatsapp:+886123456789',
  apiVersion: '2010-04-01',
};

const imageMessageReceived: MediaMessageReceived = {
  mediaContentType0: 'image/jpeg',
  smsMessageSid: 'MMad0463f6e2a946b3fc91d9a04a2XXXXX',
  numMedia: '1',
  smsSid: 'MMad0463f6e2a946b3fc91d9a04a2XXXXX',
  smsStatus: 'received',
  body: 'xd',
  to: 'whatsapp:+14155238886',
  numSegments: '1',
  messageSid: 'MMad0463f6e2a946b3fc91d9a04a2XXXXX',
  accountSid: 'ACf19dfb164f82b2c9d6178c6ada3XXXXX',
  from: 'whatsapp:+886123456789',
  mediaUrl0:
    'https://api.twilio.com/2010-04-01/Accounts/ACf19dfb164f82b2c9d6178c6ada3XXXXX/Messages/MMad0463f6e2a946b3fc91d9a04a2XXXXX/Media/MEfaf3decca478ebeb4924fe523ff7fdb2',
  apiVersion: '2010-04-01',
};

const messageSent: MessageSent = {
  smsSid: 'SM338ac551ecd04d698821b50ea5dXXXXX',
  smsStatus: 'sent',
  messageStatus: 'sent',
  channelToAddress: '+886123456789',
  to: 'whatsapp:+886123456789',
  channelPrefix: 'whatsapp',
  messageSid: 'SM338ac551ecd04d698821b50ea5dXXXXX',
  accountSid: 'ACf19dfb164f82b2c9d6178c6ada3XXXXX',
  structuredMessage: 'false',
  from: 'whatsapp:+14155238886',
  apiVersion: '2010-04-01',
  channelInstallSid: 'XEcc20d939f803ee381f2442185d0XXXXX',
};

const messageDelivered: MessageDelivered = {
  eventType: 'DELIVERED',
  smsSid: 'SM338ac551ecd04d698821b50ea5dXXXXX',
  smsStatus: 'delivered',
  messageStatus: 'delivered',
  channelToAddress: '+886123456789',
  to: 'whatsapp:+886123456789',
  channelPrefix: 'whatsapp',
  messageSid: 'SM338ac551ecd04d698821b50ea5dXXXXX',
  accountSid: 'ACf19dfb164f82b2c9d6178c6ada3XXXXX',
  from: 'whatsapp:+14155238886',
  apiVersion: '2010-04-01',
  channelInstallSid: 'XE85c014c372541a32e1102eb1631XXXXX',
};

const messageRead: MessageRead = {
  eventType: 'READ',
  smsSid: 'SM338ac551ecd04d698821b50ea5dXXXXX',
  smsStatus: 'read',
  messageStatus: 'read',
  channelToAddress: '+886123456789',
  to: 'whatsapp:+886123456789',
  channelPrefix: 'whatsapp',
  messageSid: 'SM338ac551ecd04d698821b50ea5dXXXXX',
  accountSid: 'ACf19dfb164f82b2c9d6178c6ada3XXXXX',
  from: 'whatsapp:+14155238886',
  apiVersion: '2010-04-01',
  channelInstallSid: 'XE85c014c372541a32e1102eb1631XXXXX',
};

it('#rawEvent', () => {
  expect(new WhatsappEvent(textMessageReceived).rawEvent).toEqual(
    textMessageReceived
  );
  expect(new WhatsappEvent(imageMessageReceived).rawEvent).toEqual(
    imageMessageReceived
  );
  expect(new WhatsappEvent(messageSent).rawEvent).toEqual(messageSent);
  expect(new WhatsappEvent(messageDelivered).rawEvent).toEqual(
    messageDelivered
  );
  expect(new WhatsappEvent(messageRead).rawEvent).toEqual(messageRead);
});

it('#isMessage', () => {
  expect(new WhatsappEvent(textMessageReceived).isMessage).toEqual(true);
  expect(new WhatsappEvent(imageMessageReceived).isMessage).toEqual(true);
  expect(new WhatsappEvent(messageSent).isMessage).toEqual(false);
  expect(new WhatsappEvent(messageDelivered).isMessage).toEqual(false);
  expect(new WhatsappEvent(messageRead).isMessage).toEqual(false);
});

it('#message', () => {
  expect(new WhatsappEvent(textMessageReceived).message).toEqual(
    textMessageReceived
  );
  expect(new WhatsappEvent(imageMessageReceived).message).toEqual(
    imageMessageReceived
  );
  expect(new WhatsappEvent(messageSent).message).toEqual(null);
  expect(new WhatsappEvent(messageDelivered).message).toEqual(null);
  expect(new WhatsappEvent(messageRead).message).toEqual(null);
});

it('#isText', () => {
  expect(new WhatsappEvent(textMessageReceived).isText).toEqual(true);
  expect(new WhatsappEvent(imageMessageReceived).isText).toEqual(false);
  expect(new WhatsappEvent(messageSent).isText).toEqual(false);
  expect(new WhatsappEvent(messageDelivered).isText).toEqual(false);
  expect(new WhatsappEvent(messageRead).isText).toEqual(false);
});

it('#text', () => {
  expect(new WhatsappEvent(textMessageReceived).text).toEqual('hi');
  expect(new WhatsappEvent(imageMessageReceived).text).toEqual('xd');
  expect(new WhatsappEvent(messageSent).text).toEqual(null);
  expect(new WhatsappEvent(messageDelivered).text).toEqual(null);
  expect(new WhatsappEvent(messageRead).text).toEqual(null);
});

it('#isMedia', () => {
  expect(new WhatsappEvent(textMessageReceived).isMedia).toEqual(false);
  expect(new WhatsappEvent(imageMessageReceived).isMedia).toEqual(true);
  expect(new WhatsappEvent(messageSent).isMedia).toEqual(false);
  expect(new WhatsappEvent(messageDelivered).isMedia).toEqual(false);
  expect(new WhatsappEvent(messageRead).isMedia).toEqual(false);
});

it('#media', () => {
  expect(new WhatsappEvent(textMessageReceived).media).toEqual(null);
  expect(new WhatsappEvent(imageMessageReceived).media).toEqual({
    contentType: 'image/jpeg',
    url: 'https://api.twilio.com/2010-04-01/Accounts/ACf19dfb164f82b2c9d6178c6ada3XXXXX/Messages/MMad0463f6e2a946b3fc91d9a04a2XXXXX/Media/MEfaf3decca478ebeb4924fe523ff7fdb2',
  });
  expect(new WhatsappEvent(messageSent).media).toEqual(null);
  expect(new WhatsappEvent(messageDelivered).media).toEqual(null);
  expect(new WhatsappEvent(messageRead).media).toEqual(null);
});

it('#isReceived', () => {
  expect(new WhatsappEvent(textMessageReceived).isReceived).toEqual(true);
  expect(new WhatsappEvent(imageMessageReceived).isReceived).toEqual(true);
  expect(new WhatsappEvent(messageSent).isReceived).toEqual(false);
  expect(new WhatsappEvent(messageDelivered).isReceived).toEqual(false);
  expect(new WhatsappEvent(messageRead).isReceived).toEqual(false);
});

it('#received', () => {
  expect(new WhatsappEvent(textMessageReceived).received).toEqual(
    textMessageReceived
  );
  expect(new WhatsappEvent(imageMessageReceived).received).toEqual(
    imageMessageReceived
  );
  expect(new WhatsappEvent(messageSent).received).toEqual(null);
  expect(new WhatsappEvent(messageDelivered).received).toEqual(null);
  expect(new WhatsappEvent(messageRead).received).toEqual(null);
});

it('#isSent', () => {
  expect(new WhatsappEvent(textMessageReceived).isSent).toEqual(false);
  expect(new WhatsappEvent(imageMessageReceived).isSent).toEqual(false);
  expect(new WhatsappEvent(messageSent).isSent).toEqual(true);
  expect(new WhatsappEvent(messageDelivered).isSent).toEqual(false);
  expect(new WhatsappEvent(messageRead).isSent).toEqual(false);
});

it('#sent', () => {
  expect(new WhatsappEvent(textMessageReceived).sent).toEqual(null);
  expect(new WhatsappEvent(imageMessageReceived).sent).toEqual(null);
  expect(new WhatsappEvent(messageSent).sent).toEqual(messageSent);
  expect(new WhatsappEvent(messageDelivered).sent).toEqual(null);
  expect(new WhatsappEvent(messageRead).sent).toEqual(null);
});

it('#isDelivered', () => {
  expect(new WhatsappEvent(textMessageReceived).isDelivered).toEqual(false);
  expect(new WhatsappEvent(imageMessageReceived).isDelivered).toEqual(false);
  expect(new WhatsappEvent(messageSent).isDelivered).toEqual(false);
  expect(new WhatsappEvent(messageDelivered).isDelivered).toEqual(true);
  expect(new WhatsappEvent(messageRead).isDelivered).toEqual(false);
});

it('#delivered', () => {
  expect(new WhatsappEvent(textMessageReceived).delivered).toEqual(null);
  expect(new WhatsappEvent(imageMessageReceived).delivered).toEqual(null);
  expect(new WhatsappEvent(messageSent).delivered).toEqual(null);
  expect(new WhatsappEvent(messageDelivered).delivered).toEqual(
    messageDelivered
  );
  expect(new WhatsappEvent(messageRead).delivered).toEqual(null);
});

it('#isRead', () => {
  expect(new WhatsappEvent(textMessageReceived).isRead).toEqual(false);
  expect(new WhatsappEvent(imageMessageReceived).isRead).toEqual(false);
  expect(new WhatsappEvent(messageSent).isRead).toEqual(false);
  expect(new WhatsappEvent(messageDelivered).isRead).toEqual(false);
  expect(new WhatsappEvent(messageRead).isRead).toEqual(true);
});

it('#read', () => {
  expect(new WhatsappEvent(textMessageReceived).read).toEqual(null);
  expect(new WhatsappEvent(imageMessageReceived).read).toEqual(null);
  expect(new WhatsappEvent(messageSent).read).toEqual(null);
  expect(new WhatsappEvent(messageDelivered).read).toEqual(null);
  expect(new WhatsappEvent(messageRead).read).toEqual(messageRead);
});
