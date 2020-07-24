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

const slackEventInteractiveMessage = new SlackEvent({
  type: 'interactive_message',
  actions: [
    {
      name: 'game',
      type: 'button',
      value: 'chess',
    },
  ],
  callbackId: 'wopr_game',
  team: {
    id: 'T00000001',
    domain: 'team_domain',
  },
  channel: {
    id: 'C00000001',
    name: 'directmessage',
  },
  user: {
    id: 'U00000001',
    name: 'user_name',
  },
  actionTs: '1511153911.446899',
  messageTs: '1511153905.000093',
  attachmentId: '1',
  token: 'n8uIomPoBtc7fSnbHbQcmwdy',
  isAppUnfurl: false,
  originalMessage: {
    type: 'message',
    user: 'U7W1PH7MY',
    text: 'Would you like to play a game?',
    botId: 'B00000001',
    attachments: [
      {
        callbackId: 'wopr_game',
        fallback: 'You are unable to choose a game',
        text: 'Choose a game to play',
        id: 1,
        color: '3AA3E3',
        actions: [
          {
            id: '1',
            name: 'game',
            text: 'Chess',
            type: 'button',
            value: 'chess',
            style: '',
          },
          {
            id: '2',
            name: 'game',
            text: "Falken's Maze",
            type: 'button',
            value: 'maze',
            style: '',
          },
          {
            id: '3',
            name: 'game',
            text: 'Thermonuclear War',
            type: 'button',
            value: 'war',
            style: 'danger',
            confirm: {
              text: "Wouldn't you prefer a good game of chess?",
              title: 'Are you sure?',
              okText: 'Yes',
              dismissText: 'No',
            },
          },
        ],
      },
    ],
    ts: '1511153905.000093',
  },
  responseUrl:
    'https://hooks.slack.com/actions/T056K3CM5/274366307953/73rSfbP0LcVPWfAYB3GicEdD',
  triggerId: '274927463524.5223114719.95a5b9f6d3b30dc7e07dec6bfa4610e5',
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

class TestContext extends Context<any, any> {
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
    it('should call action when it receives a slack event event', async () => {
      await expectRouteMatchSlackEvent({
        route: slack.event('pin_added', Action),
        event: slackEventPinAdded,
      });
    });

    it('should call action when it receives a slack interaction event', async () => {
      await expectRouteMatchSlackEvent({
        route: slack.event('interactive_message', Action),
        event: slackEventInteractiveMessage,
      });
    });

    it('should not call action when it receives a non-event event', async () => {
      await expectRouteNotMatchSlackEvent({
        route: slack.event('pin_added', Action),
        event: slackEventTextMessage,
      });
    });
  });

  describe('#slack.command', () => {
    it('should call action when it receives a slack slash command event', async () => {
      await expectRouteMatchSlackEvent({
        route: slack.command('/weather', Action),
        event: slackEventSlashCommand,
      });
    });
  });
});
