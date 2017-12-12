import ViberHandler from '../ViberHandler';

jest.mock('warning');

const setup = () => {
  const builder = new ViberHandler();
  return {
    builder,
  };
};

describe('#constructor', () => {
  it('should construct without error', () => {
    const { builder } = setup();
    expect(ViberHandler).toBeDefined();
    expect(builder).toBeInstanceOf(ViberHandler);
  });
});

describe('#onSubscribed', () => {
  const subscribed = {
    event: 'subscribed',
    timestamp: 1457764197627,
    user: {
      id: '01234567890A=',
      name: 'John McClane',
      avatar: 'http://avatar.example.com',
      country: 'UK',
      language: 'en',
      api_version: 1,
    },
    message_token: 4912661846655238145,
  };

  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onSubscribed(handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isSubscribed: true,
        subscribed,
      },
    };
    builder.onSubscribed(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call predicate when received onSubscribed event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isSubscribed: true,
        subscribed,
      },
    };
    builder.onSubscribed(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(subscribed, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not subscribed event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isSubscribed: false,
        subscribed: null,
      },
    };
    builder.onSubscribed(handler);
    await builder.build()(context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onUnsubscribed', () => {
  const unsubscribed = {
    event: 'unsubscribed',
    timestamp: 1457764197627,
    user_id: '01234567890A=',
    message_token: 4912661846655238145,
  };

  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onUnsubscribed(handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isUnsubscribed: true,
        unsubscribed,
      },
    };
    builder.onUnsubscribed(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call predicate when received onUnsubscribed event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isUnsubscribed: true,
        unsubscribed,
      },
    };
    builder.onUnsubscribed(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(unsubscribed, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not unsubscribed event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isUnsubscribed: false,
        unsubscribed: null,
      },
    };
    builder.onUnsubscribed(handler);
    await builder.build()(context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onConversationStarted', () => {
  const conversationStarted = {
    event: 'conversation_started',
    timestamp: 1457764197627,
    message_token: 4912661846655238145,
    type: 'open',
    context: 'context information',
    user: {
      id: '01234567890A=',
      name: 'John McClane',
      avatar: 'http://avatar.example.com',
      country: 'UK',
      language: 'en',
      api_version: 1,
    },
    subscribed: false,
  };

  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onConversationStarted(handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isConversationStarted: true,
        conversationStarted,
      },
    };
    builder.onConversationStarted(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call predicate when received conversation started event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isConversationStarted: true,
        conversationStarted,
      },
    };
    builder.onConversationStarted(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(conversationStarted, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not conversation started event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isConversationStarted: false,
        conversationStarted: null,
      },
    };
    builder.onConversationStarted(handler);
    await builder.build()(context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onDelivered', () => {
  const delivered = {
    event: 'delivered',
    timestamp: 1457764197627,
    message_token: 4912661846655238145,
    user_id: '01234567890A=',
  };

  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onDelivered(handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isDelivered: true,
        delivered,
      },
    };
    builder.onDelivered(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call predicate when received onDelivered event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isDelivered: true,
        delivered,
      },
    };
    builder.onDelivered(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(delivered, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not delivered event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isDelivered: false,
        delivered: null,
      },
    };
    builder.onDelivered(handler);
    await builder.build()(context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onSeen', () => {
  const seen = {
    event: 'seen',
    timestamp: 1457764197627,
    message_token: 4912661846655238145,
    user_id: '01234567890A=',
  };

  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onSeen(handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isSeen: true,
        seen,
      },
    };
    builder.onSeen(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call predicate when received onSeen event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isSeen: true,
        seen,
      },
    };
    builder.onSeen(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(seen, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not seen event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isSeen: false,
        seen: null,
      },
    };
    builder.onSeen(handler);
    await builder.build()(context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onFailed', () => {
  const failed = {
    event: 'failed',
    timestamp: 1457764197627,
    message_token: 4912661846655238145,
    user_id: '01234567890A=',
    desc: 'failure description',
  };

  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onFailed(handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isFailed: true,
        failed,
      },
    };
    builder.onFailed(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call predicate when received onFailed event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isFailed: true,
        failed,
      },
    };
    builder.onFailed(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(failed, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not failed event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isFailed: false,
        failed: null,
      },
    };
    builder.onFailed(handler);
    await builder.build()(context);
    expect(handler).not.toBeCalled();
  });
});
