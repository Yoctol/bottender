import Context from '../../context/Context';
import WhatsappContext from '../WhatsappContext';
import WhatsappEvent from '../WhatsappEvent';
import router from '../../router';
import whatsapp from '../routes';
import { run } from '../../bot/Bot';

const whatsappEventTextMessageReceived = new WhatsappEvent({
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

const whatsappEventMediaMessageReceived = new WhatsappEvent({
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
});

const whatsappEventMessageSent = new WhatsappEvent({
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
});

const whatsappEventMessageDelivered = new WhatsappEvent({
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
});

const whatsappEventMessageRead = new WhatsappEvent({
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
});

async function Action(context) {
  await context.sendText('hello');
}

async function expectRouteMatchContext({ route, context }) {
  const Router = router([route]);

  const app = run(Router);

  context.sendText = jest.fn();

  await app(context);

  expect(context.sendText).toBeCalledWith('hello');
}

async function expectRouteMatchWhatsappEvent({ route, event }) {
  const context = new WhatsappContext({
    client: {} as any,
    event,
  });

  await expectRouteMatchContext({
    route,
    context,
  });
}

async function expectRouteNotMatchContext({ route, context }) {
  const Router = router([route]);

  const app = run(Router);

  context.sendText = jest.fn();

  await app(context);

  expect(context.sendText).not.toBeCalledWith('hello');
}

async function expectRouteNotMatchWhatsappEvent({ route, event }) {
  const context = new WhatsappContext({
    client: {} as any,
    event,
  });

  await expectRouteNotMatchContext({
    route,
    context,
  });
}

class TestContext extends Context {
  get platform() {
    return 'test';
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  sendText() {}
}

describe('#whatsapp', () => {
  it('should call action when it receives a whatsapp event', async () => {
    await expectRouteMatchWhatsappEvent({
      route: whatsapp(Action),
      event: whatsappEventTextMessageReceived,
    });
  });

  it('should not call action when it receives a non-whatsapp event', async () => {
    await expectRouteNotMatchContext({
      route: whatsapp(Action),
      context: new TestContext({
        client: {} as any,
        event: {},
      }),
    });
  });

  describe('#whatsapp.any', () => {
    it('should call action when it receives a whatsapp event', async () => {
      await expectRouteMatchWhatsappEvent({
        route: whatsapp.any(Action),
        event: whatsappEventTextMessageReceived,
      });
    });

    it('should not call action when it receives a non-whatsapp event', async () => {
      await expectRouteNotMatchContext({
        route: whatsapp.any(Action),
        context: new TestContext({
          client: {} as any,
          event: {},
        }),
      });
    });
  });

  describe('#whatsapp.message', () => {
    it('should call action when it receives a whatsapp message event', async () => {
      await expectRouteMatchWhatsappEvent({
        route: whatsapp.message(Action),
        event: whatsappEventTextMessageReceived,
      });
    });

    it('should not call action when it receives a non-message event', async () => {
      await expectRouteNotMatchWhatsappEvent({
        route: whatsapp.message(Action),
        event: whatsappEventMessageRead,
      });
    });
  });

  describe('#whatsapp.media', () => {
    it('should call action when it receives a whatsapp media event', async () => {
      await expectRouteMatchWhatsappEvent({
        route: whatsapp.media(Action),
        event: whatsappEventMediaMessageReceived,
      });
    });

    it('should not call action when it receives a non-media event', async () => {
      await expectRouteNotMatchWhatsappEvent({
        route: whatsapp.media(Action),
        event: whatsappEventTextMessageReceived,
      });
    });
  });

  describe('#whatsapp.received', () => {
    it('should call action when it receives a whatsapp received event', async () => {
      await expectRouteMatchWhatsappEvent({
        route: whatsapp.received(Action),
        event: whatsappEventTextMessageReceived,
      });
    });

    it('should not call action when it receives a non-received event', async () => {
      await expectRouteNotMatchWhatsappEvent({
        route: whatsapp.received(Action),
        event: whatsappEventMessageSent,
      });
    });
  });

  describe('#whatsapp.sent', () => {
    it('should call action when it receives a whatsapp sent event', async () => {
      await expectRouteMatchWhatsappEvent({
        route: whatsapp.sent(Action),
        event: whatsappEventMessageSent,
      });
    });

    it('should not call action when it receives a non-sent event', async () => {
      await expectRouteNotMatchWhatsappEvent({
        route: whatsapp.sent(Action),
        event: whatsappEventTextMessageReceived,
      });
    });
  });

  describe('#whatsapp.delivered', () => {
    it('should call action when it receives a whatsapp delivered event', async () => {
      await expectRouteMatchWhatsappEvent({
        route: whatsapp.delivered(Action),
        event: whatsappEventMessageDelivered,
      });
    });

    it('should not call action when it receives a non-delivered event', async () => {
      await expectRouteNotMatchWhatsappEvent({
        route: whatsapp.delivered(Action),
        event: whatsappEventTextMessageReceived,
      });
    });
  });

  describe('#whatsapp.read', () => {
    it('should call action when it receives a whatsapp read event', async () => {
      await expectRouteMatchWhatsappEvent({
        route: whatsapp.read(Action),
        event: whatsappEventMessageRead,
      });
    });

    it('should not call action when it receives a non-read event', async () => {
      await expectRouteNotMatchWhatsappEvent({
        route: whatsapp.read(Action),
        event: whatsappEventTextMessageReceived,
      });
    });
  });
});
