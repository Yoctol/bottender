import Context from '../../context/Context';
import MessengerContext from '../MessengerContext';
import MessengerEvent from '../MessengerEvent';
import messenger from '../routes';
import router from '../../router';
import { run } from '../../bot/Bot';

const messengerEventTextMessage = new MessengerEvent({
  sender: {
    id: '1476077422222289',
  },
  recipient: {
    id: '707356222221168',
  },
  timestamp: 1458692752478,
  message: {
    mid: 'mid.1457764197618:41d102a3e1ae206a38',
    text: 'hello, world!',
  },
});

const messengerEventAccountLinkingLinked = new MessengerEvent({
  sender: {
    id: '1476077422222289',
  },
  recipient: {
    id: '707356222221168',
  },
  timestamp: 1458692752478,
  accountLinking: {
    status: 'linked',
    authorizationCode: 'PASS_THROUGH_AUTHORIZATION_CODE',
  },
});

const messengerEventAccountLinkingUnlinked = new MessengerEvent({
  sender: {
    id: '1476077422222289',
  },
  recipient: {
    id: '707356222221168',
  },
  timestamp: 1458692752478,
  accountLinking: {
    status: 'unlinked',
  },
});

const messengerEventCheckoutUpdate = new MessengerEvent({
  sender: {
    id: '1476077422222289',
  },
  recipient: {
    id: '707356222221168',
  },
  timestamp: 1458692752478,
  checkoutUpdate: {
    payload: 'DEVELOPER_DEFINED_PAYLOAD',
    shippingAddress: {
      id: 10105655000959552,
      country: 'US',
      city: 'MENLO PARK',
      street1: '1 Hacker Way',
      street2: '',
      state: 'CA',
      postalCode: '94025',
    },
  },
});

const messengerEventDelivery = new MessengerEvent({
  sender: {
    id: '1476077422222289',
  },
  recipient: {
    id: '707356222221168',
  },
  timestamp: 1458692752478,
  delivery: {
    mids: ['mid.1458668856218:ed81099e15d3f4f233'],
    watermark: 1458668856253,
  },
});

const messengerEventEcho = new MessengerEvent({
  sender: {
    id: '1476077422222289',
  },
  recipient: {
    id: '707356222221168',
  },
  timestamp: 1458692752478,
  message: {
    isEcho: true,
    appId: 1517776481860111,
    metadata: '<DEVELOPER_DEFINED_METADATA_STRING>',
    mid: 'mid.1457764197618:41d102a3e1ae206a38',
  },
});

const messengerEventGamePlay = new MessengerEvent({
  sender: {
    id: '1476077422222289',
  },
  recipient: {
    id: '707356222221168',
  },
  timestamp: 1458692752478,
  gamePlay: {
    gameId: '<GAME-APP-ID>',
    playerId: '<PLAYER-ID>',
    contextType: 'SOLO',
    contextId: '<CONTEXT-ID>',
    score: 0,
    payload: '<PAYLOAD>',
  },
});

const messengerEventPassThreadControl = new MessengerEvent({
  sender: {
    id: '1476077422222289',
  },
  recipient: {
    id: '707356222221168',
  },
  timestamp: 1458692752478,
  passThreadControl: {
    newOwnerAppId: '123456789',
    metadata: 'Additional content that the caller wants to set',
  },
});

const messengerEventTakeThreadControl = new MessengerEvent({
  sender: {
    id: '1476077422222289',
  },
  recipient: {
    id: '707356222221168',
  },
  timestamp: 1458692752478,
  takeThreadControl: {
    previousOwnerAppId: '123456789',
    metadata: 'additional content that the caller wants to set',
  },
});

const messengerEventRequestThreadControl = new MessengerEvent({
  sender: {
    id: '1476077422222289',
  },
  recipient: {
    id: '707356222221168',
  },
  timestamp: 1458692752478,
  requestThreadControl: {
    requestedOwnerAppId: 123456789,
    metadata: 'additional content that the caller wants to set',
  },
});

const messengerEventAppRoles = new MessengerEvent({
  sender: {
    id: '1476077422222289',
  },
  recipient: {
    id: '707356222221168',
  },
  timestamp: 1458692752478,
  appRoles: {
    '123456789': ['primary_receiver'],
  },
});

