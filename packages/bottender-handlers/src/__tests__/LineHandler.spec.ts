import LineHandler from '../LineHandler';

jest.mock('warning');

const setup = () => {
  const builder = new LineHandler();
  return {
    builder,
  };
};

describe('#constructor', () => {
  it('should construct without error', () => {
    const { builder } = setup();
    expect(LineHandler).toBeDefined();
    expect(builder).toBeInstanceOf(LineHandler);
  });
});

describe('#onPostback', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const predicate = () => true;
    const handler = () => {};
    expect(await builder.onPostback(predicate, handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isPostback: true,
        postback: {
          data: 'data',
        },
      },
    };
    builder.onPostback(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call predicate when received postback', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const postback = {
      data: 'data',
    };
    const context = {
      event: {
        isPostback: true,
        postback,
      },
    };
    builder.onPostback(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(postback, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call predicate when received not postback', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const context = {
      event: {
        isPostback: false,
        postback: null,
      },
    };
    builder.onPostback(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalledWith(context);
  });

  it('should accept async predicate', async () => {
    const { builder } = setup();
    const predicate = jest.fn().mockResolvedValue(false);
    const handler = jest.fn();
    const postback = {
      data: 'data',
    };
    const context = {
      event: {
        isPostback: true,
        postback,
      },
    };
    builder.onPostback(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(postback, context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onPayload', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onPayload('payload', handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isPostback: true,
        isPayload: true,
        postback: {
          data: 'cool',
        },
        payload: 'cool',
      },
    };
    builder.onPayload(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call predicate when received postback', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isPostback: true,
        isPayload: true,
        postback: {
          data: 'cool',
        },
        payload: 'cool',
      },
    };
    builder.onPayload('cool', handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received no payload message', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isMessage: true,
        message: {
          text: 'wow',
        },
        text: 'wow',
      },
    };
    builder.onPayload('wow', handler);
    await builder.build()(context);
    expect(handler).not.toBeCalled();
  });

  it('should support regex', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isPostback: true,
        isPayload: true,
        postback: {
          data: 'cool',
        },
        payload: 'cool',
      },
    };

    const match = ['cool'];
    match.index = 0;
    match.input = 'cool';

    builder.onPayload(/COOL/i, handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context, match);
  });

  it('should support function predicate', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isPostback: true,
        isPayload: true,
        postback: {
          data: 'cool',
        },
        payload: 'cool',
      },
    };

    builder.onPayload((payload) => payload === 'cool', handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call handler build', async () => {
    const { builder } = setup();
    const build = jest.fn();
    const handler = { build: jest.fn(() => build) };
    const context = {
      event: {
        isPostback: true,
        isPayload: true,
        postback: {
          data: 'cool',
        },
        payload: 'cool',
      },
    };

    builder.onPayload(/COOL/i, handler);
    await builder.build()(context);
    expect(handler.build()).toBeCalled();
  });
});

describe('#onFollow', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onFollow('payload', handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isFollow: true,
        source: {
          type: 'user',
          userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
        },
      },
    };
    builder.onFollow(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call predicate when received follow event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const source = {
      type: 'user',
      userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
    };
    const context = {
      event: {
        isFollow: true,
        source,
        follow: source,
      },
    };
    builder.onFollow(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(source, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received no follow event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isFollow: false,
        follow: null,
      },
    };
    builder.onFollow(handler);
    await builder.build()(context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onUnfollow', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onUnfollow('payload', handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isUnfollow: true,
        source: {
          type: 'user',
          userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
        },
      },
    };
    builder.onUnfollow(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call predicate when received onUnfollow event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const source = {
      type: 'user',
      userId: 'U206d25c2ea6bd87c17655609a1c37cb8',
    };
    const context = {
      event: {
        isUnfollow: true,
        source,
        unfollow: source,
      },
    };
    builder.onUnfollow(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(source, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not unfollow event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isUnfollow: false,
        unfollow: null,
      },
    };
    builder.onUnfollow(handler);
    await builder.build()(context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onJoin', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onJoin('payload', handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isJoin: true,
        source: {
          type: 'group',
          groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        },
      },
    };
    builder.onJoin(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call predicate when received onJoin event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const source = {
      type: 'group',
      groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    };
    const context = {
      event: {
        isJoin: true,
        source,
        join: source,
      },
    };
    builder.onJoin(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(source, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not Join event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isJoin: false,
      },
    };
    builder.onJoin(handler);
    await builder.build()(context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onLeave', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onLeave('payload', handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isLeave: true,
        source: {
          type: 'group',
          groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        },
      },
    };
    builder.onLeave(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call predicate when received onLeave event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const source = {
      type: 'group',
      groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    };
    const context = {
      event: {
        isLeave: true,
        source,
        leave: source,
      },
    };
    builder.onLeave(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(source, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not Leave event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isLeave: false,
      },
    };
    builder.onLeave(handler);
    await builder.build()(context);
    expect(handler).not.toBeCalled();
  });
});

describe('#onBeacon', () => {
  it('should return this', async () => {
    const { builder } = setup();
    const handler = () => {};
    expect(await builder.onBeacon('payload', handler)).toBe(builder);
  });

  it('should support catch all handler', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const context = {
      event: {
        isBeacon: true,
        source: {
          type: 'group',
          groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        },
      },
    };
    builder.onBeacon(handler);
    await builder.build()(context);
    expect(handler).toBeCalledWith(context);
  });

  it('should call predicate when received onBeacon event', async () => {
    const { builder } = setup();
    const predicate = jest.fn(() => true);
    const handler = jest.fn();
    const beacon = {
      hwid: 'd41d8cd98f',
      type: 'enter',
    };
    const context = {
      event: {
        isBeacon: true,
        source: {
          type: 'group',
          groupId: 'cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        },
        beacon,
      },
    };
    builder.onBeacon(predicate, handler);
    await builder.build()(context);
    expect(predicate).toBeCalledWith(beacon, context);
    expect(handler).toBeCalledWith(context);
  });

  it('should not call handler when received not Beacon event', async () => {
    const { builder } = setup();
    const handler = jest.fn();
    const predicate = jest.fn(() => true);
    const context = {
      event: {
        isBeacon: false,
      },
      beacon: null,
    };
    builder.onBeacon(predicate, handler);
    await builder.build()(context);
    expect(predicate).not.toBeCalledWith();
    expect(handler).not.toBeCalled();
  });
});
