import Context from '../../context/Context';
import TwilioClient from '../TwilioClient';
import WhatsappContext from '../WhatsappContext';
import WhatsappEvent from '../WhatsappEvent';

const event = new WhatsappEvent({
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
});

function setup() {
  const client = new TwilioClient({
    accountSid: 'ACCOUNT_SID',
    authToken: 'AUTH_TOKEN',
    phoneNumber: 'whatsapp:+14155238886',
  });

  client.createMessage = jest.fn();

  const context = new WhatsappContext({
    client,
    event,
  });

  return {
    client,
    context,
  };
}

it('#platform to be `whatsapp`', () => {
  const { context } = setup();

  expect(context.platform).toBe('whatsapp');
});

describe('#sendText', () => {
  it('should call client.createMessage', async () => {
    const { client, context } = setup();

    await context.sendText('hi');

    expect(client.createMessage).toBeCalledWith({
      body: 'hi',
      to: 'whatsapp:+886123456789',
    });
  });

  it('should accept other options', async () => {
    const { client, context } = setup();

    await context.sendText('hi', {
      maxPrice: 10,
      provideFeedback: true,
      validityPeriod: 10,
      forceDelivery: true,
      smartEncoded: true,
      persistentAction: [],
      mediaUrl: [],
    });

    expect(client.createMessage).toBeCalledWith({
      body: 'hi',
      to: 'whatsapp:+886123456789',
      maxPrice: 10,
      provideFeedback: true,
      validityPeriod: 10,
      forceDelivery: true,
      smartEncoded: true,
      persistentAction: [],
      mediaUrl: [],
    });
  });
});
