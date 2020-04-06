import Context from '../../context/Context';
import TelegramContext from '../TelegramContext';
import TelegramEvent from '../TelegramEvent';
import router from '../../router';
import telegram from '../routes';
import { run } from '../../bot/Bot';

const telegramEventTextMessage = new TelegramEvent({
  message: {
    messageId: 666,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'first',
      lastName: 'last',
      languageCode: 'en',
    },
    chat: {
      id: 427770117,
      firstName: 'first',
      lastName: 'last',
      type: 'private',
    },
    date: 1499402829,
    text: 'text',
  },
});

const telegramEventEditedMessage = new TelegramEvent({
  updateId: 141921687,
  editedMessage: {
    messageId: 229,
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    chat: {
      id: 427770117,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    date: 1515736358,
    editDate: 1515758017,
    text: 'hiiiii',
  },
});

const telegramEventChannelPost = new TelegramEvent({
  updateId: 141921710,
  channelPost: {
    messageId: 2,
    chat: {
      id: -1001305240521,
      title: 'channel_12345',
      type: 'channel',
    },
    date: 1515760382,
    text: 'post~~~',
  },
});

const telegramEventEditedChannelPost = new TelegramEvent({
  updateId: 141921711,
  editedChannelPost: {
    messageId: 2,
    chat: {
      id: -1001305240521,
      title: 'channel_12345',
      type: 'channel',
    },
    date: 1515760382,
    editDate: 1515760478,
    text: 'post~~~edited',
  },
});

const telegramEventInlineQuery = new TelegramEvent({
  updateId: 141921700,
  inlineQuery: {
    id: '1837258670654537434',
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    query: '123',
    offset: '',
  },
});

const telegramEventChosenInlineResult = new TelegramEvent({
  updateId: 141921701,
  chosenInlineResult: {
    resultId: '2837258670654537434',
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    inlineMessageId: '1837258670654537434',
    query: '123',
  },
});

const telegramEventCallbackQuery = new TelegramEvent({
  updateId: 141921690,
  callbackQuery: {
    id: '123',
    from: {
      id: 427770117,
      isBot: false,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    message: {
      messageId: 666,
      from: {
        id: 313534466,
        isBot: true,
        firstName: 'bot_first',
        username: 'bot_name',
      },
      chat: {
        id: 427770117,
        firstName: 'first',
        lastName: 'last',
        type: 'private',
      },
      date: 1499402829,
      text: 'text',
    },
    chatInstance: '-1828607021492040088',
    data: 'data',
  },
});

const telegramEventShippingQuery = new TelegramEvent({
  updateId: 141921690,
  shippingQuery: {
    id: '123',
    from: {
      id: 427770117,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    invoicePayload: 'bot payload',
    shippingAddress: {
      countryCode: 'US',
      state: 'New York',
      city: 'New York',
      streetLine1: 'xx',
      streetLine2: 'xx',
      postCode: '10001',
    },
  },
});

const telegramEventPreCheckoutQuery = new TelegramEvent({
  updateId: 141921690,
  preCheckoutQuery: {
    id: '123',
    from: {
      id: 427770117,
      firstName: 'user_first',
      lastName: 'user_last',
      languageCode: 'en',
    },
    currency: 'USD',
    totalAmount: 145,
    invoicePayload: 'bot payload',
  },
});

const telegramEventPoll = new TelegramEvent({
  updateId: 141921690,
  poll: {
    id: '123',
    question: 'What is it?',
    options: [
      { text: 'A', voterCount: 0 },
      { text: 'B', voterCount: 0 },
    ],
    isClosed: false,
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

async function expectRouteMatchTelegramEvent({ route, event }) {
  const context = new TelegramContext({
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

async function expectRouteNotMatchTelegramEvent({ route, event }) {
  const context = new TelegramContext({
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

describe('#telegram', () => {
  it('should call action when it receives a telegram event', async () => {
    await expectRouteMatchTelegramEvent({
      route: telegram(Action),
      event: telegramEventTextMessage,
    });
  });

  it('should not call action when it receives a non-telegram event', async () => {
    await expectRouteNotMatchContext({
      route: telegram(Action),
      context: new TestContext({
        client: {} as any,
        event: {},
      }),
    });
  });

  describe('#telegram.any', () => {
    it('should call action when it receives a telegram event', async () => {
      await expectRouteMatchTelegramEvent({
        route: telegram.any(Action),
        event: telegramEventTextMessage,
      });
    });

    it('should not call action when it receives a non-telegram event', async () => {
      await expectRouteNotMatchContext({
        route: telegram.any(Action),
        context: new TestContext({
          client: {} as any,
          event: {},
        }),
      });
    });
  });

  describe('#telegram.message', () => {
    it('should call action when it receives a telegram message event', async () => {
      await expectRouteMatchTelegramEvent({
        route: telegram.message(Action),
        event: telegramEventTextMessage,
      });
    });

    it('should not call action when it receives a non-message event', async () => {
      await expectRouteNotMatchTelegramEvent({
        route: telegram.message(Action),
        event: telegramEventEditedMessage,
      });
    });
  });

  describe('#telegram.editedMessage', () => {
    it('should call action when it receives a telegram editedMessage event', async () => {
      await expectRouteMatchTelegramEvent({
        route: telegram.editedMessage(Action),
        event: telegramEventEditedMessage,
      });
    });

    it('should not call action when it receives a non-editedMessage event', async () => {
      await expectRouteNotMatchTelegramEvent({
        route: telegram.editedMessage(Action),
        event: telegramEventTextMessage,
      });
    });
  });

  describe('#telegram.channelPost', () => {
    it('should call action when it receives a telegram channelPost event', async () => {
      await expectRouteMatchTelegramEvent({
        route: telegram.channelPost(Action),
        event: telegramEventChannelPost,
      });
    });

    it('should not call action when it receives a non-channelPost event', async () => {
      await expectRouteNotMatchTelegramEvent({
        route: telegram.channelPost(Action),
        event: telegramEventTextMessage,
      });
    });
  });

  describe('#telegram.editedChannelPost', () => {
    it('should call action when it receives a telegram editedChannelPost event', async () => {
      await expectRouteMatchTelegramEvent({
        route: telegram.editedChannelPost(Action),
        event: telegramEventEditedChannelPost,
      });
    });

    it('should not call action when it receives a non-editedChannelPost event', async () => {
      await expectRouteNotMatchTelegramEvent({
        route: telegram.editedChannelPost(Action),
        event: telegramEventTextMessage,
      });
    });
  });

  describe('#telegram.inlineQuery', () => {
    it('should call action when it receives a telegram inlineQuery event', async () => {
      await expectRouteMatchTelegramEvent({
        route: telegram.inlineQuery(Action),
        event: telegramEventInlineQuery,
      });
    });

    it('should not call action when it receives a non-inlineQuery event', async () => {
      await expectRouteNotMatchTelegramEvent({
        route: telegram.inlineQuery(Action),
        event: telegramEventTextMessage,
      });
    });
  });

  describe('#telegram.chosenInlineResult', () => {
    it('should call action when it receives a telegram chosenInlineResult event', async () => {
      await expectRouteMatchTelegramEvent({
        route: telegram.chosenInlineResult(Action),
        event: telegramEventChosenInlineResult,
      });
    });

    it('should not call action when it receives a non-chosenInlineResult event', async () => {
      await expectRouteNotMatchTelegramEvent({
        route: telegram.chosenInlineResult(Action),
        event: telegramEventTextMessage,
      });
    });
  });

  describe('#telegram.callbackQuery', () => {
    it('should call action when it receives a telegram callbackQuery event', async () => {
      await expectRouteMatchTelegramEvent({
        route: telegram.callbackQuery(Action),
        event: telegramEventCallbackQuery,
      });
    });

    it('should not call action when it receives a non-callbackQuery event', async () => {
      await expectRouteNotMatchTelegramEvent({
        route: telegram.callbackQuery(Action),
        event: telegramEventTextMessage,
      });
    });
  });

  describe('#telegram.shippingQuery', () => {
    it('should call action when it receives a telegram shippingQuery event', async () => {
      await expectRouteMatchTelegramEvent({
        route: telegram.shippingQuery(Action),
        event: telegramEventShippingQuery,
      });
    });

    it('should not call action when it receives a non-shippingQuery event', async () => {
      await expectRouteNotMatchTelegramEvent({
        route: telegram.shippingQuery(Action),
        event: telegramEventTextMessage,
      });
    });
  });

  describe('#telegram.preCheckoutQuery', () => {
    it('should call action when it receives a telegram preCheckoutQuery event', async () => {
      await expectRouteMatchTelegramEvent({
        route: telegram.preCheckoutQuery(Action),
        event: telegramEventPreCheckoutQuery,
      });
    });

    it('should not call action when it receives a non-preCheckoutQuery event', async () => {
      await expectRouteNotMatchTelegramEvent({
        route: telegram.preCheckoutQuery(Action),
        event: telegramEventTextMessage,
      });
    });
  });

  describe('#telegram.poll', () => {
    it('should call action when it receives a telegram poll event', async () => {
      await expectRouteMatchTelegramEvent({
        route: telegram.poll(Action),
        event: telegramEventPoll,
      });
    });

    it('should not call action when it receives a non-poll event', async () => {
      await expectRouteNotMatchTelegramEvent({
        route: telegram.poll(Action),
        event: telegramEventTextMessage,
      });
    });
  });
});