const messengerEventOptin = new MessengerEvent({
  sender: {
    id: '1476077422222289',
  },
  recipient: {
    id: '707356222221168',
  },
  timestamp: 1458692752478,
  optin: {
    ref: '<PASS_THROUGH_PARAM>',
    userRef: '<REF_FROM_CHECKBOX_PLUGIN>',
  },
});

const messengerEventPayment = new MessengerEvent({
  sender: {
    id: '1476077422222289',
  },
  recipient: {
    id: '707356222221168',
  },
  timestamp: 1458692752478,
  payment: {
    payload: 'DEVELOPER_DEFINED_PAYLOAD',
    requestedUserInfo: {
      shippingAddress: {},
      contactName: 'Peter Chang',
      contactEmail: 'peter@anemail.com',
      contactPhone: '+15105551234',
    },
    paymentCredential: {
      providerType: 'paypal',
      chargeId: 'ch_18tmdBEoNIH3FPJHa60ep123',
      fbPaymentId: '123456789',
    },
    amount: {
      currency: 'USD',
      amount: '29.62',
    },
    shippingOptionId: '123',
  },
});

const messengerEventPolicyEnforcement = new MessengerEvent({
  sender: {
    id: '1476077422222289',
  },
  recipient: {
    id: '707356222221168',
  },
  timestamp: 1458692752478,
  'policy-enforcement': {
    action: 'block',
    reason:
      'The bot violated our Platform Policies (https://developers.facebook.com/policy/#messengerplatform). Common violations include sending out excessive spammy messages or being non-functional.',
  },
});

const messengerEventPostback = new MessengerEvent({
  sender: {
    id: '1476077422222289',
  },
  recipient: {
    id: '707356222221168',
  },
  timestamp: 1458692752478,
  postback: {
    title: '<TITLE_FOR_THE_CTA>',
    payload: '<USER_DEFINED_PAYLOAD>',
    referral: {
      ref: '<USER_DEFINED_REFERRAL_PARAM>',
      source: '<SHORTLINK>',
      type: 'OPEN_THREAD',
    },
  },
});

const messengerEventPreCheckout = new MessengerEvent({
  sender: {
    id: '1476077422222289',
  },
  recipient: {
    id: '707356222221168',
  },
  timestamp: 1458692752478,
  preCheckout: {
    payload: 'xyz',
    requestedUserInfo: {
      shippingAddress: {
        name: 'Tao Jiang',
        street1: '600 Edgewater Blvd',
        street2: '',
        city: 'Foster City',
        state: 'CA',
        country: 'US',
        postalCode: '94404',
      },
      contactName: 'Tao Jiang',
    },
    amount: {
      currency: 'USD',
      amount: '2.70',
    },
  },
});

const messengerEventRead = new MessengerEvent({
  sender: {
    id: '1476077422222289',
  },
  recipient: {
    id: '707356222221168',
  },
  timestamp: 1458692752478,
  read: {
    watermark: 1458668856253,
  },
});

const messengerEventReferral = new MessengerEvent({
  sender: {
    id: '1476077422222289',
  },
  recipient: {
    id: '707356222221168',
  },
  timestamp: 1458692752478,
  referral: {
    ref: '<REF_DATA_PASSED_IN_M.ME_PARAM>',
    source: 'SHORTLINK',
    type: 'OPEN_THREAD',
  },
});

const messengerEventStandby = new MessengerEvent(
  {
    sender: {
      id: '1476077422222289',
    },
    recipient: {
      id: '707356222221168',
    },
    timestamp: 1458692752478,
    message: {
      mid: 'mid.1457764197618:41d102a3e1ae206a38',
      text: 'hello, world!',
    },
  },
  { isStandby: true }
);

const messengerEventReactionReact = new MessengerEvent({
  sender: {
    id: '1476077422222289',
  },
  recipient: {
    id: '707356222221168',
  },
  timestamp: 1469111400000,
  reaction: {
    reaction: 'smile',
    emoji: '\u{2764}\u{FE0F}',
    action: 'react',
    mid: 'mid.$cAAE1UUyiiwthh0NPrVbVf4HFNDGl',
  },
});

