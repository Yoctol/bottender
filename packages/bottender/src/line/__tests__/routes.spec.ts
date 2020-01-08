import Context from '../../context/Context';
import LineContext from '../LineContext';
import LineEvent from '../LineEvent';
import line from '../routes';
import router from '../../router';
import { run } from '../../bot/Bot';

const lineEventTextMessage = new LineEvent({
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'message',
  mode: 'active',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U4af4980629...',
  },
  message: {
    id: '325708',
    type: 'text',
    text: 'Hello, world!',
  },
});

const lineEventFollow = new LineEvent({
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'follow',
  mode: 'active',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U4af4980629...',
  },
});

const lineEventUnfollow = new LineEvent({
  type: 'unfollow',
  mode: 'active',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U4af4980629...',
  },
});

const lineEventJoin = new LineEvent({
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'join',
  mode: 'active',
  timestamp: 1462629479859,
  source: {
    type: 'group',
    groupId: 'C4af4980629...',
  },
});

const lineEventLeave = new LineEvent({
  type: 'leave',
  mode: 'active',
  timestamp: 1462629479859,
  source: {
    type: 'group',
    groupId: 'C4af4980629...',
  },
});

const lineEventMemberJoined = new LineEvent({
  replyToken: '0f3779fba3b349968c5d07db31eabf65',
  type: 'memberJoined',
  mode: 'active',
  timestamp: 1462629479859,
  source: {
    type: 'group',
    groupId: 'C4af4980629...',
  },
  joined: {
    members: [
      {
        type: 'user',
        userId: 'U4af4980629...',
      },
      {
        type: 'user',
        userId: 'U91eeaf62d9...',
      },
    ],
  },
});

const lineEventMemberLeft = new LineEvent({
  type: 'memberLeft',
  mode: 'active',
  timestamp: 1462629479960,
  source: {
    type: 'group',
    groupId: 'C4af4980629...',
  },
  left: {
    members: [
      {
        type: 'user',
        userId: 'U4af4980629...',
      },
      {
        type: 'user',
        userId: 'U91eeaf62d9...',
      },
    ],
  },
});

const lineEventPostback = new LineEvent({
  type: 'postback',
  replyToken: 'b60d432864f44d079f6d8efe86cf404b',
  source: {
    userId: 'U91eeaf62d...',
    type: 'user',
  },
  mode: 'active',
  timestamp: 1513669370317,
  postback: {
    data: 'storeId=12345',
    params: {
      datetime: '2017-12-25T01:00',
    },
  },
});

const lineEventBeaconEnter = new LineEvent({
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'beacon',
  mode: 'active',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U4af4980629...',
  },
  beacon: {
    hwid: 'd41d8cd98f',
    type: 'enter',
  },
});

const lineEventBeaconBanner = new LineEvent({
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'beacon',
  mode: 'active',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U4af4980629...',
  },
  beacon: {
    hwid: 'd41d8cd98f',
    type: 'banner',
  },
});

const lineEventBeaconStay = new LineEvent({
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  type: 'beacon',
  mode: 'active',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U4af4980629...',
  },
  beacon: {
    hwid: 'd41d8cd98f',
    type: 'stay',
  },
});

const lineEventAccountLink = new LineEvent({
  type: 'accountLink',
  mode: 'active',
  replyToken: 'b60d432864f44d079f6d8efe86cf404b',
  source: {
    userId: 'U91eeaf62d...',
    type: 'user',
  },
  timestamp: 1513669370317,
  link: {
    result: 'ok',
    nonce: 'xxxxxxxxxxxxxxx',
  },
});

const lineEventThingsLink = new LineEvent({
  type: 'things',
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  mode: 'active',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U91eeaf62d...',
  },
  things: {
    deviceId: 't2c449c9d1...',
    type: 'link',
  },
});

const lineEventThingsUnlink = new LineEvent({
  type: 'things',
  replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
  mode: 'active',
  timestamp: 1462629479859,
  source: {
    type: 'user',
    userId: 'U91eeaf62d...',
  },
  things: {
    deviceId: 't2c449c9d1...',
    type: 'unlink',
  },
});

