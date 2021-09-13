import TwilioClient from '../TwilioClient';
import WhatsappConnector from '../WhatsappConnector';
import WhatsappContext from '../WhatsappContext';
import WhatsappEvent from '../WhatsappEvent';
import {
  MessageDelivered,
  MessageRead,
  MessageSent,
  TextMessageReceived,
} from '../WhatsappTypes';

const messageReceived: TextMessageReceived = {
  smsMessageSid: 'SM7cd85aed706d25735d1c8019234572df',
  numMedia: '0',
  smsSid: 'SM7cd85aed706d25735d1c8019234572df',
  smsStatus: 'received',
  body: 'hi',
  to: 'whatsapp:+14155238886',
  numSegments: '1',
  messageSid: 'SM7cd85aed706d25735d1c8019234572df',
  accountSid: 'ACf19dfb164f82b2c9d6178c6ada3XXXXX',
  from: 'whatsapp:+886123456789',
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

function setup() {
  const connector = new WhatsappConnector({
    accountSid: 'ACCOUNT_SID',
    authToken: 'AUTH_TOKEN',
  });

  return {
    connector,
  };
}

describe('#platform', () => {
  it('should be whatsapp', () => {
    const { connector } = setup();
    expect(connector.platform).toBe('whatsapp');
  });
});

describe('#client', () => {
  it('should be client', () => {
    const { connector } = setup();
    expect(connector.client).toBeInstanceOf(TwilioClient);
  });

  it('support custom client', () => {
    const client = new TwilioClient({
      accountSid: 'ACCOUNT_SID',
      authToken: 'AUTH_TOKEN',
    });
    const connector = new WhatsappConnector({ client });
    expect(connector.client).toBe(client);
  });
});

describe('#getUniqueSessionKey', () => {
  it('should work with the received event', () => {
    const { connector } = setup();

    const sessionKey = connector.getUniqueSessionKey(messageReceived);

    expect(sessionKey).toEqual('whatsapp:+886123456789');
  });

  it('should work with the sent event', () => {
    const { connector } = setup();

    const sessionKey = connector.getUniqueSessionKey(messageSent);

    expect(sessionKey).toEqual('whatsapp:+886123456789');
  });

  it('should work with the delivered event', () => {
    const { connector } = setup();

    const sessionKey = connector.getUniqueSessionKey(messageDelivered);

    expect(sessionKey).toEqual('whatsapp:+886123456789');
  });

  it('should work with the read event', () => {
    const { connector } = setup();

    const sessionKey = connector.getUniqueSessionKey(messageRead);

    expect(sessionKey).toEqual('whatsapp:+886123456789');
  });
});

describe('#updateSession', () => {
  it('should update user id on session to `from` string when the message is received', async () => {
    const { connector } = setup();

    const session = {};
    await connector.updateSession(session, messageReceived);

    expect(session).toEqual({
      user: {
        _updatedAt: expect.any(String),
        id: 'whatsapp:+886123456789',
      },
    });
  });

  it('should update user id on session to `to` string when the message is sent', async () => {
    const { connector } = setup();

    const session = {};
    await connector.updateSession(session, messageSent);

    expect(session).toEqual({
      user: {
        _updatedAt: expect.any(String),
        id: 'whatsapp:+886123456789',
      },
    });
  });

  it('should update user id on session to `to` string when the message is delivered', async () => {
    const { connector } = setup();

    const session = {};
    await connector.updateSession(session, messageDelivered);

    expect(session).toEqual({
      user: {
        _updatedAt: expect.any(String),
        id: 'whatsapp:+886123456789',
      },
    });
  });

  it('should update user id on session to `to` string when the message is read', async () => {
    const { connector } = setup();

    const session = {};
    await connector.updateSession(session, messageRead);

    expect(session).toEqual({
      user: {
        _updatedAt: expect.any(String),
        id: 'whatsapp:+886123456789',
      },
    });
  });
});

describe('#mapRequestToEvents', () => {
  it('should map request to WhatsappEvent', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(messageReceived);

    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(WhatsappEvent);
  });
});

describe('#createContext', () => {
  it('should create WhatsappContext', async () => {
    const { connector } = setup();
    const event = new WhatsappEvent(messageReceived);
    const session = {};

    const context = await connector.createContext({
      event,
      session,
    });

    expect(context).toBeDefined();
    expect(context).toBeInstanceOf(WhatsappContext);
  });
});

describe('#preprocess', () => {
  it('should return shouldNext: true if signature match', () => {
    const { connector } = setup();

    expect(
      connector.preprocess({
        method: 'post',
        url: 'http://xxxxxxxx.ngrok.io/webhooks/whatsapp',
        headers: {
          'x-twilio-signature': 'Aw+rhj2Zc+2pBslFUXMhzqUnmaM=',
        },
        query: {},
        rawBody: '{}',
        body: {},
      })
    ).toEqual({
      shouldNext: true,
    });
  });

  it('should return shouldNext: false and error if signature does not match', () => {
    const { connector } = setup();

    expect(
      connector.preprocess({
        method: 'post',
        url: 'http://xxxxxxxx.ngrok.io/webhooks/whatsapp',
        headers: {
          'x-twilio-signature': 'hu/qdx0P1E0D7WJNUIRLKWDbvsI=',
        },
        query: {},
        rawBody: '{}',
        body: {},
      })
    ).toEqual({
      shouldNext: false,
      response: {
        body: {
          error: {
            message: 'WhatsApp Signature Validation Failed!',
            request: {
              headers: {
                'x-twilio-signature': 'hu/qdx0P1E0D7WJNUIRLKWDbvsI=',
              },
              rawBody: '{}',
            },
          },
        },
        status: 400,
      },
    });
  });
});
