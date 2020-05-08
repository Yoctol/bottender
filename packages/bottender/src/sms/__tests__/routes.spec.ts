import Context from '../../context/Context';
import SmsContext from '../SmsContext';
import SmsEvent from '../SmsEvent';
import router from '../../router';
import sms from '../routes';
import { run } from '../../bot/Bot';

const smsEventTextMessageReceived = new SmsEvent({
  smsMessageSid: 'SM7cd85aed706d25735d1c8019234XXXXX',
  numMedia: '0',
  smsSid: 'SM7cd85aed706d25735d1c8019234XXXXX',
  smsStatus: 'received',
  body: 'hi',
  to: '+14155238886',
  numSegments: '1',
  messageSid: 'SM7cd85aed706d25735d1c8019234XXXXX',
  accountSid: 'ACf19dfb164f82b2c9d6178c6ada3XXXXX',
  from: '+886123456789',
  apiVersion: '2010-04-01',
});

const smsEventMediaMessageReceived = new SmsEvent({
  mediaContentType0: 'image/jpeg',
  smsMessageSid: 'MMad0463f6e2a946b3fc91d9a04a2XXXXX',
  numMedia: '1',
  smsSid: 'MMad0463f6e2a946b3fc91d9a04a2XXXXX',
  smsStatus: 'received',
  body: 'xd',
  to: '+14155238886',
  numSegments: '1',
  messageSid: 'MMad0463f6e2a946b3fc91d9a04a2XXXXX',
  accountSid: 'ACf19dfb164f82b2c9d6178c6ada3XXXXX',
  from: '+886123456789',
  mediaUrl0:
    'https://api.twilio.com/2010-04-01/Accounts/ACf19dfb164f82b2c9d6178c6ada3XXXXX/Messages/MMad0463f6e2a946b3fc91d9a04a2XXXXX/Media/MEfaf3decca478ebeb4924fe523ff7fdb2',
  apiVersion: '2010-04-01',
});

const smsEventMessageSent = new SmsEvent({
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
});

const smsEventMessageDelivered = new SmsEvent({
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

async function expectRouteMatchSmsEvent({ route, event }) {
  const context = new SmsContext({
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

async function expectRouteNotMatchSmsEvent({ route, event }) {
  const context = new SmsContext({
    client: {} as any,
    event,
  });

  await expectRouteNotMatchContext({
    route,
    context,
  });
}

class TestContext extends Context<any, any> {
  get platform() {
    return 'test';
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  sendText() {}
}

describe('#sms', () => {
  it('should call action when it receives a sms event', async () => {
    await expectRouteMatchSmsEvent({
      route: sms(Action),
      event: smsEventTextMessageReceived,
    });
  });

  it('should not call action when it receives a non-sms event', async () => {
    await expectRouteNotMatchContext({
      route: sms(Action),
      context: new TestContext({
        client: {} as any,
        event: {},
      }),
    });
  });

  describe('#sms.any', () => {
    it('should call action when it receives a sms event', async () => {
      await expectRouteMatchSmsEvent({
        route: sms.any(Action),
        event: smsEventTextMessageReceived,
      });
    });

    it('should not call action when it receives a non-sms event', async () => {
      await expectRouteNotMatchContext({
        route: sms.any(Action),
        context: new TestContext({
          client: {} as any,
          event: {},
        }),
      });
    });
  });

  describe('#sms.message', () => {
    it('should call action when it receives a sms message event', async () => {
      await expectRouteMatchSmsEvent({
        route: sms.message(Action),
        event: smsEventTextMessageReceived,
      });
    });

    it('should not call action when it receives a non-message event', async () => {
      await expectRouteNotMatchSmsEvent({
        route: sms.message(Action),
        event: smsEventMessageSent,
      });
    });
  });

  describe('#sms.media', () => {
    it('should call action when it receives a sms media event', async () => {
      await expectRouteMatchSmsEvent({
        route: sms.media(Action),
        event: smsEventMediaMessageReceived,
      });
    });

    it('should not call action when it receives a non-media event', async () => {
      await expectRouteNotMatchSmsEvent({
        route: sms.media(Action),
        event: smsEventTextMessageReceived,
      });
    });
  });

  describe('#sms.received', () => {
    it('should call action when it receives a sms received event', async () => {
      await expectRouteMatchSmsEvent({
        route: sms.received(Action),
        event: smsEventTextMessageReceived,
      });
    });

    it('should not call action when it receives a non-received event', async () => {
      await expectRouteNotMatchSmsEvent({
        route: sms.received(Action),
        event: smsEventMessageSent,
      });
    });
  });

  describe('#sms.sent', () => {
    it('should call action when it receives a sms sent event', async () => {
      await expectRouteMatchSmsEvent({
        route: sms.sent(Action),
        event: smsEventMessageSent,
      });
    });

    it('should not call action when it receives a non-sent event', async () => {
      await expectRouteNotMatchSmsEvent({
        route: sms.sent(Action),
        event: smsEventTextMessageReceived,
      });
    });
  });

  describe('#sms.delivered', () => {
    it('should call action when it receives a sms delivered event', async () => {
      await expectRouteMatchSmsEvent({
        route: sms.delivered(Action),
        event: smsEventMessageDelivered,
      });
    });

    it('should not call action when it receives a non-delivered event', async () => {
      await expectRouteNotMatchSmsEvent({
        route: sms.delivered(Action),
        event: smsEventTextMessageReceived,
      });
    });
  });
});