const lineEventThingsScenarioResult = new LineEvent({
  type: 'things',
  replyToken: '0f3779fba3b349968c5d07db31eab56f',
  source: {
    userId: 'uXXX',
    type: 'user',
  },
  mode: 'active',
  timestamp: 1547817848122,
  things: {
    type: 'scenarioResult',
    deviceId: 'tXXX',
    result: {
      scenarioId: 'XXX',
      revision: 2,
      startTime: 1547817845950,
      endTime: 1547817845952,
      resultCode: 'success',
      bleNotificationPayload: 'AQ==',
      actionResults: [
        {
          type: 'binary',
          data: '/w==',
        },
      ],
    },
  },
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

async function expectRouteMatchLineEvent({ route, event }) {
  const context = new LineContext({
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

async function expectRouteNotMatchLineEvent({ route, event }) {
  const context = new LineContext({
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

describe('#line', () => {
  it('should call action when it receives a line event', async () => {
    await expectRouteMatchLineEvent({
      route: line(Action),
      event: lineEventTextMessage,
    });
  });

  it('should not call action when it receives a non-line event', async () => {
    await expectRouteNotMatchContext({
      route: line(Action),
      context: new TestContext({
        client: {} as any,
        event: {},
      }),
    });
  });

  describe('#line.message', () => {
    it('should call action when it receives a line message event', async () => {
      await expectRouteMatchLineEvent({
        route: line.message(Action),
        event: lineEventTextMessage,
      });
    });

    it('should not call action when it receives a non-message event', async () => {
      await expectRouteNotMatchLineEvent({
        route: line.message(Action),
        event: lineEventFollow,
      });
    });
  });

  describe('#line.follow', () => {
    it('should call action when it receives a line follow event', async () => {
      await expectRouteMatchLineEvent({
        route: line.follow(Action),
        event: lineEventFollow,
      });
    });

    it('should not call action when it receives a non-follow event', async () => {
      await expectRouteNotMatchLineEvent({
        route: line.follow(Action),
        event: lineEventUnfollow,
      });
    });
  });

  describe('#line.unfollow', () => {
    it('should call action when it receives a line unfollow event', async () => {
      await expectRouteMatchLineEvent({
        route: line.unfollow(Action),
        event: lineEventUnfollow,
      });
    });

    it('should not call action when it receives a non-unfollow event', async () => {
      await expectRouteNotMatchLineEvent({
        route: line.unfollow(Action),
        event: lineEventFollow,
      });
    });
  });

  describe('#line.join', () => {
    it('should call action when it receives a line join event', async () => {
      await expectRouteMatchLineEvent({
        route: line.join(Action),
        event: lineEventJoin,
      });
    });

    it('should not call action when it receives a non-join event', async () => {
      await expectRouteNotMatchLineEvent({
        route: line.join(Action),
        event: lineEventLeave,
      });
    });
  });

  describe('#line.leave', () => {
    it('should call action when it receives a line leave event', async () => {
      await expectRouteMatchLineEvent({
        route: line.leave(Action),
        event: lineEventLeave,
      });
    });

    it('should not call action when it receives a non-leave event', async () => {
      await expectRouteNotMatchLineEvent({
        route: line.leave(Action),
        event: lineEventJoin,
      });
    });
  });

  describe('#line.memberJoined', () => {
    it('should call action when it receives a line memberJoined event', async () => {
      await expectRouteMatchLineEvent({
        route: line.memberJoined(Action),
        event: lineEventMemberJoined,
      });
    });

    it('should not call action when it receives a non-memberJoined event', async () => {
      await expectRouteNotMatchLineEvent({
        route: line.memberJoined(Action),
        event: lineEventMemberLeft,
      });
    });
  });

  describe('#line.memberLeft', () => {
    it('should call action when it receives a line memberLeft event', async () => {
      await expectRouteMatchLineEvent({
        route: line.memberLeft(Action),
        event: lineEventMemberLeft,
      });
    });

    it('should not call action when it receives a non-memberLeft event', async () => {
      await expectRouteNotMatchLineEvent({
        route: line.memberLeft(Action),
        event: lineEventMemberJoined,
      });
    });
  });

  describe('#line.postback', () => {
    it('should call action when it receives a line postback event', async () => {
      await expectRouteMatchLineEvent({
        route: line.postback(Action),
        event: lineEventPostback,
      });
    });

    it('should not call action when it receives a non-postback event', async () => {
      await expectRouteNotMatchLineEvent({
        route: line.postback(Action),
        event: lineEventTextMessage,
      });
    });
  });

  describe('#line.beacon', () => {
    it('should call action when it receives a line beacon event', async () => {
      await expectRouteMatchLineEvent({
        route: line.beacon.enter(Action),
        event: lineEventBeaconEnter,
      });
    });

    it('should not call action when it receives a non-beacon event', async () => {
      await expectRouteNotMatchLineEvent({
        route: line.beacon(Action),
        event: lineEventTextMessage,
      });
    });

    describe('#line.beacon.enter', () => {
      it('should call action when it receives a line beacon enter event', async () => {
        await expectRouteMatchLineEvent({
          route: line.beacon.enter(Action),
          event: lineEventBeaconEnter,
        });
      });

      it('should not call action when it receives a non-beacon.enter event', async () => {
        await expectRouteNotMatchLineEvent({
          route: line.beacon.enter(Action),
          event: lineEventBeaconBanner,
        });
      });
    });

    describe('#line.beacon.banner', () => {
      it('should call action when it receives a line beacon banner event', async () => {
        await expectRouteMatchLineEvent({
          route: line.beacon.banner(Action),
          event: lineEventBeaconBanner,
        });
      });

      it('should not call action when it receives a non-beacon.banner event', async () => {
        await expectRouteNotMatchLineEvent({
          route: line.beacon.banner(Action),
          event: lineEventBeaconStay,
        });
      });
    });

    describe('#line.beacon.stay', () => {
      it('should call action when it receives a line beacon stay event', async () => {
        await expectRouteMatchLineEvent({
          route: line.beacon.stay(Action),
          event: lineEventBeaconStay,
        });
      });

      it('should not call action when it receives a non-beacon.stay event', async () => {
        await expectRouteNotMatchLineEvent({
          route: line.beacon.stay(Action),
          event: lineEventBeaconEnter,
        });
      });
    });
  });

  describe('#line.accountLink', () => {
    it('should call action when it receives a line accountLink event', async () => {
      await expectRouteMatchLineEvent({
        route: line.accountLink(Action),
        event: lineEventAccountLink,
      });
    });

    it('should not call action when it receives a non-accountLink event', async () => {
      await expectRouteNotMatchLineEvent({
        route: line.accountLink(Action),
        event: lineEventTextMessage,
      });
    });
  });

  describe('#line.things', () => {
    it('should call action when it receives a line things event', async () => {
      await expectRouteMatchLineEvent({
        route: line.things.link(Action),
        event: lineEventThingsLink,
      });
    });

    it('should not call action when it receives a non-things event', async () => {
      await expectRouteNotMatchLineEvent({
        route: line.things(Action),
        event: lineEventTextMessage,
      });
    });

    describe('#line.things.link', () => {
      it('should call action when it receives a line things link event', async () => {
        await expectRouteMatchLineEvent({
          route: line.things.link(Action),
          event: lineEventThingsLink,
        });
      });

      it('should not call action when it receives a non-things.link event', async () => {
        await expectRouteNotMatchLineEvent({
          route: line.things.link(Action),
          event: lineEventThingsUnlink,
        });
      });
    });

    describe('#line.things.unlink', () => {
      it('should call action when it receives a line things unlink event', async () => {
        await expectRouteMatchLineEvent({
          route: line.things.unlink(Action),
          event: lineEventThingsUnlink,
        });
      });

      it('should not call action when it receives a non-things.unlink event', async () => {
        await expectRouteNotMatchLineEvent({
          route: line.things.unlink(Action),
          event: lineEventThingsLink,
        });
      });
    });

    describe('#line.things.scenarioResult', () => {
      it('should call action when it receives a line things scenarioResult event', async () => {
        await expectRouteMatchLineEvent({
          route: line.things.scenarioResult(Action),
          event: lineEventThingsScenarioResult,
        });
      });

      it('should not call action when it receives a non-things.scenarioResult event', async () => {
        await expectRouteNotMatchLineEvent({
          route: line.things.scenarioResult(Action),
          event: lineEventThingsLink,
        });
      });
    });
  });
});
