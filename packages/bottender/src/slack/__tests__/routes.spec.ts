import Context from '../../context/Context';
import SlackContext from '../SlackContext';
import SlackEvent from '../SlackEvent';
import router from '../../router';
import slack from '../routes';
import { run } from '../../bot/Bot';

const slackEventTextMessage = new SlackEvent({
  type: 'message',
  channel: 'C2147483705',
  user: 'U2147483697',
  text: 'Hello world',
  ts: '1355517523.000005',
});

const slackEventPinAdded = new SlackEvent({
  type: 'pin_added',
  user: 'U024BE7LH',
  channelId: 'C02ELGNBH',
  item: {},
  eventTs: '1360782804.083113',
});

const slackEventSlashCommand = new SlackEvent({
  token: 'gIkuvaNzQIHg97ATvDxqgjtO',
  teamId: 'T0001',
  teamDomain: 'example',
  enterpriseId: 'E0001',
  enterpriseName: 'Globular%20Construct%20Inc',
  channelId: 'C2147483705',
  channelName: 'test',
  userId: 'U2147483697',
  userName: 'Steve',
  command: '/weather',
  text: '94070',
  responseUrl: 'https://hooks.slack.com/commands/1234/5678',
  triggerId: '13345224609.738474920.8088930838d88f008e0',
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

async function expectRouteMatchSlackEvent({ route, event }) {
  const context = new SlackContext({
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

async function expectRouteNotMatchSlackEvent({ route, event }) {
  const context = new SlackContext({
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

describe('#slack', () => {
  it('should call action when it receives a slack event', async () => {
    await expectRouteMatchSlackEvent({
      route: slack(Action),
      event: slackEventTextMessage,
    });
  });

  it('should not call action when it receives a non-slack event', async () => {
    await expectRouteNotMatchContext({
      route: slack(Action),
      context: new TestContext({
        client: {} as any,
        event: {},
      }),
    });
  });

  describe('#slack.any', () => {
    it('should call action when it receives a slack event', async () => {
      await expectRouteMatchSlackEvent({
        route: slack.any(Action),
        event: slackEventTextMessage,
      });
    });

    it('should not call action when it receives a non-slack event', async () => {
      await expectRouteNotMatchContext({
        route: slack.any(Action),
        context: new TestContext({
          client: {} as any,
          event: {},
        }),
      });
    });
  });

  describe('#slack.message', () => {
    it('should call action when it receives a slack message event', async () => {
      await expectRouteMatchSlackEvent({
        route: slack.message(Action),
        event: slackEventTextMessage,
      });
    });

    it('should not call action when it receives a non-message event', async () => {
      await expectRouteNotMatchSlackEvent({
        route: slack.message(Action),
        event: slackEventPinAdded,
      });
    });
  });

  describe('#slack.event', () => {
    it('should call action when it receives any slack event event', async () => {
      await expectRouteMatchSlackEvent({
        route: slack.event('*', Action),
        event: slackEventPinAdded,
      });
      await expectRouteMatchSlackEvent({
        route: slack.event('*', Action),
        event: slackEventTextMessage,
      });
    });

    it('should not call action when it receives a non-event event', async () => {
      await expectRouteNotMatchSlackEvent({
        route: slack.event('*', Action),
        event: slackEventSlashCommand,
      });
    });

    it('should call action when it receives a slack event event', async () => {
      await expectRouteMatchSlackEvent({
        route: slack.event('pin_added', Action),
        event: slackEventPinAdded,
      });
    });

    it('should not call action when it receives a non-event event', async () => {
      await expectRouteNotMatchSlackEvent({
        route: slack.event('pin_added', Action),
        event: slackEventTextMessage,
      });
    });

    it('should not call action when it receives a command event', async () => {
      await expectRouteNotMatchSlackEvent({
        route: slack.event('pin_added', Action),
        event: slackEventSlashCommand,
      });
    });
  });

  describe('#slack.command', () => {
    it('should call action when it receives any slack slash command event', async () => {
      await expectRouteMatchSlackEvent({
        route: slack.command('*', Action),
        event: slackEventSlashCommand,
      });
    });

    it('should not call action when it receives a event event', async () => {
      await expectRouteNotMatchSlackEvent({
        route: slack.command('*', Action),
        event: slackEventTextMessage,
      });
    });

    it('should call action when it receives a slack slash command event', async () => {
      await expectRouteMatchSlackEvent({
        route: slack.command('/weather', Action),
        event: slackEventSlashCommand,
      });
    });
    it("should not call action when it receives a slack slash command event doesn't match the name", async () => {
      await expectRouteNotMatchSlackEvent({
        route: slack.command('/others', Action),
        event: slackEventSlashCommand,
      });
    });
    it('should not call action when it receives a event event', async () => {
      await expectRouteNotMatchSlackEvent({
        route: slack.command('/weather', Action),
        event: slackEventTextMessage,
      });
    });
  });
});