const messengerEventReactionUnreact = new MessengerEvent({
  sender: {
    id: '1476077422222289',
  },
  recipient: {
    id: '707356222221168',
  },
  timestamp: 1469111400000,
  reaction: {
    reaction: 'smile',
    emoji: '\u{2764}\u{FE0F}',
    action: 'unreact',
    mid: 'mid.$cAAE1UUyiiwthh0NPrVbVf4HFNDGl',
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

async function expectRouteMatchMessengerEvent({ route, event }) {
  const context = new MessengerContext({
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

async function expectRouteNotMatchMessengerEvent({ route, event }) {
  const context = new MessengerContext({
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

describe('#messenger', () => {
  it('should call action when it receives a messenger event', async () => {
    await expectRouteMatchMessengerEvent({
      route: messenger(Action),
      event: messengerEventTextMessage,
    });
  });

  it('should not call action when it receives a non-messenger event', async () => {
    await expectRouteNotMatchContext({
      route: messenger(Action),
      context: new TestContext({
        client: {} as any,
        event: {},
      }),
    });
  });

  describe('#messenger.any', () => {
    it('should call action when it receives a messenger event', async () => {
      await expectRouteMatchMessengerEvent({
        route: messenger.any(Action),
        event: messengerEventTextMessage,
      });
    });

    it('should not call action when it receives a non-messenger event', async () => {
      await expectRouteNotMatchContext({
        route: messenger.any(Action),
        context: new TestContext({
          client: {} as any,
          event: {},
        }),
      });
    });
  });

  describe('#messenger.message', () => {
    it('should call action when it receives a messenger message event', async () => {
      await expectRouteMatchMessengerEvent({
        route: messenger.message(Action),
        event: messengerEventTextMessage,
      });
    });

    it('should not call action when it receives a non-message event', async () => {
      await expectRouteNotMatchMessengerEvent({
        route: messenger.message(Action),
        event: messengerEventPostback,
      });
    });
  });

  describe('#messenger.accountLinking', () => {
    it('should call action when it receives a messenger accountLinking event', async () => {
      await expectRouteMatchMessengerEvent({
        route: messenger.accountLinking(Action),
        event: messengerEventAccountLinkingLinked,
      });
    });

    it('should not call action when it receives a non-accountLinking event', async () => {
      await expectRouteNotMatchMessengerEvent({
        route: messenger.accountLinking(Action),
        event: messengerEventTextMessage,
      });
    });

    describe('#messenger.accountLinking.linked', () => {
      it('should call action when it receives a messenger accountLinking.linked event', async () => {
        await expectRouteMatchMessengerEvent({
          route: messenger.accountLinking.linked(Action),
          event: messengerEventAccountLinkingLinked,
        });
      });

      it('should not call action when it receives a non-accountLinking.linked event', async () => {
        await expectRouteNotMatchMessengerEvent({
          route: messenger.accountLinking.linked(Action),
          event: messengerEventAccountLinkingUnlinked,
        });
      });
    });

    describe('#messenger.accountLinking.unlinked', () => {
      it('should call action when it receives a messenger accountLinking.unlinked event', async () => {
        await expectRouteMatchMessengerEvent({
          route: messenger.accountLinking.unlinked(Action),
          event: messengerEventAccountLinkingUnlinked,
        });
      });

      it('should not call action when it receives a non-accountLinking.unlinked event', async () => {
        await expectRouteNotMatchMessengerEvent({
          route: messenger.accountLinking.unlinked(Action),
          event: messengerEventAccountLinkingLinked,
        });
      });
    });
  });

  describe('#messenger.checkoutUpdate', () => {
    it('should call action when it receives a messenger checkoutUpdate event', async () => {
      await expectRouteMatchMessengerEvent({
        route: messenger.checkoutUpdate(Action),
        event: messengerEventCheckoutUpdate,
      });
    });

    it('should not call action when it receives a non-checkoutUpdate event', async () => {
      await expectRouteNotMatchMessengerEvent({
        route: messenger.checkoutUpdate(Action),
        event: messengerEventTextMessage,
      });
    });
  });

  describe('#messenger.delivery', () => {
    it('should call action when it receives a messenger delivery event', async () => {
      await expectRouteMatchMessengerEvent({
        route: messenger.delivery(Action),
        event: messengerEventDelivery,
      });
    });

    it('should not call action when it receives a non-delivery event', async () => {
      await expectRouteNotMatchMessengerEvent({
        route: messenger.delivery(Action),
        event: messengerEventTextMessage,
      });
    });
  });

  describe('#messenger.echo', () => {
    it('should call action when it receives a messenger echo event', async () => {
      await expectRouteMatchMessengerEvent({
        route: messenger.echo(Action),
        event: messengerEventEcho,
      });
    });

    it('should not call action when it receives a non-echo event', async () => {
      await expectRouteNotMatchMessengerEvent({
        route: messenger.echo(Action),
        event: messengerEventTextMessage,
      });
    });
  });

  describe('#messenger.gamePlay', () => {
    it('should call action when it receives a messenger gamePlay event', async () => {
      await expectRouteMatchMessengerEvent({
        route: messenger.gamePlay(Action),
        event: messengerEventGamePlay,
      });
    });

    it('should not call action when it receives a non-gamePlay event', async () => {
      await expectRouteNotMatchMessengerEvent({
        route: messenger.gamePlay(Action),
        event: messengerEventTextMessage,
      });
    });
  });

  describe('#messenger.passThreadControl', () => {
    it('should call action when it receives a messenger passThreadControl event', async () => {
      await expectRouteMatchMessengerEvent({
        route: messenger.passThreadControl(Action),
        event: messengerEventPassThreadControl,
      });
    });

    it('should not call action when it receives a non-passThreadControl event', async () => {
      await expectRouteNotMatchMessengerEvent({
        route: messenger.passThreadControl(Action),
        event: messengerEventTextMessage,
      });
    });
  });

  describe('#messenger.takeThreadControl', () => {
    it('should call action when it receives a messenger takeThreadControl event', async () => {
      await expectRouteMatchMessengerEvent({
        route: messenger.takeThreadControl(Action),
        event: messengerEventTakeThreadControl,
      });
    });

    it('should not call action when it receives a non-takeThreadControl event', async () => {
      await expectRouteNotMatchMessengerEvent({
        route: messenger.takeThreadControl(Action),
        event: messengerEventTextMessage,
      });
    });
  });

  describe('#messenger.requestThreadControl', () => {
    it('should call action when it receives a messenger requestThreadControl event', async () => {
      await expectRouteMatchMessengerEvent({
        route: messenger.requestThreadControl(Action),
        event: messengerEventRequestThreadControl,
      });
    });

    it('should not call action when it receives a non-requestThreadControl event', async () => {
      await expectRouteNotMatchMessengerEvent({
        route: messenger.requestThreadControl(Action),
        event: messengerEventTextMessage,
      });
    });
  });

  describe('#messenger.appRoles', () => {
    it('should call action when it receives a messenger appRoles event', async () => {
      await expectRouteMatchMessengerEvent({
        route: messenger.appRoles(Action),
        event: messengerEventAppRoles,
      });
    });

    it('should not call action when it receives a non-appRoles event', async () => {
      await expectRouteNotMatchMessengerEvent({
        route: messenger.appRoles(Action),
        event: messengerEventTextMessage,
      });
    });
  });

  describe('#messenger.optin', () => {
    it('should call action when it receives a messenger optin event', async () => {
      await expectRouteMatchMessengerEvent({
        route: messenger.optin(Action),
        event: messengerEventOptin,
      });
    });

    it('should not call action when it receives a non-optin event', async () => {
      await expectRouteNotMatchMessengerEvent({
        route: messenger.optin(Action),
        event: messengerEventTextMessage,
      });
    });
  });

  describe('#messenger.payment', () => {
    it('should call action when it receives a messenger payment event', async () => {
      await expectRouteMatchMessengerEvent({
        route: messenger.payment(Action),
        event: messengerEventPayment,
      });
    });

    it('should not call action when it receives a non-payment event', async () => {
      await expectRouteNotMatchMessengerEvent({
        route: messenger.payment(Action),
        event: messengerEventTextMessage,
      });
    });
  });

  describe('#messenger.policyEnforcement', () => {
    it('should call action when it receives a messenger policyEnforcement event', async () => {
      await expectRouteMatchMessengerEvent({
        route: messenger.policyEnforcement(Action),
        event: messengerEventPolicyEnforcement,
      });
    });

    it('should not call action when it receives a non-policyEnforcement event', async () => {
      await expectRouteNotMatchMessengerEvent({
        route: messenger.policyEnforcement(Action),
        event: messengerEventTextMessage,
      });
    });
  });

  describe('#messenger.postback', () => {
    it('should call action when it receives a messenger postback event', async () => {
      await expectRouteMatchMessengerEvent({
        route: messenger.postback(Action),
        event: messengerEventPostback,
      });
    });

    it('should not call action when it receives a non-postback event', async () => {
      await expectRouteNotMatchMessengerEvent({
        route: messenger.postback(Action),
        event: messengerEventTextMessage,
      });
    });
  });

  describe('#messenger.preCheckout', () => {
    it('should call action when it receives a messenger preCheckout event', async () => {
      await expectRouteMatchMessengerEvent({
        route: messenger.preCheckout(Action),
        event: messengerEventPreCheckout,
      });
    });

    it('should not call action when it receives a non-preCheckout event', async () => {
      await expectRouteNotMatchMessengerEvent({
        route: messenger.preCheckout(Action),
        event: messengerEventTextMessage,
      });
    });
  });

  describe('#messenger.read', () => {
    it('should call action when it receives a messenger read event', async () => {
      await expectRouteMatchMessengerEvent({
        route: messenger.read(Action),
        event: messengerEventRead,
      });
    });

    it('should not call action when it receives a non-read event', async () => {
      await expectRouteNotMatchMessengerEvent({
        route: messenger.read(Action),
        event: messengerEventTextMessage,
      });
    });
  });

  describe('#messenger.referral', () => {
    it('should call action when it receives a messenger referral event', async () => {
      await expectRouteMatchMessengerEvent({
        route: messenger.referral(Action),
        event: messengerEventReferral,
      });
    });

    it('should not call action when it receives a non-referral event', async () => {
      await expectRouteNotMatchMessengerEvent({
        route: messenger.referral(Action),
        event: messengerEventTextMessage,
      });
    });
  });

  describe('#messenger.standby', () => {
    it('should call action when it receives a messenger standby event', async () => {
      await expectRouteMatchMessengerEvent({
        route: messenger.standby(Action),
        event: messengerEventStandby,
      });
    });

    it('should not call action when it receives a non-standby event', async () => {
      await expectRouteNotMatchMessengerEvent({
        route: messenger.standby(Action),
        event: messengerEventTextMessage,
      });
    });
  });

  describe('#messenger.reaction', () => {
    it('should call action when it receives a messenger reaction event', async () => {
      await expectRouteMatchMessengerEvent({
        route: messenger.reaction(Action),
        event: messengerEventReactionReact,
      });
    });

    it('should not call action when it receives a non-reaction event', async () => {
      await expectRouteNotMatchMessengerEvent({
        route: messenger.reaction(Action),
        event: messengerEventTextMessage,
      });
    });

    describe('#messenger.reaction.react', () => {
      it('should call action when it receives a messenger reaction.react event', async () => {
        await expectRouteMatchMessengerEvent({
          route: messenger.reaction.react(Action),
          event: messengerEventReactionReact,
        });
      });

      it('should not call action when it receives a non-reaction.react event', async () => {
        await expectRouteNotMatchMessengerEvent({
          route: messenger.reaction.react(Action),
          event: messengerEventReactionUnreact,
        });
      });
    });

    describe('#messenger.reaction.unreact', () => {
      it('should call action when it receives a messenger reaction.unreact event', async () => {
        await expectRouteMatchMessengerEvent({
          route: messenger.reaction.unreact(Action),
          event: messengerEventReactionUnreact,
        });
      });

      it('should not call action when it receives a non-reaction.unreact event', async () => {
        await expectRouteNotMatchMessengerEvent({
          route: messenger.reaction.unreact(Action),
          event: messengerEventReactionReact,
        });
      });
    });
  });
});
